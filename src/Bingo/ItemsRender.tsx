import Grid from '@mui/material/Grid';
import classnames from 'classnames';

import { BingoType } from './GameController';
import './game.css';

type BuzzTileProps = {
  word: string,
  isSelected: boolean,
  select: () => void,
  disabled: boolean,
  isBingoWord: boolean,
};

function BuzzTile({
  word,
  isSelected,
  select,
  disabled,
  isBingoWord,
} : BuzzTileProps) {
  return (
    <button
      aria-selected={isSelected}
      className={classnames(['buzz', {
        selected: isSelected,
        bingo: isBingoWord,
        disabled,
      }])}
      {...(!disabled && { onClick: () => select() })}
    >
      {word}
    </button>
  );
}

type Props = {
  bingo: BingoType,
  toggleWord: (item: string) => void,
};

function ItemsRender({ bingo, toggleWord } : Props) {
  const { words, bingoSize, selected, won, bingoWords } = bingo;

  return (
    <Grid
      container
      columns={bingoSize}
      rowSpacing={1}
      columnSpacing={{ md: 1 }}
    >
      {words.map(item => {
        const isSelected = selected.includes(item);
        const isBingoWord = bingoWords.includes(item);

        return (
          <Grid item key={item} xs={1}>
            <BuzzTile
              word={item}
              isSelected={isSelected}
              isBingoWord={isBingoWord}
              disabled={won}
              select={() => toggleWord(item)}
            />
          </Grid>
        );
      })}
    </Grid>
  );
}

export default ItemsRender;
