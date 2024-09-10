import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Users() {
  return (
    <Page
      header="Users"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Users',
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
