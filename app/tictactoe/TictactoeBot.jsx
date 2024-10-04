"use client";

import React, { useState, useEffect } from "react";

const TictactoeBot = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true); // Player is always "X"
  const [winner, setWinner] = useState(null);
  const [winningLine, setWinningLine] = useState([]);
  const [isTie, setIsTie] = useState(false);

  useEffect(() => {
    const result = calculateWinner(board);
    if (result) {
      setWinner(result.winner);
      setWinningLine(result.line);
    } else if (board.every((square) => square)) {
      setIsTie(true);
    } else if (!isXNext && !winner) {
      // If it's the bot's turn, and no winner yet, trigger bot move
      setTimeout(makeBotMove, 500); // Delay to simulate thinking
    }
  }, [board, isXNext]);

  const handleClick = (index) => {
    if (board[index] || winner || isTie || !isXNext) return; // Prevent bot from interfering with player

    const newBoard = board.slice();
    newBoard[index] = "X"; // Player is always "X"
    setBoard(newBoard);
    setIsXNext(false); // Bot's turn next
  };

  const makeBotMove = () => {
    // Check if the bot can win in this move
    const botMove = findBestMove(board, "O");
    if (botMove !== -1) {
      const newBoard = board.slice();
      newBoard[botMove] = "O"; // Bot is always "O"
      setBoard(newBoard);
      setIsXNext(true); // Player's turn next
      return;
    }

    // Check if the player can win in their next move and block them
    const playerMove = findBestMove(board, "X");
    if (playerMove !== -1) {
      const newBoard = board.slice();
      newBoard[playerMove] = "O"; // Bot blocks player
      setBoard(newBoard);
      setIsXNext(true); // Player's turn next
      return;
    }

    // If no immediate win or block, pick a random available square
    const availableSquares = board
      .map((square, index) => (square === null ? index : null))
      .filter((index) => index !== null);

    if (availableSquares.length === 0) return; // No move to make

    const randomMove = availableSquares[Math.floor(Math.random() * availableSquares.length)];
    const newBoard = board.slice();
    newBoard[randomMove] = "O"; // Bot is always "O"
    setBoard(newBoard);
    setIsXNext(true); // Player's turn next
  };

  const findBestMove = (squares, player) => {
    for (let i = 0; i < squares.length; i++) {
      if (squares[i] === null) {
        const newBoard = squares.slice();
        newBoard[i] = player; // Simulate the move
        if (calculateWinner(newBoard)) {
          return i; // Found a winning move
        }
      }
    }
    return -1; // No winning move found
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXNext(true); // Player starts first
    setWinner(null);
    setWinningLine([]);
    setIsTie(false);
  };

  const renderSquare = (index) => {
    const isWinningSquare = winningLine.includes(index);
    return (
      <button
        className={`w-20 h-20 text-5xl font-[200] border-2 border-gray-500 flex items-center justify-center rounded-xl ${
          isWinningSquare ? "bg-red-200 text-red-500" : ""
        }`}
        onClick={() => handleClick(index)}
      >
        {board[index]}
      </button>
    );
  };

  return (
    <div className="flex flex-col items-center mt-10">
      {/* Player vs Bot */}
      <h1 className="text-2xl mb-4">Tic Tac Toe - Play vs Bot</h1>
      <div className="grid grid-cols-3 gap-2">
        {Array.from({ length: 9 }, (_, i) => renderSquare(i))}
      </div>
      <div className="mt-4">
        {winner ? (
          <div className="text-xl mb-4">Winner: {winner}</div>
        ) : isTie ? (
          <div className="text-xl mb-4 text-center">It&apos;s a tie!</div>
        ) : (
          <div className="text-xl mb-4">Next Player: {isXNext ? "X" : "O"}</div>
        )}
        {(winner || isTie) && (
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={resetGame}
          >
            Reset Game
          </button>
        )}
      </div>
    </div>
  );
};

// Helper function to check the winner
const calculateWinner = (squares) => {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], line: [a, b, c] };
    }
  }
  return null;
};

export default TictactoeBot;
