import { Edit, Restore, Tag } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { axiosPost } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import ConfirmationDialog from '../../../components/confirmation-dialog/ConfirmationDialog';
import { IDataTableColumn } from '../../../components/data-table/types';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import useListingColumns from '../../../helpers/hooks/use-listing-columns';
import { TListingFilterValue } from '../../../helpers/types';
import { transformMultiSelectSelectedValue } from '../../../helpers/utils/transformers';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { userRoleOptions, userStatusOptions } from '../constants';
import { TUserRecord } from '../types';

export default function useUserListingColumns() {
  const { navigateTo } = useNavigateTo();

  const queryClient = useQueryClient();

  // TODO: use global error notification on error
  const restoreQuery = useMutation({
    mutationKey: [QueryKeys.USERS_RESTORE],
    mutationFn: async (id: number) => {
      return await axiosPost(ApiRoutes.USER_RESTORE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_LISTING] });
    },
  });

  const [isRestoreDialogOpen, setIsRestoreDialogOpen] = useState(false);

  const columns: IDataTableColumn<TUserRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        sx: { width: '150px', pl: 4 },
        sort: true,
        filter: {
          label: 'User ID',
          type: 'number',
          Icon: <Tag />,
        },
      },
      {
        field: 'name',
        title: 'Name',
        sort: true,
        filter: {
          label: 'Name',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'username',
        title: 'Username',
        sort: true,
        sx: { width: '200px' },
        filter: {
          label: 'Username',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'role',
        title: 'Role',
        sort: true,
        sx: { width: '150px', textAlign: 'center' },
        filter: {
          label: 'Role',
          type: 'multiselect',
          selectOptions: userRoleOptions,
          render: (_, value) => {
            const selectedValues = transformMultiSelectSelectedValue(value as TListingFilterValue);
            return selectedValues
              ? selectedValues
                  .map((role) => userRoleOptions.find((ur) => ur.value === role)?.label)
                  .join(', ')
              : '';
          },
        },
        render: ({ role }) =>
          role
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join(' '),
      },
      {
        field: 'status',
        title: 'Status',
        sort: true,
        sx: { width: '150px', textAlign: 'center' },
        filter: {
          label: 'Status',
          type: 'select',
          selectOptions: userStatusOptions,
          render: (_, value) => {
            return (userStatusOptions.find((opt) => opt.value === value)?.label || value) as string;
          },
        },
        render: ({ status }) =>
          status
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join('-'),
      },
      {
        field: 'createdAt',
        title: 'Created At',
        sort: true,
        sx: { width: '200px', textAlign: 'center' },
        filter: {
          label: 'Created At',
          type: 'date',
          render: (_, value) => (value ? dayjs(value).format(defaultDateVisibleFormat) : ''),
        },
        render: ({ createdAt }) => dayjs(createdAt).format('DD/MM/YYYY HH:mm'),
      },
      {
        field: 'updatedAt',
        title: 'Updated At',
        sort: true,
        sx: { width: '200px', textAlign: 'center' },
        isHidden: true,
        filter: {
          label: 'Updated At',
          type: 'date',
          render: (_, value) => (value ? dayjs(value).format(defaultDateVisibleFormat) : ''),
        },
        render: ({ updatedAt }) => dayjs(updatedAt).format('DD/MM/YYYY HH:mm'),
      },
      {
        field: 'deletedAt',
        title: 'Deleted At',
        sort: true,
        sx: { width: '200px', textAlign: 'center' },
        isHidden: true,
        filter: {
          label: 'Deleted At',
          type: 'date',
          render: (_, value) => (value ? dayjs(value).format(defaultDateVisibleFormat) : ''),
        },
        render: ({ deletedAt }) => (deletedAt ? dayjs(deletedAt).format('DD/MM/YYYY HH:mm') : '-'),
      },
      {
        field: 'actions',
        title: '',
        select: false,
        sx: { width: '50px' },
        render: ({ id, deletedAt }) => (
          <>
            {deletedAt ? (
              <>
                <ConfirmationDialog
                  open={isRestoreDialogOpen}
                  onClose={() => setIsRestoreDialogOpen(false)}
                  title="Restore User"
                  body="Do you want to restore this user?"
                  onAccept={() => restoreQuery.mutate(id)}
                />

                <Tooltip title="Restore Deleted User">
                  <IconButton size="small" onClick={() => setIsRestoreDialogOpen(true)}>
                    <Restore />
                  </IconButton>
                </Tooltip>
              </>
            ) : (
              <Tooltip title="Edit User">
                <IconButton size="small" onClick={() => navigateTo(AppRoute('USERS_UPDATE', id))}>
                  <Edit />
                </IconButton>
              </Tooltip>
            )}
          </>
        ),
      },
    ],
    [isRestoreDialogOpen, navigateTo, restoreQuery],
  );

  const { activeColumns, toggleColumn } = useListingColumns<TUserRecord>(columns);

  return {
    allColumns: columns,
    activeColumns,
    toggleColumn,
  };
}
