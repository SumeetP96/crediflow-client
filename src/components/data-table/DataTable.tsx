import { ArrowDownward, ArrowUpward, SwapVert } from '@mui/icons-material';
import {
  Box,
  Checkbox,
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
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { ReactNode, useMemo, useState } from 'react';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { EQueryParamKeys, TSortOrder } from '../../helpers/types';
import DataTableFooter, { IDataTableFooterProps } from '../data-table-footer/DataTableFooter';
import TableSkeleton from '../skeleton/TableSkeleton';
import { IDataTableColumn } from './types';

const fieldSortingIconMap: Record<TSortOrder, ReactNode> = {
  asc: <ArrowUpward fontSize="small" />,
  desc: <ArrowDownward fontSize="small" />,
  none: <SwapVert fontSize="small" />,
};

export interface IDataTableProps<T>
  extends Omit<IDataTableFooterProps, 'isDense' | 'onDensityChange' | 'rowCount'> {
  columns: IDataTableColumn<T>[];
  rows: T[];
  keyField: keyof T;
  sortBy: string;
  sortOrder: TSortOrder;
  onSort: (sortBy: string, sortDirection: TSortOrder) => void;
  isLoading: boolean;
  hoverable?: boolean;
  selectable?: boolean;
  selectOnRowClick?: boolean;
  onRowsSelection?: (row: T[]) => void;
}

export default function DataTable<T>({
  columns,
  rows,
  keyField,
  isLoading,
  hoverable = false,
  selectable = false,
  selectOnRowClick = false,
  onRowsSelection,
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
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.only('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.only('md'));

  // Avoid a layout jump when reaching the last page with empty rows.
  const rowCount = isMobile ? 7 : isTablet ? 11 : 5;
  const emptyRows = rows.length < rowCount ? rowCount - rows.length : 0;
  const rowHeight = 77 * emptyRows - 1;

  const { getSingleSearchParam } = useQueryParams();

  const isDense = getSingleSearchParam(EQueryParamKeys.IS_DENSE) === true;

  const [selectedRows, setSelectedRows] = useState<T[]>([]);

  const handleSorting = (sortByField: string, sortFieldOrder: string) => {
    if (sortByField !== sortBy) {
      onSort(sortByField, 'asc');
    } else {
      const newOrder: TSortOrder =
        sortFieldOrder === 'asc' ? 'desc' : sortFieldOrder === 'desc' ? 'none' : 'asc';
      onSort(sortBy, newOrder);
    }
  };

  const handleSelectAll = (event: React.ChangeEvent<HTMLInputElement>) => {
    let selection: T[] = [];
    if (event.target.checked) {
      selection = rows;
    }
    setSelectedRows(selection);
    onRowsSelection?.(selection);
  };

  const handleSelectRow = (checked: boolean, row: T) => {
    let selection: T[] = [];
    if (checked) {
      selection = selectedRows.concat([row]);
    } else {
      selection = selectedRows.filter((r) => r[keyField] !== row[keyField]);
    }
    setSelectedRows(selection);
    onRowsSelection?.(selection);
  };

  const selectedRowKeys = useMemo(() => {
    return selectedRows.map((row) => row[keyField]);
  }, [keyField, selectedRows]);

  const handleTableRowClick = (row: T) => {
    if (selectable && selectOnRowClick) {
      const isRowSelected = Boolean(selectedRows.find((r) => r[keyField] === row[keyField]));
      handleSelectRow(!isRowSelected, row);
    }
  };

  const generateSxProps = (col: IDataTableColumn<T>) => {
    return {
      ...(col.width && { width: col.width }),
      ...(col.minWidth && { minWidth: col.minWidth }),
      ...(col.maxWidth && { maxWidth: col.maxWidth }),
      ...(col.textAlign && { textAlign: col.textAlign }),
    };
  };

  const generateHeadFlexJustification = (direction?: string) => {
    switch (direction) {
      case 'left':
        return 'flex-start';
        break;

      case 'center':
        return 'center';
        break;

      case 'right':
        return 'flex-end';
        break;

      default:
        return 'flex-start';
    }
  };

  const renderColumn = (row: T, col: IDataTableColumn<T>) => {
    if (col.render) {
      return col.render(row);
    }
    return row[col.field as keyof T] as string;
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
      {selectedRows.length ? (
        <Box
          sx={{
            mx: { xs: 2, md: 5 },
            mt: { xs: 1, md: 0 },
            mb: 1,
            p: 1,
            border: `1px dashed ${theme.palette.text.primary}`,
            borderRadius: '12px',
          }}
        >
          <Typography align="center">
            Selected {selectedRows.length} of {rows.length} rows on this page
          </Typography>
        </Box>
      ) : null}

      <TableContainer sx={{ maxHeight: { xs: '55vh', sm: '60vh', md: '65vh', lg: '60vh' } }}>
        <Table size={isDense ? 'small' : 'medium'} stickyHeader sx={{ borderRadius: 0 }}>
          <TableHead>
            <TableRow>
              {selectable ? (
                <TableCell
                  sx={{
                    width: '50px',
                    borderBottom: 'none',
                    '& .MuiCheckbox-root': { py: 0 },
                  }}
                >
                  <Checkbox
                    checked={selectedRowKeys.length === rows.length}
                    onChange={handleSelectAll}
                  />
                </TableCell>
              ) : null}

              {columns.map((col) => (
                <TableCell
                  key={col.field as string}
                  sx={{
                    borderBottom: 'none',
                    ...generateSxProps(col),
                    ...col.sx,
                  }}
                >
                  <Box
                    display="flex"
                    justifyContent={generateHeadFlexJustification(col.textAlign)}
                    alignItems="center"
                    gap={1}
                  >
                    <Typography variant="subtitle2">{col.title}</Typography>

                    {col.sort ? (
                      <IconButton
                        color={
                          sortBy === col.field && sortOrder !== 'none' ? 'secondary' : 'default'
                        }
                        disabled={isLoading}
                        onClick={() => handleSorting(col.field as string, sortOrder)}
                        size="small"
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
                    sx={{
                      cursor: hoverable ? 'pointer' : 'default',
                      bgcolor: selectedRowKeys.includes(row[keyField])
                        ? theme.palette.action.selected
                        : 'inherit',
                    }}
                    onClick={() => handleTableRowClick(row)}
                  >
                    {selectable ? (
                      <TableCell sx={{ borderBottomStyle: 'dashed' }}>
                        <Checkbox
                          checked={selectedRowKeys.includes(row[keyField])}
                          onChange={(e) => handleSelectRow(e.target.checked, row)}
                        />
                      </TableCell>
                    ) : null}

                    {columns.map((col) => (
                      <TableCell
                        key={col.field as string}
                        sx={{
                          borderBottomStyle: 'dashed',
                          ...generateSxProps(col),
                          ...col.sx,
                        }}
                      >
                        <Box sx={{ paddingRight: col.sort ? '30px' : '', py: isDense ? 0 : 0.625 }}>
                          {renderColumn(row, col)}
                        </Box>
                      </TableCell>
                    ))}
                  </TableRow>
                ))}

                {emptyRows > 0 && (
                  <TableRow style={{ height: rowHeight }}>
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
        rowCount={rows.length}
        totalRecords={totalRecords}
        onPageChange={onPageChange}
        onPerPageChange={onPerPageChange}
        perPageOptions={perPageOptions}
        isDense={isDense}
        isLoading={isLoading}
      />
    </Paper>
  );
}
