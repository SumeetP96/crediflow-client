import ListingPage from '../../components/listing-page/ListingPage';
import { AppRoute } from '../../router/helpers';
import useCustomersListingColumns from './hooks/use-customers-listing-columns';
import useCustomersListingData from './hooks/use-customers-listing-data';

export default function CustomersListing() {
  const { query, rows, totalRecords } = useCustomersListingData();

  const { columns } = useCustomersListingColumns();

  return (
    <ListingPage
      pageTitle="Customers Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
      newRecordRoute={AppRoute('CUSTOMERS_CREATE')}
    />
  );
}
