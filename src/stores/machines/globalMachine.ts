import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Logger } from 'src/modules/logger';
import { getExpByLevel } from 'src/modules/app/helpers';

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
        Logger.debug(TAG, 'onIdle');
      },
      onLoading: () => {
        Logger.debug(TAG, 'onLoading');
      },
      onAuthorized: (_context, event) => {
        Logger.debug(TAG, 'onAuthorized', event.data);
      },
      onRefreshing: () => {
        Logger.debug(TAG, 'onRefreshing');
      },
      onUpdateUser: (_context, event) => {
        Logger.debug(TAG, 'onRefreshing', event.user);
      },
      onCalculating: (_context, event) => {
        Logger.debug(TAG, 'onCalculating', event.exp);
      },
      onUnauthorized: () => {
        Logger.debug(TAG, 'onUnauthorized');
      },
    },
    services: {
      loadUser: async () => {
        const stringifiedUser = await AsyncStorage.getItem('user');

        if (!stringifiedUser) {
          throw new Error('user is not exist');
        }

        return JSON.parse(stringifiedUser) as User;
      },
      updateUser: async (context, event) => {
        if (!context.user) throw new Error('user not exist in context');

        const modifiedUser = { ...context.user, ...event.user } as User;
        await AsyncStorage.setItem('user', JSON.stringify(modifiedUser));
        return modifiedUser;
      },
      saveUser: async (_context, event) => {
        await AsyncStorage.setItem('user', JSON.stringify(event.user));
      },
      calculateLevel: async (context, event) => {
        const user = context.user;
        if (!user) throw new Error('user not exist in context');

        const earnedExp = event.exp;
        const targetExp = getExpByLevel(user.level);
        const modifiedUser = {
          ...user,
          totalExp: user.totalExp + earnedExp,
        } as User;

        if (targetExp <= user.currentExp + earnedExp) {
          modifiedUser.currentExp = user.currentExp + earnedExp - targetExp;
          modifiedUser.level = user.level + 1;
        } else {
          modifiedUser.currentExp = user.currentExp + earnedExp;
        }

        await AsyncStorage.setItem('user', JSON.stringify(modifiedUser));
        return modifiedUser;
      },
      cleanup: () => AsyncStorage.clear(),
    },
    delays: {
      DEFAULT_TIMEOUT: 3 * 1000,
    },
  },
);
