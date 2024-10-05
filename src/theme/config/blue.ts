import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { themeSettings } from '../constants/defaults';

export const blueTheme = createTheme({
  shape: {
    borderRadius: themeSettings.borderRadius,
  },
  colorSchemes: {
    dark: true,
    light: {
      palette: {
        background: {
          default: blueGrey[50],
        },
      },
    },
  },
});
