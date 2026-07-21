# Comparaison AllySurvey V2.76c et V2.85

Date : 15/07/2026  
Source comparee : `AllySurvey_V276c_RGAA_WCAG` vers `AllySurvey_V285_RGAA_WCAG_Autonome`  
Variante V2.85 analysee : theme autonome, sans dependance a `fruity_twentythree`

## 1. Synthese

AllySurvey V2.85 autonome est une evolution majeure par rapport a V2.76c.

La V2.76c etait centree sur le socle d'accessibilite repondant base sur `vanilla`. La V2.85 autonome reprend ce socle et ajoute une distribution beaucoup plus complete pour LimeSurvey 7 : vues Twig supplementaires, scripts de compatibilite, palettes React, diagnostic, mode developpeur, polices accessibles et integration plus robuste avec l'editeur de themes.

Comparaison de structure :

| Indicateur | V2.76c | V2.85 autonome |
|---|---:|---:|
| Nombre de fichiers | 68 | 230 |
| Fichiers ajoutes dans V2.85 | - | 188 |
| Fichiers modifies | - | 16 |
| Fichiers retires ou remplaces | - | 26 |
| Theme parent declare | `vanilla` | aucun |
| Compatibilite manifeste | 6.0 et 7.0 | 7.0 et 6.0 |
| Version manifeste | `3.0.2` | `2.0.32` |

## 2. Principales ameliorations de la V2.85

### Compatibilite LimeSurvey 7

La V2.85 ajoute une couche dediee a LimeSurvey 7 :

- compatibilite avec Bootstrap 5 ;
- initialisation apres PJAX et remplacements dynamiques du DOM ;
- normalisation des attributs `data-bs-*` ;
- correction de modales, navigation, progression et vues statiques ;
- documentation `docs/LIMESURVEY-7-COMPATIBILITE.md`.

Avantage : le theme est plus fiable sur les rendus modernes de LimeSurvey 7, tout en conservant une compatibilite de transition avec LimeSurvey 6.

### Autonomie du paquet

Cette variante ne declare pas `fruity_twentythree` comme theme parent.

Avantage : l'import est plus simple lorsque l'on ne veut pas dependre d'un theme parent installe sur l'instance cible.

### Gestion des palettes

La V2.85 remplace la cle personnalisee `allycolorpalette` par `themecolor`, cle acceptee par l'editeur React LimeSurvey 7.

Ameliorations :

- 15 palettes disponibles ;
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
- gestion des polices accessibles ;
- adaptation aux metriques de Luciole et OpenDyslexic.

Avantage : l'utilisateur final dispose d'options de confort plus solides et plus comprehensibles.

### Diagnostic et mode developpeur

La V2.85 ajoute ou consolide :

- diagnostic indicatif RGAA/WCAG ;
- mode developpeur avec inspection ;
- option de visibilite du diagnostic limitee a la previsualisation ;
- scripts dedies `ally-diagnostic.js`, `ally-developer.js` et `ally-audit-fixes.js`.

Avantage : les createurs et mainteneurs peuvent detecter plus vite des problemes courants sans exposer ces outils sur les questionnaires publics.

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

- les noms accessibles des boutons ;
- le focus visible ;
- les contrastes des erreurs et champs invalides ;
- les boutons radio et Oui/Non selectionnes ;
- les cases a cocher ;
- les modales ;
- les messages obligatoires ;
- le compteur de progression ;
- les questions d'appariement et de classement.

Avantage : l'experience clavier et lecteur d'ecran est plus homogene.

## 3. Evolutions techniques observees

Fichiers modifies importants :

| Fichier | Evolution |
|---|---|
| `config.xml` | Nouveau manifeste V2.85, suppression de la dependance parent, options LimeSurvey 7 |
| `files/accessibilite.js` | Bundle accessibilite ajuste |
| `views/layout_global.twig` | Structure generale adaptee a la nouvelle distribution |
| `views/subviews/header/custom_header.twig` | Application des palettes et variables CSS |
| `views/subviews/messages/bootstrap_alert_modal.twig` | Amelioration des modales |
| `README.md` | Documentation recentree sur V2.0.32 et LimeSurvey 7 |

Fichiers ou familles ajoutes :

- `CHANGELOG.md` ;
- `css/ally-*.css` ;
- `scripts/ally-*.js` ;
- `scripts/theme.js` ;
- `files/palette-*.txt` ;
- `files/fonts/OpenDyslexic-*.woff2` ;
- nombreuses vues `views/subviews/*` ;
- documentation LimeSurvey 7 et diagnostic.

Fichiers retires ou remplaces :

- anciennes variations CSS de Vanilla ;
- ancien `theme.css` ;
- anciens tests statiques embarques ;
- ancienne documentation V2.76c integree au paquet ;
- emplacement historique `files/fonts/luciole/`.

## 4. Avantages de la V2.85 autonome

Pour les repondants :

- meilleure lisibilite ;
- meilleurs contrastes ;
- focus clavier plus visible ;
- options de confort plus riches ;
- comportement plus coherent des questions complexes ;
- annonces lecteur d'ecran plus propres.

Pour les createurs de questionnaires :

- palettes plus faciles a choisir ;
- previsualisation plus fiable ;
- diagnostic indicatif disponible en previsualisation ;
- meilleure stabilite des options dans LimeSurvey 7 ;
- personnalisation visuelle plus robuste.

Pour les administrateurs :

- paquet plus independant ;
- meilleure compatibilite LimeSurvey 7 ;
- documentation d'installation plus claire ;
- pas de preverification du parent `fruity_twentythree` ;
- meilleure tracabilite via `CHANGELOG.md`.

## 5. Points d'attention

- Cette variante est autonome, mais elle doit etre testee sur l'instance cible comme theme complet.
- Les matrices complexes et classements doivent rester dans le plan de tests manuel.
- Le diagnostic ne vaut pas audit RGAA officiel.
- Apres migration depuis V2.76c, il faut reinitialiser les options du theme et tester les palettes.

## 6. Recommandation

Pour un deploiement LimeSurvey 7 sans dependance au parent `fruity_twentythree`, utiliser `AllySurvey_V285_RGAA_WCAG_Autonome`.

Pour un deploiement ou `fruity_twentythree` est explicitement souhaite comme parent, utiliser `AllySurvey_V285_RGAA_WCAG`.

