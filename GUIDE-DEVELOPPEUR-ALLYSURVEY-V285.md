# Guide développeur — AllySurvey V2.85 RGAA/WCAG autonome

Version : générée le 18/09/2026 à partir du contenu réel de l'archive `AllySurvey_V285_RGAA_WCAG_Autonome.zip`.
Public visé : toute personne qui doit **modifier le code** du thème (JS, CSS, Twig, `config.xml`), pas seulement le consulter.

> Ce document complète `DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md` (déjà présent dans l'archive), qui décrit le périmètre fonctionnel et la conformité RGAA. Ici, l'angle est : *où toucher au code, comment c'est câblé, quels pièges éviter*.

---

## 1. Vue d'ensemble du câblage

Trois fichiers gouvernent tout : **`config.xml`** (manifeste + ordre de chargement), **`files/accessibilite.js`** (le cœur logique), et **`css/ally-palettes.css`** (les 15 palettes). Tout le reste vient se greffer autour.

```
config.xml            → déclare quels fichiers CSS/JS sont chargés, et dans quel ordre
files/accessibilite.js → bundle unique, contient toute la logique d'accessibilité par "familles"
scripts/ally-*.js      → modules satellites (observeur, toolbar, diagnostic, dev, ponts d'options...)
css/ally-*.css         → styles associés à chaque famille de fonctionnalités
options/options.twig+.js → éditeur d'options custom dans l'admin LimeSurvey
views/                 → layouts et sous-vues Twig (le HTML final)
```

## 2. Ordre de chargement JS (`config.xml > <files> > <js>`)

L'ordre déclaré dans `config.xml` est **significatif** — plusieurs scripts dépendent de globals posés par ceux chargés avant eux :

```
scripts/theme.js               ← socle Fruity/LimeSurvey (ne pas modifier sans raison forte)
scripts/custom.js              ← stub vide, conservé uniquement pour satisfaire config.xml
scripts/ally-v1.js             ← bootstrap minimal (ajoute la classe .fruity-allysurvey)
scripts/ally-toolbar.js        ← barre d'accessibilité + préférences localStorage
scripts/ally-observer-hub.js   ← expose window.LSA11yObserverHub (mutualisation des MutationObserver)
scripts/ally-text-utils.js     ← expose window.LSA11yTextUtils (helpers texte partagés)
files/accessibilite.js         ← bundle principal, consomme les deux globals ci-dessus
scripts/ally-diagnostic.js     ← mode diagnostic indicatif
scripts/ally-developer.js      ← mode développeur (contours, badges, inspecteur)
scripts/ally-customization.js  ← applique les variables CSS de personnalisation avancée
scripts/ally-ls7-compat.js     ← compatibilité LimeSurvey 7 / Bootstrap 5 / PJAX
scripts/ally-matching.js       ← correctifs questions d'appariement
scripts/ally-audit-fixes.js    ← correctifs ponctuels (liens/boutons de fermeture, etc.)
scripts/ally-admin-options-bridge.js ← pont éditeur d'options (React + classique)
```

**Règle pratique** : `ally-observer-hub.js` et `ally-text-utils.js` doivent toujours être chargés *avant* `files/accessibilite.js`, car ce dernier appelle `window.LSA11yObserverHub` et `window.LSA11yTextUtils` sans vérifier leur présence. Si vous ajoutez un nouveau script qui dépend de l'un de ces globals, insérez-le après eux dans `config.xml`.

## 3. `files/accessibilite.js` — le cœur du thème

C'est un fichier unique volontairement non éclaté (~4760 lignes), pour éviter les régressions de chargement PJAX/cache LimeSurvey (voir `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md`). Il faut le lire comme un **registre de modules exécutés à chaque boot**, pas comme un script linéaire.

### 3.1 Registre et boot

En tête de fichier :

```js
var LS_A11Y_MODULE_REGISTRY = [ /* liste des familles, avec id/label/critères RGAA */ ];
window.LSA11yMaintenance = window.LSA11yMaintenance || {};
window.LSA11yMaintenance.version = LS_A11Y_BUNDLE_VERSION;
window.LSA11yMaintenance.modules = LS_A11Y_MODULE_REGISTRY.slice();
window.LSA11yMaintenance.bootLog = window.LSA11yMaintenance.bootLog || [];
```

Chaque famille est exécutée via un wrapper commun :

```js
function runA11yModule(moduleId, root, runner) { /* exécute runner(root), journalise si debug=true */ }
```

En fin de fichier, la fonction `boot(root)` appelle `runA11yModule(...)` pour chaque famille (structure, dates/autre/commentaires, tableaux, reflow/focus, classement, session, pages statiques, observateurs/validation), puis :

```js
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", function () { boot(document); });
} else {
  boot(document);
}
document.addEventListener("pjax:success", function (e) {
  boot((e && e.target) ? e.target : document);
});
```

**Conséquence pour vous** : chaque fonction d'init doit être **idempotente et re-jouable sur un sous-arbre** (`root`/`scope`), car `boot()` est rappelé à chaque navigation PJAX, pas seulement au chargement initial. Les gardes `window.__LS_XXX_OBS__` visibles dans le bloc `observers-validation` servent à n'attacher certains observateurs globaux qu'une seule fois — reproduisez ce motif pour tout nouvel observateur global que vous ajoutez.

### 3.2 Où ajouter une nouvelle correction

1. Identifiez la famille fonctionnelle la plus proche dans `LS_A11Y_MODULE_REGISTRY` (section 3.1) et dans `files/a11y-modules/manifest.json`.
2. Ajoutez votre fonction dans le bloc `runA11yModule("<id-famille>", root, function (scope) { ... })` correspondant, en utilisant `scope` (et non `document`) pour rester compatible PJAX.
3. Mettez à jour `files/a11y-modules/manifest.json` **et** le fichier `.md` de famille dans `files/a11y-modules/` si vous changez la responsabilité d'une fonction — ce dossier ne fait que documenter le bundle, il n'est **pas chargé** par LimeSurvey (voir section 5).
4. Si votre correction doit réagir aux changements dynamiques du DOM (ajout/suppression de nœuds), passez par `window.LSA11yObserverHub.register(...)` plutôt que de créer un `new MutationObserver(...)` local (section 4.1) — c'est la règle qui a permis de supprimer la prolifération d'observateurs lors du dernier refactoring.

## 4. Modules satellites (`scripts/`)

| Fichier | Global exposé | Rôle | À savoir pour le modifier |
|---|---|---|---|
| `ally-observer-hub.js` | `window.LSA11yObserverHub` | Mutualise les `MutationObserver` avec coalescing `requestAnimationFrame` | `register(config)` ajoute un watcher ; `start()` démarre l'observation unique sur `document`/`document.body`. Ne crée pas d'observateur si `window.MutationObserver` est absent. Se réinitialise sur `pjax:complete`. |
| `ally-text-utils.js` | `window.LSA11yTextUtils` | Helpers texte partagés (`cleanText`, `normaliseIdPart`, `questionOf`, `questionTitle`) | Ne redéfinissez pas ces fonctions ailleurs — 16 définitions locales ont déjà été remplacées par des wrappers délégants vers ce module lors du dernier refactoring. `numberFrom` et `boot` sont **volontairement** restés dupliqués ailleurs : ce sont des implémentations distinctes, pas des doublons à fusionner. |
| `ally-toolbar.js` | — | Barre d'accessibilité utilisateur, préférences persistées | Clé `localStorage` : `fruityAllySurvey.preferences.v1`. `luciole` et `dyslexic` sont mutuellement exclusifs (`normalize()`). Se réinitialise sur `pjax:complete`, `ajaxComplete`, et (si jQuery présent) `pjax:success`/`ready`/`pjax:end`. |
| `ally-diagnostic.js` | — | Mode diagnostic indicatif (aide à la conception, à désactiver en prod) | État panneau ouvert/fermé stocké sous la clé `localStorage` `fasDiagnosticPanelOpen`. Piloté par les options `diagnosticmode`/`diagnosticvisibility`. |
| `ally-developer.js` | — | Mode développeur (contour de question, badge id/code, inspecteur au clic) | Fichier très compact (une ligne minifiée). Piloté par le bouton `#fas-toggle-developer` et l'option `devshowcodes`. Classes `.fas-dev-outline`/`.fas-dev-badge`/`.fas-dev-inspector`. |
| `ally-customization.js` | — | Applique les variables CSS de personnalisation avancée | Lit `data-fas-*` sur `<body>` (`fasColorPalette`, `fasMaxwidth`, `fasAccent`, `fasFocus`). N'écrase l'accent/focus que si la palette est `custom` — ne changez pas cette condition sans vérifier `ally-admin-options-bridge.js`, qui dépend du même contrat. |
| `ally-ls7-compat.js` | `window.FruityAllySurveyLS7` | Compatibilité LimeSurvey 7 / Bootstrap 5 / PJAX | Détecte la version LimeSurvey via `data-limesurvey-version`/`window.LS_VERSION` (repli sur `7`). Normalise `data-toggle`→`data-bs-toggle`, `data-target`→`data-bs-target`. Écoute une longue liste d'événements (`pjax:*`, `ls:page:ready`, `limesurvey:page:ready`, `pageshow`). Désactivable via `data-fas-ls7-compat="off"` sur `<body>`. |
| `ally-matching.js` | — | Corrections questions d'appariement | Ajoute `.fas-accessible-matching-table` / `.fas-accessible-matching`, gère `<caption>` et libellés visibles cachés. |
| `ally-audit-fixes.js` | — | Correctifs ponctuels d'audit | `convertToButton()` transforme les `<a role="button">` déclenchant du JS en vrais `<button type="button">` (fait à la volée pour ce qui n'a pas pu être corrigé côté Twig). Libellés FR/EN de fermeture/menu déduits de `document.documentElement.lang`. |
| `ally-admin-options-bridge.js` | — | Pont entre l'éditeur d'options LimeSurvey (React et classique) et les palettes internes | Voir section 6. |

