import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Reports() {
  return (
    <Page
      header="Reports"
      title="Home"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoutes.DASHBOARD,
        },
        {
          label: 'Reports',
          active: true,
        },
      ]}
    >
      Reports
    </Page>
  );
}

export default Reports;
