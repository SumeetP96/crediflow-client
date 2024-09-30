import { Box, Fade, useTheme } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import ThemeProviderWrapper from '../theme-provider-wrapper/ThemeProviderWrapper';
import './LoaderFullscreen.css';

function LoaderFullscreenComponent() {
  const theme = useTheme();

  const color = theme.palette.primary.main;

  return (
    <Fade in={true}>
      <Box className="fullscreen-container" sx={{ bgcolor: 'background.default' }}>
        <Box className="loader-container">
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color={color}
            radius="9"
            ariaLabel="three-dots-loading"
          />
        </Box>
      </Box>
    </Fade>
  );
}

export default function LoaderFullscreen() {
  return (
    <ThemeProviderWrapper>
      <LoaderFullscreenComponent />
    </ThemeProviderWrapper>
  );
}
