# **Projet de Surveillance des Examens**

## **Description du projet**
Ce projet est une application web conçue pour gérer les surveillances des examens au sein d'une école ou université. 
Il permet d'afficher les surveillances par département, les enseignants assignés à chaque période, et les informations détaillées des sessions d'examens.
L'application facilite également la gestion des emplois du temps, l'affectation des surveillants et la gestion des départements.

---

## **Motivation du projet**
La surveillance des examens est une tâche critique qui nécessite une gestion efficace des enseignants, des salles et des horaires.
Ce projet vise à automatiser ce processus en offrant une interface intuitive pour visualiser, planifier et organiser les sessions d'examens de manière optimale.

---

## **Technologies utilisées**

### **Frontend**
- **React.js** : Bibliothèque JavaScript utilisée pour construire l'interface utilisateur interactive et dynamique.
- **React Router** : Gestionnaire de navigation pour créer des routes dynamiques.
- **Lucide-React** : Bibliothèque d'icônes pour embellir l'interface.
- **Chart.js** : Utilisé pour afficher des graphiques analytiques sur les sessions et les surveillances.
- **Tailwind CSS** : Utilisé pour styliser les composants et garantir une interface réactive.

### **Backend**
- **Spring Boot** : Framework Java utilisé pour développer l'API REST du backend.
- **Spring Security** : Sécurisation de l'application et gestion de l'authentification des utilisateurs.
- **Hibernate (JPA)** : Pour la gestion de la persistance des données.
- **MySQL** : Base de données relationnelle pour stocker les données des enseignants, sessions d'examens, surveillances, etc.

---

## **Structure du projet**

### **Frontend (React.js)**
- **Authentification des utilisateurs** (Login, mot de passe oublié, réinitialisation).
- **Tableau de bord interactif** affichant des statistiques et graphiques.
- **Gestion des examens** : Création, suppression et modification des sessions d'examen.
- **Gestion des enseignants** : Affichage, ajout et mise à jour des enseignants.
- **Surveillance des examens** : Attribution des surveillants aux salles et gestion des horaires.
- **Importation d'emplois du temps** via des fichiers Excel.

### **Backend (Spring Boot)**
- **API REST sécurisée** avec JWT pour gérer les utilisateurs, enseignants, sessions et surveillances.
- **Gestion des examens** (CRUD pour les examens, enseignants et salles).
- **Envoi d'e-mails** pour la récupération de mot de passe.
- **Génération de rapports et statistiques**.

---

## **Installation et configuration**

### **Étape 1 : Cloner le dépôt**
Cloner le dépôt Git en local :

```bash
git clone https://github.com/YounesAO/ExamSessionManger.git
cd ExamSessionManger
```

### **Étape 2 : Configurer le backend**

1. **Configurer MySQL** :  
   Créez une base de données nommée `surveillance_db` :

   ```sql
   CREATE DATABASE surveillance_db;
   ```

2. **Configurer les paramètres du backend** :  
   Ouvrez le fichier `application.properties` et mettez à jour les paramètres suivants :
   ```properties
   spring.datasource.url=jdbc:mysql://localhost:3306/surveillance_db
   spring.datasource.username=VOTRE_UTILISATEUR
   spring.datasource.password=VOTRE_MOT_DE_PASSE
   ```

3. **Lancer le backend** :  
   ```bash
   mvn spring-boot:run
   ```
   Le backend sera disponible sur `http://localhost:8088`.

### **Étape 3 : Configurer le frontend**

1. **Installer les dépendances** :  
   ```bash
   npm install
   ```

2. **Configurer l'URL de l'API** :  
   Ouvrez le fichier `axios.js` et assurez-vous que l'URL est correcte :
   ```javascript
   axios.defaults.baseURL = 'http://localhost:8088';
   ```

3. **Lancer le frontend** :  
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

- **Authentification sécurisée des utilisateurs** (Login, OTP, récupération de mot de passe).
- **Gestion des enseignants et départements** (Ajout, modification, suppression).
- **Création et gestion des sessions d’examens** avec planification automatique.
- **Attribution automatique des surveillants** en fonction des disponibilités.
- **Surveillance en temps réel** des sessions d’examens avec mises à jour dynamiques.
- **Affichage des statistiques et graphiques analytiques**.
- **Gestion des locaux et des ressources** pour les examens.

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

## **Team**
- **Nom du développeur** : MISKAR AMINA	
- **Contact** : miskaraminaa@gmail.com

---
- **Nom du développeur** :  Aya EL ABIDI
	
- **Contact** : aya.elabidi@yahoo.com

---
- **Nom du développeur** :  HARATI AYOUB	
- **Contact** : ayoubharati987@gmail.com

---
- **Nom du développeur** :   AIT OUAHDA YOUNES		
- **Contact** : Younes.aitouahda@gmail.com

- ## Video Demonstration For mobile App
Here' an illustrative video of the android mobile app:

<div align="center">
https://github.com/user-attachments/assets/7ff85d9f-22a0-4899-af9c-a712d5e1570a
</div>

---
## **Licence**
Ce projet est sous licence MIT. Vous pouvez l'utiliser et le modifier librement.
