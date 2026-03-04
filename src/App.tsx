import React, { useState } from "react";
import { motion } from "framer-motion";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import { SoundProvider } from "./context/SoundContext";
import { useTicTacToe } from "./hooks/useTicTacToe";
import { Board } from "./components/Board";
import { BackgroundElements } from "./components/BackgroundElements";
import { RulesModal } from "./components/RulesModal";
import { GameHeader } from "./components/GameHeader";
import { ThemeSwitcher } from "./components/ThemeSwitcher";
import { GameStatus } from "./components/GameStatus";
import { NewsSection } from "./components/NewsSection";

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
  const [isRulesOpen, setIsRulesOpen] = useState(false);

  return (
    <div
      className={`relative min-h-screen w-full flex flex-col items-center justify-center p-4 transition-colors duration-500 overflow-x-hidden ${currentThemeConfig.font} bg-skin-base text-skin-text`}
    >
      <BackgroundElements
        theme={theme}
        currentThemeConfig={currentThemeConfig}
        winState={winState}
        opponent={opponent}
      />

      <RulesModal isOpen={isRulesOpen} setIsOpen={setIsRulesOpen} />

      <motion.div layout className="w-full max-w-lg relative z-10 my-8">
        <GameHeader
          gameRules={gameRules}
          setIsRulesOpen={setIsRulesOpen}
          opponent={opponent}
          setOpponent={setOpponent}
          resetGame={resetGame}
          setGameRules={setGameRules}
        />

        <ThemeSwitcher theme={theme} setTheme={setTheme} />

        <GameStatus winState={winState} xIsNext={xIsNext} />

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

        <NewsSection theme={theme} />
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
