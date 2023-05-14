import React from 'react';
import Svg, { G, Path, Defs, ClipPath, type SvgProps } from 'react-native-svg';

export function Star(props: SvgProps): React.ReactElement {
  return (
    <Svg fill="none" height={48} viewBox="0 0 48 48" width={48} {...props}>
      <G clipPath="url(#clip0_1010_591)">
        <Path
          d="M19.028 18.081l5-11 5 11 12 2-9 7 4 12-12-7-12 7 4-12-9-7 12-2z"
          fill="#ffeb3b"
          stroke="#2e2e2e"
          strokeLinejoin="round"
          strokeWidth={3}
        />
      </G>
      <Defs>
        <ClipPath id="clip0_1010_591">
          <Path d="M0 0H48V48H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
