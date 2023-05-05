import React from 'react';
import { styled, View } from 'dripsy';
import { Modal } from 'src/components';
import { Button, Text } from 'src/designs';
import { Warning } from 'src/assets/symbols';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

export interface DeleteConfirmModalProps extends Omit<ModalProps, 'title'> {
  onDelete: () => void;
}

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

export function DeleteConfirmModal({
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
        <Button color="$red" onLongPress={onDelete}>
          {t('label.reset_confirm')}
        </Button>
      </Content>
    </Modal>
  );
}
