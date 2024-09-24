import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import {
  Box,
  FormControlLabel,
  Grid2,
  IconButton,
  Paper,
  Switch,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { defaultPerPageOptions } from '../../helpers/constants';
import { TSortOrder } from '../../helpers/types';
import TableSkeleton from '../skeleton/TableSkeleton';
import TablePaginationActions from './TablePaginationActions';

const fieldSortingIconMap: Record<TSortOrder, ReactNode> = {
  asc: <ArrowUpward fontSize="small" />,
  desc: <ArrowDownward fontSize="small" />,
  none: <SwapVert fontSize="small" />,
};

export interface IDataTableExtraColumns {
  actions: string;
}

export type TDataTableFilterType = 'text' | 'select' | 'multiselect' | 'date' | 'daterange';

export interface IDataTableFilterSelectOption {
  label: string;
  value: string | number;
  [key: string]: unknown;
}

export interface IDataTableFilter {
  type: TDataTableFilterType;
  label: string;
  icon?: ReactNode;
  isExactMatch?: boolean;
  selectOptions?: IDataTableFilterSelectOption[];
  render?: (filter: IDataTableFilter, value?: string | number) => string | number;
}

export interface IDataTableColumn<T> {
  field: keyof T;
  title: string;
  sx?: SxProps;
  render?: (params: T) => ReactNode;
  sort?: boolean;
  filter?: IDataTableFilter;
  select?: boolean;
}

export interface IDataTableProps<T> {
  columns: IDataTableColumn<T>[];
  rows: T[];
  keyField: keyof T;
  sortBy: string;
  sortOrder: TSortOrder;
  onSort: (sortBy: string, sortDirection: TSortOrder) => void;
  page: number;
  perPage: number;
  totalRecords: number;
  onPageChange: (nextPage: number) => void;
  onPerPageChange: (perPage: number) => void;
  perPageOptions?: ReadonlyArray<number | { value: number; label: string }>;
  isLoading: boolean;
  hoverable?: boolean;
}

function DataTable<T>({
  columns,
  rows,
  keyField,
  sortBy,
  sortOrder,
  onSort,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = defaultPerPageOptions,
  totalRecords,
  isLoading,
  hoverable = false,
}: IDataTableProps<T>) {
  const [isDense, setIsDense] = useState(false);

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = perPage - rows.length;

  const handleSorting = (sortByField: string, sortFieldOrder: string) => {
    if (sortByField !== sortBy) {
      onSort(sortByField, 'asc');
    } else {
      const newOrder: TSortOrder =
        sortFieldOrder === 'asc' ? 'desc' : sortFieldOrder === 'desc' ? 'none' : 'asc';
      onSort(sortBy, newOrder);
    }
  };

  return (
    <Paper
      elevation={0}
      sx={{ overflowX: 'auto', borderTopRightRadius: 0, borderTopLeftRadius: 0 }}
    >
      <TableContainer sx={{ maxHeight: '440px' }}>
        <Table size={isDense ? 'small' : 'medium'} stickyHeader sx={{ borderRadius: 0 }}>
          <TableHead>
            <TableRow>
              {columns.map((col) => (
                <TableCell key={col.field as string} sx={{ borderBottom: 'none', ...col.sx }}>
                  <Box
                    sx={{
                      position: 'relative',
                      paddingRight: col.sort ? '30px' : '',
                    }}
                  >
                    {col.title}

                    {col.sort ? (
                      <IconButton
                        color={
                          sortBy === col.field && sortOrder !== 'none' ? 'secondary' : 'default'
                        }
                        disabled={isLoading}
                        onClick={() => handleSorting(col.field as string, sortOrder)}
                        size="small"
                        sx={{
                          mr: 1,
                          position: 'absolute',
                          right: 0,
                          top: '50%',
                          transform: 'translateY(-50%)',
                        }}
                      >
                        {fieldSortingIconMap[col.field === sortBy ? sortOrder : 'none']}
                      </IconButton>
                    ) : null}
                  </Box>
                </TableCell>
              ))}
            </TableRow>
          </TableHead>

          {isLoading ? (
            <TableSkeleton rowCount={perPage} colCount={columns.length} hasFooter />
          ) : (
            <>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    hover={hoverable}
                    key={row[keyField as keyof T] as string}
                    sx={{ cursor: hoverable ? 'pointer' : 'default' }}
                  >
                    {columns.map((col) => (
                      <TableCell
                        key={col.field as string}
                        sx={{ borderBottomStyle: 'dashed', ...col.sx }}
                      >
                        <Box sx={{ paddingRight: col.sort ? '30px' : '', py: isDense ? 0 : 0.5 }}>
                          {col.render ? col.render(row) : (row[col.field as keyof T] as string)}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: 53 * emptyRows - 1 }}>
                    <TableCell colSpan={columns.length}>
                      <Typography sx={{ textAlign: 'center' }} color="textDisabled">
                        No data found
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </>
          )}
        </Table>
      </TableContainer>

      <Grid2 container sx={{ pl: 3, pr: 1, py: 0.25, alignItems: 'center' }}>
        <Grid2 size={{ xs: 12, md: 2 }}>
          <FormControlLabel
            control={
              <Switch
                size="small"
                checked={isDense}
                onChange={(e) => setIsDense(e.target.checked)}
                name="dense"
              />
            }
            label="Dense"
          />
        </Grid2>

        <Grid2 size={{ xs: 12, md: 10 }}>
          <TablePagination
            component="div"
            sx={{ borderBottom: 'none' }}
            rowsPerPageOptions={perPageOptions}
            count={totalRecords}
            rowsPerPage={perPage}
            page={!totalRecords || totalRecords <= 0 ? 0 : page}
            slotProps={{
              select: {
                inputProps: { 'aria-label': 'rows per page' },
                native: true,
              },
            }}
            onPageChange={(_, newPage) => onPageChange(newPage)}
            onRowsPerPageChange={(e) => onPerPageChange(parseInt(e.target.value, 10))}
            ActionsComponent={TablePaginationActions}
          />
        </Grid2>
      </Grid2>
    </Paper>
  );
}

export default DataTable;
