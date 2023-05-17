import { withDripsy } from './withDripsy';
import { withReactQuery } from './withReactQuery';
import { withRecoil } from './withRecoil';

export * from './withDripsy';
export * from './withReactQuery';
export * from './withRecoil';

export const withProviders = (
  component: React.ReactElement,
): React.ReactElement => {
  return [withDripsy, withReactQuery, withRecoil].reduce(
    (component, wrapper) => wrapper(component),
    component,
  );
};
