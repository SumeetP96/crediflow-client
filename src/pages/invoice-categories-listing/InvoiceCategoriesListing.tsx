import MastersListingPage from '../../components/masters-listing-page/MastersListingPage';
import { AppRoute } from '../../router/helpers';
import useInvoiceCategoriesListingColumns from './hooks/use-invoice-categories-listing-columns';
import useInvoiceCategoriesListingData from './hooks/use-invoice-categories-listing-data';

export default function InvoiceCategoriesListing() {
  const { query, rows, totalRecords } = useInvoiceCategoriesListingData();

  const { columns } = useInvoiceCategoriesListingColumns();

  return (
    <MastersListingPage
      pageTitle="Invoice Categories Listing"
      isApiLoading={query.isLoading}
      isApiError={query.isError}
      rows={rows ?? []}
      totalRecords={totalRecords}
      columns={columns}
      softDeleteFilter={false}
      newRecordRoute={AppRoute('INVOICE_CATEGORIES_CREATE')}
    />
  );
}
