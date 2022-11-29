
import { Platform } from 'react-native';
import { makeTheme } from 'dripsy';
import { colors } from './colors';
import { webFont } from './utils';

type Theme = typeof themeLight;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends Theme {}
}

const ROOT_FONT_SIZE = 16;
const FONT_NAME = Platform.select({
  web: 'Jua',
  default: 'BMJUA',
});

const themeLight = makeTheme({
  colors,
  customFonts: {
    [FONT_NAME]: {
      bold: webFont(FONT_NAME),
      default: webFont(FONT_NAME),
      normal: webFont(FONT_NAME),
    },
  },
  fonts: {
    root: FONT_NAME,
    heading: FONT_NAME,
  },
  fontSizes: {
    $default: ROOT_FONT_SIZE,
    $h1: ROOT_FONT_SIZE * 1.5,
    $h2: ROOT_FONT_SIZE * 1.25,
    $h3: ROOT_FONT_SIZE,
    $text: ROOT_FONT_SIZE,
  },
  text: {
    // Default text style
    body: {
      fontSize: ROOT_FONT_SIZE,
    },
    h1: {
      fontSize: '$h1',
      mt: '$00',
      mb: '$00',
    },
    h2: {
      fontSize: '$h2',
      mt: '$00',
      mb: '$00',
    },
    h3: {
      fontSize: '$h3',
      mt: '$00',
      mb: '$00',
    },
    p: {
      fontSize: '$text',
      mt: '$00',
      mb: '$00',
    },
    primary: {
      color: '$text_primary',
    },
    secondary: {
      color: '$text_secondary',
    },
    tertiary: {
      color: '$text_tertiary',
    },
    black: {
      color: '$black',
    },
    white: {
      color: '$white',
    },
  },
  space: {
    $00: 0,
    $01: ROOT_FONT_SIZE * 0.25,
    $02: ROOT_FONT_SIZE * 0.5,
    $03: ROOT_FONT_SIZE * 0.75,
    $04: ROOT_FONT_SIZE,
    $05: ROOT_FONT_SIZE * 1.25,
    $06: ROOT_FONT_SIZE * 1.5,
    $07: ROOT_FONT_SIZE * 2,
  },
  radii: {
    $input: 32,
    $md: 8,
    $full: 9999,
  },
  sizes: {
    container: 600,
  },
  layout: {
    // Base container style
    container: {
      flex: 1,
      px: '$04',
      backgroundColor: '$white',
    },
    // Container variants
    wide: {
      maxWidth: 1100,
    },
    center: {
      alignItems: 'center',
      justifyContent: 'center',
    },
  },
  types: {
    strictVariants: true,
    reactNativeTypesOnly: true,
  },
});

// @TODO: Add dark theme
const themeDark: Theme = {
  ...themeLight,
};

export { themeLight, themeDark };