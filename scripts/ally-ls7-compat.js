(function (window, document) {
  'use strict';
  if (!document || window.FruityAllySurveyLS7) return;

  var state = { booted: false, scheduled: false, observer: null };
  var navbarIdCounter = 0;
  var events = ['DOMContentLoaded', 'pageshow', 'pjax:complete', 'pjax:success', 'pjax:end', 'pjax:scriptcomplete', 'ls:page:ready', 'limesurvey:page:ready'];

  function bodyEnabled() {
    var body = document.body;
    return !!body && body.getAttribute('data-fas-ls7-compat') !== 'off';
  }

  function detectMajor() {
    var html = document.documentElement;
    var hints = [html.getAttribute('data-limesurvey-version'), document.body && document.body.getAttribute('data-limesurvey-version'), window.LS_VERSION, window.LimeSurveyVersion];
    for (var i = 0; i < hints.length; i++) {
      var m = String(hints[i] || '').match(/^(\d+)/);
      if (m) return parseInt(m[1], 10);
    }
    return 7; // Theme target; feature detection remains authoritative.
  }

  function normalizeBootstrapData(root) {
    root.querySelectorAll('[data-toggle]').forEach(function (el) {
      if (!el.hasAttribute('data-bs-toggle')) el.setAttribute('data-bs-toggle', el.getAttribute('data-toggle'));
    });
    root.querySelectorAll('[data-target]').forEach(function (el) {
      if (!el.hasAttribute('data-bs-target')) el.setAttribute('data-bs-target', el.getAttribute('data-target'));
    });
    root.querySelectorAll('[data-dismiss]').forEach(function (el) {
      if (!el.hasAttribute('data-bs-dismiss')) el.setAttribute('data-bs-dismiss', el.getAttribute('data-dismiss'));
    });
  }

  function normalizeNavbarTogglers(root) {
    var lang = String(document.documentElement.lang || '').toLowerCase();
    var isFrench = lang.indexOf('fr') === 0;
    var seenIds = Object.create(null);

    document.querySelectorAll('[id]').forEach(function (el) {
      var id = el.id;
      if (!id) return;
      if (!seenIds[id]) seenIds[id] = [];
      seenIds[id].push(el);
    });

    root.querySelectorAll('button.navbar-toggler').forEach(function (button) {
      var currentId = button.id || '';
      if (!currentId || (seenIds[currentId] && seenIds[currentId].length > 1)) {
        navbarIdCounter += 1;
        button.id = 'fas-navbar-toggler-' + navbarIdCounter;
      }

      var hasAccessibleName = !!(
        String(button.getAttribute('aria-label') || '').trim() ||
        String(button.getAttribute('title') || '').trim() ||
        String(button.textContent || '').trim()
      );
      if (!hasAccessibleName) {
        button.setAttribute('aria-label', isFrench ? 'Afficher le menu de navigation' : 'Open navigation menu');
      }

      var icon = button.querySelector('.ri-more-fill, [class*="ri-"]');
      if (icon && !icon.hasAttribute('aria-hidden')) icon.setAttribute('aria-hidden', 'true');
    });
  }

  function normalizeAccessibility(root) {
    root.querySelectorAll('button:not([type])').forEach(function (button) { button.type = 'button'; });
    normalizeNavbarTogglers(root);
    root.querySelectorAll('[aria-controls]').forEach(function (el) {
      var id = el.getAttribute('aria-controls');
      if (id && !document.getElementById(id)) el.removeAttribute('aria-controls');
    });
    var main = document.getElementById('fas-main-content');
    if (main && !main.hasAttribute('role')) main.setAttribute('role', 'main');
  }

  function dispatchReady(root) {
    var detail = { root: root, limeSurveyMajor: detectMajor(), themeVersion: '2.0.1' };
    try { document.dispatchEvent(new CustomEvent('fas:ready', { detail: detail })); }
    catch (e) { /* CustomEvent exists in all browsers supported by LS7. */ }
  }

  function boot(root) {
    if (!bodyEnabled()) return;
    root = root && root.querySelectorAll ? root : document;
    normalizeBootstrapData(root);
    normalizeAccessibility(root);
    document.documentElement.classList.add('fas-ls7-ready');
    document.documentElement.setAttribute('data-fas-ls-major', String(detectMajor()));
    state.booted = true;
    dispatchReady(root);
  }

  function schedule(root) {
    if (state.scheduled) return;
    state.scheduled = true;
    window.requestAnimationFrame(function () {
      state.scheduled = false;
      boot(root || document);
    });
  }

  events.forEach(function (name) { document.addEventListener(name, function () { schedule(document); }, false); });
  if (window.jQuery) window.jQuery(document).on('ready pjax:complete pjax:success pjax:end pjax:scriptcomplete', function () { schedule(document); });

  if (window.LSA11yObserverHub) {
    window.LSA11yObserverHub.register({
      id: 'ls7-compat',
      interest: 'addedNodes',
      onMutations: function () { schedule(document); }
    });
  } else if ('MutationObserver' in window) {
    state.observer = new MutationObserver(function (mutations) {
      for (var i = 0; i < mutations.length; i++) {
        if (mutations[i].addedNodes && mutations[i].addedNodes.length) { schedule(document); break; }
      }
    });
    var startObserver = function () {
      if (document.body) state.observer.observe(document.body, { childList: true, subtree: true });
    };
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', startObserver, { once: true }); else startObserver();
  }

  window.FruityAllySurveyLS7 = { version: '2.0.1', boot: boot, schedule: schedule, detectMajor: detectMajor };
  if (document.readyState !== 'loading') schedule(document);
})(window, document);

/* V2.0.3 — titre permanent et pagination Page X/Y */
(function () {
  'use strict';

  function numericValue(value) {
    var parsed = parseInt(String(value || '').replace(/[^0-9-]/g, ''), 10);
    return Number.isFinite(parsed) ? parsed : null;
  }

  function updateSurveyIdentity() {
    var identity = document.getElementById('fas-survey-identity');
    if (!identity) return;

    var total = numericValue(identity.getAttribute('data-fas-total-pages')) || 0;
    var currentNode = identity.querySelector('[data-fas-current-page]');
    var totalNode = identity.querySelector('[data-fas-total-page]');
    var stepInput = document.querySelector('input[name="thisstep"], #thisstep');
    var current = stepInput ? numericValue(stepInput.value) : null;

    if (current === null || current < 1) current = 1;
    if (total > 0 && current > total) current = total;

    if (currentNode) currentNode.textContent = String(current);
    if (totalNode && total > 0) totalNode.textContent = String(total);

    var title = document.getElementById('fas-survey-title');
    if (title && title.textContent.trim()) {
      var pageText = total > 0 ? ' — Page ' + current + '/' + total : '';
      document.title = title.textContent.trim() + pageText;
    }
  }

  document.addEventListener('DOMContentLoaded', updateSurveyIdentity);
  document.addEventListener('pjax:complete', updateSurveyIdentity);
  document.addEventListener('fas:ready', updateSurveyIdentity);
  window.addEventListener('pageshow', updateSurveyIdentity);
})();
