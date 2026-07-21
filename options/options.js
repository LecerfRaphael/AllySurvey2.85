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
      });
      field.addEventListener('change', function () {
        hasUserChangedOptions = true;
        if (field.classList.contains('selector__color-picker')) syncColorPreview(field);
        collectOptions();
        updateChildren();
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

  function notify(message, type) {
    if (window.LS && LS.LsGlobalNotifier && LS.LsGlobalNotifier.createAlert) {
      LS.LsGlobalNotifier.createAlert(message, type || 'info', { showCloseButton: true });
    } else {
      window.alert(message);
    }
  }

  function bindFooterUpload() {
    var input = document.getElementById('fas_footer_upload_image');
    var form = document.getElementById('upload_frontend');
    var progress = document.getElementById('upload_progress_frontend');
    if (!input || !form || input.getAttribute('data-fas-upload-bound') === '1') return;
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
          notify(response.message || 'Fichier envoyé.', 'success');
          window.location.hash = 'fas-option-category-5';
          window.location.reload();
          return;
        }
        notify(response.message || "L'envoi du fichier a échoué.", 'danger');
      };
      xhr.onerror = function () {
        if (progress) progress.style.width = '0%';
        input.value = '';
        notify("L'envoi du fichier a échoué.", 'danger');
      };
      xhr.send(data);
    });
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
              '<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Fermer"></button>' +
            '</div>' +
            '<div class="modal-body">' +
              '<img class="selector__image img-fluid" src="" alt="">' +
            '</div>' +
          '</div>' +
        '</div>' +
      '</div>';
    document.body.appendChild(wrapper.firstElementChild);
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
        notify("Aucune image disponible pour cette sélection.", 'warning');
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
    bindImagePreview();
    updateChildren();
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();
}());
