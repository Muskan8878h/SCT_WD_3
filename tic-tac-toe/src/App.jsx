import React, { useState } from "react";
import Game from "./Game";

export default function App() {
  const [mode, setMode] = useState(null);

  if (!mode) {
    return (
      <div className="menu">
        <h1>Tic Tac Toe</h1>
        <button onClick={() => setMode("pvp")}>Player vs Player</button>
        <button onClick={() => setMode("cpu")}>Player vs Computer</button>
      </div>
    );
  }

  return <Game mode={mode} onBack={() => setMode(null)} />;
}
