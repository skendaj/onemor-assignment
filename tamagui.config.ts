import { createTamagui, createTokens, createFont, createMedia } from 'tamagui';
import { tokens, themes } from '@tamagui/themes';
import { shorthands } from '@tamagui/shorthands';

const colors = {
  primary: '#D9D9D9',
  secondary: '#19181D',

  accent100: '#FEF5E1',
  accent200: '#FCE7B4',
  accent300: '#F8D27D',
  accent350: '#FDB022',
  accent400: '#E4A70A',
  accent500: '#C68F08',
  accent600: '#A87707',

  danger100: '#FEE4E2',
  danger200: '#FECDCA',
  danger300: '#FDA29B',
  danger400: '#F04438',
  danger500: '#D92D20',
  danger600: '#B42318',

  black100: '#333333',
  black200: '#222222',
  black300: '#1A1A1A',
  black400: '#121212',
  black500: '#0A0A0A',
  black600: '#000000',

  white100: '#FFFFFF',
  white150: '#F9FAFB',
  white200: '#FAFAFA',
  white300: '#F5F5F5',
  white400: '#F0F0F0',
  white500: '#EBEBEB',
  white600: '#EDEDED',
};

const customTokens = createTokens({
  ...tokens,
  color: {
    ...tokens.color,
    ...colors,
  },
  space: {
    ...tokens.space,
    custom: 10,
  },
  size: {
    ...tokens.size,
    custom: 10,
  },
  radius: {
    ...tokens.radius,
    custom: 10,
  },
  zIndex: {
    ...tokens.zIndex,
    custom: 100,
  },
});

const customThemes = {
  light: {
    ...themes.light,
    background: colors.white100,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent400,
    danger: colors.danger400,
  },
  dark: {
    ...themes.dark,
    background: colors.black600,
    primary: colors.primary,
    secondary: colors.secondary,
    accent: colors.accent300,
    danger: colors.danger300,
  },
};

const headingFont = createFont({
  family: 'Inter',
  size: {
    6: 14,
    7: 16,
    8: 18,
    9: 20,
    10: 24,
  },
  lineHeight: {
    6: 18,
    7: 22,
    8: 24,
    9: 28,
    10: 32,
  },
  weight: {
    3: '300',
    4: '400',
    5: '500',
    6: '600',
    7: '700',
    8: '800',
  },
  letterSpacing: {
    6: 0,
    7: 0,
    8: 0,
    9: 0,
    10: 0,
  },
});

const bodyFont = createFont({
  family: 'Inter',
  size: {},
});

export const tamaguiConfig = createTamagui({
  defaultTheme: 'light',
  shouldAddPrefersColorThemes: true,
  themeClassNameOnRoot: true,
  themes: customThemes,
  tokens: customTokens,
  fonts: {
    heading: headingFont,
    body: bodyFont,
  },
  shorthands,
  media: createMedia({
    xs: { maxWidth: 660 },
    sm: { maxWidth: 800 },
    md: { maxWidth: 1020 },
    lg: { maxWidth: 1280 },
    xl: { maxWidth: 1420 },
    xxl: { maxWidth: 1600 },
    gtXs: { minWidth: 660 + 1 },
    gtSm: { minWidth: 800 + 1 },
    gtMd: { minWidth: 1020 + 1 },
    gtLg: { minWidth: 1280 + 1 },
    short: { maxHeight: 820 },
    tall: { minHeight: 820 },
    hoverNone: { hover: 'none' },
    pointerCoarse: { pointer: 'coarse' },
  }),
});

type AppConfig = typeof tamaguiConfig;
declare module 'tamagui' {
  interface TamaguiCustomConfig extends AppConfig {}
}

export default tamaguiConfig;
