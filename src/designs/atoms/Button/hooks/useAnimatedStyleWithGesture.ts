import { useMemo } from 'react';
import { Platform, type ViewStyle } from 'react-native';
import {
  Gesture,
  type TapGesture,
  type LongPressGesture
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
  pressGesture: TapGesture,
  longPressGesture: LongPressGesture,
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
        .onTouchesDown(() => {
          // Haptic feedback on only iOS
          Platform.OS === 'ios' && !disableHaptic && runOnJS(triggerHaptic)();
          capPosition.value = PRESS_DEPTH;
        })
        .onTouchesUp(release)
        .onTouchesCancelled(release)
        .onEnd(() => onPress && runOnJS(onPress)())
    );
  }, [capPosition, disableHaptic, onPress]);

  const longPressGesture = useMemo(() => {
    const gesture = Gesture
      .LongPress()
      .minDuration(LONG_PRESS_DURATION);
    
    if (!disableLongPress) {
      gesture.onBegin(() => {
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
      });
    }

    return gesture;
  }, [capPosition, dimPosition, disableLongPress, onLongPress]);

  return { pressGesture, longPressGesture, capStyle, dimStyle };
};
