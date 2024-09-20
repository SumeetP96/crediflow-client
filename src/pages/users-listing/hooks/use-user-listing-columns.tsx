import { Edit, MoreVert } from '@mui/icons-material';
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material';
import moment from 'moment';
import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router';
import ButtonMenu from '../../../components/button-menu/ButtonMenu';
import { AppRoutes } from '../../../router/routes';
import { TUserColumns, TUserRecord } from '../interfaces';

export default function useUserListingColumns() {
  const navigate = useNavigate();

  const columns: TUserColumns = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        sx: { textAlign: 'center', width: '120px' },
        sort: true,
      },
      {
        field: 'name',
        title: 'Name',
        sort: true,
        filter: true,
      },
      {
        field: 'username',
        title: 'Username',
        sort: true,
      },
      {
        field: 'role',
        title: 'Role',
        render: ({ role }) =>
          role
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join(' '),
        sort: true,
      },
      {
        field: 'status',
        title: 'Status',
        render: ({ status }) =>
          status
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join('-'),
        sort: true,
      },
      {
        field: 'createdAt',
        title: 'Created At',
        render: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
        sort: true,
      },
      {
        field: 'actions',
        title: '',
        render: ({ id }) => (
          <ButtonMenu size="small" tooltip="Actions" isIconButton icon={<MoreVert />}>
            <MenuItem onClick={() => navigate(AppRoutes.USERS_UPDATE.replace(':id', String(id)))}>
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
