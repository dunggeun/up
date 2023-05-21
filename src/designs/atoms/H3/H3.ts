import { createElement, type ComponentPropsWithoutRef } from 'react';
import { Text } from 'dripsy';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H3Props extends ComponentPropsWithoutRef<typeof Text> {}

export function H3({
  children,
  variant,
  variants,
  ...restProps
}: H3Props): React.ReactElement {
  return createElement(
    Text,
    {
      ...restProps,
      variants: [
        'h3',
        ...(variant ? [variant] : []),
        ...(variants ? variants : []),
      ],
    },
    children,
  );
}
