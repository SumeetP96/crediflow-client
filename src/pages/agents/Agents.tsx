import Page from '../../components/page/Page';
import { AppRoute } from '../../router/routes';

function Agents() {
  return (
    <Page
      title="Agents Listing"
      breadcrumbs={[
        {
          label: 'Masters',
          to: AppRoute('MASTERS_HOME'),
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
