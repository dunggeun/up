import React from 'react';
import Svg, {
  G,
  Path,
  Circle,
  Defs,
  ClipPath,
  type SvgProps,
} from 'react-native-svg';
import { colors } from 'src/themes/colors';

export function Warning(props: SvgProps): React.ReactElement {
  return (
    <Svg fill="none" height={48} viewBox="0 0 48 48" width={48} {...props}>
      <G clipPath="url(#clip)">
        <Path
          d="M25.299 9.25l15.589 27a1.5 1.5 0 01-1.3 2.25H8.413a1.5 1.5 0 01-1.3-2.25l15.589-27c.577-1 2.02-1 2.598 0z"
          fill={colors.$red}
          stroke={colors.$border}
          strokeWidth={3}
        />
        <Path
          d="M24 19L24 27"
          stroke="#fff"
          strokeLinecap="round"
          strokeWidth={4}
        />
        <Circle cx={24} cy={33} fill="#fff" r={2} />
      </G>
      <Defs>
        <ClipPath id="clip">
          <Path d="M0 0H48V48H0z" fill="#fff" />
        </ClipPath>
      </Defs>
    </Svg>
  );
}
