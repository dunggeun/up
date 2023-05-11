import { Platform } from 'react-native';
import { trigger, HapticFeedbackTypes } from 'react-native-haptic-feedback';

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

export function triggerHaptic(
  type: HapticFeedbackTypes = HapticFeedbackTypes.impactLight,
): void {
  if (Platform.OS !== 'ios') return;
  trigger(type);
}
