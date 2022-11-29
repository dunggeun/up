import React from 'react';
import { styled, useDripsyTheme, TextInput } from 'dripsy';

import type { ComponentPropsWithRef } from 'react';

type TextInputProps = ComponentPropsWithRef<typeof TextInput>;
 
// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps extends Partial<TextInputProps> {}

const BORDER_WIDTH = 2;

const StyledTextInput = styled(TextInput)({
  paddingX: '$04',
  paddingY: '$03',
  borderRadius: '$input',
  borderWidth: BORDER_WIDTH,
  borderColor: 'text_primary',
  color: 'text_primary',
  fontSize: '$h2',
});

export function Input ({
  ...restProps
}: InputProps): JSX.Element {
  const { theme } = useDripsyTheme();

  return (
    // Dripsy 타입에 이슈가 존재하여 임시로 TS 타입 체킹 비활성화
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledTextInput
      {...restProps}
      placeholderTextColor={theme.colors.$text_tertiary}
    />
  );
}
