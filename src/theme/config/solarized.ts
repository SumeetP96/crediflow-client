import { createTheme } from '@mui/material';
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
    default: '#eee8d5	',
  },
};

export const paletteDark = {
  ...paletteLight,
  background: {
    paper: '#073642',
    default: '#002b36',
  },
};

export const earthTheme = createTheme({
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
});
