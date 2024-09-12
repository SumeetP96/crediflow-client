import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import {
  Box,
  IconButton,
  Paper,
  SxProps,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@mui/material';
import useDataTableSorting, {
  ISorting,
  ISortOrder,
} from './hooks/use-data-table-sorting';

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
}

function DataTable<T>({ columns, rows, keyField, onSort }: IDataTableProps<T>) {
  const { sortedRows, getFieldSorting, updateSorting } = useDataTableSorting<T>(
    {
      rows,
      onSort,
    },
  );

  return (
    <Paper elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            {columns.map((col) => (
              <TableCell key={col.field as string} sx={col.sx}>
                <Box
                  sx={{
                    position: 'relative',
                    borderRight: '1px solid gainsboro',
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
        </TableBody>
      </Table>
    </Paper>
  );
}

export default DataTable;
