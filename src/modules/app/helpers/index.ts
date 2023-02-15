import {
  BASE_EXP,
  BADGE_SET,
  FALLBACK_BADGE,
  THEMES,
  FALLBACK_THEME
} from '../data';

import type { User } from 'src/types';
import type { Badge, Theme } from '../types';

export const createUserData = (name: string): User => {
  const currentTimestamp = Number(new Date());
  return {
    name,
    level: 1,
    currentExp: 0,
    totalExp: 0,
    badge: 0,
    theme: 0,
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
};

export const getExpByLevel = (level: number): number => {
  return Math.floor(level * BASE_EXP * Math.log10(level)) + BASE_EXP;
};

export const getBadge = (id: number): Badge => {
  const badge = BADGE_SET[id];
  const [title, image] = badge ?? FALLBACK_BADGE;
  return { id, title, image };
};


export const getBadges = (): typeof BADGE_SET => {
  return BADGE_SET;
};

export const getTheme = (id: number): Theme => {
  return THEMES[id] ?? FALLBACK_THEME;
};

export const getThemes = (): typeof THEMES => THEMES;
