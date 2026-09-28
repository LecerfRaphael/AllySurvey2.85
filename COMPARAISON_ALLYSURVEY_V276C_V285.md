# Comparaison AllySurvey V2.76c et V2.85

Date : 28/09/2026  
Source comparee : `AllySurvey_V276c_RGAA_WCAG` vers `AllySurvey_V285_RGAA_WCAG_Autonome` (archive `AllySurvey_V285_RGAA_WCAG_AutonomeV2.zip`)  
Variante V2.85 analysee : theme autonome, sans dependance a `fruity_twentythree`  
Version manifeste V2.85 : `2.0.41` (derniere mise a jour declaree : 2026-09-25 14:00:00)

## 1. Synthese

AllySurvey V2.85 autonome est une evolution majeure par rapport a V2.76c.

La V2.76c etait centree sur le socle d'accessibilite repondant base sur `vanilla`. La V2.85 autonome reprend ce socle et ajoute une distribution beaucoup plus complete pour LimeSurvey 7 : vues Twig supplementaires, scripts de compatibilite, palettes React, diagnostic, mode developpeur, polices accessibles, integration plus robuste avec l'editeur de themes et, depuis septembre 2026, des options d'administration (session, messages, images, iframe).

Comparaison de structure :

| Indicateur | V2.76c | V2.85 autonome |
|---|---:|---:|
| Nombre de fichiers | 68 | 230 (releve du 15/07/2026, a recalculer) |
| Fichiers ajoutes dans V2.85 | - | 188 (releve du 15/07/2026) |
| Fichiers modifies | - | 16 (releve du 15/07/2026) |
| Fichiers retires ou remplaces | - | 26 (releve du 15/07/2026) |
| Theme parent declare | `vanilla` | aucun |
| Compatibilite manifeste | 6.0 et 7.0 | 7.0 et 6.0 |
| Version manifeste | `3.0.2` | `2.0.41` |

> Les effectifs de fichiers datent de la comparaison du 15/07/2026 (manifeste `2.0.32`). Ils n'ont pas ete recalcules depuis les ajouts de septembre 2026 (docs, options, scripts iframe et i18n).

## 2. Principales ameliorations de la V2.85

### Compatibilite LimeSurvey 7

La V2.85 ajoute une couche dediee a LimeSurvey 7 :

- compatibilite avec Bootstrap 5 ;
- initialisation apres PJAX et remplacements dynamiques du DOM ;
- normalisation des attributs `data-bs-*` ;
- correction de modales, navigation, progression et vues statiques ;
- documentation `docs/LIMESURVEY-7-COMPATIBILITE.md` (PHP >= 8.1.29).

Avantage : le theme est plus fiable sur les rendus modernes de LimeSurvey 7, tout en conservant une compatibilite de transition avec LimeSurvey 6.

### Autonomie du paquet

Cette variante ne declare pas `fruity_twentythree` comme theme parent (aucun `parentThemeName` dans `config.xml`). Le champ `<description>` du manifeste decrit desormais explicitement un theme autonome.

Avantage : l'import est plus simple lorsque l'on ne veut pas dependre d'un theme parent installe sur l'instance cible.

### Gestion des palettes

La V2.85 remplace la cle personnalisee `allycolorpalette` par `themecolor`, cle acceptee par l'editeur React LimeSurvey 7.

Ameliorations :

- 14 palettes selectionnables (`neutre`, `industrie`, `pinklady`, `brique`, `orangette`, `hyperion`, `ocean`, `menthe`, `dune`, `commodore`, `colvert`, `vulcain`, `orangesanguine`, `custom`) ;
- 15 miniatures de palette presentes dans l'archive : la palette `highcontrast` (contraste renforce) est fonctionnelle en CSS/JS mais n'est pas exposee dans la liste `themecolor` du manifeste ;
- miniatures SVG compactes ;
- sauvegarde durable de la palette au niveau questionnaire ;
- synchronisation de l'iframe de previsualisation ;
- conservation des couleurs personnalisees ;
- lecture de secours des anciennes configurations `allycolorpalette`.

Avantage : les couleurs choisies par le proprietaire du questionnaire restent stables apres sauvegarde et rechargement.

### Polices et confort de lecture

La V2.85 integre et publie correctement :

- Luciole ;
- OpenDyslexic.

Les polices sont placees dans `files/fonts`, avec prise en charge par le gestionnaire d'assets LimeSurvey.

Avantage : moins d'erreurs 404, activation plus fiable et meilleure experience pour les utilisateurs ayant besoin d'une police de lecture adaptee.

### Barre d'accessibilite

La barre d'accessibilite est conservee et renforcee :

