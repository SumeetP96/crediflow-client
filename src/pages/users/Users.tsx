import { SearchTwoTone } from '@mui/icons-material';
import {
  Checkbox,
  FormControl,
  Grid2,
  InputAdornment,
  InputLabel,
  ListItemText,
  MenuItem,
  Paper,
  Select,
  Tab,
  Tabs,
  TextField,
} from '@mui/material';
import { useQuery } from '@tanstack/react-query';
import moment from 'moment';
import { useState } from 'react';
import { axiosGet } from '../../api/request';
import DataTable, {
  IDataTableColumn,
} from '../../components/data-table/DataTable';
import useDataTablePagination from '../../components/data-table/hooks/use-data-table-pagination';
import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';
import { IUser } from './interfaces';

const userRoles = [
  {
    label: 'Super Admin',
    value: 'super_admin',
  },
  {
    label: 'Admin',
    value: 'admin',
  },
  {
    label: 'Employee',
    value: 'employee',
  },
];

const userStatus = [
  {
    label: 'All',
    value: '',
  },
  {
    label: 'Active',
    value: 'active',
  },
  {
    label: 'Inactive',
    value: 'inactive',
  },
  {
    label: 'Deleted',
    value: 'deleted',
  },
];

interface IUserFilters {
  roles: string[];
  status: string;
}

function Users() {
  const query = useQuery({
    queryKey: ['users'],
    queryFn: async ({ signal }) => {
      return await axiosGet<IUser[]>('/users', { signal });
    },
  });

  const users = query.data?.data || [];

  const [filters, setFilters] = useState<IUserFilters>({
    roles: [],
    status: '',
  });

  const {
    page,
    perPage,
    paginatedRows,
    handlePageChange,
    handlePerPageChange,
  } = useDataTablePagination<IUser>({
    rows: users,
    totalRows: users.length,
    internalPagination: true,
  });

  const columns: IDataTableColumn<IUser>[] = [
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
  ];

  return (
    <Page
      header="Users"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Users',
          active: true,
        },
      ]}
    >
      <Paper variant="outlined">
        <Tabs
          value={filters.status}
          onChange={(_, value) => setFilters({ ...filters, status: value })}
        >
          {userStatus.map((status) => (
            <Tab key={status.label} value={status.value} label={status.label} />
          ))}
        </Tabs>

        {/* Filters */}
        <Grid2 container spacing={2} sx={{ m: 3 }}>
          <Grid2 size={{ xs: 12, md: 4, lg: 3 }}>
            <FormControl fullWidth>
              <InputLabel>Role</InputLabel>
              <Select
                value={filters.roles}
                label="Role"
                onChange={(e) =>
                  setFilters({
                    ...filters,
                    roles: e.target.value
                      ? String(e.target.value).split(',')
                      : [],
                  })
                }
                multiple
                renderValue={(selected) =>
                  selected
                    .map(
                      (value) =>
                        userRoles.find((r) => r.value === value)?.label,
                    )
                    .join(', ')
                }
              >
                {userRoles.map((role) => (
                  <MenuItem
                    key={role.value}
                    value={role.value}
                    sx={{ height: '50px' }}
                  >
                    <Checkbox
                      checked={filters.roles.indexOf(role.value) > -1}
                    />
                    <ListItemText primary={role.label} />
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>

          <Grid2 size={{ xs: 12, md: 8, lg: 9 }}>
            <FormControl fullWidth>
              <TextField
                variant="outlined"
                placeholder="Search here ..."
                slotProps={{
                  input: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <SearchTwoTone />
                      </InputAdornment>
                    ),
                  },
                }}
              />
            </FormControl>
          </Grid2>
        </Grid2>

        <DataTable
          keyField="id"
          rows={paginatedRows}
          columns={columns}
          page={page}
          perPage={perPage}
          totalRecords={users.length}
          onPageChange={handlePageChange}
          onPerPageChange={handlePerPageChange}
        />
      </Paper>
    </Page>
  );
}

export default Users;
