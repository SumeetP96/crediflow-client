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
} from '@mui/material';
import { defaultPerPageOptions } from '../../helpers/constants';
import { TSortOrder } from '../../helpers/interfaces';
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
                    pr: col.sorting ? 2 : 0,
                  }}
                >
                  {col.title}

                  {col.sorting ? (
                    <IconButton
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

        <TableBody>
          {rows.map((row) => (
            <TableRow key={row[keyField as keyof T] as string}>
              {columns.map((col) => (
                <TableCell key={col.field as string} sx={col.sx}>
                  {col.render
                    ? col.render(row)
                    : (row[col.field as keyof T] as string)}
                </TableCell>
              ))}
            </TableRow>
          ))}

          {emptyRows > 0 && (
            <TableRow style={{ height: 53 * emptyRows }}>
              <TableCell colSpan={columns.length} />
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
      </Table>
    </Paper>
  );
}

export default DataTable;
