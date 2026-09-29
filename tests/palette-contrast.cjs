// Run with Node and Playwright available through NODE_PATH.
// Representative rendered components; this does not audit a live questionnaire.
const fs = require('node:fs');
const path = require('node:path');
const assert = require('node:assert/strict');
const { chromium } = require('playwright');
const root = path.resolve(__dirname, '..');
const read = p => fs.readFileSync(path.join(root, p), 'utf8');
const paletteCss = read('css/ally-palettes.css');
const palettes = [...paletteCss.matchAll(/body\[data-fas-color-palette="([^"]+)"\]\{--fas-palette-primary1:(#[\da-f]{6});--fas-palette-primary2:(#[\da-f]{6});--fas-palette-accent:(#[\da-f]{6})/gi)]
  .map(m => ({ name: m[1], primary1: m[2], primary2: m[3], accent: m[4] }));
assert.equal(palettes.length, 13);
function luminance(rgb) {
  return rgb.map(v => v / 255).map(v => v <= .04045 ? v / 12.92 : ((v + .055) / 1.055) ** 2.4)
    .reduce((sum, v, i) => sum + v * [.2126, .7152, .0722][i], 0);
}
function contrast(a, b) {
  const x = luminance(a), y = luminance(b);
  return (Math.max(x, y) + .05) / (Math.min(x, y) + .05);
}
const hex = c => c.slice(1).match(/../g).map(v => parseInt(v, 16));
const cssFiles = [...read('config.xml').match(/<css>([\s\S]*?)<\/css>/)[1].matchAll(/<add>(.*?)<\/add>/g)].map(m => m[1]);
const styles = ['css/variations/theme_apple.css', ...cssFiles].map(read).join('\n');
const stripTwig = s => s.replace(/\{#[\s\S]*?#\}/g, '').replace(/\{%[\s\S]*?%\}/g, '');
const languageCss = stripTwig(read('views/subviews/header/language_menu_styles.twig'));
const contrastCss = stripTwig(read('views/subviews/header/palette_contrast_styles.twig'));
let header = read('views/subviews/header/custom_header.twig');
header = header.slice(header.indexOf('    :root, body {', header.indexOf('    :root, body {') + 1));
header = header.slice(0, header.indexOf('    {% if (aSurveyInfo.options.backgroundimage'));
header = stripTwig(header);
const markup = `<header id="survey-nav" class="navbar"><button id="navbar-toggler"><span class="ri-menu-fill">Menu</span></button>
<ul id="main-dropdown" class="dropdown-menu show"><li class="dropdown-header">Choisir la langue</li>
<li class="form-change-lang dropdown nav-item"><a id="language" class="nav-link dropdown-toggle" href="#">Français</a></li>
<li><a id="english" class="dropdown-item ls-language-link" href="#">English</a></li>
<li><a id="back" class="nav-link back-link" href="#">Précédent</a></li>
<li><button id="load" class="nav-link btn btn-link">Charger un questionnaire</button></li>
<li class="index-menu-full"><a id="index" href="#" class="nav-link dropdown-toggle">Index</a></li>
<li class="list-group-item index-item"><a id="step" href="#" class="dropdown-item">Question 1</a></li></ul></header>
<main id="fas-main-content"><div class="question-container"><p id="text">Texte de la question</p><a id="link" href="#">Lien de contenu</a>
<button id="primary" class="btn btn-primary">Suivant</button><button id="move" class="ls-move-btn">Précédent</button>
<div class="answer-container"><div class="bootstrap-select"><ul class="dropdown-menu show"><li><a id="select-option" class="dropdown-item" href="#">Option</a></li></ul></div></div>
<div class="form-check"><input id="radio" type="radio" class="btn-check button-item" checked><label id="radio-label" for="radio" class="btn btn-primary">Réponse sélectionnée</label></div>
<span id="error" class="text-danger">Erreur</span></div><div id="progressbar-top"><div class="progress"><div id="progress" class="progress-bar">50 %</div></div></div></main>
<footer><span id="footer-text">Université de Lille</span><a id="footer-link" href="#">Support</a></footer>`;
const cases = ['language','english','back','load','index','step','link','primary','move','select-option','radio-label','text','error','progress','footer-text','footer-link'];
(async () => {
  const browser = await chromium.launch({headless:true, channel:process.env.PLAYWRIGHT_CHANNEL || 'msedge'});
  const page = await browser.newPage({viewport:{width:1280,height:1200}});
  const results = [], failures = [];
  try {
    for (const p of palettes) {
      const vars = { fasPrimary1:p.primary1, fasPrimary2:p.primary2, fasAccent:p.accent, fasOnPrimary:'#FFFFFF' };
      // Keep duplicated palette definitions in sync with the runtime Twig and previews.
      for (const file of ['views/subviews/header/custom_header.twig','options/options.js','scripts/ally-admin-options-bridge.js',`files/palette-${p.name}.txt`]) {
        for (const color of [p.primary1,p.primary2,p.accent]) assert.ok(read(file).toLowerCase().includes(color.toLowerCase()), `${file}: ${color}`);
      }
      for (const c of [p.primary2,p.accent]) for (const bg of ['#FFFFFF','#F8F9FB','#F3F4F6']) assert.ok(contrast(hex(c),hex(bg)) >= 4.5, `${p.name} ${c}/${bg}`);
      assert.ok(contrast([0,0,0],hex(p.primary1)) >= 4.5, p.name);
      const renderedHeader = header.replace(/\{\{ (\w+) \}\}/g, (_,key) => vars[key]);
      await page.setContent(`<style>${styles}\n${renderedHeader}\n${languageCss}\n${contrastCss}\nbody{--fas-palette-text:#444444!important} *{transition:none!important;animation:none!important} #survey-nav{position:relative} #main-dropdown{position:relative;max-height:none} .bootstrap-select .dropdown-menu{position:relative}</style><body data-fas-color-palette="${p.name}" class="fas-palette-${p.name}">${markup}</body>`);
      let minimum = Infinity;
      for (const id of cases) for (const state of ['normal','hover','focus']) {
        await page.evaluate(() => { if (document.activeElement instanceof HTMLElement) document.activeElement.blur(); });
        await page.mouse.move(1270,1190);
        const locator = page.locator('#'+id);
        if (state === 'hover') await locator.hover();
        if (state === 'focus') await locator.focus();
        const colors = await locator.evaluate(el => {
          const parse = s => (s.match(/[\d.]+/g) || []).map(Number);
          const foreground = parse(getComputedStyle(el).color);
          let background = [255,255,255];
          for (let node=el; node; node=node.parentElement) {
            const c=parse(getComputedStyle(node).backgroundColor);
            if (c.length===3 || c[3]===1) { background=c.slice(0,3); break; }
          }
          return {foreground:foreground.slice(0,3),background};
        });
        const ratio = contrast(colors.foreground, colors.background);
        minimum = Math.min(minimum,ratio);
        if (ratio < 4.5) failures.push({palette:p.name,id,state,ratio:ratio.toFixed(3),...colors});
      }
      results.push({palette:p.name,minimum:minimum.toFixed(2)});
    }
  } finally { await browser.close(); }
  console.log(JSON.stringify({results,failures},null,2));
  assert.equal(failures.length,0,'Rendered contrast failures');
})();
