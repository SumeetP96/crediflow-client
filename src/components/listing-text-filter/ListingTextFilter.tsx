import { Box, Typography } from '@mui/material';
import { IListingSelectedFilter } from '../../helpers/types';
import DebouncedSearchField from '../debounced-search-field/DebouncedTextField';

export interface IListingTextFilter<Col> {
  filter: IListingSelectedFilter<Col>;
  value: string;
  onChange: (value: string) => void;
}

export default function ListingTextFilter<Col>({
  filter,
  value,
  onChange,
}: IListingTextFilter<Col>) {
  const isExactMatch = filter.type === 'number' || filter.type === 'text-exact';

  return (
    <Box sx={{ px: 2, pt: 1, pb: 2 }}>
      <Typography variant="subtitle2">
        {filter.label} {isExactMatch ? 'is' : 'contains'}:
      </Typography>

      <DebouncedSearchField
        type={filter.type === 'number' ? 'number' : 'text'}
        hasSearchIcon={false}
        size="small"
        autoFocus
        variant="outlined"
        placeholder={`Filter by ${filter.field as string}`}
        debounceTime={1000}
        minInputLength={1}
        value={value}
        onChange={onChange}
        sx={{ width: '100%', mt: 1 }}
      />
    </Box>
  );
}
