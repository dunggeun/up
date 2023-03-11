import React from 'react';
import { ActivityIndicator, styled, View } from 'dripsy';
import { MotiView } from 'moti';
import { Modal } from 'src/components';
import { Button, Text } from 'src/designs';
import { useUserThemeColor } from 'src/features/users';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

export interface QuestDoneModalProps extends Omit<ModalProps, 'title'> {
  isLoading: boolean;
  onDone: () => void;
}

const LOADING_VIEW_HEIGHT = 50;

const Content = styled(View)({
  gap: '$04',
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

export function QuestDoneModal({
  visible,
  isLoading,
  onClose,
  onDone,
}: QuestDoneModalProps): JSX.Element {
  const userColor = useUserThemeColor();

  return (
    <Modal onClose={onClose} title={t('title.done_quest')} visible={visible}>
      <Content>
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
