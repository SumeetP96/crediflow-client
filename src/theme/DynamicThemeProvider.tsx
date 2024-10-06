import { Theme } from '@emotion/react';
import { createTheme } from '@mui/material';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { ELocalStorageKeys } from '../helpers/constants';
import { defaultFontName, defaultThemeName } from './helpers/defaults';
import { fontTypographyMap } from './helpers/font';
import { themeConfigMap } from './helpers/theme';
import { EFontNames, EThemeNames } from './helpers/types';

export interface IDynamicThemeContextState {
  theme: Theme;
  themeName: EThemeNames;
  fontName: EFontNames;
}

export interface IDynamicThemeContextActions {
  changeTheme: (name: EThemeNames) => void;
  changeFont: (name: EFontNames) => void;
  resetToDefaultTheme: () => void;
}

export type TDynamicThemeContext = IDynamicThemeContextState & IDynamicThemeContextActions;

export const DynamicthemeContext = createContext<TDynamicThemeContext | null>(null);

export interface IDynamicThemeProviderProps {
  children: ReactNode;
}

export default function DynamicThemeProvider({ children }: IDynamicThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(themeConfigMap[defaultThemeName]?.config);

  const [themeName, setThemeName] = useState<EThemeNames>(defaultThemeName);

  const [fontName, setFontName] = useState<EFontNames>(defaultFontName);

  const updateTheme = (config: Theme, override?: Theme) => {
    const themeConfig = createTheme(config, override || {});

    setTheme(themeConfig);
  };

  const changeTheme = (name: EThemeNames) => {
    setThemeName(name);

    localStorage.setItem(ELocalStorageKeys.THEME, name);

    updateTheme(themeConfigMap[name].config);
  };

  const changeFont = (name: EFontNames) => {
    setFontName(name);

    localStorage.setItem(ELocalStorageKeys.FONT, name);

    updateTheme(theme, { typography: fontTypographyMap[name] });
  };

  const resetToDefaultTheme = () => {
    setThemeName(defaultThemeName);
    localStorage.setItem(ELocalStorageKeys.THEME, defaultThemeName);

    setFontName(defaultFontName);
    localStorage.setItem(ELocalStorageKeys.FONT, defaultFontName);

    updateTheme(themeConfigMap[defaultThemeName].config);
  };

  useEffect(() => {
    let storedThemeName = localStorage.getItem(ELocalStorageKeys.THEME) as EThemeNames;

    if (!storedThemeName || !Object.values(EThemeNames).includes(storedThemeName)) {
      storedThemeName = defaultThemeName;
    }

    setThemeName(storedThemeName);

    localStorage.setItem(ELocalStorageKeys.THEME, storedThemeName);

    let storedFontName = localStorage.getItem(ELocalStorageKeys.FONT) as EFontNames;

    if (!storedFontName || !Object.values(EFontNames).includes(storedFontName)) {
      storedFontName = defaultFontName;
    }

    setFontName(storedFontName);

    localStorage.setItem(ELocalStorageKeys.FONT, storedFontName);

    updateTheme(themeConfigMap[storedThemeName].config, {
      typography: fontTypographyMap[storedFontName],
    });
  }, []);

  const state: IDynamicThemeContextState = {
    theme,
    themeName,
    fontName,
  };

  const actions: IDynamicThemeContextActions = {
    changeTheme,
    changeFont,
    resetToDefaultTheme,
  };

  return (
    <DynamicthemeContext.Provider value={{ ...state, ...actions }}>
      {children}
    </DynamicthemeContext.Provider>
  );
}
