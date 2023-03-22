import { useState } from "react";
import Board from "./components/Board.js";

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);
  const [sortOrder, setSortOrder] = useState("asc");
  const xIsNext = currentMove % 2 === 0;
  const currentSquares = history[currentMove];

  function handlePlay(nextSquares) {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  }

  function jumpTo(nextMove) {
    setCurrentMove(nextMove);
  }

  function handleSortOrderChange() {
    const newSortOrder = sortOrder === "asc" ? "desc" : "asc";
    setSortOrder(newSortOrder);
  }

  const moves = history.map((_, move) => {
    const goToDescription =
      move > 0 ? "Go to move #" + move : "Go to game start";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{goToDescription}</button>
      </li>
    );
  });

  const currentMoveDescription =
    currentMove === 0
      ? "Make your first move"
      : "The current move is " + currentMove;

  const sortOrderDescription = sortOrder === "asc" ? "Ascending" : "Descending";

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <div className="current-move-desc">{currentMoveDescription}</div>
        <button onClick={handleSortOrderChange}>{sortOrderDescription}</button>
        <ol>{sortOrder === "asc" ? moves : moves.reverse()}</ol>
      </div>
    </div>
  );
}

export default Game;
