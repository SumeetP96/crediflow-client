import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
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
      <Card sx={{ minWidth: 275 }}>
        <CardContent>
          <Typography
            gutterBottom
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            Word of the Day
          </Typography>
          <Typography variant="h5" component="div">
            asdf
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 1.5 }}>
            adjective
          </Typography>
          <Typography variant="body2">
            well meaning and kindly.
            <br />
            {'"a benevolent smile"'}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small">Learn More</Button>
        </CardActions>
      </Card>
    </Page>
  );
}

export default Users;
