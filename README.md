# 🚀 C2P Platform - Plateforme d'Apprentissage Développeur

[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Prisma](https://img.shields.io/badge/Prisma-6.15-2D3748?style=for-the-badge&logo=prisma)](https://www.prisma.io/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![React](https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react)](https://reactjs.org/)

> **C2P Platform** est une plateforme d'apprentissage en ligne révolutionnaire conçue pour les développeurs de tous niveaux. Elle combine formation structurée, communauté active, gamification et un éditeur de code interactif pour créer une expérience d'apprentissage immersive et engageante.

## ✨ **Fonctionnalités Principales**

### 🎓 **Formations & Cours**
- **Cours structurés** par technologie (Python, JavaScript, React, etc.)
- **Leçons progressives** avec contenu multimédia
- **Suivi de progression** détaillé
- **Niveaux d'apprentissage** : Débutant → Expert

### 👥 **Communauté & Forum**
- **Forum par catégorie** technologique
- **Système de votes** et réponses threadées
- **Modération** et gestion des contenus
- **Partage de connaissances** entre pairs

### 🏆 **Gamification & Badges**
- **Système de badges** avec rareté (Commun → Légendaire)
- **Points d'expérience** et classements
- **Défis** et objectifs d'apprentissage
- **Portfolio de projets** public

### 💻 **Éditeur de Code Interactif**
- **Sandbox HTML/CSS** avec aperçu en temps réel
- **Objectifs d'apprentissage** progressifs
- **Auto-complétion** et formatage automatique
- **Mode focus** pour une concentration optimale
- **Système de badges** pour les accomplissements

### 📱 **Interface Moderne**
- **Design responsive** optimisé mobile/desktop
- **Thème sombre/clair** automatique
- **Navigation intuitive** et accessible
- **Performance optimisée** avec Next.js 15
- **Architecture modulaire** pour une maintenabilité maximale

## 🛠 **Stack Technique**

| Composant | Technologie | Version |
|-----------|-------------|---------|
| **Frontend** | Next.js | 15.x |
| **Language** | TypeScript | 5.x |
| **React** | React | 19.x |
| **Styling** | Tailwind CSS | 3.3.x |
| **Base de données** | PostgreSQL | via Neon |
| **ORM** | Prisma | 6.15.x |
| **Authentification** | NextAuth.js | 4.x |
| **UI Components** | Radix UI + shadcn/ui | Latest |
| **Gestion d'état** | TanStack Query + Zustand | 5.x |
| **Validation** | React Hook Form + Zod | Latest |
| **Canvas** | HTML5 Canvas API | Native |

## 🚀 **Installation & Démarrage**

### **Prérequis**
- Node.js 18+ 
- npm, yarn, pnpm ou bun
- Base de données PostgreSQL
- Compte GitHub (pour l'authentification)

### **1. Cloner le projet**
```bash
git clone <votre-repo>
cd c2p-platform
```

### **2. Installer les dépendances**
```bash
npm install
# ou
yarn install
# ou
pnpm install
```

### **3. Configuration de l'environnement**
Créez un fichier `.env.local` à la racine du projet :

```env
# Base de données
DATABASE_URL="postgresql://user:password@localhost:5432/c2p_platform"

# NextAuth.js
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"

# Fournisseurs d'authentification (optionnel)
GITHUB_ID="votre-github-client-id"
GITHUB_SECRET="votre-github-client-secret"

# Variables d'environnement supplémentaires
NODE_ENV="development"
```

### **4. Configuration de la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer les migrations
npx prisma db push

# (Optionnel) Ouvrir Prisma Studio
npx prisma studio
```

### **5. Lancer le serveur de développement**
```bash
npm run dev
# ou
yarn dev
# ou
pnpm dev
```

Ouvrez [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 **Structure du Projet**

```
c2p-platform/
├── 📁 src/
│   ├── 📁 app/                 # App Router Next.js 15
│   │   ├── 📁 api/            # Routes API
│   │   ├── 📁 auth/           # Pages d'authentification
│   │   ├── 📁 courses/        # Pages des cours
│   │   ├── 📁 forum/          # Pages du forum
│   │   ├── 📁 profile/        # Profil utilisateur
│   │   └── 📁 dashboard/      # Tableau de bord
│   ├── 📁 components/         # Composants réutilisables
│   │   ├── 📁 sections/       # Composants de sections
│   │   │   ├── CapsuleInitiation.tsx
│   │   │   ├── AnneauCommunaute.tsx
│   │   │   ├── SandboxLive.tsx
│   │   │   └── ForgeBadge.tsx
│   │   ├── 📁 ui/             # Composants UI
│   │   │   ├── CTAHologramme.tsx
│   │   │   ├── TypographieDynamique.tsx
│   │   │   ├── LoadingSpinner.tsx
│   │   │   └── Skeleton.tsx
│   │   └── 📁 canvas/         # Composants Canvas
│   │       ├── PulseActivite.tsx
│   │       └── CanvasInteractif.tsx
│   ├── 📁 hooks/              # Hooks personnalisés
│   │   ├── useEditor.ts       # Hook pour l'éditeur
│   │   └── useAuth.tsx        # Hook d'authentification
│   ├── 📁 lib/                # Utilitaires et configurations
│   └── 📁 types/              # Types TypeScript
├── 📁 prisma/
│   └── schema.prisma          # Schéma de base de données
├── 📁 public/                 # Assets statiques
├── 📁 docs/                   # Documentation
└── 📁 .github/                # GitHub Actions (si applicable)
```

## 🗄️ **Modèles de Données**

### **Utilisateurs & Authentification**
- `User` : Profils utilisateurs avec rôles
- `Account` : Comptes d'authentification
- `Session` : Sessions utilisateur

### **Formations**
- `Course` : Cours avec métadonnées
- `Lesson` : Leçons individuelles
- `CourseProgress` : Suivi de progression

### **Communauté**
- `ForumCategory` : Catégories du forum
- `ForumTopic` : Sujets de discussion
- `ForumReply` : Réponses et commentaires

### **Gamification**
- `Badge` : Badges et récompenses
- `UserBadge` : Attribution des badges
- `Project` : Portfolio de projets

## 🔧 **Scripts Disponibles**

```bash
# Développement
npm run dev          # Serveur de développement avec Turbopack
npm run build        # Build de production
npm run start        # Serveur de production
npm run lint         # Vérification ESLint

# Base de données
npx prisma generate  # Générer le client Prisma
npx prisma db push   # Appliquer le schéma
npx prisma studio    # Interface d'administration
npx prisma migrate dev # Créer et appliquer des migrations

# Tests (à implémenter)
npm run test         # Tests unitaires
npm run test:e2e     # Tests end-to-end
```

## 🌐 **Déploiement**

### **Vercel (Recommandé)**
```bash
npm run build
vercel --prod
```

### **Autres plateformes**
- **Netlify** : Compatible Next.js
- **Railway** : Déploiement simple
- **Docker** : Containerisation possible

## 🤝 **Contribution**

1. **Fork** le projet
2. **Créez** une branche feature (`git checkout -b feature/AmazingFeature`)
3. **Commitez** vos changements (`git commit -m 'Add AmazingFeature'`)
4. **Poussez** vers la branche (`git push origin feature/AmazingFeature`)
5. **Ouvrez** une Pull Request

## 📝 **Roadmap**

### **Phase 1 - MVP** ✅
- [x] Authentification utilisateur
- [x] Gestion des cours et leçons
- [x] Forum communautaire basique
- [x] Interface utilisateur responsive
- [x] Architecture modulaire refactorisée
- [x] Éditeur de code interactif
- [x] Système de badges basique

### **Phase 2 - Fonctionnalités Avancées** 🚧
- [x] Éditeur HTML/CSS avec aperçu temps réel
- [x] Objectifs d'apprentissage progressifs
- [x] Composants Canvas interactifs
- [ ] Système de badges complet
- [ ] Notifications en temps réel
- [ ] API mobile

### **Phase 3 - Écosystème** 📋
- [ ] Marketplace de cours
- [ ] Système de mentorat
- [ ] Intégrations tierces
- [ ] Analytics avancés
- [ ] Tests unitaires et E2E
- [ ] PWA (Progressive Web App)

## 🐛 **Dépannage**

### **Problèmes courants**

**Erreur de base de données**
```bash
# Vérifier la connexion
npx prisma db push

# Réinitialiser la base
npx prisma migrate reset
```

**Erreur de build**
```bash
# Nettoyer le cache
rm -rf .next
npm run build
```

**Problèmes d'authentification**
- Vérifier les variables d'environnement NextAuth
- Contrôler les URLs de redirection

## 📞 **Support**

- **Issues** : [GitHub Issues](votre-repo/issues)
- **Discussions** : [GitHub Discussions](votre-repo/discussions)
- **Email** : support@c2p-platform.com

## 📄 **Licence**

Ce projet est sous licence MIT. Voir le fichier [LICENSE](LICENSE) pour plus de détails.

---

**Développé avec ❤️ par l'équipe C2P Platform**

*Une plateforme d'apprentissage moderne pour les développeurs de demain*
