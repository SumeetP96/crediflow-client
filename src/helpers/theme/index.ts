import { createTheme } from '@mui/material';
import { blueGrey } from '@mui/material/colors';

export const theme = createTheme({
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
  shape: {
    borderRadius: 12,
  },
});
