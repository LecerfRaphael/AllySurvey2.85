/* FruitySurvey V2.0.32 — palette persistée par la clé React autorisée themecolor. */
(function () {
  'use strict';

  var palettes = {
    neutre: { label: '1 Neutre', names: ['1 neutre', 'neutre'], colors: ['#D2D4DB', '#4B5563', '#9500FF'] },
    industrie: { label: '2 Industrie', names: ['2 industrie', 'industrie'], colors: ['#96A2F5', '#454F91', '#5A55AF'] },
    pinklady: { label: '3 Pink Lady', names: ['3 pink lady', 'pink lady'], colors: ['#FE7DB1', '#B72962', '#89586C'] },
    brique: { label: '4 Brique du Nord', names: ['4 brique du nord', 'brique du nord'], colors: ['#FC8670', '#B14937', '#8C584F'] },
    orangette: { label: '5 Orangette', names: ['5 orangette', 'orangette'], colors: ['#F39200', '#AA2E00', '#995238'] },
    hyperion: { label: '6 Hypérion', names: ['6 hyperion', 'hyperion'], colors: ['#FFD24D', '#4D3F17', '#7B6523'] },
    ocean: { label: '7 Océan', names: ['7 ocean', 'ocean'], colors: ['#7ABAFF', '#2973C3', '#2569B1'] },
    menthe: { label: '8 Menthe', names: ['8 menthe', 'menthe'], colors: ['#89E0B1', '#3F845F', '#37724F'] },
    dune: { label: '9 Dune', names: ['9 dune', 'dune'], colors: ['#FAF0E1', '#827561', '#6F6452'] },
    commodore: { label: '10 Commodore', names: ['10 commodore', 'commodore'], colors: ['#A6CEFF', '#003D87', '#005AC7'] },
    colvert: { label: '11 Colvert', names: ['11 colvert', 'colvert'], colors: ['#4ABEB1', '#007668', '#007668'] },
    vulcain: { label: '12 Vulcain', names: ['12 vulcain', 'vulcain'], colors: ['#D15C64', '#941B23', '#944C53'] },
    orangesanguine: { label: '13 Orange Sanguine', names: ['13 orange sanguine', 'orange sanguine'], colors: ['#E67339', '#4D1900', '#8C5D45'] },
    custom: { label: 'Personnalisé', names: ['personnalise', 'custom'], colors: ['#FFFFFF', '#444444', '#1D6F42'] },
  };

  var colorOptions = {
    bodybackgroundcolor: {
      labels: ['background color', 'body background color', 'couleur de fond', 'couleur d arriere plan'],
      attribute: 'data-fas-body-background'
    },
    fontcolor: {
      labels: ['font color', 'text color', 'couleur de police', 'couleur du texte'],
      attribute: 'data-fas-font-color'
    },
    questionbackgroundcolor: {
      labels: ['question background color', 'questions background color', 'couleur de fond des questions', 'arriere plan des questions'],
      attribute: 'data-fas-question-background'
    }
  };

  function normalize(value) {
    return String(value || '')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[—–]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim()
      .toLowerCase();
  }

  function paletteFromElement(element) {
    var text = normalize(element.textContent);
    var hex = String(element.textContent || '').match(/#[0-9a-f]{6}/gi);
    var key;

    if (hex && hex.length >= 3) {
      for (key in palettes) {
        if (!Object.prototype.hasOwnProperty.call(palettes, key)) continue;
        if (palettes[key].colors[0].toLowerCase() === hex[0].toLowerCase()) {
          return { key: key, label: palettes[key].label, colors: hex.slice(0, 3) };
        }
      }
    }

    for (key in palettes) {
      if (!Object.prototype.hasOwnProperty.call(palettes, key)) continue;
      if (palettes[key].names.some(function (name) { return text.indexOf(name) !== -1; })) {
        return { key: key, label: palettes[key].label, colors: hex && hex.length >= 3 ? hex.slice(0, 3) : palettes[key].colors };
      }
    }
    return null;
  }

  function applyPalettePreview(element, palette) {
    var stops = palette.colors.map(function (color, index) {
      var start = index * 100 / palette.colors.length;
      var end = (index + 1) * 100 / palette.colors.length;
      return color + ' ' + start + '%, ' + color + ' ' + end + '%';
    });
    element.style.setProperty('--fas-palette-preview', 'linear-gradient(90deg, ' + stops.join(', ') + ')');
    element.setAttribute('data-fas-palette', palette.key);
    element.setAttribute('data-fas-palette-label', palette.label || palettes[palette.key].label);
    element.setAttribute('aria-label', (palette.label || palettes[palette.key].label) + ' : ' + palette.colors.join(', '));
    element.title = (palette.label || palettes[palette.key].label) + ' — ' + palette.colors.join(' / ');
  }

  function addSwatch(element) {
    if (!element || element.hasAttribute('data-fas-palette')) return;
    var palette = paletteFromElement(element);
    if (!palette) return;
    element.classList.add('fas-react-palette-choice');
    applyPalettePreview(element, palette);
  }

  function findPaletteBlock(doc) {
    var headings = doc.querySelectorAll('.survey-setting .h6, .settings-block .h6');
    var i;
    for (i = 0; i < headings.length; i += 1) {
      if (normalize(headings[i].textContent) === 'color palette') {
        return headings[i].closest('.survey-setting') || headings[i].parentElement.parentElement;
      }
    }
    return null;
  }

  function enhanceReactEditor(doc) {
    var block = findPaletteBlock(doc);
    var candidates;
    var i;
    if (!block) return;

    block.classList.add('fas-react-palette-setting');
    candidates = block.querySelectorAll(
      '.select__single-value, .select__option, .toggle-button, [data-testid^="toggleButton-themecolor-option-"], [data-testid^="toggleButton-allycolorpalette-option-"]'
    );
    for (i = 0; i < candidates.length; i += 1) {
      if (!candidates[i].querySelector('[size][color]')) addSwatch(candidates[i]);
    }

    /* Le menu react-select peut être rendu dans un portail hors du bloc. */
    candidates = doc.querySelectorAll('.select__option');
    for (i = 0; i < candidates.length; i += 1) addSwatch(candidates[i]);

    /* LimeSurvey 7 rend les optionimages non mappées comme pseudo-éléments. */
    candidates = block.querySelectorAll('[size][color]');
    for (i = 0; i < candidates.length; i += 1) {
      var localName = normalize(candidates[i].localName).replace('.txt', '');
      var paletteKey = localName.replace('palette-', '');
      if (!palettes[paletteKey]) continue;
      candidates[i].classList.add('fas-react-palette-icon');
      candidates[i].setAttribute('aria-hidden', 'true');
      applyPalettePreview(candidates[i], { key: paletteKey, label: palettes[paletteKey].label, colors: palettes[paletteKey].colors });
    }

    /* Les SVG de coins sont eux aussi encapsulés en .txt pour passer l'importeur. */
    candidates = doc.querySelectorAll('[size][color]');
    for (i = 0; i < candidates.length; i += 1) {
      var cornerName = normalize(candidates[i].localName).replace('.txt', '');
      if (cornerName.indexOf('cornerradius_') !== 0) continue;
      candidates[i].classList.add('fas-react-corner-icon');
      candidates[i].classList.add('fas-react-' + cornerName.replace('_', '-'));
      candidates[i].setAttribute('aria-hidden', 'true');
    }
  }

  function enhanceClassicOptions(doc) {
    var group = doc.querySelector('[aria-labelledby="lbl_simple_edit_options_themecolor"] .btn-group, [aria-labelledby="lbl_simple_edit_options_allycolorpalette"] .btn-group');
    var choices;
    var i;
    if (!group) return;
    group.closest('[aria-labelledby="lbl_simple_edit_options_themecolor"], [aria-labelledby="lbl_simple_edit_options_allycolorpalette"]').classList.add('fas-classic-palette-setting');
    choices = group.querySelectorAll('label, .btn');
    for (i = 0; i < choices.length; i += 1) {
      if (!choices[i].querySelector('.fas-palette-svg-preview, svg')) addSwatch(choices[i]);
    }
  }

  function colorOptionKeyFromText(value) {
    var text = normalize(value).replace(/[-_]+/g, ' ');
    var compact = text.replace(/\s+/g, '');
    var orderedKeys = ['questionbackgroundcolor', 'bodybackgroundcolor', 'fontcolor'];
    var key;
    var i;
    for (i = 0; i < orderedKeys.length; i += 1) {
      key = orderedKeys[i];
      if (compact.indexOf(key) !== -1) return key;
      if (colorOptions[key].labels.some(function (label) { return text.indexOf(label) !== -1; })) return key;
    }
    return null;
  }

  function enhanceColorControls(doc) {
    var blocks = doc.querySelectorAll('.survey-setting, .row.action_hide_on_inherit, [aria-labelledby^="lbl_simple_edit_options_"]');
    var i;
    var key;
    for (i = 0; i < blocks.length; i += 1) {
      if (blocks[i].hasAttribute('data-fas-color-option')) continue;
      key = colorOptionKeyFromText(
        (blocks[i].getAttribute('aria-labelledby') || '') + ' ' +
        Array.prototype.map.call(blocks[i].querySelectorAll('label, .h6'), function (label) { return label.textContent; }).join(' ')
      );
      if (key) blocks[i].setAttribute('data-fas-color-option', key);
    }
  }

  function applyPaletteToPreview(previewDoc, key) {
    var palette = palettes[key];
    var body;
    var targets;
    var variables;
    var surfaceVariables;
    var i;
    if (!previewDoc || !palette || !previewDoc.body) return;

    body = previewDoc.body;
    variables = {
      '--fas-palette-primary1': palette.colors[0],
      '--fas-palette-primary2': palette.colors[1],
      '--fas-palette-accent': palette.colors[2],
      '--fas-palette-on-primary': key === 'hyperion' || key === 'dune' ? '#000000' : '#FFFFFF',
      '--fas-palette-focus': palette.colors[2],
      '--fas-accent': palette.colors[1],
      '--fas-focus': palette.colors[2],
      '--bs-primary': palette.colors[1],
      '--bs-link-color': palette.colors[1]
    };
    surfaceVariables = [
      '--fas-palette-bg', '--fas-palette-surface', '--fas-question-background',
      '--fas-palette-surface-2', '--fas-palette-text', '--fas-palette-muted', '--fas-palette-border'
    ];
    targets = [previewDoc.documentElement, body];
    targets.forEach(function (target) {
      /* Nettoie les anciennes surcharges inline du pont V2.0.25 et rend la main au CSS/Twig enregistré. */
      surfaceVariables.forEach(function (name) { target.style.removeProperty(name); });
      Object.keys(variables).forEach(function (name) {
        target.style.setProperty(name, variables[name], 'important');
      });
    });

    body.setAttribute('data-fas-color-palette', key);
    body.style.removeProperty('background-color');
    body.style.removeProperty('color');
    for (i = body.classList.length - 1; i >= 0; i -= 1) {
      if (body.classList[i].indexOf('fas-palette-') === 0) body.classList.remove(body.classList[i]);
    }
    body.classList.add('fas-palette-' + key);

    var welcomeContainer = previewDoc.getElementById('welcome-container');
    if (welcomeContainer) {
      welcomeContainer.style.removeProperty('background-color');
      welcomeContainer.style.removeProperty('color');
    }
    previewDoc.querySelectorAll('.question-container').forEach(function (question) {
      question.style.removeProperty('background-color');
      question.style.removeProperty('color');
    });

    var welcomePreview = previewDoc.querySelector('.fas-welcome-palette-preview');
    if (welcomePreview) {
      welcomePreview.setAttribute('data-palette', key);
      var label = welcomePreview.querySelector('.fas-welcome-palette-heading strong');
      if (label) label.textContent = palette.label;
    }
  }

  function normalizeColorValue(value) {
    var match = String(value || '').trim().match(/#([0-9a-f]{6}|[0-9a-f]{3})(?![0-9a-f])/i);
    var hex;
    if (!match) return null;
    hex = match[1];
    if (hex.length === 3) hex = hex.replace(/(.)/g, '$1$1');
    return '#' + hex.toUpperCase();
  }

  function colorOptionKeyFromTarget(target) {
    var block;
    var signature;
    if (!target || !target.closest) return null;
    block = target.closest('[data-fas-color-option]');
    if (block && colorOptions[block.getAttribute('data-fas-color-option')]) {
      return block.getAttribute('data-fas-color-option');
    }
    signature = [
      target.id, target.getAttribute('name'), target.className,
      target.getAttribute('data-testid'), target.getAttribute('aria-label'),
      target.getAttribute('aria-labelledby'), target.getAttribute('placeholder')
    ].join(' ');
    return colorOptionKeyFromText(signature);
  }

  function colorValueFromTarget(target) {
    var values = [];
    var block;
    var inputs;
    var i;
    var color;
    if (!target) return null;
    values.push(target.value, target.getAttribute && target.getAttribute('value'));
    block = target.closest && target.closest('[data-fas-color-option], .survey-setting, .row.action_hide_on_inherit');
    if (block) {
      inputs = block.querySelectorAll('input');
      for (i = inputs.length - 1; i >= 0; i -= 1) values.push(inputs[i].value, inputs[i].getAttribute('value'));
    }
    for (i = 0; i < values.length; i += 1) {
      color = normalizeColorValue(values[i]);
      if (color) return color;
    }
    return null;
  }

  function applyColorToPreview(previewDoc, key, color) {
    var body;
    var targets;
    var welcomeContainer;
    if (!previewDoc || !previewDoc.body || !colorOptions[key] || !normalizeColorValue(color)) return;
    body = previewDoc.body;
    color = normalizeColorValue(color);
    targets = [previewDoc.documentElement, body];
    body.setAttribute(colorOptions[key].attribute, color);

    if (key === 'bodybackgroundcolor') {
      targets.forEach(function (target) {
        target.style.setProperty('--fas-palette-bg', color, 'important');
        target.style.setProperty('--bs-body-bg', color, 'important');
      });
      body.style.setProperty('background-color', color, 'important');
      welcomeContainer = previewDoc.getElementById('welcome-container');
      if (welcomeContainer) welcomeContainer.style.setProperty('background-color', color, 'important');
    }

    if (key === 'fontcolor') {
      targets.forEach(function (target) {
        target.style.setProperty('--fas-palette-text', color, 'important');
        target.style.setProperty('--bs-body-color', color, 'important');
      });
      body.style.setProperty('color', color, 'important');
      welcomeContainer = previewDoc.getElementById('welcome-container');
      if (welcomeContainer) welcomeContainer.style.setProperty('color', color, 'important');
      previewDoc.querySelectorAll('.question-container').forEach(function (question) {
        question.style.setProperty('color', color, 'important');
      });
    }

    if (key === 'questionbackgroundcolor') {
      targets.forEach(function (target) {
        target.style.setProperty('--fas-question-background', color, 'important');
        target.style.setProperty('--fas-palette-surface', color, 'important');
      });
      previewDoc.querySelectorAll('.question-container').forEach(function (question) {
        question.style.setProperty('background-color', color, 'important');
      });
    }
  }

  function applyPendingColors(adminDoc, iframe) {
    var pending = adminDoc.__fasPendingColors || {};
    if (!iframe) return;
    Object.keys(pending).forEach(function (pendingKey) {
      try { applyColorToPreview(iframe.contentDocument, pendingKey, pending[pendingKey]); } catch (error) { /* iframe en rechargement */ }
    });
  }

  function bindColorLoadHandler(adminDoc, iframe) {
    if (!iframe) return;
    if (iframe.__fasColorLoadHandler) {
      try { iframe.removeEventListener('load', iframe.__fasColorLoadHandler); } catch (error) { /* ancien contexte détruit */ }
    }
    iframe.__fasColorLoadHandler = function () {
      adminDoc.defaultView.setTimeout(function () { applyPendingColors(adminDoc, iframe); }, 0);
    };
    iframe.addEventListener('load', iframe.__fasColorLoadHandler);
  }

  /**
   * Remplace les anciennes cascades de setTimeout à délais fixes
   * ([0, 60, 200, 600, 1200] ms, etc.) qui tentaient de deviner quand
   * l'aperçu iframe avait fini de se re-rendre après un changement de
   * couleur/palette. Ici, on réapplique la valeur en attente exactement
   * quand le document de l'aperçu change réellement (MutationObserver),
   * plutôt qu'à des instants arbitraires. Le "load" de l'iframe (rechargement
   * complet) reste géré séparément par bindColorLoadHandler/le handler palette.
   *
   * @param {Document} adminDoc
   * @param {HTMLIFrameElement} iframe
   * @param {Object} options
   * @param {function(): boolean} options.isPending - vrai tant que la valeur doit être réappliquée
   * @param {function(Document)} options.apply - applique la valeur en attente au document de l'aperçu
   * @returns {function()} stop - arrête l'observation (à appeler à l'expiration ou au remplacement)
   */
  function watchPreviewUntilSettled(adminDoc, iframe, options) {
    var win = adminDoc.defaultView;
    var mo = null;

    function stop() {
      if (mo) {
        mo.disconnect();
        mo = null;
      }
    }

    function reapply() {
      if (!options.isPending()) { stop(); return; }
      try { options.apply(iframe.contentDocument); } catch (error) { /* iframe en rechargement */ }
    }

    // Application immédiate, puis surveillance des mutations réelles de l'aperçu.
    reapply();
    try {
      if (iframe.contentDocument && iframe.contentDocument.body && win.MutationObserver) {
        mo = new win.MutationObserver(reapply);
        mo.observe(iframe.contentDocument.body, {
          childList: true,
          subtree: true,
          attributes: true,
          attributeFilter: ['class', 'style']
        });
      }
    } catch (error) {
      /* Accès au document de l'iframe refusé pendant un rechargement transitoire. */
    }

    return stop;
  }

  function syncPreviewColor(adminDoc, key, color) {
    var iframe = adminDoc.querySelector('#theme-options-preview-container iframe, .theme-options-preview-iframe');
    var token = String(Date.now()) + '-' + key + '-' + color;
    adminDoc.documentElement.removeAttribute('data-fas-pending-palette');
    adminDoc.__fasPendingColors = adminDoc.__fasPendingColors || {};
    adminDoc.__fasPendingColorTokens = adminDoc.__fasPendingColorTokens || {};
    adminDoc.__fasColorWatchStops = adminDoc.__fasColorWatchStops || {};
    adminDoc.__fasPendingColors[key] = color;
    adminDoc.__fasPendingColorTokens[key] = token;
    if (!iframe) return;

    if (adminDoc.__fasColorWatchStops[key]) adminDoc.__fasColorWatchStops[key]();

    adminDoc.__fasColorWatchStops[key] = watchPreviewUntilSettled(adminDoc, iframe, {
      isPending: function () { return adminDoc.__fasPendingColorTokens[key] === token; },
      apply: function (contentDocument) { applyColorToPreview(contentDocument, key, color); }
    });

    // Filet de sécurité borné : passé ce délai, on arrête de réessayer même si
    // l'aperçu n'a jamais confirmé la couleur (connexion lente, iframe détruite...).
    // Ce n'est plus une cascade de tentatives, juste une limite de temps.
    adminDoc.defaultView.setTimeout(function () {
      if (adminDoc.__fasPendingColorTokens[key] === token) {
        delete adminDoc.__fasPendingColors[key];
        delete adminDoc.__fasPendingColorTokens[key];
      }
      if (adminDoc.__fasColorWatchStops[key]) {
        adminDoc.__fasColorWatchStops[key]();
        delete adminDoc.__fasColorWatchStops[key];
      }
    }, 5000);

    bindColorLoadHandler(adminDoc, iframe);
  }

  function syncPreviewFromChoice(adminDoc, key) {
    var iframe = adminDoc.querySelector('#theme-options-preview-container iframe, .theme-options-preview-iframe');
    adminDoc.documentElement.setAttribute('data-fas-pending-palette', key);
    if (!iframe) return;

    if (adminDoc.__fasPaletteWatchStop) adminDoc.__fasPaletteWatchStop();
    adminDoc.__fasPaletteWatchStop = watchPreviewUntilSettled(adminDoc, iframe, {
      isPending: function () { return adminDoc.documentElement.getAttribute('data-fas-pending-palette') === key; },
      apply: function (contentDocument) { applyPaletteToPreview(contentDocument, key); }
    });

    /* Délai de sécurité seulement : la suppression normale intervient lorsque
       l'iframe rechargée confirme la valeur enregistrée par le serveur. */
    adminDoc.defaultView.setTimeout(function () {
      if (adminDoc.documentElement.getAttribute('data-fas-pending-palette') === key) {
        adminDoc.documentElement.removeAttribute('data-fas-pending-palette');
      }
      if (adminDoc.__fasPaletteWatchStop) {
        adminDoc.__fasPaletteWatchStop();
        adminDoc.__fasPaletteWatchStop = null;
      }
    }, 10000);

    if (iframe.__fasPaletteLoadHandler) {
      try { iframe.removeEventListener('load', iframe.__fasPaletteLoadHandler); } catch (error) { /* ancien contexte détruit */ }
    }
    iframe.__fasPaletteLoadHandler = function () {
      adminDoc.defaultView.setTimeout(function () {
        var pending = adminDoc.documentElement.getAttribute('data-fas-pending-palette');
        var resolved;
        if (!pending) return;
        try {
          resolved = iframe.contentDocument.documentElement.getAttribute('data-fas-resolved-palette');
          if (resolved) adminDoc.documentElement.setAttribute('data-fas-server-palette', resolved);
          applyPaletteToPreview(iframe.contentDocument, pending);
          if (resolved === pending) {
            adminDoc.documentElement.removeAttribute('data-fas-pending-palette');
            adminDoc.documentElement.removeAttribute('data-fas-palette-save-mismatch');
          } else if (resolved) {
            adminDoc.documentElement.setAttribute('data-fas-palette-save-mismatch', resolved + '!=' + pending);
          }
        } catch (error) {
          /* Le MutationObserver de watchPreviewUntilSettled retentera au prochain changement du document. */
        }
      }, 0);
    };
    iframe.addEventListener('load', iframe.__fasPaletteLoadHandler);
  }

  function paletteKeyFromTarget(target) {
    var choice;
    var paletteElement;
    var detected;
    if (!target || !target.closest) return null;
    if (target.matches('input[name="themecolor"], input[name="allycolorpalette"]') && palettes[target.value]) return target.value;
    choice = target.closest('[data-fas-palette], .toggle-button, [data-testid^="toggleButton-themecolor-option-"], [data-testid^="toggleButton-allycolorpalette-option-"]');
    if (!choice) return null;
    paletteElement = choice.hasAttribute('data-fas-palette') ? choice : choice.querySelector('[data-fas-palette]');
    if (paletteElement && palettes[paletteElement.getAttribute('data-fas-palette')]) {
      return paletteElement.getAttribute('data-fas-palette');
    }
    detected = paletteFromElement(choice);
    return detected && detected.key;
  }

  function installPreviewSync(doc) {
    var sourceDocument = document;
    var iframe;
    var clickHandler;
    var changeHandler;
    var inputHandler;
    var pending;
    if (doc.__fasPreviewSyncSource === sourceDocument) return;
    if (doc.__fasPreviewClickHandler) {
      try { doc.removeEventListener('click', doc.__fasPreviewClickHandler, true); } catch (error) { /* ancien contexte détruit */ }
      try { doc.removeEventListener('click', doc.__fasPreviewClickHandler, false); } catch (error) { /* ancien contexte détruit */ }
    }
    if (doc.__fasPreviewChangeHandler) {
      try { doc.removeEventListener('change', doc.__fasPreviewChangeHandler, true); } catch (error) { /* ancien contexte détruit */ }
      try { doc.removeEventListener('change', doc.__fasPreviewChangeHandler, false); } catch (error) { /* ancien contexte détruit */ }
    }
    if (doc.__fasPreviewInputHandler) {
      try { doc.removeEventListener('input', doc.__fasPreviewInputHandler, true); } catch (error) { /* ancien contexte détruit */ }
      try { doc.removeEventListener('input', doc.__fasPreviewInputHandler, false); } catch (error) { /* ancien contexte détruit */ }
    }
    doc.__fasPreviewSyncSource = sourceDocument;
    doc.documentElement.setAttribute('data-fas-preview-sync-bound', 'true');
    clickHandler = function (event) {
      var key = paletteKeyFromTarget(event.target);
      if (key && palettes[key]) syncPreviewFromChoice(doc, key);
    };
    changeHandler = function (event) {
      var colorKey = colorOptionKeyFromTarget(event.target);
      var color = colorKey && colorValueFromTarget(event.target);
      var key;
      if (colorKey && color) {
        syncPreviewColor(doc, colorKey, color);
        return;
      }
      key = paletteKeyFromTarget(event.target);
      if (key && palettes[key]) syncPreviewFromChoice(doc, key);
    };
    inputHandler = function (event) {
      var colorKey = colorOptionKeyFromTarget(event.target);
      var color = colorKey && colorValueFromTarget(event.target);
      if (colorKey && color) syncPreviewColor(doc, colorKey, color);
    };
    doc.__fasPreviewClickHandler = clickHandler;
    doc.__fasPreviewChangeHandler = changeHandler;
    doc.__fasPreviewInputHandler = inputHandler;
    /* Phase de propagation : le onClick React du bouton s'exécute d'abord sur
       la racine de l'éditeur et envoie la sauvegarde avant notre aperçu. */
    doc.addEventListener('click', clickHandler, false);
    doc.addEventListener('change', changeHandler, false);
    doc.addEventListener('input', inputHandler, false);

    pending = doc.documentElement.getAttribute('data-fas-pending-palette');
    if (pending && palettes[pending]) syncPreviewFromChoice(doc, pending);
    iframe = doc.querySelector('#theme-options-preview-container iframe, .theme-options-preview-iframe');
    if (iframe) {
      bindColorLoadHandler(doc, iframe);
      applyPendingColors(doc, iframe);
    }
  }

  function installStyles(doc) {
    if (doc.getElementById('fas-admin-palette-styles')) return;
    var style = doc.createElement('style');
    style.id = 'fas-admin-palette-styles';
    style.textContent =
      '.fas-react-palette-choice{display:flex!important;align-items:center;gap:.65rem;min-width:0}' +
      '.fas-react-palette-choice:before,.fas-react-palette-icon{content:"";display:inline-block;flex:0 0 5.25rem;width:5.25rem;height:2rem;overflow:hidden;border:1px solid #69707e;border-radius:.35rem;background:var(--fas-palette-preview,#fff)}' +
      '.fas-react-palette-icon{vertical-align:middle}' +
      '.fas-react-corner-icon{display:inline-block;width:1.25rem;height:.9rem;border:2px solid currentColor;border-right:0}' +
      '.fas-react-cornerradius-0{border-radius:0}' +
      '.fas-react-cornerradius-4{border-radius:.25rem 0 0 .25rem}' +
      '.fas-react-cornerradius-20{border-radius:1rem 0 0 1rem}' +
      '.select__single-value.fas-react-palette-choice,.select__option.fas-react-palette-choice{font-size:0}' +
      '.select__single-value.fas-react-palette-choice:after,.select__option.fas-react-palette-choice:after{content:attr(data-fas-palette-label);font-size:1rem}' +
      '.fas-react-palette-setting .select__single-value{max-width:calc(100% - 8px)}' +
      '.fas-react-palette-setting .btn-group{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.75rem;width:100%}' +
      '.fas-react-palette-setting .toggle-button{display:flex;align-items:center;justify-content:center;min-height:4.25rem;border:2px solid #69707e!important;border-radius:.5rem!important}' +
      '.fas-react-palette-setting input:checked+.toggle-button,.fas-react-palette-setting .toggle-button:has(input:checked){border-color:#005ac7!important;box-shadow:0 0 0 2px #005ac7}' +
      '.fas-react-palette-setting input:checked+.toggle-button,.fas-react-palette-setting .toggle-button:has(input:checked),.fas-classic-palette-setting .btn-check:checked+.btn{color:#111827!important;font-weight:800!important}' +
      '.fas-classic-palette-setting .btn-check:checked+.btn .fas-palette-svg-preview text{fill:#000!important;stroke:#fff;stroke-width:1.2px;paint-order:stroke;font-weight:900}' +
      '.fas-classic-palette-setting .btn-group{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(12rem,1fr));gap:.5rem;width:100%;max-width:100%;min-width:0}' +
      '.fas-classic-palette-setting .btn{box-sizing:border-box;width:100%;min-width:0;min-height:5.75rem;margin:0!important;padding:.3rem;border-radius:.5rem!important;white-space:normal}' +
      '.fas-classic-palette-setting .fas-react-palette-choice{justify-content:center}' +
      '.fas-classic-palette-setting .fas-react-palette-choice:before{flex-basis:11rem;width:11rem;height:3.25rem}' +
      '.fas-footer-upload{display:flex;align-items:center;gap:.75rem;flex-wrap:wrap;margin-top:.5rem}' +
      '.fas-footer-upload .progress{flex:1 1 14rem;min-width:12rem;margin:0}' +
      '.fas-footer-upload-help{color:#4b5563;font-size:.9rem}' +
      '.fas-footer-upload-holder{position:absolute;inline-size:1px;block-size:1px;overflow:hidden;clip:rect(0 0 0 0);white-space:nowrap}' +
      '#simple_edit_options_footertext{display:block!important;width:100%!important;min-height:14rem!important;font-family:ui-monospace,SFMono-Regular,Consolas,"Liberation Mono",monospace;white-space:pre-wrap}';
    doc.head.appendChild(style);
  }

  function readOptions(doc) {
    var hidden = doc.getElementById('TemplateConfiguration_options');
    if (!hidden || !hidden.value || hidden.value === 'inherit') return {};
    try {
      return JSON.parse(hidden.value) || {};
    } catch (error) {
      return {};
    }
  }

  function writeOption(doc, key, value) {
    var hidden = doc.getElementById('TemplateConfiguration_options');
    var options;
    if (!hidden) return;
    options = readOptions(doc);
    options[key] = value;
    hidden.value = JSON.stringify(options);
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function ensureFooterTextarea(doc) {
    var textarea = doc.getElementById('simple_edit_options_footertext');
    var select = doc.getElementById('simple_edit_options_footerimage');
    var pane;
    var field;
    var col;
    var label;
    var options;

    if (textarea) {
      textarea.setAttribute('rows', textarea.getAttribute('rows') || '10');
      textarea.style.minHeight = '14rem';
      return;
    }
    if (!select) return;
    pane = select.closest('[role="tabpanel"], .tab-pane');
    if (!pane || pane.querySelector('[data-fas-footertext-fallback="1"]')) return;

    options = readOptions(doc);
    field = doc.createElement('div');
    field.className = 'col-12';
    field.setAttribute('data-fas-footertext-fallback', '1');

    label = doc.createElement('label');
    label.className = 'form-label';
    label.setAttribute('for', 'simple_edit_options_footertext');
    label.textContent = 'Footer HTML';

    col = doc.createElement('div');
    col.className = 'col-12';

    textarea = doc.createElement('textarea');
    textarea.className = 'form-control selector-text-input selector_text_option_value_field';
    textarea.id = 'simple_edit_options_footertext';
    textarea.name = 'footertext';
    textarea.rows = 10;
    textarea.value = typeof options.footertext === 'string' ? options.footertext : '';
    textarea.addEventListener('input', function () {
      writeOption(doc, 'footertext', textarea.value);
    });
    textarea.addEventListener('change', function () {
      writeOption(doc, 'footertext', textarea.value);
    });

    col.appendChild(textarea);
    field.appendChild(label);
    field.appendChild(col);
    pane.insertBefore(field, pane.firstElementChild || null);
  }

  function closestOptionBlock(element) {
    return element && (
      element.closest('.row') ||
      element.closest('.col-12, .col-8, .col-6, .col-4, .survey-setting') ||
      element.parentElement
    );
  }

  function enhanceFooterUpload(doc) {
    var select = doc.getElementById('simple_edit_options_footerimage');
    var nativeInput = doc.getElementById('upload_image_frontend');
    var nativeProgress = doc.getElementById('upload_progress_frontend');
    var block;
    var upload;
    var holder;
    var progressWrap;
    var button;
    var help;

    if (!select || !nativeInput || select.getAttribute('data-fas-footer-upload') === '1') return;
    block = closestOptionBlock(select);
    if (!block) return;

    upload = doc.createElement('div');
    upload.className = 'fas-footer-upload';
    upload.setAttribute('data-fas-footer-upload', '1');

    button = doc.createElement('button');
    button.type = 'button';
    button.className = 'btn btn-outline-secondary fas-footer-upload-button';
    button.textContent = 'Envoyer un fichier';

    help = doc.createElement('span');
    help.className = 'fas-footer-upload-help';
    help.textContent = 'Le fichier sera ajouté au dossier files du thème.';

    holder = doc.createElement('span');
    holder.className = 'fas-footer-upload-holder';

    progressWrap = doc.createElement('div');
    progressWrap.className = 'progress';
    if (nativeProgress) {
      progressWrap.appendChild(nativeProgress);
    }

    button.addEventListener('click', function () {
      holder.appendChild(nativeInput);
      if (nativeProgress && nativeProgress.parentElement !== progressWrap) {
        progressWrap.appendChild(nativeProgress);
      }
      nativeInput.click();
    });

    upload.appendChild(button);
    upload.appendChild(help);
    upload.appendChild(holder);
    if (nativeProgress) upload.appendChild(progressWrap);
    block.appendChild(upload);
    select.setAttribute('data-fas-footer-upload', '1');
  }

  function watch(doc) {
    var scheduled = false;
    function apply() {
      scheduled = false;
      installStyles(doc);
      enhanceReactEditor(doc);
      enhanceClassicOptions(doc);
      enhanceColorControls(doc);
      ensureFooterTextarea(doc);
      enhanceFooterUpload(doc);
      installPreviewSync(doc);
    }
    function schedule() {
      if (scheduled) return;
      scheduled = true;
      if (doc.defaultView.requestAnimationFrame) doc.defaultView.requestAnimationFrame(apply);
      else doc.defaultView.setTimeout(apply, 0);
    }
    apply();
    if (doc.body) new doc.defaultView.MutationObserver(schedule).observe(doc.body, { childList: true, subtree: true });
  }

  // Ce fichier est déclaré globalement dans config.xml et se charge donc
  // aussi sur les pages participant, où aucune de ses fonctions n'a de
  // cible (elles cherchent des blocs d'options de l'éditeur de thème
  // admin). Avant, `watch(document)` y démarrait quand même un
  // MutationObserver + une boucle requestAnimationFrame pour rien à
  // chaque mutation du DOM du questionnaire. On vérifie donc la
  // présence d'un marqueur de l'écran d'options de thème avant de
  // brancher quoi que ce soit sur ce document.
  function looksLikeThemeOptionsScreen(doc) {
    return !!(doc && doc.querySelector &&
      doc.querySelector('.survey-setting, .settings-block, #theme-options-preview-container, .theme-options-preview-iframe'));
  }

  function start() {
    if (looksLikeThemeOptionsScreen(document)) watch(document);
    try {
      if (window.parent && window.parent !== window && window.parent.document &&
        looksLikeThemeOptionsScreen(window.parent.document)) {
        watch(window.parent.document);
      }
    } catch (error) {
      /* L'aperçu peut être isolé sur une installation configurée avec un autre domaine. */
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
