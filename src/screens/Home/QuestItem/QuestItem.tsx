import React, { useEffect } from 'react';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withDelay
} from 'react-native-reanimated';
import { View } from 'dripsy';
import { Button, Tag } from 'src/designs';
import { useUserThemeColor } from 'src/hooks';

import type { Quest } from 'src/types';

export interface QuestItemProps {
  data: Quest;
  index: number;
  animate: boolean;
  onPress: () => void;
}

const DELAY = 80;

export function QuestItem ({
  data,
  index,
  animate,
  onPress,
}: QuestItemProps): JSX.Element {
  const userColor = useUserThemeColor();
  const animateValue = useSharedValue(animate ? 1 : 0);
  const shouldShowBadge = data.current_streak > 0;

  const animatedViewStyle = useAnimatedStyle(() => ({
    opacity: 1 - animateValue.value,
    transform: [
      { translateY: animateValue.value * 20 },
      { scale: 0.8 + (1 - 0.8) * (1 - animateValue.value) },
    ],
  }));

  useEffect(() => {
    animateValue.value = withDelay(index * DELAY, withTiming(0));
  }, [animateValue, index]);

  return (
    <Animated.View style={animatedViewStyle}>
      <Button
        color="$white"
        onPress={onPress}
        rightAdornment={
          shouldShowBadge
            ? <Tag color={userColor} label={`x${data.current_streak}`}/>
            : <View />
        }
      >
        {data.title}
      </Button>
    </Animated.View>
  );
}

