import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useMemo } from 'react';
import { axiosGet } from '../../../api/request';
import { IDataTableColumn } from '../../../components/data-table/DataTable';
import { IUser } from '../interfaces';

export interface IUseUserListingDataParams {
  queryKey: Array<string | number>;
}

export default function useUserListingData({
  queryKey,
}: IUseUserListingDataParams) {
  const query = useQuery({
    queryKey,
    queryFn: async ({ signal }) => {
      return await axiosGet<IUser[]>('/users', { signal });
    },
  });

  const rows = query.data?.data || [];

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

  return { query, rows, columns };
}
