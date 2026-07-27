[README.md](https://github.com/user-attachments/files/30405480/README.md)
# Aks Rooh — Your Private Soul Garden

**Aks Rooh** is a private, offline-first reflection journal with a living visual garden that grows with your entries. Each reflection you write nurtures a plant that evolves through the seasons — **Spring blossoms**, **Summer lushness**, **Autumn gold**, or **Winter frost** — matching your device's calendar.

> *"A garden of small understandings."*

---

## Features

| Feature | Description |
|---|---|
| **🌿 Living Garden** | An animated SVG plant that grows from seed → sprout → seedling → bush → tree as you write more reflections |
| **🌸 Seasonal Themes** | Colors, flowers, and foliage change automatically with the real season — Spring pink blossoms, Autumn yellow leaves, Winter ice & berries |
| **🌗 Day / Night Modes** | **Day mode**: Dark green background with golden fireflies. **Night mode**: Deep purple background with silver fireflies. The plant glows softly at night |
| **📝 Reflection Journal** | Write, save, and delete journal entries with mood tracking (1–5 scale) |
| **📊 Personal Insights** | AI-powered mood analysis, writing streaks, word counts, preferred writing times, theme detection, and gentle suggestions |
| **🔒 Private by Design** | Your data stays yours. JWT-authenticated API, SQLite database, no third-party tracking |
| **🎨 Green-Blue-Purple Aesthetic** | A cohesive color palette inspired by nature at twilight |

### Growth Stages

| Reflections | Stage | Visual |
|---|---|---|
| 0 | 🌰 Seed | A single seed resting in the soil |
| 1–2 | 🌱 Sprout | Two tiny swaying leaves emerge |
| 3–5 | 🌿 Seedling | Multiple leaves, branches, and a bud |
| 6–10 | 🌳 Bush | Full bushy plant with blooming flowers |
| 11+ | 🌲 Tree | A mighty tree with layered canopy |

---

## 🚀 Quick Start

### Prerequisites

- **Node.js** v18+ (download from [nodejs.org](https://nodejs.org/))

### One-Click Launch (Windows)

Double-click **`start.bat`** — it will:

1. Check for Node.js
2. Auto-generate a `JWT_SECRET` if missing
3. Install backend & frontend dependencies
4. Start the API server on `http://localhost:4000`
5. Start the React app on `http://localhost:3000`

### Manual Setup

```bash
# 1. Clone the repository
git clone https://github.com/yourusername/aks-rooh.git
cd aks-rooh

# 2. Backend setup
cd backend
cp .env.example .env      # Edit JWT_SECRET and PORT if desired
npm install
npm run dev               # Starts on http://localhost:4000

# 3. Frontend setup (in a new terminal)
cd frontend
npm install
npm start                 # Starts on http://localhost:3000
```

---

## 🏗 Project Structure

```
aks-rooh/
├── backend/                  # Express.js API server
│   ├── data/                 # SQLite database (auto-created)
│   ├── src/
│   │   ├── middleware/       # Auth & validation middleware
│   │   └── services/         # Business logic (insights, etc.)
│   ├── package.json
│   └── .env.example          # Environment template
│
├── frontend/                 # React.js client (Create React App)
│   ├── public/
│   │   ├── assets/
│   │   │   └── images/       # Leaf, star, tree SVGs
│   │   └── index.html
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Garden.jsx        # 🌱 Animated plant (star of the app)
│   │   │   ├── NatureBackground.jsx  # ✨ Fireflies & ambient bg
│   │   │   ├── Layout.jsx         # Theme-aware page wrapper
│   │   │   ├── JournalEntryForm.jsx
│   │   │   ├── EntryList.jsx
│   │   │   └── ...
│   │   ├── styles/
│   │   │   ├── index.css      # Global styles & Tailwind
│   │   │   └── animations.css # Custom keyframes
│   │   ├── services/
│   │   │   └── api.js         # API client
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── package.json
│   └── tailwind.config.js
│
├── start.bat                  # Windows one-click launcher
└── README.md
```

---

## Theme System

The app uses a **green-blue-purple** aesthetic with two distinct modes:

### 🌙 Night Mode
| Element | Color |
|---|---|
| Background | `#1a0a2e` (deep purple) |
| Text | `#c0c0d0` (silver-gray) |
| Fireflies | Silver with white glow |
| Plant Glow | Pulsing silver drop-shadow |

### ☀️ Day Mode
| Element | Color |
|---|---|
| Background | `#1a3a2a` (dark green) |
| Text | `#d4c8a0` (warm gold) |
| Fireflies | Golden with amber glow |
| Plant | Natural, no glow |

---

## Seasonal Color Palettes

The plant adapts its colors based on `new Date().getMonth()`:

| Season | Months | Stem | Leaf | Flower | Accent |
|---|---|---|---|---|---|
| **Spring** | Mar–May | `#3a7a5a` | `#5a9a7a` | Pink `#d4a0c8` | Purple `#b080c0` |
| **Summer** | Jun–Aug | `#2a7a4a` | `#4a9a6a` | Orange `#e08050` | Coral `#d06050` |
| **Autumn** | Sep–Nov | `#7a5a3a` | `#c08a3a` | Rust `#b84a2a` | Gold `#d0903a` |
| **Winter** | Dec–Feb | `#3a5a6a` | `#5a8a9a` | Ice `#b0c8d8` | Sky `#80b8d0` |

---

## Insights Engine

The backend analyses your journal entries to surface:

- **Mood rhythm** — Average mood, trend direction, most frequent mood
- **Writing patterns** — Streak, preferred time of day, word counts
- **Recurring themes** — Detected from entry text
- **Gentle suggestions** — Context-aware prompts based on your writing habits
- **Garden whispers** — A personalized response to your latest entry

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 18, Tailwind CSS, SVG animations |
| **Backend** | Node.js, Express.js |
| **Database** | SQLite (via better-sqlite3) |
| **Auth** | JWT (JSON Web Tokens) |
| **Styling** | Tailwind CSS + custom CSS animations |

---

## Privacy

- All data is stored locally in an SQLite database on your server
- Authentication uses JWT — your password is never stored in plain text
- No external analytics, no third-party cookies, no data sharing
- The app works entirely offline once loaded

---

## License

MIT — feel free to fork, modify, and use for your own soul garden.

---

<p align="center">
  <em>✦ Your garden is in full bloom ✦</em>
</p>

