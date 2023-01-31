import React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function Menu(props: SvgProps): JSX.Element {
  return (
    <Svg
      fill="none"
      height={24}
      viewBox="0 0 24 24"
      width={24}
      {...props}
    >
      <Path
        d="M6 6L18 6"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.4}
      />
      <Path
        d="M6 12h12M6 18h12"
        stroke="currentColor"
        strokeLinecap="round"
        strokeWidth={1.4}
      />
    </Svg>
  );
}
