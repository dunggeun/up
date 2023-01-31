import { Platform } from 'react-native';
import ReactNativeHapticFeedback from 'react-native-haptic-feedback';

// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop (): void {}

export function triggerHaptic (): void {
  if (Platform.OS !== 'ios') return;
  ReactNativeHapticFeedback.trigger('impactLight');
}
