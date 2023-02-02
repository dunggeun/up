export const basicColors = {
  // Basic colors
  $white: '#ffffff',
  $black: '#000000',
  $red: '#f44336',
  $hot_pink: '#ec407a',
  $strawberry: '#f8bbd0',
  $orange: '#ff9800',
  $yellow: '#ffeb3b',
  $lemon: '#fff59d',
  $green: '#4caf50',
  $mint: '#80cbc4',
  $blue: '#2196f3',
  $sky: '#81d4fa',
  $purple: '#ab47bc',
  $dark: '#424242',
} as const;

export const colors = {
  $brand: '#2196f3',
  // Level colors
  $success: '#4caf50',
  $warning: '#ffeb3b',
  $danger: '#f44336',
  // Basic colors
  ...basicColors,
  // Text & Background colors
  $secondary_1: '#cccccc80',
  $secondary_2: '#cccccc40',
  $text_primary: '#2e2e2e',
  $text_secondary: '#777777',
  $text_tertiary: '#cccccc',
} as const;

export const LIGHT_COLORS: (keyof typeof colors)[] = [
  '$warning',
  '$white',
  '$strawberry',
  '$yellow',
  '$lemon',
  '$mint',
  '$sky',
  '$secondary_1',
  '$secondary_2',
  '$text_tertiary',
];

export const DARK_COLORS = (Object.keys(colors) as (keyof typeof colors)[])
  .filter((color) => !LIGHT_COLORS.includes(color));
