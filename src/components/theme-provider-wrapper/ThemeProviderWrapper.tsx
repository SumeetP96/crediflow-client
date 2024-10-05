import { CssBaseline, ThemeProvider } from '@mui/material';
import { ReactNode } from 'react';
import DynamicThemeProvider from '../../theme/DynamicThemeProvider';
import useDynamicTheme from '../../theme/use-dynamic-theme';

function ThemeProviderWrapperComponent({ children }: { children: ReactNode }) {
  const { theme } = useDynamicTheme();

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </ThemeProvider>
  );
}

export default function ThemeProviderWrapper({ children }: { children: ReactNode }) {
  return (
    <DynamicThemeProvider>
      <ThemeProviderWrapperComponent>{children}</ThemeProviderWrapperComponent>
    </DynamicThemeProvider>
  );
}
