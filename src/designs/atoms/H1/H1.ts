import { createElement, type ComponentPropsWithoutRef } from 'react';
import { Text } from 'dripsy';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H1Props extends ComponentPropsWithoutRef<typeof Text> {}

export function H1({
  children,
  variant,
  variants,
  ...restProps
}: H1Props): React.ReactElement {
  return createElement(
    Text,
    {
      ...restProps,
      variants: [
        'h1',
        ...(variant ? [variant] : []),
        ...(variants ? variants : []),
      ],
    },
    children,
  );
}
