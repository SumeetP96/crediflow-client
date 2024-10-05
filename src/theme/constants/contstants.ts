import { Theme } from '@emotion/react';
import { blueTheme } from '../config/blue';
import { earthTheme, paletteLight as solarizedPalette } from '../config/solarized';

export enum EThemeNames {
  MUI = 'mui',
  SOLARIZED = 'solarized',
}

export interface IThemeConfig {
  name: string;
  config: Theme;
  primaryColor: string;
}

export const themeConfigMap: Record<EThemeNames, IThemeConfig> = {
  [EThemeNames.MUI]: {
    name: 'Material',
    config: blueTheme,
    primaryColor: '#1976d2',
  },
  [EThemeNames.SOLARIZED]: {
    name: 'Solarized',
    config: earthTheme,
    primaryColor: solarizedPalette.primary.main,
  },
};

export const defaultThemeName = EThemeNames.MUI;

export interface IThemeConfigOption extends Partial<IThemeConfig> {
  value: EThemeNames;
  label: string;
}

export const themeConfigOptions: IThemeConfigOption[] = Object.entries(themeConfigMap).map(
  ([key, value]) => {
    const { name, ...rest } = value;
    return {
      value: key as EThemeNames,
      label: name,
      ...rest,
    };
  },
);
