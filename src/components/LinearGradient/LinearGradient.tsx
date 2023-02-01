import { styled } from 'dripsy';
import React from 'react';
import { View, type ViewStyle } from 'react-native';
// eslint-disable-next-line import/no-named-as-default
import Svg, {
  Rect,
  LinearGradient as SVGLinearGradient,
  Stop
} from 'react-native-svg';

export interface LinearGradient {
  style?: ViewStyle;
  color: string;
  rotate?: number;
  fromOpacity?: number;
  toOpacity?: number;
}

const Container = styled(View)({ flex: 1 });

export function LinearGradient({
  style,
  color,
  rotate = 0,
  fromOpacity = 1,
  toOpacity = 1
}: LinearGradient): JSX.Element {
  return (
    <Container style={style}>
      <Svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <SVGLinearGradient
          gradientTransform={`rotate(${rotate})`}
          gradientUnits="userSpaceOnUse"
          id="g"
          x1="0"
          x2="100"
          y1="0"
          y2="0"
        >
          <Stop offset="0" stopColor={color} stopOpacity={fromOpacity} />
          <Stop offset="1" stopColor={color} stopOpacity={toOpacity} />
        </SVGLinearGradient>
        <Rect fill="url(#g)" height="100%" width="100%" x="0" y="0" />
      </Svg>
    </Container>
  );
}
