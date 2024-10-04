import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';
import { themeSettings } from '../contstants';

export const greenTheme = createTheme({
  shape: {
    borderRadius: themeSettings.borderRadius,
  },
  colorSchemes: {
    dark: true,
    light: {
      palette: {
        primary: {
          main: '#166534',
          light: '#15803d',
          dark: '#14532d',
        },
        background: {
          default: blueGrey[50],
        },
      },
    },
  },
});
