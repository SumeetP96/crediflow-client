import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { theme } from '../../helpers/theme';
import LoaderFullscreen from '../loader-fullscreen/LoaderFullscreen';

export default function RouterLoader() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LoaderFullscreen />
    </ThemeProvider>
  );
}
