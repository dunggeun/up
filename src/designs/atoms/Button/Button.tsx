import React, { useEffect, useMemo } from 'react';
import { Platform } from 'react-native';
import { GestureDetector, Gesture } from 'react-native-gesture-handler';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';
import { styled, useSx, View, Text } from 'dripsy';
import Haptic from 'react-native-haptic-feedback';
import { isLight } from 'src/themes/utils';

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
  haptic?: boolean;
  containerStyle?: ViewStyle;
  onPress?: () => void;
  onLongPress?: () => void;
}

const HEIGHT = 56;
const BORDER_WIDTH = 2;
const DEPTH = 5;
const RELEASE_DURATION = 100;
const LONG_PRESS_DURATION = 500;
const LONG_PRESS_DELAY = 200;

const Container = styled(View)({
  position: 'relative',
  height: HEIGHT,
});

const Shadow = styled(View)({
  position: 'absolute',
  left: 0,
  bottom: -DEPTH,
  width: '100%',
  height: '100%',
  backgroundColor: '$text_primary',
  borderRadius: '$md',
});

function triggerHaptic (): void {
  Haptic.trigger('impactMedium');
}

export function Button ({
  label,
  color,
  containerStyle,
  active,
  haptic = true,
  accessibilityHint,
  accessibilityLabel,
  accessibilityState,
  onPress,
  onLongPress,
}: ButtonProps): JSX.Element {
  const sx = useSx();
  const capPosition = useSharedValue(0);
  const dimPosition = useSharedValue(0);
  const capAnimatedStyle = useAnimatedStyle(() => ({ top: capPosition.value }));
  const dimAnimatedStyle = useAnimatedStyle(() => ({ top: capPosition.value, width: `${dimPosition.value}%` }));
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

  const longPressGesture = useMemo(() => (
    Gesture
      .LongPress()
      .minDuration(LONG_PRESS_DURATION)
      .onBegin(() => {
        dimPosition.value = withDelay(
          LONG_PRESS_DELAY,
          withTiming(100, {
            duration: LONG_PRESS_DURATION - LONG_PRESS_DELAY
          })
        );
      })
      .onStart(() => onLongPress && runOnJS(onLongPress)())
      .onEnd(() => {
        capPosition.value = withTiming(0, { duration: RELEASE_DURATION });
      })
      .onFinalize(() => {
        dimPosition.value = withTiming(0, { duration: RELEASE_DURATION });
      })
  ), [capPosition, dimPosition, onLongPress]);

  const pressGesture = useMemo(() => (
    Gesture.Tap()
      .onTouchesDown(() => {
        // Haptic feedback on only iOS
        Platform.OS === 'ios' && haptic && runOnJS(triggerHaptic)();
        capPosition.value = DEPTH;
      })
      .onTouchesUp(() => {
        capPosition.value = withTiming(0, { duration: RELEASE_DURATION });
      })
      .onEnd(() => onPress && runOnJS(onPress)())
  ), [capPosition, haptic, onPress]);

  useEffect(() => {
    capPosition.value = active ? DEPTH : 0;
  }, [capPosition, active]);

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
          <Animated.View style={[capStyle, capAnimatedStyle]}>
            <Text variants={[labelVariant, 'h2']}>{label}</Text>
          </Animated.View>
          <Animated.View style={[dimStyle, dimAnimatedStyle]} />
        </Container>
      </GestureDetector>
    </GestureDetector>
  );
}