### 4.1 Pattern à respecter : un seul point d'observation DOM

Avant le dernier refactoring, plusieurs fichiers créaient chacun leur `MutationObserver`. Ce n'est plus le cas : `ally-observer-hub.js` centralise tout. Pour observer le DOM depuis un nouveau module :

```js
window.LSA11yObserverHub.register({
  id: "mon-watcher",                 // identifiant unique, utilisé dans les logs debug
  attributeFilter: ["class", "aria-hidden"], // optionnel
  test: function (mutations) { /* renvoie true si la mutation vous concerne */ },
  run: function () { /* votre traitement */ }
});
```

N'appelez `new MutationObserver(...)` directement que si vous avez une raison technique de ne pas passer par le hub (documentez-la dans le commentaire du code).

## 5. `files/a11y-modules/` — documentation, pas du code chargé

Ce dossier (fichiers numérotés `00-...js` à `09-...js`, `manifest.json`, `README.md`) **décrit** le contenu de `files/accessibilite.js` famille par famille, avec les critères RGAA/WCAG visés et les identifiants de tests (`AUTO-xx`, `MAN-xx`). **LimeSurvey ne charge pas ces fichiers** — le seul fichier réellement exécuté reste `files/accessibilite.js` (voir `config.xml`, section 2).

Règle de maintenance indiquée dans `files/a11y-modules/README.md`, à respecter à chaque modification :

