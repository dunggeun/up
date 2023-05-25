import React from 'react';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { Button, Text, Modal, type ModalProps } from 'src/designs';
import { t } from 'src/translations';

export interface MissionEndModalProps extends Omit<ModalProps, 'title'> {
  onDone: () => void;
}

const ACCESSIBILITY = {
  ok: t('label.ok'),
};

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function MissionEndModal({
  visible,
  onClose,
  onDone,
}: MissionEndModalProps): React.ReactElement {
  const userColor = useUserThemeColor();

  return (
    <Modal onClose={onClose} title={t('title.end_mission')} visible={visible}>
      <Content testID="mission-end-modal">
        <Message variant="text.primary">{t('message.end_mission')}</Message>
        <Message variant="text.secondary">
          {`(${t('message.end_mission_guide')})`}
        </Message>
        <Button
          accessibilityHint={ACCESSIBILITY.ok}
          accessibilityLabel={ACCESSIBILITY.ok}
          color={userColor}
          onLongPress={onDone}
        >
          {t('label.end_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
