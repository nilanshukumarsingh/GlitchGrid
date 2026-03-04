import React from "react";
import { motion } from "framer-motion";
import { WinState } from "../types";

interface GameStatusProps {
    winState: WinState;
    xIsNext: boolean;
}

export const GameStatus: React.FC<GameStatusProps> = ({ winState, xIsNext }) => {
    return (
        <motion.div
            className="flex justify-center mb-6"
            animate={!winState.winner ? { scale: [1, 1.05, 1] } : {}}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
            <div
                className={`px-8 py-3 rounded-full border ${winState.winner ? "border-skin-accent bg-skin-accent/20 shadow-[0_0_30px_rgba(var(--color-accent-rgb),0.3)]" : "border-skin-muted bg-white/5"} flex items-center gap-3 backdrop-blur-md shadow-2xl transition-all duration-500`}
            >
                {winState.winner ? (
                    <motion.span
                        initial={{ scale: 0.5, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        className="text-2xl sm:text-3xl font-black text-skin-accent drop-shadow-[0_0_15px_currentColor] tracking-tighter italic uppercase"
                    >
                        {winState.winner === "Draw"
                            ? "STALEMATE"
                            : `${winState.winner} DOMINATES!`}
                    </motion.span>
                ) : (
                    <>
                        <span className="text-skin-muted text-sm font-bold tracking-wide">
                            TURN
                        </span>
                        <motion.span
                            key={xIsNext ? "X" : "O"}
                            className={`text-2xl font-bold ${xIsNext ? "text-skin-primary" : "text-skin-secondary"}`}
                            animate={{
                                scale: [1, 1.05, 1],
                                filter: [
                                    "drop-shadow(0 0 4px currentColor)",
                                    "drop-shadow(0 0 12px currentColor)",
                                    "drop-shadow(0 0 4px currentColor)",
                                ],
                            }}
                            transition={{
                                duration: 2,
                                repeat: Infinity,
                                ease: "easeInOut",
                            }}
                        >
                            {xIsNext ? "X" : "O"}
                        </motion.span>
                    </>
                )}
            </div>
        </motion.div>
    );
};
