import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { SquareValue, WinState, GameRules, PowerUps } from '../types';
import { Cell } from './Cell';
import { useTheme } from '../context/ThemeContext';

interface BoardProps {
  squares: SquareValue[];
  onClick: (i: number) => void;
  winState: WinState;
  disabled: boolean;
  xIsNext: boolean;
  gameRules: GameRules;
  dyingIndex: number | null;
  activePowerUp: 'bomb' | 'freeze' | null;
  setActivePowerUp: (p: 'bomb' | 'freeze' | null) => void;
  p1PowerUps: PowerUps;
  p2PowerUps: PowerUps;
  isBoardShaking: boolean;
}

export const Board: React.FC<BoardProps> = ({ 
    squares, onClick, winState, disabled, xIsNext, gameRules, dyingIndex,
    activePowerUp, setActivePowerUp, p1PowerUps, p2PowerUps, isBoardShaking
}) => {
  const { theme, currentThemeConfig } = useTheme();

  const getCoordinates = (index: number) => {
    const col = index % 3;
    const row = Math.floor(index / 3);
    const x = (col * 33.333) + 16.666;
    const y = (row * 33.333) + 16.666;
    return { x, y };
  };

  let lineCoords = { x1: 0, y1: 0, x2: 0, y2: 0 };
  if (winState.line) {
    const start = getCoordinates(winState.line[0]);
    const end = getCoordinates(winState.line[2]);
    lineCoords = { x1: start.x, y1: start.y, x2: end.x, y2: end.y };
  }
  
  const containerClasses = theme === 'cyberpunk' 
    ? 'bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.5)]' 
    : theme === 'glass'
        ? 'bg-white/30 backdrop-blur-md border border-white/40 shadow-xl'
        : '';

  // Power Up Button Component
  const PowerUpBtn = ({ type, count, active, onClick, color }: any) => (
      <button 
        onClick={onClick}
        disabled={count === 0}
        className={`relative group flex flex-col items-center justify-center p-3 rounded-lg transition-all ${active ? 'bg-white/20 ring-2 ring-white' : 'bg-black/20 hover:bg-black/40'} ${count === 0 ? 'opacity-30 grayscale cursor-not-allowed' : 'cursor-pointer'}`}
      >
          <span className={`text-2xl mb-1 ${count > 0 ? 'animate-bounce' : ''}`} style={{ animationDuration: '3s' }}>
              {type === 'bomb' ? '💣' : '❄️'}
          </span>
          <span className="text-[10px] font-bold uppercase tracking-wider text-white/80">{type}</span>
          <span className="absolute -top-2 -right-2 w-5 h-5 bg-skin-primary rounded-full flex items-center justify-center text-xs font-bold text-black border border-white">
              {count}
          </span>
      </button>
  );

  return (
    <div className="flex flex-col gap-6">
        <motion.div 
            className={`relative p-4 rounded-2xl transition-all duration-500 ${containerClasses}`}
            animate={{ 
                scale: winState.winner ? 1.05 : 1,
                x: isBoardShaking ? [0, -10, 10, -10, 10, 0] : 0
            }}
            transition={{ 
                type: "spring", stiffness: 100, damping: 20,
                x: { duration: 0.4 } // Override duration for shake
            }}
        >
        
        {/* Grid Container */}
        <div className={`grid grid-cols-3 gap-3 sm:gap-4 max-w-md mx-auto relative z-10 ${theme === 'retro' ? 'gap-0 bg-skin-muted p-1 border-4 border-skin-muted' : ''}`}>
            <AnimatePresence mode='wait'>
            {squares.map((square, i) => (
                <Cell
                    key={i}
                    index={i}
                    value={square}
                    onClick={() => onClick(i)}
                    disabled={disabled || winState.winner !== null}
                    isWinning={winState.line?.includes(i) ?? false}
                    xIsNext={xIsNext}
                    gameRules={gameRules}
                    isDying={dyingIndex === i}
                />
            ))}
            </AnimatePresence>
        </div>

        {/* SVG Overlay */}
        <div className="absolute inset-0 pointer-events-none z-20 overflow-hidden rounded-2xl">
            <AnimatePresence>
                {winState.line && (
                    <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <filter id="neon-glow" x="-50%" y="-50%" width="200%" height="200%">
                                <feGaussianBlur in="SourceGraphic" stdDeviation="2" result="blur1" />
                                <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur2" />
                                <feGaussianBlur in="SourceGraphic" stdDeviation="10" result="blur3" />
                                <feMerge>
                                    <feMergeNode in="blur3" />
                                    <feMergeNode in="blur2" />
                                    <feMergeNode in="blur1" />
                                    <feMergeNode in="SourceGraphic" />
                                </feMerge>
                            </filter>
                        </defs>
                        <motion.line
                            x1={`${lineCoords.x1}%`}
                            y1={`${lineCoords.y1}%`}
                            x2={`${lineCoords.x2}%`}
                            y2={`${lineCoords.y2}%`}
                            stroke={winState.winner === 'X' ? 'var(--color-primary)' : 'var(--color-secondary)'}
                            strokeWidth={theme === 'retro' ? "12" : "8"}
                            strokeLinecap="round"
                            filter={theme === 'retro' ? 'none' : 'url(#neon-glow)'}
                            initial={{ pathLength: 0, opacity: 0 }}
                            animate={{ 
                                pathLength: 1, 
                                opacity: theme === 'retro' ? 1 : [1, 0.8, 1, 0.4, 1, 0.9, 1, 0.2, 1, 0.7, 1], 
                            }}
                            transition={{ 
                                pathLength: { duration: 0.4, ease: "easeOut" },
                                opacity: theme === 'retro' ? { duration: 0.2 } : { 
                                    duration: 0.12, 
                                    repeat: Infinity, 
                                    repeatType: "mirror", 
                                    ease: "linear" 
                                }
                            }}
                        />
                        {theme !== 'retro' && (
                            <motion.line
                                x1={`${lineCoords.x1}%`}
                                y1={`${lineCoords.y1}%`}
                                x2={`${lineCoords.x2}%`}
                                y2={`${lineCoords.y2}%`}
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                opacity="0.9"
                                initial={{ pathLength: 0 }}
                                animate={{ pathLength: 1 }}
                                transition={{ duration: 0.25, ease: "circOut" }}
                            />
                        )}
                    </svg>
                )}
            </AnimatePresence>
        </div>
        </motion.div>

        {/* Arcade Power-Up Dock */}
        {gameRules === 'arcade' && (
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-between items-center bg-black/40 backdrop-blur-md p-4 rounded-xl border border-white/10"
            >
                <div className="flex gap-4">
                    <div className={`text-xs font-bold mb-1 absolute -top-3 left-4 ${xIsNext ? 'text-skin-primary' : 'text-skin-muted'}`}>P1 CARDS</div>
                    <PowerUpBtn 
                        type="bomb" 
                        count={p1PowerUps.bomb} 
                        active={activePowerUp === 'bomb' && xIsNext} 
                        onClick={() => xIsNext && setActivePowerUp(activePowerUp === 'bomb' ? null : 'bomb')}
                    />
                    <PowerUpBtn 
                        type="freeze" 
                        count={p1PowerUps.freeze} 
                        active={activePowerUp === 'freeze' && xIsNext} 
                        onClick={() => xIsNext && setActivePowerUp(activePowerUp === 'freeze' ? null : 'freeze')}
                    />
                </div>
                
                <div className="h-8 w-[1px] bg-white/10 mx-2"></div>

                <div className="flex gap-4">
                    <div className={`text-xs font-bold mb-1 absolute -top-3 right-4 ${!xIsNext ? 'text-skin-secondary' : 'text-skin-muted'}`}>P2 CARDS</div>
                    <PowerUpBtn 
                        type="freeze" 
                        count={p2PowerUps.freeze} 
                        active={activePowerUp === 'freeze' && !xIsNext} 
                        onClick={() => !xIsNext && setActivePowerUp(activePowerUp === 'freeze' ? null : 'freeze')}
                    />
                    <PowerUpBtn 
                        type="bomb" 
                        count={p2PowerUps.bomb} 
                        active={activePowerUp === 'bomb' && !xIsNext} 
                        onClick={() => !xIsNext && setActivePowerUp(activePowerUp === 'bomb' ? null : 'bomb')}
                    />
                </div>
            </motion.div>
        )}
    </div>
  );
};