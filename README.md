# C2P Platform - Code Premier Pas

> **La plateforme communautaire qui forme et inspire les développeurs de demain en Afrique francophone**

[![Next.js](https://img.shields.io/badge/Next.js-14+-black?style=flat&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5+-blue?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3+-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![Prisma](https://img.shields.io/badge/Prisma-5+-2D3748?style=flat&logo=prisma)](https://www.prisma.io/)

---

## À Propos du Projet

**Nom du projet** : `c2p-platform`  
**Version** : 1.0.0  
**Description** : Plateforme éducative communautaire pour développeurs débutants  
**Public** : Développeurs africains francophones  
**Technologies** : Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS  

### Mission
Connecter, former et accompagner plus de 2500+ développeurs à travers l'Afrique francophone via une plateforme moderne intégrant formations, forum, coding en direct & replay et gestion de projets.

---

## 🏗️ Structure du Projet

```
c2p-platform/
├── 📁 src/
│   ├── 📁 app/                    # App Router Next.js 14+
│   │   ├── 📁 (auth)/            # Routes d'authentification
│   │   ├── 📁 (dashboard)/       # Dashboard utilisateur
│   │   ├── 📁 (admin)/           # Interface admin
│   │   ├── 📁 api/               # API Routes
│   │   ├── 📁 formations/        # Pages formations
│   │   ├── 📁 forum/             # Forum communautaire
│   │   ├── 📁 replay/            # Bibliothèque vidéos
│   │   ├── 📁 projets/           # Projets étudiants
│   │   ├── layout.tsx            # Layout principal
│   │   └── page.tsx              # Page d'accueil
│   ├── 📁 components/            # Composants React réutilisables
│   │   ├── 📁 ui/                # Design System (shadcn/ui)
│   │   ├── 📁 forms/             # Formulaires
│   │   ├── 📁 layout/            # Composants layout
│   │   └── 📁 features/          # Composants métier
│   ├── 📁 lib/                   # Utilitaires et configurations
│   │   ├── auth.ts               # Configuration NextAuth.js
│   │   ├── db.ts                 # Client Prisma
│   │   ├── utils.ts              # Fonctions utilitaires
│   │   └── validations.ts        # Schémas Zod
│   ├── 📁 styles/                # Styles globaux
│   │   └── globals.css           # CSS Tailwind + custom
│   └── 📁 types/                 # Types TypeScript
├── 📁 prisma/                    # Configuration base de données
│   ├── schema.prisma             # Modèles de données
│   ├── seed.ts                   # Données initiales
│   └── 📁 migrations/            # Migrations DB
├── 📁 public/                    # Assets statiques
│   ├── 📁 images/                # Images et logos
│   ├── 📁 videos/                # Vidéos de démonstration
│   └── favicon.ico               # Favicon
├── 📁 docs/                      # Documentation projet
├── .env.local                    # Variables d'environnement
├── package.json                  # Dépendances Node.js
├── tailwind.config.js            # Configuration Tailwind
├── next.config.js                # Configuration Next.js
└── README.md                     # Ce fichier
```

---

## Installation & Démarrage Rapide

### Prérequis
- **Node.js** 18+ ([Télécharger](https://nodejs.org/))
- **npm** ou **yarn** 
- **PostgreSQL** 15+ ([Installation locale](https://www.postgresql.org/) ou [Neon.db](https://neon.tech/))
- **Git** ([Télécharger](https://git-scm.com/))

### Installation

1. **Cloner le repository**
```bash
git clone https://github.com/Paskod121/c2p-platform.git
cd c2p-platform
```

2. **Installer les dépendances**
```bash
npm install
# ou
yarn install
```

3. **Configuration environnement**
```bash
cp .env.example .env.local
```

Modifier `.env.local` avec vos configurations :
```env
# Base de données
DATABASE_URL="postgresql://username:password@localhost:5432/c2p_db"

# NextAuth.js
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key-here"

# OAuth Providers
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
GITHUB_CLIENT_ID="your-github-client-id"
GITHUB_CLIENT_SECRET="your-github-client-secret"

# Upload Files
CLOUDINARY_URL="cloudinary://api_key:api_secret@cloud_name"

# Email (optionnel)
EMAIL_SERVER_HOST="smtp.gmail.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@gmail.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@c2p-platform.com"
```

4. **Configuration base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Exécuter les migrations
npx prisma db push

# Populer avec des données de test
npx prisma db seed
```

5. **Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
```

 **Votre plateforme C2P est accessible sur [http://localhost:3000](http://localhost:3000)**

---

## Scripts Disponibles

```bash
# Développement
npm run dev          # Serveur de développement
npm run build        # Build production
npm run start        # Serveur production
npm run lint         # ESLint check
npm run type-check   # TypeScript check

# Base de données
npm run db:migrate   # Nouvelles migrations
npm run db:seed      # Populer la DB
npm run db:studio    # Interface Prisma Studio
npm run db:reset     # Reset complet DB

# Tests (à venir)
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
```

---

## Stack Technique

### Frontend
- **[Next.js 14+](https://nextjs.org/)** - Framework React avec App Router
- **[TypeScript](https://www.typescriptlang.org/)** - Typage statique
- **[Tailwind CSS](https://tailwindcss.com/)** - Framework CSS utility-first
- **[Shadcn/ui](https://ui.shadcn.com/)** - Composants UI modernes
- **[Framer Motion](https://www.framer.com/motion/)** - Animations fluides
- **[Lucide React](https://lucide.dev/)** - Icônes cohérentes

### Backend & API
- **[Next.js API Routes](https://nextjs.org/docs/api-routes/introduction)** - API intégrée
- **[tRPC](https://trpc.io/)** - APIs type-safe (optionnel)
- **[NextAuth.js](https://next-auth.js.org/)** - Authentification
- **[Prisma](https://www.prisma.io/)** - ORM moderne
- **[PostgreSQL](https://www.postgresql.org/)** - Base de données

### Outils de Développement
- **[ESLint](https://eslint.org/)** + **[Prettier](https://prettier.io/)** - Qualité code
- **[Husky](https://github.com/typicode/husky)** - Git hooks
- **[Commitizen](https://commitizen-tools.github.io/commitizen/)** - Commits conventionnels

---

##  Fonctionnalités Principales

### Version Actuelle (MVP)
- [x] **Authentification** - Google, GitHub, Email
- [x] **Profils utilisateurs** - Pays, niveau, technologies
- [x] **Catalogue formations** - Python, JavaScript, Git, etc.
- [x] **Système progression** - Badges, certificats
- [x] **Mode sombre/clair** - Interface adaptative

### En Développement
- [ ] **Forum communautaire** - Topics, réponses, votes
- [ ] **Bibliothèque replay** - Workshops, sessions live
- [ ] **Projets étudiants** - Portfolio, collaboration
- [ ] **Notifications temps réel** - WebSockets
- [ ] **Interface admin** - Gestion contenu

### Roadmap Future
- [ ] **Application mobile** - React Native
- [ ] **IDE intégré** - Monaco Editor
- [ ] **API publique** - Intégrations tierces
- [ ] **Analytics avancées** - Dashboard metrics
- [ ] **Internationalisation** - Multi-langues

---

## Déploiement

### Développement Local
Le projet est configuré pour fonctionner immédiatement avec :
- Base de données PostgreSQL locale ou distante
- Variables d'environnement en `.env.local`
- Hot reload automatique

### Production

**Frontend** : [Vercel](https://vercel.com/) (intégration automatique GitHub)
```bash
# Déploiement automatique via Git
git push origin main
```

**Base de données** : [PlanetScale](https://planetscale.com/) ou [Neon.db](https://neon.tech/)
```bash
# Configuration DB production dans Vercel
# Variables d'environnement via dashboard Vercel
```

**Domaine personnalisé** : Configuration via Vercel Dashboard

---

## Contribution

### Comment Contribuer ?

1. **Fork** le repository
2. **Créer** une branche feature (`git checkout -b feature/nouvelle-fonctionnalite`)
3. **Commit** vos changements (`git commit -m 'feat: ajouter nouvelle fonctionnalité'`)
4. **Push** vers la branche (`git push origin feature/nouvelle-fonctionnalite`)
5. **Ouvrir** une Pull Request

### Standards de Code
- **ESLint** + **Prettier** configurés
- **Commits conventionnels** (feat, fix, docs, etc.)
- **Tests** requis pour nouvelles fonctionnalités
- **TypeScript** strict mode activé

### Issues & Bugs
Utilisez les [GitHub Issues](https://github.com/c2p-africa/c2p-platform/issues) avec les labels :
- `bug` - Bugs et erreurs
- `feature` - Nouvelles fonctionnalités  
- `documentation` - Améliorations docs
- `design` - Améliorations UX/UI

---

## 📞 Support & Contact

### Équipe C2P
- **Fondateur** : [] - founder@c2p-platform.com
- **Lead Developer** : [] - dev@c2p-platform.com
- **Community Manager** : [] - community@c2p-platform.com

### Communauté
- **Discord** : [Lien Discord C2P]()
- **Whatsapp** : [C2P Africa]()
- **LinkedIn** : [Code Premier Pas]()
- **GitHub** : [C2P Organization]()

---

## 📄 Licence & Légal

**Licence** : MIT License  
**Copyright** : © 2025 Code Premier Pas (C2P)  
**RGPD** : Conformité complète pour utilisateurs européens  

### Crédits
- **Design inspiration** : Git Zérooo, Linear, Vercel
- **Icons** : Lucide React
- **Fonts** : Inter (Google Fonts)

---

## Remerciements

Merci à tous les contributeurs qui font de C2P une plateforme exceptionnelle pour la communauté dev africaine francophone !

**Together, we code. Together, we grow.**

---

*Dernière mise à jour : Août 2025*  
*Version README : 1.0.0*