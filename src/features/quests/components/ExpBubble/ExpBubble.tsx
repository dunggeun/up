import React, { memo, useRef, useEffect } from 'react';
import { Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled } from 'dripsy';
import { WINDOW_WIDTH, BORDER_WIDTH } from 'src/constants';

interface ExpBubbleProps {
  x: number;
  y: number;
  color: string;
}

const BUBBLE_SIZE = 30;

const Bubble = styled(Animated.View)(({ color }: { color: string }) => ({
  position: 'absolute',
  width: BUBBLE_SIZE,
  height: BUBBLE_SIZE,
  borderRadius: 15,
  borderWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: color,
}));

export const ExpBubble = memo(function ExpBubble({ x, y, color }: ExpBubbleProps): JSX.Element {
  const { top } = useSafeAreaInsets();
  const position = useRef(new Animated.ValueXY({ x, y })).current;
  const size = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.timing(size, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(position, {
        toValue: {
          x: WINDOW_WIDTH / 2 - BUBBLE_SIZE / 2,
          y: top + 56,
        },
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(size, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
    ]).start();
  }, [position, size, top]);

  return (
    <Bubble
      color={color}
      style={[{ transform: [{ scale: size }] }, position.getLayout()]}
    />
  );
});
