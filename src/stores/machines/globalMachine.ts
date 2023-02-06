// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable no-console */
import { createMachine, assign } from 'xstate';
import AsyncStorage from '@react-native-async-storage/async-storage';
import type { User } from 'src/types';

const TAG = 'GlobalMachine';

export const globalMachine = createMachine(
  {
    predictableActionArguments: true,
    tsTypes: {} as import('./globalMachine.typegen').Typegen0,
    schema: {
      context: {} as { user: User | null },
      events: {} as { type: 'AUTO_LOGIN' }
                  | { type: 'LOGIN'; user: User }
                  | { type: 'LOGOUT' }
                  | { type: 'REFRESH' }
                  | { type: 'EDIT_USER'; user: Partial<Pick<User, 'name' | 'badge' | 'theme'>> },
      services: {} as {
        loadUser: { data: User };
        updateUser: { data: User };
        saveUser: { data: void };
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
              onError: '#unauthorized'
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
        console.log(TAG, 'onIdle');
      },
      onLoading: () => {
        console.log(TAG, 'onLoading');
      },
      onAuthorized: (_context, event) => {
        console.log(TAG, 'onAuthorized', event.data);
      },
      onRefreshing: () => {
        console.log(TAG, 'onRefreshing');
      },
      onUpdateUser: (_context, event) => {
        console.log(TAG, 'onUpdateUser', event.user);
      },
      onUnauthorized: () => {
        console.log(TAG, 'onUnauthorized');
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
      cleanup: () => AsyncStorage.clear(),
    },
    delays: {
      DEFAULT_TIMEOUT: 3 * 1000,
    },
  },
);
