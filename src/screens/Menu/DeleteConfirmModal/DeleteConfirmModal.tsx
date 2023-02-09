import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming
} from 'react-native-reanimated';
import { ActivityIndicator, styled, View } from 'dripsy';
import { Modal } from 'src/components';
import { Button, Text } from 'src/designs';
import { Warning } from 'src/assets/symbols';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

export interface DeleteConfirmModalProps extends Omit<ModalProps, 'title'> {
  isLoading: boolean;
  onDelete: () => void;
}

const LOADING_VIEW_HEIGHT = 50;

const Content = styled(View)({
  gap: '$04',
});

const WarningSymbolArea = styled(View)({
  width: '100%',
  alignItems: 'center',
});

const Message = styled(Text)({
  textAlign: 'center',
});

const loadingViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 0,
  opacity: 0,
  overflow: 'hidden'
} as const;

export function DeleteConfirmModal ({
  visible,
  isLoading,
  onClose,
  onDelete,
}: DeleteConfirmModalProps): JSX.Element {
  const visibilityRate = useSharedValue(0);
  const loadingViewAnimatedStyle = useAnimatedStyle(() => ({
    height: visibilityRate.value * LOADING_VIEW_HEIGHT,
    opacity: visibilityRate.value,
  }));

  useEffect(() => {
    visibilityRate.value = withTiming(isLoading ? 1 : 0);
  }, [visibilityRate, isLoading]);

  return (
    <Modal onClose={onClose} title={t('title.reset_data')} visible={visible}>
      <Content>
        <WarningSymbolArea>
          <Warning />
          <Animated.View style={[loadingViewStyle, loadingViewAnimatedStyle]}>
            <ActivityIndicator />
          </Animated.View>
        </WarningSymbolArea>
        <Message variant="text.primary">{t('message.reset_data')}</Message>
        <Button
          color="$red"
          disabled={isLoading}
          onLongPress={onDelete}
        >
          {t('label.reset_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
