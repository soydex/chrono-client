---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.

Tout en français, pas de commentaires en anglais.

## Cahier des charges – Projet Chronomètre Capsules Clients

### 1. Objectif du projet

Remplacer le tableau Excel utilisé par l’agence de communication pour le suivi des temps passés sur les projets clients par une application web full stack.

---

### 2. Fonctionnalités principales

#### Employés

* Authentification sécurisée
* Lancement d’un chronomètre pour un client donné
* Ajout manuel d’un temps oublié
* Création de fiche client (nom, entreprise, mail, téléphone)
* Auto-complétion dans le champ client avec possibilité de création à la volée
* Historique des temps par client/employé

#### Clients (accès externe)

* Page web publique avec tableau récapitulatif des temps passés par l’agence sur leurs capsules digitales

#### Administrateurs (optionnel, bonus)

* Tableau de bord avec statistiques (temps par client, par employé, par période)
* Gestion des utilisateurs (création, suppression, rôles)

---

### 3. Technologies proposées

#### Frontend

* React.js
* Tailwind CSS
* react-router-dom
* react-hook-form + zod (ou yup)
* react-select / @headlessui/react (auto-complétion)
* recharts ou chart.js (statistiques)
* react-hot-toast (notifications)

#### Backend

* Node.js
* Express.js
* MongoDB (avec Mongoose)
* JWT + bcryptjs pour l’authentification
* CORS, dotenv, cookie-parser

#### Déploiement

* Frontend : Vercel / Netlify
* Backend : Render / Railway / VPS
* Base de données : MongoDB Atlas
* CI/CD : GitHub Actions

---

### 4. Structure des données (MongoDB)

```js
users: {
  _id,
  name,
  email,
  passwordHash,
  role: 'admin' | 'employee',
}

clients: {
  _id,
  name,
  company,
  email,
  phone,
  createdByUserId
}

times: {
  _id,
  userId,
  clientId,
  startTime,
  endTime,
  durationMs,
  manual: boolean,
  note: string
}
```

---

### 5. Plan chronologique de développement

#### **Phase 1 – Préparation (1 jour)**

* Configuration des environnements (GitHub, Vite, Express, MongoDB Atlas)
* Initialisation des dépôts (client + server)
* Planification sur Trello ou Notion

#### **Phase 2 – Authentification (2-3 jours)** ✅ **(Terminée)**

* Backend : routes login/register, JWT, hash des mots de passe ✅
* Frontend : pages Login/Register, gestion des tokens, redirection ✅

#### **Phase 3 – Gestion des clients (2 jours)**

* CRUD client côté backend
* Formulaire de création client
* Auto-complétion client avec création à la volée

#### **Phase 4 – Chronomètre (3-4 jours)** \[supprimée]

#### **Phase 5 – Interface client (1-2 jours)**

* Page publique avec récapitulatif des temps
* Filtrage / tri par capsule ou date

#### **Phase 6 – Tableau de bord admin (bonus, 2 jours)**

* Statistiques par client/employé/période
* Graphiques (recharts)

#### **Phase 7 – Finitions (2 jours)**

* Notifications (toasts)
* Responsive design
* Sécurité (middleware auth, vérifications des rôles)
* Tests unitaires (bonus)

#### **Phase 8 – Déploiement (1 jour)**

* Mise en production du front et du back
* Connexion avec MongoDB Atlas
* Configuration de domaines (si besoin)

---

### 6. Estimation de temps total

**En travaillant seul, de manière concentrée :**

* **Minimum** : \~12 jours intensifs (8h/jour)
* **Réaliste avec aléas** : **3 à 4 semaines** à raison de 2 à 4h par jour

---

### 7. Améliorations futures possibles

* PWA pour une utilisation mobile
* Notifications e-mail pour les clients
* Export PDF ou Excel des temps
* Système de permissions avancées (gestion par équipe, tags projets, etc.)
* Suivi des tâches (par capsule)

---

Si tu veux, je peux t’aider à créer un Trello pré-rempli, te faire une maquette Figma, ou te générer un squelette de projet React/Express dès maintenant.
