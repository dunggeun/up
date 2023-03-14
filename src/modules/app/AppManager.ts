import { QueryClient } from 'react-query';
import { interpret, type InterpreterFrom } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ToastManager } from 'src/components/Toast/ToastManager';
import { globalMachine } from 'src/stores';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { StorageManager } from '../database';

export class AppManager {
  private static instance: AppManager | null = null;
  private queryClient = new QueryClient();
  private storageManager = StorageManager.getInstance();
  private service = interpret(globalMachine);
  private status: 'pending' | 'fulfilled' | 'error' = 'pending';
  private task: Promise<void>;
  private error: Error | null = null;

  private constructor() {
    this.service.start();
    this.task = Promise.all([
      (async (): Promise<void> => {
        await this.storageManager.initialize();
        await this.prefetchUserData();
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

  public static showToast(element: React.ReactNode): void {
    ToastManager.getInstance().show(element);
  }

  private async prefetchUserData(): Promise<void> {
    if (!(await this.authorize())) return;

    await this.queryClient.prefetchQuery(
      ['quests', 'list'],
      () => this.storageManager.getQuestList(),
    );
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

  getQueryClient(): QueryClient {
    return this.queryClient;
  }

  async reset(): Promise<void> {
    this.queryClient.clear();
    await this.storageManager.clear();
    await AsyncStorage.clear();
  }
}
