import Page from '../../components/page/Page';
import { AppRoute } from '../../router/helpers';

function Reports() {
  return (
    <Page
      title="Home"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoute('DASHBOARD'),
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
