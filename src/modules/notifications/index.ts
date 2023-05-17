/* eslint-disable import/no-named-as-default-member */
/* eslint-disable import/no-named-as-default */
import { Platform } from 'react-native';
import PushNotification from 'react-native-push-notification';
import PushNotificationIOS from '@react-native-community/push-notification-ios';
import dayjs from 'dayjs';
import {
  getRecoilExternalContext,
  notificationStatus,
} from 'src/stores/recoil';
import {
  ANDROID_NOTIFICATION_CHANNEL_ID,
  REMINDER_TIME_FORMAT,
} from 'src/constants';
import { Logger } from '../logger/Logger';

const TAG = 'Notifications';

export const initialize = (): void => {
  Logger.info(TAG, 'initialize');

  PushNotification.configure({
    onRegister(data) {
      Logger.debug(TAG, `configure.onRegister - token: ${data.token}`);
    },
    onNotification(notification) {
      Logger.debug(TAG, `configure.onNotification - ${notification.id}`);
      notification.finish(PushNotificationIOS.FetchResult.NoData);
    },
    onRegistrationError(error: Error) {
      Logger.debug(TAG, `configure.onNotification - ${error.message}`);
      getRecoilExternalContext().set(notificationStatus, (value) => ({
        ...value,
        error,
      }));
    },
    permissions: {
      alert: true,
      badge: true,
      sound: true,
    },
    requestPermissions: false,
  });

  PushNotification.createChannel(
    {
      channelId: ANDROID_NOTIFICATION_CHANNEL_ID,
      channelName: ANDROID_NOTIFICATION_CHANNEL_ID,
    },
    (created) => {
      Logger.info(TAG, 'createChannel -', created);
    },
  );
};

export const checkNotificationPermission = (): void => {
  PushNotification.checkPermissions((permissions) => {
    Logger.debug(TAG, 'checkNotificationPermission', permissions);
    getRecoilExternalContext().set(notificationStatus, (value) => ({
      ...value,
      granted: permissions.alert ?? false,
    }));
  });
};

export const requestNotificationPermission = (): Promise<void> => {
  if (Platform.OS !== 'ios') return Promise.resolve();

  return PushNotificationIOS.requestPermissions().then((permissions) => {
    Logger.debug(TAG, 'requestPermissions', permissions);
    getRecoilExternalContext().set(notificationStatus, (value) => ({
      ...value,
      granted: permissions.alert ?? false,
    }));
  });
};

export const scheduleLocalNotification = (
  time: string,
  message: string,
): void => {
  Logger.info(TAG, `scheduleLocalNotification - scheduled everyday at ${time}`);
  cancelAllScheduledNotifications();
  const currentDate = dayjs();
  const targetDate = dayjs(time, REMINDER_TIME_FORMAT);

  // 현재 시간이 예약 시간을 지나친 경우  예약 시간에 1일 더하여
  // 다음날 지정 시간부터 알림 제공 할 수 있도록 함
  if (currentDate.isAfter(targetDate)) {
    targetDate.add(1, 'day');
  }

  PushNotification.localNotificationSchedule({
    message,
    title: 'test',
    channelId: ANDROID_NOTIFICATION_CHANNEL_ID,
    ignoreInForeground: true,
    date: targetDate.toDate(),
    repeatType: 'day',
  });
};

export const cancelAllScheduledNotifications = (): void => {
  Logger.info(TAG, 'cancelAllScheduledNotifications');
  PushNotification.cancelAllLocalNotifications();
};
