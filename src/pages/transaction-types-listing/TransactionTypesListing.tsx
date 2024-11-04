import ListingPage from '../../components/listing-page/ListingPage';
import { AppRoute } from '../../router/helpers';
import useTransactionTypesListingColumns from './hooks/use-transaction-types-listing-columns';
import useTransactionTypesListingData from './hooks/use-transaction-types-listing-data';

export default function TransactionTypesListing() {
  const { query, rows, totalRecords } = useTransactionTypesListingData();

  const { columns } = useTransactionTypesListingColumns();

  return (
    <ListingPage
      pageTitle="Transaction Types Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
      newRecordRoute={AppRoute('TRANSACTION_TYPES_CREATE')}
    />
  );
}
