/** Fruity AllySurvey V1.1 accessibility toolbar and persistent preferences. */
(function(){
  'use strict';
  var KEY='fruityAllySurvey.preferences.v1';
  var defaults={text:0,contrast:false,monochrome:false,spacing:false,links:false,motion:false,luciole:false,dyslexic:false,collapsed:null};
  function normalize(s){if(s.luciole&&s.dyslexic)s.dyslexic=false;return s;}
  function read(){try{return normalize(Object.assign({},defaults,JSON.parse(localStorage.getItem(KEY)||'{}')));}catch(e){return Object.assign({},defaults);}}
  function write(s){try{localStorage.setItem(KEY,JSON.stringify(s));}catch(e){}}
  function setClass(name,on){document.documentElement.classList.toggle(name,!!on);}
  function apply(s){
    document.documentElement.classList.remove('fas-text-1','fas-text-2','fas-text-3');
    if(s.text>0) document.documentElement.classList.add('fas-text-'+Math.min(3,s.text));
    setClass('fas-high-contrast',s.contrast);setClass('fas-monochrome',s.monochrome);setClass('fas-text-spacing',s.spacing);setClass('fas-underline-links',s.links);setClass('fas-motion-reduced',s.motion);setClass('fas-font-luciole',s.luciole);setClass('fas-font-dyslexic',s.dyslexic);
    document.querySelectorAll('[data-fas-action]').forEach(function(b){var a=b.getAttribute('data-fas-action');var m={contrast:'contrast',monochrome:'monochrome',spacing:'spacing',links:'links',motion:'motion',luciole:'luciole',dyslexic:'dyslexic'};if(m[a])b.setAttribute('aria-pressed',s[m[a]]?'true':'false');});
  }
  function announce(text){var n=document.getElementById('fas-a11y-status');if(n){n.textContent='';setTimeout(function(){n.textContent=text;},20);}}
  function initSkipToAccessibility(){if(window.__FAS_SKIP_A11Y_BOUND__)return;window.__FAS_SKIP_A11Y_BOUND__=true;document.addEventListener('click',function(e){var link=e.target.closest&&e.target.closest('.fas-skip-link-accessibility');if(!link)return;var target=document.getElementById('fas-accessibility-toggle');if(!target)return;e.preventDefault();try{target.focus({preventScroll:false});}catch(err){target.focus();}if(window.history&&window.history.replaceState){window.history.replaceState(null,'','#fas-accessibility-toggle');}});}
  function initToolbar(){
    var bar=document.getElementById('fas-accessibility-toolbar'); if(!bar)return;
    var s=read(),toggle=bar.querySelector('.fas-a11y-toggle'),french=bar.getAttribute('data-fas-language')==='fr';
    if(bar.getAttribute('data-luciole-enabled')!=='on')s.luciole=false;
    if(bar.getAttribute('data-dyslexic-enabled')!=='on')s.dyslexic=false;
    if(s.collapsed!==null){bar.classList.toggle('is-collapsed',s.collapsed);toggle.setAttribute('aria-expanded',s.collapsed?'false':'true');}
    apply(s);
    if(!bar.dataset.fasBound){
      bar.dataset.fasBound='1';
      toggle.addEventListener('click',function(){var c=bar.classList.toggle('is-collapsed');toggle.setAttribute('aria-expanded',c?'false':'true');s.collapsed=c;write(s);});
      bar.addEventListener('click',function(e){var b=e.target.closest('[data-fas-action]');if(!b)return;var a=b.getAttribute('data-fas-action');
        if(a==='text-increase'){s.text=Math.min(3,s.text+1);announce(french?'Taille du texte augmentée':'Text size increased');}
        else if(a==='text-decrease'){s.text=Math.max(0,s.text-1);announce(french?'Taille du texte réduite':'Text size decreased');}
        else if(a==='reset'){var keep=s.collapsed;s=Object.assign({},defaults,{collapsed:keep});announce(french?'Préférences d’accessibilité réinitialisées':'Accessibility preferences reset');}
        else {var map={contrast:'contrast',monochrome:'monochrome',spacing:'spacing',links:'links',motion:'motion',luciole:'luciole',dyslexic:'dyslexic'};if(map[a]){s[map[a]]=!s[map[a]];if(s[map[a]]&&a==='luciole')s.dyslexic=false;if(s[map[a]]&&a==='dyslexic')s.luciole=false;announce(b.textContent.trim()+(s[map[a]]?(french?' activé':' enabled'):(french?' désactivé':' disabled')));}}
        write(s);apply(s);
      });
    }
  }
  function init(){initSkipToAccessibility();if(document.getElementById('fas-accessibility-toolbar'))initToolbar();else apply(read());}
  if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',init);else init();
  document.addEventListener('pjax:complete',init);document.addEventListener('ajaxComplete',init);
  if(window.jQuery){window.jQuery(document).on('pjax:success ready pjax:end',init);}
})();