1. Modifier d'abord la famille concernée dans `files/accessibilite.js`.
2. Mettre à jour `files/a11y-modules/manifest.json` si une fonction change de responsabilité.
3. Rejouer `node tests/accessibilite/run-static-a11y-checks.js`.
4. Rejouer les tests manuels de `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md`.
5. Ajouter la preuve dans le dossier d'audit du questionnaire testé.

⚠️ **Le dossier `tests/accessibilite/` n'est pas présent dans cette archive** — ni le script `run-static-a11y-checks.js`, ni la matrice de tests. Si vous reprenez ce projet, ces éléments existent probablement dans un dépôt séparé ; sans eux, les étapes 3 et 4 ci-dessus ne sont pas exécutables tel quel.

Pour du debug en navigateur (utile pour vérifier qu'une famille se relance bien après PJAX) :

```js
window.LSA11yMaintenance.debug = true;
window.LSA11yMaintenance.bootLog = [];
// puis naviguer dans le questionnaire et inspecter window.LSA11yMaintenance.bootLog
```

## 6. Système de palettes — les trois couches à garder synchronisées

Modifier une palette (ou en ajouter une) touche **trois endroits distincts** :

1. **`config.xml`** — l'option `themecolor` (type `buttons`) liste `options`, `optionlabels` et `optionimages` en parallèle, séparés par `|`. Les trois listes doivent rester alignées position par position.
2. **`css/ally-palettes.css`** — déclare les variables CSS `--fas-palette-*` par palette.
3. **`options/options.js`** — objet `paletteColors` (clé palette → 3 couleurs hex) utilisé par l'éditeur d'options pour l'aperçu.
4. **`scripts/ally-admin-options-bridge.js`** — logique de prévisualisation en direct dans l'éditeur (React et classique), fonctions `applyPaletteToPreview`, `applyColorToPreview`, `paletteFromElement`.

**Écart existant à connaître** : `files/palette-highcontrast.txt` et les styles CSS correspondants existent, mais `highcontrast` **n'est pas listée** dans `options`/`optionlabels`/`optionimages` de `themecolor` dans `config.xml` — cette palette n'est donc pas sélectionnable depuis l'interface actuellement. Si vous l'activez, ajoutez-la aux trois listes de `config.xml` en conservant l'alignement des positions, et vérifiez `options.js`/`ally-admin-options-bridge.js`.

Deux clés de persistance coexistent : `themecolor` (clé React officielle, LimeSurvey 7) et l'ancienne clé `allycolorpalette`, relue en repli par `ally-admin-options-bridge.js` pour les questionnaires configurés avec une version antérieure du thème. Ne supprimez pas ce repli sans migration explicite des données existantes.

### 6.1 Pont éditeur d'options (`ally-admin-options-bridge.js`)

Ce script fait le lien entre l'éditeur d'options LimeSurvey (React *et* interface classique) et l'aperçu du questionnaire dans l'iframe :

- `enhanceReactEditor(doc)` / `enhanceClassicOptions(doc)` : ciblent les deux interfaces d'édition possibles (les sélecteurs CSS diffèrent, ex. `[data-testid^="toggleButton-themecolor-option-"]` pour React).
- `applyPaletteToPreview` / `applyColorToPreview` : injectent les variables CSS dans le document de l'iframe de prévisualisation, sans attendre un rechargement complet.
- `watchPreviewUntilSettled(adminDoc, iframe, options)` : remplace les anciennes cascades de `setTimeout` par un `MutationObserver` sur le document de l'iframe, avec des timeouts de sécurité bornés — si vous devez attendre qu'un état de l'aperçu se stabilise, réutilisez ce helper plutôt que d'ajouter un nouveau `setTimeout`.
- Une garde `looksLikeThemeOptionsScreen()` empêche ce script d'attacher des observateurs "live" sur les pages vues par les participants — si vous étendez ce pont, gardez cette vérification en tête d'exécution pour ne pas alourdir le parcours répondant.

## 7. CSS — rôle de chaque fichier

| Fichier | Rôle |
|---|---|
| `base.css`, `custom.css` | Base héritée du thème Fruity/LimeSurvey |
| `ally-v1.css` | Socle initial AllySurvey |
| `ally-toolbar.css` | Barre d'accessibilité |
| `ally-rgaa-wcag.css` | Correctifs RGAA/WCAG génériques |
| `ally-exclusive-tools.css` | Styles des modes diagnostic et développeur |
| `ally-customization.css` | Personnalisation avancée (accent, focus, densité, largeur) |
| `ally-ls7.css` | Compatibilité LimeSurvey 7 / Bootstrap 5 |
| `ally-matching.css` | Questions d'appariement |
| `ally-ranking.css` | Questions de classement |
| `ally-palettes.css` | Déclaration des 15 palettes (variables `--fas-palette-*`) |
| `ally-admin-options.css` | Styles du pont avec l'éditeur d'options admin |
| `background-image.css`, `maintenance.css`, `print_theme.css`, `survey-list.css` | Écrans annexes |
| `variations/theme_*.css` (+ `-rtl`) | 4 variations Fruity historiques (Apple/Blueberry/Grape/Mango), y compris RTL |

Convention de nommage : classes préfixées `fas-` (héritage "FruityAllySurvey") pour tout ce qui est spécifique au thème ; ne réutilisez pas ce préfixe pour du CSS non lié à l'accessibilité afin de garder la recherche `grep -r "fas-"` fiable.

## 8. `options/` — éditeur de thème

- `options/options.twig` : structure HTML/onglets de l'écran d'options custom (styles inline `.fas-theme-options`).
- `options/options.js` : logique JS de cet écran — dont l'objet `paletteColors` (section 6) utilisé pour les aperçus de couleur dans l'éditeur.

Raphael modifie fréquemment ces deux fichiers en parallèle du reste ; en cas de fusion, vérifiez la cohérence entre `options.js` (`paletteColors`), `config.xml` (`themecolor`) et `ally-admin-options-bridge.js`.

## 9. `views/` — layouts et sous-vues Twig

Structure standard LimeSurvey/Fruity (voir `views/README.md`, non spécifique à AllySurvey) :

- `layout_global.twig` : rendu du questionnaire, inclut dynamiquement `./subviews/content/<include_content>.twig`.
- `layout_user_forms.twig`, `layout_survey_list.twig`, `layout_errors.twig`, `layout_maintenance.twig`, `layout_print.twig`, `layout_printanswers.twig`, `layout_statistics_user.twig` : layouts spécialisés par écran.
- `views/subviews/` : contenu, en-tête, pied de page, navigation, messages, impression, confidentialité, inscription, statistiques publiques — voir `views/subviews/README.md` et `views/subviews/survey/README.md`/`printanswers/README.md` pour le détail des sous-dossiers.

Modification notable déjà faite dans le cadre du chantier RGAA : dans `privacy_text.twig` et `privacy_modal.twig`, les `<a role="button">` déclenchant du JavaScript ont été convertis en `<button type="button">` directement en Twig plutôt que patchés au runtime — préférez systématiquement cette approche (source Twig) à un correctif JS (`convertToButton()` dans `ally-audit-fixes.js`) quand le gabarit concerné est identifiable et modifiable.

## 10. Zone à ignorer : le bloc `<engine>` de `config.xml`

`config.xml` contient un bloc `<engine><screens>...</screens></engine>` avec des blocs par écran (`question`, `welcome`, `completed`, etc.). Ces blocs ne référencent que `theme.js`/`custom.js` — **jamais** les fichiers `ally-*.js` — et correspondent à du scaffolding par défaut de l'éditeur de thème LimeSurvey, sans lien avec le chargement réel des scripts (qui se fait uniquement via `<files><js>`, section 2). Ne cherchez pas à y câbler une nouvelle logique JS : ça n'aurait aucun effet sur le chargement des scripts.

## 11. Environnement de dev et vérifications avant commit

- Pas de build/bundler : tout JS est chargé tel quel par LimeSurvey. Validez au minimum la syntaxe avec `node --check <fichier>.js` avant tout envoi.
- Pas de `package.json`/dépendances npm dans cette archive — pas de linter ni de tests automatisés fournis. `tests/accessibilite/` (référencé par la documentation) est absent (voir section 5) : à reconstituer ou à réclamer si vous reprenez la maintenance du projet.
- Après toute modification JS/CSS, réimporter le thème dans LimeSurvey, vider les caches (thème + navigateur), puis rejouer manuellement les 12 points listés dans `DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md` (section 11 "Tests minimum avant diffusion").
- Testez systématiquement un cycle PJAX (navigation entre pages du questionnaire) après modification d'un module qui touche au DOM : c'est la source la plus fréquente de régressions silencieuses dans ce thème (double-attachement d'observateurs, boot non rejoué, etc.).

## 12. Repères rapides (grep utiles)

```bash
grep -n "runA11yModule(\"<famille>\"" files/accessibilite.js   # localiser une famille dans le bundle
grep -rn "LSA11yObserverHub\." scripts/ files/                 # tous les points d'observation DOM
grep -rn "fas-" css/*.css | grep -v variations                 # classes/variables du thème (hors variantes Fruity)
grep -n "themecolor\|allycolorpalette" config.xml scripts/*.js options/*.js  # tout ce qui touche à la persistance de palette
```
