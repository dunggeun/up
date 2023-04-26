import { Platform } from 'react-native';
import { colors } from './colors';

export const webFont = (font: string): string => {
  return Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
    default: font,
  });
};

export const getColors = (): (keyof typeof colors)[] =>
  Object.keys(colors) as (keyof typeof colors)[];
