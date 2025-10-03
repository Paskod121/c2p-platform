# 📝 Changelog - C2P Platform

Toutes les modifications notables de ce projet seront documentées dans ce fichier.

Le format est basé sur [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/),
et ce projet adhère au [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added
- Architecture modulaire avec composants séparés
- Hook personnalisé `useEditor` pour la gestion de l'état de l'éditeur
- Composants Canvas interactifs (`PulseActivite`, `CanvasInteractif`)
- Composants UI réutilisables (`LoadingSpinner`, `Skeleton`)
- Système de badges avec drag & drop
- Éditeur HTML/CSS avec aperçu en temps réel
- Objectifs d'apprentissage progressifs
- Mode focus pour l'éditeur de code

### Changed
- Refactoring complet de l'architecture frontend
- Amélioration des performances avec code splitting
- Optimisation des imports et exports
- Mise à jour vers Next.js 15 et React 19

### Fixed
- Problèmes de cursor dans l'éditeur HTML
- Alignement des éléments après Ctrl+A
- Gestion des événements clavier améliorée
- Corrections d'accessibilité mineures

## [1.0.0] - 2024-10-03

### Added
- 🎉 **Version initiale** de C2P Platform
- Authentification utilisateur avec NextAuth.js
- Système de cours et leçons structuré
- Forum communautaire avec catégories
- Interface utilisateur responsive
- Thème sombre/clair automatique
- Base de données PostgreSQL avec Prisma
- API REST complète
- Dashboard utilisateur
- Système de progression des cours
- Gestion des badges et récompenses

### Features Principales
- **Formations** : Cours structurés par technologie
- **Communauté** : Forum avec système de votes
- **Gamification** : Badges et système de points
- **Interface** : Design moderne et responsive
- **Performance** : Optimisé avec Next.js 14

### Stack Technique
- **Frontend** : Next.js 14, React 18, TypeScript 5
- **Styling** : Tailwind CSS 3.3
- **Base de données** : PostgreSQL, Prisma 6.15
- **Authentification** : NextAuth.js 4
- **UI** : Radix UI, shadcn/ui
- **État** : TanStack Query, React Hook Form
- **Validation** : Zod

## [0.9.0] - 2024-09-15

### Added
- Architecture de base du projet
- Configuration Next.js avec TypeScript
- Schéma de base de données Prisma
- Composants UI de base
- Système d'authentification basique

### Changed
- Configuration initiale du projet
- Structure des dossiers

## [0.8.0] - 2024-09-01

### Added
- Conception initiale de l'architecture
- Recherche des technologies appropriées
- Planification des fonctionnalités

---

## Légende

- **Added** : Nouvelles fonctionnalités
- **Changed** : Changements dans les fonctionnalités existantes
- **Deprecated** : Fonctionnalités qui seront supprimées
- **Removed** : Fonctionnalités supprimées
- **Fixed** : Corrections de bugs
- **Security** : Améliorations de sécurité

## Types de Changements

- **Major** : Changements incompatibles avec l'API
- **Minor** : Nouvelles fonctionnalités compatibles
- **Patch** : Corrections de bugs compatibles

---

**Note** : Ce changelog suit le format [Keep a Changelog](https://keepachangelog.com/fr/1.0.0/) et utilise [Semantic Versioning](https://semver.org/spec/v2.0.0.html).
