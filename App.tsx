import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SoundProvider, useSoundContext } from "./context/SoundContext";
import { useTicTacToe } from "./hooks/useTicTacToe";
import { Board } from "./components/Board";
import { VictoryParticles } from "./components/Particles";
import { NewsCard } from "./components/NewsCard";
import { ThemeConfig } from "./types";
import { THEMES } from "./constants";

const GameLayout = () => {
  const {
    board,
    handleSquareClick,
    resetGame,
    winState,
    xIsNext,
    opponent,
    setOpponent,
    gameRules,
    setGameRules,
    dyingIndex,
    activePowerUp,
    setActivePowerUp,
    p1PowerUps,
    p2PowerUps,
    isBoardShaking,
  } = useTicTacToe();

  const { setTheme, theme, currentThemeConfig } = useTheme();
  const { isMuted, toggleMute } = useSoundContext();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-x-hidden ${currentThemeConfig.font} bg-skin-base text-skin-text`}
    >
      {/* --- BACKGROUND ELEMENTS --- */}
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
            backgroundColor: ["#3b82f6", "#9333ea", "#3b82f6"], // Blue to Purple
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

      <AnimatePresence>
        {isRulesOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md"
            onClick={() => setIsRulesOpen(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              className="bg-gray-900 border border-skin-primary/30 rounded-2xl max-w-md w-full p-6 shadow-[0_0_50px_rgba(0,0,0,0.5)] relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Decorative background for modal */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-skin-primary/10 blur-3xl rounded-full -mr-16 -mt-16" />

              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold tracking-tighter text-skin-primary">
                  GAME PROTOCOLS
                </h2>
                <button
                  onClick={() => setIsRulesOpen(false)}
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
                onClick={() => setIsRulesOpen(false)}
                className="w-full mt-8 py-3 rounded-lg bg-skin-primary text-black font-bold uppercase tracking-widest hover:bg-skin-accent transition-colors shadow-[0_0_15px_rgba(var(--color-primary-rgb),0.5)]"
              >
                Acknowledge
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.div layout className="w-full max-w-lg relative z-10 my-8">
        {/* Header Section */}
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
            {/* Rules Button */}
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

            {/* Mute Button */}
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

            {/* Settings Menu */}
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

        {/* Theme Switcher (On Page) */}
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

        {/* Status Indicator */}
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

        {/* Game Area */}
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", bounce: 0.5 }}
        >
          <Board
            squares={board}
            onClick={handleSquareClick}
            winState={winState}
            disabled={Boolean(winState.winner)}
            xIsNext={xIsNext}
            gameRules={gameRules}
            dyingIndex={dyingIndex}
            activePowerUp={activePowerUp}
            setActivePowerUp={setActivePowerUp}
            p1PowerUps={p1PowerUps}
            p2PowerUps={p2PowerUps}
            isBoardShaking={isBoardShaking}
          />
        </motion.div>

        {/* Footer / Reset */}
        <div className="mt-8 flex justify-center">
          <motion.button
            onClick={resetGame}
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 20px var(--color-primary)",
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-3 rounded-lg bg-skin-muted/50 border border-skin-muted text-skin-text font-bold uppercase tracking-wider hover:bg-skin-muted transition-all shadow-lg backdrop-blur-sm"
          >
            {winState.winner ? "Play Again" : "Reset Board"}
          </motion.button>
        </div>

        {/* News / Updates Section */}
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
      </motion.div>
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <SoundProvider>
        <GameLayout />
      </SoundProvider>
    </ThemeProvider>
  );
}
