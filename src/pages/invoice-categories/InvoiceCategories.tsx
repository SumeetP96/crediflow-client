import Page from '../../components/page/Page';
import { AppRoute } from '../../router/routes';

function InvoiceCategories() {
  return (
    <Page
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoute('MASTERS_HOME'),
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
