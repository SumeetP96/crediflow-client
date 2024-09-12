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
import useDataTableSorting, {
  ISorting,
  ISortOrder,
} from './hooks/use-data-table-sorting';
import TablePaginationActions from './TablePaginationActions';

const fieldSortingIconMap: Record<ISortOrder, React.ReactNode> = {
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
  onSort?: (params: ISorting) => void;
  page: number;
  perPage: number;
  totalRecords: number;
  onPageChange: (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => void;
  onPerPageChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => void;
  perPageOptions?: ReadonlyArray<number | { value: number; label: string }>;
}

function DataTable<T>({
  columns,
  rows,
  keyField,
  onSort,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions = [5, 10, 25],
  totalRecords,
}: IDataTableProps<T>) {
  const { sortedRows, getFieldSorting, updateSorting } = useDataTableSorting<T>(
    { rows, onSort },
  );

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows = perPage - rows.length;

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
                      color={
                        getFieldSorting(col.field as string) === 'none'
                          ? 'default'
                          : 'secondary'
                      }
                      onClick={() => updateSorting(col.field as string)}
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
                          getFieldSorting(col.field as string)
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
          {sortedRows.map((row) => (
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
              page={page}
              slotProps={{
                select: {
                  inputProps: {
                    'aria-label': 'rows per page',
                  },
                  native: true,
                },
              }}
              onPageChange={onPageChange}
              onRowsPerPageChange={onPerPageChange}
              ActionsComponent={TablePaginationActions}
            />
          </TableRow>
        </TableFooter>
      </Table>
    </Paper>
  );
}

export default DataTable;
