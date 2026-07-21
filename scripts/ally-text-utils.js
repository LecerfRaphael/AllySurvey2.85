/* =========================================================
   ally-text-utils.js
   -----------------------------------------------------------
   Utilitaires texte partagés, auparavant redéfinis en double
   (parfois triple) dans plusieurs modules indépendants de
   files/accessibilite.js :
     - cleanText        : 8 définitions locales quasi identiques
     - normaliseIdPart  : 3 définitions locales (seul le texte
                           de repli changeait : "upload" / "field" / "cell")
     - questionOf       : 2 définitions strictement identiques
     - questionTitle    : 3 définitions proches (repli, liste de
                           sélecteurs et gestion de l'astérisque
                           légèrement différents selon le module)

   Ce module ne change pas le comportement observable : chaque
   ancien site d'appel garde son texte de repli, sa liste de
   sélecteurs et son mode de nettoyage de l'astérisque via les
   options passées ci-dessous. Seule la logique est désormais
   centralisée à un seul endroit.

   Chargement : doit être déclaré avant files/accessibilite.js
   dans config.xml (comme scripts/ally-observer-hub.js).
========================================================= */
(function (window) {
  "use strict";

  if (window.LSA11yTextUtils) return;

  var DEFAULT_QUESTION_TITLE_SELECTORS = [
    ".ls-label-question",
    ".question-title-container .ls-label-question",
    ".question-title-container",
    ".question-text",
    ".question-title",
    "legend",
    "label"
  ];

  /**
   * Normalise un texte : espaces multiples réduits à un seul, trim.
   * Accepte soit une chaîne, soit un nœud DOM (on lit alors son
   * `textContent`), pour couvrir les deux usages trouvés dans le
   * thème sans obliger chaque appelant à écrire `node && node.textContent`.
   *
   * @param {string|Node|null|undefined} input
   * @param {Object} [opts]
   * @param {"all"|"first"|false} [opts.stripStars=false]
   *   - "all"   : retire toutes les astérisques (repère "obligatoire")
   *   - "first" : retire uniquement la première occurrence
   *   - false   : ne touche pas aux astérisques (comportement par défaut)
   * @returns {string}
   */
  function cleanText(input, opts) {
    opts = opts || {};
    var raw;
    if (input && typeof input === "object" && "textContent" in input) {
      raw = input.textContent || "";
    } else {
      raw = input || "";
    }
    raw = String(raw);

    if (opts.stripStars === "all") {
      raw = raw.replace(/\*/g, "");
    } else if (opts.stripStars === "first") {
      raw = raw.replace("*", "");
    }

    return raw.replace(/\s+/g, " ").trim();
  }

  /**
   * Normalise une valeur pour un usage dans un id/attribut HTML.
   * @param {string} value
   * @param {string} [fallback="id"] - valeur retournée si le résultat est vide
   * @returns {string}
   */
  function normaliseIdPart(value, fallback) {
    return String(value || "")
      .replace(/[^a-zA-Z0-9_-]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 80) || (fallback || "id");
  }

  /**
   * Retrouve le conteneur de question LimeSurvey le plus proche.
   * @param {Element} el
   * @returns {Element|null}
   */
  function questionOf(el) {
    return el && el.closest(
      "fieldset[id^='question'], div[id^='question'], .question-container, .questionnaire-container"
    );
  }

  /**
   * Calcule un intitulé lisible pour une question, en essayant une
   * liste de sélecteurs dans l'ordre jusqu'à trouver un texte non vide.
   *
   * @param {Element} question
   * @param {Object} [opts]
   * @param {string} [opts.fallback="cette question"]
   * @param {string[]} [opts.selectors] - remplace la liste par défaut
   * @param {"all"|"first"|false} [opts.stripStars=false]
   * @returns {string}
   */
  function questionTitle(question, opts) {
    opts = opts || {};
    var fallback = opts.fallback || "cette question";
    if (!question) return fallback;

    var selectors = opts.selectors || DEFAULT_QUESTION_TITLE_SELECTORS;
    for (var i = 0; i < selectors.length; i++) {
      var node = question.querySelector(selectors[i]);
      var text = cleanText(node, { stripStars: opts.stripStars || false });
      if (text) return text;
    }

    return fallback;
  }

  window.LSA11yTextUtils = {
    cleanText: cleanText,
    normaliseIdPart: normaliseIdPart,
    questionOf: questionOf,
    questionTitle: questionTitle
  };
})(window);
