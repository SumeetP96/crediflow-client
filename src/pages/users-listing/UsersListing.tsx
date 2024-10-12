import { Paper } from '@mui/material';
import DataTable from '../../components/data-table/DataTable';
import { IDataTableFilter } from '../../components/data-table/types';
import ListingHeader from '../../components/listing-header/ListingHeader';
import Page from '../../components/page/Page';
import { defaultPage, EQueryParamKeys } from '../../helpers/constants';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { showDeletedFilter } from '../../helpers/utils/data-table';
import { AppRoute } from '../../router/helpers';
import useUserListingColumns from './hooks/use-user-listing-columns';
import useUserListingData from './hooks/use-user-listing-data';
import { TUserRecord } from './types';

const pageTitle = 'Users Listing';

const additionalFilters: IDataTableFilter<TUserRecord>[] = [showDeletedFilter()];

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
          newRecordRoute={AppRoute('USERS_CREATE')}
        />

        <DataTable
          keyField="id"
          isLoading={query.isLoading}
          columns={activeColumns}
          rows={rows}
          page={page}
          perPage={perPage}
          totalRecords={totalRecords}
          onPageChange={(nextPage) => setSearchParams({ [EQueryParamKeys.PAGE]: nextPage })}
          onPerPageChange={(perPage) => setSearchParams({ [EQueryParamKeys.PER_PAGE]: perPage })}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSort={(sortBy, sortOrder) =>
            setSearchParams({
              [EQueryParamKeys.PAGE]: defaultPage,
              [EQueryParamKeys.SORT_BY]: sortBy,
              [EQueryParamKeys.SORT_ORDER]: sortOrder,
            })
          }
        />
      </Paper>
    </Page>
  );
}
