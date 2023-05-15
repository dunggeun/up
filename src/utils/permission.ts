import { PermissionsAndroid, Platform } from 'react-native';
import { Logger } from 'src/modules/logger';
import { t } from 'src/translations';

const TAG = 'utils.permission';

const REQUIRED_PERMISSIONS = [
  {
    permission: PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
    title: t('title.read_permission'),
    message: t('message.read_permission_for_restore'),
  },
  {
    permission: PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
    title: t('title.write_permission'),
    message: t('message.write_permission_for_backup'),
  },
] as const;

export const requestStoragePermission = (): Promise<boolean> => {
  if (Platform.OS !== 'android') return Promise.resolve(true);

  const results: boolean[] = [];
  return REQUIRED_PERMISSIONS.reduce(
    (task, { permission, title, message }) =>
      permission
        ? task
            .then(() => PermissionsAndroid.check(permission))
            .then((granted) => {
              if (granted) return 'granted';
              return PermissionsAndroid.request(permission, {
                title,
                message,
                buttonNeutral: t('label.ask_me_later'),
                buttonNegative: t('label.cancel'),
                buttonPositive: t('label.ok'),
              });
            })
            .then((status) => void results.push(status === 'granted'))
        : task,
    Promise.resolve(),
  )
    .then(() => results.every(Boolean))
    .catch((error: Error) => {
      Logger.warn(TAG, error.message);
      return false;
    });
};
