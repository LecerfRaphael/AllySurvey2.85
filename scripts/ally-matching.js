(function () {
  'use strict';

  function clean(value) {
    return String(value || '').replace(/\*/g, '').replace(/\s+/g, ' ').trim();
  }

  function visibleText(node) {
    return clean(node && node.textContent);
  }

  function ensureId(node, prefix) {
    if (!node) return '';
    if (!node.id) {
      window.__FAS_MATCH_ID__ = (window.__FAS_MATCH_ID__ || 0) + 1;
      node.id = prefix + '-' + window.__FAS_MATCH_ID__;
    }
    return node.id;
  }

  function questionTitle(question) {
    var node = question && question.querySelector(
      '.ls-label-question,.question-title-container,.question-text,legend,.question-title'
    );
    return visibleText(node) || 'Exercice d’appariement';
  }

  function directCells(row) {
    return Array.prototype.filter.call(row ? row.children : [], function (child) {
      return child && /^(TD|TH)$/i.test(child.tagName || '');
    });
  }

  function columnHeaders(table) {
    var map = [];
    var row = table.querySelector('thead tr:last-child, tr.ls-heading:last-child, tr.ls-heading');
    if (!row) return map;
    directCells(row).forEach(function (cell, index) {
      var text = visibleText(cell);
      if (text) {
        ensureId(cell, 'fas-match-col');
        cell.setAttribute('scope', 'col');
        map[index] = { id: cell.id, text: text };
      }
    });
    return map;
  }

  function enhanceTable(table) {
    if (!table || table.dataset.fasMatching === '1') return;
    var selects = table.querySelectorAll('tbody select, tr:not(.ls-heading) select');
    if (!selects.length) return;

    var question = table.closest('.question-container,fieldset[id^="question"],div[id^="question"]');
    var cols = columnHeaders(table);
    table.dataset.fasMatching = '1';
    table.classList.add('fas-accessible-matching-table');
    if (question) question.classList.add('fas-accessible-matching');

    var caption = table.querySelector(':scope > caption');
    if (!caption) {
      caption = document.createElement('caption');
      caption.className = 'visually-hidden fas-matching-caption';
      caption.textContent = 'Appariement — ' + questionTitle(question);
      table.insertBefore(caption, table.firstChild);
    }

    Array.prototype.forEach.call(table.querySelectorAll('tbody tr, tr:not(.ls-heading)'), function (row) {
      if (!row.querySelector('select')) return;
      var cells = directCells(row);
      var rowHeader = row.querySelector('th[scope="row"],th.answertext,td.answertext,.answertext');
      if (!rowHeader && cells.length) rowHeader = cells[0];
      var rowText = visibleText(rowHeader);
      if (rowHeader && rowText) {
        if (rowHeader.tagName.toLowerCase() !== 'th') {
          var th = document.createElement('th');
          Array.prototype.slice.call(rowHeader.attributes).forEach(function (attr) {
            th.setAttribute(attr.name, attr.value);
          });
          while (rowHeader.firstChild) th.appendChild(rowHeader.firstChild);
          rowHeader.parentNode.replaceChild(th, rowHeader);
          rowHeader = th;
        }
        rowHeader.setAttribute('scope', 'row');
        ensureId(rowHeader, 'fas-match-row');
      }

      directCells(row).forEach(function (cell, cellIndex) {
        var select = cell.querySelector('select');
        if (!select) return;
        var col = cols[cellIndex] || null;
        var labelText = [rowText, col && col.text].filter(Boolean).join(' — ') || questionTitle(question);
        var label = cell.querySelector('.fas-matching-visible-label');
        if (!label) {
          label = document.createElement('label');
          label.className = 'fas-matching-visible-label';
          label.setAttribute('for', ensureId(select, 'fas-match-select'));
          cell.insertBefore(label, cell.firstChild);
        }
        label.textContent = labelText;
        var ids = [];
        if (rowHeader && rowHeader.id) ids.push(rowHeader.id);
        if (col && col.id) ids.push(col.id);
        if (ids.length) select.setAttribute('aria-labelledby', ids.join(' '));
        else select.setAttribute('aria-label', labelText);
      });
    });
  }

  function init(root) {
    root = root || document;
    var tables = [];
    if (root.matches && root.matches('table.ls-answers')) tables.push(root);
    Array.prototype.push.apply(tables, root.querySelectorAll ? root.querySelectorAll('table.ls-answers') : []);
    tables.forEach(enhanceTable);
  }

  function schedule() {
    window.clearTimeout(window.__FAS_MATCH_TIMER__);
    window.__FAS_MATCH_TIMER__ = window.setTimeout(function () { init(document); }, 30);
  }

  document.addEventListener('DOMContentLoaded', schedule);
  document.addEventListener('pjax:complete', schedule);
  document.addEventListener('fas:ready', schedule);
  if (window.jQuery) window.jQuery(document).on('pjax:scriptcomplete', schedule);

  if (window.LSA11yObserverHub) {
    window.LSA11yObserverHub.register({
      id: 'matching-tables',
      interest: 'addedNodes',
      onMutations: schedule
    });
  } else if (window.MutationObserver) {
    new MutationObserver(schedule).observe(document.documentElement, { childList: true, subtree: true });
  }
}());
