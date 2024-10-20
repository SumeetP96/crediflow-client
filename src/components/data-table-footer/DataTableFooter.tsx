import { ChevronLeft, ChevronRight, FirstPage, LastPage } from '@mui/icons-material';
import { Box, FormControlLabel, IconButton, Pagination, Switch, Typography } from '@mui/material';
import { useMemo } from 'react';
import { defaultPerPageOptions } from '../../helpers/constants';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { EQueryParamKeys } from '../../helpers/types';
import DataTableFooterPerPageSelect, {
  IDataTableFooterPerPageSelectProps,
} from '../data-table-footer-per-page-select/DataTableFooterPerPageSelect';

export interface IDataTableFooterProps extends IDataTableFooterPerPageSelectProps {
  page: number;
  totalRecords: number;
  rowCount: number;
  onPageChange: (nextPage: number) => void;
  isDense: boolean;
  isLoading: boolean;
}

export default function DataTableFooter({
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = defaultPerPageOptions,
  totalRecords,
  rowCount,
  isDense,
  isLoading,
}: IDataTableFooterProps) {
  const { setSearchParams } = useQueryParams();

  const pageCount = Math.ceil(totalRecords / perPage);

  const [startRange, endRange] = useMemo(() => {
    if (totalRecords > 0) {
      const start = page === 1 ? 1 : (page - 1) * perPage;
      const end = (page === 1 ? start - 1 : start) + (rowCount < perPage ? rowCount : perPage);
      return [start, end];
    }
    return [0, 0];
  }, [page, perPage, rowCount, totalRecords]);

  const isFirstPage = page === 1;

  const isLastPage = pageCount === page;

  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      flexWrap="wrap"
      sx={{ px: 2, py: 1, width: '100%' }}
    >
      <Box display="flex" justifyContent="space-between" sx={{ width: { xs: '100%', md: 'auto' } }}>
        <FormControlLabel
          sx={{ pl: 1.5 }}
          control={
            <Switch
              size="small"
              checked={isDense}
              onChange={(e) =>
                setSearchParams({ [EQueryParamKeys.IS_DENSE]: e.target.checked || null })
              }
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
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        gap={3}
        sx={{ width: { xs: '100%', md: 'auto' }, mt: { xs: 1, md: 0 } }}
      >
        <DataTableFooterPerPageSelect
          disabled={isLoading}
          perPage={perPage}
          onPerPageChange={onPerPageChange}
          perPageOptions={perPageOptions}
          sx={{ display: { xs: 'none', md: 'flex' }, mr: 2 }}
        />

        <Typography sx={{ pl: 1 }}>
          {startRange}
          <small> to </small>
          {endRange} <small>of</small> {totalRecords}
        </Typography>

        <Box>
          <Pagination
            disabled={isLoading}
            count={pageCount}
            page={page}
            onChange={(_, newPage) => onPageChange(newPage)}
            siblingCount={1}
            showFirstButton
            showLastButton
            sx={{ display: { xs: 'none', sm: 'flex' } }}
          />

          <Box
            sx={{
              width: '160px',
              display: { xs: 'flex', sm: 'none' },
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <IconButton disabled={isFirstPage} onClick={() => onPageChange(1)}>
              <FirstPage />
            </IconButton>

            <IconButton
              disabled={isFirstPage}
              onClick={() => onPageChange(page > 1 ? page - 1 : 1)}
            >
              <ChevronLeft />
            </IconButton>

            <IconButton
              disabled={isLastPage}
              onClick={() => onPageChange(page < pageCount ? page + 1 : pageCount)}
            >
              <ChevronRight />
            </IconButton>

            <IconButton disabled={isLastPage} onClick={() => onPageChange(pageCount)}>
              <LastPage />
            </IconButton>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
