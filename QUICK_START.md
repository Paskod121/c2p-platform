# 🚀 Démarrage Rapide - C2P Platform

## ⚡ **En 5 Minutes**

### **1. Prérequis**
```bash
# Vérifier Node.js 18+
node --version

# Vérifier npm 9+
npm --version
```

### **2. Cloner et Installer**
```bash
git clone <votre-repo>
cd c2p-platform
npm install
```

### **3. Configuration Express**
```bash
# Créer .env.local
cp .env.example .env.local

# Configurer la base de données
echo 'DATABASE_URL="postgresql://user:pass@localhost:5432/c2p_platform"' >> .env.local

# Générer un secret NextAuth
echo 'NEXTAUTH_SECRET="votre-secret-ici"' >> .env.local
echo 'NEXTAUTH_URL="http://localhost:3000"' >> .env.local
```

### **4. Base de Données**
```bash
npx prisma generate
npx prisma db push
```

### **5. Lancer**
```bash
npm run dev
# Ouvrir http://localhost:3000
```

---

## 🔧 **Si Ça Ne Marche Pas**

### **Erreur PostCSS**
```bash
# Renommer le fichier
mv postcss.config.mjs postcss.config.js
```

### **Erreur Base de Données**
```bash
# Vérifier PostgreSQL
npx prisma db push
```

### **Erreur NextAuth**
```bash
# Vérifier .env.local
cat .env.local
```

---

## 📚 **Documentation Complète**

- **Configuration** : [SETUP.md](SETUP.md)
- **Dépannage** : [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md)
- **Environnement** : [docs/ENVIRONMENT.md](docs/ENVIRONMENT.md)
- **Contribution** : [CONTRIBUTING.md](CONTRIBUTING.md)
- **Roadmap** : [ROADMAP.md](ROADMAP.md)

---

## 🎯 **Prochaines Étapes**

1. **Explorer** l'interface utilisateur
2. **Tester** l'authentification
3. **Créer** votre premier cours
4. **Contribuer** au projet

---

**💡 Besoin d'aide ?** Consultez [docs/TROUBLESHOOTING.md](docs/TROUBLESHOOTING.md) !
