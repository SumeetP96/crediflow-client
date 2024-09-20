import { useQuery } from '@tanstack/react-query';
import { axiosGet, TQueryParams } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import { IUsersWithCount } from '../interfaces';
import useUserListingParams from './use-user-listing-params';

export default function useUserListingData() {
  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const { roles, status } = useUserListingParams();

  const body: TQueryParams = {
    search,
    page,
    perPage,
    ...(sortBy && sortOrder ? { sortBy, sortOrder } : {}),
    ...(roles.length ? { roles } : {}),
    ...(status ? { status } : {}),
  };

  const query = useQuery({
    queryKey: ['users', page, perPage, roles, sortBy, sortOrder, search, status],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUsersWithCount>(ApiRoutes.USER_ALL, { signal }, body);
    },
    retry: false,
  });

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  return { query, rows, totalRecords: count };
}
