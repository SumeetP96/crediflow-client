import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { transformToApiQueryParamsObject } from '../../../helpers/utils/transformers';
import { IInvoiceCategoryWithCount } from '../types';

export default function useInvoiceCategoriesListingData() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSearchParams } = useQueryParams();

  const {
    id,
    name,
    prefix,
    suffix,
    description,
    isAutoIncrement,
    status,
    createdAt,
    updatedAt,
    deletedAt,
  } = getSearchParams();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...transformToApiQueryParamsObject({
      search,
      id,
      name,
      prefix,
      suffix,
      description,
      isAutoIncrement,
      status,
      createdAt,
      updatedAt,
      deletedAt,
    }),
  };

  const queryKey = [
    QueryKeys.INVOICE_CATEGORIES_LISTING,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    id,
    name,
    prefix,
    suffix,
    description,
    isAutoIncrement,
    status,
    createdAt,
    updatedAt,
    deletedAt,
  ];

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<IInvoiceCategoryWithCount>(
        ApiRoutes.INVOICE_CATEGORIES_ALL,
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
