import React, { useState } from 'react';
import { styled, View, Text, Pressable } from 'dripsy';
import { isLight } from 'src/themes/utils';

import type { ComponentPropsWithRef } from 'react';
import type { ViewStyle, GestureResponderEvent } from 'react-native';
import type { colors } from 'src/themes/colors';

type PressableProps = ComponentPropsWithRef<typeof Pressable>;

export interface ButtonProps extends PressableProps {
  label: string;
  color: keyof typeof colors;
  active?: boolean;
  containerStyle?: ViewStyle;
}

const HEIGHT = 56;
const BORDER_WIDTH = 2;
const DEPTH = 5;

const Container = styled(View)({
  position: 'relative',
  height: HEIGHT,
});

const Shadow = styled(View)({
  position: 'absolute',
  left: 0,
  bottom: -DEPTH,
  width: '100%',
  height: '100%',
  backgroundColor: '$text_primary',
  borderRadius: '$md',
});

const Cap = styled(View)((
  { color, active }: Pick<ButtonProps, 'color'> & { active: boolean }
) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100%',
  height: '100%',
  borderRadius: '$md',
  borderWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: color,
  marginTop: active ? DEPTH : 0,
}));

const StyledPressable = styled(Pressable)({
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  backgroundColor: 'transparent',
});

export function Button ({
  label,
  color,
  containerStyle,
  onPressIn,
  onPressOut,
  ...restProps,
}: ButtonProps): JSX.Element {
  const [isActive, setIsActive] = useState(false);
  const labelVariant = isLight(color) ? 'primary' : 'white';

  const handlePressIn = (event: GestureResponderEvent): void => {
    setIsActive(true);
    onPressIn?.(event);
  };

  const handlePressOut = (event: GestureResponderEvent): void => {
    setIsActive(false);
    onPressOut?.(event);
  };

  return (
    <Container
      style={containerStyle}
    >
      <Shadow />
      <Cap active={isActive} color={color}>
        <Text variants={[labelVariant, 'h2']}>{label}</Text>
      </Cap>
      <StyledPressable
        {...restProps}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      />
    </Container>
  );
}
