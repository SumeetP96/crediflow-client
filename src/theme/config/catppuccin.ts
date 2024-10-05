import { createTheme } from '@mui/material';
import { themeSettings } from '../constants/defaults';

export const paletteLight = {
  primary: {
    dark: '#eb2d3a',
    main: '#e64552',
    light: '#dc6a73',
    contrastText: '#ffffff',
  },
  secondary: {
    dark: '#6e00ea',
    main: '#8839ef',
    light: '#9f62f2',
    contrastText: '#ffffff',
  },
  error: {
    dark: '#c50032',
    main: '#d20f39',
    light: '#e41d40',
    contrastText: '#ffffff',
  },
  warning: {
    dark: '#db841a',
    main: '#df8e1d',
    light: '#e39d32',
    contrastText: '#000000',
  },
  info: {
    dark: '#4b6afb',
    main: '#7287fd',
    light: '#9fa9fd',
    contrastText: '#000000',
  },
  success: {
    dark: '#348e20',
    main: '#40a02b',
    light: '#93b00f',
    contrastText: '#ffffff',
  },
  background: {
    paper: '#eff1f5',
    default: '#dce0e8',
  },
};

export const paletteDark = {
  ...paletteLight,
  background: {
    paper: '#1e2030',
    default: '#181926',
  },
};

export const catppuccinTheme = createTheme({
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
