import { Edit } from '@mui/icons-material';
import { IconButton, Link, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IDataTableColumn } from '../../../components/data-table/types';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { invoiceStatusOptions } from '../constants';
import { TInvoiceRecord } from '../types';

export default function useInvoicesListingColumns() {
  const { navigateTo } = useNavigateTo();

  const columns: IDataTableColumn<TInvoiceRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        textAlign: 'right',
        isHidden: true,
        sort: true,
        // filter: {
        //   label: 'Invoice ID',
        //   type: 'number',
        //   Icon: <Tag />,
        // },
      },
      {
        field: 'date',
        title: 'Invoice Date',
        textAlign: 'center',
        sort: true,
        filter: {
          label: 'Date',
          type: 'date',
        },
        render: ({ date }) => dayjs(date).format(defaultDateVisibleFormat),
      },
      {
        field: 'invoiceNumber',
        title: 'Invoice Number',
        sort: true,
        filter: {
          label: 'Name',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'customer.name' as keyof TInvoiceRecord,
        title: 'Customer',
        sort: true,
        minWidth: '200px',
        filter: {
          label: 'Customer',
          type: 'text-fuzzy',
        },
        render: ({ customer }) => (customer?.name ? <Link>{customer?.name}</Link> : '-'),
      },
      {
        field: 'amount',
        title: 'Amount',
        sort: true,
        textAlign: 'right',
        filter: {
          label: 'Amount',
          type: 'text-fuzzy',
        },
      },
      {
        field: 'status',
        title: 'Status',
        sort: true,
        textAlign: 'center',
        filter: {
          label: 'Status',
          type: 'select',
          selectOptions: invoiceStatusOptions,
          render: (_, value) => {
            return (invoiceStatusOptions.find((opt) => opt.value === value)?.label ||
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
        field: 'user.name' as keyof TInvoiceRecord,
        title: 'User',
        sort: true,
        filter: {
          label: 'User',
          type: 'text-fuzzy',
        },
        render: ({ user }) => (user?.name ? <Link>{user?.name}</Link> : '-'),
      },
      {
        field: 'createdAt',
        title: 'Created At',
        sort: true,
        isHidden: true,
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
        field: 'actions',
        title: '',
        select: false,
        render: ({ id }) => (
          <Tooltip title="Edit Invoice">
            <IconButton size="small" onClick={() => navigateTo(AppRoute('INVOICES_UPDATE', id))}>
              <Edit />
            </IconButton>
          </Tooltip>
        ),
      },
    ],
    [navigateTo],
  );

  return { columns };
}
