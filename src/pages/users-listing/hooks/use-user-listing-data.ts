import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo } from 'react';
import { axiosGet, TQueryParams } from '../../../api/request';
import { IDataTableColumn } from '../../../components/data-table/DataTable';
import useCommonListingParams from '../../../helpers/hooks/use-common-listing-params';
import { IUser, IUsersWithCount } from '../interfaces';
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
    queryKey: [
      'users',
      page,
      perPage,
      roles,
      sortBy,
      sortOrder,
      search,
      status,
    ],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUsersWithCount>('/users', { signal }, body);
    },
    retry: false,
  });

  const { count, rows } = query.data?.data || { count: 0, rows: [] };

  const columns: IDataTableColumn<IUser>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        sx: { textAlign: 'center' },
        sorting: true,
      },
      {
        field: 'name',
        title: 'Name',
        sorting: true,
      },
      {
        field: 'username',
        title: 'Username',
      },
      {
        field: 'role',
        title: 'Role',
        render: ({ role }) =>
          role
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join(' '),
      },
      {
        field: 'status',
        title: 'Status',
        render: ({ status }) =>
          status
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join('-'),
      },
      {
        field: 'createdAt',
        title: 'Created At',
        render: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
      },
    ],
    [],
  );

  return { query, rows, columns, totalRecords: count };
}
