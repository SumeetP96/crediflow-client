import { useEffect, useState } from 'react';

export interface IUseDataTablePaginationParams<T> {
  page: number;
  perPage: number;
  rows: T[];
}

export default function useDataTableLocalPagination<T>({
  page,
  perPage,
  rows,
}: IUseDataTablePaginationParams<T>) {
  const [paginatedRows, setPaginatedRows] = useState<T[]>(rows);

  useEffect(() => {
    setPaginatedRows(rows.slice(page * perPage, (page + 1) * perPage));
  }, [page, perPage, rows]);

  return { paginatedRows };
}
