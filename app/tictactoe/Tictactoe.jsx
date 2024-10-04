"use client";

import React, { useState, useEffect } from "react";

const Tictactoe = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXNext, setIsXNext] = useState(true);
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
    }
  }, [board]);

  const handleClick = (index) => {
    if (board[index] || winner || isTie) return;

    const newBoard = board.slice();
    newBoard[index] = isXNext ? "X" : "O";
    setBoard(newBoard);
    setIsXNext(!isXNext);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));

    if (winner) {
      setIsXNext(winner === "X" ? false : true);
    } else if (isTie) {
      setIsXNext(Math.random() < 0.5);
    } else {
      setIsXNext(true);
    }

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
      {/* friend to friend  */}
      <h1 className="text-2xl mb-4">Tic Tac Toe - Play vs Friend</h1>
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

export default Tictactoe;
