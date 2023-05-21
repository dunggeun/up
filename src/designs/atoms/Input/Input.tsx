import React, { forwardRef, type ComponentPropsWithRef } from 'react';
import type { TextInput as RNTextInput } from 'react-native';
import { Platform } from 'react-native';
import { styled, useDripsyTheme, TextInput } from 'dripsy';

type TextInputProps = ComponentPropsWithRef<typeof TextInput>;

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface InputProps extends Partial<TextInputProps> {}
export type InputRef = RNTextInput;

const BORDER_WIDTH = 2;

const FIRST_PADDING = '$03';
const SECOND_PADDING = '$02';
const FONT_SIZE = '$h2';

const StyledTextInput = styled(TextInput)(
  ({ computedHeight }: { computedHeight: number }) => ({
    paddingX: '$04',
    borderRadius: '$input',
    borderWidth: BORDER_WIDTH,
    borderColor: '$border',
    color: '$text_primary',
    fontSize: FONT_SIZE,
    ...(Platform.OS === 'android'
      ? { padding: 0, paddingTop: SECOND_PADDING, height: computedHeight }
      : { paddingTop: FIRST_PADDING, paddingBottom: SECOND_PADDING }),
  }),
);

export const Input = forwardRef<InputRef, InputProps>(function Input(
  props,
  ref,
): React.ReactElement {
  const { theme } = useDripsyTheme();
  const height =
    BORDER_WIDTH * 2 +
    theme.space[FIRST_PADDING] * 2 +
    theme.space[SECOND_PADDING] +
    theme.fontSizes[FONT_SIZE];

  return (
    // Dripsy 타입에 이슈가 존재하여 임시로 TS 타입 체킹 비활성화
    // eslint-disable-next-line @typescript-eslint/prefer-ts-expect-error, @typescript-eslint/ban-ts-comment
    // @ts-ignore
    <StyledTextInput
      {...props}
      computedHeight={height}
      placeholderTextColor={theme.colors.$text_tertiary}
      ref={ref}
      textAlignVertical={props.multiline ? 'top' : 'center'}
    />
  );
});
