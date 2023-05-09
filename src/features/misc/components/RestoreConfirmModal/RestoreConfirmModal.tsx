import React from 'react';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { Button, Text } from 'src/designs';
import { Modal } from 'src/components';
import type { ModalProps } from 'src/components';
import { t } from 'src/translations';

export interface RestoreConfirmModalProps extends Omit<ModalProps, 'title'> {
  onConfirm: () => void;
}

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function RestoreConfirmModal({
  visible,
  onClose,
  onConfirm,
}: RestoreConfirmModalProps): JSX.Element {
  const userColor = useUserThemeColor();

  return (
    <Modal onClose={onClose} title={t('title.restore')} visible={visible}>
      <Content testID="restore-confirm-modal">
        <Message variant="text.primary">{t('message.restore')}</Message>
        <Button color={userColor} disableLongPress onPress={onConfirm}>
          {t('label.pick_backup_and_restore')}
        </Button>
      </Content>
    </Modal>
  );
}
