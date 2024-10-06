import { Theme } from '@emotion/react';

export enum EFontNames {
  ROBOTO = 'Roboto',
  INTER = 'Inter',
  DM_SANS = 'DM Sans',
  NUNITO = 'Nunito',
  DANCING_SCRIPT = 'Dancing Script',
}

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

export interface IThemeConfigOption extends Partial<IThemeConfig> {
  value: EThemeNames;
  label: string;
}

export interface IFontOption {
  value: EFontNames;
  label: string;
}

export interface IFontWeight {
  light: number;
  regular: number;
  medium: number;
  bold: number;
}
