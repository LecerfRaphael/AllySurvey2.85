<p align="center">
  <strong>✨ AllySurvey V2.85 autonome — Des questionnaires LimeSurvey plus simples, plus clairs, plus accessibles</strong><br>
  Université de Lille • Direction du numérique — Service DAWAM<br>
  Thème LimeSurvey accessible RGAA/WCAG • Version manifeste 2.0.32<br>
  Variante autonome sans thème parent <code>fruity_twentythree</code><br>
  Compatible LimeSurvey 7.0 et LimeSurvey 6.0<br>
  Dernière mise à jour documentaire : 15/07/2026
</p>

<p align="center">
  ♿ Accessibilité numérique • 🧭 Navigation clavier • 🔊 Lecteurs d’écran • 🎨 Palettes • 📱 Mobile • 🧩 Formulaires complexes
</p>

---

# ♿ AllySurvey V2.85 RGAA/WCAG autonome

**AllySurvey V2.85 RGAA/WCAG autonome** est un thème de questionnaire LimeSurvey développé pour améliorer l’accessibilité, la lisibilité et l’expérience utilisateur des questionnaires en ligne.

Cette variante est autonome : elle ne déclare pas de dépendance au thème parent `fruity_twentythree`. Elle est adaptée lorsque l’on souhaite importer un thème complet sans devoir vérifier la présence du thème parent Fruity TwentyThree sur l’instance LimeSurvey cible.

Le thème reprend le socle d’accessibilité AllySurvey V2.76c et l’étend avec une couche de compatibilité LimeSurvey 7, des vues Twig plus complètes, des palettes compatibles avec l’éditeur React, des polices accessibles, une barre d’accessibilité renforcée, un diagnostic indicatif et des options avancées de personnalisation.

Le thème prend en compte les bonnes pratiques issues des référentiels :

- ✅ **RGAA 4.1** ;
- ✅ **WCAG 2.1 niveaux A et AA** ;
- ⌨️ navigation clavier ;
- 🔊 lecteurs d’écran ;
- 🔎 zoom navigateur et reflow ;
- 🎨 contrastes, palettes et focus visibles ;
- 🧱 structure sémantique HTML ;
- 🧩 formulaires complexes LimeSurvey.

> ⚠️ **Important :** ce thème améliore fortement l’accessibilité côté participant, mais ne remplace pas un audit RGAA complet réalisé sur un questionnaire final, avec ses contenus, ses questions et ses paramétrages.

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

Ce travail est développé par la **Direction du numérique — Service DAWAM de l’Université de Lille**, dans une logique de contribution, de mutualisation et de partage avec la communauté de l’enseignement supérieur et de la recherche.

Il est également mis à disposition des membres de l’**APRANESR** — Association Professionnelle des Référents Accessibilité Numérique de l’Enseignement Supérieur et de la Recherche.

---

## 🧩 Compatibilité

- 🟢 **LimeSurvey :** 7.0 et 6.0 déclarés dans le manifeste.
- 🎨 **Thème parent :** aucun, variante autonome.
- 📝 **Type :** thème de questionnaire LimeSurvey.
- 📦 **Nom du thème :** `AllySurvey V285 RGAA WCAG`.
- 🏷️ **Titre LimeSurvey :** `AllySurvey_V285_RGAA_WCAG_Autonome`.
- 🚀 **Version manifeste :** `2.0.32`.
- ⚙️ **API thème :** `3.0`.
- 📅 **Dernière mise à jour manifeste :** `2026-07-14 00:00:50`.

> Cette variante ne nécessite pas le thème parent `fruity_twentythree`.

---

## 📚 Documentation complémentaire

- Documentation technique : [`DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md`](DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.md)
- Version PDF : [`DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf`](DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285.pdf)
- Comparaison V2.76c / V2.85 : [`COMPARAISON_ALLYSURVEY_V276C_V285.md`](COMPARAISON_ALLYSURVEY_V276C_V285.md)
- Compatibilité LimeSurvey 7 : [`docs/LIMESURVEY-7-COMPATIBILITE.md`](docs/LIMESURVEY-7-COMPATIBILITE.md)
- Procédure de preuves RGAA : [`docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md`](docs/PROCEDURE-PREUVES-CONFORMITE-RGAA.md)

---


## 📥 Installation

1. 📦 Télécharger ou préparer l’archive ZIP autonome du thème.
2. ⚙️ Dans LimeSurvey, ouvrir l’éditeur de thème.
3. ⬆️ Importer le fichier ZIP `AllySurvey_V285_RGAA_WCAG_Autonome.zip`.
4. ✅ Activer le thème **AllySurvey V285 RGAA WCAG** dans les paramètres du questionnaire.
5. 🧹 Réinitialiser les options du thème après mise à niveau.
6. 🧽 Vider le cache LimeSurvey et le cache navigateur.
7. 🧪 Tester le questionnaire avec plusieurs profils d’usage.

Tests minimum recommandés :

- ⌨️ navigation clavier seule ;
- 🔊 lecteur d’écran ;
- 🔎 zoom navigateur à 200 % et plus ;
- 📱 affichage mobile ;
- 🎨 contraste renforcé ;
- 🧩 différents types de questions LimeSurvey ;
- 🎛️ sauvegarde d’une palette propre au questionnaire.

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

Les préférences sont conservées côté navigateur et les changements sont annoncés aux technologies d’assistance via des zones de statut adaptées.

### 🎨 Palettes et personnalisation

La V2.85 utilise désormais la clé `themecolor`, explicitement acceptée par l’éditeur React LimeSurvey 7.

Améliorations principales :

- 15 palettes disponibles ;
- miniatures SVG compactes et responsives ;
- sauvegarde stable de la palette au niveau du questionnaire ;
- synchronisation de l’iframe de prévisualisation ;
- conservation des couleurs personnalisées ;
- lecture de secours de l’ancienne clé `allycolorpalette` pour les configurations héritées.

