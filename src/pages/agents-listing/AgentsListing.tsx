import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useCustomerListingColumns from './hooks/use-agents-listing-columns';
import useCustomerListingData from './hooks/use-agents-listing-data';

export default function AgentsListing() {
  const { query, rows, totalRecords } = useCustomerListingData();

  const { columns } = useCustomerListingColumns();

  return (
    <MastersListingPage
      pageTitle="Agents Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
