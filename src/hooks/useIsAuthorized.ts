import { useActor } from '@xstate/react';
import { globalMachineService } from 'src/stores/machines';

export const useIsAuthorized = (): { authorized: boolean } => {
  const [state] = useActor(globalMachineService);

  return { authorized: state.matches('authorized') };
};
