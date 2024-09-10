import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Customers() {
  return (
    <Page
      header="Customers"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Customers',
          active: true,
        },
      ]}
    >
      Customers
    </Page>
  );
}

export default Customers;
