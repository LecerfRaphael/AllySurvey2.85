# Documentation technique - AllySurvey V2.85 RGAA/WCAG autonome

Version documentaire : 28/09/2026 (mise à jour à partir des fichiers du thème présents dans le projet)
Nom du thème (`config.xml`) : `AllySurvey_V285_RGAA_WCAG_AutonomeV2`
Variante : autonome, sans thème parent déclaré
Version manifeste (`config.xml > version`) : `2.0.41`
Version API thème : `3.0`
Compatibilité déclarée : LimeSurvey 7.0 et 6.0
Auteur déclaré : Raphaël Lecerf — Université de Lille / DAWAM (`support-limesurvey@univ-lille.fr`)
Dernière mise à jour déclarée du manifeste : `2026-09-25 14:00:00`

> Cette version de la documentation a été reconstruite en inspectant directement le contenu de l'archive fournie (`config.xml`, `README.md`, `COMPARAISON_ALLYSURVEY_V276C_V285.md`, `docs/`, `files/a11y-modules/manifest.json`, `css/`, `scripts/`, `views/`). Les écarts constatés entre les documents narratifs et le contenu réel du paquet sont signalés en section 14.

## 1. Objet

Ce document décrit le thème AllySurvey V2.85 RGAA/WCAG autonome pour LimeSurvey, à partir du contenu effectif de l'archive de distribution, et non uniquement de sa documentation narrative.

## 2. Positionnement de cette variante

### Nouveautés d'administration couvertes par cette mise à jour

AllySurvey 2.85 permet de personnaliser les fonctions suivantes depuis les options du thème, sans modifier les fichiers Twig :

| Fonction | Réglages disponibles | Détails |
|---|---|---|
| Gestion de session | Durée estimée et délai d'avertissement en minutes | Section 6.1 |
| Langue des options | Libellés adaptés à la langue de l'administration, compléments français/anglais | Section 6.2 |
| Messages personnalisés | Texte du questionnaire expiré et texte des autres erreurs bloquantes | Section 6.3 |
| Assistance indépendante | Nom et e-mail distincts de l'administrateur du questionnaire | Section 6.3 |
| Gestion des images | Envoi du logo, du fond, de l'image du pied de page et de l'illustration des messages | Sections 6.4 et 6.5 |
| Intégration iframe | Code à copier, URL directe, masquage de l'en-tête/pied de page et hauteur automatique | Section 6.6 |

Ces options simplifient l'administration et limitent les personnalisations dans le code. Leur périmètre exact et les vérifications sur l'instance cible sont précisés ci-dessous.

- Aucun `parentThemeName` n'est déclaré dans `config.xml` : la variante est techniquement autonome.
- La compatibilité LimeSurvey 7.0 et 6.0 est déclarée dans la balise `<compatibility>` de `config.xml`.
- La clé de palette principale exposée à l'éditeur React LimeSurvey 7 est `themecolor`.
- Une clé héritée `allycolorpalette` est prise en charge en lecture de secours par le script `scripts/ally-admin-options-bridge.js` pour les configurations issues de versions antérieures.

Le champ `<description>` du manifeste décrit désormais explicitement un thème autonome ; l'ancienne mention de dépendance à `fruity_twentythree` a été corrigée.

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
| `ally-iframe.css` | Présentation intégrée et masquage conditionnel de l'en-tête et du pied de page |
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
| `ally-options-i18n.js` | Traduction des libellés d'administration selon la langue de la page ; complément français/anglais |
| `ally-iframe.js` | Persistance des paramètres d'intégration et transmission de la hauteur au site hôte |
| `theme.js`, `custom.js`, `ajaxify.js` | Scripts standard du socle Fruity/LimeSurvey |

### 4.4 `options/` et `views/`

- `options/options.twig` et `options/options.js` : interface classique des options, héritage/personnalisation, envoi d'images et génération/copie du code iframe et de son URL.
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

- **Color themes** : `themecolor` (14 valeurs listées dans le manifeste, palette par défaut `neutre`).
- **Session** : `sessiontimeoutminutes`, `sessionwarningminutes` (durées en minutes).
- **Messages et contact** : `expiredsurveytext`, `surveyerrortext`, `surveycontactname`, `surveycontactemail` (vides par défaut), `messageimageenabled`, `messageimagefile`, `messageimagealt`.
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
- **Intégration** : `iframehideheader`, `iframehidefooter` (tous deux à `off` par défaut) ; générateur de code et copie d'URL dans l'interface classique.

