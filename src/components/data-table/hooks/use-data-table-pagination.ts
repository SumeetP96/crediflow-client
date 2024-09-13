import { useEffect, useState } from 'react';

export interface IUseDataTablePaginationParams<T> {
  defaultPage?: number;
  defaultPerPage?: number;
  totalRows: number;
  rows: T[];
  internalPagination: boolean;
}

export default function useDataTablePagination<T>({
  defaultPage,
  defaultPerPage,
  totalRows,
  rows,
  internalPagination,
}: IUseDataTablePaginationParams<T>) {
  const [page, setPage] = useState(defaultPage || 0);
  const [perPage, setPerPage] = useState(defaultPerPage || 5);
  const [paginatedRows, setPaginatedRows] = useState<T[]>(rows);

  useEffect(() => {
    if (internalPagination) {
      setPaginatedRows(rows.slice(page * perPage, (page + 1) * perPage));
    }
  }, [internalPagination, page, perPage, rows]);

  const handlePageChange = (
    event: React.MouseEvent<HTMLButtonElement> | null,
    newPage: number,
  ) => {
    setPage(newPage);
  };

  const handlePerPageChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    page,
    perPage,
    totalPages: Math.ceil(totalRows / perPage),
    paginatedRows,
    handlePageChange,
    handlePerPageChange,
  };
}
