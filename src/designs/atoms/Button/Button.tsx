import React, { type ComponentPropsWithoutRef } from 'react';
import { GestureDetector } from 'react-native-gesture-handler';
import Animated from 'react-native-reanimated';
import { styled, useSx, View, Text } from 'dripsy';
import { isLight } from 'src/themes/utils';
import { useAnimatedStyleWithGesture } from './hooks';
import { BORDER_WIDTH, BUTTON_HEIGHT, PRESS_DEPTH } from './constants';

import type { ViewStyle, ViewProps } from 'react-native';
import type { colors } from 'src/themes/colors';

type AccessibilityProps = Pick<ViewProps, 'accessibilityHint' | 'accessibilityLabel'>;

export interface ButtonProps extends AccessibilityProps {
  label: string;
  color: keyof typeof colors;
  disabled?: boolean;
  disableHaptic?: boolean;
  disableLongPress?: boolean;
  containerStyle?: ViewStyle;
  leftAdornment?: React.ReactElement,
  rightAdornment?: React.ReactElement,
  onPress?: () => void;
  onLongPress?: () => void;
}

const Container = styled(View)(({ disabled }: { disabled: boolean }) => ({
  position: 'relative',
  height: BUTTON_HEIGHT,
  opacity: disabled ? .5 : 1,
}));

const Shadow = styled(View)({
  position: 'absolute',
  left: 0,
  bottom: -PRESS_DEPTH,
  width: '100%',
  height: '100%',
  backgroundColor: '$text_primary',
  borderRadius: '$md',
});

const Label = styled(Text, { 
  defaultVariant: 'text.h2',
})(({
  isLightBackground,
  hasAdornment,
}: {
  isLightBackground: boolean,
  hasAdornment: boolean;
}) => ({
  width: hasAdornment ? 'auto' : '100%',
  color: isLightBackground ? '$text_primary' : '$white',
  textAlign: 'center',
}));

function ConditionalGestureDetector({
  children,
  disabled,
  ...props
}: ComponentPropsWithoutRef<typeof GestureDetector> & { disabled: boolean }): JSX.Element {
  return disabled ? <>{children}</> : <GestureDetector {...props}>{children}</GestureDetector>;
}

export function Button ({
  label,
  color,
  containerStyle,
  disabled = false,
  disableHaptic = false,
  disableLongPress = false,
  leftAdornment,
  rightAdornment,
  accessibilityHint,
  accessibilityLabel,
  onPress,
  onLongPress,
}: ButtonProps): JSX.Element {
  const sx = useSx();
  const {
    gesture,
    capStyle: animatedCapStyle,
    dimStyle: animatedDimStyle,
  } = useAnimatedStyleWithGesture({
    disableHaptic,
    disableLongPress,
    onPress,
    onLongPress
  });
  const isLightBackground = isLight(color);
  const dimColor = isLightBackground ? '$black' : '$white';

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const capStyle = sx({
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingX: '$04',
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
    <ConditionalGestureDetector disabled={disabled} gesture={gesture}>
      <Container
        accessibilityHint={accessibilityHint ?? accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessible
        disabled={disabled}
        style={containerStyle}
      >
        <Shadow />
        <Animated.View style={[capStyle, animatedCapStyle]}>
          {leftAdornment ? leftAdornment : null}
          <Label
            hasAdornment={Boolean(leftAdornment || rightAdornment)}
            isLightBackground={isLightBackground}
          >
            {label}
          </Label>
          {rightAdornment ? rightAdornment : null}
        </Animated.View>
        <Animated.View style={[dimStyle, animatedDimStyle]} />
      </Container>
    </ConditionalGestureDetector>
  );
}