L'ordre d'affichage dans l'éditeur React est fixé par le bloc `<optionsOrderReact>` du manifeste.

### 6.1 Durée de session et avertissement

Dans **Options du thème > Session**, deux valeurs sont personnalisables au niveau du thème ou du questionnaire :

| Réglage | Clé enregistrée | Valeur par défaut |
|---|---|---|
| Durée de session estimée (minutes) | `sessiontimeoutminutes` | 24 |
| Avertir avant l'expiration (minutes) | `sessionwarningminutes` | 3 |

Avec les valeurs par défaut, l'alerte apparaît après 21 minutes sans interaction suivie par le script, puis affiche un compte à rebours de 3 minutes. Les événements clavier, pointeur, tactile, changement ou saisie réarment le délai d'avertissement. Le bouton « Prolonger la session » envoie une requête au serveur avant de réarmer l'alerte.

Ces options règlent une **estimation côté navigateur** : elles ne modifient pas la durée de session du serveur LimeSurvey/PHP. Les aligner sur la configuration du serveur. Une interaction locale ne garantit pas le renouvellement de la session serveur ; la réussite réseau de la requête de prolongation ne prouve pas non plus que la session est encore valide.

Dans l'éditeur classique, saisir des minutes entières positives et un avertissement inférieur à la durée de session. Le script utilise ses valeurs par défaut pour une valeur non numérique ou non positive. Si l'avertissement est supérieur ou égal à la durée de session, il utilise un quart de cette durée, avec un minimum de 30 secondes.

Pour un questionnaire qui hérite des options générales, activer « Personnaliser le questionnaire » avant de modifier les valeurs. Enregistrer puis rouvrir les options pour vérifier leur persistance. L'affichage et l'enregistrement complets sur une instance LimeSurvey restent à valider.

### 6.2 Langue des options d'administration

Les libellés de la page classique passent par la traduction native `gT()` de LimeSurvey. Le script `scripts/ally-options-i18n.js` complète les traductions propres au thème en **français et anglais**, selon l'attribut `lang` de la page d'administration. Les variantes comme `fr-FR`, `fr_CA` et `en-GB` sont reconnues.

La langue effective de l'administration est utilisée : une préférence du compte administrateur peut différer de la langue par défaut de la plateforme. La langue du questionnaire affiché dans l'aperçu ne commande pas celle des réglages.

Pour les autres langues, les traductions natives sont conservées ; les libellés propres au thème sans traduction restent dans leur langue source, généralement l'anglais. Il ne s'agit pas d'une traduction automatique de toutes les langues. Les clés, valeurs enregistrées et contenus saisis ne sont pas traduits.

La page classique charge directement le script ; l'aperçu peut également compléter les libellés du document d'administration parent, lorsque celui-ci est accessible sur la même origine. Voir `docs/LANGUE-OPTIONS-THEME.md` pour les détails.

### 6.3 Messages personnalisés et contact d'assistance

Dans **Options du thème > Messages et contact**, quatre champs permettent de personnaliser les pages d'erreur bloquantes du questionnaire :

| Champ | Clé enregistrée | Comportement |
|---|---|---|
| Message du questionnaire expiré | `expiredsurveytext` | Remplace le message de l'erreur `survey-expiry` |
| Message d'erreur du questionnaire | `surveyerrortext` | Remplace le message des autres erreurs bloquantes rendues par le thème |
| Nom du contact d'assistance | `surveycontactname` | Personne ou service affiché comme contact |
| Adresse e-mail du contact d'assistance | `surveycontactemail` | Adresse affichée et lien e-mail |

Pour modifier un seul questionnaire, personnaliser ses options avant de saisir les valeurs. Les réglages généraux peuvent être hérités par les questionnaires. Les messages sont en texte simple, avec conservation des sauts de ligne ; les balises HTML saisies s'affichent comme du texte. Le titre de l'erreur reste celui de LimeSurvey.

Chaque message vide conserve le message standard correspondant. Le message d'erreur général ne remplace pas le message d'expiration lorsque ce dernier est vide. Si au moins un champ de contact est renseigné, le contact personnalisé remplace entièrement le contact standard : l'adresse de l'administrateur n'est pas ajoutée en secours. Renseigner les deux champs pour afficher le nom et l'adresse ; laisser les deux vides pour conserver le contact habituel de LimeSurvey.

Exemple de message du questionnaire expiré :

