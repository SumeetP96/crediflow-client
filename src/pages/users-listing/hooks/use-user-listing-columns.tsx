import { Edit, Restore, Tag } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import dayjs from 'dayjs';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import { axiosPost } from '../../../api/request';
import { ApiRoutes } from '../../../api/routes';
import { QueryKeys } from '../../../api/types';
import { IDataTableColumn } from '../../../components/data-table/types';
import { EDialogIds } from '../../../components/dialog-provider/constants';
import useDialog from '../../../components/dialog-provider/use-dialog';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import { TListingFilterValue } from '../../../helpers/types';
import { transformMultiSelectSelectedValue } from '../../../helpers/utils/transformers';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { userRoleOptions, userStatusOptions } from '../constants';
import { TUserRecord } from '../types';

export default function useUserListingColumns() {
  const { navigateTo } = useNavigateTo();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { openDialog, closeDialog } = useDialog();

  const restoreQuery = useMutation({
    mutationKey: [QueryKeys.USERS_RESTORE],
    mutationFn: async (id: number) => {
      return await axiosPost(ApiRoutes.USER_RESTORE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.USERS_LISTING] });
      enqueueSnackbar('User Restored successfully', { variant: 'success' });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const columns: IDataTableColumn<TUserRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        width: '150px',
        sx: { pl: 4 },
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
        width: '200px',
        filter: {
          label: 'Username',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'role',
        title: 'Role',
        sort: true,
        width: '150px',
        textAlign: 'left',
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
        width: '150px',
        textAlign: 'center',
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
        width: '200px',
        textAlign: 'center',
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
        width: '200px',
        textAlign: 'center',
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
        width: '200px',
        textAlign: 'center',
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
        width: '50px',
        render: ({ id, deletedAt }) => (
          <>
            {deletedAt ? (
              <>
                <Tooltip title="Restore Deleted User">
                  <IconButton
                    size="small"
                    onClick={() =>
                      openDialog(EDialogIds.CONFIRMATION, {
                        title: 'Restore Deleted User',
                        body: 'Are you sure you want to restore this user?',
                        onAccept: () => restoreQuery.mutate(id),
                        onClose: () => closeDialog(),
                      })
                    }
                  >
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
    [closeDialog, navigateTo, openDialog, restoreQuery],
  );

  return { columns };
}
