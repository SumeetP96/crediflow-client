import { Card, CardActionArea, CardContent, Grid2, Typography } from '@mui/material';
import Page from '../../components/page/Page';
import { mainMenuLinks } from '../../layouts/constants/nav-links';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';

function Masters() {
  const { navigateTo } = useNavigateTo();

  const masters =
    mainMenuLinks
      .find((link) => link.id === 'masters')
      ?.children?.filter((link) => link.id !== 'masters-home') || [];

  return (
    <Page title="Home" header="Masters Home">
      <Grid2 container spacing={2}>
        {masters.map((master) => (
          <Grid2 key={master.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
            <Card variant="outlined" sx={{ width: '100%' }}>
              <CardActionArea onClick={() => navigateTo(String(master.to))}>
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
