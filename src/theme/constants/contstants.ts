import { Theme } from '@emotion/react';
import {
  paletteDark as catppuccinDark,
  paletteLight as catppuccinLight,
  catppuccinTheme,
} from '../config/catppuccin';
import { materialDark, materialLight, materialTheme } from '../config/material';
import {
  paletteDark as mirageDark,
  paletteLight as mirageLight,
  mirageTheme,
} from '../config/mirage';
import {
  paletteDark as solarizedDark,
  paletteLight as solarizedLight,
  solarizedTheme,
} from '../config/solarized';

export enum EThemeNames {
  MATERIAL = 'material',
  SOLARIZED = 'solarized',
  CATPPUCCIN = 'catppuccin',
  MIRAGE = 'mirage',
}

export interface IThemeConfig {
  name: string;
  config: Theme;
  primaryLight: string;
  primaryDark: string;
}

export const themeConfigMap: Record<EThemeNames, IThemeConfig> = {
  [EThemeNames.MATERIAL]: {
    name: 'Material',
    config: materialTheme,
    primaryLight: materialLight,
    primaryDark: materialDark,
  },
  [EThemeNames.SOLARIZED]: {
    name: 'Solarized',
    config: solarizedTheme,
    primaryLight: solarizedLight.primary.main,
    primaryDark: solarizedDark.primary.main,
  },
  [EThemeNames.CATPPUCCIN]: {
    name: 'Catppuccin',
    config: catppuccinTheme,
    primaryLight: catppuccinLight.primary.main,
    primaryDark: catppuccinDark.primary.main,
  },
  [EThemeNames.MIRAGE]: {
    name: 'Mirage',
    config: mirageTheme,
    primaryLight: mirageLight.primary.main,
    primaryDark: mirageDark.primary.main,
  },
};

export const defaultThemeName = EThemeNames.MATERIAL;

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
