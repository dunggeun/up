import { createElement } from 'react';
import { H2 as DripsyH2 } from 'dripsy';
import { overrideHeadingStyle } from 'src/themes';

import type { ComponentPropsWithRef } from 'react';
 
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H2Props extends ComponentPropsWithRef<typeof DripsyH2> {}

export function H2 ({ children, style, ...restProps }: H2Props): JSX.Element {
  return createElement(
    DripsyH2,
    {
      ...restProps,
      style: [overrideHeadingStyle, style],
    },
    children
  );
}