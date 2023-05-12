import React from 'react';
import { TouchableOpacity } from 'react-native';
import { styled } from 'dripsy';
import { MotiView } from 'moti';
import { H2 } from '../../designs/atoms/H2';
import { Text } from '../../designs/atoms/Text';

export interface ListItemProps {
  label: string;
  subLabel?: string;
  animate?: boolean;
  animateDelay?: number;
  onPress?: () => void;
}

const Container = styled(TouchableOpacity)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$04',
});

export function ListItem({
  label,
  subLabel,
  animate,
  animateDelay = 0,
  onPress,
}: ListItemProps): JSX.Element {
  const animatable = (component: JSX.Element): JSX.Element => {
    if (animate) {
      return (
        <MotiView
          animate={{
            opacity: 1,
            scale: 1,
            translateY: 0,
          }}
          delay={animateDelay}
          from={{
            opacity: 0,
            scale: 0.8,
            translateY: 20,
          }}
          transition={{
            type: 'timing',
          }}
        >
          {component}
        </MotiView>
      );
    }
    return component;
  };

  return animatable(
    <Container
      accessibilityHint={label}
      accessibilityLabel={label}
      accessibilityValue={{ text: subLabel }}
      disabled={!onPress}
      onPress={onPress}
    >
      <H2 variant="primary">{label}</H2>
      {typeof subLabel === 'string' ? (
        <Text variant="secondary">{subLabel}</Text>
      ) : null}
    </Container>,
  );
}
