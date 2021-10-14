import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { SizeRange } from './GameController';

type Props = {
  size: SizeRange,
  setSize: (newSize: SizeRange) => void,
};

function SizeSelect({ size, setSize } : Props) {
  return (
    <div>
      <FormControl sx={{ m: 1, minWidth: '100%' }}>
        <InputLabel id="size-label">Size</InputLabel>
        <Select
          labelId="size-label"
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value as SizeRange)}
          autoWidth
          label="Size"
        >
          <MenuItem value={3}>3</MenuItem>
          <MenuItem value={4}>4</MenuItem>
          <MenuItem value={5}>5</MenuItem>
          <MenuItem value={6}>6</MenuItem>
          <MenuItem value={7}>7</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}

export default SizeSelect;
