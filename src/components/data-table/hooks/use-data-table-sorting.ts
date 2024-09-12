import { useEffect, useState } from 'react';

export type ISortOrder = 'asc' | 'desc' | 'none';

export interface ISorting {
  [key: string]: ISortOrder;
}

export interface IDataTableSortingParams<T> {
  rows: T[];
  onSort?: (params: ISorting) => void;
}

export default function useDataTableSorting<T>({
  rows,
  onSort,
}: IDataTableSortingParams<T>) {
  const [sorting, setSorting] = useState<ISorting>();

  const [sortedRows, setSortedRows] = useState<T[]>([]);

  useEffect(() => {
    setSortedRows(rows);
  }, [rows]);

  const getFieldSorting = (field: string): ISortOrder => {
    return sorting?.[field as string] || 'none';
  };

  const sortRows = (field: string) => {
    const sortOrder = getFieldSorting(field);

    if (sortOrder === 'none') {
      setSortedRows(rows);
      return;
    }

    setSortedRows((prevRows) => {
      // Create a new array and sort it
      return [...prevRows].sort((a, b) => {
        const aValue = a[field as keyof T];
        const bValue = b[field as keyof T];

        // Optimize for numbers and strings
        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        // Fallback for other types
        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    });
  };

  const updateSorting = (field: string) => {
    const currentOrder = getFieldSorting(field);

    const newOrder: ISortOrder =
      currentOrder === 'asc'
        ? 'desc'
        : currentOrder === 'desc'
        ? 'none'
        : 'asc';

    setSorting((prev) => ({ ...prev, [field as string]: newOrder }));

    if (onSort) {
      onSort(sorting!);
    } else {
      sortRows(field);
    }
  };

  return { sortedRows, sorting, getFieldSorting, updateSorting };
}
