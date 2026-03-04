export type Player = 'X' | 'O';
export type SquareValue = Player | null;

export interface WinState {
  winner: Player | 'Draw' | null;
  line: number[] | null;
}

export type ThemeMode = 'cyberpunk' | 'glass' | 'retro';
export type GameRules = 'classic' | 'infinity' | 'gravity' | 'arcade';

export interface ThemeConfig {
  id: ThemeMode;
  name: string;
  font: string;
  colors: {
    bg: string;
    bgGradient?: string;
    primary: string;
    secondary: string;
    accent: string;
    text: string;
    muted: string;
  };
}

export type Opponent = 'PvP' | 'PvCPU';

export interface Move {
  player: Player;
  index: number;
}

export interface PowerUps {
  bomb: number;
  freeze: number;
}
