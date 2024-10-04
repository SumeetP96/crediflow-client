import { ChevronRight, Close, Dvr, Fullscreen, FullscreenExit, Replay } from '@mui/icons-material';
import {
  Box,
  Button,
  ButtonProps,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Paper,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../router/helpers';
import { EThemeNames } from '../../theme/contstants';
import useDynamicTheme from '../../theme/use-dynamic-theme';
import ColorSchemeSettingButtons from '../color-scheme-setting-buttons/ColorSchemeSettingButtons';

export interface ISettingsDrawer {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: ISettingsDrawer) {
  const {
    actions: { changeTheme },
  } = useDynamicTheme();

  const { navigateTo } = useNavigateTo();

  const [isFullScreen, setIsFullscreen] = useState(document.fullscreenElement !== null);

  const toggleFullscreen = () => {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      setIsFullscreen(false);
    } else {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    }
  };

  return (
    <Drawer anchor="right" open={open} onClose={onClose}>
      <Box display="flex" alignItems="center" justifyContent="space-between" sx={{ px: 2, py: 1 }}>
        <Typography fontWeight={500}>Settings</Typography>

        <Box display="flex" gap={1}>
          <Tooltip title="Toggle fullscreen">
            <IconButton size="small" onClick={toggleFullscreen}>
              {isFullScreen ? <FullscreenExit /> : <Fullscreen />}
            </IconButton>
          </Tooltip>

          <Tooltip title="Reset to default">
            <IconButton size="small">
              <Replay />
            </IconButton>
          </Tooltip>

          <Tooltip title="Close settings">
            <IconButton size="small" onClick={onClose}>
              <Close />
            </IconButton>
          </Tooltip>
        </Box>
      </Box>

      <Divider />

      <Box
        display="flex"
        flexDirection="column"
        gap={4}
        sx={{ p: 3, width: { xs: '100%', md: 350 } }}
      >
        {/* Color Scheme */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Color Scheme
          </Typography>

          <ColorSchemeSettingButtons size="medium" />
        </Box>

        {/* Theme */}
        <Box>
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Theme
          </Typography>

          <Paper variant="outlined" sx={{ p: 2, bgcolor: 'transparent' }}>
            <Grid2 container spacing={1}>
              {['primary', 'success', 'warning', 'secondary', 'error', 'info'].map((color) => (
                <Grid2 size={4} key={color}>
                  <Button
                    onClick={() => {
                      if (color === 'primary') {
                        changeTheme(EThemeNames.BLUE);
                      } else if (color === 'success') {
                        changeTheme(EThemeNames.GREEN);
                      }
                    }}
                    color={color as ButtonProps['color']}
                    startIcon={<Dvr />}
                    sx={{ width: '100%', height: '60px', '& .MuiButton-startIcon': { mr: 0 } }}
                  />
                </Grid2>
              ))}
            </Grid2>
          </Paper>
        </Box>
      </Box>

      <Button
        size="large"
        sx={{ mt: 'auto', mb: 1 }}
        endIcon={<ChevronRight />}
        onClick={() => {
          navigateTo(AppRoute('SETTINGS'));
          onClose();
        }}
      >
        All Settings
      </Button>
    </Drawer>
  );
}
