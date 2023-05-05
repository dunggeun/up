import React from 'react';
import { Text } from 'src/designs';
import { ToastManager } from 'src/components/Toast/ToastManager';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { globalMachineService } from 'src/stores/machines/service';
import { queryClient } from 'src/stores/reactQuery';
import { StorageManager } from '../database';
import { Logger } from '../logger';

const TAG = 'AppManager';

export class AppManager {
  private static instance: AppManager | null = null;
  private status: 'pending' | 'fulfilled' | 'error' = 'pending';
  private task: Promise<void>;
  private error: Error | null = null;

  private constructor() {
    Logger.info(TAG, 'instance created and initializing...');
    globalMachineService.start();
    this.task = Promise.all([
      (async (): Promise<void> => {
        await StorageManager.getInstance().initialize();
        await this.prefetchUserData();
      })(),
      delay(APP_MINIMUM_LOADING_DURATION),
    ])
      .then(() => {
        this.status = 'fulfilled';
        Logger.success(TAG, 'successfully initialized');
      })
      .catch((error: Error) => {
        this.error = error;
        this.status = 'error';
        Logger.error(TAG, error.message);
      });
  }

  public static getInstance(): AppManager {
    if (AppManager.instance === null) {
      AppManager.instance = new AppManager();
    }
    return AppManager.instance;
  }

  public static showToast(message: string): void {
    Logger.debug(TAG, `showToast - ${message}`);
    ToastManager.getInstance().show(
      // eslint-disable-next-line import/no-named-as-default-member
      React.createElement(Text, { variant: 'primary' }, message),
    );
  }

  private async prefetchUserData(): Promise<void> {
    if (!(await this.authorize())) return;

    Logger.info(TAG, 'prefetching user data');
    await queryClient.prefetchQuery(['quests', 'list'], () =>
      StorageManager.getInstance().getQuestList(),
    );
  }

  private authorize(): Promise<boolean> {
    return new Promise((resolve) => {
      globalMachineService.onTransition((state) => {
        const isAuthorized = state.matches('authorized');
        const isUnauthorized = state.matches('unauthorized');
        if (isAuthorized || isUnauthorized) {
          resolve(isAuthorized);
        }
      });
      globalMachineService.send({ type: 'AUTO_LOGIN' });
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
}
