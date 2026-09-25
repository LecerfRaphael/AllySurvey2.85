# Langue des options du thème

Les options personnalisées appellent `gT()` pour utiliser les traductions de
LimeSurvey. Le fichier `scripts/ally-options-i18n.js` complète les libellés
spécifiques au thème en français et en anglais, à partir de l’attribut `lang`
de la page d’administration (y compris les variantes `fr-FR`, `fr_CA`, etc.).
La langue du questionnaire dans l’aperçu ne détermine pas celle des réglages.
La langue effective de l’administration peut dépendre des préférences du compte
administrateur et différer de la langue par défaut de la plateforme.

Pour les autres langues, les traductions fournies par LimeSurvey sont conservées.
Les textes propres au thème sans traduction restent dans leur langue source ;
les nouveaux réglages de messages et les titres de session sont en français à
la source. Il ne s'agit pas d'une traduction automatique de toutes les langues.

La page classique charge ce fichier via `optionsPath`, fourni par LimeSurvey.
L’aperçu le charge aussi via `config.xml` pour compléter les réglages de
l’administration accessibles dans son document parent. Un aperçu sur un autre
domaine ne peut pas modifier ce document parent.

Les changements portent sur les libellés, sans modifier les clés d’options,
les valeurs des champs ou le HTML saisi dans le pied de page.

Vérification locale : français et anglais, variantes de langue, conservation
des libellés allemands existants, mises à jour dynamiques, valeurs et structure
des champs inchangées, indépendance entre langue d’administration et d’aperçu.
Ces contrôles ont été exécutés dans Edge sans interface sur une page de test.
L’intégration complète reste à valider sur une instance LimeSurvey.
