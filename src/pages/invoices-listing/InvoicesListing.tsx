import ListingPage from '../../components/listing-page/ListingPage';
import { AppRoute } from '../../router/helpers';
import useInvoicesListingColumns from './hooks/use-invoices-listing-columns';
import useInvoicesListingData from './hooks/use-invoices-listing-data';

export default function InvoicesListing() {
  const { query, rows, totalRecords } = useInvoicesListingData();

  const { columns } = useInvoicesListingColumns();

  return (
    <ListingPage
      pageTitle="Invoices Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
      newRecordRoute={AppRoute('INVOICES_CREATE')}
    />
  );
}
