import { Text as DripsyText } from 'dripsy';

import type { ComponentPropsWithRef } from 'react';

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface TextProps extends ComponentPropsWithRef<typeof DripsyText> {}

export const Text = DripsyText;
