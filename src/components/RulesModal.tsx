import React from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RulesModalProps {
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

export const RulesModal: React.FC<RulesModalProps> = ({ isOpen, setIsOpen }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
                    onClick={() => setIsOpen(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, y: 20 }}
                        animate={{ scale: 1, y: 0 }}
                        exit={{ scale: 0.9, y: 20 }}
                        className="bg-gray-900 border border-skin-primary/30 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="absolute top-0 right-0 w-32 h-32 bg-skin-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />

                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold tracking-tighter text-skin-primary">
                                GAME PROTOCOLS
                            </h2>
                            <button
                                onClick={() => setIsOpen(false)}
                                className="text-skin-muted hover:text-white transition-colors"
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
                                        d="M6 18L18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>

                        <div className="space-y-6">
                            <section>
                                <h3 className="text-xs font-bold tracking-widest text-skin-accent uppercase mb-2">
                                    Classic
                                </h3>
                                <p className="text-sm text-skin-text/80 leading-relaxed">
                                    Standard Tic-Tac-Toe. Align 3 symbols to win.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xs font-bold tracking-widest text-skin-accent uppercase mb-2">
                                    Infinity
                                </h3>
                                <p className="text-sm text-skin-text/80 leading-relaxed">
                                    Maximum 3 marks allowed. Placing a 4th removes your oldest
                                    mark. Plan your sequence!
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xs font-bold tracking-widest text-skin-accent uppercase mb-2">
                                    Gravity
                                </h3>
                                <p className="text-sm text-skin-text/80 leading-relaxed">
                                    Marks fall to the lowest available row. Vertical strategy is
                                    key.
                                </p>
                            </section>

                            <section>
                                <h3 className="text-xs font-bold tracking-widest text-skin-accent uppercase mb-2">
                                    Arcade
                                </h3>
                                <p className="text-sm text-skin-text/80 leading-relaxed">
                                    Use Power-Ups!{" "}
                                    <span className="text-skin-primary font-bold">Bomb</span>{" "}
                                    clears any cell.{" "}
                                    <span className="text-skin-secondary font-bold">
                                        Freeze
                                    </span>{" "}
                                    skips opponent turns.
                                </p>
                            </section>
                        </div>

                        <button
                            onClick={() => setIsOpen(false)}
                            className="w-full mt-8 py-3 rounded-lg bg-skin-primary text-black font-bold uppercase tracking-widest hover:bg-skin-accent transition-colors shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"
                        >
                            Acknowledge
                        </button>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};
