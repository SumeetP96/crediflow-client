import { Backdrop, useTheme } from '@mui/material';
import { ThreeDots } from 'react-loader-spinner';
import { useDarkMode } from '../../helpers/hooks/use-dark-mode';
import ThemeProviderWrapper from '../theme-provider-wrapper/ThemeProviderWrapper';

function LoaderFullscreenComponent() {
  const { isDarkMode } = useDarkMode();

  const theme = useTheme();

  const color = isDarkMode ? theme.palette.primary.dark : theme.palette.primary.light;

  return (
    <Backdrop sx={(theme) => ({ color: '#fff', zIndex: theme.zIndex.drawer + 1 })} open>
      <ThreeDots
        visible={true}
        height="80"
        width="80"
        color={color}
        radius="9"
        ariaLabel="three-dots-loading"
      />
    </Backdrop>
  );
}

export default function LoaderFullscreen() {
  return (
    <ThemeProviderWrapper>
      <LoaderFullscreenComponent />
    </ThemeProviderWrapper>
  );
}
