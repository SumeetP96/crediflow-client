import { createTheme } from '@mui/material';
import { grey } from '@mui/material/colors';
import { themeSettings } from '../constants/defaults';

export const paletteLight = {
  primary: {
    dark: '#0e9085',
    main: '#2aa197',
    light: '#4eb2a9',
    contrastText: '#ffffff',
  },
  secondary: {
    dark: '#b24010',
    main: '#cb4c16',
    light: '#d95319',
    contrastText: '#ffffff',
  },
  error: {
    dark: '#cf2b28',
    main: '#dc322f',
    light: '#ee3c35',
    contrastText: '#ffffff',
  },
  warning: {
    dark: '#a37a00',
    main: '#b58800',
    light: '#d5af13',
    contrastText: '#000000',
  },
  info: {
    dark: '#2379be',
    main: '#268ad2',
    light: '#2a9de6',
    contrastText: '#000000',
  },
  success: {
    dark: '#6d7300',
    main: '#859900',
    light: '#93b00f',
    contrastText: '#000000',
  },
  background: {
    paper: '#fefaee',
    default: '#eee8d5',
  },
  text: {
    primary: '#002b36',
  },
};

export const paletteDark = {
  ...paletteLight,
  text: {
    primary: grey[100],
  },
  background: {
    paper: '#073642',
    default: '#002b36',
  },
};

export const solarizedTheme = createTheme({
  shape: {
    borderRadius: themeSettings.borderRadius,
  },
  colorSchemes: {
    light: {
      palette: paletteLight,
    },
    dark: {
      palette: paletteDark,
    },
  },
  components: {
    MuiTableHead: {
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor:
            theme.palette.mode === 'dark'
              ? `${paletteDark.background.default}88`
              : `${paletteLight.background.default}88`,
        }),
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: ({ theme }) => ({
          borderColor:
            theme.palette.mode === 'dark'
              ? `${paletteLight.background.paper}22`
              : `${paletteDark.background.paper}22`,
        }),
      },
    },
  },
});
