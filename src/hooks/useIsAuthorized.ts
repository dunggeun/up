import { useActor } from '@xstate/react';
import { AppManager } from 'src/modules';

export const useIsAuthorized = (): { authorized: boolean } => {
  const [state] = useActor(AppManager.getInstance().getService());

  return { authorized: state.matches('authorized') };
};
