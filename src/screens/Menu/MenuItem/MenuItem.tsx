import React from 'react';
import { styled } from 'dripsy';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { H2, Text } from 'src/designs';

export interface MenuItemProps {
  label: string;
  subLabel?: string;
  onPress?: () => void;
}

const Container = styled(TouchableOpacity)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$04',
});

export function MenuItem ({
  label,
  subLabel,
  onPress,
}: MenuItemProps): JSX.Element {
  return (
    <Container onPress={onPress}>
      <H2 variant="primary">{label}</H2>
      {typeof subLabel === 'string' ? (
        <Text variant="secondary">{subLabel}</Text>
      ): null}
    </Container>
  );
};
