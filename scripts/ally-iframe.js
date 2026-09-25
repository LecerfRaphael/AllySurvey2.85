/* AllySurvey 2.0.41 - iframe responsive bridge + persistent parameters */
(function () {
    'use strict';

    var STORAGE_PREFIX = 'allysurvey:iframe:';

    function isTruthy(value) {
        value = String(value == null ? '' : value).toLowerCase();
        return value === '1' || value === 'true' || value === 'yes' || value === 'on';
    }

    function isActuallyEmbedded() {
        try {
            return window.self !== window.top;
        } catch (error) {
            return true;
        }
    }

    function getSurveyId() {
        var sid = document.getElementById('sid');
        var match;
        if (sid && sid.value) return String(sid.value);
        match = String(window.location.pathname || '').match(/\/index\.php\/(\d+)/);
        return match ? match[1] : 'unknown';
    }

    function storageKey() {
        return STORAGE_PREFIX + getSurveyId();
    }

    function readQueryState() {
        var params;
        var iframe;
        try {
            params = new URLSearchParams(window.location.search || '');
            iframe = params.get('allyiframe');
            if (iframe === null) return null;
            return {
                iframe: isTruthy(iframe) ? '1' : '0',
                header: isTruthy(params.get('allyhideheader')) ? '1' : '0',
                footer: isTruthy(params.get('allyhidefooter')) ? '1' : '0'
            };
        } catch (error) {
            return null;
        }
    }

    function loadStoredState() {
        var raw;
        try {
            raw = window.sessionStorage.getItem(storageKey());
            if (!raw) return null;
            raw = JSON.parse(raw);
            if (!raw || raw.iframe !== '1') return null;
            return {
                iframe: '1',
                header: raw.header === '1' ? '1' : '0',
                footer: raw.footer === '1' ? '1' : '0'
            };
        } catch (error) {
            return null;
        }
    }

    function saveState(state) {
        if (!state || state.iframe !== '1') return;
        try {
            window.sessionStorage.setItem(storageKey(), JSON.stringify(state));
        } catch (error) {
            /* sessionStorage peut être indisponible selon la politique navigateur. */
        }
    }

    function resolveState() {
        var query = readQueryState();
        var stored;
        if (query && query.iframe === '1') {
            saveState(query);
            return query;
        }
        stored = loadStoredState();
        if (stored) return stored;
        return null;
    }

    function setBodyAttributeIfChanged(body, name, value) {
        if (body.getAttribute(name) !== value) body.setAttribute(name, value);
    }

    function applyEmbedOptions(state) {
        var body = document.body;
        if (!body || !state || state.iframe !== '1') return;
        document.documentElement.classList.add('fas-is-embedded');
        setBodyAttributeIfChanged(body, 'data-fas-iframe-hide-header', state.header === '1' ? 'on' : 'off');
        setBodyAttributeIfChanged(body, 'data-fas-iframe-hide-footer', state.footer === '1' ? 'on' : 'off');
    }

    function addPersistentParamsToUrl(urlValue, state) {
        var url;
        if (!state || state.iframe !== '1') return urlValue;
        try {
            url = new URL(urlValue, window.location.href);
            url.searchParams.set('allyiframe', '1');
            url.searchParams.set('allyhideheader', state.header);
            url.searchParams.set('allyhidefooter', state.footer);
            return url.href;
        } catch (error) {
            return urlValue;
        }
    }

    function persistFormAction(state) {
        var form = document.getElementById('limesurvey');
        var action;
        if (!form || !state || state.iframe !== '1') return;
        action = form.getAttribute('action') || window.location.href;
        action = addPersistentParamsToUrl(action, state);
        form.setAttribute('action', action);
    }

    function restoreParamsInAddressBar(state) {
        var current;
        var restored;
        if (!state || state.iframe !== '1' || readQueryState()) return;
        try {
            current = window.location.href;
            restored = addPersistentParamsToUrl(current, state);
            if (restored !== current && window.history && window.history.replaceState) {
                window.history.replaceState(window.history.state, document.title, restored);
            }
        } catch (error) {
            /* Sans importance pour le fonctionnement du questionnaire. */
        }
    }

    var lastHeight = 0;
    var scheduled = false;

    function pageHeight() {
        var body = document.body;
        var root = document.documentElement;
        if (!body || !root) return 0;
        return Math.max(body.scrollHeight, root.scrollHeight);
    }

    function sendHeight(force) {
        var height = pageHeight();
        if (!height || (!force && Math.abs(height - lastHeight) < 4)) return;
        lastHeight = height;
        window.parent.postMessage({ type: 'allysurvey:resize', height: height }, '*');
    }

    function schedule(force) {
        if (scheduled) return;
        scheduled = true;
        window.requestAnimationFrame(function () {
            scheduled = false;
            sendHeight(!!force);
        });
    }

    function refresh(state) {
        state = state || resolveState();
        if (!state || state.iframe !== '1') return state;
        saveState(state);
        applyEmbedOptions(state);
        persistFormAction(state);
        restoreParamsInAddressBar(state);
        return state;
    }

    function init() {
        var actualEmbed = isActuallyEmbedded();
        var state = resolveState();

        if (!state && actualEmbed) {
            /* En vraie iframe, les options du thème restent un fallback. */
            state = {
                iframe: '1',
                header: document.body && isTruthy(document.body.getAttribute('data-fas-iframe-hide-header')) ? '1' : '0',
                footer: document.body && isTruthy(document.body.getAttribute('data-fas-iframe-hide-footer')) ? '1' : '0'
            };
            saveState(state);
        }

        if (!state || state.iframe !== '1') return;
        refresh(state);

        /* Garantit les paramètres même si un autre script modifie l'action du formulaire. */
        document.addEventListener('submit', function (event) {
            if (event.target && event.target.id === 'limesurvey') persistFormAction(state);
        }, true);

        if (!actualEmbed) return;

        schedule(true);

        /* ResizeObserver suffit pour les navigateurs modernes : il capte les
           changements de taille provoqués par le DOM, les erreurs, les polices
           et le reflow. MutationObserver n'est conservé qu'en repli pour éviter
           deux observateurs permanents sur la même page. */
        if ('ResizeObserver' in window && document.body) {
            var resizeObserver = new ResizeObserver(function () { schedule(false); });
            resizeObserver.observe(document.body);
        } else if ('MutationObserver' in window && document.body) {
            var mutationObserver = new MutationObserver(function () { schedule(false); });
            mutationObserver.observe(document.body, { childList: true, subtree: true, characterData: true });
        }

        window.addEventListener('load', function () { refresh(state); schedule(true); }, { once: true });
        window.addEventListener('resize', function () { schedule(false); }, { passive: true });
        document.addEventListener('pjax:complete', function () { refresh(state); schedule(true); });
        document.addEventListener('ajaxComplete', function () { refresh(state); schedule(true); });
        window.setTimeout(function () { refresh(state); schedule(true); }, 250);
    }

    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init, { once: true });
    else init();
}());
