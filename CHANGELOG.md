# CHANGELOG — AllySurvey

## 2.0.41

- Le code d’intégration iframe reprend automatiquement le titre réel du questionnaire dans l’attribut `title`.
- Détection prioritaire depuis la page publique du questionnaire, avec repli sur le titre disponible dans l’administration.
- Échappement HTML du titre avant insertion dans le code d’intégration.


## 2.0.40

- Ajout d’un onglet **À propos** en dernière position dans les options du thème.
- Présentation du positionnement RGAA 4 du thème et du service DAWAM – Université de Lille.
- Ajout du contact cliquable `support-limesurvey@univ-lille.fr`.
- Alignement des marqueurs de version runtime sur 2.0.40.

## 2.0.39

- Optimisation du hub MutationObserver : observation des attributs uniquement lorsqu'un module la demande.
- Optimisation iframe : ResizeObserver prioritaire, MutationObserver uniquement en repli ; suppression d'un second observateur permanent et d'un timeout redondant.
- Optimisation du module d'appariement : rescans déclenchés uniquement par des mutations pertinentes et retraitement idempotent des tableaux dynamiques.
- Optimisation du diagnostic : suppression de l'observateur DOM permanent, les hooks DOMContentLoaded/pageshow/PJAX suffisent.
- Alignement des marqueurs de version runtime sur 2.0.39.
- Conservation des correctifs iframe 2.0.38 (paramètres persistants, header/footer, redimensionnement responsive).
