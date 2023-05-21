import badge1 from 'src/assets/badges/badge-1.png';
import badge10 from 'src/assets/badges/badge-10.png';
import badge11 from 'src/assets/badges/badge-11.png';
import badge12 from 'src/assets/badges/badge-12.png';
import badge13 from 'src/assets/badges/badge-13.png';
import badge14 from 'src/assets/badges/badge-14.png';
import badge2 from 'src/assets/badges/badge-2.png';
import badge3 from 'src/assets/badges/badge-3.png';
import badge4 from 'src/assets/badges/badge-4.png';
import badge5 from 'src/assets/badges/badge-5.png';
import badge6 from 'src/assets/badges/badge-6.png';
import badge7 from 'src/assets/badges/badge-7.png';
import badge8 from 'src/assets/badges/badge-8.png';
import badge9 from 'src/assets/badges/badge-9.png';
import { t } from 'src/translations';
import type { Theme } from './types';
import type { User } from 'src/features/users';

export const BASE_EXP = 3;

export const BASE_USER: Omit<User, 'name' | 'createdAt' | 'updatedAt'> = {
  level: 1,
  currentExp: 0,
  totalExp: 0,
  badge: 0,
  theme: 0,
  unlockedBadges: {},
  settings: { enableHaptic: true },
  remindAt: null,
};

export const BADGE_SET = [
  ['', '', null],
  [t('badge.1.label'), t('badge.1.description'), badge1],
  [t('badge.2.label'), t('badge.2.description'), badge2],
  [t('badge.3.label'), t('badge.3.description'), badge3],
  [t('badge.4.label'), t('badge.4.description'), badge4],
  [t('badge.5.label'), t('badge.5.description'), badge5],
  [t('badge.6.label'), t('badge.6.description'), badge6],
  [t('badge.7.label'), t('badge.7.description'), badge7],
  [t('badge.8.label'), t('badge.8.description'), badge8],
  [t('badge.9.label'), t('badge.9.description'), badge9],
  [t('badge.10.label'), t('badge.10.description'), badge10],
  [t('badge.11.label'), t('badge.11.description'), badge11],
  [t('badge.12.label'), t('badge.12.description'), badge12],
  [t('badge.13.label'), t('badge.13.description'), badge13],
  [t('badge.14.label'), t('badge.14.description'), badge14],
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
