import { createElement } from 'react';
import { H3 as DripsyH3 } from 'dripsy';
import { overrideHeadingStyle } from 'src/themes';

import type { ComponentPropsWithRef } from 'react';
 
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H3Props extends ComponentPropsWithRef<typeof DripsyH3> {}

export function H3 ({ children, style, ...restProps }: H3Props): JSX.Element {
  return createElement(
    DripsyH3,
    {
      ...restProps,
      style: [overrideHeadingStyle, style],
    },
    children
  );
}
