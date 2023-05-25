import { Badges } from 'src/assets';
import { t } from 'src/translations';
import type { Theme } from './types';
import type { User } from 'src/features/users';

// 임무 달성 시 보상으로 받는 기본 경험치 및 연속 달성 최대 경험치 제한
export const BASE_EXP = 1;
export const MAX_STREAK_EXP = 7;

// 레벨에 따른 경험치 계산에 사용하는 기본값
export const LEVEL_BASE_EXP = 3;

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
  [t('badge.1.label'), t('badge.1.description'), Badges.Badge01],
  [t('badge.2.label'), t('badge.2.description'), Badges.Badge02],
  [t('badge.3.label'), t('badge.3.description'), Badges.Badge03],
  [t('badge.4.label'), t('badge.4.description'), Badges.Badge04],
  [t('badge.5.label'), t('badge.5.description'), Badges.Badge05],
  [t('badge.6.label'), t('badge.6.description'), Badges.Badge06],
  [t('badge.7.label'), t('badge.7.description'), Badges.Badge07],
  [t('badge.8.label'), t('badge.8.description'), Badges.Badge08],
  [t('badge.9.label'), t('badge.9.description'), Badges.Badge09],
  [t('badge.10.label'), t('badge.10.description'), Badges.Badge10],
  [t('badge.11.label'), t('badge.11.description'), Badges.Badge11],
  [t('badge.12.label'), t('badge.12.description'), Badges.Badge12],
  [t('badge.13.label'), t('badge.13.description'), Badges.Badge13],
  [t('badge.14.label'), t('badge.14.description'), Badges.Badge14],
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
