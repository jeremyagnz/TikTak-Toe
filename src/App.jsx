import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constant";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { BoardGame } from "./components/BoardGame";


function App() {

  const [board, setBoard] = useState(() => {
    const boardFromStorage = window.localStorage.getItem('board');
    return boardFromStorage ? JSON.parse(boardFromStorage) : Array(9).fill(null);
  });
  const [turn, setTurn] = useState(() => {
   const turnFromStorage = window.localStorage.getItem('turn');
    return turnFromStorage ?? TURNS.x;
    
  });
  const [winner, setwinner] = useState(null);


  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurn(TURNS.x);
    setwinner(null);

    window.localStorage.removeItem('board')
    window.localStorage.removeItem('turn')
  }


  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.O : TURNS.x;
    setTurn(newTurn);

    window.localStorage.setItem('board', JSON.stringify(newBoard))
    window.localStorage.setItem('turn', newTurn);


    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setwinner(newWinner);
      window.localStorage.removeItem('board');
      window.localStorage.removeItem('turn');
    } else if (checkEndGame(newBoard)) {
      setwinner(false);
      window.localStorage.removeItem('board');
      window.localStorage.removeItem('turn');
    }
  }


  return (
    <main className='board'>
      <h1>Tik Tak Toe</h1>
      <button onClick={resetGame}>Reiniciar el Juego</button>
      <BoardGame board={board} updateBoard={updateBoard} />
      <section className="turn">
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </section>
      <WinnerModal resetGame={resetGame} winner={winner} />
    </main>
  )
}

export default App
