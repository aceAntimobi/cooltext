# Emoji, Kaomoji & Symbol Aggregator

This project is a single-page, dependency-free web experience for browsing, searching, and copying emoji, kaomoji, and text symbols. It implements the product direction described in the [Emoji, Kaomoji & Symbol Aggregator PRD](docs/emoji-kaomoji-symbol-aggregator-prd.md) and runs entirely in the browser with no build tools required.

## Features

- Unified library split into Emoji, Kaomoji, and Symbol collections with clear category filters.
- Instant search across names, keywords, and characters.
- One-tap copy actions with toast feedback and automatic "Recently Used" tracking.
- Favorite any item to pin it for quick access (stored locally via `localStorage`).
- Responsive layout with a mobile-friendly navigation drawer and modal detail views.

## Getting Started

Because the site is built with plain HTML, CSS, and JavaScript, you can open it directly:

1. Double-click `index.html` (or open it with your preferred browser).
2. Optionally, serve the folder locally if you need clipboard access in some browsers:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

All personalization data (favorites and recent items) is stored in the browser. Clearing site storage will reset those lists.

### GitHub Pages

If you are hosting the project with GitHub Pages configured to serve the `docs/` directory, the published page will load `docs/index.html`, which points to the same assets as the root `index.html`.
