import { Draft, produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';

export type TSortOrder = 'asc' | 'desc' | 'none';

export interface ISorting {
  [key: string]: TSortOrder;
}

export interface IUseDataTableSortingParams<T> {
  rows: T[];
  onSort?: (params: ISorting) => void;
}

export default function useDataTableSorting<T>({
  rows,
  onSort,
}: IUseDataTableSortingParams<T>) {
  const [sorting, setSorting] = useState<ISorting>({});
  const [sortedRows, setSortedRows] = useState<T[]>([]);

  useEffect(() => {
    setSortedRows([...rows]);
  }, [rows]);

  const getFieldSorting = useCallback(
    (field: string): TSortOrder => {
      return sorting[field] || 'none';
    },
    [sorting],
  );

  const sortRows = useCallback(
    (field: string, sortOrder: TSortOrder) => {
      if (sortOrder === 'none') {
        setSortedRows([...rows]);
        return;
      }

      setSortedRows(
        produce((draft) => {
          draft.sort((a, b) => {
            const aValue = a[field as keyof Draft<T>];
            const bValue = b[field as keyof Draft<T>];

            if (typeof aValue === 'number' && typeof bValue === 'number') {
              return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
            }

            if (typeof aValue === 'string' && typeof bValue === 'string') {
              return sortOrder === 'asc'
                ? aValue.localeCompare(bValue)
                : bValue.localeCompare(aValue);
            }

            if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
            if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
            return 0;
          });
        }),
      );
    },
    [rows],
  );

  const updateSorting = useCallback(
    (field: string) => {
      const currentOrder = getFieldSorting(field);
      const newOrder: TSortOrder =
        currentOrder === 'asc'
          ? 'desc'
          : currentOrder === 'desc'
          ? 'none'
          : 'asc';

      setSorting(
        produce((draft) => {
          draft[field] = newOrder;
        }),
      );

      if (onSort) {
        onSort({ ...sorting, [field]: newOrder });
      } else {
        sortRows(field, newOrder);
      }
    },
    [getFieldSorting, onSort, sorting, sortRows],
  );

  return { sortedRows, sorting, getFieldSorting, updateSorting };
}
