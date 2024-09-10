import { Link } from 'react-router-dom';
import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Masters() {
  return (
    <Page
      header="Masters"
      title="Home"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: AppRoutes.DASHBOARD,
        },
        {
          label: 'Masters',
          active: true,
        },
      ]}
    >
      <Link to={AppRoutes.USERS}>Users</Link>
    </Page>
  );
}

export default Masters;
