import { Box, FormControlLabel, Pagination, Switch, Typography } from '@mui/material';
import { Dispatch, SetStateAction, useMemo } from 'react';
import { defaultPerPageOptions } from '../../helpers/constants';
import DataTableFooterPerPageSelect, {
  IDataTableFooterPerPageSelectProps,
} from '../data-table-footer-per-page-select/DataTableFooterPerPageSelect';

export interface IDataTableFooterProps extends IDataTableFooterPerPageSelectProps {
  page: number;
  totalRecords: number;
  onPageChange: (nextPage: number) => void;
  isDense: boolean;
  onDensityChange: Dispatch<SetStateAction<boolean>>;
  isLoading: boolean;
}

export default function DataTableFooter({
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = defaultPerPageOptions,
  totalRecords,
  isDense,
  onDensityChange,
  isLoading,
}: IDataTableFooterProps) {
  const pageCount = Math.floor(totalRecords / perPage);

  const [startRange, endRange] = useMemo(() => {
    if (totalRecords > 0) {
      const start = (page - 1) * perPage;
      const end = start + perPage;
      return [start + 1, end];
    }
    return [0, 0];
  }, [page, perPage, totalRecords]);

  return (
    <Box
      sx={{
        px: 2,
        py: 1,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        width: '100%',
      }}
    >
      <Box
        sx={{ width: { xs: '100%', md: 'auto' }, display: 'flex', justifyContent: 'space-between' }}
      >
        <FormControlLabel
          sx={{ pl: 1.5 }}
          control={
            <Switch
              size="small"
              checked={isDense}
              onChange={(e) => onDensityChange(e.target.checked)}
              name="dense"
            />
          }
          label="Dense"
        />

        <DataTableFooterPerPageSelect
          disabled={isLoading}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          perPageOptions={perPageOptions}
          sx={{ display: { xs: 'flex', md: 'none' } }}
        />
      </Box>

      <Box
        sx={{
          width: { xs: '100%', md: 'auto' },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 3,
          mt: { xs: 1, md: 0 },
        }}
      >
        <DataTableFooterPerPageSelect
          disabled={isLoading}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          perPageOptions={perPageOptions}
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
        />

        <Typography sx={{ pl: 1 }}>
          {startRange}-{endRange} of {totalRecords}
        </Typography>

        <Box sx={{ py: { xs: 1, md: 0 } }}>
          <Pagination
            disabled={isLoading}
            count={pageCount}
            page={page}
            onChange={(_, newPage) => onPageChange(newPage)}
            siblingCount={0}
            showFirstButton
            showLastButton
          />
        </Box>
      </Box>
    </Box>
  );
}
