import Page from '../../components/page/Page';
import { AppRoute } from '../../router/routes';

function Customers() {
  return (
    <Page
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoute('MASTERS_HOME'),
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
