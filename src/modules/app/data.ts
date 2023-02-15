import { t } from 'src/translations';
import dummy from 'src/assets/badges/dummy.png';

import type { Theme } from './types';

export const BASE_EXP = 3;

export const BADGE_SET = [
  [t('badge.0'), dummy],
  [t('badge.1'), dummy],
  [t('badge.2'), dummy],
  [t('badge.3'), dummy],
  [t('badge.4'), dummy],
  [t('badge.5'), dummy],
  [t('badge.6'), dummy],
  [t('badge.7'), dummy],
  [t('badge.8'), dummy],
  [t('badge.9'), dummy],
] as const;

export const FALLBACK_BADGE = ['', dummy] as const;

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