- localisation francais/anglais ;
- annonces vocales adaptees ;
- meilleure prise en charge du contraste ;
- gestion exclusive des polices accessibles ;
- adaptation aux metriques de Luciole et OpenDyslexic.

Avantage : l'utilisateur final dispose d'options de confort plus solides et plus comprehensibles.

### Diagnostic et mode developpeur

La V2.85 ajoute ou consolide :

- diagnostic indicatif RGAA/WCAG ;
- mode developpeur avec inspection ;
- option de visibilite du diagnostic limitee a la previsualisation ;
- scripts dedies `ally-diagnostic.js`, `ally-developer.js` et `ally-audit-fixes.js`.

Avantage : les createurs et mainteneurs peuvent detecter plus vite des problemes courants sans exposer ces outils sur les questionnaires publics.

### Options d'administration (ajouts de septembre 2026)

La V2.85 permet de personnaliser depuis les options du theme, sans modifier les fichiers Twig :

| Fonction | Reglages | Cles principales |
|---|---|---|
| Gestion de session | Duree estimee et delai d'avertissement (24 et 3 minutes par defaut) | `sessiontimeoutminutes`, `sessionwarningminutes` |
| Langue des options | Libelles selon la langue de l'administration, complement francais/anglais | `scripts/ally-options-i18n.js` |
| Messages personnalises | Texte du questionnaire expire et des autres erreurs bloquantes | `expiredsurveytext`, `surveyerrortext` |
| Assistance independante | Nom et e-mail distincts de l'administrateur du questionnaire | `surveycontactname`, `surveycontactemail` |
| Image ou mascotte des messages | Illustration personnalisee avec texte alternatif | `messageimageenabled`, `messageimagefile`, `messageimagealt` |
| Envoi d'images | Logo, fond, image du pied de page et image des messages | `options/options.twig`, `options/options.js` |
| Integration iframe | Code a copier, URL directe, masquage de l'en-tete et du pied de page, hauteur automatique | `iframehideheader`, `iframehidefooter`, `scripts/ally-iframe.js` |

Corrections associees : filtre Twig `escape('html_attr')` compatible avec le sandbox de l'installation testee, et suppression du double echappement de l'apostrophe dans la phrase de contact.

Avantage : moins de personnalisations dans le code, et donc moins de risques a chaque mise a jour du theme.

Limites : la duree de session regle une estimation cote navigateur et ne modifie pas la session serveur ; le mode integre memorise en session n'est pas supprime par `allyiframe=0` ; l'envoi d'images et l'enregistrement reel n'ont pas ete valides sur un serveur LimeSurvey.

### Vues Twig plus completes

La V2.85 ajoute de nombreuses vues Twig :

- pages de contenu ;
- navigation ;
- messages ;
- impression ;
- reponses imprimees ;
- formulaires utilisateur ;
- confidentialite ;
- statistiques utilisateur ;
- maintenance et liste des questionnaires.

Avantage : le theme maitrise davantage de surfaces LimeSurvey, ce qui reduit les incoherences entre pages principales, pages statiques et sorties imprimees.

### Correctifs d'accessibilite visibles

La V2.85 renforce notamment :

- les noms accessibles des boutons (audit WCAG 2.5.3 dans `docs/AUDIT-WCAG-253-LABEL-IN-NAME.md`) ;
- le focus visible ;
- les contrastes des erreurs et champs invalides ;
- les boutons radio et Oui/Non selectionnes ;
- les cases a cocher ;
- les modales ;
- les messages obligatoires ;
- le compteur de progression ;
- les questions d'appariement et de classement ;
- l'objectif des champs utilisateur (`autocomplete`, WCAG 1.3.5) et le balisage de la langue des passages (WCAG 3.1.2).

Avantage : l'experience clavier et lecteur d'ecran est plus homogene.

## 3. Evolutions techniques observees

Fichiers modifies importants :

| Fichier | Evolution |
|---|---|
| `config.xml` | Nouveau manifeste V2.85 (`2.0.41`), suppression de la dependance parent, options LimeSurvey 7, session, messages/contact, images, iframe |
| `files/accessibilite.js` | Bundle accessibilite ajuste (fichier unique conserve pour eviter les regressions PJAX) |
| `views/layout_global.twig` | Structure generale adaptee a la nouvelle distribution |
| `views/layout_errors.twig` | Messages, contact et image personnalises ; message d'expiration code en dur retire (questionnaire `183268`) |
| `views/subviews/header/custom_header.twig` | Application des palettes et variables CSS |
| `views/subviews/messages/bootstrap_alert_modal.twig` | Amelioration des modales |
| `options/options.twig`, `options/options.js` | Envoi d'images, generateur de code iframe et copie d'URL |
| `README.md` | Documentation recentree sur V2.0.41 et LimeSurvey 7 |

