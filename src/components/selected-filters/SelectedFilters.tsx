import { Box, Chip, Typography } from '@mui/material';
import { ReactNode } from 'react';

export type ISelectedFilter = {
  key: string;
  label: ReactNode;
  onClick?: (filter: ISelectedFilter) => void;
  onDelete?: (filter: ISelectedFilter) => void;
};

export interface ISelectedFilters {
  filters: ISelectedFilter[];
}

export default function SelectedFilters({ filters }: ISelectedFilters) {
  return (
    <Box
      sx={{ display: 'flex', alignItems: 'start', flexWrap: 'wrap', gap: 1 }}
    >
      {filters.map((filter) => (
        <Chip
          key={filter.key}
          label={
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Typography
                variant="subtitle2"
                sx={{ fontWeight: 600, textTransform: 'uppercase' }}
              >
                {filter.key} :
              </Typography>
              <Typography variant="subtitle2" sx={{ fontWeight: 400 }}>
                {filter.label}
              </Typography>
            </Box>
          }
          variant="outlined"
          size="medium"
          {...(filter.onClick
            ? { onClick: () => filter.onClick?.(filter) }
            : {})}
          {...(filter.onDelete
            ? { onDelete: () => filter.onDelete?.(filter) }
            : {})}
        />
      ))}
    </Box>
  );
}
