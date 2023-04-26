import { Text as DripsyText } from 'dripsy';

import type { ComponentPropsWithoutRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextProps
  extends ComponentPropsWithoutRef<typeof DripsyText> {}

export const Text = DripsyText;