Avantage : le choix de palette d’un questionnaire peut remplacer durablement la valeur globale `neutre` sans retour intempestif après sauvegarde.

### 🔤 Polices accessibles

La V2.85 publie les polices via le répertoire `files/fonts`, afin d’éviter les erreurs 404 du gestionnaire d’assets LimeSurvey.

Polices incluses :

- Luciole ;
- OpenDyslexic.

Ces polices sont activables depuis les options du thème et depuis la barre d’accessibilité. Elles sont gérées de manière exclusive pour éviter les conflits d’affichage.

### 📅 Dates, emails, téléphones et champs numériques

- 📅 Les dates peuvent être présentées sous forme de trois champs clairs : **Jour / Mois / Année**.
- 🔁 Le champ technique attendu par LimeSurvey au format `aaaa-mm-jj` reste synchronisé automatiquement.
- 🗑️ Les calendriers ou widgets graphiques redondants peuvent être masqués lorsqu’ils créent de la confusion.
- ✉️ Les champs email peuvent bénéficier d’un clavier adapté sur smartphone.
- 📞 Les champs téléphone ou numériques peuvent utiliser `inputmode`, `step` et des attributs adaptés.
- 🚦 Les limites de longueur (`maxlength`, `size`) sont mieux signalées pour éviter les blocages tardifs.

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

Certaines matrices très complexes nécessitent toutefois encore une validation manuelle selon le questionnaire, le paramétrage et le lecteur d’écran utilisé.

### 🔢 Questions de classement et appariement

La V2.85 renforce la prise en charge :

- des questions de classement ;
- des exercices d’appariement ;
- des listes de sélection associées à des tableaux ;
- des états sélectionnés persistants des boutons radio et Oui/Non.

Ces types de questions doivent rester dans le plan de tests manuel, car leur rendu peut varier selon les options LimeSurvey.

---

## 🧪 Diagnostic et mode développeur

Le thème propose des outils exclusifs désactivés par défaut.

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

La visibilité du diagnostic peut être limitée à la prévisualisation afin de ne pas générer le panneau dans le HTML d’un questionnaire public.

### Mode développeur

Le mode développeur peut afficher :

- contour visuel des questions ;
- badges avec identifiant ou code détecté ;
- inspection au clic d’attributs utiles ;
- aides de diagnostic réservées aux enquêtes de test.

---

## 🗂️ Architecture du thème

Structure simplifiée :

```txt
config.xml
README.md
CHANGELOG.md
css/
docs/
files/
options/
scripts/
views/
```

### 📌 Fichiers principaux

- ⚙️ `config.xml` : manifeste du thème LimeSurvey, compatibilité et options.
- 🧾 `CHANGELOG.md` : historique détaillé des évolutions jusqu’à V2.0.32.
- 🧱 `views/layout_global.twig` : structure générale, landmarks, liens d’évitement, barre d’accessibilité.
- 🧠 `views/subviews/header/custom_header.twig` : application des palettes et variables CSS.
- ♿ `files/accessibilite.js` : bundle principal des correctifs accessibilité côté questionnaire.
- 🧩 `files/a11y-modules/` : documentation des familles fonctionnelles du bundle.
- 🔤 `files/fonts/` : polices Luciole et OpenDyslexic.
- 🛠️ `scripts/ally-*.js` : compatibilité LS7, diagnostic, toolbar, palettes et administration.
- 🎨 `css/ally-*.css` : styles d’accessibilité, focus, palettes, toolbar, reflow et contraste.
- 📚 `docs/` : documentation de conformité et procédures de preuve.

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
- 📄 pages statiques et pages de résultat.

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

---

## 👩‍💻 Recommandations pour les créateurs de questionnaires

Même avec un thème renforcé, la qualité finale dépend aussi de la conception du questionnaire.

Il est recommandé de :

- ✍️ rédiger des intitulés de questions clairs ;
- 📊 éviter les tableaux trop complexes lorsque ce n’est pas indispensable ;
- 👁️ limiter les dépendances visuelles seules ;
- 🧾 fournir des consignes explicites ;
- 🧪 tester chaque type de question utilisé ;
- 🔔 vérifier les messages d’aide et les messages d’erreur ;
- ⌨️ tester le questionnaire au clavier avant diffusion ;
- 📱 vérifier le rendu mobile ;
- 💬 éviter de multiplier les champs “Autre” lorsqu’ils ne sont pas nécessaires.

---

## ⚠️ Limites connues

- ⚠️ Le thème améliore le rendu participant, mais ne corrige pas automatiquement tous les contenus saisis par les créateurs de questionnaires.
- 🧩 Certaines questions LimeSurvey complexes peuvent nécessiter une adaptation ou une vérification manuelle.
- 📊 Les matrices complexes doivent être testées avec plusieurs lecteurs d’écran.
- 🛠️ Les corrections JavaScript dépendent du rendu final LimeSurvey et peuvent nécessiter des ajustements selon les versions.
- 🏗️ Le back-office LimeSurvey n’est pas l’objet principal de cette version du thème.
- 📋 Un audit RGAA complet reste nécessaire pour une déclaration officielle de conformité.

---

## 🔭 Perspectives

Les prochaines évolutions envisagées portent notamment sur :

- 🏗️ l’amélioration progressive de l’accessibilité du back-office ;
- 📚 l’enrichissement de la documentation pour les créateurs de questionnaires ;
- 🧪 la poursuite des tests sur les questions complexes ;
- 🧩 la transformation ou l’adaptation de certains types de questions natifs moins accessibles ;
- 📋 l’amélioration des preuves de conformité RGAA ;
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
