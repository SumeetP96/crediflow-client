import Page from '../../components/page/Page';
import { AppRoute } from '../../router/helpers';

function Transactions() {
  return (
    <Page
      title="Listing"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoute('DASHBOARD'),
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
