# Documentation technique - AllySurvey V2.85 RGAA/WCAG autonome

Version documentaire : 16/07/2026 (régénérée à partir du contenu réel de l'archive `AllySurvey_V285_RGAA_WCAG_Autonome.zip`)
Nom du thème (`config.xml`) : `AllySurvey_V285_RGAA_WCAG_Autonome`
Variante : autonome, sans thème parent déclaré
Version manifeste (`config.xml > version`) : `2.0.32`
Version API thème : `3.0`
Compatibilité déclarée : LimeSurvey 7.0 et 6.0
Auteur déclaré : Raphaël Lecerf — Université de Lille / DAWAM (`support-limesurvey@univ-lille.fr`)
Dernière mise à jour du manifeste : `2026-07-14 00:00:50`

> Cette version de la documentation a été reconstruite en inspectant directement le contenu de l'archive fournie (`config.xml`, `README.md`, `COMPARAISON_ALLYSURVEY_V276C_V285.md`, `docs/`, `files/a11y-modules/manifest.json`, `css/`, `scripts/`, `views/`). Les écarts constatés entre les documents narratifs et le contenu réel du paquet sont signalés en section 14.

## 1. Objet

Ce document décrit le thème AllySurvey V2.85 RGAA/WCAG autonome pour LimeSurvey, à partir du contenu effectif de l'archive de distribution, et non uniquement de sa documentation narrative.

## 2. Positionnement de cette variante

- Aucun `parentThemeName` n'est déclaré dans `config.xml` : la variante est techniquement autonome.
- La compatibilité LimeSurvey 7.0 et 6.0 est déclarée dans la balise `<compatibility>` de `config.xml`.
- La clé de palette principale exposée à l'éditeur React LimeSurvey 7 est `themecolor`.
- Une clé héritée `allycolorpalette` est prise en charge en lecture de secours par le script `scripts/ally-admin-options-bridge.js` pour les configurations issues de versions antérieures.

⚠️ Le champ `<description>` du manifeste (`config.xml`) contient un texte hérité mentionnant une dépendance à `fruity_twentythree` ("Thème LimeSurvey dépendant de fruity_twentythree..."). Ce texte est incohérent avec le statut autonome du thème et devrait être corrigé avant publication (voir section 14).

## 3. Périmètre fonctionnel réel

D'après `config.xml`, `README.md` et les modules JavaScript, le thème couvre :

- structure sémantique des questions, groupes, `fieldset`/`legend` ;
- navigation clavier et focus visible renforcé (`enhancedfocus`) ;
- respect du mode réduction des animations (`reducedmotion`) ;
- messages d'erreur et zones `aria-live` ;
- gestion des champs obligatoires réellement visibles ;
- questions conditionnelles (masquage/affichage dynamique) ;
- champs date (triplet jour/mois/année), email, téléphone, numériques ;
- options "Autre, précisez" et cases à cocher avec commentaire ;
- matrices, tableaux et questions de classement/appariement ;
- confort mobile, reflow et zoom navigateur ;
- barre d'accessibilité utilisateur (`accessibilitytoolbar` et ses sous-options) ;
- 15 palettes de couleurs (voir section 7) et personnalisation avancée (`advancedcustomization`) ;
- diagnostic indicatif RGAA/WCAG et mode développeur, tous deux désactivés par défaut ;
- couche de compatibilité LimeSurvey 7 (`ls7compatibility`).

Le thème ne constitue pas un audit RGAA complet : plusieurs non-conformités documentées restent ouvertes (section 9).

## 4. Architecture réelle de l'archive

Arborescence effectivement présente dans le ZIP :

```txt
config.xml
README.md
COMPARAISON_ALLYSURVEY_V276C_V285.md
DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md
DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf
css/
docs/
files/
options/
scripts/
views/
```

Aucun `CHANGELOG.md` n'est présent dans l'archive (voir section 14).

### 4.1 `css/`

| Fichier | Rôle |
|---|---|
| `base.css`, `custom.css` | Base du thème Fruity/LimeSurvey |
| `ally-v1.css` | Socle initial AllySurvey |
| `ally-toolbar.css` | Barre d'accessibilité |
| `ally-rgaa-wcag.css` | Correctifs RGAA/WCAG génériques |
| `ally-exclusive-tools.css` | Diagnostic et mode développeur |
| `ally-customization.css` | Personnalisation avancée (accent, focus, densité, largeur) |
| `ally-ls7.css` | Compatibilité LimeSurvey 7 / Bootstrap 5 |
| `ally-matching.css` | Questions d'appariement |
| `ally-ranking.css` | Questions de classement |
| `ally-palettes.css` | Déclaration des 15 palettes (variables CSS `--fas-palette-*`) |
| `ally-admin-options.css` | Pont avec les options d'administration |
| `background-image.css`, `maintenance.css`, `print_theme.css`, `survey-list.css` | Écrans annexes |
| `variations/theme_apple*.css`, `theme_blueberry*.css`, `theme_grape*.css`, `theme_mango*.css` (+ variantes `-rtl`) | 4 variations de thème Fruity, y compris RTL |

### 4.2 `files/`

- `accessibilite.js` : bundle principal chargé en production, orchestrant les correctifs d'accessibilité (fichier unique conservé volontairement pour éviter les régressions de chargement PJAX/LimeSurvey, cf. `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md`).
- `a11y-modules/` : documentation du bundle par famille fonctionnelle, avec `manifest.json` (voir section 5) — ce dossier documente le bundle mais n'est pas lui-même chargé par LimeSurvey.
- `fonts/` : polices `Luciole-*.ttf` (Regular/Bold/Italic) et `OpenDyslexic-*.woff2` (Regular/Bold/Italic), avec licences respectives (CC-BY / OFL pour Luciole, `OpenDyslexic-OFL.txt` pour OpenDyslexic).
- `palette-*.txt` : 15 fichiers de miniatures de palette, dont `palette-highcontrast.txt` (voir écart section 14).
- `cornerradius_0.txt`, `cornerradius_4.txt`, `cornerradius_20.txt` : miniatures pour l'option `cornerradius`.
- `logo.png`, `logo_pdf.png`, `poweredby.png`, `preview.png`, `error.png`, `favicon.ico` : ressources graphiques du thème.

### 4.3 `scripts/`

| Script | Rôle observé |
|---|---|
| `ally-v1.js` | Bootstrap minimal, ajoute la classe `fruity-allysurvey` |
| `ally-toolbar.js` | Barre d'accessibilité et préférences persistées (`localStorage`, clé `fruityAllySurvey.preferences.v1`) |
| `ally-diagnostic.js` | Diagnostic indicatif RGAA/WCAG |
| `ally-developer.js` | Mode développeur (contour des questions, badges de code, inspecteur au clic) |
| `ally-customization.js` | Application des variables de personnalisation avancée (accent, focus, largeur max, densité) |
| `ally-ls7-compat.js` | Compatibilité LimeSurvey 7 / PJAX / Bootstrap 5 |
| `ally-matching.js` | Corrections spécifiques aux questions d'appariement |
| `ally-audit-fixes.js` | Correctifs ponctuels d'audit (dont libellés de fermeture localisés FR/EN) |
| `ally-admin-options-bridge.js` | Pont entre la clé React `themecolor` et les palettes internes |
| `theme.js`, `custom.js`, `ajaxify.js` | Scripts standard du socle Fruity/LimeSurvey |

### 4.4 `options/` et `views/`

- `options/options.twig` et `options/options.js` : pont d'options côté éditeur de thème.
- `views/` : layouts Twig (`layout_global.twig`, `layout_errors.twig`, `layout_maintenance.twig`, `layout_print.twig`, `layout_printanswers.twig`, `layout_statistics_user.twig`, `layout_survey_list.twig`, `layout_user_forms.twig`) et sous-vues complètes dans `views/subviews/` (contenu, en-tête, pied de page, navigation, messages, impression, confidentialité, inscription, statistiques publiques, questionnaire).

## 5. Bundle d'accessibilité et modules documentés

Le fichier `files/a11y-modules/manifest.json` documente précisément le contenu du bundle unique `files/accessibilite.js` (version de manifeste interne : `2026-06-04-p3-maintenance-tests`) :

| Module | Famille | Référentiel visé | Fonctions principales |
|---|---|---|---|
| `core-status-links` | Socle transversal, zones de statut, liens | RGAA 6/7 · WCAG 2.4.4, 4.1.3 | `ensureA11yStatusRegions`, `announceA11y`, `enhanceBlankTargetLinks`, `enhanceVisibleLabelInAccessibleName` |
| `structure-required` | Structure, langue des passages, champs obligatoires | RGAA 8/9/11 · WCAG 3.1.2, 1.3.1, 3.3.1/2 | `initPassageLanguageHints`, `initDivToFieldset`, `removeRequiredFromHiddenInputs`, `updateRequiredForInputsSelectsAndRadios` |
| `personal-data-autocomplete` | Objectif des champs utilisateur | WCAG 1.3.5 AA | `initAutoTypes`, `enhanceStandardAutocomplete`, `explicitAutocompleteToken` |
| `question-families` | Types de questions standard | RGAA 7/11 · WCAG 2.1.1, 3.3.2, 4.1.2 | `initDateTriplets`, `initOtherRadios`, `initOtherCheckboxes`, `initForceListWithComment`, `initUploadAccessibility`, `initSliderAccessibility` |
| `arrays-tables` | Tableaux et matrices | RGAA 5 · WCAG 1.3.1/2 | `enhanceArrayTableSemantics`, `buildTableGrid`, `removeMatrixCellTabStops` |
| `reflow-focus-selects` | Reflow, focus, listes déroulantes | RGAA 10 · WCAG 1.4.4/10/12, 2.4.7 | `initReflowZoomSupport`, `forceNativeSelectAccessibility`, `initBootstrapSelectKeyboardFix`, `initAriaLiveSubmitMessage` |
| `ranking` | Questions de classement | RGAA 7/11 · WCAG 2.1.1, 4.1.2 | `initRankingQuestionsA11y` |
| `session-timeout` | Avertissement de session | RGAA 13 · WCAG 2.2.1 | `initSessionTimeoutWarning` |
| `static-result-pages` | Pages hors questionnaire | RGAA 13 · WCAG 1.4.10 | `initStaticResultPagesAccessibility` |
| `observers-validation` | PJAX, observateurs et validation | RGAA 7/11 · WCAG 3.3.1/3, 4.1.2/3 | `initRequiredCleanupObservers`, `initUnhideRelevantWatcher`, `initSequentialValidation` |

Chaque module référence des identifiants de tests (`AUTO-xx`, `MAN-xx`) exploités dans la procédure de preuves (section 10).

## 6. Options du thème (`config.xml`)

Catégories d'options réellement déclarées :

- **Color themes** : `themecolor` (15 valeurs listées dans le manifeste, palette par défaut `neutre`).
- **Simple options** : `hideprivacyinfo`, `showpopups`, `notables`, `showclearall`, `questionhelptextposition`, `fixnumauto`, `cornerradius`, `cssframework` (4 variations Apple/Blueberry/Grape/Mango).
- **Colors** : `bodybackgroundcolor`, `fontcolor`, `questionbackgroundcolor`, `checkicon`.
- **Images** : `backgroundimage`, `backgroundimagefile`, `brandlogo`, `brandlogofile`.
- **Special footer** : `footertext` (texte HTML par défaut mentionnant l'Université de Lille et le RGAA 4.1), `footerlogo`, `footerimage`.
- **Fonts** : `font` (polices web-safe standard).
- **Accessibility** : `skiplinks`, `enhancedfocus`, `reducedmotion`, `rgaawcagpack`.
- **Accessibility toolbar** : `accessibilitytoolbar`, `toolbarposition`, `toolbarcollapsed`, `toolbartextsize`, `toolbarcontrast`, `toolbarmonochrome`, `toolbarspacing`, `toolbarlinks`, `toolbarmotion`, `toolbarluciole`, `toolbardyslexic`.
- **Display options** : `questionborder`, `questioncontainershadow`, `contentwidth`.
- **Exclusive tools** : `diagnosticmode`, `diagnosticvisibility` (preview/always), `developermode`, `devshowcodes`.
- **Advanced customization** : `advancedcustomization`, `allyaccentcolor`, `allyfocuscolor`, `allymaxwidth`, `allydensity`, `allyquestionstyle`, `allybuttonstyle`, `allyfontsize`.
- **LimeSurvey 7** : `ls7compatibility`.

L'ordre d'affichage dans l'éditeur React est fixé par le bloc `<optionsOrderReact>` du manifeste.

## 7. Palettes et personnalisation

Options `themecolor` réellement déclarées dans `config.xml` (14 valeurs) :

`neutre`, `industrie`, `pinklady`, `brique`, `orangette`, `hyperion`, `ocean`, `menthe`, `dune`, `commodore`, `colvert`, `vulcain`, `orangesanguine`, `custom`.

15 fichiers de miniatures `files/palette-*.txt` sont présents dans l'archive, y compris `palette-highcontrast.txt` et les variables CSS associées (`--fas-palette-*`) dans `css/ally-palettes.css`. Cette palette « contraste renforcé » est fonctionnelle en CSS/JS mais **n'est pas exposée comme valeur sélectionnable** dans la liste `themecolor` du manifeste (voir écart en section 14).

Mécanisme de persistance :

- clé principale `themecolor`, compatible éditeur React LimeSurvey 7 ;
- lecture de secours de l'ancienne clé `allycolorpalette` par `scripts/ally-admin-options-bridge.js`, pour les configurations héritées ;
- couleurs personnalisées conservées lorsque l'utilisateur choisit `custom`.

## 8. Polices accessibles

Polices publiées depuis `files/fonts/` (évite les erreurs 404 du gestionnaire d'assets LimeSurvey) :

- **Luciole** : `Luciole-Regular.ttf`, `Luciole-Regular-Italic.ttf`, `Luciole-Bold.ttf`, `Luciole-Bold-Italic.ttf` (licence CC-BY pour les fontes texte).
- **OpenDyslexic** : `OpenDyslexic-Regular.woff2`, `OpenDyslexic-Bold.woff2`, `OpenDyslexic-Italic.woff2`, `OpenDyslexic-Bold-Italic.woff2` (licence dans `OpenDyslexic-OFL.txt`).

Activables depuis les options du thème (`toolbarluciole`, `toolbardyslexic`) et depuis la barre d'accessibilité, de façon exclusive l'une de l'autre (cf. logique `normalize()` dans `scripts/ally-toolbar.js`).

## 9. Diagnostic, mode développeur et non-conformités documentées

### 9.1 Diagnostic indicatif (`docs/DIAGNOSTIC-MODE-DEVELOPPEUR.md`, `scripts/ally-diagnostic.js`)

Explicitement qualifié dans la documentation d'aide à la conception, à désactiver en production. Il détecte notamment : identifiants dupliqués, images sans alternative, champs sans étiquette, commandes sans nom accessible, `fieldset` sans `legend`, champs `required` masqués, tableaux sans en-têtes, problèmes de hiérarchie de titres ou de langue.

### 9.2 Mode développeur (`scripts/ally-developer.js`)

Affiche un contour visuel des questions, des badges d'identifiant/code, et un inspecteur au clic (élément, id, name, role, classes). Piloté par l'option `devshowcodes`.

### 9.3 Non-conformités ouvertes documentées dans `docs/`

L'archive contient plusieurs fiches de non-conformité (préfixe `NC-R`) avec un statut explicite, à traiter avant toute déclaration de conformité :

| Fiche | Sujet | Référentiel | Statut déclaré |
|---|---|---|---|
| `NC-R015-MATRICES-COMPLEXES-NVDA.md` | Matrices complexes / navigation tableau NVDA | RGAA 5.8 · WCAG 1.3.1 A | Non conforme tant que le test manuel NVDA n'est pas exécuté et documenté |
| `NC-R0210-VARIATIONS-ESPACEMENT.md` | Mode espacement sur les 8 variations de couleur | RGAA 10.8 · WCAG 1.4.12 AA | Non conforme tant que le test visuel n'est pas exécuté et documenté |
| `NC-R0311-AUTOCOMPLETE-HEURISTIQUE.md` | Autocomplete heuristique / libellés atypiques | RGAA 11.13 · WCAG 1.3.5 AA | Non conforme tant que les champs atypiques ne sont pas vérifiés |
| `NC-R0412-ORDRE-TABULATION-MATRICES.md` | Ordre de tabulation dans les matrices | RGAA 12.9 · WCAG 2.4.3 A | Non conforme tant que le parcours clavier n'a pas été validé (NVDA + Firefox) |
| `NC-R058-LANGUE-PASSAGES-CREATEURS.md` | Langue des passages / dépendance créateurs | RGAA 8.7 · WCAG 3.1.2 AA | Partiel : le thème corrige les passages explicitement marqués, mais ne détecte pas automatiquement les passages étrangers non marqués |

D'autres documents complètent le dossier de preuves sans statut de non-conformité ouverte :

- `docs/AUDIT-WCAG-253-LABEL-IN-NAME.md` : vérification du critère WCAG 2.5.3 (étiquette visible dans le nom accessible) pour les boutons de navigation, la barre d'accessibilité et le pied de page.
- `docs/GUIDE-CREATEURS-LANGUE-PASSAGES.md` : guide à destination des créateurs de questionnaires pour le balisage de langue (WCAG 3.1.2), avec la syntaxe `[lang=xx]...[/lang]` ou les attributs `data-lang`/`data-ls-lang`/`data-language`.
- `docs/LIMESURVEY-7-COMPATIBILITE.md` : détail des adaptations LimeSurvey 7 (PHP ≥ 8.1.29, couche JS idempotente PJAX, normalisation `data-bs-*`, `MutationObserver`).
- `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md` : procédure de maintenance et de preuve, référence à `window.LSA11yMaintenance.modules`, à `files/a11y-modules/manifest.json` et à un dossier `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md` **non présent dans cette archive**.

## 10. Installation

1. Importer l'archive `AllySurvey_V285_RGAA_WCAG_Autonome.zip` dans l'éditeur de thème LimeSurvey (aucun thème parent requis).
2. Activer le thème sur un questionnaire de test.
3. Réinitialiser les options du thème après mise à niveau.
4. Choisir une palette (`themecolor`) dans les options globales ou dans les options du questionnaire.
5. Vider les caches LimeSurvey et navigateur.
6. Tester un parcours complet au clavier et avec lecteur d'écran.

## 11. Tests minimum avant diffusion

- navigation clavier complète ;
- focus visible sur tous les contrôles ;
- validation des champs obligatoires ;
- question conditionnelle "Si oui..." ;
- champ date (triplet jour/mois/année) ;
- option "Autre, précisez" ;
- matrice ou tableau, y compris avec `colspan`/`rowspan` irréguliers ;
- question de classement et d'appariement ;
- zoom navigateur à 200 % et reflow à 320 px CSS ;
- affichage mobile ;
- lecteur d'écran (NVDA a minima, conformément aux fiches `NC-R` ouvertes) sur un parcours complet ;
- sauvegarde d'une palette spécifique au questionnaire, y compris avec la clé héritée `allycolorpalette`.

## 12. Limites connues

- Le thème n'améliore pas automatiquement les contenus mal rédigés par les créateurs de questionnaires.
- Les matrices très complexes restent à tester au cas par cas (`NC-R015`, `NC-R0412`).
- La détection de langue des passages ne couvre que les marquages explicites (`NC-R058`).
- Le mode espacement n'a pas de preuve documentée sur l'ensemble des variations de couleur (`NC-R0210`).
- L'heuristique d'autocomplete ne couvre pas les libellés atypiques non vérifiés (`NC-R0311`).
- Un audit RGAA complet reste nécessaire pour une déclaration officielle de conformité.

## 13. Documents associés réellement présents dans l'archive

- `README.md`
- `COMPARAISON_ALLYSURVEY_V276C_V285.md`
- `DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf`
- `docs/LIMESURVEY-7-COMPATIBILITE.md`
- `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md`
- `docs/DIAGNOSTIC-MODE-DEVELOPPEUR.md`
- `docs/GUIDE-CREATEURS-LANGUE-PASSAGES.md`
- `docs/AUDIT-WCAG-253-LABEL-IN-NAME.md`
- `docs/NC-R015-MATRICES-COMPLEXES-NVDA.md`
- `docs/NC-R0210-VARIATIONS-ESPACEMENT.md`
- `docs/NC-R0311-AUTOCOMPLETE-HEURISTIQUE.md`
- `docs/NC-R0412-ORDRE-TABULATION-MATRICES.md`
- `docs/NC-R058-LANGUE-PASSAGES-CREATEURS.md`
- `files/a11y-modules/manifest.json` et `files/a11y-modules/README.md`
- `files/fonts/README.md` (licences Luciole/OpenDyslexic)

## 14. Écarts constatés entre la documentation narrative et le contenu réel de l'archive

Ces points sont à corriger ou clarifier avant diffusion officielle :

1. **`CHANGELOG.md` référencé mais absent.** `README.md` et `COMPARAISON_ALLYSURVEY_V276C_V285.md` renvoient tous deux vers un fichier `CHANGELOG.md` ("historique détaillé des évolutions jusqu'à V2.0.32"), qui n'existe pas dans l'archive fournie.
2. **Texte de dépendance obsolète dans `config.xml`.** Le champ `<description>` du manifeste indique encore "Thème LimeSurvey dépendant de fruity_twentythree", alors qu'aucun `parentThemeName` n'est déclaré et que le thème est présenté partout ailleurs comme autonome.
3. **Palette `highcontrast` non exposée.** Un 15ᵉ fichier de miniature (`files/palette-highcontrast.txt`) et des styles CSS complets existent (`css/ally-palettes.css`), mais la valeur `highcontrast` n'apparaît pas dans la liste `options`/`optionlabels`/`optionimages` de `themecolor` dans `config.xml` : elle n'est donc pas sélectionnable depuis l'interface, sauf ajout manuel de l'option.
4. **Dossier de preuves de tests non fourni.** `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md` référence un fichier `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md`, absent de cette archive.
5. **Cinq non-conformités documentées restent ouvertes** (`NC-R015`, `NC-R0210`, `NC-R0311`, `NC-R0412`, `NC-R058`) : elles doivent être traitées ou explicitement assumées avant toute déclaration de conformité RGAA, ce que ne mentionnait pas la documentation technique précédente.
