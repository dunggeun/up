import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpret, type InterpreterFrom } from 'xstate';
import { globalMachine } from 'src/stores';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION, BASE_EXP } from 'src/constants';
import { DatabaseModule } from '../database';
import { BADGE_SET, FALLBACK_BADGE } from './badges';

import type { User } from 'src/types';
import type { Badge, Theme } from './types';

export class AppManager {
  private static instance: AppManager | null = null;
  private service = interpret(globalMachine);
  private database = new DatabaseModule();
  private status: 'pending' | 'fulfilled' | 'error' = 'pending';
  private task: Promise<void>;
  private error: Error | null = null;

  private constructor() {
    this.service.start();
    this.task = Promise.all([
      this.database.initialize(),
      (async (): Promise<void> => {
        if (await this.authorize()) {
          // @todo: 사용자 데이터 로드
        }
      })(),
      delay(APP_MINIMUM_LOADING_DURATION),
    ]).then(() => {
      this.status = 'fulfilled';
    }).catch((error) => {
      this.error = error as Error;
      this.status = 'error';
    });
  }

  public static getInstance(): AppManager {
    if (AppManager.instance === null) {
      AppManager.instance = new AppManager();
    }
    return AppManager.instance;
  }

  public static getExpByLevel(level: number): number {
    return Math.floor(level * BASE_EXP * Math.log10(level)) + BASE_EXP;
  }

  public static getBaseUser(): Omit<User, 'name'> {
    const currentTimestamp = Number(new Date());
    return {
      level: 1,
      currentExp: 0,
      totalExp: 0,
      badge: 0,
      theme: 0,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
  }

  public static getBadges(): typeof BADGE_SET {
    return BADGE_SET;
  }

  public static getBadge(id: number): Badge {
    const badge = BADGE_SET[id];
    const [title, image] = badge ?? FALLBACK_BADGE;
    return { id, title, image };
  }

  public static getThemeKeys(): Theme[] {
    return [
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
  }

  private authorize(): Promise<boolean> {
    return new Promise((resolve) => {
      this.service.onTransition((state) => {
        const isAuthorized = state.matches('authorized');
        const isUnauthorized = state.matches('unauthorized');
        if (isAuthorized || isUnauthorized) {
          resolve(isAuthorized);
        }
      });
      this.service.send({ type: 'AUTO_LOGIN' });
    });
  }

  initialize(): void {
    switch (this.status) {
      case 'fulfilled':
        return;

      case 'pending':
        // eslint-disable-next-line @typescript-eslint/no-throw-literal
        throw this.task;

      case 'error':
        throw this.error ?? new Error();
    }
  }

  getService(): InterpreterFrom<typeof globalMachine> {
    return this.service;
  }

  async resetUserData(): Promise<void> {
    await Promise.all([
      this.database.clear('quest'),
      this.database.clear('achieve'),
    ]);
    await AsyncStorage.clear();
  }
}
