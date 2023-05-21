import { createElement, type ComponentPropsWithoutRef } from 'react';
import { Text } from 'dripsy';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface H2Props extends ComponentPropsWithoutRef<typeof Text> {}

export function H2({
  children,
  variant,
  variants,
  ...restProps
}: H2Props): React.ReactElement {
  return createElement(
    Text,
    {
      ...restProps,
      variants: [
        'h2',
        ...(variant ? [variant] : []),
        ...(variants ? variants : []),
      ],
    },
    children,
  );
}
