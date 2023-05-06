import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AppEventChannel } from 'src/modules/event';
import { Logger } from 'src/modules/logger';
import { getExpByLevel } from 'src/modules/app/helpers';
import { StorageManager } from 'src/modules/database';
import { queryClient } from '../reactQuery';

import type { User } from 'src/features/users';

const TAG = 'GlobalMachine';

export const globalMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./globalMachine.typegen').Typegen0,
    schema: {
      context: {} as { user: User | null },
      events: {} as
        | { type: 'AUTO_LOGIN' }
        | { type: 'LOGIN'; user: User }
        | { type: 'LOGOUT' }
        | { type: 'REFRESH' }
        | {
            type: 'EDIT_USER';
            user: Partial<Pick<User, 'name' | 'badge' | 'theme'>>;
          }
        | { type: 'REWARD'; exp: number },
      services: {} as {
        loadUser: { data: User };
        updateUser: { data: User };
        saveUser: { data: void };
        calculateLevel: { data: User };
        cleanup: { data: void };
      },
    },
    initial: 'idle',
    context: {
      user: null,
    },
    states: {
      idle: {
        entry: ['onIdle'],
        on: {
          AUTO_LOGIN: 'loading',
        },
      },
      loading: {
        id: 'loading',
        entry: ['onLoading'],
        after: {
          DEFAULT_TIMEOUT: 'unauthorized',
        },
        invoke: {
          src: 'loadUser',
          onDone: {
            target: 'authorized',
            actions: 'setUser',
          },
          onError: 'unauthorized',
        },
      },
      authorized: {
        initial: 'idle',
        entry: ['onAuthorized'],
        on: {
          LOGOUT: 'unauthorized',
          REFRESH: '.refreshing',
          EDIT_USER: '.updating',
          REWARD: '.calculating',
        },
        states: {
          idle: {},
          refreshing: {
            entry: ['onRefreshing'],
            invoke: {
              src: 'loadUser',
              onDone: {
                target: 'idle',
                actions: 'setUser',
              },
              onError: '#unauthorized',
            },
          },
          updating: {
            entry: ['onUpdateUser'],
            invoke: {
              src: 'updateUser',
              onDone: {
                target: 'idle',
                actions: 'setUser',
              },
              onError: 'idle',
            },
          },
          calculating: {
            entry: ['onCalculating'],
            invoke: {
              src: 'calculateLevel',
              onDone: {
                target: 'idle',
                actions: 'setUser',
              },
              onError: 'idle',
            },
          },
        },
      },
      unauthorized: {
        id: 'unauthorized',
        initial: 'idle',
        entry: ['onUnauthorized', 'removeUser'],
        invoke: {
          src: 'cleanup',
        },
        on: {
          LOGIN: {
            target: '.validating',
          },
        },
        states: {
          idle: {},
          validating: {
            invoke: {
              src: 'saveUser',
              onDone: '#loading',
              onError: 'idle',
            },
          },
        },
      },
    },
  },
  {
    actions: {
      setUser: assign({ user: (_context, event) => event.data }),
      removeUser: assign({ user: (_context, _event) => null }),
      onIdle: () => {
        Logger.debug(TAG, 'actions.onIdle');
      },
      onLoading: () => {
        Logger.debug(TAG, 'actions.onLoading');
      },
      onAuthorized: (_context, event) => {
        Logger.debug(TAG, 'actions.onAuthorized', event.data);
        Logger.info(TAG, `user found - ${event.data.name}`);
      },
      onRefreshing: () => {
        Logger.debug(TAG, 'actions.onRefreshing');
      },
      onUpdateUser: (_context, event) => {
        Logger.debug(TAG, 'actions.onRefreshing', event.user);
      },
      onCalculating: (_context, event) => {
        Logger.debug(TAG, 'actions.onCalculating', event.exp);
      },
      onUnauthorized: () => {
        Logger.debug(TAG, 'actions.onUnauthorized');
      },
    },
    services: {
      loadUser: async () => {
        Logger.info(TAG, 'services.loadUser');
        const stringifiedUser = await AsyncStorage.getItem('user');

        if (!stringifiedUser) {
          throw new Error('user is not exist');
        }

        return JSON.parse(stringifiedUser) as User;
      },
      updateUser: async (context, event) => {
        Logger.debug(TAG, 'services.updateUser');
        if (!context.user) throw new Error('user not exist in context');

        const modifiedUser = {
          ...context.user,
          ...event.user,
          updatedAt: Number(new Date()),
        } as User;

        await AsyncStorage.setItem('user', JSON.stringify(modifiedUser));
        return modifiedUser;
      },
      saveUser: async (_context, event) => {
        Logger.debug(TAG, 'services.saveUser');
        await AsyncStorage.setItem('user', JSON.stringify(event.user));
      },
      calculateLevel: async (context, event) => {
        Logger.debug(TAG, 'services.calculateLevel');
        const user = context.user;
        if (!user) throw new Error('user not exist in context');

        const earnedExp = event.exp;
        const targetExp = getExpByLevel(user.level);
        const modifiedUser = {
          ...user,
          totalExp: user.totalExp + earnedExp,
        } as User;

        Logger.info(
          TAG,
          `total exp: ${user.totalExp}, current exp: ${user.currentExp}`,
        );
        Logger.info(
          TAG,
          `target exp based on user level: ${targetExp}(level: ${user.level})`,
        );
        Logger.info(TAG, `earned exp: ${earnedExp}`);

        const shouldLevelUp = targetExp <= user.currentExp + earnedExp;

        if (shouldLevelUp) {
          Logger.info(
            TAG,
            'calculated exp is greater than or equal to the target exp',
          );
          Logger.info(TAG, `level up (${user.level} -> ${user.level + 1})`);
          modifiedUser.currentExp = user.currentExp + earnedExp - targetExp;
          modifiedUser.level = user.level + 1;
        } else {
          modifiedUser.currentExp = user.currentExp + earnedExp;
        }

        await AsyncStorage.setItem('user', JSON.stringify(modifiedUser));

        if (shouldLevelUp) {
          AppEventChannel.getInstance().dispatch('levelup', {
            level: modifiedUser.level,
          });
        }

        return modifiedUser;
      },
      cleanup: async () => {
        Logger.debug(TAG, 'services.cleanup');
        queryClient.clear();
        await StorageManager.getInstance().clear();
        await AsyncStorage.clear();
      },
    },
    delays: {
      DEFAULT_TIMEOUT: 3 * 1000,
    },
  },
);
