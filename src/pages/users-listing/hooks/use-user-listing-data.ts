import { useQuery } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import {
  transformMultiSelectValue,
  transformToApiQueryParamsObject,
} from '../../../helpers/utils/transformers';
import { IUsersWithCount } from '../types';

export default function useUserListingData() {
  const { enqueueSnackbar } = useSnackbar();

  const { getSearchParams } = useQueryParams();

  const { id, name, username, role, status, createdAt = [] } = getSearchParams();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...transformToApiQueryParamsObject({
      search,
      id,
      name,
      username,
      role: transformMultiSelectValue(role),
      status,
      createdAt,
    }),
  };

  const queryKey = [
    QueryKeys.USERS_LISTING,
    page,
    perPage,
    sortBy,
    sortOrder,
    search,
    id,
    name,
    username,
    ...[Array.isArray(role) ? role : [role]],
    status,
    createdAt,
  ];

  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<IUsersWithCount>(ApiRoutes.USER_ALL, { signal }, body);
    },
    retry: false,
  });

  if (query.error) {
    enqueueSnackbar(query.error.message, { variant: 'error' });
  }

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
