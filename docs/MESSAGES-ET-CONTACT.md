# Messages de fermeture et contact d'assistance

Dans **Options du thème > Messages et contact**, personnaliser les quatre champs
suivants. Pour un seul questionnaire, activer d'abord la personnalisation de ses
options ; au niveau général, les valeurs seront héritées par les questionnaires.

| Champ | Utilisation |
|---|---|
| Message du questionnaire expiré | Remplace le corps du message pour l'erreur `survey-expiry` |
| Message d'erreur du questionnaire | Remplace le corps des autres erreurs bloquantes affichées par le thème |
| Nom du contact d'assistance | Nom de la personne ou du service à contacter |
| Adresse e-mail du contact d'assistance | Adresse affichée et lien de contact |

Les messages sont en texte simple ; les sauts de ligne sont conservés. Le titre
de l'erreur reste celui de LimeSurvey. Les champs de message vides conservent les
messages standards. L'expiration du questionnaire est distincte de l'expiration
de session : ces réglages ne modifient pas la fenêtre d'avertissement de session.

Si le nom ou l'adresse du contact est renseigné, ce contact remplace entièrement
le contact standard : aucune adresse administrateur n'est ajoutée en secours.
Renseigner les deux champs pour afficher à la fois le service et son adresse.
Si les deux sont vides, le contact habituel de LimeSurvey est conservé.

## Exemple de fermeture temporaire

Message du questionnaire expiré :

> Suite au nombre important de demandes, le formulaire est temporairement clos.
> Nous vous invitons à consulter régulièrement cette page afin de vérifier quand il sera de nouveau ouvert.

Nom du contact : `Demande d'aide à la connexion`

Adresse e-mail : `aide-connexion@univ-lille.fr`

Exemple de message d'erreur général :

> Le formulaire est momentanément indisponible. Merci de réessayer ultérieurement ou de contacter notre assistance.

Le texte autrefois codé en dur pour le questionnaire `183268` a été retiré.
Pour conserver son message, saisir l'exemple ci-dessus dans ses options.
Le thème ne change ni la date d'expiration ni l'état du questionnaire : la
réouverture doit être effectuée dans les paramètres LimeSurvey.

Les textes saisis sont affichés tels quels dans toutes les langues du
questionnaire ; seule l'interface de réglage bénéficie des traductions du thème.
Ces options ne s'appliquent pas aux pages d'erreur du serveur qui ne chargent pas
le thème ou ne disposent pas de sa configuration.

## Maintenance

Correction de compatibilité : les attributs utilisent le filtre Twig `escape`
plutôt que l'alias `e`, refusé par le sandbox de l'installation testée. La phrase
« Pour plus d'information… » est échappée une seule fois pour afficher correctement
l'apostrophe tout en protégeant le nom du contact.

### Image ou mascotte

Dans le même onglet, activer **Image personnalisée des messages**, puis utiliser
**Envoyer un fichier** sous **Image ou mascotte des messages**. Après l'envoi et
le rechargement, sélectionner le fichier dans la liste et enregistrer les options.
Enregistrer les autres modifications avant l'envoi, car celui-ci recharge la page.
La même image remplace l'illustration standard sur les pages d'expiration et
d'erreur du questionnaire. Elle est redimensionnée en conservant ses proportions.

Renseigner **Texte alternatif de l’image** si l'image apporte une information ;
laisser ce champ vide pour une mascotte purement décorative. Ne pas placer une
information essentielle uniquement dans l'image. Désactiver l'option pour revenir
à l'illustration standard. Les réglages sont héritables et personnalisables par
questionnaire, comme les messages.

Clés : `messageimageenabled` (désactivée par défaut), `messageimagefile`
(`./files/error.png` par défaut), `messageimagealt` (vide par défaut).

### Fichiers concernés

- Déclaration : `config.xml`, clés `expiredsurveytext`, `surveyerrortext`,
  `surveycontactname`, `surveycontactemail`, et `optionsOrderReact`.
- Éditeur : `options/options.twig`, collecte générique par `options/options.js`.
- Traduction des réglages : `scripts/ally-options-i18n.js`.
- Rendu : `views/layout_errors.twig`, texte échappé et adresse encodée dans le lien.

Recette sur LimeSurvey : vérifier héritage/personnalisation et sauvegarde,
ouvrir un questionnaire expiré, déclencher une autre erreur bloquante,
tester chaque champ vide et confirmer l'absence de l'adresse administrateur
lorsqu'un contact personnalisé est utilisé.
