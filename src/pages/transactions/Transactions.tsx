import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Transactions() {
  return (
    <Page
      header="Transactions"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoutes.DASHBOARD,
        },
        {
          label: 'Transactions',
          active: true,
        },
      ]}
    >
      Transactions
    </Page>
  );
}

export default Transactions;