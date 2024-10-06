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
import { EThemeNames, IThemeConfig, IThemeConfigOption } from './types';

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
