/* eslint-disable import/no-named-as-default-member */
import React from 'react';
import { triggerHaptic, type HapticFeedbackTypes } from 'src/utils';

export interface HapticFeedbackProps {
  mode?: 'press-in' | 'press';
  disableLongPress?: boolean;
  disableHaptic?: boolean;
  pressFeedbackType?: HapticFeedbackTypes;
  longPressFeedbackType?: HapticFeedbackTypes;
}

export function HapticFeedback<
  Props extends {
    onPress?: () => void;
    onPressIn?: () => void;
    onLongPress?: () => void;
  },
>({
  children,
  mode = 'press',
  disableHaptic = false,
  disableLongPress = true,
  pressFeedbackType = 'press',
  longPressFeedbackType = 'buttonLongPress',
}: HapticFeedbackProps & {
  children: React.ReactElement<Props>;
}): React.ReactElement {
  const child = React.Children.only(children);

  const handlePress = (): void => {
    if (mode === 'press' && !disableHaptic) {
      triggerHaptic(pressFeedbackType);
    }
    child.props.onPress?.();
  };

  const handlePressIn = (): void => {
    if (mode === 'press-in' && !disableHaptic) {
      triggerHaptic(pressFeedbackType);
    }
    child.props.onPressIn?.();
  };

  const handleLongPress = (): void => {
    if (!(disableLongPress || disableHaptic)) {
      triggerHaptic(longPressFeedbackType);
    }
    child.props.onLongPress?.();
  };

  return React.cloneElement(child as React.ReactElement, {
    disableHaptic,
    onPress: handlePress,
    onPressIn: handlePressIn,
    onLongPress: handleLongPress,
  });
}
