import React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function Close(props: SvgProps): JSX.Element {
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M7 17l5-5 5 5M17 7l-5 5-5-5"
        stroke="#2e2e2e"
        strokeLinecap="round"
        strokeWidth={2}
      />
    </Svg>
  );
}
