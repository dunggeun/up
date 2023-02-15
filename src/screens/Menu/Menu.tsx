import React, { useState } from 'react';
import { useActor } from '@xstate/react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled, Container, View } from 'dripsy';
import { SafeAreaView, FadeInView } from 'src/components';
import { H1, Text } from 'src/designs';
import { useMainTabBarInset } from 'src/hooks';
import { delay } from 'src/utils';
import { AppManager } from 'src/modules';
import {
  VERSION,
  APP_MINIMUM_LOADING_DURATION
} from 'src/constants';
import { t } from 'src/translations';
import { MenuItem } from './MenuItem';
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

  const handlePressVersion = (): void => {
    // @todo
  };

  const handlePressSendFeedback = (): void => {
    // @todo
  };

  const handlePressRating = (): void => {
    // @todo
  };

  const handlePressOpenSource = (): void => {
    // @todo
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
            <MenuItem
              label={t('label.version')}
              onPress={handlePressVersion}
              subLabel={VERSION}
            />
            <MenuItem
              label={t('label.send_feedback')}
              onPress={handlePressSendFeedback}
            />
            <MenuItem
              label={t('label.rating')}
              onPress={handlePressRating}
            />
            <MenuItem
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
