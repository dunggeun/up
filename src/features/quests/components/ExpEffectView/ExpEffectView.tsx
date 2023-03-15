import React, { useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { styled, View } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';
import { useUserThemeColor } from 'src/features/users';
import { WINDOW_WIDTH, BORDER_WIDTH } from 'src/constants';

import { questItemPosition } from '../../recoil/atoms';

interface BubblePosition {
  x: number;
  y: number;
}

const BUBBLE_SIZE = 30;
const EFFECT_DURATION = 300;

const EffectContainer = styled(View)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

const Bubble = styled(MotiView)(({ color }: { color: string }) => ({
  position: 'absolute',
  width: 30,
  height: 30,
  borderRadius: 15,
  borderWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: color,
}));

export function ExpEffectView (): JSX.Element {
  const [
    bubbleStartPosition,
    setBubbleStartPosition,
  ] = useState<BubblePosition>();
  const userColor = useUserThemeColor();
  const { top } = useSafeAreaInsets();
  const [position, setPosition] = useRecoilState(questItemPosition);

  useEffect(() => {
    if (!position) return;

    const xBias = Math.random() * BUBBLE_SIZE * 2;
    const yBias = Math.random() * BUBBLE_SIZE * 2;
    setBubbleStartPosition({ x: position.x + xBias, y: position.y + yBias });

    setTimeout(
      () => setBubbleStartPosition(undefined),
      EFFECT_DURATION * 2,
    );
  }, [position, setPosition]);

  return (
    <EffectContainer pointerEvents="none">
      <AnimatePresence exitBeforeEnter>
        {bubbleStartPosition ? (
          <Bubble
            animate={{
              scale: [1, 0],
              opacity: 1,
              top: top + 56,
              left: WINDOW_WIDTH / 2 - BUBBLE_SIZE / 2,
            }}
            color={userColor}
            from={{
              scale: 0,
              opacity: 0,
              left: bubbleStartPosition.x,
              top: bubbleStartPosition.y,
            }}
            transition={{
              type: 'timing',
              duration: EFFECT_DURATION,
            }}
          />
        ) : null}
      </AnimatePresence>
    </EffectContainer>
  );
}
