import React from 'react';
import { InteractionManager } from 'react-native';
import { View } from 'dripsy';
import { AppEventChannel } from 'src/modules/event';
import { navigate } from 'src/navigators/helpers';
import { useMainTabBarInset } from 'src/hooks';
import { openMail, openUrl } from 'src/utils';
import { DEVELOPER_EMAIL, VERSION } from 'src/constants';
import { CommonLayout } from 'src/designs';
import { FadeInView, ListItem } from 'src/components';
import { t } from 'src/translations';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

export function MenuScreen(_props: MenuProps): JSX.Element {
  const { bottomInset } = useMainTabBarInset();

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

  const handlePressRating = (): void => {
    // @todo
  };

  const handlePressOpenSource = (): void => {
    navigate('Common', 'OpenSourceProject');
    // 화면 전환 이후 이벤트 전파
    InteractionManager.runAfterInteractions(() => {
      AppEventChannel.getInstance().dispatch('enterOpenSource', undefined);
    });
  };

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.menu')} />
        <CommonLayout.Body>
          <ListItem label={t('label.guide')} onPress={handlePressGuide} />
          <ListItem
            label={t('label.data_management')}
            onPress={handlePressDataManagement}
          />
          <ListItem
            label={t('label.send_feedback')}
            onPress={handlePressSendFeedback}
          />
          <ListItem label={t('label.rating')} onPress={handlePressRating} />

          <ListItem
            label={t('label.open_source')}
            onPress={handlePressOpenSource}
          />
          <ListItem label={t('label.version')} subLabel={VERSION} />
          <View sx={{ height: bottomInset }} />
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
