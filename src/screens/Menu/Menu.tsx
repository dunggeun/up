import React, { useState } from 'react';
import { useActor } from '@xstate/react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled, Container, View } from 'dripsy';
import { SafeAreaView, FadeInView, ListItem } from 'src/components';
import { H1, Text } from 'src/designs';
import { useMainTabBarInset } from 'src/hooks';
import { delay, openMail } from 'src/utils';
import { AppManager } from 'src/modules';
import { navigate } from 'src/navigators/helpers';
import {
  VERSION,
  APP_MINIMUM_LOADING_DURATION,
  DEVELOPER_EMAIL
} from 'src/constants';
import { t } from 'src/translations';
import { DeleteConfirmModal } from './DeleteConfirmModal';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

const Header = styled(View)({
  width: '100%',
  paddingY: '$04',
});

const Main = styled(View)();

const DeleteTextButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '$04',
});

const app = AppManager.getInstance();

export function Menu (_props: MenuProps): JSX.Element {
  const [
    deleteConfirmModalVisibility,
    setDeleteConfirmModalVisibility
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, send] = useActor(app.getService());
  const { bottomInset } = useMainTabBarInset();

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
        app.reset(),
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
      <SafeAreaView insetBottom={false}>
        <Container>
          <Header>
            <H1 variant="primary">{t('title.menu')}</H1>
          </Header>
          <Main>
            <ListItem
              label={t('label.version')}
              subLabel={VERSION}
            />
            <ListItem
              label={t('label.send_feedback')}
              onPress={handlePressSendFeedback}
            />
            <ListItem
              label={t('label.rating')}
              onPress={handlePressRating}
            />
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
        </Container>
      </SafeAreaView>
      <DeleteConfirmModal
        isLoading={loading}
        onClose={handleCloseDeleteConfirmModal}
        onDelete={(): void => void handleDelete()}
        visible={deleteConfirmModalVisibility}
      />
    </FadeInView>
  );
}
