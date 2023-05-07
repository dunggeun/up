import React from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import { Text } from 'src/designs';
import { ToastManager } from 'src/components/Toast/ToastManager';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION, BACKUP_FILE_NAME } from 'src/constants';
import { globalMachineService } from 'src/stores/machines/service';
import { queryClient } from 'src/stores/reactQuery';
import { readFile, writeFile } from 'src/utils/fs';
import { t } from 'src/translations';
import { StorageManager } from '../database';
import { Logger } from '../logger';

import type { User } from 'src/features/users';
import type { DumpData } from '../database/types';

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

  async export(key: string): Promise<void> {
    Logger.debug(TAG, 'export');
    return Promise.all([
      AsyncStorage.getItem('user'),
      StorageManager.getInstance().dump(),
    ]).then(([user, database]) => {
      const encryptedData = CryptoJS.AES.encrypt(
        JSON.stringify({ user, database }),
        key,
      ).toString();
      return writeFile(encryptedData, BACKUP_FILE_NAME);
    });
  }

  async import(filepath: string, key: string): Promise<void> {
    Logger.debug(TAG, `import (filepath: ${filepath})`);

    let data: {
      user: User;
      database: DumpData;
    };
    const encryptedData = await readFile(filepath);

    try {
      data = JSON.parse(
        CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8),
      );
    } catch (error) {
      Logger.error(TAG, 'decrypt error', (error as Error).message);
      AppManager.showToast(t('message.error.decrypt_failed'));
      return;
    }

    if (!(typeof data.user === 'string' && typeof data.database === 'object')) {
      throw new Error('invalid backup data');
    }

    const storage = StorageManager.getInstance();

    Logger.info(TAG, 'wipe all data');
    queryClient.clear();
    await storage.clear();
    Logger.info(TAG, 'load records from backup data');
    await storage.load(data.database);
    Logger.info(TAG, 'override user from backup data');
    await AsyncStorage.setItem('user', data.user);

    Logger.success(TAG, 'successfully restored');
    globalMachineService.send({ type: 'REFRESH' });
  }
}
