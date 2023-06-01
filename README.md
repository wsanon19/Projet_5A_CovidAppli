# CovidAppli

## API (SpringBoot) + db PostgreeSQL + UI (Angular) 

Ceci est une application permettant de réserver un rendez-vous dans un centre de santé,
de gérer les rendez vous, les medecins, les administrateurs des centres de santé

* Dépot git : `https://github.com/MOBOUTACHAGOMurielle/covid-appli`

## Vidéo de démonstration de l'application
* Lien ClipChamp (Visualiser sans télécharger la vidéo) : `https://clipchamp.com/watch/MgmzKzqfJ8q
* Lien Google Drive : `https://drive.google.com/uc?id=1usifRZK0Rb1j7_0PtNsyCSC3VtRDJ8pd&export=download`

## Déploiement de l'application par docker 

* Se placer dans le répertoire covid-appli 
* lancer le docker compose up 
* url FRONT = `http://localhost:4455`
* url BACK = `http://localhost:9099`

La version conteuneurizer présente quelques bugs.
* Le refresh de page entraine une erreur 404. Il faut dans ce cas juste repartir sur l'url `http://localhost:4455`.
* Après chaque modifs (exemples création d'un nouvel admin) il faut rafraichir le navigateur afin de voir la modif effectuée.
Ce bug est aussi valable en lancement local

## Déploiement de l'application en local

### Config API
* Modifier le fichier application properties de l'api pour la config de la db 
* Port de déploiement : 12037

### Config UI
* port de déploiement : 4200


## Documentation de l'API avec open-api / Swagger 
- Lien vers le swagger lorsque l'appli est déployer dans le conteneur 
`http://localhost:9099/swagger-ui/index.html`

## Users & Password
Quelques identifiants de connexion pré-enregistrés en base de données : 
- Role SUPER_ADMIN : 
  - {login :"christine@Borne.fr" ; password:"password"}
  
- Role ADMIN : 
  - {login:"jean@durandadm.fr";password:"password"}
  
- Role USER : 
  - {login:"user"; password:"password"}

## Informations membres binome 
* Etudiante 1:
  - Nom : MOBOU-TACHAGO Murielle
  - Numéro étudiant : 32027026
* Etudiante 2:
  - Nom : SANON Wilfried
  - Numéro étudiant : 31828632
