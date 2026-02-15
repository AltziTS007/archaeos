# Quick Start Guide for ARCHAEOS

## 📦 For Your Friend on Windows

### Step 1: Install Prerequisites
1. **Download and install Node.js 18+**
   - Go to https://nodejs.org/
   - Download the LTS version (Windows Installer .msi)
   - Run the installer and follow the wizard
   - Restart your computer after installation

2. **Download and install Git**
   - Go to https://git-scm.com/download/win
   - Download and run the installer
   - Use default settings

### Step 2: Clone and Run
1. **Open Command Prompt** (Press Win+R, type `cmd`, press Enter)

2. **Clone the repository:**
   ```cmd
   git clone https://github.com/YOUR_USERNAME/archaeos.git
   cd archaeos
   ```

3. **Install dependencies:**
   ```cmd
   npm install
   ```
   (This will take 2-3 minutes)

4. **Start the app:**
   ```cmd
   npm run dev
   ```

5. **Open your browser:**
   - Go to http://localhost:3000
   - Enjoy exploring Ancient Greece! 🏛️

### Troubleshooting
- **"node is not recognized"** → Restart your computer after installing Node.js
- **Port 3000 in use** → Run `npm run dev -- -p 3001` instead
- **Installation errors** → Delete `node_modules` folder and run `npm install` again

---

## 🐧 For Linux Users

### Quick Commands:
```bash
# Clone the repository
git clone https://github.com/YOUR_USERNAME/archaeos.git
cd archaeos

# Install dependencies
npm install

# Run the app
npm run dev

# Open browser at http://localhost:3000
```

That's it! 🎉

---

## 📤 Uploading to GitHub

### First Time Setup:
```bash
cd /home/altzi/edu_app

# Initialize git (if not already done)
git init

# Add all files
git add .

# Commit
git commit -m "Initial commit: ARCHAEOS educational app"

# Create repository on GitHub (via web interface)
# Then connect and push:
git remote add origin https://github.com/YOUR_USERNAME/archaeos.git
git branch -M main
git push -u origin main
```

### After Making Changes:
```bash
git add .
git commit -m "Description of changes"
git push
```

---

## 🌐 Sharing the Link

Once uploaded to GitHub, share this link with your friend:
```
https://github.com/YOUR_USERNAME/archaeos
```

They can then follow the Windows instructions above to run it locally!
