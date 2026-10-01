/* Administration only: use the admin document language, never the preview language. */
(function () {
  'use strict';
  var french = {
    'Messages and contact': 'Messages et contact',
    'Custom message image': 'Image personnalisée des messages',
    'Message image or mascot': 'Image ou mascotte des messages',
    'Image alternative text (empty if decorative)': 'Texte alternatif de l’image (vide si décorative)',
    'Expired survey message': 'Message du questionnaire expiré',
    'Survey error message': 'Message d’erreur du questionnaire',
    'Support contact name': 'Nom du contact d’assistance',
    'Support contact email': 'Adresse e-mail du contact d’assistance',
    'Leave fields blank to keep the standard LimeSurvey messages and contact. These settings apply to blocking survey error pages, not session warnings. Messages use plain text and preserve line breaks. A custom contact replaces the administrator contact; enter both name and email when needed.': 'Laisser les champs vides pour conserver les messages et le contact habituels de LimeSurvey. Ces réglages concernent les pages d’erreur bloquantes du questionnaire, pas les alertes de session. Les messages sont en texte simple, avec conservation des sauts de ligne. Un contact personnalisé remplace le contact administrateur ; renseigner le nom et l’adresse e-mail si nécessaire.',
    'Color themes': 'Palettes de couleurs', 'Color palette': 'Palette de couleurs',
    'Survey title size (H1)': 'Taille du titre (H1)', 'Group name size (H2)': 'Taille du nom du groupe (H2)', 'Paragraph size': 'Taille des paragraphes', 'Theme default': 'Taille par défaut du thème',
    'Simple options': 'Options générales', 'Colors': 'Couleurs', 'Fonts': 'Polices',
    'Special footer': 'Pied de page', 'Appearance': 'Apparence',
    'Accessibility': 'Accessibilité', 'Accessibility toolbar': 'Barre d’accessibilité',
    'Display options': 'Options d’affichage', 'Exclusive tools': 'Outils spécifiques',
    'Advanced customization': 'Personnalisation avancée',
    'Hide privacy info': 'Masquer les informations de confidentialité',
    'Show popups': 'Afficher les fenêtres contextuelles', 'Wrap tables': 'Adapter les tableaux',
    "Show 'Clear all' button": 'Afficher le bouton « Tout effacer »',
    'Question help text position': 'Position de l’aide des questions',
    'Fix automatically numeric value': 'Corriger automatiquement les valeurs numériques',
    'Corner radius': 'Arrondi des angles', 'Background color': 'Couleur de fond',
    'Font color': 'Couleur du texte', 'Question background color': 'Couleur de fond des questions',
    'Check icon': 'Icône de coche', 'Background image': 'Image de fond',
    'Background image file': 'Fichier de l’image de fond', 'Logo file': 'Fichier du logo',
    'Footer HTML': 'Contenu HTML du pied de page', 'Footer logo': 'Logo du pied de page',
    'Footer logo file': 'Fichier du logo du pied de page', 'Theme color': 'Couleur du thème',
    'Estimated session duration (minutes)': 'Durée de session estimée (minutes)',
    'Warn before expiration (minutes)': 'Avertir avant l’expiration (minutes)',
    'Skip links': 'Liens d’évitement', 'Enhanced keyboard focus': 'Focus clavier renforcé',
    'Respect reduced motion': 'Respecter la réduction des animations',
    'Toolbar position': 'Position de la barre', 'Collapsed by default': 'Repliée par défaut',
    'Text size controls': 'Réglage de la taille du texte', 'High contrast control': 'Contraste renforcé',
    'Monochrome control': 'Affichage monochrome', 'Text spacing control': 'Espacement du texte',
    'Underline links control': 'Soulignement des liens', 'Animation control': 'Gestion des animations',
    'Luciole font control': 'Police Luciole', 'Dyslexia-friendly font control': 'Police adaptée à la dyslexie',
    'Question borders': 'Bordures des questions', 'Question shadow': 'Ombre des questions',
    'Content width': 'Largeur du contenu', 'RGAA/WCAG enhancements': 'Améliorations RGAA/WCAG',
    'Accessibility diagnostic': 'Diagnostic d’accessibilité', 'Diagnostic visibility': 'Visibilité du diagnostic',
    'Developer mode': 'Mode développeur', 'Show question codes': 'Afficher les codes des questions',
    'Accent color': 'Couleur d’accentuation', 'Focus color': 'Couleur du focus',
    'Maximum content width': 'Largeur maximale du contenu', 'Interface density': 'Densité de l’interface',
    'Question presentation': 'Présentation des questions', 'Button shape': 'Forme des boutons',
    'Base text size': 'Taille de base du texte', 'LimeSurvey 7 compatibility layer': 'Compatibilité LimeSurvey 7',
    'Yes': 'Oui', 'No': 'Non', 'Popup': 'Fenêtre contextuelle', 'On page': 'Dans la page',
    'Always on': 'Toujours', 'Small screens': 'Petits écrans', 'Off': 'Désactivé',
    'Top': 'En haut', 'Bottom': 'En bas', 'For expression': 'Pour les expressions',
    'Left': 'Gauche', 'Right': 'Droite', 'Normal': 'Normal', 'Wide': 'Large', 'Full': 'Toute la largeur',
    'Enabled': 'Activé', 'Preview only': 'Aperçu uniquement',
    'Preview and public survey': 'Aperçu et questionnaire public', 'Unlimited': 'Sans limite',
    'Compact': 'Compact', 'Comfortable': 'Confortable', 'Spacious': 'Aéré',
    'Flat': 'Simple', 'Card': 'Carte', 'Outlined': 'Encadrée', 'Square': 'Carré',
    'Soft': 'Arrondi', 'Pill': 'Pilule', 'Small': 'Petit', 'Large': 'Grand',
    'Custom': 'Personnalisé', 'Check': 'Coche', 'Check circle': 'Coche dans un cercle',
    'Check square': 'Coche dans un carré', 'User browser': 'Navigateur de l’utilisateur',
    'Customize this survey': 'Personnaliser le questionnaire',
    'Restore general theme inheritance': 'Revenir à l’héritage du thème général',
    'This survey inherits the general theme settings.': 'Le questionnaire hérite actuellement des réglages du thème général.',
    'This survey uses custom settings.': 'Le questionnaire utilise des réglages personnalisés.',
    'Preview image': 'Prévisualiser l’image', 'Upload a file': 'Envoyer un fichier',
    'The file will be added to the theme files folder.': 'Le fichier sera ajouté au dossier files du thème.',
    'File uploaded.': 'Fichier envoyé.', 'File upload failed.': 'L’envoi du fichier a échoué.',
    'No image available for this selection.': 'Aucune image disponible pour cette sélection.', 'Close': 'Fermer',
    'Inactivity delay used by the warning. Match the LimeSurvey/PHP server session duration; this setting does not change the server session. Default: 24 minutes.': 'Délai utilisé pour l’alerte après inactivité. À aligner sur la durée de session du serveur LimeSurvey/PHP ; ce réglage ne modifie pas la session du serveur. Par défaut : 24 minutes.',
    'Countdown before estimated expiration. Use a value below the session duration. Default: 3 minutes. Otherwise, the script uses a quarter of the session duration, with a minimum of 30 seconds.': 'Compte à rebours avant l’expiration estimée. Choisir une valeur inférieure à la durée de session. Par défaut : 3 minutes. Sinon, le script utilise un quart de la durée de session, avec un minimum de 30 secondes.'
  };
  var english = {};
  var textSources = new WeakMap();
  Object.keys(french).forEach(function (key) { english[french[key]] = key; });
  function translate(text, doc) {
    var lang = (doc.documentElement.lang || 'en').toLowerCase().split(/[-_]/)[0];
    if (lang === 'fr') return french[text] || text;
    if (lang === 'en') return english[text] || text;
    return text; // Keep translations supplied by LimeSurvey for other languages.
  }
  function apply(doc) {
    var selector = '.fas-theme-options label, .fas-theme-options button, .fas-theme-options p, .fas-theme-options option, .fas-theme-options .fas-footer-upload-help, .survey-setting label, .survey-setting .h6, .survey-setting [role="option"], .survey-setting .select__single-value, .settings-block .h6, .settings-block h2, .settings-block h3, .settings-block [role="tab"], [aria-labelledby^="lbl_simple_edit_options_"] label, .fas-footer-upload button, .fas-footer-upload-help';
    doc.querySelectorAll(selector).forEach(function (element) {
      var walker = doc.createTreeWalker(element, 4);
      var node;
      while ((node = walker.nextNode())) {
        if (node.parentElement.closest('script, style, textarea, [contenteditable="true"]')) continue;
        var current = node.nodeValue.trim();
        var previous = textSources.get(node);
        var source = previous && previous.output === current ? previous.source : current;
        var translated = translate(source, doc);
        textSources.set(node, { source: source, output: translated });
        if (translated !== current) node.nodeValue = node.nodeValue.replace(current, translated);
      }
    });
    doc.querySelectorAll('.fas-theme-options [aria-label], .fas-theme-options optgroup[label]').forEach(function (element) {
      var attr = element.hasAttribute('aria-label') ? 'aria-label' : 'label';
      var value = element.getAttribute(attr);
      var translated = translate(value, doc);
      if (translated !== value) element.setAttribute(attr, translated);
    });
  }
  function install(doc) {
    if (doc.__allyOptionsI18n) return;
    doc.__allyOptionsI18n = { translate: function (text) { return translate(text, doc); }, apply: function () { apply(doc); } };
    var pending = false;
    function schedule() {
      if (pending) return;
      pending = true;
      doc.defaultView.setTimeout(function () { pending = false; apply(doc); }, 0);
    }
    apply(doc);
    new doc.defaultView.MutationObserver(schedule).observe(doc.body, { childList: true, characterData: true, subtree: true });
    new doc.defaultView.MutationObserver(schedule).observe(doc.documentElement, { attributes: true, attributeFilter: ['lang'] });
  }
  function start() {
    if (document.querySelector('.fas-theme-options, #theme-options-preview-container, .theme-options-preview-iframe, .survey-setting')) install(document);
    try {
      var parentDoc = window.parent.document;
      if (parentDoc !== document && parentDoc.querySelector('#theme-options-preview-container, .theme-options-preview-iframe')) install(parentDoc);
    } catch (error) { /* Cross-origin previews cannot access the admin document. */ }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
}());
