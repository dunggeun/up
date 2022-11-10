import { makeTheme } from 'dripsy';
import { colors } from './colors';

type Theme = typeof themeLight;

declare module 'dripsy' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface DripsyCustomTheme extends Theme {}
}

const ROOT_FONT_SIZE = 16;

const themeLight = makeTheme({
  colors,
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
  fontSizes: {
    $default: ROOT_FONT_SIZE,
    $h1: ROOT_FONT_SIZE * 1.5,
    $h2: ROOT_FONT_SIZE * 1.25,
    $h3: ROOT_FONT_SIZE,
    $text: ROOT_FONT_SIZE,
  },
  radii: {
    $sm: 6,
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
  text: {
    // Default text style
    body: {
      fontSize: ROOT_FONT_SIZE,
    },
    h1: {
      fontSize: '$h1',
    },
    h2: {
      fontSize: '$h2',
    },
    h3: {
      fontSize: '$h3',
    },
    p: {
      fontSize: '$text',
      mt: '$0',
      mb: '$0',
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