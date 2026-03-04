import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSoundContext } from "../context/SoundContext";

interface GameHeaderProps {
    gameRules: string;
    setIsRulesOpen: (isOpen: boolean) => void;
    opponent: string;
    setOpponent: (opponent: any) => void;
    resetGame: () => void;
    setGameRules: (rules: any) => void;
}

export const GameHeader: React.FC<GameHeaderProps> = ({
    gameRules,
    setIsRulesOpen,
    opponent,
    setOpponent,
    resetGame,
    setGameRules,
}) => {
    const { isMuted, toggleMute } = useSoundContext();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    return (
        <div className="flex justify-between items-start mb-6 px-2">
            <div>
                <motion.h1
                    className="text-2xl sm:text-4xl font-bold tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-skin-primary to-skin-secondary drop-shadow-[0_0_10px_rgba(0,0,0,0.5)]"
                    initial={{ y: -50, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                >
                    GLITCHGRID
                </motion.h1>
                <div className="text-xs text-skin-muted font-bold tracking-[0.2em] mt-1 uppercase">
                    {gameRules} MODE
                </div>
            </div>

            <div className="flex gap-3">
                <button
                    onClick={() => setIsRulesOpen(true)}
                    className="p-2 rounded-full border border-skin-muted hover:bg-skin-muted/20 transition-colors backdrop-blur-sm bg-white/5 text-skin-text"
                    title="Game Rules"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                    </svg>
                </button>

                <button
                    onClick={toggleMute}
                    className="p-2 rounded-full border border-skin-muted hover:bg-skin-muted/20 transition-colors backdrop-blur-sm bg-white/5 text-skin-text"
                    title={isMuted ? "Unmute Sound" : "Mute Sound"}
                >
                    {isMuted ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                            />
                        </svg>
                    )}
                </button>

                <div className="relative">
                    <button
                        onClick={() => setIsMenuOpen(!isMenuOpen)}
                        className={`p-2 rounded-full border border-skin-muted hover:bg-skin-muted/20 transition-colors backdrop-blur-sm bg-white/5 ${isMenuOpen ? "ring-2 ring-skin-primary" : ""}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-skin-text"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            />
                        </svg>
                    </button>

                    <AnimatePresence>
                        {isMenuOpen && (
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9, y: 10 }}
                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9, y: 10 }}
                                className="absolute right-0 top-12 w-56 bg-gray-900/95 backdrop-blur-xl border border-skin-muted rounded-xl shadow-2xl p-4 z-50 overflow-hidden"
                            >
                                <h3 className="text-xs uppercase tracking-widest text-skin-muted mb-2 font-bold">
                                    Opponent
                                </h3>
                                <div className="flex gap-2 mb-4">
                                    <button
                                        onClick={() => {
                                            setOpponent("PvCPU");
                                            resetGame();
                                        }}
                                        className={`flex-1 text-xs py-2 rounded transition-all font-bold ${opponent === "PvCPU" ? "bg-skin-secondary text-white shadow-[0_0_10px_var(--color-secondary)]" : "border border-skin-muted text-gray-400 hover:bg-white/10"}`}
                                    >
                                        CPU
                                    </button>
                                    <button
                                        onClick={() => {
                                            setOpponent("PvP");
                                            resetGame();
                                        }}
                                        className={`flex-1 text-xs py-2 rounded transition-all font-bold ${opponent === "PvP" ? "bg-skin-secondary text-white shadow-[0_0_10px_var(--color-secondary)]" : "border border-skin-muted text-gray-400 hover:bg-white/10"}`}
                                    >
                                        PVP
                                    </button>
                                </div>

                                <h3 className="text-xs uppercase tracking-widest text-skin-muted mb-2 font-bold">
                                    Game Mode
                                </h3>
                                <div className="grid grid-cols-2 gap-2">
                                    {["classic", "infinity", "gravity", "arcade"].map((m) => (
                                        <button
                                            key={m}
                                            onClick={() => {
                                                setGameRules(m as any);
                                                resetGame();
                                            }}
                                            className={`text-xs py-2 rounded transition-all font-bold uppercase ${gameRules === m ? "bg-skin-accent text-black shadow-[0_0_10px_var(--color-accent)]" : "border border-skin-muted text-gray-400 hover:bg-white/10"}`}
                                        >
                                            {m}
                                        </button>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};
