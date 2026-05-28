# CLAUDE.es.md

Este archivo proporciona orientación a Claude Code (claude.ai/code) al trabajar con el código de este repositorio.

## Comandos

```bash
npm run dev      # Iniciar servidor de desarrollo
npm run build    # Compilar para producción
npm run start    # Iniciar servidor de producción
npm run lint     # Ejecutar ESLint (next/core-web-vitals)
```

No hay un runner de pruebas configurado.

## Arquitectura

Aplicación Next.js 14 con App Router (JavaScript, sin TypeScript). Los estilos usan Tailwind CSS. El alias de ruta `@/*` apunta a `./src/*`.

**Rutas:**
- `/` — Página principal/búsqueda
- `/[pokemonSingle]` — Detalle de Pokémon (componente servidor, consume PokeAPI)
- `/cards/[cardSingle]` — Detalle de carta (componente servidor, consume Pokemon TCG API)
- `/about` — Página acerca de

**Fuentes de datos:**
- PokeAPI (`https://pokeapi.co/api/v2/`) — Especies y estadísticas de Pokémon
- Pokemon TCG API (`https://api.pokemontcg.io/v2/`) — Datos de cartas coleccionables

El fetching de datos se divide en dos patrones: los componentes de página son componentes servidor asíncronos que hacen `fetch()` en el servidor, mientras que `PokemonSearch.jsx` es un componente cliente (`'use client'`) que obtiene datos en el cliente y los sube mediante una prop callback `handlePokemonData` a la página principal.

**Manejo de estado:** Solo `useState` — sin Context, Redux ni Zustand.

**Internacionalización:** i18next con traducciones en inglés y español, configurado en `src/utils/i18n.js`.

**Mapeo de colores por tipo:** `src/components/typeColors.js` (tipos de Pokémon) y `src/components/cardColors.js` (tipos de cartas TCG) — actualizar ambos al agregar soporte para nuevos tipos.

**Dominios de imagen** permitidos en `next.config.mjs`: `images.pokemontcg.io` y `raw.githubusercontent.com`.
