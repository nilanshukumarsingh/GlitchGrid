import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { VictoryParticles } from "./Particles";
import { ThemeConfig, WinState, Opponent } from "../types";

interface BackgroundElementsProps {
    theme: string;
    currentThemeConfig: ThemeConfig;
    winState: WinState;
    opponent: Opponent;
}

export const BackgroundElements: React.FC<BackgroundElementsProps> = ({
    theme,
    currentThemeConfig,
    winState,
    opponent,
}) => {
    return (
        <>
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gray-900 via-[#050505] to-black -z-30" />

            <div
                className="absolute inset-0 -z-20 opacity-20 pointer-events-none"
                style={{
                    backgroundImage: `linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)`,
                    backgroundSize: "40px 40px",
                    maskImage:
                        "radial-gradient(circle at center, black 0%, transparent 80%)",
                }}
            />

            {theme !== "retro" && (
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] -z-10 pointer-events-none mix-blend-screen"
                    animate={{
                        scale: [1, 1.15, 1],
                        opacity: [0.15, 0.25, 0.15],
                        backgroundColor: ["#3b82f6", "#9333ea", "#3b82f6"],
                    }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                />
            )}

            {theme === "glass" && (
                <div className="absolute inset-0 bg-glass-gradient -z-20 opacity-80" />
            )}

            <AnimatePresence>
                {winState.winner &&
                    winState.winner !== "Draw" &&
                    (opponent === "PvP" || winState.winner === "X") && (
                        <VictoryParticles />
                    )}
            </AnimatePresence>
        </>
    );
};
