import { Skeleton, TableBody, TableCell, TableRow } from '@mui/material';
import { useMemo } from 'react';

export interface ITableSkeleton {
  rowCount: number;
  colCount: number;
  hasFooter?: boolean;
}

export default function TableSkeleton({ rowCount, colCount, hasFooter = false }: ITableSkeleton) {
  const rowArray = useMemo(() => {
    return Array.from({ length: hasFooter ? rowCount + 1 : rowCount }, (_, i) => i);
  }, [hasFooter, rowCount]);

  const colArray = useMemo(() => {
    return Array.from({ length: colCount }, (_, i) => i);
  }, [colCount]);

  return (
    <TableBody>
      {rowArray.map((i) => {
        const isLastRow = hasFooter ? rowCount === i : rowCount - 1 === i;
        return (
          <TableRow key={i}>
            {isLastRow && hasFooter ? (
              <TableCell sx={{ borderBottom: isLastRow ? 'none' : '' }} colSpan={colCount}>
                <Skeleton animation="wave" />
              </TableCell>
            ) : (
              colArray.map((j) => (
                <TableCell key={j} sx={{ borderBottom: isLastRow ? 'none' : '' }}>
                  <Skeleton animation="wave" />
                </TableCell>
              ))
            )}
          </TableRow>
        );
      })}
    </TableBody>
  );
}
