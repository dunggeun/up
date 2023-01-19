import * as RNLocalize from 'react-native-localize';

const locales = RNLocalize.getLocales();

export function getCurrentLocale (): string {
  return locales[0]?.languageCode ?? 'en';
};
