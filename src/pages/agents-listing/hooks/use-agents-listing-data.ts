import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { transformToApiQueryParamsObject } from '../../../helpers/utils/transformers';
import { IAgentWithCount } from '../types';

export default function useCustomerListingData() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSearchParams } = useQueryParams();

  const {
    id,
    name,
    contactNumbers,
    addresses,
    status,
    createdAt,
    updatedAt,
    deletedAt,
    isDeletedShown,
    ...rest
  } = getSearchParams();

  const parentName = rest['parent.name'];

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...transformToApiQueryParamsObject({
      search,
      id,
      name,
      parentName,
      contactNumbers,
      addresses,
      status,
      createdAt,
      updatedAt,
      deletedAt,
      isDeletedShown,
    }),
  };

  const queryKey = [
    QueryKeys.AGENTS_LISTING,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    id,
    name,
    parentName,
    addresses,
    contactNumbers,
    status,
    createdAt,
    updatedAt,
    deletedAt,
    isDeletedShown,
  ];

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<IAgentWithCount>(ApiRoutes.AGENT_ALL, { signal }, body);
    },
    retry: false,
  });

  if (query.error) {
    enqueueSnackbar(query.error.message, { variant: 'error' });
  }

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
