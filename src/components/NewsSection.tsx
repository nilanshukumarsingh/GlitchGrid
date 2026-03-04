import React from "react";
import { motion } from "framer-motion";
import { NewsCard } from "./NewsCard";

export const NewsSection: React.FC<{ theme: string }> = ({ theme }) => {
    return (
        <div className="w-full mt-12 mb-8 space-y-4">
            <motion.div
                className={`flex items-center gap-2 ${theme === "retro" ? "" : "justify-center"}`}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
            >
                <div className="h-px bg-skin-muted flex-1 max-w-[50px]"></div>
                <h2
                    className={`text-xs font-bold tracking-[0.3em] uppercase text-skin-muted`}
                >
                    System Logs
                </h2>
                <div className="h-px bg-skin-muted flex-1 max-w-[50px]"></div>
            </motion.div>

            <div className="grid gap-4">
                <NewsCard
                    title="v2.1: Audio Protocols"
                    date="2023-11-01"
                    summary="Implemented sound controls and enhanced UI accessibility."
                >
                    <p className="text-xs sm:text-sm leading-relaxed">
                        Added a global mute toggle in the header. Theme switching is now
                        directly accessible on the main dashboard for faster aesthetic
                        reconfiguration.
                    </p>
                </NewsCard>
                <NewsCard
                    title="v2.0: The Rules of Chaos"
                    date="2023-10-27"
                    summary="Major update introducing Gravity, Infinity, and Arcade modes."
                >
                    <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm marker:text-skin-primary">
                        <li>
                            <strong>Infinity Mode:</strong> You can only maintain 3 marks.
                            Placing a 4th removes your oldest.
                        </li>
                        <li>
                            <strong>Gravity Mode:</strong> Pieces fall to the bottom.
                            Column-based strategy required.
                        </li>
                        <li>
                            <strong>Arcade Mode:</strong> Use Bombs to clear cells and
                            Freeze to skip opponent turns.
                        </li>
                    </ul>
                </NewsCard>
                <NewsCard
                    title="Visual Overhaul: Neon Dreams"
                    date="2023-10-20"
                    summary="Complete UI refresh with Cyberpunk, Glass, and Retro themes."
                >
                    <p className="text-xs sm:text-sm leading-relaxed">
                        Experience the new immersive lighting engine. Cyberpunk mode
                        features real-time glow effects. Glass mode utilizes advanced
                        backdrop blurring. Retro mode brings back the 8-bit nostalgia
                        with clicky tactile feedback.
                    </p>
                </NewsCard>
            </div>
        </div>
    );
};
