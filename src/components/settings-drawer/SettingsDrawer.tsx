import { ChevronRight, Close, Fullscreen, FullscreenExit, Replay } from '@mui/icons-material';
import {
  Badge,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Drawer,
  Grid2,
  IconButton,
  SvgIcon,
  Tooltip,
  Typography,
  useTheme,
} from '@mui/material';
import { useState } from 'react';
import { useDarkMode } from '../../helpers/hooks/use-dark-mode';
import useNavigateTo from '../../layouts/hooks/use-navigate-to';
import { AppRoute } from '../../router/helpers';
import { defaultThemeName } from '../../theme/helpers/defaults';
import { fontFamily, fontOptions } from '../../theme/helpers/font';
import { themeConfigOptions } from '../../theme/helpers/theme';
import { EFontNames } from '../../theme/helpers/types';
import useDynamicTheme from '../../theme/use-dynamic-theme';
import ColorSchemeSettingButtons from '../color-scheme-setting-buttons/ColorSchemeSettingButtons';

export interface ISettingsDrawer {
  open: boolean;
  onClose: () => void;
}

export default function SettingsDrawer({ open, onClose }: ISettingsDrawer) {
  const { navigateTo } = useNavigateTo();

  const { isDarkMode } = useDarkMode();

  const theme = useTheme();

  const { themeName, fontName, changeTheme, changeFont, resetToDefaultTheme } = useDynamicTheme();

  const isDefault = themeName === defaultThemeName;

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
        sx={{
          width: '100%',
          height: '100%',
          bgcolor: isDarkMode ? 'background.default' : 'inherit',
        }}
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
              <IconButton size="small" onClick={resetToDefaultTheme}>
                {!isDefault ? (
                  <Badge variant="dot" color="secondary">
                    <Replay />
                  </Badge>
                ) : (
                  <Replay />
                )}
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
          gap={6}
          sx={{ p: 3, width: { xs: '100%', md: 350 } }}
        >
          {/* Color Scheme */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Color Scheme
            </Typography>

            <ColorSchemeSettingButtons size="medium" />
          </Box>

          {/* Theme */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Theme
            </Typography>

            <Grid2 container spacing={1}>
              {themeConfigOptions.map((opt) => {
                const isActive = themeName === opt.value;
                const primaryColor = isDarkMode ? opt.primaryDark : opt.primaryLight;

                return (
                  <Grid2 size={6} key={opt.value}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: isActive ? `${primaryColor}33` : 'transparent',
                        color: isActive ? 'text.primary' : primaryColor,
                      }}
                    >
                      <CardActionArea onClick={() => changeTheme(opt.value)}>
                        <CardContent sx={{ py: 1.5 }}>
                          <Typography
                            align="center"
                            fontFamily={fontFamily(EFontNames.DANCING_SCRIPT)}
                            fontSize="1.75rem"
                            sx={{ color: isActive ? 'text.primary' : primaryColor }}
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

          {/* Font */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Font
            </Typography>

            <Grid2 container spacing={1}>
              {fontOptions.map((opt) => {
                const isActive = fontName === opt.value;
                return (
                  <Grid2 size={6} key={opt.value}>
                    <Card
                      elevation={0}
                      sx={{
                        bgcolor: isActive ? `${theme.palette.primary.main}33` : 'transparent',
                        color: isActive ? 'text.primary' : theme.palette.primary.main,
                      }}
                    >
                      <CardActionArea onClick={() => changeFont(opt.value)}>
                        <CardContent>
                          <Box
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            alignItems="center"
                          >
                            <SvgIcon
                              fontSize="large"
                              sx={{
                                fill: isActive
                                  ? theme.palette.text.primary
                                  : theme.palette.text.secondary,
                              }}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <title>format-letter-case</title>
                                <path d="M20.06,18C20,17.83 19.91,17.54 19.86,17.11C19.19,17.81 18.38,18.16 17.45,18.16C16.62,18.16 15.93,17.92 15.4,17.45C14.87,17 14.6,16.39 14.6,15.66C14.6,14.78 14.93,14.1 15.6,13.61C16.27,13.12 17.21,12.88 18.43,12.88H19.83V12.24C19.83,11.75 19.68,11.36 19.38,11.07C19.08,10.78 18.63,10.64 18.05,10.64C17.53,10.64 17.1,10.76 16.75,11C16.4,11.25 16.23,11.54 16.23,11.89H14.77C14.77,11.46 14.92,11.05 15.22,10.65C15.5,10.25 15.93,9.94 16.44,9.71C16.95,9.5 17.5,9.36 18.13,9.36C19.11,9.36 19.87,9.6 20.42,10.09C20.97,10.58 21.26,11.25 21.28,12.11V16C21.28,16.8 21.38,17.42 21.58,17.88V18H20.06M17.66,16.88C18.11,16.88 18.54,16.77 18.95,16.56C19.35,16.35 19.65,16.07 19.83,15.73V14.16H18.7C16.93,14.16 16.04,14.63 16.04,15.57C16.04,16 16.19,16.3 16.5,16.53C16.8,16.76 17.18,16.88 17.66,16.88M5.46,13.71H9.53L7.5,8.29L5.46,13.71M6.64,6H8.36L13.07,18H11.14L10.17,15.43H4.82L3.86,18H1.93L6.64,6Z" />
                              </svg>
                            </SvgIcon>

                            <Typography
                              align="center"
                              fontFamily={fontFamily(opt.value)}
                              color="textPrimary"
                              sx={{ mt: 0.5, fontWeight: isActive ? 'bold' : 'normal' }}
                            >
                              {opt.label}
                            </Typography>
                          </Box>
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
          sx={{ mt: 'auto', mb: 2, mx: 3 }}
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
