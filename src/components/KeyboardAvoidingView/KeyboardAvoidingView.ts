import { createElement } from 'react';
import {
  Platform,
  KeyboardAvoidingView as RNKeyboardAvoidingView,
  type KeyboardAvoidingViewProps as RNKeyboardAvoidingViewProps,
} from 'react-native';

export function KeyboardAvoidingView ({
  children,
  style,
  ...props
}: RNKeyboardAvoidingViewProps): JSX.Element {
  return createElement(
    RNKeyboardAvoidingView,
    {
      ...props,
      style: [style, { flex: 1 }],
      behavior: Platform.OS === 'ios' ? 'padding' : 'height',
    },
    children,
  );
}
