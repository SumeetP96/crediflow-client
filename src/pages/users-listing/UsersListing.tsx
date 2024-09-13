import { SearchTwoTone } from '@mui/icons-material';
import {
  Box,
  Button,
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
import { useNavigate } from 'react-router';
import DataTable from '../../components/data-table/DataTable';
import useDataTableLocalPagination from '../../components/data-table/hooks/use-data-table-local-pagination';
import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';
import { userRoleLabelMap, userRoles, userStatus } from './constants';
import useUserListingData from './hooks/use-user-listing-data';
import { IUser } from './interfaces';
import { useUserListingStore } from './store';

function UsersListingPage() {
  const {
    page,
    perPage,
    roles,
    status,
    setRoles,
    setStatus,
    setPage,
    setPerPage,
  } = useUserListingStore();

  const { rows, columns } = useUserListingData({
    queryKey: ['users', page, perPage],
  });

  const { paginatedRows } = useDataTableLocalPagination<IUser>({
    page,
    perPage,
    rows,
  });

  return (
    <Paper variant="outlined">
      <Tabs value={status} onChange={(_, value) => setStatus(value)}>
        {userStatus.map((status) => (
          <Tab key={status.label} value={status.value} label={status.label} />
        ))}
      </Tabs>

      {/* Filters */}
      <Grid2 container spacing={2} sx={{ m: 3 }}>
        <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              value={roles}
              label="Role"
              onChange={(e) => setRoles(e.target.value)}
              multiple
              renderValue={(selected) =>
                selected.map((value) => userRoleLabelMap[value]).join(', ')
              }
            >
              {userRoles.map((role) => (
                <MenuItem
                  key={role.value}
                  value={role.value}
                  sx={{ height: '50px' }}
                >
                  <Checkbox checked={roles.indexOf(role.value) > -1} />
                  <ListItemText primary={role.label} />
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Grid2>

        <Grid2 size={{ xs: 12, md: 8, lg: 8 }}>
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
        totalRecords={rows.length}
        onPageChange={setPage}
        onPerPageChange={setPerPage}
      />
    </Paper>
  );
}

function TopRightComponent() {
  const navigate = useNavigate();

  return (
    <Box>
      <Button
        variant="contained"
        size="large"
        onClick={() => navigate(AppRoutes.USERS_CREATE)}
      >
        New User
      </Button>
    </Box>
  );
}

export default function UsersListing() {
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
      topRightComponent={<TopRightComponent />}
    >
      <UsersListingPage />
    </Page>
  );
}
