(function(){'use strict';
function apply(){
  var b=document.body;
  if(!b||!b.classList.contains('fas-custom-enabled'))return;
  var palette=b.dataset.fasColorPalette||'neutre';
  var mw=b.dataset.fasMaxwidth||'1140';
  b.style.setProperty('--fas-content-max',mw==='none'?'none':mw+'px');
  /* Les sélecteurs avancés ne doivent jamais écraser une palette prédéfinie. */
  if(palette==='custom'){
    b.style.setProperty('--fas-accent',b.dataset.fasAccent||'#1d6f42');
    b.style.setProperty('--fas-focus',b.dataset.fasFocus||'#ffbf47');
  }else{
    b.style.removeProperty('--fas-accent');
    b.style.removeProperty('--fas-focus');
  }
}
document.addEventListener('DOMContentLoaded',apply);
document.addEventListener('pjax:complete',apply);
if(window.jQuery)jQuery(document).on('pjax:scriptcomplete',apply);
})();
