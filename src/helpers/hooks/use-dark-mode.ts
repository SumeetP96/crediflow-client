import { useColorScheme, useMediaQuery } from '@mui/material';

export const useDarkMode = () => {
  const { mode, setMode } = useColorScheme();

  const prefersDarkMode = useMediaQuery('(prefers-color-scheme: dark)');

  const isDarkMode = mode === 'dark' || (prefersDarkMode && mode === 'system');

  const toggleDarkMode = () => {
    setMode(isDarkMode ? 'light' : 'dark');
  };

  return { isDarkMode, toggleDarkMode, mode, setMode };
};
