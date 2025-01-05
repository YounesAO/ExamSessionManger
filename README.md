
# **Projet de Surveillance des Examens**

## **Description du projet**
Ce projet est une application web conçue pour gérer les surveillances des examens au sein d'une école ou université. Il permet d'afficher les surveillances par département, les enseignants assignés à chaque période, et les informations détaillées des sessions d'examens.

---

## **Technologies utilisées**

### **Frontend**
- **React.js** : Une bibliothèque JavaScript utilisée pour construire l'interface utilisateur interactive et dynamique.
- **Lucide-React** : Une bibliothèque d'icônes pour embellir l'interface.
- **Tailwind CSS** : Utilisé pour le stylisme des composants, afin de rendre l'interface élégante et réactive.

### **Backend**
- **Spring Boot** : Framework Java utilisé pour développer l'API REST du backend.
- **Hibernate (JPA)** : Pour la gestion de la persistance des données.
- **MySQL** : Base de données relationnelle pour stocker les données des enseignants, sessions d'examens, surveillances, etc.

---

## **Prérequis**
Avant de commencer, assurez-vous d'avoir installé les outils suivants :
- **Node.js** et **npm** (pour exécuter le frontend React.js)
- **Java JDK 11 ou supérieur** (pour exécuter l'application Spring Boot)
- **MySQL** (pour configurer la base de données)

---

## **Installation et configuration**

### **Étape 1 : Cloner le dépôt**
Cloner le dépôt Git en local :

```bash
git clone https://github.com/votre-utilisateur/projet-surveillance.git
cd projet-surveillance
```

### **Étape 2 : Configurer le backend**

1. **Configurer MySQL** :  
   Créez une base de données nommée `surveillance_db` :

   ```sql
   CREATE DATABASE surveillance_db;
   ```

2. **Configurer les paramètres du backend** :  
   Ouvrez le fichier `application.properties` situé dans le dossier `backend/src/main/resources` et mettez à jour les paramètres suivants :
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/surveillance_db
   spring.datasource.username=VOTRE_UTILISATEUR
   spring.datasource.password=VOTRE_MOT_DE_PASSE
   ```

3. **Lancer le backend** :  
   Accédez au dossier `backend` et exécutez la commande suivante :
   ```bash
   mvn spring-boot:run
   ```
   Le backend sera disponible sur `http://localhost:8088`.

---

### **Étape 3 : Configurer le frontend**

1. **Installer les dépendances** :  
   Accédez au dossier `frontend` et exécutez la commande suivante :
   ```bash
   npm install
   ```

2. **Configurer l'URL de l'API** :  
   Ouvrez le fichier où `axios.defaults.baseURL` est défini dans votre code React (fichier Surveillance.js) et assurez-vous que l'URL pointe vers l'API backend :
   ```javascript
   axios.defaults.baseURL = 'http://localhost:8088';
   ```

3. **Lancer le frontend** :  
   Démarrez l'application React :
   ```bash
   npm start
   ```
   Le frontend sera disponible sur `http://localhost:3000`.

---

## **Comment exécuter le projet**

1. Démarrer le backend Spring Boot en exécutant :
   ```bash
   mvn spring-boot:run
   ```
2. Démarrer le frontend React en exécutant :
   ```bash
   npm start
   ```
3. Accédez à l'application dans votre navigateur sur `http://localhost:3000`.

---

## **Fonctionnalités principales**

- **Affichage des surveillances** : 
  - Surveillances classées par département.
  - Affichage des enseignants, des périodes d'examens et des rôles assignés (par exemple : "RR", "TT").
- **Navigation dans les sessions d'examens** : 
  - Naviguez sur plusieurs jours pour voir les surveillances programmées.
- **Mise à jour dynamique des données** : 
  - Chargement des départements, enseignants, surveillances et sessions d'examens à partir de l'API.

---

## **Contribution**
Si vous souhaitez contribuer à ce projet :
1. Forkez le dépôt.
2. Créez une branche pour votre fonctionnalité :
   ```bash
   git checkout -b nouvelle-fonctionnalite
   ```
3. Faites vos modifications et poussez-les :
   ```bash
   git push origin nouvelle-fonctionnalite
   ```
4. Créez une Pull Request.

---

## **Auteurs**
- **Nom du développeur** : [Votre nom]
- **Contact** : [Votre email]

---

## **Licence**
Ce projet est sous licence MIT. Vous pouvez l'utiliser et le modifier librement.

--- 
