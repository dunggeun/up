import React, { useEffect, useRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import type { colors } from 'src/themes/colors';

type ViewProps = ComponentPropsWithoutRef<typeof View>;

export interface ProgressBarProps extends Partial<ViewProps> {
  value: number;
  color: keyof typeof colors;
  max: number;
}

const BORDER_WIDTH = 2;

const Container = styled(View)({
  position: 'relative',
  height: 16,
  borderRadius: '$full',
  borderWidth: BORDER_WIDTH,
  borderColor: '$border',
  backgroundColor: '$white',
  overflow: 'hidden',
});

const styles = StyleSheet.create({
  barDefault: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
  },
});

const calculatePercent = (value: number, max: number): number =>
  Math.min(Math.max(0, (value / max) * 100), 100);

export function ProgressBar({
  value,
  max,
  color,
  ...restProps
}: ProgressBarProps): JSX.Element {
  const { theme } = useDripsyTheme();
  const widthAnimation = useRef(new Animated.Value(0)).current;
  const barColorStyle = { backgroundColor: theme.colors[color] };

  useEffect(() => {
    Animated.timing(widthAnimation, {
      toValue: calculatePercent(value, max),
      useNativeDriver: false,
    }).start();
  }, [widthAnimation, value, max]);

  const animatedStyle = {
    width: widthAnimation.interpolate({
      inputRange: [0, 100],
      outputRange: ['0%', '100%'],
    }),
  };

  return (
    <Container
      accessibilityRole="progressbar"
      accessibilityValue={{ min: 0, max, now: value }}
      {...restProps}
    >
      <Animated.View
        style={[styles.barDefault, barColorStyle, animatedStyle]}
      />
    </Container>
  );
}
