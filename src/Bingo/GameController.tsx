import { useEffect, useState } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

import ItemsRender from './ItemsRender';
import SizeSelect from './SizeSelect';
import buzzwords from './buzzwords.json';

type Props = {
  onSucess: () => void,
  onBingoCreated: () => void,
};

export type SizeRange = 3 | 4 | 5 | 6 | 7;

export type BingoType = {
  bingoSize: SizeRange,
  won: boolean,
  words: string[],
  selected: string[],
  setup: boolean,
  bingoWords: string[],
};

function isBingo(start: number, bingo : BingoType) : string[] | false {
  const matchesY = [] as string[];
  const matchesX = [] as string[];

  for (let x = 0; x < bingo.bingoSize; x++) {
    const iy = (x * bingo.bingoSize) + start;
    if (bingo.selected.includes(bingo.words[iy])) {
      matchesY.push(bingo.words[iy]);
    }

    const ix = (x) + ((start - 1) * bingo.bingoSize);
    if (bingo.selected.includes(bingo.words[ix])) {
      matchesX.push(bingo.words[ix]);
    }
  }

  if (matchesX.length === bingo.bingoSize) {
    return matchesX;
  }

  return matchesY.length === bingo.bingoSize ? matchesY : false;
}

function GameController({ onSucess, onBingoCreated } : Props) {
  const [size, setSize] = useState(5 as SizeRange);
  const [bingo, setBingo] = useState({
    bingoSize: size,
    won: false,
    words: [],
    selected: [],
    setup: false,
    bingoWords: [],
  } as BingoType);
  const { selected, setup, bingoSize, won, words } = bingo;

  function play() {
    const itemCount = size * size;
    const items = [...buzzwords.words].sort(() => Math.random() - 0.5);

    setBingo({
      bingoSize: size,
      won: false,
      words: items.slice(0, itemCount),
      setup: true,
      selected: [],
      bingoWords: [],
    });
  }

  useEffect(() => {
    if (words.length > 0) {
      onBingoCreated();
    }
  }, [words]);

  useEffect(() => {
    if (selected.length >= bingoSize) {
      // iterate through all words to
      for (let x = 1; x < bingo.bingoSize; x++) {
        const res = isBingo(x, bingo);
        if (res !== false) {
          setBingo(prev => {
            return {
              ...prev,
              won: true,
              bingoWords: res,
            };
          });
        }
      }
    }
  }, [selected]);

  useEffect(() => {
    if (won) {
      onSucess();
    }
  }, [won]);

  function toggleWord(word: string) {
    if (selected.includes(word)) {
      setBingo(prev => {
        return {
          ...prev,
          selected: prev.selected.filter((item) => item !== word),
        };
      });
    } else {
      setBingo(prev => {
        return {
          ...prev,
          selected: [...prev.selected, word],
        };
      });
    }
  }

  return (
    <Grid container columnSpacing={{ xs: 4 }}>
      <Grid item xs={9}>
        {setup ?
          <ItemsRender bingo={bingo} toggleWord={toggleWord} /> :
          <div>Please press generate!</div>
        }
      </Grid>
      <Grid item xs={3}>
        <Button fullWidth size="large" variant="outlined" onClick={() => play()}>
          Generate
        </Button>
        <hr />
        <SizeSelect setSize={setSize} size={size} />
      </Grid>
    </Grid>
  );
}

export default GameController;
