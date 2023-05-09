import { useLayoutEffect } from 'react';
import { useActor } from '@xstate/react';
import { Logger } from 'src/modules/logger';
import { globalMachineService } from 'src/stores/machines';
import type { User } from '../types';

const TAG = 'useUser';

const EMPTY_USER: User = {
  name: '',
  level: 0,
  totalExp: 0,
  currentExp: 0,
  badge: 0,
  unlockedBadges: {},
  theme: 0,
  createdAt: 0,
  updatedAt: 0,
};

export const useUser = (): User => {
  const [state, send] = useActor(globalMachineService);
  const user = state.context.user;

  useLayoutEffect(() => {
    if (user === null) {
      send('LOGOUT');
      Logger.warn(TAG, 'user data is empty');
    }
  }, [user, send]);

  return user ?? EMPTY_USER;
};
