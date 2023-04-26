import Color from 'color';

type ColorKey = keyof typeof baseColors | DisabledColorKey;
type DisabledColorKey = `${keyof typeof baseColors}_disabled`;
type Colors = Record<ColorKey, string>;

export const basicColors = {
  // Basic colors
  $red: '#f44336',
  $strawberry: '#f8bbd0',
  $orange: '#ff9800',
  $yellow: '#ffeb3b',
  $green: '#4caf50',
  $mint: '#80cbc4',
  $blue: '#2196f3',
  $sky: '#81d4fa',
  $purple: '#ab47bc',
  $dark: '#424242',
} as const;

const baseColors = {
  $brand: '#2196f3',
  // Level colors
  $success: '#4caf50',
  $warning: '#ffeb3b',
  $danger: '#f44336',
  $white: '#ffffff',
  $black: '#000000',
  // Basic colors
  ...basicColors,
  // Text & Background colors
  $secondary_1: '#cccccc80',
  $secondary_2: '#cccccc40',
  $text_primary: '#2e2e2e',
  $text_secondary: '#777777',
  $text_tertiary: '#cccccc',
  $border: '#2e2e2e',
} as const;

export const colors = {
  ...Object.entries(baseColors).reduce(
    (palette, [key, hex]) => ({
      ...palette,
      [key]: hex,
      [`${key}_disabled`]: Color(hex).lighten(0.5).hex(),
    }),
    {} as Colors,
  ),
  $text_primary_disabled: '#9a9a9a',
  $border_disabled: '#9a9a9a',
};
