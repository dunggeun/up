import React from 'react';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { Button, Text } from 'src/designs';
import { Modal } from 'src/components';
import type { ModalProps } from 'src/components';
import { t } from 'src/translations';

export interface QuestDoneModalProps extends Omit<ModalProps, 'title'> {
  onDone: () => void;
}

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function QuestDoneModal({
  visible,
  onClose,
  onDone,
}: QuestDoneModalProps): JSX.Element {
  const userColor = useUserThemeColor();

  return (
    <Modal onClose={onClose} title={t('title.done_quest')} visible={visible}>
      <Content testID="quest-done-modal">
        <Message variant="text.primary">{t('message.done_quest')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.done_quest_guide')})`}
        </Message>
        <Button color={userColor} onLongPress={onDone}>
          {t('label.done_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
