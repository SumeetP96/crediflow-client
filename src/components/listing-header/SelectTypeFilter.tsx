import { Autocomplete, Box, TextField, Typography } from '@mui/material';
import { ISelectedFilter } from './types';

export interface ISelectTypeFilterProps<Col> {
  filter: ISelectedFilter<Col>;
  value: string;
  onChange: (value: string) => void;
}

export default function SelectTypeFilter<Col>({
  filter,
  value,
  onChange,
}: ISelectTypeFilterProps<Col>) {
  const selectedOption = filter.selectOptions?.find((opt) => opt.value === value);

  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Typography variant="subtitle2">{filter.label} is:</Typography>

      <Autocomplete
        disableClearable
        autoFocus
        value={selectedOption}
        disablePortal
        size="small"
        options={filter.selectOptions || []}
        sx={{ mt: 1, minWidth: 200 }}
        renderInput={(params) => <TextField {...params} autoFocus />}
        onChange={(_, v) => onChange(v.value as string)}
      />
    </Box>
  );
}
