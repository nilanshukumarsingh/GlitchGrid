import React from "react";
import { motion } from "framer-motion";
import { ThemeConfig } from "../types";
import { THEMES } from "../constants";

interface ThemeSwitcherProps {
    theme: string;
    setTheme: (theme: string) => void;
}

export const ThemeSwitcher: React.FC<ThemeSwitcherProps> = ({ theme, setTheme }) => {
    return (
        <motion.div
            className="flex justify-center gap-2 mb-8 bg-black/20 backdrop-blur-sm p-1.5 rounded-xl border border-white/5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
        >
            {(Object.values(THEMES) as ThemeConfig[]).map((t) => (
                <button
                    key={t.id}
                    onClick={() => setTheme(t.id)}
                    className={`
                    relative flex-1 px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-wider transition-all duration-300
                    ${theme === t.id ? "text-white" : "text-skin-muted hover:text-skin-text"}
                `}
                >
                    {theme === t.id && (
                        <motion.div
                            layoutId="theme-pill"
                            className="absolute inset-0 bg-skin-primary/20 border border-skin-primary/50 rounded-lg shadow-[0_0_15px_var(--color-primary)]"
                            transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                        />
                    )}
                    <span className="relative z-10">{t.name}</span>
                </button>
            ))}
        </motion.div>
    );
};
