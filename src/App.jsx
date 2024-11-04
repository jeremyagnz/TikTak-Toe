import { useState } from "react";
import confetti from "canvas-confetti";
import { Square } from "./components/Square";
import { TURNS } from "./constant";
import { checkEndGame, checkWinnerFrom } from "./logic/board";
import { WinnerModal } from "./components/WinnerModal";
import { BoardGame } from "./components/BoardGame";
import { resetGameStorage, saveGameToStorage } from "./storage/indes";


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

   resetGameStorage();
  }


  const updateBoard = (index) => {
    if (board[index] || winner) return;

    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);

    const newTurn = turn === TURNS.x ? TURNS.O : TURNS.x;
    setTurn(newTurn);

    saveGameToStorage({
      board: newBoard,
      turn: newTurn
    })


    const newWinner = checkWinnerFrom(newBoard);
    if (newWinner) {
      confetti();
      setwinner(newWinner);
      resetGameStorage();
    } else if (checkEndGame(newBoard)) {
      setwinner(false);
      resetGameStorage();
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
