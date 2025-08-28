# 🤝 Guide de Contribution - C2P Platform

## 🎯 **Bienvenue !**

Merci de votre intérêt pour contribuer à **C2P Platform** ! Ce guide vous aidera à comprendre comment participer au développement de la plateforme.

## 📋 **Avant de Commencer**

### **Prérequis**
- Connaissance de **Next.js** et **React**
- Maîtrise de **TypeScript**
- Compréhension de **Prisma** et **PostgreSQL**
- Familiarité avec **Git** et **GitHub**

### **Code de Conduite**
- Respectez tous les membres de la communauté
- Soyez ouvert aux suggestions et critiques constructives
- Restez professionnel dans vos interactions
- Signalez tout comportement inapproprié

## 🚀 **Premiers Pas**

### **1. Fork et Clone**
```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/votre-username/c2p-platform.git
cd c2p-platform

# Ajoutez le repository original comme upstream
git remote add upstream https://github.com/original-owner/c2p-platform.git
```

### **2. Configuration de l'Environnement**
```bash
# Installer les dépendances
npm install

# Copier le fichier d'environnement
cp .env.example .env.local

# Configurer vos variables d'environnement
# Voir SETUP.md pour plus de détails

# Générer le client Prisma
npx prisma generate

# Appliquer le schéma de base
npx prisma db push
```

### **3. Vérification de l'Installation**
```bash
# Lancer le serveur de développement
npm run dev

# Vérifier que tout fonctionne
# Ouvrir http://localhost:3000
```

## 🔄 **Workflow de Contribution**

### **1. Créer une Branche**
```bash
# Mettre à jour votre fork
git fetch upstream
git checkout main
git merge upstream/main

# Créer une nouvelle branche pour votre feature
git checkout -b feature/nom-de-votre-feature
# ou pour un bug fix
git checkout -b fix/nom-du-bug
```

### **2. Développer**
- **Écrire du code** en suivant les conventions
- **Tester** vos modifications
- **Documenter** les nouvelles fonctionnalités
- **Mettre à jour** les tests si nécessaire

### **3. Commiter**
```bash
# Ajouter vos modifications
git add .

# Créer un commit descriptif
git commit -m "feat: ajouter la fonctionnalité X

- Description détaillée des changements
- Impact sur l'utilisateur
- Tests effectués"
```

### **4. Pousser et Créer une PR**
```bash
# Pousser votre branche
git push origin feature/nom-de-votre-feature

# Créer une Pull Request sur GitHub
# Remplir le template de PR
```

## 📝 **Conventions de Code**

### **TypeScript**
```typescript
// Utiliser des types explicites
interface User {
  id: string;
  name: string;
  email: string;
}

// Éviter any, utiliser unknown si nécessaire
function processData(data: unknown): User {
  // Validation des données
  if (!isValidUser(data)) {
    throw new Error('Invalid user data');
  }
  return data;
}

// Utiliser les génériques quand approprié
function createApiResponse<T>(data: T): ApiResponse<T> {
  return { success: true, data };
}
```

### **React Components**
```typescript
// Composants fonctionnels avec TypeScript
interface ButtonProps {
  variant?: 'primary' | 'secondary';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  onClick?: () => void;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  onClick
}) => {
  return (
    <button
      className={`btn btn-${variant} btn-${size}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
```

### **Nommage**
```typescript
// Variables et fonctions : camelCase
const userName = 'John';
const getUserById = (id: string) => { /* ... */ };

// Constantes : UPPER_SNAKE_CASE
const API_BASE_URL = 'https://api.c2p-platform.com';
const MAX_RETRY_ATTEMPTS = 3;

// Types et interfaces : PascalCase
interface UserProfile { /* ... */ }
type ApiResponse<T> = { /* ... */ };

// Fichiers : kebab-case
// user-profile.tsx
// api-client.ts
// utils.ts
```

### **Structure des Dossiers**
```
src/
├── app/                    # App Router Next.js
├── components/            # Composants réutilisables
│   ├── ui/               # Composants UI de base
│   ├── forms/            # Composants de formulaires
│   └── layout/           # Composants de mise en page
├── lib/                  # Utilitaires et configurations
├── types/                # Types TypeScript
├── hooks/                # Hooks React personnalisés
└── utils/                # Fonctions utilitaires
```

## 🧪 **Tests**

### **Tests Unitaires**
```bash
# Lancer les tests
npm run test

# Lancer les tests en mode watch
npm run test:watch

# Couverture de code
npm run test:coverage
```

### **Tests E2E**
```bash
# Lancer les tests end-to-end
npm run test:e2e

# Tests spécifiques
npm run test:e2e:auth
npm run test:e2e:courses
```

### **Tests de Type**
```bash
# Vérifier les types TypeScript
npm run type-check
```

## 📚 **Documentation**

### **Commentaires de Code**
```typescript
/**
 * Calcule le score de progression d'un utilisateur
 * @param completedLessons - Nombre de leçons terminées
 * @param totalLessons - Nombre total de leçons
 * @returns Score en pourcentage (0-100)
 */
