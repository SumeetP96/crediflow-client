import { AutoDelete } from '@mui/icons-material';
import { Paper } from '@mui/material';
import DataTable from '../../components/data-table/DataTable';
import { IDataTableFilter } from '../../components/data-table/types';
import ListingHeader from '../../components/listing-header/ListingHeader';
import Page from '../../components/page/Page';
import { defaultPage } from '../../helpers/constants';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { showDeletedOptions } from './constants';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';
import { TUserRecord } from './types';

const pageTitle = 'Users Listing';

const additionalFilters: IDataTableFilter<TUserRecord>[] = [
  {
    field: 'isDeletedShown',
    title: 'Show Deleted',
    type: 'select',
    label: 'Show Deleted',
    icon: <AutoDelete />,
    selectOptions: showDeletedOptions,
    render: (_, value) => {
      return value ? (value === 'yes' ? 'Yes' : 'No') : '';
    },
  },
];

export default function UsersListing() {
  const { setSearchParams } = useQueryParams();

  const { query, rows, totalRecords } = useUserListingData();

  const { allColumns, activeColumns, toggleColumn } = useUserListingColumns();

  const { page, perPage, sortBy, sortOrder } = useCommonListingParams();

  return (
    <Page title={pageTitle}>
      <Paper variant="outlined">
        <ListingHeader
          pageTitle={pageTitle}
          isApiLoading={query.isLoading}
          apiError={query.error}
          columns={allColumns}
          filters={additionalFilters}
          selectedColumns={activeColumns}
          onToggleColumn={toggleColumn}
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