> Suite au nombre important de demandes, le formulaire est temporairement clos.
> Nous vous invitons à consulter régulièrement cette page afin de vérifier quand il sera de nouveau ouvert.

Autre exemple pour une campagne d'inscriptions : « Suite à un nombre important d'inscriptions, le questionnaire est temporairement suspendu. Nous vous invitons à revenir consulter cette page dans quelques jours. » Saisir ce texte dans `expiredsurveytext` si LimeSurvey affiche une erreur `survey-expiry`. Une fermeture pour un autre motif ne déclenche pas nécessairement cette erreur ; vérifier la page réellement rendue avant de choisir le champ.

Nom du contact : `Demande d'aide à la connexion` ; adresse : `aide-connexion@univ-lille.fr`.

Exemple de message d'erreur général : « Le formulaire est momentanément indisponible. Merci de réessayer ultérieurement ou de contacter notre assistance. »

**Migration du questionnaire `183268` :** le message d'expiration auparavant codé en dur a été retiré de `layout_errors.twig`. Pour le conserver, renseigner le champ `expiredsurveytext` dans les options de ce questionnaire avec l'exemple ci-dessus.

Ces options concernent l'expiration du questionnaire, pas l'avertissement de session décrit en section 6.1. Elles ne changent ni la date d'expiration ni l'état du questionnaire : la réouverture s'effectue dans les paramètres LimeSurvey. Les textes saisis ne sont pas traduits automatiquement et restent identiques dans les différentes langues du questionnaire. Les erreurs serveur qui ne chargent pas le thème ou ses options ne bénéficient pas de cette personnalisation.

Tests locaux réalisés : rendu des gabarits avec Twig.js, distinction expiration/autre erreur, repli standard, contact partiel ou complet, champs vides, échappement du texte et du lien e-mail ; contrôles Edge des libellés français et de la collecte des valeurs, y compris les sauts de ligne. La recette avec le moteur Twig PHP et l'enregistrement réel dans LimeSurvey 6/7 reste à effectuer.

### 6.4 Image ou mascotte des messages

Dans **Messages et contact**, activer **Image personnalisée des messages**, puis choisir **Image ou mascotte des messages**. Cette image remplace l'illustration standard sur les pages d'expiration et d'erreur rendues par le thème, même si le texte du message reste standard.

| Réglage | Clé | Valeur par défaut |
|---|---|---|
| Image personnalisée des messages | `messageimageenabled` | `off` |
| Image ou mascotte des messages | `messageimagefile` | `./files/error.png` |
| Texte alternatif de l'image | `messageimagealt` | Vide |

Le bouton **Envoyer un fichier** permet d'ajouter l'image au dossier du thème. Après le rechargement, sélectionner le fichier dans la liste puis enregistrer les options. Enregistrer les autres modifications avant l'envoi : le rechargement peut perdre les changements non sauvegardés.

Le texte alternatif décrit une image informative. Le laisser vide pour une mascotte décorative. Les proportions sont conservées, avec une largeur limitée au conteneur et une hauteur maximale de 24 rem. Lorsque l'option est désactivée, ou que le chemin personnalisé n'est pas résolu par `imageSrc`, le thème utilise l'illustration standard si elle est disponible.

### 6.5 Envoi d'images et corrections de compatibilité

Les contrôles d'envoi sont disponibles pour le logo et l'image d'arrière-plan dans **Images**, pour l'image du pied de page et pour l'image des messages. Chaque contrôle possède sa propre progression. Après un envoi réussi, la page se recharge avec l'identifiant de l'onglet courant ; son rétablissement utilise l'API Bootstrap Tab lorsqu'elle est disponible.

Les libellés sources des nouveaux réglages de messages/contact et les titres des réglages de session sont désormais en français. La traduction anglaise est conservée ; les textes personnalisés saisis ne sont pas traduits.

Deux corrections concernent le rendu des erreurs : le filtre Twig `escape('html_attr')` remplace l'alias `e` refusé par le sandbox de l'installation testée ; la phrase de contact utilise la traduction non échappée avant un échappement final unique, pour éviter l'affichage littéral de `&#039;`. Le nom personnalisé reste échappé.

