# 🤝 Guide de Contribution - C2P Platform

Merci de votre intérêt à contribuer à C2P Platform ! Ce guide vous aidera à comprendre notre processus de développement et à contribuer efficacement.

## 📋 **Table des Matières**

- [Code de Conduite](#code-de-conduite)
- [Comment Contribuer](#comment-contribuer)
- [Architecture du Projet](#architecture-du-projet)
- [Standards de Code](#standards-de-code)
- [Processus de Développement](#processus-de-développement)
- [Tests](#tests)
- [Documentation](#documentation)

## 📜 **Code de Conduite**

### Nos Engagements

Nous nous engageons à offrir une expérience de contribution ouverte et accueillante pour tous, indépendamment de l'âge, de la taille, du handicap, de l'ethnicité, de l'identité et de l'expression de genre, du niveau d'expérience, de l'éducation, du statut socio-économique, de la nationalité, de l'apparence personnelle, de la race, de la religion ou de l'orientation sexuelle.

### Comportements Acceptables

- Utiliser un langage accueillant et inclusif
- Respecter les points de vue et expériences différents
- Accepter gracieusement les critiques constructives
- Se concentrer sur ce qui est le mieux pour la communauté
- Faire preuve d'empathie envers les autres membres de la communauté

## 🚀 **Comment Contribuer**

### 1. **Fork et Clone**

```bash
# Fork le repository sur GitHub
# Puis clonez votre fork
git clone https://github.com/VOTRE-USERNAME/c2p-platform.git
cd c2p-platform

# Ajoutez le repository original comme remote
git remote add upstream https://github.com/ORIGINAL-OWNER/c2p-platform.git
```

### 2. **Configuration de l'Environnement**

```bash
# Installez les dépendances
npm install

# Configurez les variables d'environnement
cp .env.example .env.local

# Configurez la base de données
npx prisma generate
npx prisma db push
```

### 3. **Créer une Branche**

```bash
# Créez une branche pour votre feature
git checkout -b feature/nom-de-votre-feature

# Ou pour un bugfix
git checkout -b fix/description-du-bug
```

## 🏗️ **Architecture du Projet**

### **Structure Modulaire**

```
src/
├── components/
│   ├── sections/          # Composants de sections principales
│   ├── ui/               # Composants UI réutilisables
│   └── canvas/           # Composants Canvas interactifs
├── hooks/                # Hooks personnalisés
├── lib/                  # Utilitaires et configurations
└── types/                # Types TypeScript
```

### **Principes Architecturaux**

1. **Séparation des Responsabilités** : Chaque composant a une responsabilité unique
2. **Réutilisabilité** : Les composants UI sont conçus pour être réutilisables
3. **Performance** : Utilisation de `useCallback` et `useMemo` quand nécessaire
4. **Accessibilité** : Respect des standards WCAG 2.1
5. **TypeScript Strict** : Typage strict pour éviter les erreurs

## 📝 **Standards de Code**

### **TypeScript**

```typescript
// ✅ Bon
interface UserProps {
  id: string
  name: string
  email: string
  role: 'admin' | 'user' | 'moderator'
}

// ❌ Éviter
const user: any = { ... }
```

### **React Components**

```typescript
// ✅ Bon - Composant fonctionnel avec TypeScript
interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary'
  onClick?: () => void
  disabled?: boolean
}

export function Button({ 
  children, 
  variant = 'primary', 
  onClick, 
  disabled = false 
}: ButtonProps) {
  return (
    <button
      className={`btn btn-${variant}`}
      onClick={onClick}
      disabled={disabled}
      aria-disabled={disabled}
    >
      {children}
    </button>
  )
}
```

### **CSS/Tailwind**

```tsx
// ✅ Bon - Classes Tailwind organisées
<div className="flex flex-col items-center justify-center gap-4 p-6 bg-white dark:bg-gray-900 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200">
  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
    Titre
  </h2>
  <p className="text-gray-600 dark:text-gray-300">
    Description
  </p>
</div>
```

### **Hooks Personnalisés**

```typescript
// ✅ Bon - Hook avec gestion d'état
export function useEditor(initialValue = '') {
  const [value, setValue] = useState(initialValue)
  const [isLoading, setIsLoading] = useState(false)
  
  const updateValue = useCallback((newValue: string) => {
    setValue(newValue)
    // Logique métier
  }, [])
  
  return {
    value,
    isLoading,
    updateValue
  }
}
```

## 🔄 **Processus de Développement**

### **1. Avant de Commencer**

- [ ] Vérifiez les issues existantes
- [ ] Créez une issue si nécessaire
- [ ] Assignez-vous l'issue
- [ ] Créez une branche feature

### **2. Pendant le Développement**

- [ ] Suivez les standards de code
- [ ] Écrivez des tests unitaires
- [ ] Documentez votre code
- [ ] Testez sur différents navigateurs
- [ ] Vérifiez l'accessibilité

### **3. Avant de Soumettre**

```bash
# Vérifiez le code
npm run lint
npm run type-check

# Lancez les tests
npm run test

# Build de test
npm run build
```

### **4. Pull Request**

```markdown
## Description
Brève description des changements

## Type de Changement
- [ ] Bug fix
- [ ] Nouvelle feature
- [ ] Breaking change
- [ ] Documentation

## Tests
- [ ] Tests unitaires ajoutés
- [ ] Tests E2E ajoutés
- [ ] Tests manuels effectués

## Checklist
- [ ] Code respecte les standards
- [ ] Documentation mise à jour
- [ ] Pas de console.log oubliés
- [ ] Accessibilité vérifiée
```

## 🧪 **Tests**

### **Tests Unitaires**

```typescript
// Exemple de test unitaire
import { render, screen, fireEvent } from '@testing-library/react'
import { Button } from '@/components/ui/Button'

describe('Button', () => {
  it('renders with correct text', () => {
    render(<Button>Click me</Button>)
    expect(screen.getByText('Click me')).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const handleClick = jest.fn()
    render(<Button onClick={handleClick}>Click me</Button>)
    
    fireEvent.click(screen.getByText('Click me'))
    expect(handleClick).toHaveBeenCalledTimes(1)
  })
})
```

### **Tests E2E**

```typescript
// Exemple de test E2E avec Playwright
import { test, expect } from '@playwright/test'

test('user can login', async ({ page }) => {
  await page.goto('/auth/login')
  
  await page.fill('[data-testid="email"]', 'test@example.com')
  await page.fill('[data-testid="password"]', 'password123')
  await page.click('[data-testid="login-button"]')
  
  await expect(page).toHaveURL('/dashboard')
})
```

## 📚 **Documentation**

### **Composants**

```typescript
/**
 * Composant Button réutilisable
 * 
 * @param children - Contenu du bouton
 * @param variant - Style du bouton ('primary' | 'secondary')
 * @param onClick - Fonction appelée au clic
 * @param disabled - État désactivé du bouton
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Cliquer ici
 * </Button>
 * ```
 */
export function Button({ children, variant, onClick, disabled }: ButtonProps) {
  // ...
}
```

### **Hooks**

```typescript
/**
 * Hook pour gérer l'état de l'éditeur de code
 * 
 * @param initialValue - Valeur initiale de l'éditeur
 * @returns Objet contenant l'état et les actions de l'éditeur
 * 
 * @example
 * ```tsx
 * const { value, updateValue, formatCode } = useEditor('<h1>Hello</h1>')
 * ```
 */
export function useEditor(initialValue: string) {
  // ...
}
```

## 🐛 **Signaler un Bug**

### **Template d'Issue**

```markdown
## Description du Bug
Description claire et concise du problème.

## Étapes pour Reproduire
1. Aller à '...'
2. Cliquer sur '...'
3. Voir l'erreur

## Comportement Attendu
Description de ce qui devrait se passer.

## Captures d'Écran
Si applicable, ajoutez des captures d'écran.

## Environnement
- OS: [ex. Windows 10]
- Navigateur: [ex. Chrome 91]
- Version: [ex. 1.0.0]

## Informations Supplémentaires
Toute autre information pertinente.
```

## ✨ **Proposer une Feature**

### **Template de Feature Request**

```markdown
## Description de la Feature
Description claire et concise de la feature souhaitée.

## Problème Résolu
Quel problème cette feature résout-elle ?

## Solution Proposée
Description détaillée de la solution.

## Alternatives Considérées
Autres solutions que vous avez considérées.

## Contexte Supplémentaire
Toute autre information pertinente.
```

## 📞 **Support**

- **Discord** : [Serveur Discord C2P](https://discord.gg/c2p-platform)
- **Email** : dev@c2p-platform.com
- **Issues** : [GitHub Issues](https://github.com/c2p-platform/c2p-platform/issues)

## 📄 **Licence**

En contribuant à C2P Platform, vous acceptez que vos contributions soient sous licence MIT.

---

**Merci de contribuer à C2P Platform ! 🚀**

*Ensemble, nous construisons l'avenir de l'apprentissage du code.*