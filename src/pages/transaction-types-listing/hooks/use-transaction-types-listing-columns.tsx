import { Edit, Tag } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IDataTableColumn } from '../../../components/data-table/types';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import { yesNoOptions, yesNoRender } from '../../../helpers/utils/data-table';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { transactionTypeStatusOptions } from '../constants';
import { TTransactionTypeRecord } from '../types';

export default function useTransactionTypesListingColumns() {
  const { navigateTo } = useNavigateTo();

  const columns: IDataTableColumn<TTransactionTypeRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        textAlign: 'right',
        sort: true,
        width: '100px',
        filter: {
          label: 'Transaction Type ID',
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
        field: 'isDeduction',
        title: 'Is Deduction',
        sort: true,
        filter: {
          label: 'Is Deduction',
          type: 'select',
          selectOptions: yesNoOptions,
          render: (_, value) => yesNoRender(value as string),
        },
        render: ({ isDeduction }) => (isDeduction ? 'Yes' : 'No'),
      },
      {
        field: 'status',
        title: 'Status',
        sort: true,
        textAlign: 'center',
        filter: {
          label: 'Status',
          type: 'select',
          selectOptions: transactionTypeStatusOptions,
          render: (_, value) => {
            return (transactionTypeStatusOptions.find((opt) => opt.value === value)?.label ||
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
        field: 'actions',
        title: '',
        select: false,
        render: ({ id }) => (
          <Tooltip title="Edit Transaction Type">
            <IconButton
              size="small"
              onClick={() => navigateTo(AppRoute('TRANSACTION_TYPES_UPDATE', id))}
            >
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
