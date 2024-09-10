import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Agents() {
  return (
    <Page
      header="Agents"
      title="Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Agents',
          active: true,
        },
      ]}
    >
      Agents
    </Page>
  );
}

export default Agents;
