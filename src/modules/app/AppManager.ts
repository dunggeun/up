import { interpret, type InterpreterFrom } from 'xstate';
import { globalMachine } from 'src/stores';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { BADGE_SET, FALLBACK_BADGE } from './badges';

import type { User } from 'src/types';
import type { Badge } from './types';

export class AppManager {
  private static instance: AppManager | null = null;
  private service = interpret(globalMachine);
  private status: 'pending' | 'fulfilled' | 'error' = 'pending';
  private task: Promise<void>;
  private error: Error | null = null;

  private constructor() {
    this.service.start();
    this.task = Promise.all([
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

  public static getBaseUser(): Omit<User, 'name'> {
    const currentTimestamp = Number(new Date());
    return {
      exp: 0,
      badge: 0,
      theme: 0,
      createdAt: currentTimestamp,
      updatedAt: currentTimestamp,
    };
  }

  public static getTotalBadgeCount(): number {
    return BADGE_SET.length;
  }

  public static getBadge(id: number): Badge {
    const badge = BADGE_SET[id];
    const [title, image] = badge ?? FALLBACK_BADGE;
    return { title, image };
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
}