Fichiers ou familles ajoutes :

- `css/ally-*.css` (dont `ally-admin-options.css` et `ally-iframe.css`) ;
- `scripts/ally-*.js` (dont `ally-admin-options-bridge.js`, `ally-options-i18n.js` et `ally-iframe.js`) ;
- `scripts/theme.js` ;
- `files/palette-*.txt` ;
- `files/a11y-modules/` (documentation du bundle, `manifest.json`) ;
- `files/fonts/OpenDyslexic-*.woff2` ;
- nombreuses vues `views/subviews/*` ;
- documentation dans `docs/` : LimeSurvey 7, diagnostic, messages et contact, langue des options, guide createurs (langue des passages), audit 2.5.3, procedure de preuves et fiches de non-conformite `NC-R*` ;
- `GUIDE-DEVELOPPEUR-ALLYSURVEY-V285.md` et `DOCUMENTATION_TECHNIQUE_ALLYSURVEY_V285` (`.md` et `.pdf`).

Fichiers retires ou remplaces :

- anciennes variations CSS de Vanilla ;
- ancien `theme.css` ;
- anciens tests statiques embarques ;
- ancienne documentation V2.76c integree au paquet ;
- emplacement historique `files/fonts/luciole/`.

> Un `CHANGELOG.md` est cite dans les versions precedentes de ce comparatif et du README, mais il n'est pas present dans l'archive actuelle.

## 4. Avantages de la V2.85 autonome

Pour les repondants :

- meilleure lisibilite ;
- meilleurs contrastes ;
- focus clavier plus visible ;
- options de confort plus riches ;
- comportement plus coherent des questions complexes ;
- annonces lecteur d'ecran plus propres ;
- avertissement de session avec prolongation possible.

Pour les createurs de questionnaires :

- palettes plus faciles a choisir ;
- previsualisation plus fiable ;
- diagnostic indicatif disponible en previsualisation ;
- meilleure stabilite des options dans LimeSurvey 7 ;
- personnalisation visuelle plus robuste ;
- messages d'expiration et d'erreur, contact d'assistance et images personnalisables par questionnaire ;
- code d'integration iframe genere directement depuis les options.

Pour les administrateurs :

- paquet plus independant ;
- meilleure compatibilite LimeSurvey 7 ;
- documentation d'installation plus claire ;
- pas de preverification du parent `fruity_twentythree` ;
- dossier de documentation et de preuves structure dans `docs/` (les evolutions detaillees ne sont plus tracees par un `CHANGELOG.md`, absent de l'archive).

## 5. Points d'attention

- Cette variante est autonome, mais elle doit etre testee sur l'instance cible comme theme complet.
- Les matrices complexes et classements doivent rester dans le plan de tests manuel.
- Le diagnostic ne vaut pas audit RGAA officiel.
- Cinq non-conformites documentees restent ouvertes : `NC-R015` (matrices, NVDA), `NC-R0210` (espacement sur les variations), `NC-R0311` (autocomplete heuristique), `NC-R0412` (ordre de tabulation dans les matrices) et `NC-R058` (langue des passages, partiel). Elles doivent etre traitees ou assumees avant toute declaration de conformite RGAA.
- Apres migration depuis V2.76c, relever les options personnalisees avant la mise a niveau, verifier la presence des nouveaux reglages (messages, contact, images, session, integration) et reappliquer les valeurs sauvegardees si une reinitialisation est necessaire, puis tester les palettes.
- Pour le questionnaire `183268`, recopier le message d'expiration historique dans le champ `expiredsurveytext` de ses options.
- Le fichier `tests/accessibilite/MATRICE-TESTS-RGAA-WCAG.md`, reference par la procedure de preuves, n'est pas fourni dans l'archive.
- Les validations locales (XML, JavaScript, Twig.js, Edge) ne remplacent pas la recette sur LimeSurvey 6 et 7 : envoi reel d'images, enregistrement, heritage, pages d'erreur, sandbox Twig PHP et integration iframe entre domaines restent a verifier.

## 6. Recommandation

Pour un deploiement LimeSurvey 7 sans dependance au parent `fruity_twentythree`, utiliser `AllySurvey_V285_RGAA_WCAG_Autonome` (archive `AllySurvey_V285_RGAA_WCAG_AutonomeV2.zip`).

Pour un deploiement ou `fruity_twentythree` est explicitement souhaite comme parent, utiliser `AllySurvey_V285_RGAA_WCAG`.
