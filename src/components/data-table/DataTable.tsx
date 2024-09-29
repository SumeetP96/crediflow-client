import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import {
  Box,
  Fade,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { ReactNode, useState } from 'react';
import { TSortOrder } from '../../helpers/types';
import DataTableFooter, { IDataTableFooterProps } from '../data-table-footer/DataTableFooter';
import TableSkeleton from '../skeleton/TableSkeleton';
import { IDataTableColumn } from './types';

const fieldSortingIconMap: Record<TSortOrder, ReactNode> = {
  asc: <ArrowUpward fontSize="small" />,
  desc: <ArrowDownward fontSize="small" />,
  none: <SwapVert fontSize="small" />,
};

export interface IDataTableProps<T>
  extends Omit<IDataTableFooterProps, 'isDense' | 'onDensityChange'> {
  columns: IDataTableColumn<T>[];
  rows: T[];
  keyField: keyof T;
  sortBy: string;
  sortOrder: TSortOrder;
  onSort: (sortBy: string, sortDirection: TSortOrder) => void;
  isLoading: boolean;
  hoverable?: boolean;
}

function DataTable<T>({
  columns,
  rows,
  keyField,
  isLoading,
  hoverable = false,
  sortBy,
  sortOrder,
  onSort,
  page,
  perPage,
  onPageChange,
  onPerPageChange,
  perPageOptions,
  totalRecords,
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
      sx={{
        overflowX: 'auto',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
      }}
    >
      <TableContainer sx={{ maxHeight: { xs: '55vh', sm: '60vh', md: '65vh', lg: '60vh' } }}>
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
            <Fade in>
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
                        <Box sx={{ paddingRight: col.sort ? '30px' : '', py: isDense ? 0 : 0.625 }}>
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
                        {rows.length ? 'No more data' : 'No data found'}
                      </Typography>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Fade>
          )}
        </Table>
      </TableContainer>

      <DataTableFooter
        page={page}
        perPage={perPage}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        perPageOptions={perPageOptions}
        isDense={isDense}
        onDensityChange={setIsDense}
        isLoading={isLoading}
      />
    </Paper>
  );
}

export default DataTable;
