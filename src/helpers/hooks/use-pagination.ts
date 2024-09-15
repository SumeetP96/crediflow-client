import { produce } from 'immer';

export default function usePagination() {
  const paginateData = <T>(rows: T[], page: number, perPage: number) => {
    return produce(rows, (draft) => {
      return draft.slice(page * perPage, (page + 1) * perPage);
    });
  };

  return { paginateData };
}
