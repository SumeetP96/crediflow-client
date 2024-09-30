import { Box, Paper, Typography } from '@mui/material';
import ColorSchemeSettingButtons from '../../components/color-scheme-setting-buttons/ColorSchemeSettingButtons';
import Page from '../../components/page/Page';

function Settings() {
  return (
    <Page header="Settings" title="App Settings">
      <Paper sx={{ p: 3, width: { xs: '100%', md: '720px' }, mx: 'auto' }} variant="outlined">
        {/* Color Scheme */}
        <Box>
          <Typography variant="h6" component="h6" sx={{ mb: 2 }}>
            Color Scheme
          </Typography>

          <ColorSchemeSettingButtons size="large" />
        </Box>
      </Paper>
    </Page>
  );
}

export default Settings;
