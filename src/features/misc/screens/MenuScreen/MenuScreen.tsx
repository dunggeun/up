import React from 'react';
import { InteractionManager } from 'react-native';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import { useUserThemeColor, type User } from 'src/features/users';
import { AppEventChannel } from 'src/modules/event';
import { navigate } from 'src/navigators/helpers';
import { globalMachineService } from 'src/stores/machines';
import { useMainTabBarInset } from 'src/hooks';
import { openMail, openUrl } from 'src/utils';
import { DEVELOPER_EMAIL, VERSION } from 'src/constants';
import { CommonLayout, H2, Toggle } from 'src/designs';
import { FadeInView, ListItem } from 'src/components';
import { t } from 'src/translations';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

const Option = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$04',
});

export function MenuScreen(_props: MenuProps): React.ReactElement {
  const userColor = useUserThemeColor();
  const { bottomInset } = useMainTabBarInset();
  const [state, send] = useActor(globalMachineService);
  const hapticEnabled = state.context.user?.settings.enableHaptic ?? false;

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
    // 화면 전환 이후 이벤트 전파
    InteractionManager.runAfterInteractions(() => {
      AppEventChannel.getInstance().dispatch('enterOpenSource', undefined);
    });
  };

  const handleChangeHapticFeedbackToggle = (value: boolean): void => {
    send({
      type: 'EDIT_USER',
      user: {
        settings: { enableHaptic: value },
      } as Partial<User>,
    });
  };

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.menu')} />
        <CommonLayout.Body>
          <ListItem label={t('label.version')} subLabel={VERSION} />
          <ListItem label={t('label.guide')} onPress={handlePressGuide} />
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
          <Option>
            <H2 variant="primary">{t('label.haptic_feedback')}</H2>
            <Toggle
              color={userColor}
              initialValue={hapticEnabled}
              onChange={handleChangeHapticFeedbackToggle}
            />
          </Option>
          <View sx={{ height: bottomInset }} />
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
