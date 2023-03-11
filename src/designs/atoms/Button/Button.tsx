// eslint-disable-next-line eslint-comments/disable-enable-pair
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React, {
  useMemo,
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

const Container = styled(Animated.View)(({
  position: 'relative',
  height: BUTTON_HEIGHT,
}));

const ContentWrapper = styled(View)(({
  disabled,
  hasAdornment,
}: {
  disabled: boolean;
  hasAdornment: boolean;
}) => ({
  justifyContent: 'center',
  width: hasAdornment ? 'auto' : '100%',
  height: '100%',
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
})(({ isLightBackground }: { isLightBackground: boolean }) => ({
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

  const dimStyle = sx({
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: '$md',
    backgroundColor: dimColor,
    opacity: .2,
  });

  const disabledStyle = useMemo(() => {
    return {
      cap: sx({ borderColor: '$text_tertiary' }),
      shadow: sx({ backgroundColor: '$text_tertiary' })
    };
  }, [sx]);

  const renderChildren = (): ReactNode => {
    const content = typeof children === 'string' ? (
      <Label isLightBackground={isLightBackground}>
        {children}
      </Label>
    ) : children;

    return (
      <ContentWrapper
        disabled={disabled}
        hasAdornment={Boolean(leftAdornment || rightAdornment)}
      >
        {content}
      </ContentWrapper>
    );
  };

  return (
    <Container
      accessibilityHint={accessibilityHint ?? accessibilityLabel}
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      accessibilityState={{ disabled }}
      accessible
      style={containerStyle}
      {...(disabled ? null : responder.panHandlers)}
    >
      <Shadow style={disabled ? disabledStyle.shadow : undefined} />
      <Animated.View style={[
        capStyle,
        animatedCapStyle,
        style,
        disabled ? disabledStyle.cap : undefined
      ]}>
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
