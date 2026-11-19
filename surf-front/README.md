# 🌊 The Wave - Front-end

<p align="center">
<img src="../the-wave.png" alt="visuel du site" width="400" height="280">
</p>

Application web **Next.js** de The Wave : carte interactive des spots de surf, authentification et panel d'administration.

← Retour à la [vue d'ensemble du projet](../README.md) · Voir aussi le [backend](../surf-back/README.md)

## 🧰 Stack technique

- **Next.js** (App Router) et **React**
- **Tailwind CSS**
- **React Leaflet** pour les cartes
- Déploiement sur **Vercel**
- **Carte interactive** : React Leaflet
- **Authentification** : JWT côté client (`localStorage`)

## ✨ Fonctionnalités

- Carte interactive des spots (React Leaflet) avec loader de chargement
- Inscription et connexion (JWT)
- Panel d'administration : liste des membres, création, modification, suppression
- Compte **demo** en lecture seule, avec bannière explicative
- Design responsive

## 📦 Structure

```
the-wave/
	├── surf-front/
        ├── public/            # Assets statiques (icônes, images)
        └── src/
            ├── app/           # Pages et routing (App Router)
            ├── components/    # Composants réutilisables (UserForm, SpotsMap, DemoBanner...)
            ├── lib/           # Configuration de l'API et fonctions de fetch
            └── utils/         # Hooks personnalisés (useAuth, usePermissions)
```

## 🔐 Authentification et permissions

Le système d'authentification permet :

- Inscription de nouveaux utilisateurs
- Connexion sécurisée avec JWT
- Vérification des mots de passe avec bcrypt
- Gestion des rôles (admin, modérateur, utilisateur, demo)
- Accès au panel admin pour les utilisateurs autorisés (admin et mode "demo")

- Le token JWT et les informations utilisateur sont conservés dans le `localStorage`
- Le hook **`useAuth`** expose l'utilisateur connecté et son état de connexion
- Le hook **`usePermissions`** déduit les droits à partir du rôle (admin, moderator, user, demo)
- Le composant **`DemoBanner`** s'affiche uniquement pour le compte demo
- Le formulaire **`UserForm`** sert à la fois à la création (`mode="create"`) et à la modification (`mode="edit"`) d'un utilisateur

## 🛠️ Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm
- L'API [surf-back](../surf-back/README.md) démarrée

### Étapes

```bash
cd surf-front
npm install
cp .env.example .env.local
```

Variable d'environnement attendue dans `.env.local` :

```env
NEXT_PUBLIC_API_URL="http://localhost:3001"
```

Démarrez l'application :

```bash
npm run dev
```

Ouvrir dans le navigateur pour afficher le résultat :
Ouvrez [http://localhost:3000](http://localhost:3000).

### Autres commandes

```bash
npm run build   # build de production
npm run start   # lance le build de production
npm run lint    # vérifie le code avec ESLint (next lint)
```

## 🎨 Crédits

- Images : [Unsplash](https://unsplash.com/fr/images/stock/royalty-free)
- Icônes : [Lucide](https://lucide.dev/icons/)
- Wireframes et logo : Canva
