import React from 'react';
import { styled, View } from 'dripsy';
import { Text } from 'src/designs';
import { LoadingIndicator, Modal, type ModalProps } from 'src/components';
import { t } from 'src/translations';
import { UserCoverWebView } from '../UserCoverWebView/UserCoverWebView';
import type { User } from '../../types';

export interface ShareModalProps extends Omit<ModalProps, 'title'> {
  user: User;
  onReady: (imageData: string) => void;
}

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function ShareModal({
  user,
  visible,
  onClose,
  onReady,
}: ShareModalProps): React.ReactElement {
  return (
    <Modal onClose={onClose} title={t('label.share')} visible={visible}>
      <Content testID="share-modal">
        <LoadingIndicator />
        <Message variant="text.primary">
          {t('message.image_generating')}
        </Message>
      </Content>
      <UserCoverWebView onGenerated={onReady} user={user} />
    </Modal>
  );
}
