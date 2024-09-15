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
import { useMemo } from 'react';
import { useNavigate } from 'react-router';
import ListingApiErrorAlert from '../../components/alerts/ListingApiErrorAlert';
import DataTableColumnSelect from '../../components/data-table-column-select-menu/TableColumnSelectMenu';
import DataTable from '../../components/data-table/DataTable';
import Page from '../../components/page/Page';
import SelectedFilters from '../../components/selected-filters/SelectedFilters';
import { defaultPage } from '../../helpers/constants';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { AppRoutes } from '../../router/routes';
import { userRoleLabelMap, userRoles, userStatus } from './constants';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';
import useUserListingParams from './hooks/use-user-listing-params';

function UsersListingPage() {
  const { setSearchParams } = useQueryParams();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const { roles, status } = useUserListingParams();

  const { query, rows, totalRecords } = useUserListingData();

  const { allColumns, activeColumns, toggleColumn } = useUserListingColumns();

  const filters = useMemo(() => {
    const activeFilters = [];

    if (sortBy && sortOrder) {
      const column = allColumns.find((c) => c.field === sortBy);
      activeFilters.push({
        key: 'SORT',
        label: `${column?.title} (${sortOrder.toUpperCase()})`,
        onDelete: () => setSearchParams({ sortBy: null, sortOrder: null }),
      });
    }

    if (roles.length) {
      activeFilters.push({
        key: 'ROLES',
        label: `${roles.map((role) => userRoleLabelMap[role]).join(', ')}`,
        onDelete: () => setSearchParams({ roles: null }),
      });
    }

    if (search) {
      activeFilters.push({
        key: 'SEARCH',
        label: `"${search}"`,
        onDelete: () => setSearchParams({ search: null }),
      });
    }

    return activeFilters;
  }, [allColumns, roles, search, setSearchParams, sortBy, sortOrder]);

  return (
    <Paper variant="outlined">
      <Tabs
        value={status}
        onChange={(_, value) => setSearchParams({ status: value })}
      >
        {userStatus.map((status) => (
          <Tab
            key={status.label}
            value={status.value}
            label={status.label}
            disabled={query.isLoading}
          />
        ))}
      </Tabs>

      {/* Filters */}
      <Grid2 container spacing={2} sx={{ m: 3 }}>
        <Grid2 size={{ xs: 12, md: 4, lg: 4 }}>
          <FormControl fullWidth>
            <InputLabel>Role</InputLabel>
            <Select
              disabled={query.isLoading}
              value={roles}
              label="Role"
              onChange={(e) => setSearchParams({ roles: e.target.value })}
              multiple
              renderValue={(selected) => {
                return selected
                  .map((value) => userRoleLabelMap[value])
                  .join(', ');
              }}
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
              disabled={query.isLoading}
              variant="outlined"
              placeholder="Search here ..."
              value={search}
              onChange={(e) => setSearchParams({ search: e.target.value })}
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

      <ListingApiErrorAlert error={query.error} />

      <Grid2 container sx={{ px: 3 }}>
        <Grid2 size={{ xs: 12, lg: 10 }}>
          <SelectedFilters filters={filters} />
        </Grid2>

        <Grid2
          size={{ xs: 12, lg: 2 }}
          sx={{ display: 'flex', justifyContent: 'flex-end' }}
        >
          <DataTableColumnSelect
            columns={allColumns}
            onToggleColumn={toggleColumn}
            selectedColumn={activeColumns.map((col) => col.field)}
          />
        </Grid2>
      </Grid2>

      <DataTable
        keyField="id"
        isLoading={query.isLoading}
        columns={activeColumns}
        rows={rows}
        page={page}
        perPage={perPage}
        totalRecords={totalRecords}
        onPageChange={(nextPage) => setSearchParams({ page: nextPage })}
        onPerPageChange={(perPage) => setSearchParams({ perPage })}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSort={(sortBy, sortOrder) =>
          setSearchParams({ page: defaultPage, sortBy, sortOrder })
        }
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
