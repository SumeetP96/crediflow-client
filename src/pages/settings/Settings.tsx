import {
  DarkModeTwoTone,
  LightModeTwoTone,
  SettingsBrightnessTwoTone,
} from '@mui/icons-material';
import { Box, Button, Paper, Typography } from '@mui/material';
import Page from '../../components/page/Page';
import { useDarkMode } from '../../hooks/use-dark-mode';

function Settings() {
  const { mode, setMode } = useDarkMode();

  return (
    <Page header="Settings" title="App Settings">
      <Paper sx={{ p: 3, width: '720px', mx: 'auto' }} variant="outlined">
        {/* Theme */}
        <Typography variant="h6" component="h6">
          Theme
        </Typography>

        <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
          <Button
            size="large"
            variant={mode === 'light' ? 'contained' : 'outlined'}
            startIcon={<LightModeTwoTone />}
            onClick={() => setMode('light')}
          >
            Light
          </Button>

          <Button
            size="large"
            variant={mode === 'dark' ? 'contained' : 'outlined'}
            startIcon={<DarkModeTwoTone />}
            onClick={() => setMode('dark')}
          >
            Dark
          </Button>

          <Button
            size="large"
            variant={mode === 'system' ? 'contained' : 'outlined'}
            startIcon={<SettingsBrightnessTwoTone />}
            onClick={() => setMode('system')}
          >
            System
          </Button>
        </Box>
      </Paper>
    </Page>
  );
}

export default Settings;
