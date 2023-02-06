import { name as appName } from '../../app.json';

import type { DocumentTitleOptions } from '@react-navigation/native';

export const titleFormatter: DocumentTitleOptions['formatter'] = (
  options,
  route,
): string => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return options?.title ?? route?.name ?? appName;
};
