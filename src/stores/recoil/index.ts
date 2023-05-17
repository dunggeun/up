import { useRecoilCallback, type RecoilState } from 'recoil';
import { noop } from 'src/utils';

export * from './notifications';

type RecoilSetter = <T>(
  recoilState: RecoilState<T>,
  valOrUpdater: ((currVal: T) => T) | T,
) => void;

let setRecoilExternalState: RecoilSetter = noop;

export const getRecoilExternalContext = (): { set: RecoilSetter } => {
  return { set: setRecoilExternalState };
};

/**
 * * 사용법
 *
 * ```tsx
 * <RecoilRoot>
 *   <RecoilExternalPortal />
 *   ...
 * </RecoilRoot>
 * ```
 */
export function RecoilExternalPortal(): null {
  useRecoilCallback(({ set }) => {
    setRecoilExternalState = set;
    return noop;
  })();

  return null;
}
