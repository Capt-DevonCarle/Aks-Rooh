# Aks Rooh — Frontend

A private soul-garden journal — a calm, nocturnal space for personal reflections, mood tracking, and gentle AI-powered insights.

> *"A quiet moment for you. Leave a thought, a feeling, or a small moment exactly as it is."*

## Features

- **Journal** — Write reflections with mood tracking (1–5 scale)
- **Insights** — Personalised mood analytics, trend visualisation, recurring themes, word frequency, and context-aware suggestions
- **Soul Garden** — A visual garden that grows with every reflection (trees, fireflies, emoji flowers)
- **Profile** — View stats and manage your account

## Tech Stack

- **React 18** with functional components and hooks
- **Tailwind CSS** for utility-first styling
- **Custom CSS** with dark theme, animations, and gradients
- **PostCSS** + Autoprefixer
- **React Scripts** (Create React App)

## Getting Started

```bash
# Install dependencies
npm install

# Start the development server (runs on http://localhost:3000)
npm start

# Build for production
npm run build
```

## Environment

Create a `.env` file in the `frontend/` directory (optional):

```env
REACT_APP_API_URL=http://127.0.0.1:4000/api
```

If not set, the app defaults to `http://127.0.0.1:4000/api`.

## Pages

| Route / View     | Description                                     |
|------------------|-------------------------------------------------|
| `Auth`           | Login / Register screen                         |
| `Journal`        | Write reflections + mood + entry list           |
| `Insights`       | Mood rhythm, trends, themes, personalised copy  |
| `Garden`         | Visual garden that grows with entries           |
| `Profile`        | Account info, stats, sign out                   |

## Structure

```
src/
├── App.jsx                 # Main app with all views
├── index.js                # Entry point
├── components/
│   ├── Layout.jsx          # Root layout wrapper
│   ├── JournalEntryForm.jsx# Reflection input
│   ├── EntryList.jsx       # Entry cards
│   └── NatureBackground.jsx# Animated night backdrop
├── services/
│   └── api.js              # API client
└── styles/
    └── index.css           # Tailwind + custom styles
```

## Design Notes

- Dark, nocturnal theme with warm gold accents
- "Soul garden" metaphor throughout
- All text is poetic and compassionately toned
- Private by design — no external data sharing
- Offers reflective support, not medical/psychological diagnosis

---

> Built with care. Aks Rooh is a space for your inner world.

