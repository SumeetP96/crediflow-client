import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import useInvoicesListingColumns from './hooks/use-invoices-listing-columns';
import useInvoicesListingData from './hooks/use-invoices-listing-data';

export default function InvoicesListing() {
  const { query, rows, totalRecords } = useInvoicesListingData();

  const { columns } = useInvoicesListingColumns();

  return (
    <MastersListingPage
      pageTitle="Invoices Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
