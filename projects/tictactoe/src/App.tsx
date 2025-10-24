import {useState } from 'react';
import './App.css'
import { Square } from './components/square/square';
import { TURNS } from './models/turns';
import { WINNER_COMBOS } from './models/winnerCombos';
import confetti from 'canvas-confetti'

function App() {

  const [board, setBoard] = useState(Array(9).fill(null));
  const [turns, setTurns] = useState<TURNS>(TURNS.x);
  const [winner, setWinner] = useState<TURNS | null>(null);

  const updateBoard = (index: number) => {
    if (board[index] || winner) return;
    
    const newBoard = [...board];
    newBoard[index] = turns;
    setBoard(newBoard);

    const checkW = checkWinner(newBoard);
    if (checkW) {
      setWinner(checkW);
      confetti();
    }else if (checkSpacesFull(newBoard)) {
      console.log('empate');
      setWinner(null);
    }

    if (!checkW)
      updateTurns();
  }

  const updateTurns = () => {
    setTurns(turns === TURNS.x ? TURNS.o : TURNS.x);
  }

  const checkWinner = (boardToCheck: (TURNS | null)[]) => {
    for (const combo of WINNER_COMBOS) {
      const [a, b, c] = combo;
      if (
        boardToCheck[a] 
        && boardToCheck[a] === boardToCheck[b] 
        && boardToCheck[a] === boardToCheck[c]
      ) {
        return boardToCheck[a];
      }
    }
    return null;
  }

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setTurns(TURNS.x);
    setWinner(null);
  }

  const checkSpacesFull = (boardToCheck: (TURNS | null)[]) => {
    return boardToCheck.every((square) => square !== null);
  }

  return (
    <main className='board'>
      <h1>TIC TAC TOE</h1>
      <button onClick={resetGame}>Reset del juego</button>
      <section className='game'>
        {
          board.map((_, index) => {
            return(
              <Square key={index} index={index} updateBoard={updateBoard} >
                {board[index]}
              </Square>
            )
          })
        }
      </section>
      <section className='turn'>
        <Square isSelected={turns === TURNS.x}>
          {TURNS.x}
        </Square>
        <Square isSelected={turns === TURNS.o}>
          {TURNS.o}
        </Square>
      </section>
    </main>
  )
}

export default App
