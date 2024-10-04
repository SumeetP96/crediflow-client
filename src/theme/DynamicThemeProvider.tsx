import { Theme } from '@emotion/react';
import { createContext, ReactNode, useEffect, useState } from 'react';
import { blueTheme } from './config/blue';
import { greenTheme } from './config/green';
import { defaultThemeName, EThemeNames, themeStorageKey } from './contstants';

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

const themeConfigMap = {
  [EThemeNames.BLUE]: blueTheme,
  [EThemeNames.GREEN]: greenTheme,
};

export default function DynamicThemeProvider({ children }: IDynamicThemeProviderProps) {
  let storedThemeName = localStorage.getItem(themeStorageKey) as EThemeNames;

  if (storedThemeName && !Object.values(EThemeNames).includes(storedThemeName)) {
    storedThemeName = defaultThemeName;
  }

  const [theme, setTheme] = useState<Theme>(themeConfigMap[storedThemeName]);

  const [themeName, setThemeName] = useState<EThemeNames>(storedThemeName);

  const changeTheme = (name: EThemeNames) => {
    setThemeName(name);
    setTheme(themeConfigMap[name]);
  };

  useEffect(() => {
    const savedThemeName = localStorage.getItem('themeName');

    if (savedThemeName) {
      setThemeName(savedThemeName as EThemeNames);
      setTheme(themeConfigMap[savedThemeName as EThemeNames]);
    }
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
