import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { transformToApiQueryParamsObject } from '../../../helpers/utils/transformers';
import { ITransactionTypeWithCount } from '../types';

export default function useTransactionTypesListingData() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSearchParams } = useQueryParams();

  const { id, name, isDeduction, status, createdAt, updatedAt } = getSearchParams();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...transformToApiQueryParamsObject({
      search,
      id,
      name,
      isDeduction,
      status,
      createdAt,
      updatedAt,
    }),
  };

  const queryKey = [
    QueryKeys.TRANSACTION_TYPES_LISTING,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    id,
    name,
    isDeduction,
    status,
    createdAt,
    updatedAt,
  ];

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<ITransactionTypeWithCount>(
        ApiRoutes.TRANSACTION_TYPES_ALL,
        { signal },
        body,
      );
    },
    retry: false,
  });

  if (query.error) {
    enqueueSnackbar(query.error.message, { variant: 'error' });
  }

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
