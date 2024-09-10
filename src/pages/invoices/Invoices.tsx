import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Invoices() {
  return (
    <Page
      header="Invoices"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoutes.DASHBOARD,
        },
        {
          label: 'Invoices',
          active: true,
        },
      ]}
    >
      Invoices
    </Page>
  );
}

export default Invoices;
