import Page from '../../components/page/Page';
import { AppRoute } from '../../router/helpers';

function TransactionTypes() {
  return (
    <Page
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoute('MASTERS_HOME'),
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
