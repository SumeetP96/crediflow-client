import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { defaultPage, defaultPerPage, defaultSortOrder } from '../constants';
import { TSortOrder } from '../interfaces';
import useQueryParams from './use-query-params';

interface ListingParams {
  page: number;
  perPage: number;
  search: string;
  sortBy: string;
  sortOrder: TSortOrder;
}

export default function useCommonListingParams() {
  const { getSearchParams, setSearchParams } = useQueryParams();

  const [params, setParams] = useState<ListingParams>(() => {
    const urlParams = getSearchParams();
    return {
      page: parseInt(String(urlParams.page ?? defaultPage), 10),
      perPage: parseInt(String(urlParams.perPage ?? defaultPerPage), 10),
      search: String(urlParams.search || ''),
      sortBy: String(urlParams.sortBy || ''),
      sortOrder: (urlParams.sortOrder as TSortOrder) || defaultSortOrder,
    };
  });

  const updateParams = useCallback(() => {
    const urlParams = getSearchParams();
    setParams(
      produce((draft) => {
        draft.page = parseInt(String(urlParams.page ?? defaultPage), 10);
        draft.perPage = parseInt(
          String(urlParams.perPage ?? defaultPerPage),
          10,
        );
        draft.search = String(urlParams.search || '');
        draft.sortBy = String(urlParams.sortBy || '');
        draft.sortOrder =
          (urlParams.sortOrder as TSortOrder) || defaultSortOrder;
      }),
    );

    if (urlParams.page === undefined || urlParams.perPage === undefined) {
      setSearchParams({
        ...(urlParams.page === undefined && { page: defaultPage }),
        ...(urlParams.perPage === undefined && { perPage: defaultPerPage }),
      });
    }
  }, [getSearchParams, setSearchParams]);

  useEffect(() => {
    updateParams();
  }, [updateParams]);

  return params;
}
