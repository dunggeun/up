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
  RELEASE_DURATION,
} from './constants';
import type { colors } from 'src/themes/colors';

type AccessibilityProps = Pick<
  ViewProps,
  'accessibilityHint' | 'accessibilityLabel'
>;

enum ButtonAnimateState {
  ACTIVE = 1,
  INACTIVE = 0,
}

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
  const capPosition = useRef(new Animated.Value(0)).current;
  const dimSize = useRef(new Animated.Value(0)).current;
  const dimAnimationRef = useRef<Animated.CompositeAnimation | null>();
  const releaseAnimationRef = useRef<Animated.CompositeAnimation | null>();

  const initialize = (): void => {
    dimAnimationRef.current = null;
  };

  const reset = (): void => {
    clearTimeout(longPressTimerRef.current);
    dimAnimationRef.current?.stop();
    isLongPress.current = false;

    if (releaseAnimationRef.current) return;

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

  const applyPressAnimation = (): void => {
    capPosition.setValue(5);
  };

  const applyLongPressAnimation = (): void => {
    const dimAnimation = Animated.timing(dimSize, {
      toValue: ButtonAnimateState.ACTIVE,
      useNativeDriver: false,
      duration: LONG_PRESS_DURATION - LONG_PRESS_DELAY,
    });
    dimAnimation.start();
    dimAnimationRef.current = dimAnimation;
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
    initialize();
    applyPressAnimation();
    onPressIn?.();

    if (disableLongPress) return;

    longPressTimerRef.current = setTimeout(() => {
      isLongPress.current = true;
      applyLongPressAnimation();
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

  const animatedCapStyle = { marginTop: capPosition };
  const animatedDimStyle = {
    marginTop: capPosition,
    width: dimSize.interpolate({
      inputRange: [ButtonAnimateState.INACTIVE, ButtonAnimateState.ACTIVE],
      outputRange: ['0%', '100%'],
    }),
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
        <Cap
          color={color}
          disabled={disabled}
          style={[style, animatedCapStyle]}
        >
          {leftAdornment}
          {renderChildren()}
          {rightAdornment}
        </Cap>
        <DimWrapper>
          <Dim isLightBackground={isLightBackground} style={animatedDimStyle} />
        </DimWrapper>
      </Container>
    </HapticFeedback>
  );
});
