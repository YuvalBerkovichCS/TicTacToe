import "./style.css";
function Square({ value, onSquareClick, isWinner }) {
  return (
    <div
      className={`square ${isWinner ? "square-winner" : ""} ${
        !value ? "" : "hasValue"
      }`}
      onClick={onSquareClick}
    >
      {value}
    </div>
  );
}

export default Square;
