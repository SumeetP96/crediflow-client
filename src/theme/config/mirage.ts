import { createTheme } from '@mui/material';
import { themeSettings } from '../helpers/defaults';
import { overrideThemeConfig } from './override';

export const paletteLight = {
  primary: {
    dark: '#fb901a',
    main: '#ff9c1d',
    light: '#ffaa33',
    contrastText: '#000000',
  },
  secondary: {
    dark: '#7c3fb6',
    main: '#8f5cc0',
    light: '#a37acc',
    contrastText: '#000000',
  },
  error: {
    dark: '#fb4e4c',
    main: '#f07171',
    light: '#f79999',
    contrastText: '#000000',
  },
  warning: {
    dark: '#f09d22',
    main: '#f2ae49',
    light: '#f6c67d',
    contrastText: '#000000',
  },
  info: {
    dark: '#4ea5c1',
    main: '#55b4d4',
    light: '#59bfdd',
    contrastText: '#000000',
  },
  success: {
    dark: '#5eaf3b',
    main: '#6cbf43',
    light: '#83c95f',
    contrastText: '#000000',
  },
  text: {
    primary: '#252729',
  },
  background: {
    paper: '#ffffff',
    default: '#F3F4F5',
  },
};

export const paletteDark = {
  primary: {
    dark: '#feb71d',
    main: '#ffcc66',
    light: '#ffe0a4',
    contrastText: '#000000',
  },
  secondary: {
    dark: '#c796f9',
    main: '#dfbfff',
    light: '#f3e5ff',
    contrastText: '#000000',
  },
  error: {
    dark: '#ff383c',
    main: '#ff6666',
    light: '#ff9492',
    contrastText: '#000000',
  },
  warning: {
    dark: '#ffbd37',
    main: '#ffd073',
    light: '#ffe3ab',
    contrastText: '#000000',
  },
  info: {
    dark: '#43c5df',
    main: '#5ccfe6',
    light: '#87ddef',
    contrastText: '#000000',
  },
  success: {
    dark: '#71d252',
    main: '#87d96c',
    light: '#9fe088',
    contrastText: '#000000',
  },
  text: {
    primary: '#ebeae7',
  },
  background: {
    paper: '#1F2430',
    default: '#171B24',
  },
};

export const mirageTheme = createTheme(
  {
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
                : `${paletteLight.background.default}99`,
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
  },
  overrideThemeConfig,
);
