import { produce } from 'immer';
import { useCallback, useEffect, useState } from 'react';
import { defaultPage, defaultPerPage, defaultSortOrder } from '../constants';
import { EQueryParamKeys, TSortOrder } from '../types';
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
      page: parseInt(String(urlParams[EQueryParamKeys.PAGE] ?? defaultPage), 10),
      perPage: parseInt(String(urlParams[EQueryParamKeys.PER_PAGE] ?? defaultPerPage), 10),
      search: String(urlParams[EQueryParamKeys.SEARCH] || ''),
      sortBy: String(urlParams[EQueryParamKeys.SORT_BY] || ''),
      sortOrder: (urlParams[EQueryParamKeys.SORT_ORDER] as TSortOrder) || defaultSortOrder,
    };
  });

  const updateParams = useCallback(() => {
    const urlParams = getSearchParams();
    setParams(
      produce((draft) => {
        draft.page = parseInt(String(urlParams[EQueryParamKeys.PAGE] ?? defaultPage), 10);
        draft.perPage = parseInt(String(urlParams[EQueryParamKeys.PER_PAGE] ?? defaultPerPage), 10);
        draft.search = String(urlParams[EQueryParamKeys.SEARCH] || '');
        draft.sortBy = String(urlParams[EQueryParamKeys.SORT_BY] || '');
        draft.sortOrder = (urlParams[EQueryParamKeys.SORT_ORDER] as TSortOrder) || defaultSortOrder;
      }),
    );

    if (
      urlParams[EQueryParamKeys.PAGE] === undefined ||
      urlParams[EQueryParamKeys.PER_PAGE] === undefined
    ) {
      setSearchParams({
        ...(urlParams[EQueryParamKeys.PAGE] === undefined && {
          [EQueryParamKeys.PAGE]: defaultPage,
        }),
        ...(urlParams[EQueryParamKeys.PER_PAGE] === undefined && {
          [EQueryParamKeys.PER_PAGE]: defaultPerPage,
        }),
      });
    }
  }, [getSearchParams, setSearchParams]);

  useEffect(() => {
    updateParams();
  }, [updateParams]);

  return params;
}
