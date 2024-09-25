import { useQuery } from '@tanstack/react-query';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import {
  transformMultiSelectValue,
  transformToApiQueryParamsObject,
} from '../../../helpers/utils/transformers';
import { IUsersWithCount } from '../types';

export default function useUserListingData() {
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
    'users',
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

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
