<p align="center">
  <strong>✨ AllySurvey V2.85 autonome — Des questionnaires LimeSurvey plus simples, plus clairs, plus accessibles</strong><br>
  Université de Lille • Direction du numérique — Service DAWAM<br>
  Thème LimeSurvey accessible RGAA/WCAG • Version manifeste 2.0.41<br>
  Variante autonome sans thème parent <code>fruity_twentythree</code><br>
  Compatible LimeSurvey 7.0 et LimeSurvey 6.0<br>
  Dernière mise à jour documentaire : 28/09/2026
</p>

<p align="center">
  ♿ Accessibilité numérique • 🧭 Navigation clavier • 🔊 Lecteurs d’écran • 🎨 Palettes • 📱 Mobile • 🧩 Formulaires complexes • 🖼️ Intégration iframe
</p>

## Nouveautés documentées le 28/09/2026

- **Intégration iframe** : onglet *Intégration* dans l'interface classique des options, avec génération du code HTML à copier (iframe + script de redimensionnement automatique), copie de l'URL directe, masquage de l'en-tête et du pied de page (`iframehideheader`, `iframehidefooter`, désactivés par défaut).
- **Hauteur automatique** : le questionnaire transmet sa hauteur au site hôte via `postMessage` (messages `allysurvey:resize`), y compris entre domaines différents.
- **Paramètres d'URL** : `allyiframe=1`, `allyhideheader=0|1`, `allyhidefooter=0|1`, mémorisés dans `sessionStorage` (clé `allysurvey:iframe:<identifiant>`).
- **Écarts documentaires** : la documentation technique recense désormais les écarts entre la documentation narrative et le contenu réel de l'archive (section 14 de la documentation technique).

> ⚠️ **Limite à connaître :** le mode intégré peut s'activer lors d'une ouverture directe avec `allyiframe=1` ou avec un état déjà mémorisé dans la même session. Une URL avec `allyiframe=0` ne supprime pas cet état mémorisé. Pour vérifier l'affichage normal, utiliser l'URL publique sans paramètres dans une nouvelle session de navigation.

## Nouveautés documentées le 24/09/2026

- **Session** : durée estimée et avertissement configurables (24 et 3 minutes par défaut), à aligner sur la session du serveur.
- **Langue des options** : langue de l'administration, complément français/anglais ; nouveaux libellés de messages et titres de session en français à la source.
- **Messages et contact** : textes d'expiration et d'erreur personnalisables, contact d'assistance indépendant de l'administrateur.
- **Image ou mascotte** : illustration personnalisée des messages avec texte alternatif, désactivée par défaut.
- **Envoi d'images** : boutons pour l'arrière-plan, le logo, le pied de page et les messages. Enregistrer les changements avant l'envoi ; après le rechargement, sélectionner le fichier et enregistrer les options.
- **Correctifs Twig** : filtre `escape('html_attr')` compatible avec le sandbox testé et suppression du double échappement de l'apostrophe du contact.

Pour le questionnaire `183268`, recopier le message historique dans le champ `expiredsurveytext` de ses options : la condition codée en dur a été retirée de `layout_errors.twig`. Voir [Messages et contact](docs/MESSAGES-ET-CONTACT.md), la [documentation technique](DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md) et le [guide développeur](GUIDE-DEVELOPPEUR-ALLYSURVEY-V285.md).

Les tests locaux ne remplacent pas la recette LimeSurvey 6/7 : vérifier notamment l'envoi réel d'images, l'enregistrement, l'héritage, les pages d'erreur, l'intégration iframe inter-domaines et le sandbox Twig PHP avant diffusion. La version du manifeste reste `2.0.41` ; cette mise à jour documentaire ne crée pas de nouvelle version publiée et aucune nouvelle recette sur serveur LimeSurvey n'est revendiquée.

---

# ♿ AllySurvey V2.85 RGAA/WCAG autonome

**AllySurvey V2.85 RGAA/WCAG autonome** est un thème de questionnaire LimeSurvey développé pour améliorer l’accessibilité, la lisibilité et l’expérience utilisateur des questionnaires en ligne.

Cette variante est autonome : elle ne déclare pas de dépendance au thème parent `fruity_twentythree` (aucun `parentThemeName` dans `config.xml`). Elle est adaptée lorsque l’on souhaite importer un thème complet sans devoir vérifier la présence du thème parent Fruity TwentyThree sur l’instance LimeSurvey cible.

Le thème reprend le socle d’accessibilité AllySurvey V2.76c et l’étend avec une couche de compatibilité LimeSurvey 7, des vues Twig plus complètes, des palettes compatibles avec l’éditeur React, des polices accessibles, une barre d’accessibilité renforcée, un diagnostic indicatif, des options avancées de personnalisation et des options d’administration (session, messages, images, iframe).

