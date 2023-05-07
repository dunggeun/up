// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable import/no-named-as-default-member */
import Picker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { Platform } from 'react-native';
import { Logger } from 'src/modules/logger';

import type { SelectFile, WriteFile, ReadFile } from './types';

const TAG = 'utils.fs';

export const selectFile: SelectFile = () => {
  Logger.debug(TAG, 'selectFile');

  return Picker.pickSingle().then((result) => result.uri);
};

export const writeFile: WriteFile = (data: string, filename: string) => {
  const path = `${Platform.select({
    android: RNFS.DownloadDirectoryPath,
    ios: RNFS.DocumentDirectoryPath,
    default: '',
  })}/${filename}`;
  Logger.debug(TAG, `writeFile :: save file to ${path}`);

  return RNFS.writeFile(path, data, 'utf8')
    .then(() => Logger.success(TAG, 'writeFile :: done'))
    .catch((error) => {
      Logger.error(TAG, `writeFile :: ${(error as Error).message}`);
      throw error;
    });
};

export const readFile: ReadFile = (filepath: string) => {
  Logger.debug(TAG, `readFile :: read file from ${filepath}`);

  return RNFS.readFile(filepath);
};
