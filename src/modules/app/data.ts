import { t } from 'src/translations';
import dummy from 'src/assets/badges/dummy.png';

import type { Theme } from './types';

export const BASE_EXP = 3;

export const BADGE_SET = [
  ['', '', null],
  [t('badge.1.label'), t('badge.1.description'), dummy],
  [t('badge.2.label'), t('badge.2.description'), dummy],
  [t('badge.3.label'), t('badge.3.description'), dummy],
  [t('badge.4.label'), t('badge.4.description'), dummy],
  [t('badge.5.label'), t('badge.5.description'), dummy],
  [t('badge.6.label'), t('badge.6.description'), dummy],
  [t('badge.7.label'), t('badge.7.description'), dummy],
  [t('badge.8.label'), t('badge.8.description'), dummy],
  [t('badge.9.label'), t('badge.9.description'), dummy],
  [t('badge.10.label'), t('badge.10.description'), dummy],
  [t('badge.11.label'), t('badge.11.description'), dummy],
  [t('badge.12.label'), t('badge.12.description'), dummy],
  [t('badge.13.label'), t('badge.13.description'), dummy],
  [t('badge.14.label'), t('badge.14.description'), dummy],
] as const;

export const FALLBACK_BADGE = BADGE_SET[0];

export const THEMES: Theme[] = [
  { id: 0, key: '$blue' },
  { id: 1, key: '$red' },
  { id: 2, key: '$yellow' },
  { id: 3, key: '$green' },
  { id: 4, key: '$mint' },
  { id: 5, key: '$sky' },
  { id: 6, key: '$purple' },
  { id: 7, key: '$strawberry' },
  { id: 8, key: '$orange' },
  { id: 9, key: '$dark' },
];

// eslint-disable-next-line @typescript-eslint/no-non-null-assertion
export const FALLBACK_THEME = THEMES[0]!;
