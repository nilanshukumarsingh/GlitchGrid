import React, { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { SquareValue, GameRules } from '../types';
import { SymbolO, SymbolX } from './Symbol';
import { useTheme } from '../context/ThemeContext';

interface CellProps {
  value: SquareValue;
  onClick: () => void;
  isWinning: boolean;
  disabled: boolean;
  index: number;
  xIsNext: boolean;
  gameRules: GameRules;
  isDying: boolean;
}

export const Cell: React.FC<CellProps> = ({ 
    value, onClick, isWinning, disabled, index, xIsNext, gameRules, isDying 
}) => {
  const { theme } = useTheme();
  const ref = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);
  
  // Magnetic effect state
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);
  
  const springConfig = { damping: 15, stiffness: 150 };
  const mouseX = useSpring(x, springConfig);
  const mouseY = useSpring(y, springConfig);
  const mouseRotateX = useSpring(rotateX, springConfig);
  const mouseRotateY = useSpring(rotateY, springConfig);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled || value) return;
    
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      
      // Subtle Shift (0.1)
      x.set(distanceX * 0.1);
      y.set(distanceY * 0.1);

      // Tilt Effect (inverted Y for natural feel)
      rotateX.set(distanceY * -0.15);
      rotateY.set(distanceX * 0.15);
    }
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
    rotateX.set(0);
    rotateY.set(0);
    setIsHovered(false);
  };

  const handleMouseEnter = () => {
    if (!disabled && !value) setIsHovered(true);
  }

  // Styles
  const getCellStyles = () => {
    const isInteractive = (!value && !disabled) || (gameRules === 'gravity' && !disabled);
    const cursor = isInteractive ? 'cursor-pointer' : 'cursor-default';
    
    let classes = `relative w-full h-24 sm:h-32 flex items-center justify-center text-4xl ${cursor} overflow-visible transition-colors duration-300 `;
    
    if (theme === 'cyberpunk') {
      classes += `border border-skin-muted/30 bg-black/40 rounded-lg hover:bg-white/5`;
      if (isWinning) classes += ` shadow-[inset_0_0_20px_var(--color-primary)] bg-skin-primary/10`;
    } else if (theme === 'glass') {
      classes += `backdrop-blur-md bg-white/20 border border-white/30 rounded-2xl shadow-lg`;
    } else if (theme === 'retro') {
      classes += `border-4 border-skin-muted active:translate-y-1 active:border-b-0 bg-skin-base`;
    }

    if (isDying) {
        classes += ` animate-pulse ring-2 ring-red-500/50 bg-red-900/10`;
    }
    
    return classes;
  };

  const contentColor = value === 'X' ? 'text-skin-primary' : 'text-skin-secondary';
  const glowClass = isWinning ? 'drop-shadow-[0_0_15px_currentColor]' : '';

  // Animation variants based on mode
  const getInitial = () => {
      if (gameRules === 'gravity') return { y: -300, opacity: 0 };
      // Standard: start from scale 0.5 for dramatic pop
      return { scale: 0.5, opacity: 0 };
  };

  const getAnimate = () => {
      if (gameRules === 'gravity') return { 
          y: 0, 
          opacity: 1,
          filter: [
              "drop-shadow(0 0 0px currentColor)", 
              "drop-shadow(0 0 30px currentColor)", 
              "drop-shadow(0 0 8px currentColor)"
          ]
      };
      // Standard: Scale to 1 with intense glow (30px) settling to 8px
      return { 
          scale: 1, 
          opacity: 1,
          filter: [
              "drop-shadow(0 0 0px currentColor)", 
              "drop-shadow(0 0 30px currentColor)", 
              "drop-shadow(0 0 8px currentColor)"
          ]
      };
  };

  const getTransition = () => {
      if (gameRules === 'gravity') return { 
          y: { type: "spring", bounce: 0.5, duration: 0.6 },
          filter: { duration: 0.5, delay: 0.2 } 
      };
      
      return { 
          // Elastic overshoot: high stiffness, low damping for bounciness
          scale: { type: "spring", stiffness: 300, damping: 10 }, 
          opacity: { duration: 0.2 },
          // Glow intensity peaks at 30% of animation then settles
          filter: { duration: 0.5, times: [0, 0.3, 1] } 
      };
  };

  return (
    <motion.div
      ref={ref}
      className={getCellStyles()}
      onClick={onClick}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      whileHover={{ scale: 1 }}
      whileTap={{ scale: (!value && !disabled) ? 0.95 : 1 }}
      style={{ perspective: 1000 }}
    >
        {/* Render Content */}
        <motion.div 
            style={{ 
                x: mouseX, 
                y: mouseY, 
                rotateX: mouseRotateX, 
                rotateY: mouseRotateY 
            }}
            className={`w-full h-full flex items-center justify-center ${contentColor} ${glowClass} ${isDying ? 'opacity-50 blur-[1px]' : ''}`}
        >
            <AnimatePresence mode="popLayout">
                {value ? (
                    <motion.div
                        key="value"
                        initial={getInitial()}
                        animate={getAnimate()}
                        exit={{ scale: 0, opacity: 0, filter: "blur(10px)" }}
                        transition={getTransition()}
                    >
                         {value === 'X' && <SymbolX />}
                         {value === 'O' && <SymbolO />}
                    </motion.div>
                ) : (
                    // Hover Ghost
                    isHovered && !disabled && gameRules !== 'gravity' && (
                        <motion.div
                            key="ghost"
                            initial={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                            animate={{ 
                                opacity: 0.4, 
                                scale: 1, 
                                filter: 'blur(0px)',
                            }}
                            exit={{ opacity: 0, scale: 0.8, filter: 'blur(4px)' }}
                            className={`transition-colors duration-300 ${xIsNext ? 'text-skin-primary' : 'text-skin-secondary'} drop-shadow-[0_0_8px_currentColor]`}
                        >
                             {xIsNext ? <SymbolX /> : <SymbolO />}
                        </motion.div>
                    )
                )}
            </AnimatePresence>
            
            {/* Dying indicator for Infinity Mode */}
            {isDying && (
                <div className="absolute top-2 right-2 text-red-500 text-xs font-bold font-cyber tracking-widest animate-pulse">
                    ⚠️
                </div>
            )}
        </motion.div>
    </motion.div>
  );
};