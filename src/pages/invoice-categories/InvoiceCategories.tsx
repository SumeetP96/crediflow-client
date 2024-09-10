import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function InvoiceCategories() {
  return (
    <Page
      header="Invoice Categories"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Invoice Categories',
          active: true,
        },
      ]}
    >
      Invoice Categories
    </Page>
  );
}

export default InvoiceCategories;