Le thème prend en compte les bonnes pratiques issues des référentiels :

- ✅ **RGAA 4.1** ;
- ✅ **WCAG 2.1 niveaux A et AA** ;
- ⌨️ navigation clavier ;
- 🔊 lecteurs d’écran ;
- 🔎 zoom navigateur et reflow ;
- 🎨 contrastes, palettes et focus visibles ;
- 🧱 structure sémantique HTML ;
- 🧩 formulaires complexes LimeSurvey.

> ⚠️ **Important :** ce thème améliore fortement l’accessibilité côté participant, mais ne constitue pas un audit RGAA complet. Plusieurs non-conformités documentées restent ouvertes (voir [Non-conformités ouvertes](#-non-conformités-ouvertes)) et un audit sur le questionnaire final, avec ses contenus, ses questions et ses paramétrages, reste nécessaire.

---

## 🏛️ Contexte du projet

L’accessibilité numérique est un enjeu majeur pour garantir l’inclusion de tous les utilisateurs, y compris les personnes en situation de handicap.

Dans ce cadre, l’Université de Lille travaille sur l’amélioration des templates LimeSurvey afin de rendre les questionnaires :

- 🧠 plus compréhensibles ;
- ♿ plus accessibles ;
- 🎨 plus cohérents visuellement ;
- 🛡️ plus robustes techniquement ;
- 🔊 mieux adaptés aux technologies d’assistance ;
- 📱 plus confortables sur mobile et tablette.

Ce travail est développé par la **Direction du numérique — Service DAWAM de l’Université de Lille** (auteur déclaré : Raphaël Lecerf), dans une logique de contribution, de mutualisation et de partage avec la communauté de l’enseignement supérieur et de la recherche.

Il est également mis à disposition des membres de l’**APRANESR** — Association Professionnelle des Référents Accessibilité Numérique de l’Enseignement Supérieur et de la Recherche.

---

## 🧩 Compatibilité

- 🟢 **LimeSurvey :** 7.0 et 6.0 déclarés dans le manifeste (balise `<compatibility>`).
- 🎨 **Thème parent :** aucun, variante autonome.
- 📝 **Type :** thème de questionnaire LimeSurvey.
- 📦 **Nom du thème :** `AllySurvey V285 RGAA WCAG`.
- 🏷️ **Titre LimeSurvey (`config.xml`) :** `AllySurvey_V285_RGAA_WCAG_AutonomeV2`.
- 🚀 **Version manifeste :** `2.0.41`.
- ⚙️ **API thème :** `3.0`.
- 📅 **Dernière mise à jour manifeste :** `2026-09-25 14:00:00`.
- 🐘 **PHP :** ≥ 8.1.29 pour LimeSurvey 7 (voir `docs/LIMESURVEY-7-COMPATIBILITE.md`).

> Cette variante ne nécessite pas le thème parent `fruity_twentythree`.

---

## 📚 Documentation complémentaire

- Documentation technique : [`DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md`](DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md)
- Version PDF : [`DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf`](DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf)
- Guide développeur : [`GUIDE-DEVELOPPEUR-ALLYSURVEY-V285.md`](GUIDE-DEVELOPPEUR-ALLYSURVEY-V285.md)
- Comparaison V2.76c / V2.85 : [`COMPARAISON_ALLYSURVEY_V276C_V285.md`](COMPARAISON_ALLYSURVEY_V276C_V285.md)
- Compatibilité LimeSurvey 7 : [`docs/LIMESURVEY-7-COMPATIBILITE.md`](docs/LIMESURVEY-7-COMPATIBILITE.md)
- Langue des options d'administration : [`docs/LANGUE-OPTIONS-THEME.md`](docs/LANGUE-OPTIONS-THEME.md)
- Messages et contact : [`docs/MESSAGES-ET-CONTACT.md`](docs/MESSAGES-ET-CONTACT.md)
- Diagnostic et mode développeur : [`docs/DIAGNOSTIC-MODE-DEVELOPPEUR.md`](docs/DIAGNOSTIC-MODE-DEVELOPPEUR.md)
- Guide créateurs — langue des passages : [`docs/GUIDE-CREATEURS-LANGUE-PASSAGES.md`](docs/GUIDE-CREATEURS-LANGUE-PASSAGES.md)
- Audit WCAG 2.5.3 (étiquette dans le nom) : [`docs/AUDIT-WCAG-253-LABEL-IN-NAME.md`](docs/AUDIT-WCAG-253-LABEL-IN-NAME.md)
- Procédure de preuves RGAA : [`docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md`](docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md)

---

## 📥 Installation

1. 📦 Télécharger ou préparer l’archive ZIP autonome du thème.
2. ⚙️ Dans LimeSurvey, ouvrir l’éditeur de thème.
3. ⬆️ Importer le fichier ZIP `AllySurvey_V285_RGAA_WCAG_AutonomeV2.zip` (aucun thème parent requis ; le dossier de travail conserve le nom `AllySurvey_V285_RGAA_WCAG_Autonome`).
4. ✅ Activer le thème **AllySurvey V285 RGAA WCAG** sur un questionnaire de test.
5. 📝 Relever les options personnalisées avant la mise à niveau. Vérifier ensuite la présence des nouveaux réglages ; si une réinitialisation est nécessaire, réappliquer les valeurs sauvegardées (messages, contact, images, session et intégration compris).
6. 🎨 Choisir une palette (`themecolor`) dans les options globales ou dans les options du questionnaire.
7. 🧽 Vider le cache LimeSurvey et le cache navigateur.
8. 🧪 Tester un parcours complet au clavier et avec un lecteur d’écran.

Tests minimum recommandés :

- ⌨️ navigation clavier complète et focus visible sur tous les contrôles ;
- ✔️ validation des champs obligatoires ;
- 🔀 question conditionnelle « Si oui… » ;
- 📅 champ date (triplet jour/mois/année) et option « Autre, précisez » ;
- 📊 matrices et tableaux, y compris avec `colspan`/`rowspan` irréguliers ;
- 🔢 questions de classement et d'appariement ;
- 🔊 lecteur d’écran (NVDA a minima, conformément aux fiches NC-R ouvertes) sur un parcours complet ;
- 🔎 zoom navigateur à 200 % et reflow à 320 px CSS ;
- 📱 affichage mobile ;
- 🎛️ sauvegarde d’une palette propre au questionnaire, y compris avec la clé héritée `allycolorpalette`.

Contrôles complémentaires pour les ajouts de septembre 2026 :

- ⏱️ sauvegarder et relire les deux durées de session ; vérifier l'héritage thème/questionnaire ; tester le délai et la prolongation avec le serveur ;
- 🌐 contrôler les options en français et en anglais, avec un aperçu dans une autre langue ;
- 💬 enregistrer puis relire les messages, le contact indépendant et les quatre sélections d'images ; vérifier les valeurs héritées et les replis avec des champs vides ;
- 🖼️ envoyer une image depuis chacun des quatre contrôles, vérifier le retour sur l'onglet, la sélection, puis l'affichage sur mobile ;
- 🧷 copier le code iframe et l'URL, vérifier l'absence de placeholder, le titre accessible et les quatre combinaisons de masquage ;
- 🔁 parcourir plusieurs pages dans l'iframe, provoquer une erreur de validation et vérifier la hauteur, le focus et la conservation des paramètres ;
- 🌍 contrôler l'intégration depuis un autre domaine, puis l'ouverture directe dans une session neuve et dans une session ayant déjà mémorisé le mode intégré.

---

## 🚀 Fonctionnalités principales

### 🧭 Navigation et correction des erreurs

- ✔️ Validation progressive : la première question en erreur est signalée en priorité.
- ✔️ Message d’erreur affiché directement au niveau de la question concernée.
- 🎯 Focus automatique sur la zone à corriger, avec défilement doux.
- 📊 Meilleure gestion des erreurs sur les tableaux de réponses et matrices.
- 🧱 Détection plus précise des champs obligatoires réellement visibles et pertinents.
- 🔔 Alerte accessibilité en haut de page pour résumer les problèmes restants.
- 🔁 Actualisation dynamique des messages lorsque l’utilisateur corrige ses réponses.

### 🧱 Structure sémantique et landmarks

Le thème ajoute ou renforce les repères HTML utiles à la navigation assistée :

```html
<header role="banner">
<main role="main" id="main-content">
<footer role="contentinfo">
```

Des liens d’évitement permettent d’aller directement :

- 🎯 au contenu principal ;
- ♿ aux options d’accessibilité ;
- 🧭 aux zones utiles du questionnaire.

Ces éléments facilitent la navigation clavier et la compréhension de la structure par les lecteurs d’écran.

### 🛠️ Barre d’accessibilité intégrée

La V2.85 intègre une barre d’accessibilité permettant d’adapter l’affichage selon les besoins de l’utilisateur.

Fonctions disponibles selon configuration :

- 🔠 agrandissement ou réduction de la taille du texte ;
- 🌓 contraste renforcé ;
- ⚫ mode noir et blanc ;
- ↔️ espacement du texte ;
- 🔗 soulignement des liens ;
- 🎞️ réduction des animations ;
- 📖 police OpenDyslexic ;
- 🔤 police Luciole ;
- 🔄 réinitialisation des réglages.

Les préférences sont conservées côté navigateur (`localStorage`, clé `fruityAllySurvey.preferences.v1`) et les changements sont annoncés aux technologies d’assistance via des zones de statut adaptées.

### 🎨 Palettes et personnalisation

La V2.85 utilise la clé `themecolor`, explicitement acceptée par l’éditeur React LimeSurvey 7.

Palettes sélectionnables (14 valeurs déclarées dans `config.xml`) : `neutre` (défaut), `industrie`, `pinklady`, `brique`, `orangette`, `hyperion`, `ocean`, `menthe`, `dune`, `commodore`, `colvert`, `vulcain`, `orangesanguine` et `custom`.

Améliorations principales :

- 15 fichiers de miniatures de palette (`files/palette-*.txt`) et variables CSS `--fas-palette-*` dans `css/ally-palettes.css` ;
- miniatures SVG compactes et responsives ;
- sauvegarde stable de la palette au niveau du questionnaire ;
- synchronisation de l’iframe de prévisualisation ;
- conservation des couleurs personnalisées lorsque `custom` est choisi ;
- lecture de secours de l’ancienne clé `allycolorpalette` pour les configurations héritées (`scripts/ally-admin-options-bridge.js`).

> ℹ️ La palette **contraste renforcé** (`highcontrast`) est fonctionnelle en CSS/JS mais n'est pas exposée dans la liste `themecolor` du manifeste : elle n'est pas sélectionnable depuis l'interface, sauf ajout manuel de l'option.

Avantage : le choix de palette d’un questionnaire peut remplacer durablement la valeur globale `neutre` sans retour intempestif après sauvegarde.

La personnalisation avancée (`advancedcustomization`) permet d'ajuster la couleur d'accent, la couleur de focus, la largeur maximale, la densité, le style des questions et des boutons et la taille de police.

### 🔤 Polices accessibles

La V2.85 publie les polices via le répertoire `files/fonts`, afin d’éviter les erreurs 404 du gestionnaire d’assets LimeSurvey.

Polices incluses :

- Luciole (licence CC-BY pour les fontes texte) ;
- OpenDyslexic (licence dans `OpenDyslexic-OFL.txt`).

Ces polices sont activables depuis les options du thème (`toolbarluciole`, `toolbardyslexic`) et depuis la barre d’accessibilité. Elles sont gérées de manière exclusive pour éviter les conflits d’affichage.

### ⏱️ Session et avertissement d'expiration

Dans *Options du thème > Session* :

| Réglage | Clé | Défaut |
|---|---|---|
| Durée de session estimée (minutes) | `sessiontimeoutminutes` | 24 |
| Avertir avant l'expiration (minutes) | `sessionwarningminutes` | 3 |

- ⏰ Avec les valeurs par défaut, l'alerte apparaît après 21 minutes sans interaction, puis affiche un compte à rebours de 3 minutes.
- 🖱️ Les événements clavier, pointeur, tactile, changement ou saisie réarment le délai ; le bouton « Prolonger la session » envoie une requête au serveur.
- ⚠️ Ces options règlent une estimation côté navigateur : elles ne modifient pas la durée de session du serveur LimeSurvey/PHP. Les aligner sur la configuration du serveur.
- 🔢 Saisir des minutes entières positives et un avertissement inférieur à la durée de session ; à défaut, le script utilise ses valeurs par défaut ou un quart de la durée (minimum 30 secondes).
- 🧭 Pour un questionnaire qui hérite des options générales, activer « Personnaliser le questionnaire » avant de modifier les valeurs.

### 🌐 Langue des options d'administration

- 🈯 Les libellés passent par la traduction native `gT()` de LimeSurvey, complétée en français et anglais par `scripts/ally-options-i18n.js`, selon l'attribut `lang` de la page d'administration (variantes `fr-FR`, `fr_CA`, `en-GB` reconnues).
- 👤 La langue effective de l'administration est utilisée ; la langue du questionnaire affiché dans l'aperçu ne commande pas celle des réglages.
- 🌍 Pour les autres langues, les traductions natives sont conservées ; il ne s'agit pas d'une traduction automatique. Les clés, valeurs enregistrées et contenus saisis ne sont pas traduits.

### 💬 Messages personnalisés et contact d'assistance

Dans *Options du thème > Messages et contact* :

| Champ | Clé | Comportement |
|---|---|---|
| Message du questionnaire expiré | `expiredsurveytext` | Remplace le message de l'erreur `survey-expiry` |
| Message d'erreur du questionnaire | `surveyerrortext` | Remplace le message des autres erreurs bloquantes rendues par le thème |
| Nom du contact d'assistance | `surveycontactname` | Personne ou service affiché comme contact |
| Adresse e-mail du contact | `surveycontactemail` | Adresse affichée et lien e-mail |

- 📝 Les messages sont en texte simple, avec conservation des sauts de ligne ; les balises HTML saisies s'affichent comme du texte.
- 🔁 Chaque message vide conserve le message standard correspondant ; le message d'erreur général ne remplace pas le message d'expiration lorsque celui-ci est vide.
- 📧 Si au moins un champ de contact est renseigné, le contact personnalisé remplace entièrement le contact standard (l'adresse de l'administrateur n'est pas ajoutée en secours). Laisser les deux vides pour conserver le contact habituel de LimeSurvey.
- 🚫 Ces options ne changent ni la date d'expiration ni l'état du questionnaire, et ne s'appliquent pas aux erreurs serveur qui ne chargent pas le thème. Les textes saisis ne sont pas traduits automatiquement.

### 🖼️ Image ou mascotte des messages et envoi d'images

| Réglage | Clé | Défaut |
|---|---|---|
| Image personnalisée des messages | `messageimageenabled` | off |
| Image ou mascotte des messages | `messageimagefile` | `./files/error.png` |
| Texte alternatif de l'image | `messageimagealt` | vide |

- 🐾 L'image remplace l'illustration standard sur les pages d'expiration et d'erreur rendues par le thème.
- 🗒️ Le texte alternatif décrit une image informative ; le laisser vide pour une mascotte décorative.
- 📐 Les proportions sont conservées, largeur limitée au conteneur, hauteur maximale de 24 rem.
- ⬆️ Des contrôles d'envoi existent pour le logo, l'image d'arrière-plan, l'image du pied de page et l'image des messages, chacun avec sa propre progression. Après un envoi réussi, la page se recharge avec l'identifiant de l'onglet courant.
- 💾 Enregistrer les autres modifications avant l'envoi : le rechargement peut perdre les changements non sauvegardés.

### 🧷 Intégration en iframe

Dans l'interface classique *Options du thème > Intégration*, le thème génère un bloc HTML prêt à copier dans le site hôte.

1. 🧭 Ouvrir les options du thème du questionnaire, onglet *Intégration* (personnaliser les options du questionnaire si nécessaire).
2. 🙈 Choisir de masquer ou non l'en-tête et le pied de page, puis enregistrer pour conserver les choix.
3. 🔎 Vérifier l'URL détectée (`/index.php/IDENTIFIANT`) et le titre du questionnaire (repli : « Questionnaire »).
4. 📋 Utiliser *Copier le code* et coller l'ensemble du bloc dans une zone HTML qui autorise iframes et scripts. Si l'identifiant n'est pas détecté, remplacer `URL_DU_QUESTIONNAIRE` manuellement.
5. 🔗 Utiliser *Copier l'URL* pour récupérer l'adresse avec ses paramètres d'intégration, puis tester le parcours complet depuis la page hôte.

Caractéristiques :

- 📏 iframe en largeur 100 %, sans bordure, `loading="lazy"`, attribut `title`, hauteur minimale de 700 px ; le script hôte n'applique que des hauteurs numériques finies d'au moins 100 px et vérifie la source des messages.
- 👀 Le masquage cible `#survey-nav` et `.fascustom-footer` ; il ne garantit pas le retrait d'un élément ajouté par une autre personnalisation.
- 🔒 Le serveur doit autoriser l'affichage dans le site hôte (le thème ne modifie pas les règles serveur) et celui-ci doit conserver le script fourni.
- 🆔 Le bloc utilise l'identifiant fixe `allysurvey-frame` : pour plusieurs questionnaires sur une même page, adapter chaque identifiant et sa référence dans le script.
- 🧩 Le générateur est implémenté dans `options/options.twig` et `options/options.js` ; sa présence dans l'éditeur React n'est pas garantie.

### 📅 Dates, emails, téléphones et champs numériques

- 📅 Les dates peuvent être présentées sous forme de trois champs clairs : **Jour / Mois / Année**.
- 🔁 Le champ technique attendu par LimeSurvey au format `aaaa-mm-jj` reste synchronisé automatiquement.
- 🗑️ Les calendriers ou widgets graphiques redondants peuvent être masqués lorsqu’ils créent de la confusion.
- ✉️ Les champs email peuvent bénéficier d’un clavier adapté sur smartphone.
- 📞 Les champs téléphone ou numériques peuvent utiliser `inputmode`, `step` et des attributs adaptés.
- 🚦 Les limites de longueur (`maxlength`, `size`) sont mieux signalées pour éviter les blocages tardifs.
- 🪪 L'objectif des champs utilisateur (WCAG 1.3.5) est renforcé via l'attribut `autocomplete`.

### 💬 Option “Autre, précisez”

- ✨ Le champ “Autre” apparaît uniquement lorsque l’option correspondante est sélectionnée.
- 🔁 Si l’utilisateur commence à saisir dans “Autre, précisez”, l’option “Autre” peut être cochée automatiquement.
- 🧠 Les champs techniques internes LimeSurvey sont mieux synchronisés.
- 😌 Les erreurs sur des champs “Autre” non pertinents sont évitées.
- 🎯 Certaines options “Autre” peuvent être désactivées lorsqu’elles n’ont pas de sens dans le questionnaire.

### 📝 Cases à cocher avec commentaires

Pour les questions de type “cases à cocher + commentaire” :

- ⬜ si aucune case n’est cochée, les commentaires restent facultatifs ;
- ☑️ si une case est cochée, le commentaire associé peut devenir obligatoire ;
- 🚫 les commentaires des lignes non cochées sont désactivés ;
- 🛡️ les erreurs inutiles sur des lignes non concernées sont évitées.

### 🔊 Messages accessibles et retours vocaux

- 🔔 Création de zones de statut `aria-live` adaptées.
- 🤫 Réduction des annonces répétitives ou inutiles.
- ⏳ Message vocal lors de l’envoi du formulaire.
- 🎉 Confirmation plus claire en fin de questionnaire.
- 🔳 Amélioration de la modale d’alerte LimeSurvey pour les lecteurs d’écran.
- 📢 Meilleure séparation entre messages d’aide, erreurs et informations de statut.

### ⌨️ Navigation clavier

- 🎯 Focus renforcé sur les champs, boutons radio, cases à cocher et contrôles interactifs.
- ♿ Navigation plus fluide dans les groupes de réponses et tableaux.
- 🖱️ Meilleure compatibilité avec l’usage sans souris.
- ↩️ Gestion plus cohérente de la touche Entrée selon le contexte.
- 🔽 Correction de certains comportements de composants Bootstrap Select.

### 📊 Tableaux, matrices et questions complexes

Le thème améliore la structure des tableaux et matrices LimeSurvey :

- 🧭 ajout ou renforcement des associations entre cellules, lignes et colonnes ;
- 🔊 amélioration de la lecture par les technologies d’assistance ;
- 🧹 suppression de certains tab stops inutiles dans les cellules non interactives ;
- 📋 meilleure gestion des matrices radio, cases à cocher et listes ;
- ✅ prise en compte des contraintes propres aux questions obligatoires.

Certaines matrices très complexes nécessitent toutefois encore une validation manuelle selon le questionnaire, le paramétrage et le lecteur d’écran utilisé (voir NC-R015 et NC-R0412).

### 🔢 Questions de classement et appariement

La V2.85 renforce la prise en charge :

- des questions de classement ;
- des exercices d’appariement ;
- des listes de sélection associées à des tableaux ;
- des états sélectionnés persistants des boutons radio et Oui/Non.

Ces types de questions doivent rester dans le plan de tests manuel, car leur rendu peut varier selon les options LimeSurvey.

---

## 🧪 Diagnostic et mode développeur

Le thème propose des outils exclusifs désactivés par défaut (`diagnosticmode`, `developermode`). Le diagnostic est une aide à la conception, à désactiver en production.

### Diagnostic indicatif RGAA/WCAG

Le diagnostic peut détecter notamment :

- identifiants dupliqués ;
- images sans alternative ;
- champs sans étiquette ;
- commandes sans nom accessible ;
- `fieldset` sans `legend` ;
- champs `required` masqués ;
- tableaux sans en-têtes ;
- problèmes de hiérarchie de titres ou de langue.

La visibilité du diagnostic (`diagnosticvisibility`) peut être limitée à la prévisualisation (`preview`) afin de ne pas générer le panneau dans le HTML d’un questionnaire public.

### Mode développeur

Le mode développeur peut afficher :

- contour visuel des questions ;
- badges avec identifiant ou code détecté (option `devshowcodes`) ;
- inspection au clic d’attributs utiles (élément, `id`, `name`, `role`, classes) ;
- aides de diagnostic réservées aux enquêtes de test.

---

## 🚧 Non-conformités ouvertes

Cinq fiches de non-conformité sont présentes dans `docs/`. Elles doivent être traitées ou explicitement assumées avant toute déclaration de conformité RGAA :

| Fiche | Sujet | Référentiel | Statut déclaré |
|---|---|---|---|
| 🔴 `NC-R015-MATRICES-COMPLEXES-NVDA.md` | Matrices complexes / navigation tableau NVDA | RGAA 5.8 · WCAG 1.3.1 A | Non conforme tant que le test manuel NVDA n'est pas exécuté et documenté |
| 🔴 `NC-R0210-VARIATIONS-ESPACEMENT.md` | Mode espacement sur les variations de couleur | RGAA 10.8 · WCAG 1.4.12 AA | Non conforme tant que le test visuel n'est pas exécuté et documenté |
| 🔴 `NC-R0311-AUTOCOMPLETE-HEURISTIQUE.md` | Autocomplete heuristique / libellés atypiques | RGAA 11.13 · WCAG 1.3.5 AA | Non conforme tant que les champs atypiques ne sont pas vérifiés |
| 🔴 `NC-R0412-ORDRE-TABULATION-MATRICES.md` | Ordre de tabulation dans les matrices | RGAA 12.9 · WCAG 2.4.3 A | Non conforme tant que le parcours clavier n'a pas été validé (NVDA + Firefox) |
| 🟠 `NC-R058-LANGUE-PASSAGES-CREATEURS.md` | Langue des passages / dépendance créateurs | RGAA 8.7 · WCAG 3.1.2 AA | Partiel : passages explicitement marqués corrigés, passages étrangers non marqués non détectés |

---

## 🗂️ Architecture du thème

Structure simplifiée de l'archive :

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

> ℹ️ Aucun `CHANGELOG.md` n'est présent dans l'archive actuelle, bien que certains documents y renvoient.

### 📌 Fichiers principaux

- ⚙️ `config.xml` : manifeste du thème LimeSurvey, compatibilité et options.
- 🧱 `views/layout_global.twig` : structure générale, landmarks, liens d’évitement, barre d’accessibilité.
- 🚨 `views/layout_errors.twig` : pages d'erreur et d'expiration, messages et contact personnalisés.
- 🧠 `views/subviews/header/custom_header.twig` : application des palettes et variables CSS.
- 🎚️ `options/options.twig` et `options/options.js` : interface classique des options, envoi d'images, générateur de code iframe.
- ♿ `files/accessibilite.js` : bundle principal des correctifs accessibilité côté questionnaire (fichier unique conservé volontairement pour éviter les régressions de chargement PJAX/LimeSurvey).
- 🧩 `files/a11y-modules/` : documentation des familles fonctionnelles du bundle (`manifest.json`), non chargée par LimeSurvey.
- 🔤 `files/fonts/` : polices Luciole et OpenDyslexic.
- 🛠️ `scripts/ally-*.js` : compatibilité LS7, diagnostic, toolbar, palettes, i18n des options, iframe et administration.
- 🎨 `css/ally-*.css` : styles d’accessibilité, focus, palettes, toolbar, reflow, contraste, personnalisation et iframe.
- 📚 `docs/` : documentation de conformité, fiches de non-conformité et procédures de preuve.

---

## 🧠 Modules de maintenance accessibilité

Le bundle principal chargé par LimeSurvey reste :

```txt
files/accessibilite.js
```

Pour faciliter la maintenance, les familles fonctionnelles sont documentées dans :

```txt
files/a11y-modules/
```

Familles principales :

- 🧩 socle transversal, zones de statut, liens et intitulés ;
- 🧱 structure, langue des passages et champs obligatoires ;
- 📝 objectif des champs utilisateur et autocomplete ;
- ❓ familles de questions standard ;
- 📊 tableaux et matrices ;
- 🔎 reflow, zoom, focus et listes déroulantes ;
- 🔢 questions de classement ;
- ⏱️ avertissements de session ;
- 📄 pages statiques et pages de résultat ;
- 👀 observateurs PJAX et validation séquentielle.

---

## 🧪 Tests et non-régression

Avant diffusion, il est conseillé de tester :

- 🏷️ la version du thème ;
- ⚙️ la version de LimeSurvey ;
- 🌐 le navigateur utilisé ;
- 🔊 le lecteur d’écran utilisé ;
- 🖼️ les captures ou preuves HTML ;
- ⌨️ le résultat des tests clavier ;
- 🔎 le résultat des tests avec zoom navigateur ;
- 🎛️ la sauvegarde des palettes ;
- 📱 le rendu mobile.

Une procédure de preuves est disponible dans :

```txt
docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md
```

> ℹ️ Cette procédure référence un fichier `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md` qui n'est pas présent dans l'archive actuelle.

Validations déjà effectuées localement : XML du manifeste, syntaxe JavaScript, rendu des gabarits avec Twig.js, contrôles Edge des libellés et des formulaires d'envoi (requêtes simulées). Elles ne remplacent pas la recette sur LimeSurvey 6 et 7.

---

## 👩‍💻 Recommandations pour les créateurs de questionnaires

Même avec un thème renforcé, la qualité finale dépend aussi de la conception du questionnaire.

Il est recommandé de :

- ✍️ rédiger des intitulés de questions clairs ;
- 📊 éviter les tableaux trop complexes lorsque ce n’est pas indispensable ;
- 👁️ limiter les dépendances visuelles seules ;
- 🧾 fournir des consignes explicites ;
- 🌍 baliser la langue des passages étrangers (`[lang=xx]...[/lang]` ou attributs `data-lang`, voir le guide dédié) ;
- 🧪 tester chaque type de question utilisé ;
- 🔔 vérifier les messages d’aide et les messages d’erreur ;
- ⌨️ tester le questionnaire au clavier avant diffusion ;
- 📱 vérifier le rendu mobile ;
- 💬 éviter de multiplier les champs “Autre” lorsqu’ils ne sont pas nécessaires.

---

## ⚠️ Limites connues

- ⚠️ Le thème améliore le rendu participant, mais ne corrige pas automatiquement tous les contenus saisis par les créateurs de questionnaires.
- 🧩 Certaines questions LimeSurvey complexes peuvent nécessiter une adaptation ou une vérification manuelle.
- 📊 Les matrices très complexes doivent être testées au cas par cas et avec plusieurs lecteurs d’écran (NC-R015, NC-R0412).
- 🌍 La détection de langue des passages ne couvre que les marquages explicites (NC-R058).
- ↔️ Le mode espacement n'a pas de preuve documentée sur l'ensemble des variations de couleur (NC-R0210).
- 🪪 L'heuristique d'autocomplete ne couvre pas les libellés atypiques non vérifiés (NC-R0311).
- ⏱️ Les options de session règlent une estimation côté navigateur et ne modifient pas la session serveur.
- 🧷 L'intégration iframe dépend des règles serveur et du script conservé sur le site hôte ; le mode intégré mémorisé en session n'est pas supprimé par `allyiframe=0`.
- 🛠️ Les corrections JavaScript dépendent du rendu final LimeSurvey et peuvent nécessiter des ajustements selon les versions.
- 🏗️ Le back-office LimeSurvey n’est pas l’objet principal de cette version du thème.
- 📋 Un audit RGAA complet reste nécessaire pour une déclaration officielle de conformité.

---

## 🔭 Perspectives

Les prochaines évolutions envisagées portent notamment sur :

- 🏗️ l’amélioration progressive de l’accessibilité du back-office ;
- 📚 l’enrichissement de la documentation pour les créateurs de questionnaires ;
- 🧪 la poursuite des tests sur les questions complexes et la clôture des fiches NC-R ;
- 🧩 la transformation ou l’adaptation de certains types de questions natifs moins accessibles ;
- 📋 l’amélioration des preuves de conformité RGAA (matrice de tests, `CHANGELOG.md`) ;
- 🎨 l'exposition de la palette contraste renforcé dans la liste `themecolor` ;
- 🤝 la préparation d’une contribution ou d’un échange avec l’éditeur LimeSurvey autour des améliorations proposées.

---

## 📬 Contacts

- 📧 APRANESR : [contact@apranesr.fr](mailto:contact@apranesr.fr)
- 📧 Université de Lille : [raphael.lecerf@univ-lille.fr](mailto:raphael.lecerf@univ-lille.fr)
- 📧 Support LimeSurvey Université de Lille : [support-limesurvey@univ-lille.fr](mailto:support-limesurvey@univ-lille.fr)

---

## ⚖️ Licence

Le manifeste du thème indique une licence **GNU General Public License version 2 or later**.

À harmoniser avant publication officielle du dépôt si une autre licence est souhaitée pour la documentation, par exemple **CC BY-NC-SA** pour les contenus rédactionnels.

---

## 🙏 Remerciements

Merci aux personnes et structures impliquées dans les tests, retours d’expérience et échanges autour de l’accessibilité numérique dans l’enseignement supérieur et la recherche.

Ce projet s’inscrit dans une démarche collective : rendre les questionnaires en ligne plus accessibles, plus inclusifs et plus simples à utiliser.

---

<p align="center">
  <strong>♿ Libre, clair et accessible : c’est possible.</strong><br>
  #AccessibilitéNumérique #LimeSurvey #OpenSource #UniversitéDeLille #RGAA #WCAG #APRANESR
</p>
