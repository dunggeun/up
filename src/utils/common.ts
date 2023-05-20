import { InteractionManager, Platform } from 'react-native';
import {
  trigger,
  HapticFeedbackTypes as RNHapticFeedbackTypes,
} from 'react-native-haptic-feedback';

const HAPTIC_FEEDBACK_TYPES = {
  press: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.selection,
    android: RNHapticFeedbackTypes.virtualKey,
  }),
  buttonPress: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.impactLight,
    android: RNHapticFeedbackTypes.effectClick,
  }),
  buttonLongPress: Platform.select<RNHapticFeedbackTypes>({
    ios: RNHapticFeedbackTypes.impactMedium,
    android: RNHapticFeedbackTypes.longPress,
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

export function runAfterModalDismissed(task: () => void): void {
  setTimeout(() => {
    InteractionManager.runAfterInteractions(task);
    // 약 500ms 뒤 모달이 닫힌 후 작업 처리
  }, 500);
}
