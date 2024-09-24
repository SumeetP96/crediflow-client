import { Draft, produce } from 'immer';
import { TSortOrder } from '../types';

export default function useSorting() {
  const sortData = <T>(data: T[], field: string, sortOrder: TSortOrder) => {
    if (sortOrder === 'none') {
      return data;
    }

    return produce(data, (draft) => {
      draft.sort((a, b) => {
        const aValue = a[field as keyof Draft<T>];
        const bValue = b[field as keyof Draft<T>];

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
        }

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortOrder === 'asc' ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
        }

        if (aValue < bValue) return sortOrder === 'asc' ? -1 : 1;
        if (aValue > bValue) return sortOrder === 'asc' ? 1 : -1;
        return 0;
      });
    });
  };

  return { sortData };
}
