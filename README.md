# Hangman

A Vue 3 + Vite Hangman game with an original whimsical-gothic visual system, responsive desktop/mobile layouts, category and difficulty filtering, animated SVG hangman models, virtual and physical keyboards, reveal-on-fail, and quirky word definitions.

## Run locally

```bash
npm install
npm run dev
```

## Build for GitHub Pages

```bash
npm run build
```

The Vite build outputs to `docs/`. The project keeps hash routing and `base: './'` for GitHub Pages project-site compatibility.

## Source architecture

```plaintext
src/
├─ assets/themes/            Original desktop/mobile/preview artwork
├─ components/
│  ├─ game/                  HUD, word, keyboard, and result UI
│  ├─ layout/                Shared application header
│  ├─ scene/                 Scene, frames, and SVG characters
│  ├─ theme/                 Theme picker
│  └─ ui/                    Reusable buttons, selects, and switches
├─ composables/              Gameplay and visual-preference behavior
├─ data/themeCatalog.js      Stable theme, character, and frame IDs
├─ styles/                   Global design tokens and base styles
└─ views/                    Route-level home and game pages
```

## Visual themes

The free catalog currently includes:

- `moonlit-cemetery`
- `pumpkin-lantern-alley`
- `bonewood-forest`

Every theme record has a permanent ID, desktop/mobile artwork, preview image, palette, default character, default frame, availability, and release metadata. Display names may change later, but stable IDs should not change because they are stored in local preferences and can support future shop ownership records.

### Add a theme

1. Add optimized WebP files under `src/assets/themes/<theme-id>/`:
   - `background-desktop.webp`
   - `background-mobile.webp`
   - `preview.webp`
2. Import the files in `src/data/themeCatalog.js`.
3. Add a theme catalog record with a unique permanent ID and palette.
4. Test desktop, mobile portrait, and mobile landscape layouts.

## Characters and hanging frames

Character SVG components are stored in:

```plaintext
src/components/scene/characters/
```

Frame SVG components are stored in:

```plaintext
src/components/scene/frames/
```

All models share one `800 × 600` scene coordinate system and a standard rope anchor so every released character can work with every released frame.

## Word data workflow

The app reads the final runtime word list from:

```plaintext
public/data/words.json
```

Editable source packs live in:

```plaintext
word-packs/
```

Rebuild the combined list with:

```bash
npm run build:words
```

`npm run dev` and `npm run build` run this automatically.

## Word entry format

```json
{
  "word": "EXAMPLE",
  "category": "TECHNOLOGY",
  "difficulty": "EASY",
  "definition": "A quirky one-sentence definition goes here."
}
```
