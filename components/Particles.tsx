import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface Particle {
  id: number;
  x: number;
  y: number;
  color: string;
}

export const VictoryParticles: React.FC = () => {
  const { currentThemeConfig } = useTheme();
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    // Generate particles
    const newParticles: Particle[] = [];
    const colors = [
        currentThemeConfig.colors.primary, 
        currentThemeConfig.colors.secondary, 
        currentThemeConfig.colors.accent
    ];
    
    for (let i = 0; i < 40; i++) {
      newParticles.push({
        id: i,
        x: Math.random() * 100, // percent
        y: Math.random() * 100, // percent
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    setParticles(newParticles);
  }, [currentThemeConfig]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          initial={{ 
              opacity: 0, 
              scale: 0, 
              x: `${50}%`, // Start from center
              y: `${50}%` 
          }}
          animate={{ 
            opacity: [1, 0],
            scale: [0, Math.random() * 1.5 + 0.5],
            x: [`${50}%`, `${(Math.random() - 0.5) * 150 + 50}%`],
            y: [`${50}%`, `${(Math.random() - 0.5) * 150 + 50}%`],
          }}
          transition={{ 
            duration: 1.5, 
            ease: "easeOut",
            delay: Math.random() * 0.2
          }}
          style={{
            position: 'absolute',
            width: '12px',
            height: '12px',
            backgroundColor: p.color,
            borderRadius: currentThemeConfig.id === 'retro' ? '0%' : '50%',
            boxShadow: `0 0 10px ${p.color}`,
          }}
        />
      ))}
    </div>
  );
};
