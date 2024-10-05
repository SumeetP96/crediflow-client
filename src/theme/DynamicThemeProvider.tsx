import { Theme } from '@emotion/react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { ELocalStorageKeys } from '../helpers/constants';
import { defaultThemeName, EThemeNames, themeConfigMap } from './constants/contstants';

export interface IDynamicThemeContextState {
  theme: Theme;
  themeName: EThemeNames;
}

export interface IDynamicThemeContextActions {
  changeTheme: (name: EThemeNames) => void;
}

export interface IDynamicThemeContext {
  state: IDynamicThemeContextState;
  actions: IDynamicThemeContextActions;
}

export const DynamicthemeContext = createContext<IDynamicThemeContext | null>(null);

export interface IDynamicThemeProviderProps {
  children: ReactNode;
}

export default function DynamicThemeProvider({ children }: IDynamicThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(themeConfigMap[defaultThemeName]?.config);

  const [themeName, setThemeName] = useState<EThemeNames>(defaultThemeName);

  const changeTheme = (name: EThemeNames) => {
    setThemeName(name);

    setTheme(themeConfigMap[name].config);

    localStorage.setItem(ELocalStorageKeys.THEME, name);
  };

  useEffect(() => {
    let storedThemeName = localStorage.getItem(ELocalStorageKeys.THEME) as EThemeNames;

    if (!storedThemeName || !Object.values(EThemeNames).includes(storedThemeName)) {
      storedThemeName = defaultThemeName;
    }

    setThemeName(storedThemeName as EThemeNames);

    setTheme(themeConfigMap[storedThemeName].config);

    localStorage.setItem(ELocalStorageKeys.THEME, storedThemeName);
  }, []);

  const state = {
    theme,
    themeName,
  };

  const actions = {
    changeTheme,
  };

  return (
    <DynamicthemeContext.Provider value={{ state, actions }}>
      {children}
    </DynamicthemeContext.Provider>
  );
}
