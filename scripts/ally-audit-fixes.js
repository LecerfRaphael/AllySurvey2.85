(function () {
  'use strict';

  function labelForClose() {
    var lang = (document.documentElement.lang || 'en').toLowerCase();
    return lang.indexOf('fr') === 0 ? 'Fermer' : 'Close';
  }

  function labelForMenu() {
    var lang = (document.documentElement.lang || 'en').toLowerCase();
    return lang.indexOf('fr') === 0 ? 'Ouvrir le menu du questionnaire' : 'Open survey menu';
  }

  function nodes(root, selector) {
    root = root || document;
    var list = [];
    if (root.nodeType === 1 && root.matches && root.matches(selector)) list.push(root);
    if (root.querySelectorAll) {
      list = list.concat(Array.prototype.slice.call(root.querySelectorAll(selector)));
    }
    return list;
  }

  /**
   * Convertit un <a> qui ne sert qu'à déclencher une action JS (fermer une
   * modale/alerte, etc.) en vrai <button type="button">, en conservant tous
   * ses attributs (sauf href/role, devenus inutiles) et son contenu.
   * Remplace l'ancienne approche qui posait href="javascript:void(0)" : un
   * vrai bouton est nativement accessible au clavier (Entrée/Espace) sans
   * ce pseudo-protocole déconseillé, et Bootstrap réagit à data-bs-dismiss
   * quel que soit le tag de l'élément cliqué.
   * @param {HTMLAnchorElement} link
   * @returns {HTMLButtonElement}
   */
  function convertToButton(link) {
    var button = document.createElement('button');
    button.type = 'button';
    Array.prototype.slice.call(link.attributes).forEach(function (attr) {
      if (attr.name === 'href' || attr.name === 'role' || attr.name === 'type') return;
      button.setAttribute(attr.name, attr.value);
    });
    button.innerHTML = link.innerHTML;
    link.replaceWith(button);
    return button;
  }

  function repairAccessibleNames(root) {
    root = root || document;
    nodes(root, 'button.navbar-toggler').forEach(function (button, index) {
      if (!button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
        button.setAttribute('aria-label', labelForMenu());
      }
      button.setAttribute('type', button.getAttribute('type') || 'button');
      var icon = button.querySelector('.ri-more-fill, svg, i');
      if (icon) icon.setAttribute('aria-hidden', 'true');
      if (!button.id || document.querySelectorAll('#' + CSS.escape(button.id)).length > 1) {
        button.id = 'fas-navbar-toggler-' + (index + 1);
      }
    });

    nodes(root, 'button.btn-close, a.btn-close, [role="button"].btn-close').forEach(function (button) {
      if (button.tagName === 'A') {
        button = convertToButton(button);
      }
      button.removeAttribute('aria-hidden');
      if (!button.getAttribute('aria-label') && !button.getAttribute('aria-labelledby')) {
        button.setAttribute('aria-label', labelForClose());
      }
      if (!button.getAttribute('type')) button.setAttribute('type', 'button');
    });
  }

  function deduplicateIds(root) {
    root = root || document;
    var seen = Object.create(null);
    root.querySelectorAll('[id]').forEach(function (node) {
      var id = node.id;
      if (!id) return;
      if (!seen[id]) { seen[id] = node; return; }
      if (id === 'lemscripts' && node.tagName === 'SCRIPT') {
        node.removeAttribute('id');
        node.setAttribute('data-fas-original-id', 'lemscripts');
        return;
      }
      var n = 2, candidate = id + '-' + n;
      while (document.getElementById(candidate)) { n += 1; candidate = id + '-' + n; }
      node.id = candidate;
    });
  }

  function fixActionLinks(root) {
    root = root || document;
    nodes(root, 'a[href="#"][data-bs-dismiss="modal"], a[href="#"][data-dismiss="modal"]').forEach(function (link) {
      var button = convertToButton(link);
      if (!button.getAttribute('aria-label') && !button.textContent.trim()) {
        button.setAttribute('aria-label', labelForClose());
      }
    });
  }

  function fixModalHeadings(root) {
    root = root || document;
    root.querySelectorAll('.modal-header h5.modal-title').forEach(function (oldHeading) {
      var heading = document.createElement('h2');
      Array.prototype.slice.call(oldHeading.attributes).forEach(function (attr) { heading.setAttribute(attr.name, attr.value); });
      heading.classList.add('h5');
      heading.innerHTML = oldHeading.innerHTML;
      oldHeading.replaceWith(heading);
    });
  }

  function fixProgress(root) {
    root = root || document;
    root.querySelectorAll('[role="progressbar"][title]').forEach(function (el) {
      el.removeAttribute('title');
      el.removeAttribute('data-bs-toggle');
      el.removeAttribute('tabindex');
    });
  }

  function replaceParagraph(node, className) {
    if (!node || node.tagName !== 'P') return;
    var replacement = document.createElement('div');
    Array.prototype.slice.call(node.attributes).forEach(function (attr) {
      replacement.setAttribute(attr.name, attr.value);
    });
    replacement.classList.add(className);
    replacement.innerHTML = node.innerHTML;
    node.replaceWith(replacement);
  }

  function normalizeAuditParagraphs(root) {
    nodes(root, '.fas-custom-footer-text > p').forEach(function (paragraph) {
      replaceParagraph(paragraph, 'fas-footer-paragraph');
    });
    nodes(root, '.modal-body > p').forEach(function (paragraph) {
      replaceParagraph(paragraph, 'fas-modal-message');
    });
  }

  function apply(root) {
    repairAccessibleNames(root);
    deduplicateIds(root);
    fixActionLinks(root);
    fixModalHeadings(root);
    fixProgress(root);
    normalizeAuditParagraphs(root);
  }

  var auditObserverStarted = false;

  function startObserver() {
    if (auditObserverStarted) return;
    auditObserverStarted = true;

    if (window.LSA11yObserverHub) {
      window.LSA11yObserverHub.register({
        id: 'audit-fixes',
        interest: 'addedNodes',
        onMutations: function (mutations, addedNodes) {
          addedNodes.forEach(function (node) { apply(node); });
          // dedupe reste une passe globale volontairement peu fréquente :
          // elle ne s'exécute qu'une fois par lot coalescé par le hub,
          // plus au fil de chaque mutation individuelle.
          deduplicateIds(document);
        }
      });
      return;
    }

    if (!window.MutationObserver || !document.documentElement) return;
    var auditObserver = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        mutation.addedNodes.forEach(function (node) {
          if (node.nodeType === 1) apply(node);
        });
      });
      deduplicateIds(document);
    });
    auditObserver.observe(document.documentElement, { childList: true, subtree: true });
  }

  function init() {
    apply(document);
    startObserver();
    if (document.body) document.body.dataset.fasAuditObserver = '1';
  }

  startObserver();
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
  document.addEventListener('pjax:complete', function () { apply(document); });
  document.addEventListener('fas:ready', function () { apply(document); });
})();
