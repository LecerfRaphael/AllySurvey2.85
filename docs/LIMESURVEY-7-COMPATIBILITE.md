# Compatibilité LimeSurvey 7 — Fruity AllySurvey V2.0

## Cible

- LimeSurvey 7.0.x, version autonome sans thème parent `fruity_twentythree`.
- PHP 8.1.29 ou version ultérieure, conformément aux prérequis LimeSurvey 7.
- Compatibilité de transition maintenue avec LimeSurvey 6 grâce à la déclaration du manifeste.

## Adaptations V2.0

- manifeste déclaré pour les branches 7.0 et 6.0 ;
- couche JavaScript indépendante et idempotente pour les navigations PJAX et les nouveaux événements ;
- normalisation des attributs Bootstrap 5 `data-bs-*` sans supprimer les attributs historiques LimeSurvey ;
- réinitialisation après remplacement dynamique du contenu ;
- gestion des ajouts DOM via `MutationObserver` ;
- événement public `fas:ready` pour les modules du thème ;
- styles de reflow, focus visible et réduction des mouvements consolidés ;
- options React du thème complétées pour les fonctions V1.3 et V2.0.

## Suivi des ajustements recents

### 17/07/2026

- Le bouton du menu de navigation du questionnaire utilise desormais l'icone hamburger `ri-menu-fill` a la place de l'icone `ri-more-fill`, en affichage mobile comme desktop.
- Les styles des variations ont ete synchronises pour cibler `.ri-menu-fill` et conserver le rendu du bouton de menu.
- Le bouton flottant de la barre d'accessibilite est decale vers la gauche en affichage mobile via `right:max(1.5rem, env(safe-area-inset-right))`.
- La variation `theme_apple.css` restaure `margin-left: 0.5em;` sur `.space-col` afin de corriger le decalage horizontal observe sur smartphone.
- Un second lien d'evitement optionnel permet d'aller directement aux options d'accessibilite lorsque les liens d'evitement et la barre d'accessibilite sont actives.
- Le lien d'evitement vers le contenu principal affiche `Aller au contenu principal` pour les questionnaires en francais et `SKIP CONTENT` pour les autres langues.
- La page d'options du theme respecte de nouveau la valeur `inherit` sur `TemplateConfiguration_options` afin de conserver l'heritage des reglages tant que le questionnaire n'est pas personnalise.
- Sur les options d'un questionnaire, les onglets affichent les reglages herites du theme general et un bouton `Personnaliser le questionnaire` active la personnalisation locale.
- Un bouton `Revenir a l'heritage du theme general` permet de remettre les options du questionnaire sur la valeur `inherit`.

## Installation

Importer l’archive depuis Configuration > Thèmes > Thèmes d’enquête. Cette version autonome ne requiert pas le thème parent `fruity_twentythree`.

Après installation ou mise à jour, vider le cache des assets LimeSurvey et le cache du navigateur.

## Limites de validation

La validation statique du package ne remplace pas les essais dans une installation LimeSurvey 7 avec les extensions, plugins et types de questions propres à l’établissement.
