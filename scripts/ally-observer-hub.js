/* =========================================================
   ally-observer-hub.js
   -----------------------------------------------------------
   Point d'entrée UNIQUE pour observer les mutations du DOM sur
   la page de questionnaire (participant).

   Pourquoi ce fichier :
   Plusieurs modules (files/accessibilite.js, ally-audit-fixes.js,
   ally-diagnostic.js, ally-ls7-compat.js, ally-matching.js)
   créaient chacun leur propre `new MutationObserver(...)` sur
   `document.body` / `document.documentElement` avec
   `{ subtree: true }`. Résultat : jusqu'à une dizaine
   d'observers indépendants qui refont chacun leurs propres
   requêtes DOM à chaque mutation, sans coordination ni
   throttling — coûteux sur les questionnaires volumineux
   (matrices, nombreuses questions conditionnelles).

   Ce module :
   - crée UN SEUL MutationObserver racine ;
   - regroupe (coalesce) les lots de mutations sur une seule
     frame via requestAnimationFrame (repli setTimeout) ;
   - ne redistribue à chaque "watcher" que ce qui l'intéresse
     (nouveaux nœuds, ou changement d'un attribut qu'il a
     déclaré surveiller) ;
   - isole les erreurs d'un watcher pour ne pas bloquer les
     autres.

   Ne concerne PAS scripts/ally-admin-options-bridge.js : ce
   fichier observe potentiellement `window.parent.document`
   (page d'édition du thème dans l'admin LimeSurvey), un
   contexte différent de celui-ci.

   Chargement : ce script doit être déclaré AVANT les modules
   qui l'utilisent dans config.xml (<files><js>).
========================================================= */
(function (window, document) {
  "use strict";

  if (window.LSA11yObserverHub) return;

  var watchers = [];
  var pendingMutations = [];
  var scheduled = false;
  var started = false;
  var attributeFilter = ["class", "style"];

  function flush() {
    scheduled = false;
    var mutations = pendingMutations;
    pendingMutations = [];
    if (!mutations.length || !watchers.length) return;

    var addedNodes = [];
    var i, j, nodes;
    for (i = 0; i < mutations.length; i++) {
      nodes = mutations[i].addedNodes;
      if (!nodes || !nodes.length) continue;
      for (j = 0; j < nodes.length; j++) {
        if (nodes[j].nodeType === 1) addedNodes.push(nodes[j]);
      }
    }

    for (i = 0; i < watchers.length; i++) {
      var watcher = watchers[i];
      var relevant = false;

      if (watcher.interest === "any") {
        relevant = true;
      } else if (watcher.interest === "addedNodes") {
        relevant = addedNodes.length > 0;
      } else if (watcher.interest === "attributes") {
        relevant = mutations.some(function (m) {
          return m.type === "attributes" &&
            (!watcher.attributeFilter || watcher.attributeFilter.indexOf(m.attributeName) !== -1);
        });
      } else if (watcher.interest === "addedNodesOrAttributes") {
        relevant = addedNodes.length > 0 || mutations.some(function (m) {
          return m.type === "attributes" &&
            (!watcher.attributeFilter || watcher.attributeFilter.indexOf(m.attributeName) !== -1);
        });
      }

      if (!relevant) continue;

      try {
        watcher.onMutations(mutations, addedNodes);
      } catch (error) {
        if (window.console && window.console.error) {
          window.console.error('[LSA11yObserverHub] le watcher "' + watcher.id + '" a échoué :', error);
        }
      }
    }
  }

  function schedule() {
    if (scheduled) return;
    scheduled = true;
    if (window.requestAnimationFrame) {
      window.requestAnimationFrame(flush);
    } else {
      window.setTimeout(flush, 32);
    }
  }

  function start() {
    if (started || !window.MutationObserver) return;
    var root = document.body || document.documentElement;
    if (!root) return;
    started = true;

    var mo = new MutationObserver(function (mutations) {
      Array.prototype.push.apply(pendingMutations, mutations);
      schedule();
    });

    mo.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: attributeFilter
    });

    window.LSA11yObserverHub.observer = mo;
  }

  /**
   * Enregistre un watcher.
   * @param {Object} config
   * @param {string} config.id - identifiant pour le diagnostic/logs
   * @param {"any"|"addedNodes"|"attributes"|"addedNodesOrAttributes"} config.interest
   * @param {string[]} [config.attributeFilter] - attributs à surveiller (ex: ["class","style"])
   * @param {function(MutationRecord[], Element[])} config.onMutations
   *
   * IMPORTANT : tous les register() doivent être appelés AVANT le
   * démarrage effectif de l'observateur (DOMContentLoaded / script
   * déjà chargé), car attributeFilter ne peut plus être modifié une
   * fois observe() lancé. Comme tous les modules s'enregistrent de
   * façon synchrone à l'exécution de leur <script>, c'est garanti
   * tant que ce fichier est chargé en premier (cf. config.xml).
   */
  function register(config) {
    if (!config || typeof config.onMutations !== "function") {
      throw new Error("LSA11yObserverHub.register: onMutations manquant");
    }
    if (config.attributeFilter) {
      config.attributeFilter.forEach(function (name) {
        if (attributeFilter.indexOf(name) === -1) attributeFilter.push(name);
      });
    }
    watchers.push({
      id: config.id || ("watcher-" + watchers.length),
      interest: config.interest || "any",
      attributeFilter: config.attributeFilter || null,
      onMutations: config.onMutations
    });
  }

  window.LSA11yObserverHub = {
    register: register
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", start);
  } else {
    start();
  }
  // Après une navigation PJAX, le body peut avoir été reconstruit :
  // l'observer initial reste valide (il observe déjà document.body),
  // mais on garde ce hook pour un futur besoin de re-cibler la racine.
  document.addEventListener("pjax:complete", function () {
    if (!started) start();
  });
})(window, document);
