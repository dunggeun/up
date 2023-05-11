/* eslint-disable import/no-named-as-default-member */

import i18next, {
  type LanguageDetectorModule,
  type InitOptions,
} from 'i18next';
import { initReactI18next } from 'react-i18next';
import { noop, getCurrentLocale } from 'src/utils';
import en from './en.json';
import ko from './ko.json';

const languageDetector: LanguageDetectorModule = {
  type: 'languageDetector',
  detect: () => getCurrentLocale(),
  init: noop,
  cacheUserLanguage: noop,
} as const;

const options: InitOptions = {
  compatibilityJSON: 'v3',
  fallbackLng: 'en',
  resources: { ko, en },
  ns: ['common'],
  defaultNS: 'common',
  interpolation: {
    escapeValue: false,
  },
} as const;

i18next.use(languageDetector).use(initReactI18next).init(options).catch(noop);

export const i18n = i18next;
export const t = (key: string): string => i18next.t(key);
