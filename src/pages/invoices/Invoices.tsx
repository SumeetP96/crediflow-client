import Page from '../../components/page/Page';
import { AppRoute } from '../../router/routes';

function Invoices() {
  return (
    <Page
      title="Listing"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoute('DASHBOARD'),
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
