import React, { memo, useState, useEffect } from 'react';
import { styled, useSx, Pressable } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ToastManager } from './ToastManager';

const TOAST_ANIMATE_HEIGHT = -100;

const ToastContent = styled(Pressable)({
  alignSelf: 'center',
  padding: '$04',
  borderRadius: '$full',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: '$white',
});

export const Toast = memo(function Toast() {
  const [content, setContent] = useState<React.ReactNode>(null);
  const { top } = useSafeAreaInsets();
  const sx = useSx();

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
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

  useEffect(() => {
    ToastManager.getInstance().register((content) => {
      setContent(content);
    });
  }, []);

  const handlePressToast = (): void => setContent(null);

  return (
    <AnimatePresence exitBeforeEnter>
      {content ? (
        <MotiView
          animate={{ translateY: 0 }}
          exit={{ translateY: TOAST_ANIMATE_HEIGHT - top }}
          from={{ translateY: TOAST_ANIMATE_HEIGHT - top }}
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
          style={containerStyle}
        >
          <ToastContent onPress={handlePressToast}>{content}</ToastContent>
        </MotiView>
      ) : null}
    </AnimatePresence>
  );
});