function calculateProgress(completedLessons: number, totalLessons: number): number {
  if (totalLessons === 0) return 0;
  return Math.round((completedLessons / totalLessons) * 100);
}
```

### **Documentation des Composants**
```typescript
/**
 * Composant de carte de cours
 * 
 * @example
 * ```tsx
 * <CourseCard
 *   course={courseData}
 *   onEnroll={() => handleEnroll(courseData.id)}
 * />
 * ```
 */
export const CourseCard: React.FC<CourseCardProps> = ({ course, onEnroll }) => {
  // ... implementation
};
```

## 🔍 **Code Review**

### **Avant de Soumettre**
- [ ] **Tests** passent localement
- [ ] **Linting** sans erreurs (`npm run lint`)
- [ ] **Types** vérifiés (`npm run type-check`)
- [ ] **Build** réussi (`npm run build`)
- [ ] **Documentation** mise à jour

### **Template de Pull Request**
```markdown
## 📝 Description
Description claire et concise des changements

## 🔗 Issue liée
Fixes #123

## 🧪 Tests
- [ ] Tests unitaires passent
- [ ] Tests E2E passent
- [ ] Testé manuellement sur [navigateur]

## 📱 Responsive
- [ ] Testé sur desktop
- [ ] Testé sur mobile
- [ ] Testé sur tablette

## 📸 Captures d'écran
Si applicable, ajoutez des captures d'écran

## ✅ Checklist
- [ ] Code respecte les conventions
- [ ] Documentation mise à jour
- [ ] Pas de console.log oubliés
- [ ] Variables d'environnement documentées
```

## 🐛 **Signalement de Bugs**

### **Template de Bug Report**
```markdown
## 🐛 Description du Bug
Description claire et concise du bug

## 🔄 Étapes pour Reproduire
1. Aller sur '...'
2. Cliquer sur '...'
3. Faire défiler jusqu'à '...'
4. Voir l'erreur

## ✅ Comportement Attendu
Ce qui devrait se passer

## ❌ Comportement Actuel
Ce qui se passe actuellement

## 📱 Environnement
- OS: [ex: Windows 10, macOS 12.0]
- Navigateur: [ex: Chrome 120, Firefox 119]
- Version: [ex: 1.2.3]

## 📸 Captures d'écran
Si applicable, ajoutez des captures d'écran

## 📋 Informations Supplémentaires
Toute autre information pertinente
```

## 💡 **Suggestions de Fonctionnalités**

### **Template de Feature Request**
```markdown
## 🚀 Description de la Fonctionnalité
Description claire et concise de la fonctionnalité souhaitée

## 🎯 Problème Résolu
Explication du problème que cette fonctionnalité résoudrait

## 💭 Solution Proposée
Description de la solution souhaitée

## 🔄 Alternatives Considérées
Autres solutions que vous avez considérées

## 📱 Impact Utilisateur
Comment cette fonctionnalité améliorerait l'expérience utilisateur

## 🎨 Mockups/Designs
Si applicable, ajoutez des mockups ou designs
```

## 🏷️ **Labels et Milestones**

### **Labels Utilisés**
- `bug` : Problème à corriger
- `enhancement` : Amélioration de fonctionnalité
- `feature` : Nouvelle fonctionnalité
- `documentation` : Amélioration de la documentation
- `good first issue` : Idéal pour les débutants
- `help wanted` : Besoin d'aide
- `priority: high` : Priorité élevée
- `priority: low` : Priorité basse

### **Milestones**
- `v1.0.0` : Version stable
- `v1.1.0` : Prochaine version mineure
- `v2.0.0` : Version majeure

## 🎉 **Reconnaissance**

### **Contributeurs**
- Votre nom sera ajouté au fichier `CONTRIBUTORS.md`
- Mention dans les notes de version
- Badge de contributeur sur votre profil GitHub

### **Contributeurs Réguliers**
- Accès au repository principal
- Participation aux décisions de développement
- Invitation aux événements de la communauté

## 🆘 **Besoin d'Aide ?**

### **Ressources**
- **Documentation** : README.md, SETUP.md
- **Issues** : Consultez les issues existantes
- **Discussions** : Utilisez GitHub Discussions
- **Discord** : Rejoignez notre serveur Discord

### **Contact**
- **Email** : dev@c2p-platform.com
- **GitHub** : Créez une issue ou discussion
- **Discord** : #help channel

---

## 🚀 **Prêt à Contribuer ?**

1. **Choisissez** une issue à travailler
2. **Forkez** le repository
3. **Créez** une branche
4. **Développez** votre solution
5. **Testez** vos modifications
6. **Soumettez** une Pull Request

**Merci de contribuer à C2P Platform ! 🎉**
