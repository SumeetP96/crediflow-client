import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { axiosGet, TQueryParams } from '../../../api/request';
import { parseApiErrorResponse } from '../../../api/response';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { transformToApiQueryParamsObject } from '../../../helpers/utils/transformers';
import { IInvoicesWithCount } from '../types';

export default function useInvoicesListingData() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSearchParams } = useQueryParams();

  const { id, date, invoiceNumber, amount, status, createdAt, updatedAt, ...rest } =
    getSearchParams();

  const customerName = rest['customer.name'];

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...transformToApiQueryParamsObject({
      search,
      id,
      invoiceNumber,
      amount,
      customerName,
      status,
      createdAt,
      updatedAt,
    }),
  };

  const queryKey = [
    QueryKeys.INVOICES_LISTING,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    id,
    invoiceNumber,
    date,
    amount,
    status,
    customerName,
    createdAt,
    updatedAt,
  ];

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<IInvoicesWithCount>(ApiRoutes.INVOICES_ALL, { signal }, body);
    },
    retry: false,
  });

  if (query.error) {
    const { message, errors } = parseApiErrorResponse(query.error);
    if (errors.length) {
      errors.forEach((error) => {
        enqueueSnackbar(error, { variant: 'error' });
      });
    } else {
      enqueueSnackbar(message, { variant: 'error' });
    }
  }

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
