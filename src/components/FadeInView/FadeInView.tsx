import { useRef, useCallback } from 'react';
import { Animated } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { styled } from 'dripsy';

import type { PropsWithChildren } from 'react';
import type { ViewStyle } from 'react-native';

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
        useNativeDriver: true,
      }).start();

      return () => {
        Animated.timing(opacityAnimation, {
          toValue: 0,
          duration: FADE_DURATION,
          useNativeDriver: true,
        }).start();
      };
    }, [opacityAnimation]),
  );

  return (
    <StyledAnimatedView style={[{ opacity: opacityAnimation }, style]}>
      {children}
    </StyledAnimatedView>
  );
}
