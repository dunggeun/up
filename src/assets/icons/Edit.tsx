import * as React from 'react';
import Svg, { Path, type SvgProps } from 'react-native-svg';

export function Edit(props: SvgProps): JSX.Element {
  return (
    <Svg fill="none" height={24} viewBox="0 0 24 24" width={24} {...props}>
      <Path
        d="M19.338 8.662l-4-4-9 9-1 5 5-1 9-9z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </Svg>
  );
}
