# Structure du Projet Chrono Capsules

## Configuration du Projet
- `vite.config.js` : Configuration de Vite avec React et Tailwind CSS
- `package.json` : Dépendances et scripts du projet
- `eslint.config.js` : Configuration ESLint pour le linting
- `.gitignore` : Fichiers et dossiers ignorés par Git
- `index.html` : Point d'entrée HTML de l'application

## Source (src/)

### Composants de Base
- `src/App.jsx` : Composant racine avec la configuration des routes
- `src/main.jsx` : Point d'entrée JavaScript de l'application
- `src/index.css` : Styles globaux et configuration Tailwind

### Pages
- `src/pages/Login.jsx` : Page de connexion utilisateur
- `src/pages/Register.jsx` : Page d'inscription utilisateur
- `src/pages/TestClientAutocomplete.jsx` : Page de test pour l'autocomplétion client

### Composants
- `src/components/ProtectedRoute.jsx` : Composant de protection des routes authentifiées
- `src/components/ClientAutocomplete.jsx` : Composant d'autocomplétion pour la recherche de clients

### Contexte
- `src/context/AuthContext.jsx` : Gestion de l'état d'authentification global

### Utilitaires
- `src/utils/api.jsx` : Fonctions pour les appels API

## Styles
- `src/App.css` : Styles spécifiques à App
- `src/index.css` : Styles globaux avec configuration du fond d'écran

## Documentation
- `README.md` : Documentation générale du projet
- `instructions.md` : Cahier des charges détaillé
- `STRUCTURE.md` : Ce fichier (structure du projet)

## Caractéristiques Principales
- Authentification JWT
- Recherche de clients avec autocomplétion
- Protection des routes
- Interface utilisateur responsive avec Tailwind CSS
- Gestion d'état avec Context API
- Appels API centralisés
