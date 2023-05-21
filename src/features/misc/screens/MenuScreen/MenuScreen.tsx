import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { InteractionManager } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import { useActor } from '@xstate/react';
import dayjs from 'dayjs';
import { useDripsyTheme, View } from 'dripsy';
import { useRecoilValue } from 'recoil';
import { useUserThemeColor, type User } from 'src/features/users';
import { AppEventChannel } from 'src/modules/event';
import { requestNotificationPermission } from 'src/modules/notifications';
import { navigate } from 'src/navigators/helpers';
import { globalMachineService } from 'src/stores/machines';
import { notificationStatus as notificationStatusAtom } from 'src/stores/recoil';
import { useMainTabBarInset } from 'src/hooks';
import { openMail, openUrl, runAfterModalDismissed } from 'src/utils';
import {
  DEFAULT_REMINDER_TIME,
  DEVELOPER_EMAIL,
  IS_NATIVE,
  REMINDER_TIME_FORMAT,
  VERSION,
} from 'src/constants';
import { CommonLayout } from 'src/designs';
import { FadeInView, ListItem } from 'src/components';
import { t } from 'src/translations';
import { ReminderOption } from './components';
import { HapticFeedbackOption } from './components/HapticFeedbackOption';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

export function MenuScreen(_props: MenuProps): React.ReactElement {
  const [timePickerVisibility, setTimePickerVisibility] = useState(false);
  const userColor = useUserThemeColor();
  const { theme } = useDripsyTheme();
  const { bottomInset } = useMainTabBarInset();
  const [state, send] = useActor(globalMachineService);
  const notificationStatus = useRecoilValue(notificationStatusAtom);
  const remindAt = state.context.user?.remindAt;
  const remindAtAsDate = useMemo(
    () => dayjs(remindAt, REMINDER_TIME_FORMAT).toDate(),
    [remindAt],
  );
  const hapticEnabled = state.context.user?.settings.enableHaptic ?? false;

  useEffect(() => {
    if (notificationStatus.granted) return;
    requestNotificationPermission();
  }, [notificationStatus.granted]);

  const handlePressGuide = (): void => {
    openUrl(t('url.guide'));
  };

  const handlePressDataManagement = (): void => {
    navigate('Common', 'DataManagement');
  };

  const handlePressSendFeedback = (): void => {
    openMail(DEVELOPER_EMAIL, {
      subject: t('template.send_feedback.title'),
      body: t('template.send_feedback.body'),
    });
  };

  const handlePressOpenSource = (): void => {
    navigate('Common', 'OpenSourceProject');
    InteractionManager.runAfterInteractions(() => {
      AppEventChannel.getInstance().dispatch('enterOpenSource', undefined);
    });
  };

  const handleChangeReminderToggle = useCallback(
    (value: boolean): void => {
      send({
        type: 'EDIT_USER',
        user: {
          remindAt: value ? DEFAULT_REMINDER_TIME : null,
        } as Partial<User>,
      });
    },
    [send],
  );

  const handleCancelRemindModal = (): void => {
    setTimePickerVisibility(false);
  };

  const handleConfirmRemindTime = (date: Date): void => {
    setTimePickerVisibility(false);
    runAfterModalDismissed(() => {
      send({
        type: 'EDIT_USER',
        user: {
          remindAt: dayjs(date).format(REMINDER_TIME_FORMAT),
        } as Partial<User>,
      });
    });
  };

  const handleChangeHapticFeedbackToggle = useCallback(
    (value: boolean): void => {
      send({
        type: 'EDIT_USER',
        user: {
          settings: { enableHaptic: value },
        } as Partial<User>,
      });
    },
    [send],
  );

  const renderNativeOptions = (): React.ReactElement | null => {
    if (!IS_NATIVE) return null;

    return (
      <>
        <ReminderOption
          onChangeToggle={handleChangeReminderToggle}
          onPressTimePicker={(): void => setTimePickerVisibility(true)}
          permissionGranted={notificationStatus.granted}
          remindTime={remindAt ?? null}
        />
        <HapticFeedbackOption
          hapticEnabled={hapticEnabled}
          onChangeToggle={handleChangeHapticFeedbackToggle}
        />
      </>
    );
  };

  return (
    <>
      <FadeInView>
        <CommonLayout insetBottom={false}>
          <CommonLayout.Header title={t('title.menu')} />
          <CommonLayout.Body>
            <ListItem label={t('label.version')} subLabel={VERSION} />
            <ListItem label={t('label.guide')} onPress={handlePressGuide} />
            {renderNativeOptions()}
            <ListItem
              label={t('label.data_management')}
              onPress={handlePressDataManagement}
            />
            <ListItem
              label={t('label.send_feedback')}
              onPress={handlePressSendFeedback}
            />
            <ListItem
              label={t('label.open_source')}
              onPress={handlePressOpenSource}
            />
            <View sx={{ height: bottomInset }} />
          </CommonLayout.Body>
        </CommonLayout>
      </FadeInView>
      <DateTimePickerModal
        accentColor={theme.colors[userColor]}
        cancelTextIOS={t('label.cancel')}
        confirmTextIOS={t('label.ok')}
        date={remindAtAsDate}
        is24Hour
        isDarkModeEnabled={false}
        isVisible={timePickerVisibility}
        locale="en_EN"
        mode="time"
        onCancel={handleCancelRemindModal}
        onConfirm={handleConfirmRemindTime}
        textColor={theme.colors.$text_primary}
      />
    </>
  );
}
