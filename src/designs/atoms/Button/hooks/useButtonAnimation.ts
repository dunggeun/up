import { useRef } from 'react';
import { Animated, type ViewStyle } from 'react-native';
import { PRESSABLE_DEPTH } from 'src/constants';
import {
  LONG_PRESS_DELAY,
  LONG_PRESS_DURATION,
  RELEASE_DURATION,
} from '../constants';

enum ButtonAnimateState {
  ACTIVE = 1,
  INACTIVE = 0,
}

interface ButtonAnimations {
  reset: () => void;
  press: () => void;
  longPress: () => void;
  capStyle: Animated.WithAnimatedObject<ViewStyle>;
  dimStyle: Animated.WithAnimatedObject<ViewStyle>;
}

export const useButtonAnimation = (): ButtonAnimations => {
  const capPosition = useRef(new Animated.Value(0)).current;
  const dimSize = useRef(new Animated.Value(0)).current;
  const dimAnimationRef = useRef<Animated.CompositeAnimation | null>();
  const releaseAnimationRef = useRef<Animated.CompositeAnimation | null>();

  const reset = (): void => {
    dimAnimationRef.current?.stop();
    releaseAnimationRef.current = Animated.parallel([
      Animated.timing(capPosition, {
        toValue: ButtonAnimateState.INACTIVE,
        useNativeDriver: false,
        duration: RELEASE_DURATION,
      }),
      Animated.timing(dimSize, {
        toValue: ButtonAnimateState.INACTIVE,
        useNativeDriver: false,
        duration: RELEASE_DURATION,
      }),
    ]);

    releaseAnimationRef.current.start(() => {
      releaseAnimationRef.current = null;
    });
  };

  const press = (): void => {
    capPosition.setValue(PRESSABLE_DEPTH);
  };

  const longPress = (): void => {
    const dimAnimation = Animated.timing(dimSize, {
      toValue: ButtonAnimateState.ACTIVE,
      useNativeDriver: false,
      duration: LONG_PRESS_DURATION - LONG_PRESS_DELAY,
    });
    dimAnimation.start();
    dimAnimationRef.current = dimAnimation;
  };

  const animatedCapStyle = { marginTop: capPosition };
  const animatedDimStyle = {
    marginTop: capPosition,
    width: dimSize.interpolate({
      inputRange: [ButtonAnimateState.INACTIVE, ButtonAnimateState.ACTIVE],
      outputRange: ['0%', '100%'],
    }),
  };

  return {
    reset,
    press,
    longPress,
    capStyle: animatedCapStyle,
    dimStyle: animatedDimStyle,
  };
};
