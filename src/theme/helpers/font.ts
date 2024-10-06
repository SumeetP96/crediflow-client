import { TypographyOptions, Variant } from '@mui/material/styles/createTypography';
import { produce } from 'immer';
import { fallBackFonts } from './defaults';
import { EFontNames, IFontOption, IFontWeight } from './types';

export const fontOptions: IFontOption[] = [
  { value: EFontNames.ROBOTO, label: 'Roboto' },
  { value: EFontNames.INTER, label: 'Inter' },
  { value: EFontNames.DM_SANS, label: 'DM Sans' },
  { value: EFontNames.NUNITO, label: 'Nunito' },
];

export const fontFamily = (name: EFontNames) => {
  return `${name}, ${fallBackFonts}`;
};

export const defaultFontWeight = {
  light: 300,
  regular: 400,
  medium: 500,
  bold: 700,
};

const baseTypography = (family: string, weight: IFontWeight): TypographyOptions => {
  const { light, regular, medium, bold } = weight;

  return {
    htmlFontSize: 16,
    fontFamily: family,
    fontSize: 14,
    fontWeightLight: light,
    fontWeightRegular: regular,
    fontWeightMedium: medium,
    fontWeightBold: bold,
    h1: {
      fontFamily: family,
      fontWeight: light,
      fontSize: '6rem',
      lineHeight: 1.167,
      letterSpacing: '-0.01562em',
    },
    h2: {
      fontFamily: family,
      fontWeight: light,
      fontSize: '3.75rem',
      lineHeight: 1.2,
      letterSpacing: '-0.00833em',
    },
    h3: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '3rem',
      lineHeight: 1.167,
      letterSpacing: '0em',
    },
    h4: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '2.125rem',
      lineHeight: 1.235,
      letterSpacing: '0.00735em',
    },
    h5: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '1.5rem',
      lineHeight: 1.334,
      letterSpacing: '0em',
    },
    h6: {
      fontFamily: family,
      fontWeight: medium,
      fontSize: '1.25rem',
      lineHeight: 1.6,
      letterSpacing: '0.0075em',
    },
    subtitle1: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '1rem',
      lineHeight: 1.75,
      letterSpacing: '0.00938em',
    },
    subtitle2: {
      fontFamily: family,
      fontWeight: bold,
      fontSize: '0.875rem',
      lineHeight: 1.57,
      letterSpacing: '0.00714em',
    },
    body1: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '1rem',
      lineHeight: 1.5,
      letterSpacing: '0.00938em',
    },
    body2: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '0.875rem',
      lineHeight: 1.43,
      letterSpacing: '0.01071em',
    },
    button: {
      fontFamily: family,
      fontWeight: medium,
      fontSize: '0.875rem',
      lineHeight: 1.75,
      letterSpacing: '0.02857em',
      textTransform: 'uppercase',
    },
    caption: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '0.75rem',
      lineHeight: 1.66,
      letterSpacing: '0.03333em',
    },
    overline: {
      fontFamily: family,
      fontWeight: regular,
      fontSize: '0.75rem',
      lineHeight: 2.66,
      letterSpacing: '0.08333em',
      textTransform: 'uppercase',
    },
  };
};

export const generateTypography = (
  name: EFontNames,
  weight: IFontWeight,
  options?: Partial<TypographyOptions>,
): TypographyOptions => {
  const family = fontFamily(name);

  return produce(baseTypography(family, weight), (draft) => {
    if (!options) return;

    // Update top-level properties
    Object.keys(options).forEach((key) => {
      if (key in draft && typeof options[key as Variant] === 'object') {
        // Merge nested objects (like h1, h2, etc.)
        draft[key as Variant] = {
          ...draft[key as Variant],
          ...options[key as Variant],
        };
      } else {
        // Update primitive values
        draft[key as Variant] = options[key as Variant];
      }
    });
  });
};

export const fontTypographyMap: Record<EFontNames, TypographyOptions> = {
  [EFontNames.ROBOTO]: generateTypography(EFontNames.ROBOTO, defaultFontWeight),
  [EFontNames.INTER]: generateTypography(
    EFontNames.INTER,
    { light: 300, regular: 400, medium: 600, bold: 700 },
    {
      subtitle2: { fontWeight: 600 },
    },
  ),
  [EFontNames.DM_SANS]: generateTypography(
    EFontNames.DM_SANS,
    { light: 300, regular: 400, medium: 600, bold: 700 },
    {
      subtitle2: { fontWeight: 600 },
    },
  ),
  [EFontNames.NUNITO]: generateTypography(
    EFontNames.NUNITO,
    { light: 400, regular: 500, medium: 600, bold: 800 },
    {
      subtitle2: { fontWeight: 700 },
      button: { fontWeight: 600 },
    },
  ),
  [EFontNames.DANCING_SCRIPT]: generateTypography(EFontNames.DANCING_SCRIPT, defaultFontWeight),
};
