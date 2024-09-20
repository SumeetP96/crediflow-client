import { Paper } from '@mui/material';
import { useMemo } from 'react';
import DataTable from '../../components/data-table/DataTable';
import ListingHeader from '../../components/listing-header/ListingHeader';
import Page from '../../components/page/Page';
import { defaultPage } from '../../helpers/constants';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { AppRoutes } from '../../router/routes';
import { userRoleLabelMap } from './constants';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';
import useUserListingParams from './hooks/use-user-listing-params';

const pageTitle = 'Users Listing';

export default function UsersListing() {
  const { setSearchParams } = useQueryParams();

  const { query, rows, totalRecords } = useUserListingData();

  const { allColumns, activeColumns, toggleColumn } = useUserListingColumns();

  const { page, perPage, sortBy, sortOrder, search } = useCommonListingParams();

  const { roles, status } = useUserListingParams();

  const filters = useMemo(() => {
    const activeFilters = [];

    if (sortBy && sortOrder && sortOrder !== 'none') {
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
    <Page
      title={pageTitle}
      breadcrumbs={[
        { label: 'Masters', to: AppRoutes.MASTERS },
        { label: 'Users', active: true },
      ]}
    >
      <Paper variant="outlined">
        <ListingHeader
          pageTitle={pageTitle}
          isApiLoading={query.isLoading}
          apiError={query.error}
          columns={allColumns}
          selectedColumns={activeColumns}
          onToggleColumn={toggleColumn}
          filters={filters}
        />

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
          onSort={(sortBy, sortOrder) => setSearchParams({ page: defaultPage, sortBy, sortOrder })}
        />
      </Paper>
    </Page>
  );
}
