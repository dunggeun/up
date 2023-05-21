import { P, match } from 'ts-pattern';
import { name as appName } from '../../app.json';
import type { DocumentTitleOptions } from '@react-navigation/native';

/* istanbul ignore next */
export const titleFormatter: DocumentTitleOptions['formatter'] = (
  options,
  route,
): string => {
  return match({ options, route })
    .with({ options: { title: P.select(P.string) } }, (title) => title)
    .with({ route: { name: P.select(P.string) } }, (title) => title)
    .otherwise(() => appName);
};
