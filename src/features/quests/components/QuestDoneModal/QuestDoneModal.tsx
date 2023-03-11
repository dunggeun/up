import React from 'react';
import { styled, View } from 'dripsy';
import { Modal } from 'src/components';
import { Button, Text } from 'src/designs';
import { useUserThemeColor } from 'src/features/users';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

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
      <Content>
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
