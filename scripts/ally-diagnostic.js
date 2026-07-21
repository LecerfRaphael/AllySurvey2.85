(function () {
  'use strict';

  var $ = function (selector, context) {
    return (context || document).querySelector(selector);
  };
  var $$ = function (selector, context) {
    return Array.prototype.slice.call((context || document).querySelectorAll(selector));
  };
  var STORAGE_KEY = 'fasDiagnosticPanelOpen';

  function visible(el) {
    return !!(el && (el.offsetWidth || el.offsetHeight || el.getClientRects().length));
  }

  function accessibleName(el) {
    return (el.getAttribute('aria-label') || el.getAttribute('title') || el.textContent || '').trim();
  }

  function esc(value) {
    return window.CSS && CSS.escape
      ? CSS.escape(value)
      : String(value).replace(/(["'\\.#:[\](),=+~*> ])/g, '\\$1');
  }

  function questionInfo(el) {
    var question = el && el.closest ? el.closest('.question-container,[id^="question"]') : null;
    if (!question) {
      return { label: 'Page generale', target: null };
    }

    var id = question.id || '';
    var number = (id.match(/question[-_]?([0-9]+)/i) || [])[1] || '';
    var code = question.getAttribute('data-questioncode') || question.getAttribute('data-code') || '';
    if (!code) {
      var heading = question.querySelector('[id^="question-text-container-"],[id^="ls-question-text-"]');
      if (heading) {
        code = (heading.id.split('-').pop() || '').trim();
      }
    }

    var title = question.querySelector('.ls-label-question,.question-text,[role="heading"]');
    var titleText = title ? (title.textContent || '').replace(/\s+/g, ' ').trim() : '';
    var parts = [];
    if (number) parts.push('Question ' + number);
    if (code) parts.push('(' + code + ')');
    if (titleText) parts.push('- ' + titleText.slice(0, 90));
    return { label: parts.join(' ') || 'Question', target: question };
  }

  function uniqueLocations(elements) {
    var seen = {};
    var out = [];
    (elements || []).forEach(function (el) {
      var info = questionInfo(el);
      if (!seen[info.label]) {
        seen[info.label] = 1;
        out.push(info);
      }
    });
    return out;
  }

  function storePanelState(open) {
    try {
      window.localStorage.setItem(STORAGE_KEY, open ? '1' : '0');
    } catch (e) {}
  }

  function storedPanelOpen() {
    try {
      return window.localStorage.getItem(STORAGE_KEY) === '1';
    } catch (e) {
      return false;
    }
  }

  function forceToolVisibility() {
    var nav = $('#fas-exclusive-tools');
    var panel = $('#fas-diagnostic-panel');

    if (nav) {
      nav.classList.add('fas-exclusive-tools--ready');
      nav.removeAttribute('hidden');
      nav.style.display = 'flex';
      nav.style.visibility = 'visible';
      nav.style.opacity = '1';
      nav.style.pointerEvents = 'auto';
      nav.style.zIndex = '2147483000';
    }

    if (panel) {
      panel.style.zIndex = '2147483001';
    }
  }

  function setPanelOpen(open) {
    var button = $('#fas-run-diagnostic');
    var panel = $('#fas-diagnostic-panel');
    forceToolVisibility();
    if (panel) panel.hidden = !open;
    if (button) button.setAttribute('aria-expanded', open ? 'true' : 'false');
    storePanelState(open);
  }

  function restorePanelState() {
    var button = $('#fas-run-diagnostic');
    var panel = $('#fas-diagnostic-panel');
    forceToolVisibility();
    if (button && panel && storedPanelOpen()) {
      panel.hidden = false;
      button.setAttribute('aria-expanded', 'true');
    }
  }

  function run() {
    var checks = [];
    function add(status, title, detail, elements) {
      checks.push({ status: status, title: title, detail: detail, elements: elements || [] });
    }

    var ids = {};
    var duplicateIds = [];
    $$('[id]').forEach(function (el) {
      if (!ids[el.id]) ids[el.id] = [];
      ids[el.id].push(el);
    });
    Object.keys(ids).forEach(function (id) {
      if (ids[id].length > 1) duplicateIds = duplicateIds.concat(ids[id]);
    });
    add(duplicateIds.length ? 'fail' : 'pass', 'Identifiants uniques', duplicateIds.length ? duplicateIds.length + ' element(s) utilisent un identifiant duplique.' : 'Aucun doublon detecte.', duplicateIds);

    var images = $$('img').filter(visible);
    var badImages = images.filter(function (img) {
      return !img.hasAttribute('alt');
    });
    add(badImages.length ? 'fail' : 'pass', 'Alternatives des images', badImages.length + ' image(s) visible(s) sans attribut alt.', badImages);

    var controls = $$('input:not([type=hidden]),select,textarea').filter(visible);
    var badLabels = controls.filter(function (el) {
      if (el.getAttribute('aria-label') || el.getAttribute('aria-labelledby')) return false;
      if (el.id && $('label[for="' + esc(el.id) + '"]')) return false;
      return !el.closest('label');
    });
    add(badLabels.length ? 'fail' : 'pass', 'Etiquettes des champs', badLabels.length + ' champ(s) visible(s) sans nom accessible detecte.', badLabels);

    var unnamed = $$('button,a[href],[role=button]').filter(visible).filter(function (el) {
      return !accessibleName(el) && !el.getAttribute('aria-labelledby');
    });
    add(unnamed.length ? 'fail' : 'pass', 'Nom des commandes', unnamed.length + ' commande(s) visible(s) sans nom accessible.', unnamed);

    var fieldsets = $$('fieldset').filter(visible);
    var noLegend = fieldsets.filter(function (el) {
      return !el.querySelector(':scope > legend');
    });
    add(noLegend.length ? 'warn' : 'pass', 'Groupes de champs', noLegend.length + ' fieldset visible(s) sans legend direct.', noLegend);

    var hiddenRequired = $$('[required]').filter(function (el) {
      return !visible(el);
    });
    add(hiddenRequired.length ? 'fail' : 'pass', 'Champs obligatoires masques', hiddenRequired.length + ' champ(s) masque(s) portent encore required.', hiddenRequired);

    var tables = $$('table').filter(visible);
    var badTables = tables.filter(function (table) {
      return !table.querySelector('th');
    });
    add(badTables.length ? 'warn' : 'pass', 'En-tetes de tableaux', badTables.length + ' tableau(x) visible(s) sans cellule th.', badTables);

    var headings = $$('h1,h2,h3,h4,h5,h6').filter(visible);
    var jumps = [];
    var last = 0;
    headings.forEach(function (heading) {
      var level = Number(heading.tagName.slice(1));
      if (last && level > last + 1) jumps.push(heading);
      last = level;
    });
    add(jumps.length ? 'warn' : 'pass', 'Hierarchie des titres', jumps.length + ' saut(s) de niveau detecte(s).', jumps);

    add(document.documentElement.lang ? 'pass' : 'fail', 'Langue de la page', document.documentElement.lang ? 'Langue declaree : ' + document.documentElement.lang : 'Attribut lang absent.', document.documentElement.lang ? [] : [document.documentElement]);
    render(checks);
  }

  function render(checks) {
    var panel = $('#fas-diagnostic-panel');
    var list = $('#fas-diagnostic-results');
    var summary = $('#fas-diagnostic-summary');
    if (!panel || !list || !summary) return;

    list.innerHTML = '';
    var fail = 0;
    var warn = 0;
    var pass = 0;

    checks.forEach(function (check) {
      if (check.status === 'fail') fail++;
      else if (check.status === 'warn') warn++;
      else pass++;

      var li = document.createElement('li');
      li.className = 'fas-check-' + check.status;
      var strong = document.createElement('strong');
      strong.textContent = ({ pass: 'Conforme', fail: 'A corriger', warn: 'A verifier' }[check.status]) + ' - ' + check.title;
      li.appendChild(strong);
      li.appendChild(document.createElement('br'));
      var span = document.createElement('span');
      span.textContent = check.detail;
      li.appendChild(span);

      var locations = uniqueLocations(check.elements);
      if (locations.length) {
        var ul = document.createElement('ul');
        ul.className = 'fas-diagnostic-locations';
        locations.slice(0, 12).forEach(function (location) {
          var item = document.createElement('li');
          if (location.target) {
            var button = document.createElement('button');
            button.type = 'button';
            button.className = 'fas-diagnostic-location';
            button.textContent = location.label;
            button.addEventListener('click', function () {
              location.target.scrollIntoView({ behavior: 'smooth', block: 'center' });
              location.target.setAttribute('tabindex', '-1');
              location.target.focus({ preventScroll: true });
              location.target.classList.add('fas-diagnostic-highlight');
              window.setTimeout(function () {
                location.target.classList.remove('fas-diagnostic-highlight');
              }, 2500);
            });
            item.appendChild(button);
          } else {
            item.textContent = location.label;
          }
          ul.appendChild(item);
        });
        li.appendChild(ul);
      }

      list.appendChild(li);
    });

    summary.textContent = pass + ' controle(s) sans anomalie, ' + warn + ' a verifier, ' + fail + ' a corriger.';
    setPanelOpen(true);
    panel.setAttribute('tabindex', '-1');
    panel.focus();
  }

  function bind() {
    var button = $('#fas-run-diagnostic');
    var close = $('#fas-close-diagnostic');
    forceToolVisibility();

    if (button && !button.dataset.bound) {
      button.dataset.bound = '1';
      button.addEventListener('click', function () {
        storePanelState(true);
        run();
      });
    }

    if (close && !close.dataset.bound) {
      close.dataset.bound = '1';
      close.addEventListener('click', function () {
        setPanelOpen(false);
        if (button) button.focus();
      });
    }

    restorePanelState();
  }

  function scheduleBind() {
    // Avant : bind() était rappelé "à l'aveugle" à 150/600/1500 ms en espérant
    // couvrir le moment où le bouton de la barre d'outils réapparaît après une
    // navigation. Cette cascade est désormais redondante : le hub d'observers
    // (cf. plus bas, window.LSA11yObserverHub) rappelle déjà bind() à chaque
    // ajout de nœud DOM, donc de façon réactive et immédiate plutôt qu'à des
    // délais arbitraires. On ne garde qu'un seul appel synchrone ici.
    bind();
  }

  document.addEventListener('DOMContentLoaded', scheduleBind);
  document.addEventListener('pageshow', scheduleBind);
  document.addEventListener('pjax:complete', scheduleBind);
  window.addEventListener('hashchange', scheduleBind);
  window.addEventListener('popstate', scheduleBind);
  if (window.jQuery) {
    jQuery(document).on('pjax:scriptcomplete', scheduleBind);
  }
  if (window.LSA11yObserverHub) {
    window.LSA11yObserverHub.register({
      id: 'diagnostic-panel-bind',
      interest: 'addedNodes',
      onMutations: function () { bind(); }
    });
  } else if (window.MutationObserver) {
    new MutationObserver(function () {
      bind();
    }).observe(document.documentElement, { childList: true, subtree: true });
  }
})();
