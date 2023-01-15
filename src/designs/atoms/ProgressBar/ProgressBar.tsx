import React, { useEffect } from 'react';
import { StyleSheet } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
} from 'react-native-reanimated';

import type { ComponentPropsWithoutRef } from 'react';
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
  borderColor: '$text_primary',
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
  Math.min(Math.max(0, value / max * 100), 100);

export function ProgressBar ({
  value,
  max,
  color,
  ...restProps
}: ProgressBarProps): JSX.Element {
  const { theme } = useDripsyTheme();
  const percent = useSharedValue(calculatePercent(value, max));
  const barWidthStyle = useAnimatedStyle(() => ({ width: `${percent.value}%` }), []);
  const barColorStyle = { backgroundColor: theme.colors[color] };

  useEffect(() => {
    percent.value = withSpring(calculatePercent(value, max));
  }, [percent, value, max]);

  return (
    <Container {...restProps} accessibilityValue={{ min: 0, max, now: value }}>
      <Animated.View style={[styles.barDefault, barColorStyle, barWidthStyle]} />
    </Container>
  );
}
