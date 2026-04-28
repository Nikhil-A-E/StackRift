# 🎮 StackRift

> **Stack · Slice · Survive** — A hyper-casual 3D block stacking game with global competitive rankings.

[![Play Now](https://img.shields.io/badge/🎮_StackRift-Play%20Now-blueviolet?style=for-the-badge)](https://stackrift.netlify.app)
[![License](https://img.shields.io/badge/license-MIT-green?style=flat-square)](LICENSE)
![Three.js](https://img.shields.io/badge/Three.js-r128-black?style=flat-square&logo=three.js)
![Firebase](https://img.shields.io/badge/Backend-Firebase-orange?style=flat-square&logo=firebase)

### 🌐 [▶ Play StackRift Live](https://stackrift.netlify.app)

---

## 🕹️ How to Play

1. Blocks move horizontally across the platform.
2. **Click**, **tap**, or press **Spacebar** to drop the block.
3. Land it on the stack — the overhanging part gets sliced off.
4. Keep stacking! Miss the platform entirely and it's **game over**.
5. **Compete Globally:** Sign up to save your scores to the global cloud leaderboard!

---

## ✨ New Features

### 🏆 Global Leaderboard
- Real-time global rankings powered by Firebase.
- Compete with players worldwide.
- High-score persistence even for guests (stored locally until cloud sync).

### ☁️ Cloud Sync & Auth
- **User Accounts:** Create an account to secure your rank and username.
- **Cross-Device:** Access your scores from any device once logged in.
- **Guest Support:** Save scores as a guest with a custom display name.

### 🛠️ Enhanced Tech Stack
- **Serverless Backend:** Netlify Functions (Node.js) handling secure score submission.
- **Database:** Firebase Firestore for high-performance global rankings.
- **Authentication:** Firebase Auth for secure user management.

---

## 📁 Project Structure

```
StackRift/
├── index.html          # Main Game UI & Logic
├── css/
│   └── auth.css        # Authentication UI Styling
├── js/
│   ├── auth.js         # Firebase Auth & Profile Logic
│   ├── firebase-config.js # Client-side Firebase Init
│   ├── leaderboard.js  # Leaderboard Rendering Logic
│   └── score-submit.js # Score API Wrapper
├── netlify/
│   └── functions/      # Secure Serverless Backend
│       ├── get-leaderboard.js
│       ├── signup.js
│       └── submit-score.js
├── netlify.toml        # Netlify Configuration
└── README.md
```

---

## 🚀 Deployment Guide

To deploy your own version of StackRift with the global leaderboard:

### 1. Firebase Setup
1. Create a project at [Firebase Console](https://console.firebase.google.com/).
2. Enable **Firestore Database** and **Authentication** (Email/Password).
3. Create a Service Account (Project Settings > Service Accounts) and download the JSON key.
4. Get your Client SDK config (Project Settings > General > Web Apps).

### 2. Environment Variables
Add these to your Netlify Site Settings (Build & Deploy > Environment):
- `FIREBASE_PROJECT_ID`
- `FIREBASE_CLIENT_EMAIL`
- `FIREBASE_PRIVATE_KEY` (The full private key from the JSON)
- `FIREBASE_API_KEY` (For client-side config)

### 3. Deploy to Netlify
**Option A: Netlify CLI (Recommended)**
```bash
npm install -g netlify-cli
netlify login
netlify init
netlify deploy --prod
```

**Option B: GitHub Integration**
Simply push your code to a GitHub repository and connect it to Netlify. It will automatically detect the `netlify/functions` and the `index.html`.

---

## 👨‍💻 Author

**Nikhil A E**
- GitHub: [@Nikhil-A-E](https://github.com/Nikhil-A-E)

---

<p align="center">
  <b>⬆️ Stack higher. Slice cleaner. Survive longer.</b><br>
  <i>Built with ❤️, Three.js, and Netlify</i>
</p>
