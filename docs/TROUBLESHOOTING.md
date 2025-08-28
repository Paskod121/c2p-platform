# 🔧 Guide de Dépannage - C2P Platform

## 🚨 **Problèmes Courants et Solutions**

### **1. Erreur de Build PostCSS**

#### **Symptôme**
```
Export default doesn't exist in target module
./postcss.config.mjs
```

#### **Cause**
- Fichier PostCSS avec extension `.mjs` mais syntaxe CommonJS
- Conflit entre ES modules et CommonJS
- Problème avec Turbopack et Next.js 15+

#### **Solution**
```bash
# 1. Renommer le fichier
mv postcss.config.mjs postcss.config.js

# 2. Utiliser la syntaxe CommonJS
module.exports = {
  plugins: {
    tailwindcss: {},
    autoprefixer: {},
  },
}
```

---

### **2. Erreur de Connexion Base de Données**

#### **Symptôme**
```
Error: P1001: Can't reach database server
```

#### **Cause**
- Base de données non démarrée
- URL de connexion incorrecte
- Firewall ou réseau bloquant

#### **Solution**
```bash
# 1. Vérifier que PostgreSQL est démarré
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS

# 2. Tester la connexion
npx prisma db push

# 3. Vérifier l'URL dans .env.local
echo $DATABASE_URL
```

---

### **3. Erreur NextAuth Secret**

#### **Symptôme**
```
Error: Please define NEXTAUTH_SECRET
```

#### **Cause**
- Variable d'environnement manquante
- Fichier `.env.local` non créé
- Secret trop court

#### **Solution**
```bash
# 1. Créer le fichier .env.local
touch .env.local

# 2. Générer un secret sécurisé
openssl rand -base64 32

# 3. Ajouter dans .env.local
echo 'NEXTAUTH_SECRET="votre-secret-ici"' >> .env.local
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local
```

---

### **4. Erreur de Module Non Trouvé**

#### **Symptôme**
```
Module not found: Can't resolve 'module-name'
```

#### **Cause**
- Dépendances non installées
- Cache corrompu
- Import incorrect

#### **Solution**
```bash
# 1. Réinstaller les dépendances
rm -rf node_modules package-lock.json
npm install

# 2. Nettoyer le cache Next.js
rm -rf .next
npm run dev

# 3. Vérifier les imports
# Utiliser des chemins relatifs ou absolus
import { Component } from '@/components/Component'
```

---

### **5. Erreur TypeScript**

#### **Symptôme**
```
Type 'X' is not assignable to type 'Y'
```

#### **Cause**
- Types incorrects
- Interface mal définie
- Valeur undefined/null

#### **Solution**
```bash
# 1. Vérifier les types
npx tsc --noEmit

# 2. Utiliser des types explicites
interface User {
  id: string;
  name: string;
  email: string;
}

# 3. Gérer les valeurs optionnelles
const userName = user?.name || 'Anonymous'
```

---

### **6. Erreur de Build Production**

#### **Symptôme**
```
Build failed with error code 1
```

#### **Cause**
- Erreurs TypeScript
- Imports incorrects
- Variables d'environnement manquantes

#### **Solution**
```bash
# 1. Vérifier le build local
npm run build

# 2. Corriger les erreurs TypeScript
npx tsc --noEmit

# 3. Vérifier ESLint
npm run lint

# 4. Nettoyer et rebuilder
rm -rf .next
npm run build
```

---

### **7. Problème de Performance**

#### **Symptôme**
- Pages lentes à charger
- Build très long
- Utilisation mémoire excessive

#### **Cause**
- Images non optimisées
- Bundle trop volumineux
- Re-renders inutiles

#### **Solution**
```bash
# 1. Analyser le bundle
npm run build
# Vérifier la taille des chunks

# 2. Optimiser les images
# Utiliser next/image avec les bonnes dimensions

# 3. Lazy loading des composants
const LazyComponent = dynamic(() => import('./Component'))

# 4. Vérifier les re-renders
# Utiliser React.memo et useMemo
```

---

### **8. Erreur de Déploiement**

#### **Symptôme**
```
Deployment failed
```

#### **Cause**
- Variables d'environnement manquantes
- Build échoué
- Configuration incorrecte

#### **Solution**
```bash
# 1. Vérifier le build local
npm run build

# 2. Configurer les variables d'environnement
# Sur Vercel : Settings > Environment Variables

# 3. Vérifier la configuration
# next.config.js, package.json
```

---

## 🛠️ **Outils de Diagnostic**

### **Vérification de l'Environnement**
```bash
# Vérifier Node.js
node --version  # Doit être 18.17.0+

# Vérifier npm
npm --version   # Doit être 9.0.0+

# Vérifier les variables d'environnement
echo $DATABASE_URL
echo $NEXTAUTH_SECRET
```

### **Vérification de la Base de Données**
```bash
# Tester la connexion Prisma
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio

# Vérifier le schéma
npx prisma validate
```

### **Vérification du Code**
```bash
# Vérifier TypeScript
npx tsc --noEmit

# Vérifier ESLint
npm run lint

# Vérifier les tests
npm run test
```

---

## 📱 **Problèmes Spécifiques par Plateforme**

### **Windows**
```bash
# Problème de permissions
# Exécuter PowerShell en tant qu'administrateur

# Problème de chemins
# Utiliser des chemins Windows valides
```

### **macOS**
```bash
# Problème de permissions
sudo chown -R $(whoami) /usr/local/lib/node_modules

# Problème de Homebrew
brew doctor
brew update
```

### **Linux**
```bash
# Problème de permissions
sudo chown -R $USER:$USER ~/.npm

# Problème de dépendances système
sudo apt update && sudo apt install build-essential
```

---

## 🆘 **Quand Demander de l'Aide**

### **Avant de Créer une Issue**
1. ✅ Vérifié ce guide de dépannage
2. ✅ Testé les solutions proposées
3. ✅ Vérifié la documentation officielle
4. ✅ Recherché dans les issues existantes

### **Informations à Inclure**
- **OS** : Windows 10, macOS 12.0, Ubuntu 22.04
- **Node.js** : v18.17.0
- **Next.js** : 15.5.2
- **Erreur complète** : Message d'erreur et stack trace
- **Étapes de reproduction** : Comment reproduire le problème
- **Comportement attendu** : Ce qui devrait se passer

---

## 📚 **Ressources Supplémentaires**

- [Documentation Next.js](https://nextjs.org/docs)
- [Documentation Prisma](https://www.prisma.io/docs)
- [Documentation Tailwind](https://tailwindcss.com/docs)
- [Issues GitHub](https://github.com/votre-repo/issues)
- [Discussions GitHub](https://github.com/votre-repo/discussions)

---

**💡 Conseil** : La plupart des problèmes peuvent être résolus en suivant ce guide étape par étape !
