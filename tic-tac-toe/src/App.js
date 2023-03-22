import { useState } from "react";
import "./styles.css";

function Square({ value, onSquareClick, isWinner }) {
  const squareClassName = isWinner ? "square-winner" : "square";
  return (
    <button className={squareClassName} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function Board({ xIsNext, squares, onPlay }) {
  function handleClick(i) {
    const { winner } = calculateWinner(squares);
    if (winner || squares[i]) {
      return;
    }
    const nextSquares = squares.slice();
    if (xIsNext) {
      nextSquares[i] = "X";
    } else {
      nextSquares[i] = "O";
    }
    onPlay(nextSquares);
  }

  const { winner, winningSquares } = calculateWinner(squares);

  let status;
  if (winner === "draw") {
    status = "It's a " + winner;
  } else if (winner) {
    status = "Winner: " + winner;
  } else {
    status = "Next player: " + (xIsNext ? "X" : "O");
  }

  const boardMatrix = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
  ];

  return (
    <div>
      <div className="status">{status}</div>
      {boardMatrix.map((boardArray, rowIndex) => (
        <div key={rowIndex} className="board-row">
          {boardArray.map((squareNum) => (
            <Square
              key={squareNum}
              value={squares[squareNum]}
              onSquareClick={() => handleClick(squareNum)}
              isWinner={winningSquares.includes(squareNum)}
            />
          ))}
        </div>
      ))}
    </div>
  );
}

export default function Game() {
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

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = "Go to move #" + move;
    } else {
      description = "Go to game start";
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
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

function calculateWinner(squares) {
  const winningLines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < winningLines.length; i++) {
    const [a, b, c] = winningLines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return { winner: squares[a], winningSquares: [a, b, c] };
    }
  }
  if (squares.every((square) => square !== null)) {
    return { winner: "draw", winningSquares: [] };
  }
  return { winner: null, winningSquares: [] };
}
