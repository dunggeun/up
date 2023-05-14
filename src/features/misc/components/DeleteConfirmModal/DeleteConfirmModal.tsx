import React, { memo } from 'react';
import { styled, View } from 'dripsy';
import { Warning } from 'src/assets/symbols';
import { Button, Text } from 'src/designs';
import { Modal, type ModalProps } from 'src/components';
import { t } from 'src/translations';

export interface DeleteConfirmModalProps extends Omit<ModalProps, 'title'> {
  onDelete: () => void;
}

const ACCESSIBILITY = {
  delete: t('label.delete'),
};

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

export const DeleteConfirmModal = memo(function DeleteConfirmModal({
  visible,
  onClose,
  onDelete,
}: DeleteConfirmModalProps): JSX.Element {
  return (
    <Modal onClose={onClose} title={t('title.reset_data')} visible={visible}>
      <Content testID="delete-confirm-modal">
        <WarningSymbolArea>
          <Warning />
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
