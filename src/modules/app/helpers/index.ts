import { diffBeforeToday } from 'src/utils';
import { Logger } from 'src/modules/logger';
import {
  BASE_EXP,
  BADGE_SET,
  FALLBACK_BADGE,
  THEMES,
  FALLBACK_THEME,
} from '../data';

import type { User } from 'src/features/users';
import type { Quest, Achieve } from 'src/features/quests';
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
    unlockedBadges: {},
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
};

export const createQuestData = (title: string, description = ''): Quest => {
  const currentTimestamp = Number(new Date());
  return {
    id: currentTimestamp,
    title,
    description,
    current_streak: 0,
    max_streak: 0,
    created_at: currentTimestamp,
    updated_at: 0,
    finished_at: 0,
  };
};

export const createAchieveData = ({
  questId,
  exp,
}: {
  questId: number;
  exp: number;
}): Achieve => {
  const currentTimestamp = Number(new Date());
  return {
    id: currentTimestamp,
    qid: questId,
    exp,
    created_at: currentTimestamp,
  };
};

export const updateQuestForAddAchieve = (quest: Quest): Quest => {
  const updatedQuest = { ...quest };
  const isStreak = Boolean(
    quest.updated_at && diffBeforeToday(quest.updated_at) <= 1,
  );

  if (isStreak || quest.updated_at === 0) {
    updatedQuest.current_streak++;
    updatedQuest.max_streak = Math.max(
      updatedQuest.max_streak,
      updatedQuest.current_streak,
    );
  } else {
    updatedQuest.current_streak = 1;
  }

  Logger.info(
    'updateQuestForAddAchieve',
    `${updatedQuest.title}'s streak: ${updatedQuest.current_streak}`,
  );

  updatedQuest.updated_at = Number(new Date());

  return updatedQuest;
};

export const getAchieveExpByStreak = (currentStreak: number): number => {
  return Math.min(7, currentStreak || 1);
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
