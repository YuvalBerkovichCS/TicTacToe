import "./style.css";
function Square({ value, onSquareClick, isWinner }) {
  const squareClassName = isWinner ? "square-winner" : "square";
  return (
    <button className={squareClassName} onClick={onSquareClick}>
      {value}
    </button>
  );
}

export default Square;
