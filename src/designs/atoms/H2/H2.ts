import { createElement, type ComponentPropsWithoutRef } from 'react';
import { H2 as DripsyH2 } from 'dripsy';
import { overrideHeadingStyle } from 'src/themes';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H2Props extends ComponentPropsWithoutRef<typeof DripsyH2> {}

export function H2({
  children,
  style,
  ...restProps
}: H2Props): React.ReactElement {
  return createElement(
    DripsyH2,
    {
      ...restProps,
      style: [overrideHeadingStyle, style],
    },
    children,
  );
}
