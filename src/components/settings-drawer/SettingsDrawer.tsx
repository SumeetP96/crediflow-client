import { ChevronRight, Close, Fullscreen, FullscreenExit, Replay } from '@mui/icons-material';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../router/helpers';
import { themeConfigOptions } from '../../theme/constants/contstants';
import useDynamicTheme from '../../theme/use-dynamic-theme';
import ColorSchemeSettingButtons from '../color-scheme-setting-buttons/ColorSchemeSettingButtons';

export interface ISettingsDrawer {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: ISettingsDrawer) {
  const {
    state: { themeName },
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
      <Box
        display="flex"
        justifyContent="space-between"
        flexDirection="column"
        sx={{ width: '100%', height: '100%', bgcolor: 'background.default' }}
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="space-between"
          sx={{ px: 2, py: 1 }}
        >
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

            <Grid2 container spacing={1}>
              {themeConfigOptions.map((opt) => {
                const isActive = themeName === opt.value;

                return (
                  <Grid2 size={6} key={opt.value}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: isActive ? `${opt.primaryColor}33` : 'transparent',
                        color: isActive ? 'text.primary' : opt.primaryColor,
                      }}
                    >
                      <CardActionArea onClick={() => changeTheme(opt.value)}>
                        <CardContent sx={{ py: 1.5 }}>
                          <Typography
                            align="center"
                            fontFamily="Dancing Script"
                            fontSize="1.75rem"
                            sx={{ color: isActive ? 'text.primary' : opt.primaryColor }}
                          >
                            {opt.label}
                          </Typography>
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </Grid2>
                );
              })}
            </Grid2>
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
      </Box>
    </Drawer>
  );
}
