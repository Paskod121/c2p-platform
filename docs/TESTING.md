# 🧪 Guide de Tests - C2P Platform

Guide complet pour les tests unitaires et E2E de C2P Platform.

## 📋 **Table des Matières**

- [Configuration](#configuration)
- [Tests Unitaires](#tests-unitaires)
- [Tests d'Intégration](#tests-dintégration)
- [Tests E2E](#tests-e2e)
- [Tests de Performance](#tests-de-performance)
- [Bonnes Pratiques](#bonnes-pratiques)

## ⚙️ **Configuration**

### **Jest + React Testing Library**

```javascript
// jest.config.js
const nextJest = require('next/jest')

const createJestConfig = nextJest({
  dir: './',
})

const customJestConfig = {
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  testEnvironment: 'jsdom',
  moduleNameMapping: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
  },
}

module.exports = createJestConfig(customJestConfig)
```

### **Scripts Disponibles**

```bash
# Tests unitaires
npm run test

# Tests en mode watch
npm run test:watch

# Tests avec couverture
npm run test:coverage

# Tests E2E (à configurer)
npm run test:e2e
```

## 🧪 **Tests Unitaires**

### **Composants UI**

#### `Button.test.tsx`

```typescript
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

  it('is disabled when disabled prop is true', () => {
    render(<Button disabled>Click me</Button>)
    expect(screen.getByRole('button')).toBeDisabled()
  })

  it('applies correct variant classes', () => {
    render(<Button variant="primary">Click me</Button>)
    expect(screen.getByRole('button')).toHaveClass('btn-primary')
  })
})
```

#### `LoadingSpinner.test.tsx`

```typescript
import { render } from '@testing-library/react'
import { LoadingSpinner } from '@/components/ui/LoadingSpinner'

describe('LoadingSpinner', () => {
  it('renders with default size', () => {
    render(<LoadingSpinner />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toBeInTheDocument()
    expect(spinner).toHaveClass('h-8', 'w-8')
  })

  it('renders with custom size', () => {
    render(<LoadingSpinner size="lg" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('h-12', 'w-12')
  })

  it('applies custom className', () => {
    render(<LoadingSpinner className="text-blue-500" />)
    const spinner = document.querySelector('.animate-spin')
    expect(spinner).toHaveClass('text-blue-500')
  })
})
```

### **Composants de Sections**

#### `CapsuleInitiation.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { CapsuleInitiation } from '@/components/sections/CapsuleInitiation'

describe('CapsuleInitiation', () => {
  it('renders initial step with niveau options', () => {
    render(<CapsuleInitiation />)
    
    expect(screen.getByText('Capsule d\'Initiation')).toBeInTheDocument()
    expect(screen.getByText('Débutant total')).toBeInTheDocument()
    expect(screen.getByText('Auto-didacte bloqué')).toBeInTheDocument()
    expect(screen.getByText('Reconversion pro')).toBeInTheDocument()
  })

  it('navigates to objectif step when niveau is selected', async () => {
    render(<CapsuleInitiation />)
    
    fireEvent.click(screen.getByText('Débutant total'))
    
    await waitFor(() => {
      expect(screen.getByText('Trouver un job')).toBeInTheDocument()
      expect(screen.getByText('Construire un projet')).toBeInTheDocument()
      expect(screen.getByText('Comprendre les bases')).toBeInTheDocument()
    })
  })

  it('navigates to quiz step when objectif is selected', async () => {
    render(<CapsuleInitiation />)
    
    fireEvent.click(screen.getByText('Débutant total'))
    fireEvent.click(screen.getByText('Trouver un job'))
    
    await waitFor(() => {
      expect(screen.getByText('Quiz éclair: Quel langage structure le contenu d\'une page web ?')).toBeInTheDocument()
    })
  })

  it('shows success message for correct answer', async () => {
    render(<CapsuleInitiation />)
    
    // Navigate to quiz
    fireEvent.click(screen.getByText('Débutant total'))
    fireEvent.click(screen.getByText('Trouver un job'))
    
    // Enter correct answer
    const input = screen.getByPlaceholderText('Tape ta réponse… (indice: 4 lettres)')
    fireEvent.change(input, { target: { value: 'html' } })
    
    fireEvent.click(screen.getByText('Valider'))
    
    await waitFor(() => {
      expect(screen.getByText('Yes — bien vu !')).toBeInTheDocument()
    })
  })
})
```

#### `SandboxLive.test.tsx`

```typescript
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { SandboxLive } from '@/components/sections/SandboxLive'

// Mock the useEditor hook
jest.mock('@/hooks/useEditor', () => ({
  useEditor: () => ({
    html: '<h1>Test</h1>',
    css: 'h1 { color: blue; }',
    isGoalMet: false,
    progress: 50,
    showConfetti: false,
    focusMode: false,
    setHtml: jest.fn(),
    setCss: jest.fn(),
    setFocusMode: jest.fn(),
    formatHtml: jest.fn(),
    insertSnippet: jest.fn(),
  }),
}))

describe('SandboxLive', () => {
  it('renders HTML and CSS editors', () => {
    render(<SandboxLive />)
    
    expect(screen.getByLabelText('Éditeur HTML')).toBeInTheDocument()
    expect(screen.getByLabelText('Éditeur CSS')).toBeInTheDocument()
  })

  it('shows progress bar', () => {
    render(<SandboxLive />)
    
    const progressBar = document.querySelector('[style*="width: 50%"]')
    expect(progressBar).toBeInTheDocument()
  })

  it('has insert snippet buttons', () => {
    render(<SandboxLive />)
    
    expect(screen.getByText('Insérer <h1>')).toBeInTheDocument()
    expect(screen.getByText('Ajouter <p>')).toBeInTheDocument()
    expect(screen.getByText('Image + légende')).toBeInTheDocument()
  })

  it('shows focus mode toggle', () => {
    render(<SandboxLive />)
    
    expect(screen.getByText('Mode focus')).toBeInTheDocument()
  })
})
```

### **Hooks Personnalisés**

#### `useEditor.test.ts`

```typescript
import { renderHook, act } from '@testing-library/react'
import { useEditor } from '@/hooks/useEditor'

describe('useEditor', () => {
  it('initializes with default values', () => {
    const { result } = renderHook(() => useEditor())
    
    expect(result.current.html).toBe('<h1>Salut</h1>\n<p>Édite et vois le rendu.</p>')
    expect(result.current.css).toBe('h1{color:#8b5cf6;font-family:system-ui;} p{color:#374151;}')
    expect(result.current.isGoalMet).toBe(false)
    expect(result.current.progress).toBe(0)
    expect(result.current.focusMode).toBe(false)
  })

  it('updates HTML content', () => {
    const { result } = renderHook(() => useEditor())
    
    act(() => {
      result.current.setHtml('<h2>New Title</h2>')
    })
    
    expect(result.current.html).toBe('<h2>New Title</h2>')
  })

  it('updates CSS content', () => {
    const { result } = renderHook(() => useEditor())
    
    act(() => {
      result.current.setCss('h2 { color: purple; }')
    })
    
    expect(result.current.css).toBe('h2 { color: purple; }')
  })

  it('toggles focus mode', () => {
    const { result } = renderHook(() => useEditor())
    
    act(() => {
      result.current.setFocusMode(true)
    })
    
    expect(result.current.focusMode).toBe(true)
  })

  it('formats HTML correctly', () => {
    const { result } = renderHook(() => useEditor())
    
    const unformattedHtml = '<div><h1>Title</h1><p>Content</p></div>'
    const formatted = result.current.formatHtml(unformattedHtml)
    
    expect(formatted).toContain('  <h1>Title</h1>')
    expect(formatted).toContain('  <p>Content</p>')
  })

  it('inserts HTML snippets', () => {
    const { result } = renderHook(() => useEditor())
    
    act(() => {
      result.current.insertSnippet('html', '<h3>New Heading</h3>')
    })
    
    expect(result.current.html).toContain('<h3>New Heading</h3>')
  })

  it('inserts CSS snippets', () => {
    const { result } = renderHook(() => useEditor())
    
    act(() => {
      result.current.insertSnippet('css', 'h3 { font-size: 2rem; }')
    })
    
    expect(result.current.css).toContain('h3 { font-size: 2rem; }')
  })
})
```

## 🔗 **Tests d'Intégration**

### **Page d'Accueil**

```typescript
import { render, screen } from '@testing-library/react'
import Home from '@/app/page'

// Mock all the components
jest.mock('@/components/sections', () => ({
  CapsuleInitiation: () => <div data-testid="capsule-initiation">Capsule Initiation</div>,
  AnneauCommunaute: () => <div data-testid="anneau-communaute">Anneau Communauté</div>,
  SandboxLive: () => <div data-testid="sandbox-live">Sandbox Live</div>,
  ForgeBadge: () => <div data-testid="forge-badge">Forge Badge</div>,
}))

jest.mock('@/components/ui', () => ({
  CTAHologramme: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="cta-hologramme">{children}</div>
  ),
  TypographieDynamique: () => <span data-testid="typographie-dynamique">EXPERT</span>,
}))

jest.mock('@/components/canvas', () => ({
  PulseActivite: () => <div data-testid="pulse-activite">Pulse Activité</div>,
  CanvasInteractif: () => <div data-testid="canvas-interactif">Canvas Interactif</div>,
}))

describe('Home Page Integration', () => {
  it('renders all main sections', () => {
    render(<Home />)
    
    expect(screen.getByTestId('capsule-initiation')).toBeInTheDocument()
    expect(screen.getByTestId('anneau-communaute')).toBeInTheDocument()
    expect(screen.getByTestId('sandbox-live')).toBeInTheDocument()
    expect(screen.getByTestId('forge-badge')).toBeInTheDocument()
  })

  it('renders canvas components', () => {
    render(<Home />)
    
    expect(screen.getByTestId('pulse-activite')).toBeInTheDocument()
    expect(screen.getByTestId('canvas-interactif')).toBeInTheDocument()
  })

  it('renders CTA components', () => {
    render(<Home />)
    
    expect(screen.getByTestId('cta-hologramme')).toBeInTheDocument()
    expect(screen.getByTestId('typographie-dynamique')).toBeInTheDocument()
  })
})
```

## 🌐 **Tests E2E**

### **Configuration Playwright**

```typescript
// playwright.config.ts
import { defineConfig, devices } from '@playwright/test'

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:3000',
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
    {
      name: 'firefox',
      use: { ...devices['Desktop Firefox'] },
    },
    {
      name: 'webkit',
      use: { ...devices['Desktop Safari'] },
    },
    {
      name: 'Mobile Chrome',
      use: { ...devices['Pixel 5'] },
    },
  ],
  webServer: {
    command: 'npm run dev',
    url: 'http://localhost:3000',
    reuseExistingServer: !process.env.CI,
  },
})
```

### **Test E2E - Parcours Utilisateur**

```typescript
// tests/e2e/user-journey.spec.ts
import { test, expect } from '@playwright/test'

test.describe('User Journey', () => {
  test('complete onboarding flow', async ({ page }) => {
    await page.goto('/')
    
    // Vérifier que la page se charge
    await expect(page).toHaveTitle(/C2P Platform/)
    
    // Commencer la capsule d'initiation
    await page.click('text=Débutant total')
    await expect(page.locator('text=Trouver un job')).toBeVisible()
    
    await page.click('text=Trouver un job')
    await expect(page.locator('text=Quiz éclair')).toBeVisible()
    
    // Répondre au quiz
    await page.fill('input[placeholder*="Tape ta réponse"]', 'html')
    await page.click('text=Valider')
    
    // Vérifier le résultat
    await expect(page.locator('text=Yes — bien vu !')).toBeVisible()
    await expect(page.locator('text=Commencer maintenant')).toBeVisible()
  })

  test('use code editor', async ({ page }) => {
    await page.goto('/')
    
    // Trouver l'éditeur
    const htmlEditor = page.locator('textarea[aria-label="Éditeur HTML"]')
    const cssEditor = page.locator('textarea[aria-label="Éditeur CSS"]')
    
    // Écrire du code HTML
    await htmlEditor.fill('<h2>Mon Titre</h2>')
    
    // Écrire du CSS
    await cssEditor.fill('h2 { color: purple; }')
    
    // Vérifier l'aperçu
    const iframe = page.frameLocator('iframe[title="Aperçu"]')
    await expect(iframe.locator('h2')).toHaveText('Mon Titre')
    
    // Vérifier la progression
    await expect(page.locator('text=100%')).toBeVisible()
  })

  test('drag and drop badge creation', async ({ page }) => {
    await page.goto('/')
    
    // Trouver les éléments à glisser
    const h1Open = page.locator('text=<h1>')
    const text = page.locator('text=Bonjour')
    const h1Close = page.locator('text=</h1>')
    
    // Glisser-déposer dans le bon ordre
    await h1Open.dragTo(page.locator('[data-testid="drop-zone"]'))
    await text.dragTo(page.locator('[data-testid="drop-zone"]'))
    await h1Close.dragTo(page.locator('[data-testid="drop-zone"]'))
    
    // Vérifier le succès
    await expect(page.locator('text=Badge "Initiation HTML" obtenu')).toBeVisible()
  })
})
```

## ⚡ **Tests de Performance**

### **Test de Performance des Composants**

```typescript
import { render } from '@testing-library/react'
import { performance } from 'perf_hooks'
import { SandboxLive } from '@/components/sections/SandboxLive'

describe('Performance Tests', () => {
  it('renders SandboxLive within performance budget', () => {
    const start = performance.now()
    
    render(<SandboxLive />)
    
    const end = performance.now()
    const renderTime = end - start
    
    // Le composant doit se rendre en moins de 100ms
    expect(renderTime).toBeLessThan(100)
  })

  it('handles large HTML content efficiently', () => {
    const largeHtml = '<div>'.repeat(1000) + '</div>'.repeat(1000)
    
    const start = performance.now()
    
    // Simuler la mise à jour du contenu
    const { rerender } = render(<SandboxLive />)
    rerender(<SandboxLive html={largeHtml} />)
    
    const end = performance.now()
    const updateTime = end - start
    
    // La mise à jour doit être rapide même avec beaucoup de contenu
    expect(updateTime).toBeLessThan(50)
  })
})
```

## 📊 **Couverture de Code**

### **Configuration de Couverture**

```javascript
// jest.config.js
module.exports = {
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/**/*.d.ts',
    '!src/**/*.stories.{js,jsx,ts,tsx}',
    '!src/**/*.test.{js,jsx,ts,tsx}',
    '!src/**/*.spec.{js,jsx,ts,tsx}',
  ],
  coverageThreshold: {
    global: {
      branches: 70,
      functions: 70,
      lines: 70,
      statements: 70,
    },
    './src/components/': {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
    './src/hooks/': {
      branches: 90,
      functions: 90,
      lines: 90,
      statements: 90,
    },
  },
}
```

## 🎯 **Bonnes Pratiques**

### **1. Structure des Tests**

```
tests/
├── unit/
│   ├── components/
│   │   ├── ui/
│   │   └── sections/
│   ├── hooks/
│   └── utils/
├── integration/
│   └── pages/
└── e2e/
    └── user-flows/
```

### **2. Nommage des Tests**

```typescript
// ✅ Bon
describe('Button Component', () => {
  it('should render with correct text', () => {})
  it('should call onClick when clicked', () => {})
  it('should be disabled when disabled prop is true', () => {})
})

// ❌ Éviter
describe('Button', () => {
  it('works', () => {})
  it('test', () => {})
})
```

### **3. Tests Isolés**

```typescript
// ✅ Bon - Test isolé
it('should update progress when goal is met', () => {
  const { result } = renderHook(() => useEditor())
  
  act(() => {
    result.current.setHtml('<h2>Title</h2>')
    result.current.setCss('h2 { color: purple; }')
  })
  
  expect(result.current.isGoalMet).toBe(true)
  expect(result.current.progress).toBe(100)
})
```

### **4. Mocks Appropriés**

```typescript
// ✅ Bon - Mock spécifique
jest.mock('@/hooks/useEditor', () => ({
  useEditor: () => ({
    html: '<h1>Test</h1>',
    css: 'h1 { color: blue; }',
    isGoalMet: false,
    progress: 50,
    setHtml: jest.fn(),
    setCss: jest.fn(),
  }),
}))

// ❌ Éviter - Mock trop général
jest.mock('@/hooks/useEditor', () => ({}))
```

### **5. Tests Accessibles**

```typescript
// ✅ Bon - Test d'accessibilité
it('should be accessible', async () => {
  render(<Button>Click me</Button>)
  
  const button = screen.getByRole('button', { name: 'Click me' })
  expect(button).toBeInTheDocument()
  expect(button).toHaveAttribute('type', 'button')
})
```

---

**Ce guide de tests assure une couverture complète et une qualité élevée du code de C2P Platform.**
