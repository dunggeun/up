import React from 'react';
import { View } from 'dripsy';
import { MotiView } from 'moti';
import { Button, Tag } from 'src/designs';

import type { Quest } from 'src/features/quests';
import type { basicColors } from 'src/themes/colors';

export interface UserQuestItemProps {
  data: Quest;
  index: number;
  animate: boolean;
  tagColor: keyof typeof basicColors;
  onPress: () => void;
  onLongPress: () => void;
}

const DELAY = 80;

export function UserQuestItem ({
  data,
  index,
  animate,
  tagColor,
  onPress,
  onLongPress,
}: UserQuestItemProps): JSX.Element {
  const shouldShowBadge = data.current_streak > 0;

  const wrap = (component: JSX.Element): JSX.Element => {
    if (animate) {
      return (
        <MotiView
          animate={{
            opacity: 1,
            scale: 1,
            translateY: 0,
          }}
          delay={index * DELAY}
          from={{
            opacity: 0,
            scale: 0.8,
            translateY: 20,
          }}
          transition={{
            type: 'timing',
          }}
        >
          {component}
        </MotiView>
      );
    } 
    return component;
  };

  return wrap(
    <Button
      color="$white"
      onLongPress={onLongPress}
      onPress={onPress}
      rightAdornment={
        shouldShowBadge
          ? <Tag color={tagColor} label={`x${data.current_streak}`}/>
          : <View />
      }
    >
      {data.title}
    </Button>
  );
}
