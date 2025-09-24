import React from "react";
import Square from "./Square";

export default function Board({ squares, onClick }) {
  return (
    <div className="board">
      {squares.map((val, i) => (
        <Square key={i} value={val} onClick={() => onClick(i)} />
      ))}
    </div>
  );
}
