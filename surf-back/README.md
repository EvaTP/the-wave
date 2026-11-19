# 🌊 The Wave - Backend (API)

API REST de l'application **The Wave**, qui gère les spots de surf, les utilisateurs, les rôles, les likes et les commentaires.

← Retour à la [vue d'ensemble du projet](../README.md) · Voir aussi le [frontend](../surf-front/README.md)

## 🚀 Stack

- **Node.js / Express.js** - API REST
- **Prisma** - ORM
- **PostgreSQL** - base de données (hébergée sur Neon)
- **JWT** - authentification
- **bcrypt** - hashage des mots de passe
- **Render** - hébergement de l'API

## 📦 Structure

```
the-wave/
├── surf-back/          # API Express.js
    ├── prisma/         # Schéma, seeds et migrations
    ├── middleware/     # Token, roles, password
    └── routes/         # Routes
```

## 🛠️ Installation

### Prérequis

- Node.js (v18 ou supérieur)
- npm
- Une base PostgreSQL (locale ou Neon)

### Étapes

```bash
cd surf-back
npm install
cp .env.example .env
```

Variables d'environnement attendues dans `.env` :

```env
DATABASE_URL="votre_url_postgresql"
JWT_SECRET="votre_secret_jwt"
```

Créez les tables, puis insérez les données de base :

```bash
npx prisma migrate dev
npm run seed:roles   # crée les rôles : admin, moderator, user, demo
npm run seed:demo    # crée le compte demo (lecture seule)
```

> ⚠️ Lancez `seed:roles` **avant** `seed:demo` : le compte demo a besoin que le rôle `demo` existe.

Démarrez le serveur :

```bash
npm run dev
```

L'API est alors disponible sur `http://localhost:3001`.

## 🗄️ Modèle de données

| Table                      | Rôle                                                           |
| -------------------------- | -------------------------------------------------------------- |
| `Role`                     | Rôles des utilisateurs (admin, moderator, user, demo)          |
| `User`                     | Utilisateurs, liés à un rôle via `role_id`                     |
| `Spot`.                    | Spots de surf (coordonnées, saison, type de vague, dangers...) |
| `Level` / `Spot_level`     | Niveaux de surf et leur association aux spots                  |
| `Comment`                  | Commentaires des utilisateurs sur les spots                    |
| `Like`                     | Likes (un seul par utilisateur et par spot)                    |
| `Hashtag` / `Spot_hashtag` | Hashtags et leur association aux spots                         |

## 🔌 Routes principales

### Spots (`/spots`)

| Méthode | Route                 | Description                                                    |
| ------- | --------------------- | -------------------------------------------------------------- |
| GET     | `/spots`              | Liste complète des spots (niveaux, commentaires, likes)        |
| GET     | `/spots/map`          | Version légère pour la carte (id, nom, pays, lat, lng, niveau) |
| GET     | `/spots/:id`          | Détail d'un spot                                               |
| GET     | `/spots/:id/hashtags` | Hashtags d'un spot                                             |
| GET     | `/spots/:id/comments` | Commentaires d'un spot                                         |
| POST    | `/spots`              | Création d'un spot                                             |
| DELETE  | `/spots/:id`          | Suppression d'un spot                                          |

> 📝 À compléter : routes `/users`, `/auth` (login), `/likes`, `/comments`.

## 🔐 Rôles et permissions

| Rôle        | Description                                       |
| ----------- | ------------------------------------------------- |
| `admin`     | Gestion complète des utilisateurs et du contenu   |
| `moderator` | Modération du contenu                             |
| `user`      | Utilisateur standard                              |
| `demo`      | Compte de démonstration : consultation uniquement |

## ☁️ Déploiement

- API hébergée sur **Render** (plan gratuit : le premier appel peut être lent le temps que le serveur se réveille)
- Base de données hébergée sur **Neon**
- Pensez à définir `DATABASE_URL` et `JWT_SECRET` dans les variables d'environnement de Render
