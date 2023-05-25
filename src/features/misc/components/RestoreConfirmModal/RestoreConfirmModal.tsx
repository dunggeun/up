import React from 'react';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { Button, Text, Modal, type ModalProps } from 'src/designs';
import { t } from 'src/translations';

export interface RestoreConfirmModalProps extends Omit<ModalProps, 'title'> {
  onConfirm: () => void;
}

const ACCESSIBILITY = {
  restore: t('label.restore'),
};

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
}: RestoreConfirmModalProps): React.ReactElement {
  const userColor = useUserThemeColor();

  return (
    <Modal onClose={onClose} title={t('title.restore')} visible={visible}>
      <Content testID="restore-confirm-modal">
        <Message variant="text.primary">{t('message.restore')}</Message>
        <Button
          accessibilityHint={ACCESSIBILITY.restore}
          accessibilityLabel={ACCESSIBILITY.restore}
          color={userColor}
          disableLongPress
          onPress={onConfirm}
        >
          {t('label.pick_backup_and_restore')}
        </Button>
      </Content>
    </Modal>
  );
}
