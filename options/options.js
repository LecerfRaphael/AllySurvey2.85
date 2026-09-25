// Custom theme options bridge for LimeSurvey 6 and 7.
(function () {
  'use strict';

  var paletteColors = {
    neutre: ['#D2D4DB', '#4B5563', '#9500FF'],
    industrie: ['#96A2F5', '#454F91', '#5A55AF'],
    pinklady: ['#FE7DB1', '#B72962', '#89586C'],
    brique: ['#FC8670', '#B14937', '#8C584F'],
    orangette: ['#F39200', '#AA2E00', '#995238'],
    hyperion: ['#FFD24D', '#4D3F17', '#7B6523'],
    ocean: ['#7ABAFF', '#2973C3', '#2569B1'],
    menthe: ['#89E0B1', '#3F845F', '#37724F'],
    dune: ['#FAF0E1', '#827561', '#6F6452'],
    commodore: ['#A6CEFF', '#003D87', '#005AC7'],
    colvert: ['#4ABEB1', '#007668', '#007668'],
    vulcain: ['#D15C64', '#941B23', '#944C53'],
    orangesanguine: ['#E67339', '#4D1900', '#8C5D45'],
    custom: ['#FFFFFF', '#444444', '#1D6F42']
  };
  var hasUserChangedOptions = false;

  function hiddenOptions() {
    return document.getElementById('TemplateConfiguration_options');
  }

  function readOptions() {
    var hidden = hiddenOptions();
    if (!hidden || !hidden.value || hidden.value === 'inherit') return {};
    try {
      return JSON.parse(hidden.value) || {};
    } catch (error) {
      return {};
    }
  }

  function readOptionsInherited() {
    var hidden = hiddenOptions();
    return !!hidden && hidden.value === 'inherit';
  }

  function writeOptions(options) {
    var hidden = hiddenOptions();
    if (!hidden) return;
    hidden.value = JSON.stringify(options);
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function writeInheritedOptions() {
    var hidden = hiddenOptions();
    if (!hidden) return;
    hidden.value = 'inherit';
    hidden.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function themeOptionsRoot() {
    return document.querySelector('.fas-theme-options');
  }

  function collectOptions() {
    if (readOptionsInherited() && !hasUserChangedOptions) return;
    var options = readOptions();
    document.querySelectorAll('.fas-theme-options [name]').forEach(function (field) {
      var name = field.getAttribute('name');
      if (!name || field.type === 'file') return;
      if (field.matches('[type="radio"]')) {
        if (field.checked) options[name] = field.value;
        return;
      }
      options[name] = field.value;
    });
    writeOptions(options);
  }

  function setInheritedState(isInherited) {
    var root = themeOptionsRoot();
    if (root) {
      root.classList.toggle('is-inherited', !!isInherited);
      root.classList.toggle('is-customized', !isInherited);
    }
    document.querySelectorAll('.fas-theme-options .fas-option-row input, .fas-theme-options .fas-option-row select, .fas-theme-options .fas-option-row textarea, .fas-theme-options .fas-option-row button').forEach(function (field) {
      field.disabled = !!isInherited;
    });
  }

  function hydrateInheritedFields() {
    document.querySelectorAll('.fas-theme-options [name]').forEach(function (field) {
      var inheritedValue;
      if (field.type === 'file') return;
      if (field.matches('[type="radio"]')) {
        field.checked = field.getAttribute('data-inherit-checked') === '1';
        return;
      }
      inheritedValue = field.getAttribute('data-inherit-value');
      if (inheritedValue === null || inheritedValue === '') return;
      field.value = inheritedValue;
    });
  }

  function hydrateFields() {
    var options = readOptions();
    document.querySelectorAll('.fas-theme-options [name]').forEach(function (field) {
      var name = field.getAttribute('name');
      if (!name || field.type === 'file' || !Object.prototype.hasOwnProperty.call(options, name)) return;
      if (field.matches('[type="radio"]')) {
        field.checked = String(field.value) === String(options[name]);
        return;
      }
      field.value = options[name];
    });
  }

  function updateChildren() {
    if (readOptionsInherited() && !hasUserChangedOptions) {
      setInheritedState(true);
      return;
    }
    document.querySelectorAll('.fas-theme-options [data-parent]').forEach(function (field) {
      var parentName = field.getAttribute('data-parent');
      var parent = document.querySelector('.fas-theme-options [name="' + parentName + '"][value="on"]');
      var enabled = !parent || parent.checked;
      field.disabled = !enabled;
    });
  }

  function installPaletteSwatches() {
    document.querySelectorAll('input[name="themecolor"]').forEach(function (input) {
      var label = document.querySelector('label[for="' + input.id + '"]');
      var colors = paletteColors[input.value];
      if (!label || !colors || label.querySelector('.fas-palette-swatch')) return;
      var swatch = document.createElement('span');
      swatch.className = 'fas-palette-swatch';
      swatch.setAttribute('aria-hidden', 'true');
      colors.forEach(function (color) {
        var chip = document.createElement('span');
        chip.style.backgroundColor = color;
        swatch.appendChild(chip);
      });
      label.insertBefore(swatch, label.firstChild);
    });

    document.querySelectorAll('input[name="cornerradius"]').forEach(function (input) {
      var label = document.querySelector('label[for="' + input.id + '"]');
      if (!label || label.querySelector('.fas-corner-swatch')) return;
      var swatch = document.createElement('span');
      swatch.className = 'fas-corner-swatch fas-corner-' + input.value;
      swatch.setAttribute('aria-hidden', 'true');
      label.insertBefore(swatch, label.firstChild);
    });
  }

  function syncColorPreview(field) {
    var preview = field.parentElement && field.parentElement.querySelector('.selector__colorpicker-preview');
    if (preview && /^#[0-9a-f]{6}$/i.test(field.value)) preview.value = field.value;
  }

  function syncColorPreviews() {
    document.querySelectorAll('.fas-theme-options .selector__color-picker').forEach(syncColorPreview);
  }

  function bindFields() {
    document.querySelectorAll('.fas-theme-options input, .fas-theme-options select, .fas-theme-options textarea').forEach(function (field) {
      field.addEventListener('input', function () {
        hasUserChangedOptions = true;
        if (field.classList.contains('selector__colorpicker-preview')) {
          var text = field.parentElement && field.parentElement.querySelector('.selector__color-picker');
          if (text) text.value = field.value;
        }
        collectOptions();
        updateChildren();
        if (field.name === 'iframehideheader' || field.name === 'iframehidefooter') hydrateIframeCode();
      });
      field.addEventListener('change', function () {
        hasUserChangedOptions = true;
        if (field.classList.contains('selector__color-picker')) syncColorPreview(field);
        collectOptions();
        updateChildren();
        if (field.name === 'iframehideheader' || field.name === 'iframehidefooter') hydrateIframeCode();
      });
      if (field.classList.contains('selector__color-picker')) syncColorPreview(field);
    });

    document.querySelectorAll('.action_update_options_string_form, #template-options-form').forEach(function (form) {
      form.addEventListener('submit', collectOptions);
    });
    document.querySelectorAll('.action_update_options_string_button, #theme-options--submit').forEach(function (button) {
      button.addEventListener('click', collectOptions);
    });

    var customizeButton = document.getElementById('fas-customize-survey-options');
    if (customizeButton) {
      customizeButton.addEventListener('click', function () {
        hasUserChangedOptions = true;
        setInheritedState(false);
        updateChildren();
        collectOptions();
      });
    }

    var returnInheritButton = document.getElementById('fas-return-inherit-options');
    if (returnInheritButton) {
      returnInheritButton.addEventListener('click', function () {
        hasUserChangedOptions = false;
        writeInheritedOptions();
        hydrateInheritedFields();
        syncColorPreviews();
        setInheritedState(true);
        updateChildren();
      });
    }
  }

  function detectCurrentSurveyId() {
    var params;
    var value;
    var match;
    var field;

    try {
      params = new URLSearchParams(window.location.search || '');
      value = params.get('surveyid') || params.get('sid');
      if (/^\d+$/.test(value || '')) return value;
    } catch (error) {
      // URLSearchParams indisponible : continuer avec les autres méthodes.
    }

    match = (window.location.pathname || '').match(/(?:surveyid|sid|survey)\/(\d+)(?:\/|$)/i);
    if (match) return match[1];

    field = document.querySelector('input[name="surveyid"], input[name="sid"], [data-survey-id]');
    if (field) {
      value = field.value || field.getAttribute('data-survey-id') || '';
      if (/^\d+$/.test(value)) return value;
    }

    return '';
  }

  function buildCurrentSurveyPublicUrl() {
    var sid = detectCurrentSurveyId();
    var path = window.location.pathname || '/';
    var basePath = '';
    var indexPos;
    var markerPos;
    var markers = ['/admin/', '/surveyAdministration/', '/themeOptions/'];
    var i;

    if (!sid) return '';

    indexPos = path.indexOf('/index.php');
    if (indexPos >= 0) {
      basePath = path.slice(0, indexPos);
    } else {
      basePath = path.replace(/\/$/, '');
      for (i = 0; i < markers.length; i += 1) {
        markerPos = basePath.indexOf(markers[i]);
        if (markerPos >= 0) {
          basePath = basePath.slice(0, markerPos);
          break;
        }
      }
    }

    return window.location.origin + basePath + '/index.php/' + sid;
  }

  function currentIframeFlag(name) {
    var checked = document.querySelector('.fas-theme-options input[name="' + name + '"]:checked');
    var value = checked ? String(checked.value).toLowerCase() : 'off';
    return (value === 'on' || value === '1' || value === 'true' || value === 'yes') ? '1' : '0';
  }

  function addIframeQueryOptions(surveyUrl) {
    var separator;
    if (!surveyUrl) return '';
    separator = surveyUrl.indexOf('?') >= 0 ? '&' : '?';
    return surveyUrl + separator
      + 'allyiframe=1'
      + '&allyhideheader=' + currentIframeFlag('iframehideheader')
      + '&allyhidefooter=' + currentIframeFlag('iframehidefooter');
  }

  function escapeHtmlAttribute(value) {
    return String(value || '')
      .replace(/&/g, '&amp;')
      .replace(/"/g, '&quot;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;');
  }

  function detectSurveyTitleFromAdmin() {
    var selectors = [
      '[name="surveyls_title"]',
      '#surveyls_title',
      '.pagetitle',
      'h1'
    ];
    var node;
    var value;
    var i;

    for (i = 0; i < selectors.length; i += 1) {
      node = document.querySelector(selectors[i]);
      if (!node) continue;
      value = ('value' in node ? node.value : node.textContent || '').trim();
      if (value && value.toLowerCase() !== 'theme options' && value.toLowerCase() !== 'options du thème') {
        return value;
      }
    }
    return '';
  }

  function fetchSurveyTitle(surveyUrl) {
    if (!surveyUrl || !window.fetch || !window.DOMParser) return Promise.resolve('');
    return window.fetch(surveyUrl, { credentials: 'same-origin', cache: 'no-store' })
      .then(function (response) {
        if (!response.ok) return '';
        return response.text();
      })
      .then(function (html) {
        var parsed;
        var title;
        if (!html) return '';
        parsed = new DOMParser().parseFromString(html, 'text/html');
        title = parsed && parsed.querySelector('title');
        return title ? title.textContent.trim() : '';
      })
      .catch(function () { return ''; });
  }

  function renderIframeCode(code, template, embedUrl, surveyTitle) {
    var safeTitle = escapeHtmlAttribute(surveyTitle || 'Questionnaire');
    code.value = template
      .replace(/URL_DU_QUESTIONNAIRE/g, embedUrl || 'URL_DU_QUESTIONNAIRE')
      .replace(/TITRE_DU_QUESTIONNAIRE/g, safeTitle);
  }

  function hydrateIframeCode() {
    var code = document.getElementById('fas-iframe-code');
    var directUrl = document.getElementById('fas-iframe-direct-url');
    var status = document.getElementById('fas-iframe-url-status');
    var surveyUrl = buildCurrentSurveyPublicUrl();
    var embedUrl;
    var template;
    var adminTitle;

    if (!code) return;
    if (!code.getAttribute('data-fas-template')) {
      code.setAttribute('data-fas-template', code.value);
    }
    template = code.getAttribute('data-fas-template');
    adminTitle = detectSurveyTitleFromAdmin();

    if (surveyUrl) {
      embedUrl = addIframeQueryOptions(surveyUrl);
      if (directUrl) directUrl.value = embedUrl;
      renderIframeCode(code, template, embedUrl, adminTitle || 'Questionnaire');
      if (status) status.textContent = 'URL du questionnaire détectée automatiquement : ' + embedUrl;

      fetchSurveyTitle(surveyUrl).then(function (publicTitle) {
        if (publicTitle) {
          renderIframeCode(code, template, embedUrl, publicTitle);
          if (status) status.textContent = 'URL et titre du questionnaire détectés automatiquement : ' + publicTitle;
        }
      });
    } else {
      if (directUrl) directUrl.value = '';
      renderIframeCode(code, template, '', adminTitle || 'Questionnaire');
      if (status) status.textContent = 'Impossible de détecter automatiquement le numéro du questionnaire. Remplacez URL_DU_QUESTIONNAIRE manuellement.';
    }
  }

  function bindIframeUrlCopy() {
    var button = document.getElementById('fas-copy-iframe-url');
    var input = document.getElementById('fas-iframe-direct-url');
    var status = document.getElementById('fas-copy-iframe-url-status');
    if (!button || !input || button.getAttribute('data-fas-copy-bound') === '1') return;
    button.setAttribute('data-fas-copy-bound', '1');
    button.addEventListener('click', function () {
      var value = input.value || '';
      var success = function () {
        if (status) status.textContent = 'URL copiée dans le presse-papiers.';
      };
      var fallback = function () {
        input.focus();
        input.select();
        try {
          document.execCommand('copy');
          success();
        } catch (error) {
          if (status) status.textContent = 'Sélectionnez l’URL puis copiez-la manuellement.';
        }
      };
      if (!value) {
        if (status) status.textContent = 'URL du questionnaire indisponible.';
        return;
      }
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(value).then(success).catch(fallback);
      } else {
        fallback();
      }
    });
  }

  function bindIframeCodeCopy() {
    var button = document.getElementById('fas-copy-iframe-code');
    var code = document.getElementById('fas-iframe-code');
    var status = document.getElementById('fas-copy-iframe-status');
    if (!button || !code || button.getAttribute('data-fas-copy-bound') === '1') return;
    button.setAttribute('data-fas-copy-bound', '1');
    button.addEventListener('click', function () {
      var success = function () {
        if (status) status.textContent = 'Code copié dans le presse-papiers.';
      };
      var fallback = function () {
        code.focus();
        code.select();
        try {
          document.execCommand('copy');
          success();
        } catch (error) {
          if (status) status.textContent = 'Sélectionnez le code puis copiez-le manuellement.';
        }
      };
      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(code.value).then(success).catch(fallback);
      } else {
        fallback();
      }
    });
  }

  function notify(message, type) {
    if (document.__allyOptionsI18n) message = document.__allyOptionsI18n.translate(message);
    if (window.LS && LS.LsGlobalNotifier && LS.LsGlobalNotifier.createAlert) {
      LS.LsGlobalNotifier.createAlert(message, type || 'info', { showCloseButton: true });
    } else {
      window.alert(message);
    }
  }

  function bindFooterUpload() {
    var form = document.getElementById('upload_frontend');
    if (!form) return;
    document.querySelectorAll('[data-fas-image-upload]').forEach(function (input) {
    var progress = input.closest('.fas-footer-upload').querySelector('.progress-bar');
    if (input.getAttribute('data-fas-upload-bound') === '1') return;
    input.setAttribute('data-fas-upload-bound', '1');

    input.addEventListener('change', function () {
      var file = input.files && input.files[0];
      var xhr;
      var data;
      if (!file) return;

      data = new FormData(form);
      data.append('file', file);

      xhr = new XMLHttpRequest();
      xhr.open('POST', form.getAttribute('action'), true);
      xhr.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
      xhr.upload.addEventListener('progress', function (event) {
        var percent;
        if (!progress || !event.lengthComputable) return;
        percent = Math.ceil((event.loaded / event.total) * 100);
        progress.style.width = percent + '%';
        progress.setAttribute('aria-valuenow', String(percent));
        if (progress.querySelector('.visually-hidden')) {
          progress.querySelector('.visually-hidden').textContent = percent + '%';
        }
      });
      xhr.onload = function () {
        var response = {};
        if (progress) progress.style.width = '0%';
        input.value = '';
        try {
          response = JSON.parse(xhr.responseText || '{}');
        } catch (error) {
          response = {};
        }
        if (xhr.status >= 200 && xhr.status < 300 && response.success === true) {
          // Le rechargement actualise les images, mais le serveur ne connaît
          // pas encore les réglages non enregistrés du questionnaire.
          collectOptions();
          try {
            window.sessionStorage.setItem(uploadDraftKey(), JSON.stringify({
              value: hiddenOptions().value,
              createdAt: Date.now()
            }));
          } catch (error) {
            notify('Image envoyée. Enregistrez vos réglages puis rechargez la page pour actualiser la liste des images.', 'warning');
            return;
          }
          notify(response.message || 'File uploaded.', 'success');
          var pane = input.closest('.tab-pane');
          if (pane) window.location.hash = pane.id;
          window.location.reload();
          return;
        }
        notify(response.message || 'File upload failed.', 'danger');
      };
      xhr.onerror = function () {
        if (progress) progress.style.width = '0%';
        input.value = '';
        notify('File upload failed.', 'danger');
      };
      xhr.send(data);
    });
    });
  }

  function uploadDraftKey() {
    return 'fas-options-upload:' + window.location.pathname + window.location.search;
  }

  function restoreUploadDraft() {
    var draft;
    try {
      draft = window.sessionStorage.getItem(uploadDraftKey());
      window.sessionStorage.removeItem(uploadDraftKey());
      if (!draft || !hiddenOptions()) return;
      draft = JSON.parse(draft);
      if (!draft || typeof draft.value !== 'string' ||
          typeof draft.createdAt !== 'number' || Date.now() - draft.createdAt > 300000) return;
      if (draft.value !== 'inherit') {
        var options = JSON.parse(draft.value);
        if (!options || typeof options !== 'object' || Array.isArray(options)) return;
      }
      hiddenOptions().value = draft.value;
      hasUserChangedOptions = draft.value !== 'inherit';
    } catch (error) {
      // Le stockage peut être indisponible dans certains navigateurs.
    }
  }

  function ensureLightbox() {
    var modal = document.getElementById('lightbox-modal');
    var wrapper;
    if (modal) return modal;

    wrapper = document.createElement('div');
    wrapper.innerHTML =
      '<div class="modal fade" tabindex="-1" role="dialog" id="lightbox-modal">' +
        '<div class="modal-dialog modal-lg" role="document">' +
          '<div class="modal-content">' +
            '<div class="modal-header">' +
              '<h5 class="modal-title selector__title"></h5>' +
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>' +
            '</div>' +
            '<div class="modal-body">' +
              '<img class="selector__image img-fluid" src="" alt="">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrapper.firstElementChild);
    var close = document.querySelector('#lightbox-modal .btn-close');
    if (close && document.__allyOptionsI18n) close.setAttribute('aria-label', document.__allyOptionsI18n.translate('Close'));
    return document.getElementById('lightbox-modal');
  }

  function bindImagePreview() {
    document.addEventListener('click', function (event) {
      var button = event.target.closest && event.target.closest('.selector__open_lightbox');
      var target;
      var select;
      var option;
      var src;
      var title;
      var modal;
      var image;
      var modalTitle;
      if (!button) return;

      event.preventDefault();
      target = button.getAttribute('data-bs-target') || button.getAttribute('data-target');
      select = target ? document.querySelector(target) : null;
      option = select && select.options ? select.options[select.selectedIndex] : null;
      src = option ? option.getAttribute('data-lightbox-src') : '';
      title = option ? (option.textContent || option.value || '').trim() : '';
      if (!src) {
        notify('No image available for this selection.', 'warning');
        return;
      }

      modal = ensureLightbox();
      image = modal.querySelector('.selector__image');
      modalTitle = modal.querySelector('.selector__title');
      if (image) {
        image.src = src;
        image.alt = title;
      }
      if (modalTitle) modalTitle.textContent = title;

      if (window.bootstrap && bootstrap.Modal) {
        bootstrap.Modal.getOrCreateInstance(modal).show();
      } else if (window.jQuery && jQuery.fn.modal) {
        jQuery(modal).modal('show');
      } else {
        window.open(src, '_blank', 'noopener');
      }
    });
  }

  function boot() {
    restoreUploadDraft();
    if (readOptionsInherited()) {
      hydrateInheritedFields();
      setInheritedState(true);
    } else {
      hydrateFields();
      setInheritedState(false);
    }
    syncColorPreviews();
    installPaletteSwatches();
    bindFields();
    bindFooterUpload();
    hydrateIframeCode();
    bindIframeUrlCopy();
    bindIframeCodeCopy();
    bindImagePreview();
    updateChildren();
    var tabId = window.location.hash.slice(1);
    if (/^fas-option-category-\d+$/.test(tabId)) {
      var tab = document.querySelector('[data-bs-target="#' + tabId + '"]');
      if (tab && window.bootstrap && window.bootstrap.Tab) {
        window.bootstrap.Tab.getOrCreateInstance(tab).show();
      }
    }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
