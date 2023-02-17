import AsyncStorage from '@react-native-async-storage/async-storage';
import { interpret, type InterpreterFrom } from 'xstate';
import { setRecoil } from 'recoil-nexus';
import { globalMachine, questList } from 'src/stores';
import { delay } from 'src/utils';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { StorageManager } from '../database';


export class AppManager {
  private static instance: AppManager | null = null;
  private storageManager = StorageManager.getInstance();
  private service = interpret(globalMachine);
  private status: 'pending' | 'fulfilled' | 'error' = 'pending';
  private task: Promise<void>;
  private error: Error | null = null;

  private constructor() {
    this.service.start();
    this.task = Promise.all([
      (async (): Promise<void> => {
        if (await this.authorize()) {
          setRecoil(questList, await this.storageManager.getQuestList());
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

  async reset(): Promise<void> {
    await this.storageManager.clear();
    await AsyncStorage.clear();
  }
}
