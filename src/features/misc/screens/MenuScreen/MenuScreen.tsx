import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import { CommonLayout, Text } from 'src/designs';
import { FadeInView, ListItem } from 'src/components';
import { AppManager } from 'src/modules';
import { navigate } from 'src/navigators/helpers';
import { useMainTabBarInset } from 'src/hooks';
import { delay, openMail } from 'src/utils';
import { t } from 'src/translations';
import {
  APP_MINIMUM_LOADING_DURATION,
  DEVELOPER_EMAIL,
  VERSION,
} from 'src/constants';

import { DeleteConfirmModal } from '../../components/DeleteConfirmModal';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

const Main = styled(View)();

const DeleteTextButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '$04',
});

export function MenuScreen(_props: MenuProps): JSX.Element {
  const { bottomInset } = useMainTabBarInset();
  const [deleteConfirmModalVisibility, setDeleteConfirmModalVisibility] =
    useState(false);
  const [loading, setLoading] = useState(false);
  const [_, send] = useActor(AppManager.getInstance().getService());

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
  };

  const handlePressReset = (): void => {
    setDeleteConfirmModalVisibility(true);
  };

  const handleCloseDeleteConfirmModal = (): void => {
    setDeleteConfirmModalVisibility(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);

    try {
      await Promise.all([
        AppManager.getInstance().reset(),
        delay(APP_MINIMUM_LOADING_DURATION),
      ]);
      setDeleteConfirmModalVisibility(false);
      send({ type: 'REFRESH' });
    } catch (error) {
      // @todo: error handing
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Header title={t('title.menu')} />
        <CommonLayout.Body>
          <Main>
            <ListItem label={t('label.version')} subLabel={VERSION} />
            <ListItem
              label={t('label.send_feedback')}
              onPress={handlePressSendFeedback}
            />
            <ListItem label={t('label.rating')} onPress={handlePressRating} />
            <ListItem
              label={t('label.open_source')}
              onPress={handlePressOpenSource}
            />
            <DeleteTextButton onPress={handlePressReset}>
              <Text sx={{ color: '$text_tertiary' }}>
                {t('label.reset_data')}
              </Text>
            </DeleteTextButton>
            <View sx={{ height: bottomInset }} />
          </Main>
        </CommonLayout.Body>
      </CommonLayout>
      <DeleteConfirmModal
        isLoading={loading}
        onClose={handleCloseDeleteConfirmModal}
        onDelete={(): void => void handleDelete()}
        visible={deleteConfirmModalVisibility}
      />
    </FadeInView>
  );
}
