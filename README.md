# Emoji, Kaomoji & Symbol Aggregator

This project delivers a responsive front-end experience for browsing, searching, and copying emoji, kaomoji, and text symbols. It implements the product requirements captured in the [Emoji, Kaomoji & Symbol Aggregator PRD](docs/emoji-kaomoji-symbol-aggregator-prd.md).

## Features

- Unified library split into Emoji, Kaomoji, and Symbol collections with clear category filters.
- Instant search across names, keywords, and characters.
- One-tap copy actions with feedback and automatic "Recently Used" tracking.
- Favorite any item to pin it for quick access (stored locally via `localStorage`).
- Responsive layout with a mobile-friendly navigation drawer and modal detail views.

## Getting Started

```bash
npm install
npm run dev # starts Vite on http://localhost:5173
```

### Production Build

```bash
npm run build
npm run preview
```

All personalization data (favorites and recent items) is stored entirely in the browser.
