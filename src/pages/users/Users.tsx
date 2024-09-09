import Page from '../../components/page/Page';
import { Routes } from '../../router/routes';

function Users() {
  return (
    <Page
      header="Users"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Dashboard',
          to: Routes.DASHBOARD,
        },
        {
          label: 'Users',
          to: Routes.USERS,
          active: true,
        },
      ]}
    >
      <ul>
        <li>User 1</li>
        <li>User 2</li>
      </ul>
    </Page>
  );
}

export default Users;
