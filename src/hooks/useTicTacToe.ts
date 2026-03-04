import { useState, useCallback, useEffect } from 'react';
import { Player, SquareValue, WinState, Opponent, GameRules, Move, PowerUps } from '../types';
import { useSoundEffects } from './useSound';

const WINNING_LINES = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Cols
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

export const useTicTacToe = () => {
  const [board, setBoard] = useState<SquareValue[]>(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [opponent, setOpponent] = useState<Opponent>('PvCPU');
  const [gameRules, setGameRules] = useState<GameRules>('classic');
  const [winState, setWinState] = useState<WinState>({ winner: null, line: null });
  const [isCPUTurn, setIsCPUTurn] = useState(false);
  const [isBoardShaking, setIsBoardShaking] = useState(false);
  
  // Infinity Mode State
  const [moveHistory, setMoveHistory] = useState<Move[]>([]);

  // Arcade Mode State
  const [p1PowerUps, setP1PowerUps] = useState<PowerUps>({ bomb: 1, freeze: 1 });
  const [p2PowerUps, setP2PowerUps] = useState<PowerUps>({ bomb: 1, freeze: 1 });
  const [activePowerUp, setActivePowerUp] = useState<'bomb' | 'freeze' | null>(null);

  const { play } = useSoundEffects();

  const calculateWinner = (squares: SquareValue[]): WinState => {
    for (const [a, b, c] of WINNING_LINES) {
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return { winner: squares[a] as Player, line: [a, b, c] };
      }
    }
    if (!squares.includes(null)) {
      return { winner: 'Draw', line: null };
    }
    return { winner: null, line: null };
  };

  // Helper: Find lowest empty row in a column for Gravity Mode
  const getLowestEmptyIndex = (colIndex: number, currentBoard: SquareValue[]): number | null => {
    // Columns are 0,3,6 | 1,4,7 | 2,5,8
    // Check bottom up
    for (let row = 2; row >= 0; row--) {
      const index = colIndex + (row * 3);
      if (!currentBoard[index]) return index;
    }
    return null;
  };

  const triggerShake = useCallback(() => {
    setIsBoardShaking(true);
    setTimeout(() => setIsBoardShaking(false), 400);
  }, []);

  const minimax = (
      squares: SquareValue[], 
      depth: number, 
      isMaximizing: boolean, 
      rules: GameRules,
      currentMoves: Move[]
  ): number => {
    const result = calculateWinner(squares);
    if (result.winner === 'O') return 10 - depth;
    if (result.winner === 'X') return depth - 10;
    if (result.winner === 'Draw') return 0;
    
    // Depth limiter for performance
    if (depth >= 4) return 0;

    if (isMaximizing) { // O's turn
      let bestScore = -Infinity;
      
      // Determine valid moves
      let validIndices: number[] = [];
      if (rules === 'gravity') {
          for (let c = 0; c < 3; c++) {
              const idx = getLowestEmptyIndex(c, squares);
              if (idx !== null) validIndices.push(idx);
          }
      } else {
          squares.forEach((v, i) => !v && validIndices.push(i));
      }

      for (let i of validIndices) {
        squares[i] = 'O';
        // Simulating Infinity mode in Minimax is complex; 
        // we use a simplified heuristic: assume standard rules for lookahead 
        // unless we want to fully clone move history.
        // For 'infinity', if O places a piece and has 3 already, the oldest O would vanish.
        // This is too expensive to calc perfectly here, so we stick to standard lookahead.
        const score = minimax(squares, depth + 1, false, rules, currentMoves);
        squares[i] = null;
        bestScore = Math.max(score, bestScore);
      }
      return bestScore;
    } else { // X's turn
      let bestScore = Infinity;
      
      let validIndices: number[] = [];
      if (rules === 'gravity') {
          for (let c = 0; c < 3; c++) {
              const idx = getLowestEmptyIndex(c, squares);
              if (idx !== null) validIndices.push(idx);
          }
      } else {
          squares.forEach((v, i) => !v && validIndices.push(i));
      }

      for (let i of validIndices) {
        squares[i] = 'X';
        const score = minimax(squares, depth + 1, true, rules, currentMoves);
        squares[i] = null;
        bestScore = Math.min(score, bestScore);
      }
      return bestScore;
    }
  };

  const getBestMove = useCallback((currentBoard: SquareValue[]): number => {
    let bestScore = -Infinity;
    let move = -1;
    
    // Determine possible moves based on rules
    let possibleMoves: number[] = [];
    if (gameRules === 'gravity') {
        for (let c = 0; c < 3; c++) {
            const idx = getLowestEmptyIndex(c, currentBoard);
            if (idx !== null) possibleMoves.push(idx);
        }
    } else {
        currentBoard.forEach((v, i) => !v && possibleMoves.push(i));
    }
    
    // Simple optimization: If only one move, take it
    if (possibleMoves.length === 1) return possibleMoves[0];
    
    // First move opt
    if (currentBoard.filter(x => x === null).length >= 8 && gameRules !== 'gravity') {
        if (!currentBoard[4]) return 4;
        return 0;
    }

    for (let i of possibleMoves) {
        currentBoard[i] = 'O';
        const score = minimax(currentBoard, 0, false, gameRules, moveHistory);
        currentBoard[i] = null;
        if (score > bestScore) {
            bestScore = score;
            move = i;
        }
    }
    return move;
  }, [gameRules, moveHistory]);

  const handleSquareClick = useCallback((i: number) => {
    if (winState.winner || isCPUTurn) return;

    let targetIndex = i;

    // --- LOGIC: ARCADE POWERUPS ---
    if (activePowerUp === 'bomb') {
        if (!board[i]) {
            play('error');
            triggerShake();
            return;
        }
        play('explosion');
        const newBoard = [...board];
        newBoard[i] = null;
        setBoard(newBoard);
        
        // Remove from inventory
        const setPowerUps = xIsNext ? setP1PowerUps : setP2PowerUps;
        setPowerUps(prev => ({ ...prev, bomb: prev.bomb - 1 }));
        setActivePowerUp(null);
        
        // Handling move history for Infinity if bomb is used there (edge case: simply remove from history)
        if (gameRules === 'infinity') {
            setMoveHistory(prev => prev.filter(m => m.index !== i));
        }
        
        // Turn does NOT change when using a bomb (strategic advantage)
        return;
    }
    
    if (activePowerUp === 'freeze') {
        play('powerup');
        const setPowerUps = xIsNext ? setP1PowerUps : setP2PowerUps;
        setPowerUps(prev => ({ ...prev, freeze: prev.freeze - 1 }));
        setActivePowerUp(null);
        return; 
    }

    // --- LOGIC: GRAVITY MODE ---
    if (gameRules === 'gravity') {
        const col = i % 3;
        const lowest = getLowestEmptyIndex(col, board);
        if (lowest === null) {
            play('error');
            triggerShake();
            return; // Column full
        }
        targetIndex = lowest;
    } else {
        if (board[i]) {
            play('error');
            triggerShake();
            return;
        }
    }

    // --- LOGIC: EXECUTE MOVE ---
    const currentPlayer = xIsNext ? 'X' : 'O';
    play(gameRules === 'gravity' ? 'fall' : 'click');
    
    let newBoard = [...board];
    newBoard[targetIndex] = currentPlayer;
    let newHistory = [...moveHistory, { player: currentPlayer, index: targetIndex }];

    // --- LOGIC: INFINITY MODE ---
    if (gameRules === 'infinity') {
        const playerMoves = newHistory.filter(m => m.player === currentPlayer);
        if (playerMoves.length > 3) {
            const moveToRemove = playerMoves[0]; // Oldest move
            newBoard[moveToRemove.index] = null;
            newHistory = newHistory.filter(m => m !== moveToRemove); // Remove from history
            play('glitch');
        }
    }

    setBoard(newBoard);
    setMoveHistory(newHistory);

    const result = calculateWinner(newBoard);
    setWinState(result);
    
    if (result.winner) {
      play(result.winner === 'Draw' ? 'draw' : 'win');
    } else {
        setXIsNext(!xIsNext);
    }

  }, [board, xIsNext, winState, isCPUTurn, play, gameRules, activePowerUp, moveHistory, p1PowerUps, p2PowerUps, triggerShake]);

  // CPU TURN
  useEffect(() => {
    if (opponent === 'PvCPU' && !xIsNext && !winState.winner) {
      setIsCPUTurn(true);
      const timer = setTimeout(() => {
        const bestMove = getBestMove([...board]);
        
        if (bestMove !== -1) {
            // CPU Logic mirroring handleSquareClick
            let newBoard = [...board];
            newBoard[bestMove] = 'O';
            let newHistory = [...moveHistory, { player: 'O' as Player, index: bestMove }];
            
            play(gameRules === 'gravity' ? 'fall' : 'click');

            if (gameRules === 'infinity') {
                const cpuMoves = newHistory.filter(m => m.player === 'O');
                if (cpuMoves.length > 3) {
                    const remove = cpuMoves[0];
                    newBoard[remove.index] = null;
                    newHistory = newHistory.filter(m => m !== remove);
                    play('glitch');
                }
            }

            const result = calculateWinner(newBoard);
            setBoard(newBoard);
            setMoveHistory(newHistory);
            setWinState(result);

            if (result.winner) {
                play(result.winner === 'Draw' ? 'draw' : 'lose');
            } else {
                setXIsNext(true);
            }
        }
        setIsCPUTurn(false);
      }, 700);
      return () => clearTimeout(timer);
    }
  }, [xIsNext, opponent, winState.winner, board, getBestMove, play, gameRules, moveHistory]);

  const resetGame = () => {
    play('switch');
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setWinState({ winner: null, line: null });
    setMoveHistory([]);
    setP1PowerUps({ bomb: 1, freeze: 1 });
    setP2PowerUps({ bomb: 1, freeze: 1 });
    setActivePowerUp(null);
    setIsCPUTurn(false);
    setIsBoardShaking(false);
  };

  const getDyingPieceIndex = (): number | null => {
      if (gameRules !== 'infinity') return null;
      const currentPlayer = xIsNext ? 'X' : 'O';
      const playerMoves = moveHistory.filter(m => m.player === currentPlayer);
      if (playerMoves.length >= 3) {
          return playerMoves[0].index;
      }
      return null;
  };

  return {
    board,
    xIsNext,
    winState,
    handleSquareClick,
    resetGame,
    opponent,
    setOpponent,
    gameRules,
    setGameRules,
    activePowerUp,
    setActivePowerUp,
    p1PowerUps,
    p2PowerUps,
    dyingIndex: getDyingPieceIndex(),
    isBoardShaking
  };
};