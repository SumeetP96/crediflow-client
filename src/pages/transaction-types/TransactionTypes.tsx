import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function TransactionTypes() {
  return (
    <Page
      header="Transaction Types"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Transaction Types',
          active: true,
        },
      ]}
    >
      Transaction Types
    </Page>
  );
}

export default TransactionTypes;
