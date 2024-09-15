import moment from 'moment';
import { useMemo, useState } from 'react';
import { IDataTableColumn } from '../../../components/data-table/DataTable';
import { IUser } from '../interfaces';

export default function useUserListingColumns() {
  const columns: IDataTableColumn<IUser>[] = useMemo(
    () => [
      {
        field: 'id',
        title: 'ID',
        sx: { textAlign: 'center', width: '120px' },
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
        sorting: true,
      },
      {
        field: 'role',
        title: 'Role',
        render: ({ role }) =>
          role
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join(' '),
        sorting: true,
      },
      {
        field: 'status',
        title: 'Status',
        render: ({ status }) =>
          status
            .split('_')
            .map((c) => c.charAt(0).toUpperCase() + c.slice(1))
            .join('-'),
        sorting: true,
      },
      {
        field: 'createdAt',
        title: 'Created At',
        render: ({ createdAt }) => moment(createdAt).format('DD/MM/YYYY HH:mm'),
        sorting: true,
      },
    ],
    [],
  );

  const [selectedColumnFields, setSelectedColumnsFields] = useState(
    columns.map((col) => col.field),
  );

  const activeColumns = useMemo(
    () => columns.filter((col) => selectedColumnFields.includes(col.field)),
    [columns, selectedColumnFields],
  );

  const toggleColumn = (field: keyof IUser) => {
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
