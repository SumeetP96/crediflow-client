import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useCustomerListingColumns from './hooks/use-customer-listing-columns';
import useCustomerListingData from './hooks/use-customer-listing-data';

export default function CustomersListing() {
  const { query, rows, totalRecords } = useCustomerListingData();

  const { columns } = useCustomerListingColumns();

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
