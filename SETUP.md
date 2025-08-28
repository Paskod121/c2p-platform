# 🚀 Guide de Configuration - C2P Platform

## 📋 **Prérequis Système**

### **Versions requises**
- **Node.js** : 18.17.0 ou supérieur
- **npm** : 9.0.0 ou supérieur
- **Git** : 2.30.0 ou supérieur
- **PostgreSQL** : 14.0 ou supérieur

### **Vérification des prérequis**
```bash
# Vérifier Node.js
node --version
# Doit afficher v18.17.0 ou supérieur

# Vérifier npm
npm --version
# Doit afficher 9.0.0 ou supérieur

# Vérifier Git
git --version
# Doit afficher 2.30.0 ou supérieur
```

## 🗄️ **Configuration de la Base de Données**

### **Option 1 : Base locale PostgreSQL**
```bash
# Installation sur Ubuntu/Debian
sudo apt update
sudo apt install postgresql postgresql-contrib

# Installation sur macOS avec Homebrew
brew install postgresql

# Installation sur Windows
# Télécharger depuis https://www.postgresql.org/download/windows/

# Créer la base de données
sudo -u postgres psql
CREATE DATABASE c2p_platform;
CREATE USER c2p_user WITH ENCRYPTED PASSWORD 'votre_mot_de_passe';
GRANT ALL PRIVILEGES ON DATABASE c2p_platform TO c2p_user;
\q
```

### **Option 2 : Base cloud avec Neon (Recommandé)**
1. Aller sur [neon.tech](https://neon.tech)
2. Créer un compte gratuit
3. Créer un nouveau projet
4. Copier l'URL de connexion fournie

### **Option 3 : Base cloud avec Supabase**
1. Aller sur [supabase.com](https://supabase.com)
2. Créer un compte gratuit
3. Créer un nouveau projet
4. Copier l'URL de connexion depuis Settings > Database

## ⚙️ **Configuration de l'Environnement**

### **1. Créer le fichier .env.local**
```bash
# À la racine du projet
cp .env.example .env.local
```

### **2. Configurer les variables obligatoires**
```env
# Base de données (remplacez par votre URL)
DATABASE_URL="postgresql://username:password@localhost:5432/c2p_platform"

# NextAuth (générez un secret sécurisé)
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"
```

### **3. Générer un secret sécurisé**
```bash
# Sur Linux/macOS
openssl rand -base64 32

# Sur Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 10)
```

## 🔐 **Configuration de l'Authentification**

### **GitHub OAuth (Recommandé pour le développement)**
1. Aller sur [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Cliquer "New OAuth App"
3. Remplir les informations :
   - **Application name** : C2P Platform Dev
   - **Homepage URL** : http://localhost:3000
   - **Authorization callback URL** : http://localhost:3000/api/auth/callback/github
4. Copier le Client ID et Client Secret
5. Ajouter dans `.env.local` :
   ```env
   GITHUB_ID="votre-github-client-id"
   GITHUB_SECRET="votre-github-client-secret"
   ```

### **Google OAuth (Alternative)**
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet
3. Activer l'API Google+ API
4. Créer des identifiants OAuth 2.0
5. Ajouter les URIs de redirection autorisés

## 🚀 **Démarrage du Projet**

### **1. Installation des dépendances**
```bash
# Installer toutes les dépendances
npm install

# Vérifier qu'il n'y a pas d'erreurs
npm run lint
```

### **2. Configuration de la base de données**
```bash
# Générer le client Prisma
npx prisma generate

# Appliquer le schéma à la base
npx prisma db push

# Vérifier la connexion
npx prisma studio
```

### **3. Lancement du serveur de développement**
```bash
# Démarrer le serveur
npm run dev

# Ouvrir http://localhost:3000 dans votre navigateur
```

## 🧪 **Tests de Configuration**

### **Vérifier la base de données**
```bash
# Tester la connexion
npx prisma db push

# Ouvrir Prisma Studio
npx prisma studio
# Doit ouvrir http://localhost:5555
```

### **Vérifier l'authentification**
1. Aller sur http://localhost:3000
2. Cliquer sur "Se connecter"
3. Vérifier que GitHub apparaît dans la liste
4. Tester la connexion

### **Vérifier les composants UI**
1. Vérifier que Tailwind CSS fonctionne
2. Vérifier que les composants Radix UI s'affichent
3. Vérifier la responsivité sur mobile

## 🐛 **Dépannage Courant**

### **Erreur "Database connection failed"**
```bash
# Vérifier l'URL de connexion
echo $DATABASE_URL

# Tester la connexion manuellement
npx prisma db push

# Vérifier que PostgreSQL est démarré
sudo systemctl status postgresql  # Linux
brew services list | grep postgresql  # macOS
```

### **Erreur "NextAuth secret not configured"**
```bash
# Vérifier que .env.local existe
ls -la .env.local

# Vérifier le contenu
cat .env.local | grep NEXTAUTH_SECRET

# Redémarrer le serveur après modification
npm run dev
```

### **Erreur "Module not found"**
```bash
# Nettoyer le cache
rm -rf .next
rm -rf node_modules

# Réinstaller les dépendances
npm install

# Redémarrer
npm run dev
```

### **Problèmes de build**
```bash
# Vérifier TypeScript
npx tsc --noEmit

# Vérifier ESLint
npm run lint

# Nettoyer et rebuilder
npm run build
```

## 📱 **Configuration Mobile/Responsive**

### **Test sur appareils mobiles**
1. Utiliser les outils de développement du navigateur
2. Tester sur différents breakpoints
3. Vérifier la navigation tactile
4. Tester les formulaires sur mobile

### **Optimisations de performance**
```bash
# Analyser le bundle
npm run build
npm run start

# Vérifier les métriques Core Web Vitals
# Utiliser Lighthouse dans Chrome DevTools
```

## 🔄 **Mise à Jour du Projet**

### **Mettre à jour les dépendances**
```bash
# Vérifier les mises à jour disponibles
npm outdated

# Mettre à jour Prisma
npm update @prisma/client
npx prisma generate

# Mettre à jour Next.js
npm update next

# Vérifier la compatibilité
npm run build
```

### **Mettre à jour le schéma de base**
```bash
# Après modification du schema.prisma
npx prisma db push

# Ou créer une migration
npx prisma migrate dev --name nom_de_la_migration
```

## 📚 **Ressources Utiles**

- **Documentation Next.js** : [nextjs.org/docs](https://nextjs.org/docs)
- **Documentation Prisma** : [prisma.io/docs](https://prisma.io/docs)
- **Documentation Tailwind** : [tailwindcss.com/docs](https://tailwindcss.com/docs)
- **Documentation NextAuth** : [next-auth.js.org](https://next-auth.js.org)

## 🆘 **Support & Aide**

### **En cas de problème**
1. Vérifier ce guide de configuration
2. Consulter la documentation officielle
3. Vérifier les issues GitHub du projet
4. Créer une nouvelle issue avec :
   - Description du problème
   - Logs d'erreur
   - Configuration système
   - Étapes pour reproduire

---

**💡 Conseil** : Commencez toujours par une configuration minimale et ajoutez les fonctionnalités progressivement !
