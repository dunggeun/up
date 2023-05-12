import { Platform } from 'react-native';
import {
  trigger,
  HapticFeedbackTypes as RNHapticFeedbackTypes,
} from 'react-native-haptic-feedback';

const HAPTIC_FEEDBACK_TYPES = {
  press: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.impactLight,
    android: RNHapticFeedbackTypes.virtualKey,
  }),
  buttonPress: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.impactMedium,
    android: RNHapticFeedbackTypes.effectClick,
  }),
  buttonLongPress: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.impactHeavy,
    android: RNHapticFeedbackTypes.effectHeavyClick,
  }),
} as const;

export type HapticFeedbackTypes = keyof typeof HAPTIC_FEEDBACK_TYPES;

/* istanbul ignore next */
// eslint-disable-next-line @typescript-eslint/no-empty-function
export function noop(): void {}

export function triggerHaptic(type: HapticFeedbackTypes = 'press'): void {
  const feedbackType = HAPTIC_FEEDBACK_TYPES[type];
  feedbackType && trigger(feedbackType);
}
