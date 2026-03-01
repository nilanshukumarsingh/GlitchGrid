<div align="center">

# ⚡ GlitchGrid

### _Tactical XO — Reinvented_

A premium, motion-rich Tic-Tac-Toe experience with multiple game modes, immersive themes, power-ups, and an unbeatable AI engine.

**React 19 · Framer Motion · TypeScript · Tailwind CSS · Howler.js**

---

</div>

## 🎮 Game Modes

| Mode         | Description                                                                           |
| ------------ | ------------------------------------------------------------------------------------- |
| **Classic**  | Standard Tic-Tac-Toe. Align 3 symbols to win.                                         |
| **Infinity** | Max 3 marks per player. Placing a 4th removes your oldest — plan your sequence!       |
| **Gravity**  | Marks fall to the lowest available row. Column-based vertical strategy is key.        |
| **Arcade**   | Tactical power-ups: **💣 Bomb** clears any cell, **❄️ Freeze** skips opponent's turn. |

## 🎨 Themes

| Theme                     | Aesthetic                                                  |
| ------------------------- | ---------------------------------------------------------- |
| **Neon City** (Cyberpunk) | Cyan & magenta neon glow, dark grid, pulsing light engine  |
| **Frost** (Glassmorphism) | Frosted glass panels, backdrop blur, soft indigo gradients |
| **8-Bit** (Retro)         | Pixel font, chunky borders, green phosphor terminal feel   |

Themes persist across sessions via `localStorage`.

## 🤖 AI Engine

- Minimax algorithm with depth-limited search
- Adapts to all game modes (Classic, Gravity, Infinity)
- Intelligent first-move optimization
- Difficulty: **Unbeatable** in Classic mode

## ✨ Features

- **Animated SVG Symbols** — X and O are path-drawn with spring physics
- **Hover Ghost Preview** — Semi-transparent preview of your next move
- **Neon Win Line** — Glowing, flickering SVG strike-through on victory
- **Victory Particles** — Confetti burst on win, themed to current palette
- **Magnetic Cells** — Subtle 3D tilt effect following cursor movement
- **Board Shake** — Haptic-style feedback on invalid moves
- **Dying Piece Indicator** — Pulsing warning on the piece about to vanish (Infinity mode)
- **Sound Effects** — 10 distinct sound events via Howler.js (click, win, lose, draw, fall, glitch, explosion, power-up, error, switch)
- **Mute Toggle** — Persistent audio preference
- **System Logs** — In-app changelog with expandable news cards
- **Responsive** — Fully playable on mobile, tablet, and desktop

## 🛠️ Tech Stack

| Technology                                   | Purpose                  |
| -------------------------------------------- | ------------------------ |
| [React 19](https://react.dev)                | UI framework             |
| [TypeScript](https://www.typescriptlang.org) | Type safety              |
| [Vite 6](https://vite.dev)                   | Build tool & dev server  |
| [Framer Motion](https://motion.dev)          | Animations & transitions |
| [Tailwind CSS](https://tailwindcss.com)      | Utility-first styling    |
| [Howler.js](https://howlerjs.com)            | Cross-browser audio      |

## 📁 Project Structure

```
├── App.tsx                  # Main game layout & UI
├── index.tsx                # React entry point
├── index.html               # HTML shell with Tailwind config
├── index.css                # Global styles & CSS variables
├── constants.ts             # Theme configs & sound URLs
├── types.ts                 # TypeScript type definitions
├── vite.config.ts           # Vite configuration
├── components/
│   ├── Board.tsx            # Game board with win-line SVG overlay
│   ├── Cell.tsx             # Interactive cell with magnetic hover
│   ├── Symbol.tsx           # Animated X and O SVG components
│   ├── Particles.tsx        # Victory confetti particle system
│   └── NewsCard.tsx         # Expandable changelog card
├── context/
│   ├── ThemeContext.tsx      # Theme state & CSS variable injection
│   └── SoundContext.tsx      # Global mute state
└── hooks/
    ├── useTicTacToe.ts      # Core game logic, AI, all mode rules
    └── useSound.ts          # Howler.js sound effect manager
```

## 🚀 Getting Started

**Prerequisites:** Node.js 18+

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The app runs at `http://localhost:3000` by default.

## 📜 License

MIT
