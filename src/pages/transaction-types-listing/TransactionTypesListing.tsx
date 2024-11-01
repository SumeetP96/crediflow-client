import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useTransactionTypesListingColumns from './hooks/use-transaction-types-listing-columns';
import useTransactionTypesListingData from './hooks/use-transaction-types-listing-data';

export default function TransactionTypesListing() {
  const { query, rows, totalRecords } = useTransactionTypesListingData();

  const { columns } = useTransactionTypesListingColumns();

  return (
    <MastersListingPage
      pageTitle="Transaction Types Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
