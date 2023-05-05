import { useLayoutEffect } from 'react';
import { useActor } from '@xstate/react';
import { globalMachineService } from 'src/stores/machines';
import { Logger } from 'src/modules/logger';
import type { User } from '../types';

export const useUser = (): User => {
  const [state, send] = useActor(globalMachineService);
  const user = state.context.user;

  useLayoutEffect(() => {
    if (user === null) {
      Logger.warn('useUser :: user data is empty');
      send('LOGOUT');
    }
  }, [user, send]);

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return user!;
};
