/* eslint-disable import/no-named-as-default */
import React from 'react';
import { View } from 'react-native';
import Svg, {
  Rect,
  LinearGradient as SVGLinearGradient,
  Defs,
  Stop,
} from 'react-native-svg';
import { styled } from 'dripsy';
import type { LinearGradientProps } from './types';

const Container = styled(View)({ flex: 1 });

export function LinearGradient({
  color,
  direction,
  style,
}: LinearGradientProps): React.ReactElement {
  return (
    <Container style={style}>
      <Svg preserveAspectRatio="none" viewBox="0 0 100 100">
        <Defs>
          <SVGLinearGradient
            gradientTransform="rotate(90)"
            gradientUnits="userSpaceOnUse"
            id="g"
            x1="0"
            x2="100"
            y1="0"
            y2="0"
          >
            <Stop
              offset="0"
              stopColor={color}
              stopOpacity={direction === 'to-down' ? 1 : 0}
            />
            <Stop
              offset="1"
              stopColor={color}
              stopOpacity={direction === 'to-down' ? 0 : 1}
            />
          </SVGLinearGradient>
        </Defs>
        <Rect fill="url(#g)" height="100%" width="100%" x="0" y="0" />
      </Svg>
    </Container>
  );
}
