import Page from '../../components/page/Page';
import { AppRoutes } from '../../router/routes';

function Agents() {
  return (
    <Page
      title="Agents Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoutes.MASTERS_HOME,
        },
        {
          label: 'Agents Listing',
          active: true,
        },
      ]}
    >
      Agents
    </Page>
  );
}

export default Agents;
