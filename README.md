<p align="center">
  <a href="https://github.com/ton-utilisateur/voyage-buddy" target="_blank">
    <img src="https://images.unsplash.com/photo-1517940412238-1b8e68f60efa?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" width="400" alt="Voyage Buddy Logo">
  </a>
</p>

<p align="center">
  <a href="https://github.com/ton-utilisateur/voyage-buddy/actions">
    <img src="https://images.unsplash.com/photo-1548957175-84f0f9af659e?q=80&w=1482&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Build Status">
  </a>
  <a href="https://github.com/ton-utilisateur/voyage-buddy">
    <img src="https://img.shields.io/github/stars/ton-utilisateur/voyage-buddy" alt="GitHub stars">
  </a>
  <a href="https://github.com/ton-utilisateur/voyage-buddy/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/ton-utilisateur/voyage-buddy" alt="License">
  </a>
</p>

# ✈️ Voyage Buddy – Trouve ton compagnon de route !  

🚀 **Voyage Buddy** est une application qui connecte les voyageurs et facilite le partage de trajets.  
Que ce soit pour faire des économies, réduire l'empreinte carbone ou rencontrer de nouvelles personnes, **Voyage Buddy** est là pour toi !  

---

## 🎯 **Fonctionnalités principales**  

✔ **Trouver des trajets** : Recherchez des voyages partagés et envoyez une demande pour rejoindre un trajet.  
✔ **Publier un trajet** : Proposez un trajet et acceptez des compagnons de voyage.  
✔ **Messagerie privée** : Discutez avec vos co-voyageurs avant le départ.  
✔ **Système d'évaluation** : Notez et laissez un avis après le trajet.  
✔ **Notifications en temps réel** : Recevez des alertes pour les nouvelles demandes et réponses.  
✔ **Profils utilisateurs** : Construisez votre réputation avec des badges et statistiques.  

---

## 🔧 **Technologies utilisées**  

| **Stack**        | **Technologie**              |
|-----------------|----------------------------|
| Frontend        | React, Vite, TailwindCSS  |
| Backend        | Laravel, Sanctum API        |
| Base de données | MySQL ou PostgreSQL        |
| Authentification | Laravel Breeze             |
| Déploiement     | Docker, Linux, Nginx       |

---

## 🚀 **Installation & Setup**  

### **1️⃣ Cloner le projet**  
git clone https://github.com/ton-utilisateur/voyage-buddy.git
cd voyage-buddy

### **2️⃣ Installer les dépendances** 
composer install
npm install

### **3️⃣ Configurer l’environnement**  
cp .env.example .env
php artisan key:generate

### **4️⃣ Exécuter les migrations**  
php artisan migrate --seed

### **5️⃣ Lancer le serveur**  
php artisan serve
npm run dev

Accédez maintenant à http://localhost:8000 






