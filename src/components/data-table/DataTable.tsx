import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { defaultPerPageOptions } from '../../helpers/constants';
import { TSortOrder } from '../../helpers/interfaces';
import TableSkeleton from '../skeleton/TableSkeleton';
import TablePaginationActions from './TablePaginationActions';

const fieldSortingIconMap: Record<TSortOrder, React.ReactNode> = {
  asc: <ArrowUpward fontSize="small" />,
  desc: <ArrowDownward fontSize="small" />,
  none: <SwapVert fontSize="small" />,
};

export interface IDataTableColumn<T> {
  field: keyof T;
  title: string;
  sx?: SxProps;
  sorting?: boolean;
  render?: (params: T) => string | number | React.ReactNode;
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
}: IDataTableProps<T>) {
  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = perPage - rows.length;

  const handleSorting = (sortByField: string, sortFieldOrder: string) => {
    if (sortByField !== sortBy) {
      onSort(sortByField, 'asc');
    } else {
      const newOrder: TSortOrder =
        sortFieldOrder === 'asc'
          ? 'desc'
          : sortFieldOrder === 'desc'
          ? 'none'
          : 'asc';
      onSort(sortBy, newOrder);
    }
  };

  return (
    <Paper elevation={0} sx={{ overflowX: 'auto' }}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field as string} sx={col.sx}>
                <Box
                  sx={{
                    position: 'relative',
                    paddingRight: col.sorting ? '30px' : '',
                  }}
                >
                  {col.title}

                  {col.sorting ? (
                    <IconButton
                      color={
                        sortBy === col.field && sortOrder !== 'none'
                          ? 'secondary'
                          : 'default'
                      }
                      disabled={isLoading}
                      onClick={() =>
                        handleSorting(col.field as string, sortOrder)
                      }
                      size="small"
                      sx={{
                        mr: 1,
                        position: 'absolute',
                        right: 0,
                        top: '50%',
                        transform: 'translateY(-50%)',
                      }}
                    >
                      {
                        fieldSortingIconMap[
                          col.field === sortBy ? sortOrder : 'none'
                        ]
                      }
                    </IconButton>
                  ) : null}
                </Box>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>

        {isLoading ? (
          <TableSkeleton
            rowCount={perPage}
            colCount={columns.length}
            hasFooter
          />
        ) : (
          <>
            <TableBody>
              {rows.map((row) => (
                <TableRow key={row[keyField as keyof T] as string}>
                  {columns.map((col) => (
                    <TableCell key={col.field as string} sx={col.sx}>
                      <Box sx={{ paddingRight: col.sorting ? '30px' : '' }}>
                        {col.render
                          ? col.render(row)
                          : (row[col.field as keyof T] as string)}
                      </Box>
                    </TableCell>
                  ))}
                </TableRow>
              ))}

              {emptyRows > 0 && (
                <TableRow style={{ height: 53 * emptyRows - 1 }}>
                  <TableCell colSpan={columns.length}>
                    <Typography
                      sx={{ textAlign: 'center' }}
                      color="textDisabled"
                    >
                      No data found
                    </Typography>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>

            <TableFooter>
              <TableRow>
                <TablePagination
                  colSpan={columns.length}
                  sx={{ borderBottom: 'none' }}
                  rowsPerPageOptions={perPageOptions}
                  count={totalRecords}
                  rowsPerPage={perPage}
                  page={!totalRecords || totalRecords <= 0 ? 0 : page}
                  slotProps={{
                    select: {
                      inputProps: {
                        'aria-label': 'rows per page',
                      },
                      native: true,
                    },
                  }}
                  onPageChange={(_, newPage) => onPageChange(newPage)}
                  onRowsPerPageChange={(e) =>
                    onPerPageChange(parseInt(e.target.value, 10))
                  }
                  ActionsComponent={TablePaginationActions}
                />
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
    </Paper>
  );
}

export default DataTable;
