import { useRef, useEffect, type ComponentProps } from 'react';
import {
  Animated,
  PanResponder,
  type PanResponderInstance
} from 'react-native';
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

type AnimatedStyle = ComponentProps<typeof Animated.View>['style'];

enum AnimateState {
  ACTIVE = 1,
  INACTIVE = 0
}

export const useAnimatedStyleWithGesture = ({
  disableHaptic,
  disableLongPress,
  onPress,
  onLongPress,
}: AnimatedStyleWithGestureConfig): {
  responder: PanResponderInstance;
  capStyle: AnimatedStyle;
  dimStyle: AnimatedStyle;
} => {
  const timeoutRef = useRef<NodeJS.Timeout>();
  const isLongPressRef = useRef(false);
  const capPosition = useRef(new Animated.Value(0)).current;
  const dimSize = useRef(new Animated.Value(0)).current;
  const optionsRef = useRef({ disableHaptic, disableLongPress, onPress, onLongPress });

  useEffect(() => {
    optionsRef.current = {
      disableHaptic,
      disableLongPress,
      onPress,
      onLongPress,
    };
  }, [disableHaptic, disableLongPress, onPress, onLongPress]);

  const applyTapAnimation = (): void => {
    capPosition.setValue(PRESS_DEPTH);
  };

  const applyLongTapAnimation = (): void => {
    Animated.timing(dimSize, {
      toValue: AnimateState.ACTIVE,
      useNativeDriver: false,
      delay: LONG_PRESS_DELAY,
      duration: LONG_PRESS_DURATION - LONG_PRESS_DELAY,
    }).start();
  };

  const releaseAnimations = (): void => {
    clearTimeout(timeoutRef.current);
    Animated.parallel([
      Animated.timing(capPosition, {
        useNativeDriver: false,
        duration: RELEASE_DURATION,
        toValue: AnimateState.INACTIVE,
      }),
      Animated.timing(dimSize, {
        useNativeDriver: false,
        duration: RELEASE_DURATION,
        toValue: AnimateState.INACTIVE,
      }),
    ]).start();
  };

  const triggerPressHandler = (): void => {
    // eslint-disable-next-line @typescript-eslint/no-shadow
    const { onPress, onLongPress } = optionsRef.current;
    isLongPressRef.current ? onLongPress?.() : onPress?.();
    isLongPressRef.current = false;
  };

  const responder = useRef(
    PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderTerminate: () => releaseAnimations(),
      onPanResponderGrant: () => {
        // eslint-disable-next-line @typescript-eslint/no-shadow
        const { disableHaptic, disableLongPress } = optionsRef.current;
        !disableHaptic && triggerHaptic('impactLight');
        applyTapAnimation();

        if (disableLongPress) return;

        clearTimeout(timeoutRef.current);
        timeoutRef.current = setTimeout(() => {
          isLongPressRef.current = true;
          !disableHaptic && triggerHaptic('rigid');
        }, LONG_PRESS_DURATION);
        applyLongTapAnimation();
      },
      onPanResponderRelease: () => {
        releaseAnimations();
        triggerPressHandler();
      },
    }),
  ).current;

  const capStyle = { marginTop: capPosition };
  const dimStyle = {
    marginTop: capPosition,
    width: dimSize.interpolate({
      inputRange: [AnimateState.INACTIVE, AnimateState.ACTIVE],
      outputRange: ['0%', '100%'],
    }),
  };

  return { responder, capStyle, dimStyle };
};
