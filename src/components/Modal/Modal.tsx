import React, { memo, type PropsWithChildren } from 'react';
import { Modal as RNModal } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled, View } from 'dripsy';
import { H2 } from 'src/designs';
import { Close } from 'src/assets/icons';
import {
  CONTAINER_MAX_WIDTH,
  TOUCHABLE_OPACITY_HIT_SLOP
} from 'src/constants';

export interface ModalProps {
  title?: string;
  visible?: boolean;
  onClose: () => void;
}

const ModalBackground = styled(View)({
  position: 'relative',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  padding: '$04',
  backgroundColor: 'rgba(0,0,0,0.2)',
});

const ModalContainer = styled(View)({
  width: '100%',
  maxWidth: CONTAINER_MAX_WIDTH,
  height: 'auto',
  padding: '$04',
  borderRadius: '$md',
  borderWidth: 2,
  borderColor: '$text_primary',
  backgroundColor: '$white',
  gap: '$04',
});

const ModalHeader = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  width: '100%',
});

const CloseButton = styled(TouchableOpacity)({
  flex: 1,
  justifyContent: 'center',
});

export const Modal = memo(function Modal (
  {
    children,
    title,
    visible = false,
    onClose,
  }: PropsWithChildren<ModalProps>
): JSX.Element {
  return (
    <RNModal
      animationType="fade"
      transparent
      visible={visible}
    >
      <ModalBackground>
        <ModalContainer>
          <ModalHeader>
            <H2>{title}</H2>
            <CloseButton hitSlop={TOUCHABLE_OPACITY_HIT_SLOP} onPress={onClose}>
              <Close />
            </CloseButton>
          </ModalHeader>
          {children}
        </ModalContainer>
      </ModalBackground>
    </RNModal>
  );
});
