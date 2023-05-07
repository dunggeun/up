import React, { useState } from 'react';
import { styled, View } from 'dripsy';
import { Modal } from 'src/components';
import { Button, Input } from 'src/designs';
import { useUserThemeColor } from 'src/features/users';
import { t } from 'src/translations';

import type { ModalProps } from 'src/components';

export interface EnterPasswordModalProps extends Omit<ModalProps, 'title'> {
  onConfirm: (password: string) => void;
}

const Content = styled(View)({
  gap: '$04',
});

export function EnterPasswordModal({
  visible,
  onClose,
  onConfirm,
}: EnterPasswordModalProps): JSX.Element {
  const userColor = useUserThemeColor();
  const [password, setPassword] = useState('');

  const handlePressConfirm = (): void => {
    onConfirm(password);
    setPassword('');
  };

  return (
    <Modal onClose={onClose} title={t('title.password')} visible={visible}>
      <Content testID="enter-password-modal">
        <Input
          onChangeText={setPassword}
          placeholder={t('placeholder.enter_password')}
          secureTextEntry
          value={password}
        />
        <Button
          color={userColor}
          disableLongPress
          disabled={password.length < 5}
          onPress={handlePressConfirm}
        >
          {t('label.ok')}
        </Button>
      </Content>
    </Modal>
  );
}
