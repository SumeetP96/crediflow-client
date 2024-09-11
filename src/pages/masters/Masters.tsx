import {
  Card,
  CardActionArea,
  CardContent,
  Grid2,
  Typography,
} from '@mui/material';
import { useNavigate } from 'react-router';
import Page from '../../components/page/Page';
import { navLinks } from '../../layouts/constants/nav-links';
import { AppRoutes } from '../../router/routes';

function Masters() {
  const navigate = useNavigate();

  const masters =
    navLinks
      .find((link) => link.id === 'masters')
      ?.children?.filter((link) => link.id !== 'masters-home') || [];

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
      <Grid2 container spacing={2} sx={{ mt: 3 }}>
        {masters.map((master) => (
          <Grid2 key={master.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
              <CardActionArea onClick={() => navigate(String(master.to))}>
                <CardContent>
                  <Typography gutterBottom variant="h6" component="div">
                    {master.label}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    {master.description}
                  </Typography>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid2>
        ))}
      </Grid2>
    </Page>
  );
}

export default Masters;
