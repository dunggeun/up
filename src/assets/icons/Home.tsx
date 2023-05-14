import React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function Home(props: SvgProps): React.ReactElement {
  return (
    <Svg fill="none" height={24} viewBox="0 0 25 24" width={25} {...props}>
      <Path
        d="M5.5 20h14v-9.5l-7-6-7 6V20z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={1.4}
      />
    </Svg>
  );
}
