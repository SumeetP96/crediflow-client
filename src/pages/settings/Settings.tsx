import { Box, Paper, Typography } from '@mui/material';
import Page from '../../components/page/Page';
import ColorSchemeSettings from './components/ColorSchemeSettings';

function Settings() {
  return (
    <Page header="Settings" title="App Settings">
      <Paper sx={{ p: 3, width: { xs: '100%', md: '720px' }, mx: 'auto' }} variant="outlined">
        {/* Color Scheme */}
        <Box>
          <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
            Color Scheme
          </Typography>

          <ColorSchemeSettings />
        </Box>
      </Paper>
    </Page>
  );
}

export default Settings;
