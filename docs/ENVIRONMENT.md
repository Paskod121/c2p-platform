# ⚙️ Configuration de l'Environnement - C2P Platform

## 📋 **Variables d'Environnement Requises**

Créez un fichier `.env.local` à la racine du projet avec les variables suivantes :

### **🔐 Variables Obligatoires**

```env
# Base de données PostgreSQL
DATABASE_URL="postgresql://username:password@localhost:5432/c2p_platform"

# NextAuth.js
NEXTAUTH_SECRET="votre-secret-ici"
NEXTAUTH_URL="http://localhost:3000"
```

### **🔑 Variables Optionnelles**

```env
# Authentification GitHub
GITHUB_ID="votre-github-client-id"
GITHUB_SECRET="votre-github-client-secret"

# Authentification Google
GOOGLE_CLIENT_ID="votre-google-client-id"
GOOGLE_CLIENT_SECRET="votre-google-client-secret"

# Environnement
NODE_ENV="development"
```

## 🚀 **Configuration Rapide**

### **1. Créer le fichier .env.local**
```bash
# À la racine du projet
cp .env.example .env.local
# ou créer manuellement
touch .env.local
```

### **2. Configurer la base de données**
```env
DATABASE_URL="postgresql://username:password@localhost:5432/c2p_platform"
```

### **3. Générer un secret NextAuth**
```bash
# Sur Linux/macOS
openssl rand -base64 32

# Sur Windows (PowerShell)
[System.Web.Security.Membership]::GeneratePassword(32, 10)
```

### **4. Configurer NextAuth**
```env
NEXTAUTH_SECRET="votre-secret-généré"
NEXTAUTH_URL="http://localhost:3000"
```

## 🗄️ **Configuration de la Base de Données**

### **Option 1 : Base locale**
```env
DATABASE_URL="postgresql://c2p_user:password@localhost:5432/c2p_platform"
```

### **Option 2 : Base cloud (Neon)**
```env
DATABASE_URL="postgresql://user:password@ep-xxx.region.aws.neon.tech/dbname?sslmode=require"
```

### **Option 3 : Base cloud (Supabase)**
```env
DATABASE_URL="postgresql://postgres:password@db.xxx.supabase.co:5432/postgres"
```

## 🔐 **Configuration de l'Authentification**

### **GitHub OAuth**
1. Aller sur [GitHub Settings > Developer settings > OAuth Apps](https://github.com/settings/developers)
2. Créer une nouvelle OAuth App
3. Configurer :
   - **Application name** : C2P Platform Dev
   - **Homepage URL** : http://localhost:3000
   - **Authorization callback URL** : http://localhost:3000/api/auth/callback/github
4. Copier le Client ID et Client Secret
5. Ajouter dans `.env.local` :
   ```env
   GITHUB_ID="votre-github-client-id"
   GITHUB_SECRET="votre-github-client-secret"
   ```

### **Google OAuth**
1. Aller sur [Google Cloud Console](https://console.cloud.google.com/)
2. Créer un nouveau projet
3. Activer l'API Google+ API
4. Créer des identifiants OAuth 2.0
5. Ajouter les URIs de redirection autorisés

## 🧪 **Test de Configuration**

### **1. Vérifier la base de données**
```bash
npx prisma generate
npx prisma db push
```

### **2. Lancer le serveur**
```bash
npm run dev
```

### **3. Vérifier l'authentification**
- Aller sur http://localhost:3000
- Tester la connexion avec GitHub/Google

## 🚨 **Sécurité**

### **⚠️ Ne jamais commiter**
- `.env.local`
- `.env.production`
- Fichiers contenant des secrets

### **✅ Fichiers sécurisés**
- `.env.example` (template sans secrets)
- `.env.local` (secrets locaux)
- `.env.production` (secrets production)

## 🔧 **Dépannage**

### **Erreur "Database connection failed"**
```bash
# Vérifier l'URL de connexion
echo $DATABASE_URL

# Tester la connexion
npx prisma db push
```

### **Erreur "NextAuth secret not configured"**
```bash
# Vérifier que .env.local existe
ls -la .env.local

# Vérifier le contenu
cat .env.local | grep NEXTAUTH_SECRET
```

### **Erreur "Module not found"**
```bash
# Nettoyer le cache
rm -rf .next
npm run dev
```

## 📚 **Ressources**

- [Documentation NextAuth.js](https://next-auth.js.org/configuration)
- [Documentation Prisma](https://www.prisma.io/docs/concepts/database-connectors)
- [Documentation PostgreSQL](https://www.postgresql.org/docs/)
- [Guide de configuration](SETUP.md)

---

**💡 Conseil** : Commencez avec une configuration minimale et ajoutez les fonctionnalités progressivement !
