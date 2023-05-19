import AsyncStorage from '@react-native-async-storage/async-storage';
import CryptoJS from 'crypto-js';
import dayjs from 'dayjs';
import { ToastController } from 'src/components/Toast/ToastController';
import { globalMachineService } from 'src/stores/machines/service';
import { queryClient } from 'src/stores/reactQuery';
import { delay } from 'src/utils/async';
import { readFile, writeFile } from 'src/utils/fs';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { t } from 'src/translations';
import { StorageManager } from '../database';
import { Logger } from '../logger';
import { checkNotificationPermission } from '../notifications';
import { BadgeController } from './BadgeController';
import type { DumpData } from '../database/types';
import type { User } from 'src/features/users';

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
        checkNotificationPermission();
        new BadgeController().initialize();
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

  private async prefetchUserData(): Promise<void> {
    if (!(await this.authorize())) return;

    Logger.info(TAG, 'prefetching user data');
    const storageManager = StorageManager.getInstance();
    await Promise.all([
      queryClient.prefetchQuery(
        ['missions', 'list'],
        storageManager.getMissionList.bind(storageManager),
      ),
      queryClient.prefetchQuery(
        ['achieve', 'count'],
        storageManager.getAchieveCount.bind(storageManager),
      ),
    ]);
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
      return writeFile(encryptedData, `up_${dayjs().format('YYYYMMDD')}.bak`);
    });
  }

  async import(file: string | File, key: string): Promise<boolean> {
    Logger.debug(TAG, `import (file: ${file.toString()})`);

    let data: {
      user: User;
      database: DumpData;
    };
    const encryptedData = await readFile(file);

    try {
      data = JSON.parse(
        CryptoJS.AES.decrypt(encryptedData, key).toString(CryptoJS.enc.Utf8),
      );
    } catch (error) {
      Logger.error(TAG, 'decrypt error', (error as Error).message);
      ToastController.show(t('message.error.decrypt_failed'));
      return false;
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

    return true;
  }
}
