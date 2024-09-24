import { useQuery } from '@tanstack/react-query';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../../helpers/hooks/use-query-params';
import { IUsersWithCount } from '../interfaces';

const safeQueryParamsObject = (obj: TQueryParams): TQueryParams => {
  return Object.fromEntries(
    Object.entries(obj).filter(([, v]) => v != null && (Array.isArray(v) ? v.length > 0 : true)),
  );
};

export default function useUserListingData() {
  const { getSearchParams } = useQueryParams();

  const { id, name, username, roles = [], status, createdAt = [] } = getSearchParams();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const body: TQueryParams = {
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...safeQueryParamsObject({ search, id, name, username, roles, status, createdAt }),
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
    roles,
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
