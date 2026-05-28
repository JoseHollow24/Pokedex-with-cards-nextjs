ReadMe.es.md# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev      # Start development server
npm run build    # Production build
npm run start    # Start production server
npm run lint     # Run ESLint (next/core-web-vitals)
```

No test runner is configured.

## Architecture

Next.js 14 App Router app (JavaScript, no TypeScript). Styling is Tailwind CSS. Path alias `@/*` maps to `./src/*`.

**Routing:**
- `/` — Home/search page
- `/[pokemonSingle]` — Pokémon detail (server component, fetches from PokeAPI)
- `/cards/[cardSingle]` — Card detail (server component, fetches from Pokemon TCG API)
- `/about` — About page

**Data sources:**
- PokeAPI (`https://pokeapi.co/api/v2/`) — Pokémon species/stats
- Pokemon TCG API (`https://api.pokemontcg.io/v2/`) — Trading card data

Data fetching splits into two patterns: page components are async server components that `fetch()` on the server, while `PokemonSearch.jsx` is a `'use client'` component that fetches on the client and passes results up via a `handlePokemonData` callback prop to the home page.

**State management:** Plain `useState` only — no Context, Redux, or Zustand.

**Internationalization:** i18next with English and Spanish translations, configured in `src/utils/i18n.js`.

**Type color mappings:** `src/components/typeColors.js` (Pokémon types) and `src/components/cardColors.js` (TCG card types) — update both when adding type support.

**Image domains** allowed in `next.config.mjs`: `images.pokemontcg.io` and `raw.githubusercontent.com`.
