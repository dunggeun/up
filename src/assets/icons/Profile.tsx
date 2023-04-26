import React from 'react';
import Svg, { Path, Circle, type SvgProps } from 'react-native-svg';

export function Profile(props: SvgProps): JSX.Element {
  return (
    <Svg fill="none" height={28} viewBox="0 0 28 28" width={28} {...props}>
      <Circle cx={14} cy={10} r={4} stroke="currentColor" strokeWidth={1.4} />
      <Path
        d="M21 20.476c0 .922-.205 1.217-.31 1.314-.112.105-.364.222-1.013.209-.553-.011-1.203-.107-2.01-.227l-.409-.06c-.964-.141-2.076-.287-3.258-.287s-2.294.146-3.258.287l-.41.06c-.806.12-1.456.216-2.009.227-.649.013-.9-.104-1.014-.21C7.205 21.694 7 21.4 7 20.477 7 16.962 10.07 14 14 14s7 2.962 7 6.476z"
        stroke="currentColor"
        strokeWidth={1.4}
      />
    </Svg>
  );
}
