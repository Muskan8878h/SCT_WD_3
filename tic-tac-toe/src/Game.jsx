import React, { useState } from "react";
import Board from "./Board";

const winningCombos = [
  [0,1,2],[3,4,5],[6,7,8], // rows
  [0,3,6],[1,4,7],[2,5,8], // cols
  [0,4,8],[2,4,6]          // diagonals
];

function calculateWinner(squares) {
  for (let [a,b,c] of winningCombos) {
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}

// Simple AI (random move)
function getComputerMove(squares) {
  const available = squares.map((sq, i) => (sq ? null : i)).filter(i => i !== null);
  return available[Math.floor(Math.random() * available.length)];
}

export default function Game({ mode, onBack }) {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const winner = calculateWinner(squares);
  const isDraw = !winner && squares.every(Boolean);

  function handleClick(i) {
    if (squares[i] || winner) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? "X" : "O";
    setSquares(nextSquares);
    setXIsNext(!xIsNext);

    // If playing vs computer
    if (mode === "cpu" && !winner && !isDraw && xIsNext) {
      setTimeout(() => {
        const move = getComputerMove(nextSquares);
        if (move !== undefined) {
          const newSquares = nextSquares.slice();
          newSquares[move] = "O";
          setSquares(newSquares);
          setXIsNext(true);
        }
      }, 500);
    }
  }

  function restart() {
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  let status;
  if (winner) {
    status = `Winner: ${winner}`;
  } else if (isDraw) {
    status = "It's a draw!";
  } else {
    status = `Next player: ${xIsNext ? "X" : "O"}`;
  }

  return (
    <div className="game">
      <h2>{status}</h2>
      <Board squares={squares} onClick={handleClick} />
      <div className="controls">
        <button onClick={restart}>Restart</button>
        <button onClick={onBack}>Back to Menu</button>
      </div>
    </div>
  );
}
