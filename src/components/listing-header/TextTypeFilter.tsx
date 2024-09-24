import { Box, Typography } from '@mui/material';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';
import { ISelectedFilter } from './types';

export interface ITextTypeFilter<Col> {
  filter: ISelectedFilter<Col>;
  value: string;
  onChange: (value: string) => void;
}

export default function TextTypeFilter<Col>({ filter, value, onChange }: ITextTypeFilter<Col>) {
  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Typography variant="subtitle2">
        {filter.label} {filter.isExactMatch === true ? 'is' : 'contains'}:
      </Typography>

      <DebouncedSearchField
        hasSearchIcon={false}
        size="small"
        autoFocus
        variant="outlined"
        placeholder={`Filter by ${filter.field as string}`}
        debouncedTime={1000}
        minInputLength={1}
        value={value}
        onChange={onChange}
        sx={{ width: '100%', mt: 1 }}
      />
    </Box>
  );
}
