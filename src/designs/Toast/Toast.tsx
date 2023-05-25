import React from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled, useSx, Pressable } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';

export interface ToastProps {
  content: React.ReactElement | null;
  onPress?: () => void;
}

const TOAST_ANIMATE_HEIGHT = -100;

const ToastContent = styled(Pressable)({
  alignSelf: 'center',
  padding: '$04',
  borderRadius: '$full',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: '$white',
});

export function Toast({ content, onPress }: ToastProps): React.ReactElement {
  const { top } = useSafeAreaInsets();
  const sx = useSx();

  const containerStyle = sx({
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    justifyContent: 'center',
    padding: '$02',
    marginTop: top,
    zIndex: 5,
    elevation: 5,
  });

  return (
    <AnimatePresence exitBeforeEnter>
      {content ? (
        <MotiView
          animate={{ translateY: 0 }}
          exit={{ translateY: TOAST_ANIMATE_HEIGHT - top }}
          from={{ translateY: TOAST_ANIMATE_HEIGHT - top }}
          pointerEvents="box-none"
          style={containerStyle}
        >
          <ToastContent onPress={onPress}>{content}</ToastContent>
        </MotiView>
      ) : null}
    </AnimatePresence>
  );
}
