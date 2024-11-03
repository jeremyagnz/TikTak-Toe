import { useState } from "react";


const TURNS ={
  x: 'x',
  O:'o'
};


const Square = ({ children, updateBoard, index }) => {
  return (
    <div className="square">
      {children}
    </div>
  )
}

function App() {
  const [board, setBoard] = useState(['x','0','0','0','x','x','0','x','0',]);
  console.log(board);
  
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
              >
                {board[index]}
              </Square>
            )
          })
        }
       </section>
    </main>
  )
}

export default App
