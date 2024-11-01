import ListingPage from '../../components/listing-page/ListingPage';
import useInvoiceCategoriesListingColumns from './hooks/use-invoice-categories-listing-columns';
import useInvoiceCategoriesListingData from './hooks/use-invoice-categories-listing-data';

const pageTitle = 'Invoice Categories Listing';

export default function InvoiceCategoriesListing() {
  const { query, rows, totalRecords } = useInvoiceCategoriesListingData();

  const { columns } = useInvoiceCategoriesListingColumns();

  return (
    <ListingPage
      pageTitle={pageTitle}
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
    />
  );
}
