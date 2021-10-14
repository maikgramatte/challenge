import { useRef, useState } from 'react';

import GameController from './Bingo/GameController';
import './index.css';

function App() {
  const [isCompleted, setIsCompleted] = useState(false);
  const [timePlayed, setTimePlayed] = useState(0);
  const ref : {
    current: NodeJS.Timeout | null
  } = useRef(null);

  function bingoCreated() {
    clearInterval(ref.current as NodeJS.Timeout);
    setTimePlayed(0);
    setIsCompleted(false);

    ref.current = setInterval(() => {
      setTimePlayed(prev => prev + 1);
    }, 1000);
  }

  function bingoDone() {
    clearInterval(ref.current as NodeJS.Timeout);
    setIsCompleted(true);
  }

  return (
    <div className="App">
      <h1>
        Buzzword Bingo

        {timePlayed > 0 &&
           <span>Time Played: {timePlayed}s</span>
        }

        {isCompleted &&
          <span className="done">Done</span>
        }
      </h1>

      <hr />
      <GameController
        onSucess={bingoDone}
        onBingoCreated={bingoCreated}
      />
    </div>
  );
}

export default App;
