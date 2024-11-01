import { Paper } from '@mui/material';
import { defaultPage } from '../../helpers/constants';
import useCommonListingParams from '../../helpers/hooks/use-common-listing-params';
import useListingColumns from '../../helpers/hooks/use-listing-columns';
import useQueryParams from '../../helpers/hooks/use-query-params';
import { EQueryParamKeys } from '../../helpers/types';
import { showDeletedFilter } from '../../helpers/utils/data-table';
import { AppRoute } from '../../router/helpers';
import DataTable from '../data-table/DataTable';
import { IDataTableColumn, IDataTableFilter } from '../data-table/types';
import ListingHeader from '../listing-header/ListingHeader';
import Page from '../page/Page';

export interface IListingPageProps<RecordType> {
  pageTitle: string;
  isApiLoading: boolean;
  isApiError: boolean;
  rows: RecordType[];
  totalRecords: number;
  columns: IDataTableColumn<RecordType>[];
  keyField?: keyof RecordType;
  softDeleteFilter?: boolean;
}

export default function ListingPage<RecordType>({
  pageTitle,
  isApiLoading,
  isApiError,
  rows,
  columns,
  totalRecords,
  keyField = 'id' as keyof RecordType,
  softDeleteFilter = true,
}: IListingPageProps<RecordType>) {
  const { setSearchParams } = useQueryParams();

  const { activeColumns, toggleColumn } = useListingColumns<RecordType>(columns);

  const { page, perPage, sortBy, sortOrder } = useCommonListingParams();

  const additionalFilters: IDataTableFilter<RecordType>[] = softDeleteFilter
    ? [showDeletedFilter()]
    : [];

  return (
    <Page title={pageTitle}>
      <Paper variant="outlined">
        <ListingHeader
          pageTitle={pageTitle}
          isApiLoading={isApiLoading}
          apiError={isApiError}
          columns={columns}
          filters={additionalFilters}
          selectedColumns={activeColumns}
          onToggleColumn={toggleColumn}
          newRecordRoute={AppRoute('INVOICE_CATEGORIES_CREATE')}
        />

        <DataTable
          keyField={keyField}
          isLoading={isApiLoading}
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
