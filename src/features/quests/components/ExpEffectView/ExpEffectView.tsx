import React, { useRef, useState, useEffect } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { useRecoilState } from 'recoil';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';

import { questItemPosition } from '../../recoil/atoms';
import { ExpBubble } from '../ExpBubble';

interface BubblePositionWithKey {
  key: number;
  x: number;
  y: number;
}

const EffectContainer = styled(View)({
  position: 'absolute',
  width: '100%',
  height: '100%',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
});

export function ExpEffectView (): JSX.Element {
  const [
    bubbleStartPositions,
    setBubbleStartPositions,
  ] = useState<BubblePositionWithKey[]>([]);
  const keyRef = useRef(0);
  const userColor = useUserThemeColor();
  const { top, bottom } = useSafeAreaInsets();
  const [position, setPosition] = useRecoilState(questItemPosition);

  useEffect(() => {
    if (!position) return;

    const xBias = Math.random() * 100 + 50;
    const key = keyRef.current++;

    setBubbleStartPositions((value) => [
      ...value,
      {
        key,
        x: position.x + xBias,
        y: position.y + 15 - top - bottom,
      }
    ]);

    setTimeout(() => {
      setBubbleStartPositions((value) => value.filter((v) => v.key !== key));
    }, 1000);
  }, [position, top, bottom, setPosition]);

  return (
    <EffectContainer pointerEvents="none">
      {bubbleStartPositions.map(({ key, x, y }) => (
        <ExpBubble color={userColor} key={key} x={x} y={y} />
      ))}
    </EffectContainer>
  );
}
