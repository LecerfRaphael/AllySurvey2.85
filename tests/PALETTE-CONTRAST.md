# Contrastes des palettes — 29 septembre 2026

Contrôle local avec Chromium (Microsoft Edge) et les feuilles CSS du thème,
y compris la variation Apple héritée. La fixture reprend des composants de
navigation, de questionnaire et de pied de page. Elle reproduit les variables
et règles de custom_header.twig, sans exécuter LimeSurvey ni son moteur Twig.

Commande : `node tests/palette-contrast.cjs` (Playwright disponible via NODE_PATH).

Résultat : 624 contrôles de texte rendus, aucun ratio inférieur à 4,5:1.
Les 16 éléments sont vérifiés dans chaque palette à l'état normal, au survol
et après demande de focus (les textes non interactifs ne reçoivent pas de focus).
91 associations de couleurs sont aussi vérifiées directement : couleur
principale/accent sur blanc et deux gris clairs, noir sur fond de palette.

| Palette | Minimum mesuré sur la fixture |
| --- | ---: |
| Neutre | 5,64:1 |
| Industrie | 6,26:1 |
| Pink Lady | 5,68:1 |
| Brique | 5,14:1 |
| Orangette | 5,80:1 |
| Hypérion | 5,63:1 |
| Océan | 5,25:1 |
| Menthe | 5,26:1 |
| Dune | 5,26:1 |
| Commodore | 6,39:1 |
| Colvert | 5,26:1 |
| Vulcain | 5,43:1 |
| Orange Sanguine | 5,58:1 |

Corrections : Océan #2973C3 → #266AB3, Menthe #3F845F → #377454,
Dune #827561 → #726755. Synchronisation des valeurs CSS, Twig, des options
d'administration et des aperçus. Texte noir sur les fonds colorés des menus
et du pied de page ; icône du menu noire sur le bandeau coloré.

Fichiers à mettre à jour dans le thème :

- css/ally-palettes.css
- css/custom.css
- views/subviews/header/custom_header.twig
- views/subviews/header/palette_contrast_styles.twig (nouveau)
- options/options.js
- scripts/ally-admin-options-bridge.js
- files/palette-ocean.txt
- files/palette-menthe.txt
- files/palette-dune.txt

Conserver également language_menu_styles.twig, ajouté lors du correctif précédent.

Limites : aucune certification RGAA globale. Les questionnaires réels,
leurs contenus HTML, images, couleurs personnalisées, transparences et tous
les composants possibles ne sont pas audités. Le mode de contraste renforcé
et les palettes personnalisées ne font pas partie de ces 13 fixtures.
Le signalement utilisateur à 4,39:1 ne fournissait ni élément ni couleurs :
il n'est pas possible de l'identifier précisément dans l'instance distante.
