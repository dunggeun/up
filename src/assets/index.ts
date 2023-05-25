import { Platform } from 'react-native';
import { Logger } from 'src/modules/logger';
import * as Badges from './badges';
import * as Icons from './icons';
import * as Images from './images';

export { Icons, Badges, Images };

export const preload = (): Promise<void> => {
  if (Platform.OS !== 'web') {
    return Promise.resolve();
  }

  return Promise.all(
    Object.entries(Images).map(
      ([name, source]) =>
        new Promise<void>((resolve) => {
          Logger.info('preload', `loading ${name}(${source as string})...`);
          const image = new Image();
          image.src = source as string;
          image.onload = (): void => resolve();
          image.onerror = (): void => {
            Logger.warn('preload', `load failed ${name}(${source as string})`);
            resolve();
          };
        }),
    ),
  ).then(() => Logger.info('preload', 'preload finished'));
};
