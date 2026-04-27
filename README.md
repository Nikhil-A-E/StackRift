# 🎮 StackRift

> **Stack · Slice · Survive** — A hyper-casual 3D block stacking game built entirely in the browser.

[![Play Now](https://img.shields.io/badge/🎮_StackRift-Play%20Now-blueviolet?style=for-the-badge)](https://stackrift.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)
![No Dependencies](https://img.shields.io/badge/dependencies-none-brightgreen?style=flat-square)

### 🌐 [▶ Play StackRift Live](https://stackrift.netlify.app)

---

## 🕹️ How to Play

1. Blocks move horizontally across the platform
2. **Click**, **tap**, or press **Spacebar** to drop the block
3. Land it on the stack — the overhanging part gets sliced off
4. Keep stacking! Miss the platform entirely and it's **game over**
5. Chase perfect placements to build combos and bonus points

---

## ✨ Features

### Core Gameplay
- 🧱 Precise block stacking with real-time overlap detection
- ✂️ Dynamic block slicing — overhanging parts fall away with physics
- 📈 Progressive difficulty — speed increases with each successful stack
- 🔄 Alternating movement axes (X and Z) for added challenge

### Visual Effects
- 🌈 Neon glow aesthetic with color-shifting blocks
- 💥 Particle burst effects on block cuts
- 📸 Screen shake on block landing
- 🎬 Smooth bounce animations for placed blocks
- 🌑 Dark cinematic background with ACES filmic tone mapping

### Audio
- 🔊 Synthesized sound effects (Web Audio API — no external files)
- 🎵 Unique sounds for drops, cuts, perfect placements, and game over
- 🎶 Ascending arpeggio chimes for combo streaks

### Combo System
- ⭐ **NICE** — 2x perfect placements
- 🌟 **PERFECT** — 3-4x streak
- 💫 **INSANE** — 5x+ streak
- 🏆 Bonus points for every combo hit

### Leaderboard & Scores
- 📊 Local leaderboard with top 10 scores
- 🏅 Gold, silver, bronze rank indicators
- 💾 Name entry — remembers your last used name
- 📅 Score history with dates
- 🔒 All data stored locally in `localStorage` — no server required

### Controls
| Input | Action |
|-------|--------|
| 🖱️ Mouse Click | Drop block |
| ⌨️ Spacebar | Drop block |
| 📱 Touch | Drop block (mobile) |

---

## 🚀 Quick Start

### Option 1: Open directly
Just double-click `index.html` in your browser — that's it!

### Option 2: Local server
```bash
npx -y http-server . -p 8080
```
Then visit [http://localhost:8080](http://localhost:8080)

### Option 3: Deploy to Netlify
1. Fork this repo
2. Connect to [Netlify](https://netlify.com)
3. Set publish directory to `/`
4. Deploy — done! ✅

---

## 🛠️ Tech Stack

| Technology | Purpose |
|-----------|---------|
| **Three.js r128** | 3D rendering engine |
| **Web Audio API** | Synthesized sound effects |
| **localStorage** | Score persistence & leaderboard |
| **Vanilla JS** | Game logic — zero dependencies |
| **CSS3** | UI overlays, animations, glassmorphism |

---

## 📁 Project Structure

```
StackRift/
├── index.html      # Complete game (HTML + CSS + JS)
├── README.md       # This file
└── LICENSE         # MIT License
```

> The entire game is contained in a single `index.html` file — no build step, no bundler, no framework.

---

## 🎨 Design Philosophy

- **Minimalistic 3D** — Clean geometry with neon accent lighting
- **Dark mode first** — Easy on the eyes, dramatic visuals
- **Hyper-casual feel** — One-tap controls, instant restarts, addictive feedback loop
- **Zero friction** — No install, no signup, no loading — just play

---

## 📱 Browser Support

| Browser | Support |
|---------|---------|
| Chrome | ✅ Full |
| Firefox | ✅ Full |
| Safari | ✅ Full |
| Edge | ✅ Full |
| Mobile Chrome | ✅ Touch |
| Mobile Safari | ✅ Touch |

---

## 🤝 Contributing

Contributions are welcome! Feel free to:
- 🐛 Report bugs
- 💡 Suggest features
- 🔀 Submit pull requests

---

## 📄 License

This project is licensed under the **MIT License** — see the [LICENSE](LICENSE) file for details.

---

## 👨‍💻 Author

**Nikhil A E**
- GitHub: [@Nikhil-A-E](https://github.com/Nikhil-A-E)

---

<p align="center">
  <b>⬆️ Stack higher. Slice cleaner. Survive longer.</b><br>
  <i>Built with ❤️ and Three.js</i>
</p>