Contrôles locaux complémentaires : choix de la mascotte, repli standard, texte alternatif informatif ou vide, styles de redimensionnement, affichage de l'apostrophe et quatre contrôles d'envoi testés avec requêtes simulées (fichier, jeton CSRF et traitement d'échec). Aucun envoi réel n'a été validé sur le serveur LimeSurvey. Avant diffusion, tester les droits d'envoi, la sélection après rechargement, la sauvegarde, les formats acceptés et l'affichage mobile sur l'instance cible.

### 6.6 Génération du code d'intégration iframe

Dans l'interface classique **Options du thème > Intégration**, le thème génère un bloc HTML avec une iframe et un script de redimensionnement automatique, prêt à copier dans le site qui accueille le questionnaire.

| Réglage | Clé enregistrée | Valeur par défaut |
|---|---|---|
| Masquer le header dans une iframe | `iframehideheader` | `off` |
| Masquer le footer dans une iframe | `iframehidefooter` | `off` |

**Procédure d'administration :**

1. Ouvrir les options du thème du questionnaire concerné, puis l'onglet **Intégration**. Personnaliser les options du questionnaire si nécessaire.
2. Choisir si l'en-tête et le pied de page doivent être masqués. Le code est recalculé lorsque ces choix changent ; enregistrer les options pour les conserver.
3. Vérifier l'URL détectée et le titre du questionnaire. Le script recherche l'identifiant dans l'URL d'administration ou les champs de la page, puis construit l'adresse publique sous la forme `/index.php/IDENTIFIANT`. Le titre est recherché dans l'administration puis dans la page publique ; le repli est « Questionnaire ».
4. Utiliser **Copier le code** et coller l'ensemble du bloc dans une zone HTML du site d'accueil qui autorise les iframes et les scripts. Si l'identifiant n'est pas détecté, remplacer `URL_DU_QUESTIONNAIRE` manuellement avant publication.
5. Utiliser **Copier l'URL** pour récupérer séparément l'adresse avec ses paramètres d'intégration. Tester le parcours complet depuis la page hôte.

Le code produit une iframe de largeur 100 %, sans bordure, avec `loading="lazy"`, un attribut `title` et une hauteur minimale de 700 px. Le script hôte écoute les messages `allysurvey:resize`, vérifie que leur source est la fenêtre de cette iframe et applique une hauteur numérique finie d'au moins 100 px. Le questionnaire transmet sa hauteur via `postMessage`, y compris lorsque les deux sites ont des domaines différents. Un `ResizeObserver` (ou un `MutationObserver` de repli), le chargement, le redimensionnement et les événements PJAX/AJAX déclenchent les mises à jour.

**Paramètres et persistance :** l'URL générée contient `allyiframe=1`, `allyhideheader=0|1` et `allyhidefooter=0|1`. Ces paramètres pilotent les choix d'affichage, sont mémorisés dans `sessionStorage` sous la clé `allysurvey:iframe:<identifiant>` et sont réinjectés dans l'action du formulaire `limesurvey`. Le script restaure aussi les paramètres dans la barre d'adresse lorsqu'ils ont disparu. En iframe réelle sans paramètres ni état mémorisé, les options du thème servent de repli.

**Limite à connaître :** contrairement au texte d'aide de l'onglet, le code actuel peut appliquer le mode intégré lors d'une ouverture directe avec `allyiframe=1`, ou avec un état intégré déjà mémorisé dans la même session. Une URL avec `allyiframe=0` ne supprime pas cet état mémorisé. Pour vérifier l'affichage normal, utiliser l'URL publique sans paramètres dans une nouvelle session de navigation. Le masquage cible `#survey-nav` et `.fas-custom-footer` ; il ne garantit pas le retrait de tout élément ajouté par une autre personnalisation.

**Conditions de fonctionnement :** le serveur doit autoriser l'affichage dans le site hôte et celui-ci doit conserver le script fourni. Le thème ne modifie pas les règles serveur d'intégration. Sans exécution du script hôte, la hauteur automatique ne fonctionne pas. Le bloc utilise l'identifiant fixe `allysurvey-frame` : pour plusieurs questionnaires sur une même page, adapter chaque identifiant et la référence correspondante dans son script. Le générateur est implémenté dans `options/options.twig` et `options/options.js` ; la déclaration des deux options dans l'éditeur React ne garantit pas la présence de ce générateur dans cet éditeur.

Cette section repose sur la lecture des fichiers actuels ; la copie réelle, la navigation entre pages, la persistance et le redimensionnement entre domaines restent à valider sur le site d'accueil et l'instance LimeSurvey cible.

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

1. Importer l'archive de distribution `AllySurvey_V285_RGAA_WCAG_AutonomeV2.zip` dans l'éditeur de thème LimeSurvey (aucun thème parent requis). Le dossier de travail conserve le nom `AllySurvey_V285_RGAA_WCAG_Autonome`.
2. Activer le thème sur un questionnaire de test.
3. Relever les options personnalisées avant la mise à niveau. Vérifier ensuite la présence des nouveaux réglages ; si une réinitialisation est nécessaire, réappliquer les valeurs sauvegardées (messages, contact, images, session et intégration compris).
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

Contrôles complémentaires pour les ajouts du 24/09/2026 : sauvegarder et relire les deux durées de session ; vérifier l'héritage thème/questionnaire ; tester le délai et la prolongation avec le serveur ; contrôler les options en français et en anglais, avec un aperçu dans une autre langue.

Validation déjà effectuée localement : XML du manifeste et syntaxe JavaScript ; tests Edge sur une page de test pour les libellés français/anglais, variantes linguistiques, conservation de libellés allemands, mises à jour dynamiques, valeurs de formulaire inchangées et indépendance de la langue de l'aperçu. Ces contrôles ne remplacent pas la recette sur LimeSurvey 6 et 7.

Contrôles complémentaires pour la mise à jour du 28/09/2026 :

- enregistrer puis relire les messages, le contact indépendant et les quatre sélections d'images ; vérifier les valeurs héritées et les replis avec des champs vides ;
- envoyer une image depuis chacun des quatre contrôles, vérifier le retour sur l'onglet, la sélection puis l'affichage sur mobile ;
- copier le code iframe et l'URL, vérifier l'absence de placeholder, le titre accessible et les quatre combinaisons de masquage ;
- parcourir plusieurs pages dans l'iframe, provoquer une erreur de validation et vérifier la hauteur, le focus et la conservation des paramètres ;
- contrôler l'intégration depuis un autre domaine, puis l'ouverture directe dans une session neuve et dans une session ayant déjà mémorisé le mode intégré.

Vérification documentaire du 28/09/2026 : rapprochement avec `config.xml`, les fichiers d'options, `layout_errors.twig` et les fichiers iframe CSS/JavaScript. Les validations locales précédemment rapportées ci-dessus sont conservées comme historique ; aucune nouvelle recette sur serveur LimeSurvey n'est revendiquée par cette mise à jour documentaire.

## 12. Limites connues

Pour les messages personnalisés, vérifier sur l'instance cible : sauvegarde et relecture des quatre champs, héritage global et personnalisation par questionnaire, page expirée et autre erreur bloquante, retour aux messages standards avec des champs vides, absence du contact administrateur lorsqu'un contact personnalisé est défini. Vérifier également la migration du questionnaire `183268` si celui-ci est utilisé.

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
- `GUIDE-DEVELOPPEUR-ALLYSURVEY-V285.md`
- `docs/LANGUE-OPTIONS-THEME.md`
- `docs/MESSAGES-ET-CONTACT.md`
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

1. **`CHANGELOG.md` référencé mais absent.** `README.md` et `COMPARAISON_ALLYSURVEY_V276C_V285.md` renvoient tous deux vers un fichier `CHANGELOG.md` ("historique détaillé des évolutions jusqu'à V2.0.41"), qui n'existe pas dans l'archive fournie.
2. **Ancien texte de dépendance corrigé.** Le champ `<description>` du manifeste décrit maintenant un thème autonome ; l'écart historique relatif à `fruity_twentythree` est résolu dans les fichiers actuels.
3. **Palette `highcontrast` non exposée.** Un 15ᵉ fichier de miniature (`files/palette-highcontrast.txt`) et des styles CSS complets existent (`css/ally-palettes.css`), mais la valeur `highcontrast` n'apparaît pas dans la liste `options`/`optionlabels`/`optionimages` de `themecolor` dans `config.xml` : elle n'est donc pas sélectionnable depuis l'interface, sauf ajout manuel de l'option.
4. **Dossier de preuves de tests non fourni.** `docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md` référence un fichier `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md`, absent de cette archive.
5. **Cinq non-conformités documentées restent ouvertes** (`NC-R015`, `NC-R0210`, `NC-R0311`, `NC-R0412`, `NC-R058`) : elles doivent être traitées ou explicitement assumées avant toute déclaration de conformité RGAA, ce que ne mentionnait pas la documentation technique précédente.
6. **Aide iframe à préciser.** L'interface annonce un masquage réservé aux iframes réelles, mais `scripts/ally-iframe.js` active aussi le mode intégré à partir des paramètres d'URL ou de l'état de session mémorisé. Le comportement actuel est détaillé en section 6.6.
