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
=> docker run -d -p 80:80 clickfastgame:image1

Pour vérifier le bon démarrage du conteneur dans Docker. Aller sur:
localhost:80



