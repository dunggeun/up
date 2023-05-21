import React, { memo } from 'react';
import { ActivityIndicator, styled, View } from 'dripsy';
import { MotiView } from 'moti';
import { Warning } from 'src/assets/symbols';
import { Button, Text } from 'src/designs';
import { Modal, type ModalProps } from 'src/components';
import { t } from 'src/translations';

export interface DeleteConfirmModalProps extends Omit<ModalProps, 'title'> {
  isLoading: boolean;
  onDelete: () => void;
}

const LOADING_VIEW_HEIGHT = 50;
const ACCESSIBILITY = {
  delete: t('label.delete'),
};

const Content = styled(View)({ gap: '$04' });

const WarningSymbolArea = styled(View)({
  width: '100%',
  alignItems: 'center',
});

const Message = styled(Text)({ textAlign: 'center' });

const loadingViewStyle = {
  justifyContent: 'center',
  alignItems: 'center',
  height: 0,
  opacity: 0,
  overflow: 'hidden',
} as const;

export const DeleteConfirmModal = memo(function DeleteConfirmModal({
  visible,
  isLoading,
  onClose,
  onDelete,
}: DeleteConfirmModalProps): React.ReactElement {
  return (
    <Modal onClose={onClose} title={t('title.reset_data')} visible={visible}>
      <Content testID="delete-confirm-modal">
        <WarningSymbolArea>
          <Warning />
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
        </WarningSymbolArea>
        <Message variant="text.primary">{t('message.reset_data')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.reset_data_guide')})`}
        </Message>
        <Button
          accessibilityHint={ACCESSIBILITY.delete}
          accessibilityLabel={ACCESSIBILITY.delete}
          color="$red"
          onLongPress={onDelete}
        >
          {t('label.reset_confirm')}
        </Button>
      </Content>
    </Modal>
  );
});
