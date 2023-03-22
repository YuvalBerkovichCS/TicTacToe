import Square from "./Square";
import "./style.css";

function Board({ xIsNext, squares, onPlay }) {
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
      if (
        squares[a] &&
        squares[a] === squares[b] &&
        squares[a] === squares[c]
      ) {
        return { winner: squares[a], winningSquares: [a, b, c] };
      }
    }
    if (squares.every((square) => square !== null)) {
      return { winner: "draw", winningSquares: [] };
    }
    return { winner: null, winningSquares: [] };
  }

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

export default Board;
