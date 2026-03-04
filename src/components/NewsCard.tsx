import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../context/ThemeContext';

interface NewsCardProps {
  title: string;
  date: string;
  summary: string;
  children: React.ReactNode;
}

export const NewsCard: React.FC<NewsCardProps> = ({ title, date, summary, children }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { theme } = useTheme();

  // Dynamic styles based on theme
  const getCardStyles = () => {
    const base = "relative overflow-hidden cursor-pointer transition-colors duration-300";
    
    if (theme === 'cyberpunk') {
      return `${base} border border-skin-muted bg-black/40 hover:bg-white/5 hover:border-skin-primary/50 rounded-lg p-4`;
    } else if (theme === 'glass') {
      return `${base} backdrop-blur-md bg-white/20 border border-white/30 shadow-sm hover:bg-white/30 rounded-xl p-5`;
    } else if (theme === 'retro') {
      return `${base} border-2 border-skin-muted bg-skin-base hover:bg-skin-muted/20 p-3`;
    }
    return base;
  };

  const titleColor = theme === 'cyberpunk' ? 'text-skin-primary' : 'text-skin-text';
  const dateColor = 'text-skin-muted';

  return (
    <motion.div
      layout
      onClick={() => setIsExpanded(!isExpanded)}
      className={getCardStyles()}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
    >
      <motion.div layout="position" className="flex justify-between items-start mb-2">
        <div>
          <h3 className={`font-bold text-sm sm:text-base ${titleColor} tracking-wide`}>{title}</h3>
          <span className={`text-[10px] uppercase font-bold tracking-wider ${dateColor}`}>{date}</span>
        </div>
        <motion.div
            animate={{ rotate: isExpanded ? 180 : 0 }}
            className={`text-skin-secondary`}
        >
            ▼
        </motion.div>
      </motion.div>

      <AnimatePresence mode="wait">
        {!isExpanded ? (
          <motion.p
            key="summary"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`text-xs sm:text-sm ${theme === 'retro' ? 'font-retro leading-relaxed' : 'text-skin-text/80'}`}
          >
            {summary}
          </motion.p>
        ) : (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`text-xs sm:text-sm mt-2 pt-2 border-t border-skin-muted/20 ${theme === 'retro' ? 'font-retro leading-relaxed' : 'text-skin-text/90'}`}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
      
      {/* Decorative Glow for Cyberpunk */}
      {theme === 'cyberpunk' && isExpanded && (
          <motion.div 
            layoutId="glow"
            className="absolute inset-0 bg-skin-primary/5 pointer-events-none" 
          />
      )}
    </motion.div>
  );
};