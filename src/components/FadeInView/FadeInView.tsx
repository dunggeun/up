import { useRef, useCallback, type PropsWithChildren } from 'react';
import { Animated, type ViewStyle } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styled } from 'dripsy';
import { USE_NATIVE_DRIVER } from 'src/constants';

interface FadeInViewProps {
  style?: ViewStyle;
}

const FADE_DURATION = 250;

const StyledAnimatedView = styled(Animated.View)({ flex: 1 });

export function FadeInView({
  children,
  style,
}: PropsWithChildren<FadeInViewProps>): JSX.Element {
  const opacityAnimation = useRef(new Animated.Value(0)).current;

  useFocusEffect(
    useCallback(() => {
      Animated.timing(opacityAnimation, {
        toValue: 1,
        duration: FADE_DURATION,
        useNativeDriver: USE_NATIVE_DRIVER,
      }).start();

      return () => opacityAnimation.setValue(0);
    }, [opacityAnimation]),
  );

  return (
    <StyledAnimatedView
      needsOffscreenAlphaCompositing
      style={[{ opacity: opacityAnimation }, style]}
    >
      {children}
    </StyledAnimatedView>
  );
}
