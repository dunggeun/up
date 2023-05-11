import React from 'react';
import { styled, View } from 'dripsy';
import { Button, Text } from 'src/designs';
import { Modal, type ModalProps } from 'src/components';
import { t } from 'src/translations';

export interface QuestDeleteModalProps extends Omit<ModalProps, 'title'> {
  onDelete: () => void;
}

const ACCESSIBILITY = {
  delete: t('label.delete'),
};

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function QuestDeleteModal({
  visible,
  onClose,
  onDelete,
}: QuestDeleteModalProps): JSX.Element {
  return (
    <Modal
      onClose={onClose}
      title={t('title.delete_mission')}
      visible={visible}
    >
      <Content testID="mission-delete-modal">
        <Message variant="text.primary">{t('message.delete_mission')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.delete_mission_guide')})`}
        </Message>
        <Button
          accessibilityHint={ACCESSIBILITY.delete}
          accessibilityLabel={ACCESSIBILITY.delete}
          color="$red"
          onLongPress={onDelete}
        >
          {t('label.delete_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
