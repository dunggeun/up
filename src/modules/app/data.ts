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
  { id: 7, key: '$hot_pink' },
  { id: 8, key: '$strawberry' },
  { id: 9, key: '$orange' },
  { id: 10, key: '$lemon' },
  { id: 11, key: '$white' },
  { id: 12, key: '$dark' },
  { id: 13, key: '$black' },
];
