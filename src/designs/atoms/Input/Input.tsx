import React, { forwardRef, type ComponentPropsWithRef } from 'react';
import type { TextInput as RNTextInput } from 'react-native';
import { styled, useDripsyTheme, TextInput } from 'dripsy';

type TextInputProps = ComponentPropsWithRef<typeof TextInput>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps extends Partial<TextInputProps> {}
export type InputRef = RNTextInput;

const BORDER_WIDTH = 2;

const StyledTextInput = styled(TextInput)({
  paddingX: '$04',
  paddingY: '$03',
  borderRadius: '$input',
  borderWidth: BORDER_WIDTH,
  borderColor: '$border',
  color: '$text_primary',
  fontSize: '$h2',
});

export const Input = forwardRef<InputRef, InputProps>(function Input(
  props,
  ref,
): React.ReactElement {
  const { theme } = useDripsyTheme();

  return (
    // Dripsy 타입에 이슈가 존재하여 임시로 TS 타입 체킹 비활성화
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledTextInput
      {...props}
      placeholderTextColor={theme.colors.$text_tertiary}
      ref={ref}
    />
  );
});
