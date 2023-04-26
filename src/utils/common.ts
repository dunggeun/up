import { Platform } from 'react-native';
import ReactNativeHapticFeedback, {
  type HapticFeedbackTypes,
} from 'react-native-haptic-feedback';

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

export function triggerHaptic(type: HapticFeedbackTypes = 'impactLight'): void {
  if (Platform.OS !== 'ios') return;
  ReactNativeHapticFeedback.trigger(type);
}
