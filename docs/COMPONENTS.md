# 🧩 Documentation des Composants - C2P Platform

Guide complet des composants modulaires de C2P Platform.

## 📋 **Table des Matières**

- [Composants de Sections](#composants-de-sections)
- [Composants UI](#composants-ui)
- [Composants Canvas](#composants-canvas)
- [Hooks Personnalisés](#hooks-personnalisés)
- [Exemples d'Usage](#exemples-dusage)

## 🎯 **Composants de Sections**

### `CapsuleInitiation`

**Rôle** : Micro-onboarding interactif avec quiz éclair

**Fonctionnalités** :
- Sélection du niveau (Débutant, Auto-didacte, Reconversion)
- Choix de l'objectif (Job, Projet, Comprendre)
- Quiz éclair pour évaluer les connaissances
- Recommandations de parcours personnalisées

**Props** : Aucune (composant autonome)

**État** :
```typescript
const [step, setStep] = useState<'niveau' | 'objectif' | 'quiz' | 'resultat'>('niveau')
const [niveau, setNiveau] = useState<'debutant' | 'autodidacte' | 'reconversion' | null>(null)
const [objectif, setObjectif] = useState<'job' | 'projet' | 'comprendre' | null>(null)
const [reponse, setReponse] = useState<string>('')
const [score, setScore] = useState<number | null>(null)
```

**Usage** :
```tsx
import { CapsuleInitiation } from '@/components/sections'

export function HomePage() {
  return (
    <div>
      <CapsuleInitiation />
    </div>
  )
}
```

### `SandboxLive`

**Rôle** : Éditeur de code HTML/CSS avec aperçu en temps réel

**Fonctionnalités** :
- Éditeur HTML/CSS avec syntaxe highlighting
- Aperçu en temps réel dans un iframe
- Objectifs d'apprentissage progressifs
- Auto-complétion et formatage automatique
- Mode focus pour la concentration
- Système de confetti pour les réussites

**État** : Géré par le hook `useEditor`

**Usage** :
```tsx
import { SandboxLive } from '@/components/sections'

export function LearningPage() {
  return (
    <div>
      <SandboxLive />
    </div>
  )
}
```

**Objectifs par défaut** :
- Ajouter un `<h2>` personnalisé
- Colorer le h2 en violet
- Validation automatique avec barre de progression

### `AnneauCommunaute`

**Rôle** : Visualisation de la communauté avec avatars en orbite

**Fonctionnalités** :
- Avatars des membres en rotation
- Animation fluide et continue
- Liens vers le forum et l'inscription
- Design responsive

**Props** : Aucune (composant autonome)

**Membres par défaut** :
```typescript
const membres = [
  { id: 1, nom: 'Aya', couleur: 'bg-cyan-500' },
  { id: 2, nom: 'Noah', couleur: 'bg-purple-500' },
  { id: 3, nom: 'Lina', couleur: 'bg-pink-500' },
  { id: 4, nom: 'Yanis', couleur: 'bg-emerald-500' },
  { id: 5, nom: 'Mia', couleur: 'bg-amber-500' },
  { id: 6, nom: 'Eli', couleur: 'bg-blue-500' },
]
```

### `ForgeBadge`

**Rôle** : Mini-jeu de drag & drop pour créer un badge HTML

**Fonctionnalités** :
- Drag & drop des éléments HTML
- Validation de l'ordre correct
- Animation de succès
- Système de feedback visuel

**État** :
```typescript
const [items, setItems] = useState(['<h1>', 'Bonjour', '</h1>'])
const [dragIndex, setDragIndex] = useState<number | null>(null)
const [minted, setMinted] = useState(false)
```

## 🎨 **Composants UI**

### `CTAHologramme`

**Rôle** : Bouton d'action avec effet holographique

**Props** :
```typescript
interface CTAHologrammeProps {
  children: React.ReactNode
  href: string
  className?: string
}
```

**Fonctionnalités** :
- Effet de glow animé
- Hover effects sophistiqués
- Navigation avec Next.js Link
- Accessibilité complète

**Usage** :
```tsx
import { CTAHologramme } from '@/components/ui'

<CTAHologramme href="/auth/register" className="max-w-lg">
  <div className="text-center">
    <h3>REJOINDRE LA RÉVOLUTION</h3>
    <p>Commence ton aventure maintenant</p>
  </div>
</CTAHologramme>
```

### `TypographieDynamique`

**Rôle** : Texte animé avec rotation de mots

**Props** : Aucune (composant autonome)

**Mots par défaut** :
```typescript
const mots = ['EXPERT', 'INNOVATEUR', 'LÉGENDE', 'MAÎTRE', 'GÉNIE']
```

**Fonctionnalités** :
- Rotation automatique des mots
- Animation de transition fluide
- Timing personnalisable

### `LoadingSpinner`

**Rôle** : Indicateur de chargement

**Props** :
```typescript
interface LoadingSpinnerProps {
  size?: 'sm' | 'md' | 'lg'
  className?: string
}
```

**Usage** :
```tsx
import { LoadingSpinner } from '@/components/ui'

<LoadingSpinner size="lg" className="text-cyan-500" />
```

### `Skeleton`

**Rôle** : États de chargement élégants

**Composants disponibles** :
- `Skeleton` : Skeleton de base
- `CardSkeleton` : Skeleton pour les cartes
- `TextSkeleton` : Skeleton pour le texte

**Usage** :
```tsx
import { Skeleton, CardSkeleton, TextSkeleton } from '@/components/ui'

// Skeleton de base
<Skeleton className="h-4 w-3/4" />

// Skeleton de carte
<CardSkeleton />

// Skeleton de texte
<TextSkeleton lines={5} />
```

## 🎨 **Composants Canvas**

### `PulseActivite`

**Rôle** : Animation de fond avec particules pulsantes

**Fonctionnalités** :
- Particules générées aléatoirement
- Animation fluide avec requestAnimationFrame
- Adaptation responsive
- Performance optimisée

**Technologie** : HTML5 Canvas API

**Configuration** :
```typescript
const pulses: Array<{
  x: number
  y: number
  r: number
  a: number
  hue: number
}> = []
```

### `CanvasInteractif`

**Rôle** : Particules interactives avec la souris

**Fonctionnalités** :
- Particules qui suivent le curseur
- Lignes de connexion entre particules
- Effet d'attraction magnétique
- Responsive design

**Interactions** :
- Attraction des particules vers la souris
- Distance d'influence : 150px
- Force d'attraction : 0.01

## 🎣 **Hooks Personnalisés**

### `useEditor`

**Rôle** : Gestion centralisée de l'éditeur de code

**Interface** :
```typescript
interface EditorState {
  html: string
  css: string
  isGoalMet: boolean
  progress: number
  showConfetti: boolean
  focusMode: boolean
}

interface EditorActions {
  setHtml: (html: string) => void
  setCss: (css: string) => void
  setFocusMode: (focus: boolean) => void
  formatHtml: (html: string) => string
  insertSnippet: (type: 'html' | 'css', snippet: string) => void
}
```

**Fonctionnalités** :
- Validation automatique des objectifs
- Formatage HTML intelligent
- Insertion de snippets
- Gestion des états de chargement
- Optimisation des performances

**Usage** :
```tsx
import { useEditor } from '@/hooks/useEditor'

function MyEditor() {
  const {
    html, css, isGoalMet, progress,
    setHtml, setCss, formatHtml, insertSnippet
  } = useEditor('<h1>Hello</h1>', 'h1 { color: blue; }')
  
  return (
    <div>
      <textarea value={html} onChange={(e) => setHtml(e.target.value)} />
      <textarea value={css} onChange={(e) => setCss(e.target.value)} />
      <button onClick={() => insertSnippet('html', '<p>New paragraph</p>')}>
        Add Paragraph
      </button>
    </div>
  )
}
```

## 📝 **Exemples d'Usage**

### **Page d'Accueil Complète**

```tsx
import { 
  CapsuleInitiation, 
  AnneauCommunaute, 
  SandboxLive, 
  ForgeBadge 
} from '@/components/sections'
import { CTAHologramme, TypographieDynamique } from '@/components/ui'
import { PulseActivite, CanvasInteractif } from '@/components/canvas'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <CanvasInteractif />
      <PulseActivite />
      
      <main>
        <h1>
          Devenez un <TypographieDynamique /> développeur
        </h1>
        
        <CapsuleInitiation />
        <SandboxLive />
        <AnneauCommunaute />
        <ForgeBadge />
        
        <CTAHologramme href="/auth/register">
          <h3>REJOINDRE LA RÉVOLUTION</h3>
        </CTAHologramme>
      </main>
    </div>
  )
}
```

### **Page d'Apprentissage**

```tsx
import { SandboxLive } from '@/components/sections'
import { LoadingSpinner } from '@/components/ui'

export default function LearningPage() {
  const [isLoading, setIsLoading] = useState(true)
  
  useEffect(() => {
    // Simulation de chargement
    setTimeout(() => setIsLoading(false), 2000)
  }, [])
  
  if (isLoading) {
    return <LoadingSpinner size="lg" />
  }
  
  return (
    <div>
      <h1>Atelier de Code</h1>
      <SandboxLive />
    </div>
  )
}
```

### **Page Communauté**

```tsx
import { AnneauCommunaute } from '@/components/sections'
import { Skeleton } from '@/components/ui'

export default function CommunityPage() {
  const [members, setMembers] = useState(null)
  
  return (
    <div>
      <h1>Communauté</h1>
      {members ? (
        <AnneauCommunaute />
      ) : (
        <Skeleton className="h-96 w-full" />
      )}
    </div>
  )
}
```

## 🔧 **Personnalisation**

### **Thèmes et Styles**

Tous les composants utilisent Tailwind CSS et supportent le mode sombre :

```tsx
// Mode clair
<div className="bg-white text-gray-900">

// Mode sombre
<div className="dark:bg-gray-900 dark:text-white">
```

### **Animations Personnalisées**

```css
/* Dans globals.css */
@keyframes custom-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.custom-pulse {
  animation: custom-pulse 2s infinite;
}
```

### **Props Personnalisées**

```tsx
// Exemple d'extension du composant CTAHologramme
interface CustomCTAProps extends CTAHologrammeProps {
  variant?: 'primary' | 'secondary'
  size?: 'sm' | 'md' | 'lg'
}

export function CustomCTA({ variant = 'primary', size = 'md', ...props }: CustomCTAProps) {
  const variantClasses = {
    primary: 'from-cyan-400 via-purple-500 to-pink-500',
    secondary: 'from-green-400 via-blue-500 to-purple-500'
  }
  
  return (
    <CTAHologramme 
      {...props} 
      className={`${variantClasses[variant]} ${props.className}`}
    />
  )
}
```

---

**Cette documentation est maintenue à jour avec chaque modification des composants.**
