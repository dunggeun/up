/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { triggerHaptic, type HapticFeedbackTypes } from 'src/utils';

export interface HapticFeedbackProps {
  disableHaptic?: boolean;
  pressFeedbackType?: HapticFeedbackTypes;
  longPressFeedbackType?: HapticFeedbackTypes;
}

export function HapticFeedback<
  Props extends {
    onPressIn?: () => void;
    onLongPress?: () => void;
  },
>({
  children,
  disableHaptic = false,
  pressFeedbackType = 'press',
  longPressFeedbackType = 'buttonLongPress',
}: HapticFeedbackProps & {
  children: React.ReactElement<Props>;
}): JSX.Element {
  const child = React.Children.only(children);

  const handlePressIn = (): void => {
    !disableHaptic && triggerHaptic(pressFeedbackType);
    child.props.onPressIn?.();
  };

  const handleLongPress = (): void => {
    !disableHaptic && triggerHaptic(longPressFeedbackType);
    child.props.onLongPress?.();
  };

  return React.cloneElement(child as React.ReactElement, {
    disableHaptic,
    onPressIn: handlePressIn,
    onLongPress: handleLongPress,
  });
}
