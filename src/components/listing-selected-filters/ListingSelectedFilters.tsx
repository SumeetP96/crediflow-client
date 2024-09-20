import { Box, Chip, SxProps, Typography } from '@mui/material';
import { ReactNode } from 'react';

export type IListingSelectedFilter = {
  key: string;
  label: ReactNode;
  onClick?: (filter: IListingSelectedFilter) => void;
  onDelete?: (filter: IListingSelectedFilter) => void;
};

export interface IListingSelectedFilters {
  filters: IListingSelectedFilter[];
  sx?: SxProps;
}

export default function ListingSelectedFilters({ filters, sx }: IListingSelectedFilters) {
  if (!filters.length) {
    return null;
  }

  return (
    <Box sx={{ display: 'flex', alignItems: 'start', flexWrap: 'wrap', gap: 1, ...sx }}>
      {filters.map((filter) => (
        <Chip
          key={filter.key}
          label={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography variant="subtitle2" sx={{ fontWeight: 600, textTransform: 'uppercase' }}>
                {filter.key} :
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {filter.label}
              </Typography>
            </Box>
          }
          variant="outlined"
          size="medium"
          {...(filter.onClick ? { onClick: () => filter.onClick?.(filter) } : {})}
          {...(filter.onDelete ? { onDelete: () => filter.onDelete?.(filter) } : {})}
        />
      ))}
    </Box>
  );
}
