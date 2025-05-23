# ClickFastGame

Mettre le projet dans Docker:
-----------------------------

Source: 
https://github.com/aduome/Static-html-docker-server

Créer le fichier Dockerfile avec la configuration suivante:

FROM nginx:latest
COPY . /user/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

Commande pour créer l'image dans Docker :
=> docker build -t clickfastgame:image1 . => Ne pas oublier le espace point à la fin de la commande.

Démarrer le conteneur Docker:
-----------------------------
=> docker run -d -p 80:80 clickfastgame:image1

Pour vérifier le bon démarrage du conteneur dans Docker. Aller sur:
localhost:80

Implémentation CI/CD:
---------------------
Aller sur le repository via le site GitHub
Aller dans l'onglet Action
Cliquer sur Docker-image pour éditer un fichier docker-image.yml (Cela permettra aux Github Actions d'exécuter un Job concernant docker.)
Cliquer sur Commit changes pour sauvegarder

Tests automatisés :
-------------------
1 - Les tests unitaires avec Jest:
Installation des outils nécessaires, création d'environnement node / npm:
=> npm init
Installer jest et jsdom pour nos tests:
=> npm install jsdom
=> npm install --save-dev jest

Commande pour fixer les messages Warning :
=> npm audit fix

Modifier le script de test du package.json :
"scripts": {
  "test": "npx jest"
},

Comme le projet à majoritairement des éléments visuels à tester, on doit faire de la configuration pour tester les éléments du DOM :
Installer jest-environment-jsdom
=> npm jest-environment-jsdom

Faire que jsdom soit inclu dans nos tests automatiquement (au lieu de devoir relancer cette commande à chaque fois)
Dans le package.json, mettre à jour le script "test" :
"scripts": {
  "test": "npx jest --env=jsdom"
},

Maineant au lancement de npm test, le DOM sera pris en compte.

Tests unitaires pour tester le clic sur le bouton une ou plusieurs fois et le bon nombre de points stocké dans le score.

Création d'un DOM de test:
--------------------------
Création du "faux DOM" dans le fichier script.test.js











