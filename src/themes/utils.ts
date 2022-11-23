import { Platform } from 'react-native';

export const webFont = (font: string): string => {
  return Platform.select({
    web: `${font}, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, Inter-serif`,
    default: font,
  });
};
