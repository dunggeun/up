import React, {
  type PropsWithChildren,
  type ReactNode
} from 'react';
import { Animated, type ViewStyle, type ViewProps } from 'react-native';
import { styled, useSx, View, Text } from 'dripsy';
import { isLight } from 'src/themes/utils';
import { useAnimatedStyleWithGesture } from './hooks';
import { BORDER_WIDTH, BUTTON_HEIGHT, PRESS_DEPTH } from './constants';

import type { colors } from 'src/themes/colors';

type AccessibilityProps = Pick<ViewProps, 'accessibilityHint' | 'accessibilityLabel'>;

export interface ButtonProps extends AccessibilityProps {
  color: keyof typeof colors;
  disabled?: boolean;
  disableHaptic?: boolean;
  disableLongPress?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  leftAdornment?: React.ReactElement,
  rightAdornment?: React.ReactElement,
  onPress?: () => void;
  onLongPress?: () => void;
}

const Container = styled(Animated.View)(({ disabled }: { disabled: boolean }) => ({
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

const DimContainer = styled(View)({
  position: 'absolute',
  top: 0,
  bottom: -PRESS_DEPTH,
  left: 0,
  right: 0,
  borderRadius: '$md',
  overflow: 'hidden',
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

export function Button ({
  children,
  color,
  style,
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
}: PropsWithChildren<ButtonProps>): JSX.Element {
  const sx = useSx();
  const {
    responder,
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

  const renderChildren = (): ReactNode => {
    if (typeof children === 'string') {
      return (
        <Label
          hasAdornment={Boolean(leftAdornment || rightAdornment)}
          isLightBackground={isLightBackground}
        >
          {children}
        </Label>
      );
    } 
    return children;
  };

  return (
    <Container
      accessibilityHint={accessibilityHint ?? accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessible
      disabled={disabled}
      style={containerStyle}
      {...responder.panHandlers}
    >
      <Shadow />
      <Animated.View style={[capStyle, style, animatedCapStyle]}>
        {leftAdornment ? leftAdornment : null}
        {renderChildren()}
        {rightAdornment ? rightAdornment : null}
      </Animated.View>
      <DimContainer>
        <Animated.View style={[dimStyle, animatedDimStyle]} />
      </DimContainer>
    </Container>
  );
}
