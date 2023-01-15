import React from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { styled, useSx, View, Text } from 'dripsy';
import { isLight } from 'src/themes/utils';
import { useAnimatedStyleWithGesture } from './hooks';
import { BORDER_WIDTH, BUTTON_HEIGHT, PRESS_DEPTH } from './constants';

import type { ViewStyle, ViewProps } from 'react-native';
import type { colors } from 'src/themes/colors';

type AccessibilityProps = Pick<
  ViewProps,
  'accessibilityHint' | 'accessibilityLabel' | 'accessibilityState'
>;

export interface ButtonProps extends AccessibilityProps {
  label: string;
  color: keyof typeof colors;
  active?: boolean;
  disableHaptic?: boolean;
  disableLongPress?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Container = styled(View)({
  position: 'relative',
  height: BUTTON_HEIGHT,
});

const Shadow = styled(View)({
  position: 'absolute',
  left: 0,
  bottom: -PRESS_DEPTH,
  width: '100%',
  height: '100%',
  backgroundColor: '$text_primary',
  borderRadius: '$md',
});

export function Button ({
  label,
  color,
  containerStyle,
  disableHaptic = false,
  disableLongPress = false,
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  onPress,
  onLongPress,
}: ButtonProps): JSX.Element {
  const sx = useSx();
  const {
    pressGesture,
    longPressGesture,
    capStyle: animatedCapStyle,
    dimStyle: animatedDimStyle,
  } = useAnimatedStyleWithGesture({
    disableHaptic,
    disableLongPress,
    onPress,
    onLongPress
  });
  const isLightColor = isLight(color);
  const labelVariant = isLightColor ? 'primary' : 'white';
  const dimColor = isLightColor ? '$black' : '$white';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const capStyle = sx({
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    borderRadius: '$md',
    borderWidth: BORDER_WIDTH,
    borderColor: '$text_primary',
    backgroundColor: color,
  });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const dimStyle = sx({
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: '$md',
    backgroundColor: dimColor,
    opacity: .2,
  });

  return (
    <GestureDetector gesture={longPressGesture}>
      <GestureDetector gesture={pressGesture}>
        <Container
          accessibilityHint={accessibilityHint ?? accessibilityLabel}
          accessibilityLabel={accessibilityLabel}
          accessibilityRole="button"
          accessibilityState={accessibilityState}
          accessible
          style={containerStyle}
        >
          <Shadow />
          <Animated.View style={[capStyle, animatedCapStyle]}>
            <Text variants={[labelVariant, 'h2']}>{label}</Text>
          </Animated.View>
          <Animated.View style={[dimStyle, animatedDimStyle]} />
        </Container>
      </GestureDetector>
    </GestureDetector>
  );
}
