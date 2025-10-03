# 🚀 Guide de Déploiement - C2P Platform

Guide complet pour déployer C2P Platform en production.

## 📋 **Table des Matières**

- [Préparation](#préparation)
- [Déploiement Vercel](#déploiement-vercel)
- [Déploiement Docker](#déploiement-docker)
- [Déploiement VPS](#déploiement-vps)
- [Configuration Production](#configuration-production)
- [Monitoring](#monitoring)
- [Maintenance](#maintenance)

## 🔧 **Préparation**

### **1. Vérifications Pré-Déploiement**

```bash
# Vérifier que tout fonctionne
npm run lint
npm run type-check
npm run test
npm run build

# Vérifier la base de données
npm run db:generate
npm run db:push
```

### **2. Variables d'Environnement**

Créez un fichier `.env.production` :

```env
# Base de données
DATABASE_URL="postgresql://user:password@host:5432/c2p_platform_prod"

# NextAuth.js
NEXTAUTH_SECRET="your-super-secret-key-here"
NEXTAUTH_URL="https://your-domain.com"

# Fournisseurs d'authentification
GITHUB_ID="your-github-client-id"
GITHUB_SECRET="your-github-client-secret"

# Variables d'environnement
NODE_ENV="production"

# Analytics
NEXT_PUBLIC_GA_ID="your-google-analytics-id"

# Monitoring
SENTRY_DSN="your-sentry-dsn"
```

### **3. Optimisations de Build**

```bash
# Build optimisé
npm run build

# Vérifier la taille du bundle
npx @next/bundle-analyzer
```

## ☁️ **Déploiement Vercel (Recommandé)**

### **1. Configuration Vercel**

```json
// vercel.json
{
  "framework": "nextjs",
  "buildCommand": "npm run build",
  "devCommand": "npm run dev",
  "installCommand": "npm install",
  "outputDirectory": ".next",
  "functions": {
    "src/app/api/**/*.ts": {
      "maxDuration": 30
    }
  },
  "env": {
    "DATABASE_URL": "@database_url",
    "NEXTAUTH_SECRET": "@nextauth_secret",
    "NEXTAUTH_URL": "@nextauth_url"
  }
}
```

### **2. Déploiement Automatique**

```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel

on:
  push:
    branches: [main]
  pull_request:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      
      - name: Setup Node.js
        uses: actions/setup-node@v3
        with:
          node-version: '18'
          cache: 'npm'
      
      - name: Install dependencies
        run: npm ci
      
      - name: Run tests
        run: npm run test
      
      - name: Run linting
        run: npm run lint
      
      - name: Build application
        run: npm run build
      
      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

### **3. Configuration des Domaines**

```bash
# Ajouter un domaine personnalisé
vercel domains add your-domain.com

# Configurer les DNS
# A record: @ -> 76.76.19.61
# CNAME: www -> c2p-platform.vercel.app
```

## 🐳 **Déploiement Docker**

### **1. Dockerfile**

```dockerfile
# Dockerfile
FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN npx prisma generate

# Build the application
RUN npm run build

# Production image
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

ENV PORT 3000
ENV HOSTNAME "0.0.0.0"

CMD ["node", "server.js"]
```

### **2. Docker Compose**

```yaml
# docker-compose.yml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/c2p_platform
      - NEXTAUTH_SECRET=your-secret
      - NEXTAUTH_URL=http://localhost:3000
    depends_on:
      - db
    restart: unless-stopped

  db:
    image: postgres:15-alpine
    environment:
      - POSTGRES_DB=c2p_platform
      - POSTGRES_USER=postgres
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"
    restart: unless-stopped

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    restart: unless-stopped

volumes:
  postgres_data:
```

### **3. Déploiement avec Docker**

```bash
# Build l'image
docker build -t c2p-platform .

# Lancer avec Docker Compose
docker-compose up -d

# Vérifier les logs
docker-compose logs -f app
```

## 🖥️ **Déploiement VPS**

### **1. Configuration Serveur**

```bash
# Ubuntu 20.04 LTS
sudo apt update
sudo apt install nginx postgresql redis-server

# Installer Node.js 18
curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
sudo apt-get install -y nodejs

# Installer PM2
sudo npm install -g pm2
```

### **2. Configuration Nginx**

```nginx
# /etc/nginx/sites-available/c2p-platform
server {
    listen 80;
    server_name your-domain.com www.your-domain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### **3. Configuration SSL avec Let's Encrypt**

```bash
# Installer Certbot
sudo apt install certbot python3-certbot-nginx

# Obtenir le certificat SSL
sudo certbot --nginx -d your-domain.com -d www.your-domain.com

# Vérifier le renouvellement automatique
sudo certbot renew --dry-run
```

### **4. Déploiement avec PM2**

```javascript
// ecosystem.config.js
module.exports = {
  apps: [{
    name: 'c2p-platform',
    script: 'npm',
    args: 'start',
    cwd: '/var/www/c2p-platform',
    instances: 'max',
    exec_mode: 'cluster',
    env: {
      NODE_ENV: 'production',
      PORT: 3000
    },
    error_file: '/var/log/pm2/c2p-platform-error.log',
    out_file: '/var/log/pm2/c2p-platform-out.log',
    log_file: '/var/log/pm2/c2p-platform.log',
    time: true
  }]
}
```

```bash
# Déployer avec PM2
pm2 start ecosystem.config.js
pm2 save
pm2 startup
```

## ⚙️ **Configuration Production**

### **1. Base de Données**

```sql
-- Créer la base de données
CREATE DATABASE c2p_platform_prod;

-- Créer un utilisateur dédié
CREATE USER c2p_user WITH PASSWORD 'secure_password';
GRANT ALL PRIVILEGES ON DATABASE c2p_platform_prod TO c2p_user;

-- Appliquer les migrations
npx prisma migrate deploy
```

### **2. Variables d'Environnement Sécurisées**

```bash
# Générer une clé secrète forte
openssl rand -base64 32

# Variables critiques
NEXTAUTH_SECRET="your-super-secret-key-here"
DATABASE_URL="postgresql://user:password@host:5432/database"
```

### **3. Optimisations Performance**

```javascript
// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  images: {
    domains: ['your-domain.com'],
    formats: ['image/webp', 'image/avif'],
  },
  compress: true,
  poweredByHeader: false,
  generateEtags: false,
  httpAgentOptions: {
    keepAlive: true,
  },
}

module.exports = nextConfig
```

## 📊 **Monitoring**

### **1. Sentry pour les Erreurs**

```javascript
// sentry.client.config.js
import * as Sentry from '@sentry/nextjs'

Sentry.init({
  dsn: process.env.SENTRY_DSN,
  tracesSampleRate: 1.0,
  environment: process.env.NODE_ENV,
})
```

### **2. Analytics avec Vercel**

```javascript
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
```

### **3. Monitoring des Performances**

```javascript
// lib/analytics.js
export const trackEvent = (eventName, properties = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, properties)
  }
}

// Utilisation
trackEvent('user_signup', {
  method: 'github',
  timestamp: Date.now()
})
```

### **4. Health Checks**

```typescript
// app/api/health/route.ts
import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET() {
  try {
    // Vérifier la base de données
    await prisma.$queryRaw`SELECT 1`
    
    return NextResponse.json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      database: 'connected',
      uptime: process.uptime()
    })
  } catch (error) {
    return NextResponse.json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      error: error.message
    }, { status: 500 })
  }
}
```

## 🔧 **Maintenance**

### **1. Sauvegarde de la Base de Données**

```bash
#!/bin/bash
# backup.sh

DATE=$(date +%Y%m%d_%H%M%S)
BACKUP_DIR="/var/backups/c2p-platform"
DB_NAME="c2p_platform_prod"

# Créer le dossier de sauvegarde
mkdir -p $BACKUP_DIR

# Sauvegarder la base de données
pg_dump $DB_NAME > $BACKUP_DIR/backup_$DATE.sql

# Compresser la sauvegarde
gzip $BACKUP_DIR/backup_$DATE.sql

# Supprimer les sauvegardes de plus de 30 jours
find $BACKUP_DIR -name "backup_*.sql.gz" -mtime +30 -delete

echo "Sauvegarde terminée: backup_$DATE.sql.gz"
```

### **2. Mise à Jour des Dépendances**

```bash
# Vérifier les mises à jour
npm outdated

# Mettre à jour les dépendances
npm update

# Mettre à jour les dépendances majeures
npx npm-check-updates -u
npm install
```

### **3. Monitoring des Logs**

```bash
# Logs PM2
pm2 logs c2p-platform

# Logs Nginx
sudo tail -f /var/log/nginx/access.log
sudo tail -f /var/log/nginx/error.log

# Logs de l'application
tail -f /var/log/pm2/c2p-platform.log
```

### **4. Redémarrage de l'Application**

```bash
# Redémarrage PM2
pm2 restart c2p-platform

# Redémarrage Nginx
sudo systemctl restart nginx

# Redémarrage PostgreSQL
sudo systemctl restart postgresql
```

## 🚨 **Dépannage**

### **Problèmes Courants**

1. **Erreur de Base de Données**
   ```bash
   # Vérifier la connexion
   npx prisma db push
   
   # Réinitialiser si nécessaire
   npx prisma migrate reset
   ```

2. **Erreur de Build**
   ```bash
   # Nettoyer le cache
   rm -rf .next
   npm run build
   ```

3. **Problèmes de Performance**
   ```bash
   # Analyser le bundle
   npx @next/bundle-analyzer
   
   # Vérifier les métriques
   npm run build -- --analyze
   ```

### **Commandes de Diagnostic**

```bash
# Vérifier l'état de l'application
pm2 status

# Vérifier l'utilisation des ressources
pm2 monit

# Vérifier les logs d'erreur
pm2 logs c2p-platform --err

# Tester la connectivité
curl -I https://your-domain.com/api/health
```

---

**Ce guide assure un déploiement robuste et une maintenance efficace de C2P Platform en production.**
