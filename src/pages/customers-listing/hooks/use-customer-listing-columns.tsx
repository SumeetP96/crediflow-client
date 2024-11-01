import { Edit, Restore, Tag } from '@mui/icons-material';
import { Box, IconButton, Link, Tooltip, Typography } from '@mui/material';
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
import useListingColumns from '../../../helpers/hooks/use-listing-columns';
import { yesNoOptions, yesNoRender } from '../../../helpers/utils/data-table';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { customerStatusOptions } from '../constants';
import { ECustomerAddressStatus, ECustomerContactNumberStatus, TCustomerRecord } from '../types';

export default function useCustomerListingColumns() {
  const { navigateTo } = useNavigateTo();

  const queryClient = useQueryClient();

  const { enqueueSnackbar } = useSnackbar();

  const { openDialog, closeDialog } = useDialog();

  const restoreQuery = useMutation({
    mutationKey: [QueryKeys.CUSTOMERS_RESTORE],
    mutationFn: async (id: number) => {
      return await axiosPost(ApiRoutes.CUSTOMER_RESTORE(id));
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [QueryKeys.CUSTOMERS_LISTING] });
      enqueueSnackbar('Customer Restored successfully', { variant: 'success' });
    },
    onError: ({ message }) => {
      enqueueSnackbar(message, { variant: 'error' });
    },
  });

  const columns: IDataTableColumn<TCustomerRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        textAlign: 'right',
        sort: true,
        filter: {
          label: 'Customer ID',
          type: 'number',
          Icon: <Tag />,
        },
      },
      {
        field: 'name',
        title: 'Name',
        sort: true,
        width: '200px',
        filter: {
          label: 'Name',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'parent.name' as keyof TCustomerRecord,
        title: 'Parent Customer',
        sort: true,
        width: '200px',
        filter: {
          label: 'Name',
          type: 'text-fuzzy',
        },
        render: ({ parent }) => (parent?.name ? <Link>{parent?.name}</Link> : '-'),
      },
      {
        field: 'contactNumbers',
        title: 'Contact',
        filter: {
          label: 'Contact',
          type: 'text-fuzzy',
        },
        render: ({ contactNumbers }) => {
          const activeContacts = contactNumbers.filter(
            (a) => a.status === ECustomerContactNumberStatus.ACTIVE,
          );
          return (
            <Box display="flex" flexDirection="column" justifyContent="center">
              {activeContacts.length
                ? activeContacts.map(({ number }) => (
                    <Typography key={number} variant="body2">
                      {number}
                    </Typography>
                  ))
                : '-'}
            </Box>
          );
        },
      },
      {
        field: 'addresses',
        title: 'Address',
        width: '200px',
        filter: {
          label: 'Address',
          type: 'text-fuzzy',
        },
        render: ({ addresses }) => {
          const activeAddresses = addresses.filter(
            (a) => a.status === ECustomerAddressStatus.ACTIVE,
          );
          const primaryAddress = activeAddresses.find((a) => a.isPrimary);
          const { address = '' } = primaryAddress || activeAddresses[0] || {};
          return (
            <Box display="flex" flexDirection="column" justifyContent="center">
              {address ? <Typography variant="body2">{address}</Typography> : '-'}
            </Box>
          );
        },
      },
      {
        field: 'isReseller',
        title: 'Reseller',
        textAlign: 'center',
        sort: true,
        filter: {
          label: 'Reseller',
          type: 'select',
          selectOptions: yesNoOptions,
          render: (_, value) => yesNoRender(value as string),
        },
        render: ({ isReseller }) => (isReseller ? 'Yes' : 'No'),
      },
      {
        field: 'status',
        title: 'Status',
        sort: true,
        textAlign: 'center',
        filter: {
          label: 'Status',
          type: 'select',
          selectOptions: customerStatusOptions,
          render: (_, value) => {
            return (customerStatusOptions.find((opt) => opt.value === value)?.label ||
              value) as string;
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
        render: ({ id, deletedAt }) => (
          <>
            {deletedAt ? (
              <>
                <Tooltip title="Restore Deleted Customer">
                  <IconButton
                    size="small"
                    onClick={() =>
                      openDialog(EDialogIds.CONFIRMATION, {
                        title: 'Restore Deleted Customer',
                        body: 'Are you sure you want to restore this customer?',
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
              <Tooltip title="Edit Customer">
                <IconButton
                  size="small"
                  onClick={() => navigateTo(AppRoute('CUSTOMERS_UPDATE', id))}
                >
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

  const { activeColumns, toggleColumn } = useListingColumns<TCustomerRecord>(columns);

  return {
    allColumns: columns,
    activeColumns,
    toggleColumn,
  };
}
