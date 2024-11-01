import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useCustomersListingColumns from './hooks/use-customers-listing-columns';
import useCustomersListingData from './hooks/use-customers-listing-data';

export default function CustomersListing() {
  const { query, rows, totalRecords } = useCustomersListingData();

  const { columns } = useCustomersListingColumns();

  return (
    <MastersListingPage
      pageTitle="Customers Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
