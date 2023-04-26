import React from 'react';
import { ActivityIndicator, styled, View } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';
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
  overflow: 'hidden',
} as const;

export function DeleteConfirmModal({
  visible,
  isLoading,
  onClose,
  onDelete,
}: DeleteConfirmModalProps): JSX.Element {
  return (
    <Modal onClose={onClose} title={t('title.reset_data')} visible={visible}>
      <Content testID="delete-confirm-modal">
        <WarningSymbolArea>
          <Warning />
          <AnimatePresence>
            {isLoading ? (
              <MotiView
                animate={{ opacity: 1, height: LOADING_VIEW_HEIGHT }}
                from={{ opacity: 0, height: 0 }}
                style={loadingViewStyle}
                transition={{ type: 'timing' }}
              >
                <ActivityIndicator />
              </MotiView>
            ) : null}
          </AnimatePresence>
        </WarningSymbolArea>
        <Message variant="text.primary">{t('message.reset_data')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.reset_data_guide')})`}
        </Message>
        <Button color="$red" disabled={isLoading} onLongPress={onDelete}>
          {t('label.reset_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
