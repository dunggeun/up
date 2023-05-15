import { Logger } from 'src/modules/logger';
import { diffBeforeToday } from 'src/utils';
import {
  BASE_EXP,
  BADGE_SET,
  FALLBACK_BADGE,
  THEMES,
  FALLBACK_THEME,
} from '../data';
import type { Badge, Theme } from '../types';
import type { Mission, Achieve } from 'src/features/missions';
import type { User } from 'src/features/users';

export const getId = (): number => {
  const currentTimestamp = Number(new Date());
  return Math.floor(currentTimestamp * 1000 + Math.random() * 10000);
};

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
    settings: { enableHaptic: true },
    createdAt: currentTimestamp,
    updatedAt: currentTimestamp,
  };
};

export const createMissionData = (title: string, description = ''): Mission => {
  const currentTimestamp = Number(new Date());
  return {
    id: getId(),
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
  missionId,
  exp,
}: {
  missionId: number;
  exp: number;
}): Achieve => {
  const currentTimestamp = Number(new Date());
  return {
    id: getId(),
    mid: missionId,
    exp,
    created_at: currentTimestamp,
  };
};

export const updateMissionForAddAchieve = (mission: Mission): Mission => {
  const updatedMission = { ...mission };
  const isStreak = Boolean(
    mission.updated_at && diffBeforeToday(mission.updated_at) <= 1,
  );

  if (isStreak || mission.updated_at === 0) {
    updatedMission.current_streak++;
    updatedMission.max_streak = Math.max(
      updatedMission.max_streak,
      updatedMission.current_streak,
    );
  } else {
    updatedMission.current_streak = 1;
  }

  Logger.info(
    'updateMissionForAddAchieve',
    `${updatedMission.title}'s streak: ${updatedMission.current_streak}`,
  );

  updatedMission.updated_at = Number(new Date());

  return updatedMission;
};

export const getAchieveExpByStreak = (currentStreak: number): number => {
  return Math.min(7, currentStreak || 1);
};

export const getExpByLevel = (level: number): number => {
  return Math.floor(level * BASE_EXP * Math.log10(level)) + BASE_EXP;
};

export const getBadge = (id: number): Badge => {
  const badge = BADGE_SET[id];
  const [title, description, image] = badge ?? FALLBACK_BADGE;
  return { id, title, description, image };
};

export const getBadges = (): typeof BADGE_SET => {
  return BADGE_SET;
};

export const getTheme = (id: number): Theme => {
  return THEMES[id] ?? FALLBACK_THEME;
};

export const getThemes = (): typeof THEMES => THEMES;
