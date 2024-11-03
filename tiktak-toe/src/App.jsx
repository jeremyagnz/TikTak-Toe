import { useState } from "react";


const TURNS ={
  x: '×',
  O:'o'
};


const Square = ({ children, isSelected, updateBoard, index }) => {
  
  const className = `square ${isSelected ? 'is-selected' : ''}`
  const handledClick = () => {
    updateBoard(index);
  }
  return (
    <div onClick={handledClick} className={className}>
      {children}
    </div>
  )
}


function App() {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [turn, setTurn] = useState(TURNS.x);

  const updateBoard = (index) => {
    const newBoard = [...board];
    newBoard[index] = turn;
    setBoard(newBoard);
    
    const newTurn = turn === TURNS.x? TURNS.O : TURNS.x;
    setTurn(newTurn)
  }

  
  return (
    <main className='board'>
       <h1>Tik Tak Toe</h1>
       <section className="game">
        {
          board.map((_, index) => {
            return (
              <Square
                key={index}
                index={index}
                updateBoard={updateBoard}
              >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <div className="turn">
        <Square isSelected={turn === TURNS.x}>
          {TURNS.x}
        </Square>
         <Square isSelected={turn === TURNS.O}>
          {TURNS.O}
        </Square>
      </div>
    </main>
  )
}

export default App
