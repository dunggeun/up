import React, {
  forwardRef,
  useRef,
  useMemo,
  type PropsWithChildren,
  type ReactNode,
  type ForwardedRef,
} from 'react';
import {
  Pressable,
  Animated,
  type View as RNView,
  type ViewStyle,
  type ViewProps,
} from 'react-native';
import { styled, View, Text } from 'dripsy';
import { presets } from 'src/themes';
import { isLight } from 'src/themes/utils';
import { HIT_SLOP, PRESSABLE_DEPTH } from 'src/constants';
import { HapticFeedback, type HapticFeedbackProps } from 'src/components';
import {
  BUTTON_HEIGHT,
  LONG_PRESS_DURATION,
  LONG_PRESS_DELAY,
} from './constants';
import { useButtonAnimation } from './hooks';
import type { colors } from 'src/themes/colors';

type AccessibilityProps = Pick<
  ViewProps,
  'accessibilityHint' | 'accessibilityLabel'
>;

export interface ButtonProps
  extends Pick<HapticFeedbackProps, 'disableHaptic'>,
    AccessibilityProps {
  color: keyof typeof colors;
  disabled?: boolean;
  disableLongPress?: boolean;
  style?: ViewStyle;
  containerStyle?: ViewStyle;
  leftAdornment?: React.ReactElement | null;
  rightAdornment?: React.ReactElement | null;
  onPressIn?: () => void;
  onPress?: () => void;
  onLongPress?: () => void;
}

const Container = styled(Pressable)({
  position: 'relative',
  height: BUTTON_HEIGHT,
});

const ContentWrapper = styled(View)(
  ({
    disabled,
    hasAdornment,
  }: {
    disabled: boolean;
    hasAdornment: boolean;
  }) => ({
    justifyContent: 'center',
    width: hasAdornment ? 'auto' : '100%',
    height: '100%',
    opacity: disabled ? 0.5 : 1,
  }),
);

const Shadow = styled(View)(({ disabled }: Pick<ButtonProps, 'disabled'>) =>
  presets.buttonShadow(
    disabled
      ? {
          backgroundColor: '$border_disabled',
        }
      : undefined,
  ),
);

const Cap = styled(Animated.View)(
  ({ color, disabled }: Pick<ButtonProps, 'color' | 'disabled'>) =>
    presets.buttonCap(
      disabled
        ? {
            borderColor: '$border_disabled',
            backgroundColor: `${color}_disabled`,
          }
        : { backgroundColor: color },
    ),
);

const DimWrapper = styled(View)({
  position: 'absolute',
  top: 0,
  bottom: -PRESSABLE_DEPTH,
  left: 0,
  right: 0,
  borderRadius: '$md',
  overflow: 'hidden',
});

const Dim = styled(Animated.View)(
  ({ isLightBackground }: { isLightBackground: boolean }) => ({
    position: 'absolute',
    left: 0,
    height: '100%',
    borderRadius: '$md',
    backgroundColor: isLightBackground ? '$black' : '$white',
    opacity: 0.2,
  }),
);

const Label = styled(Text, {
  defaultVariant: 'text.h2',
})(({ isLightBackground }: { isLightBackground: boolean }) => ({
  color: isLightBackground ? '$text_primary' : '$white',
  textAlign: 'center',
}));

export const Button = forwardRef(function Button(
  {
    children,
    color,
    style,
    containerStyle,
    disabled = false,
    disableLongPress = false,
    disableHaptic = false,
    leftAdornment,
    rightAdornment,
    accessibilityHint,
    accessibilityLabel,
    onPress,
    onPressIn,
    onLongPress,
  }: PropsWithChildren<ButtonProps>,
  ref: ForwardedRef<RNView>,
): JSX.Element {
  const isLongPress = useRef(false);
  const longPressTimerRef = useRef<NodeJS.Timer>();
  const { capStyle, dimStyle, ...animationControls } = useButtonAnimation();

  const reset = (): void => {
    clearTimeout(longPressTimerRef.current);
    isLongPress.current = false;
    animationControls.reset();
  };

  const handlePress = (): void => {
    if (isLongPress.current) return;
    onPress?.();
  };

  const handleLongPress = (): void => {
    if (disableLongPress) return;
    reset();
    onLongPress?.();
  };

  const handlePressIn = (): void => {
    animationControls.press();
    onPressIn?.();

    if (disableLongPress) return;

    longPressTimerRef.current = setTimeout(() => {
      isLongPress.current = true;
      animationControls.longPress();
    }, LONG_PRESS_DELAY);
  };

  const handlePressOut = (): void => {
    reset();
  };

  const isLightBackground = useMemo(() => isLight(color), [color]);

  const renderChildren = (): ReactNode => {
    const hasAdornment =
      leftAdornment !== undefined || rightAdornment !== undefined;

    return (
      <ContentWrapper disabled={disabled} hasAdornment={hasAdornment}>
        {typeof children === 'string' ? (
          <Label isLightBackground={isLightBackground}>{children}</Label>
        ) : (
          children
        )}
      </ContentWrapper>
    );
  };

  return (
    <HapticFeedback
      disableHaptic={disableHaptic}
      pressFeedbackType="buttonPress"
    >
      <Container
        accessibilityHint={accessibilityHint ?? accessibilityLabel}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessible
        delayLongPress={LONG_PRESS_DURATION}
        disabled={disabled}
        hitSlop={HIT_SLOP}
        onLongPress={handleLongPress}
        onPress={handlePress}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        ref={ref}
        style={containerStyle}
      >
        <Shadow disabled={disabled} />
        <Cap color={color} disabled={disabled} style={[style, capStyle]}>
          {leftAdornment}
          {renderChildren()}
          {rightAdornment}
        </Cap>
        <DimWrapper>
          <Dim isLightBackground={isLightBackground} style={dimStyle} />
        </DimWrapper>
      </Container>
    </HapticFeedback>
  );
});
