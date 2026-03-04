import { ThemeConfig } from './types';

export const THEMES: Record<string, ThemeConfig> = {
  cyberpunk: {
    id: 'cyberpunk',
    name: 'Neon City',
    font: 'font-cyber',
    colors: {
      bg: '#050505',
      primary: '#0ea5e9', // Cyan
      secondary: '#d946ef', // Magenta
      accent: '#22d3ee',
      text: '#ffffff',
      muted: '#1f2937',
    },
  },
  glass: {
    id: 'glass',
    name: 'Frost',
    font: 'font-glass',
    colors: {
      bg: '#e0e7ff',
      bgGradient: 'linear-gradient(135deg, #e0e7ff 0%, #c7d2fe 100%)',
      primary: '#4338ca', // Indigo
      secondary: '#4f46e5',
      accent: '#818cf8',
      text: '#1e1b4b',
      muted: 'rgba(255, 255, 255, 0.4)',
    },
  },
  retro: {
    id: 'retro',
    name: '8-Bit',
    font: 'font-retro',
    colors: {
      bg: '#2d332d',
      primary: '#4ade80', // Green
      secondary: '#ef4444', // Red
      accent: '#facc15',
      text: '#4ade80',
      muted: '#1a1d1a',
    },
  },
};

// Short base64 sound effects to ensure runnability without external assets
export const SOUNDS = {
  click: 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU', 
  win: 'data:audio/wav;base64,UklGRl9vT1BXQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU',   
  
  // URL fallbacks
  clickUrl: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  winUrl: 'https://assets.mixkit.co/active_storage/sfx/2000/2000-preview.mp3',
  loseUrl: 'https://assets.mixkit.co/active_storage/sfx/2003/2003-preview.mp3',
  drawUrl: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3',
  switchUrl: 'https://assets.mixkit.co/active_storage/sfx/2568/2568-preview.mp3',
  
  // New Sounds
  fallUrl: 'https://assets.mixkit.co/active_storage/sfx/2573/2573-preview.mp3', // Thud
  glitchUrl: 'https://assets.mixkit.co/active_storage/sfx/2658/2658-preview.mp3', // Static
  explosionUrl: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3', // Boom
  powerupUrl: 'https://assets.mixkit.co/active_storage/sfx/1110/1110-preview.mp3', // Chime
  errorUrl: 'https://assets.mixkit.co/active_storage/sfx/2572/2572-preview.mp3' // Buzz
};
