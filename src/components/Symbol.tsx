import React from 'react';
import { motion, Variants } from 'framer-motion';

interface SymbolProps {
  className?: string;
  mode?: 'draw' | 'ghost';
}

export const SymbolX: React.FC<SymbolProps> = ({ className, mode = 'draw' }) => {
  const draw: Variants = {
    hidden: { pathLength: 0, opacity: 0 },
    visible: (i: number) => ({
      pathLength: 1,
      opacity: 1,
      transition: {
        pathLength: { delay: i * 0.1, type: "spring", duration: 0.6, bounce: 0 },
        opacity: { duration: 0.01 }
      }
    }),
    ghost: {
      pathLength: 1,
      opacity: 0.2,
      scale: 0.8,
      transition: { duration: 0.2 }
    }
  };

  return (
    <motion.svg viewBox="0 0 100 100" className={`w-12 h-12 sm:w-16 sm:h-16 overflow-visible ${className}`}>
      <motion.path
        d="M 25 25 L 75 75"
        fill="transparent"
        strokeWidth="8"
        stroke="currentColor"
        strokeLinecap="round"
        variants={draw}
        initial={mode === 'draw' ? "hidden" : "ghost"}
        animate={mode === 'draw' ? "visible" : "ghost"}
        custom={0}
      />
      <motion.path
        d="M 75 25 L 25 75"
        fill="transparent"
        strokeWidth="8"
        stroke="currentColor"
        strokeLinecap="round"
        variants={draw}
        initial={mode === 'draw' ? "hidden" : "ghost"}
        animate={mode === 'draw' ? "visible" : "ghost"}
        custom={1}
      />
    </motion.svg>
  );
};

export const SymbolO: React.FC<SymbolProps> = ({ className, mode = 'draw' }) => {
    const draw: Variants = {
      hidden: { pathLength: 0, opacity: 0, rotate: -90 },
      visible: {
        pathLength: 1,
        opacity: 1,
        transition: {
          pathLength: { type: "spring", duration: 0.8, bounce: 0 },
          opacity: { duration: 0.01 }
        }
      },
      ghost: {
        pathLength: 1,
        opacity: 0.2,
        scale: 0.8,
        transition: { duration: 0.2 }
      }
    };
  
    return (
      <motion.svg viewBox="0 0 100 100" className={`w-12 h-12 sm:w-16 sm:h-16 overflow-visible ${className}`}>
        <motion.circle
          cx="50"
          cy="50"
          r="32"
          fill="transparent"
          strokeWidth="8"
          stroke="currentColor"
          strokeLinecap="round"
          variants={draw}
          initial={mode === 'draw' ? "hidden" : "ghost"}
          animate={mode === 'draw' ? "visible" : "ghost"}
        />
      </motion.svg>
    );
  };