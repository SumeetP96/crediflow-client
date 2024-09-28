import { Edit, MoreVert, Tag } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import dayjs from 'dayjs';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import ButtonMenu from '../../../components/button-menu/ButtonMenu';
import { defaultDateVisibleFormat } from '../../../helpers/constants';
import { TListingFilterValue } from '../../../helpers/types';
import { transformMultiSelectSelectedValue } from '../../../helpers/utils/transformers';
import { AppRoute } from '../../../router/helpers';
import { userRoleOptions, userStatusOptions } from '../constants';
import { TUserColumns, TUserRecord } from '../types';

export default function useUserListingColumns() {
  const navigate = useNavigate();

  const columns: TUserColumns = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        sx: { width: '150px', pl: 4 },
        sort: true,
        filter: {
          label: 'User ID',
          type: 'text',
          Icon: <Tag />,
          isExactMatch: true,
        },
      },
      {
        field: 'name',
        title: 'Name',
        sort: true,
        filter: {
          label: 'Name',
          type: 'text',
        },
      },
      {
        field: 'username',
        title: 'Username',
        sort: true,
        sx: { width: '200px', textAlign: 'center' },
        filter: {
          label: 'Username',
          type: 'text',
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
          type: 'daterange',
          render: (_, value) => (value ? dayjs(value).format(defaultDateVisibleFormat) : ''),
        },
        render: ({ createdAt }) => dayjs(createdAt).format('DD/MM/YYYY HH:mm'),
      },
      {
        field: 'actions',
        title: '',
        select: false,
        sx: { width: '50px' },
        render: ({ id }) => (
          <ButtonMenu size="small" tooltip="Actions" isIconButton icon={<MoreVert />}>
            <MenuItem onClick={() => navigate(AppRoute('USERS_UPDATE', id))}>
              <ListItemIcon>
                <Edit />
              </ListItemIcon>
              <ListItemText>Edit</ListItemText>
            </MenuItem>
          </ButtonMenu>
        ),
      },
    ],
    [navigate],
  );

  const [selectedColumnFields, setSelectedColumnsFields] = useState(
    columns.map((col) => col.field),
  );

  const activeColumns = useMemo(
    () => columns.filter((col) => selectedColumnFields.includes(col.field)),
    [columns, selectedColumnFields],
  );

  const toggleColumn = (field: keyof TUserRecord) => {
    const isVisible = selectedColumnFields.includes(field);
    if (isVisible) {
      setSelectedColumnsFields(selectedColumnFields.filter((f) => f !== field));
    } else {
      setSelectedColumnsFields((prev) => [...prev, field]);
    }
  };

  return {
    allColumns: columns,
    activeColumns,
    toggleColumn,
  };
}
