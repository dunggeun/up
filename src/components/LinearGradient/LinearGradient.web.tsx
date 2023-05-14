import React from 'react';
import { View } from 'react-native';
import { styled } from 'dripsy';
import type { LinearGradientProps } from './types';

const Container = styled(View)({ flex: 1 });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getGradientStyle = (color: string, degree: number): any => {
  return {
    backgroundColor: color,
    background: `linear-gradient(${degree}deg, rgba(0,0,0,0), ${color})`,
  };
};

export function LinearGradient({
  color,
  direction,
  style,
}: LinearGradientProps): React.ReactElement {
  return (
    <Container
      style={[
        getGradientStyle(color, direction === 'to-down' ? 0 : 180),
        style,
      ]}
    />
  );
}
