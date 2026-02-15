# 🏛️ ARCHAEOS - Εξερευνώ την Αρχαία Ελλάδα

An interactive educational web application for children aged 9-15 to explore Ancient Greece through an interactive map, quizzes, and gamification.

![ARCHAEOS](https://img.shields.io/badge/Next.js-15-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5.7-blue?style=for-the-badge&logo=typescript)
![Leaflet](https://img.shields.io/badge/Leaflet-1.9-green?style=for-the-badge&logo=leaflet)

---

## ✨ Features

- 🗺️ **Interactive Map** - Explore Greece with Leaflet and OpenStreetMap (100% free!)
- 🏛️ **16 Archaeological Sites** - Parthenon, Delphi, Knossos, Olympia, Mycenae, Epidaurus, Acropolis, Sounion, Vergina, Meteora, Delos, Corinth, Messene, Philippi, Akrotiri, Abdera
- 📚 **Educational Quizzes** - 3 questions per monument to earn XP
- 🤖 **Virtual Guide** - An avatar that guides you through your journey
- 🎯 **Reward System** - Earn XP and conquer monuments
- 🎨 **Beautiful UI** - Modern design with ancient Greek aesthetics
- 🌍 **No API Keys Required** - Completely free and open source!

---

## 📋 Prerequisites

- **Node.js 18+** (Required)
- **npm** or **yarn** (Comes with Node.js)
- **Git** (To clone the repository)

---

## 🚀 Installation & Running

### **For Linux Users**

#### 1. **Install Node.js (if not already installed)**

```bash
# Check if Node.js is installed
node --version

# If not installed or version < 18, install using nvm:
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.0/install.sh | bash
source ~/.bashrc
nvm install 18
nvm use 18
```

#### 2. **Clone the Repository**

```bash
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/archaeos.git
cd archaeos
```

#### 3. **Install Dependencies**

```bash
npm install
```

#### 4. **Run Development Server**

```bash
npm run dev
```

#### 5. **Open in Browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

### **For Windows Users**

#### 1. **Install Node.js**

- Download Node.js 18+ from [nodejs.org](https://nodejs.org/)
- Run the installer (`.msi` file)
- Follow the installation wizard
- Verify installation:
  ```cmd
  node --version
  npm --version
  ```

#### 2. **Install Git (if not already installed)**

- Download Git from [git-scm.com](https://git-scm.com/download/win)
- Run the installer and follow the wizard

#### 3. **Clone the Repository**

Open **Command Prompt** or **PowerShell**:

```cmd
# Clone from GitHub
git clone https://github.com/YOUR_USERNAME/archaeos.git
cd archaeos
```

#### 4. **Install Dependencies**

```cmd
npm install
```

#### 5. **Run Development Server**

```cmd
npm run dev
```

#### 6. **Open in Browser**

Navigate to [http://localhost:3000](http://localhost:3000)

---

## 🎮 How to Play

1. **Start the Adventure** - Click "Ξεκίνα την Περιπέτεια!" on the landing page
2. **Select a Monument** - Click on a marker on the map
3. **Read the History** - Learn about the archaeological site
4. **Take the Quiz** - Answer 3 questions about the monument
5. **Earn XP** - Get 2/3 correct answers to earn +100 XP
6. **Conquer All Sites** - Visit all 16 monuments and become a master explorer!

---

## 📁 Project Structure

```
archaeos/
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root layout with metadata
│   │   ├── page.tsx                # Landing page
│   │   ├── play/
│   │   │   └── page.tsx            # Game/map page
│   │   └── globals.css             # Global styles
│   ├── components/
│   │   ├── MapComponent.tsx        # Leaflet map with markers
│   │   ├── AvatarOverlay.tsx       # Virtual guide avatar
│   │   ├── SiteDrawer.tsx          # Monument information drawer
│   │   ├── QuizComponent.tsx       # Quiz system
│   │   └── ConfettiEffect.tsx      # Success celebration effect
│   ├── store/
│   │   └── useGameStore.ts         # Zustand state management
│   ├── data/
│   │   └── sites.ts                # Archaeological sites data
│   └── types/
│       └── index.ts                # TypeScript type definitions
├── public/
│   └── images/                     # Local site images
├── package.json                    # Dependencies and scripts
├── tailwind.config.ts              # Tailwind CSS configuration
├── next.config.js                  # Next.js configuration
└── tsconfig.json                   # TypeScript configuration
```

---

## 🛠️ Technology Stack

| Technology | Purpose |
|------------|---------|
| **Next.js 15** | React framework with App Router |
| **TypeScript** | Type-safe JavaScript |
| **Tailwind CSS** | Utility-first CSS framework |
| **Zustand** | Lightweight state management |
| **Leaflet** | Interactive map library |
| **React-Leaflet** | React components for Leaflet |
| **OpenStreetMap** | Free map tiles (no API key needed!) |
| **Lucide React** | Beautiful icon library |
| **canvas-confetti** | Celebration effects |

---

## 📜 Available Scripts

```bash
# Development server (with hot reload)
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

---

## 🐛 Troubleshooting

### **"Cannot find module 'leaflet'" or similar errors**

```bash
# Delete node_modules and reinstall
rm -rf node_modules package-lock.json  # Linux
# OR
rmdir /s node_modules & del package-lock.json  # Windows

npm install
```

### **Map doesn't appear**

1. Check your internet connection (required for map tiles)
2. Hard refresh the page (Ctrl+Shift+R or Cmd+Shift+R)
3. Check browser console for errors (F12)

### **Port 3000 already in use**

```bash
# Linux: Find and kill the process
lsof -ti:3000 | xargs kill -9

# Windows: Find and kill the process
netstat -ano | findstr :3000
taskkill /PID <PID_NUMBER> /F

# Or use a different port
npm run dev -- -p 3001
```

### **Node.js version error**

Make sure you're using Node.js 18 or higher:

```bash
node --version  # Should show v18.x.x or higher
```

---

## 🎨 Design Philosophy

- **Greek Aesthetics** - Inspired by ancient Greek art and architecture
- **Educational First** - Focus on learning through interaction
- **Accessibility** - ARIA labels, keyboard navigation, focus states
- **Responsive Design** - Works on desktop, tablet, and mobile
- **Performance** - Optimized images and lazy loading

### Color Palette

- **Azure Blue** - `#004e98` (Mediterranean Sea)
- **Gold** - `#f1c40f` (Ancient treasures)
- **Parchment** - `#fdfbf7` (Ancient scrolls)
- **Purple** - `#6b46c1` (Royal heritage)

---

## 🌍 Credits & Acknowledgments

- **Maps** - © [OpenStreetMap](https://www.openstreetmap.org/copyright) contributors
- **Map Library** - [Leaflet](https://leafletjs.com/) - Open-source JavaScript library
- **Tiles** - OpenStreetMap tile servers
- **Fonts** - Google Fonts (Cinzel, Inter)
- **Icons** - [Lucide](https://lucide.dev/)

---

## 📄 License

MIT License - Free for educational use

---

## 🤝 Contributing

This is an educational project. Contributions, issues, and feature requests are welcome!

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 👨‍💻 Author

Created with ❤️ for educating children about Ancient Greek History

---

## 🔮 Future Enhancements

- [ ] More archaeological sites (30+ total)
- [ ] Achievement system with badges
- [ ] Multiplayer mode
- [ ] Progress saving (local storage / database)
- [ ] 3D monument models
- [ ] Audio narration
- [ ] Offline mode with cached tiles
- [ ] Mobile app (React Native)

---

## 📞 Support

If you encounter any issues or have questions:

1. Check the [Troubleshooting](#-troubleshooting) section
2. Open an issue on GitHub
3. Check existing issues for solutions

---

**Enjoy exploring Ancient Greece! 🏛️✨**
