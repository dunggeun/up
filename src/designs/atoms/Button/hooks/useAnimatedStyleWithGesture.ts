import { useMemo } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import {
  Gesture,
  type TapGesture,
  type ExclusiveGesture
} from 'react-native-gesture-handler';
import {
  useSharedValue,
  useAnimatedStyle,
  withDelay,
  withTiming,
  runOnJS
} from 'react-native-reanimated';
import { triggerHaptic } from 'src/utils';
import {
  PRESS_DEPTH,
  LONG_PRESS_DELAY,
  LONG_PRESS_DURATION,
  RELEASE_DURATION
} from '../constants';

interface AnimatedStyleWithGestureConfig {
  disableHaptic: boolean;
  disableLongPress: boolean;
  onPress?: () => void;
  onLongPress?: () => void;
}

export const useAnimatedStyleWithGesture = ({
  disableHaptic,
  disableLongPress,
  onPress,
  onLongPress,
}: AnimatedStyleWithGestureConfig): {
  gesture: TapGesture | ExclusiveGesture,
  capStyle: ViewStyle,
  dimStyle: ViewStyle,
} => {
  const capPosition = useSharedValue(0);
  const dimPosition = useSharedValue(0);
  const capStyle = useAnimatedStyle(() => ({ top: capPosition.value }));
  const dimStyle = useAnimatedStyle(() => ({ top: capPosition.value, width: `${dimPosition.value}%` }));

  const pressGesture = useMemo(() => {
    const release = (): void => {
      'worklet';
      capPosition.value = withTiming(0, { duration: RELEASE_DURATION });
    };

    return (
      Gesture.Tap()
        .onStart(() => {
          // Haptic feedback on only iOS
          Platform.OS === 'ios' && !disableHaptic && runOnJS(triggerHaptic)();
          capPosition.value = PRESS_DEPTH;
        })
        .onTouchesUp(release)
        .onTouchesCancelled(release)
        .onEnd(() => {
          release();
          onPress && runOnJS(onPress)();
        })
    );
  }, [capPosition, disableHaptic, onPress]);

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
      .onStart(() => {
        Platform.OS === 'ios' && !disableHaptic && runOnJS(triggerHaptic)();
        onLongPress && runOnJS(onLongPress)();
        capPosition.value = PRESS_DEPTH;
      })
      .onEnd(() => {
        capPosition.value = withTiming(0, { duration: RELEASE_DURATION });
      })
      .onFinalize(() => {
        dimPosition.value = withTiming(0, { duration: RELEASE_DURATION });
      })
  ), [capPosition, dimPosition, disableHaptic, onLongPress]);

  const gesture = useMemo(() => (
    disableLongPress
      ? pressGesture
      : Gesture.Exclusive(pressGesture, longPressGesture)
  ), [pressGesture, longPressGesture, disableLongPress]);

  return { gesture, capStyle, dimStyle };
};
