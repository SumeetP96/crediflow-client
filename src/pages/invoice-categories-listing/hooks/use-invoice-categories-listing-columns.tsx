import { Edit, Tag } from '@mui/icons-material';
import { IconButton, Tooltip } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo } from 'react';
import { IDataTableColumn } from '../../../components/data-table/types';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import { yesNoOptions, yesNoRender } from '../../../helpers/utils/data-table';
import useNavigateTo from '../../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../../router/helpers';
import { customerStatusOptions } from '../constants';
import { TInvoiceCategoryRecord } from '../types';

export default function useInvoiceCategoriesListingColumns() {
  const { navigateTo } = useNavigateTo();

  const columns: IDataTableColumn<TInvoiceCategoryRecord>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        textAlign: 'right',
        sort: true,
        filter: {
          label: 'Category ID',
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
        field: 'prefix',
        title: 'Prefix',
        sort: true,
        filter: {
          label: 'Prefix',
          type: 'text-fuzzy',
        },
        render: ({ prefix }) => prefix || '-',
      },
      {
        field: 'suffix',
        title: 'Suffix',
        sort: true,
        filter: {
          label: 'Suffix',
          type: 'text-fuzzy',
        },
        render: ({ suffix }) => suffix || '-',
      },
      {
        field: 'isAutoIncrement',
        title: 'Auto Increment',
        sort: false,
        filter: {
          label: 'Auto Increment',
          type: 'select',
          selectOptions: yesNoOptions,
          render: (_, value) => yesNoRender(value as string),
        },
        render: ({ isAutoIncrement }) => (isAutoIncrement ? 'Yes' : 'No'),
      },
      {
        field: 'description',
        title: 'Description',
        sort: false,
        filter: {
          label: 'Description',
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
        field: 'actions',
        title: '',
        select: false,
        render: ({ id }) => (
          <Tooltip title="Edit Invoice Category">
            <IconButton
              size="small"
              onClick={() => navigateTo(AppRoute('INVOICE_CATEGORIES_UPDATE', id))}
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
