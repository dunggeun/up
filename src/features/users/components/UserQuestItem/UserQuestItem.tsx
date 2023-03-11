import React, { useCallback } from 'react';
import dayjs from 'dayjs';
import { View } from 'dripsy';
import { MotiView } from 'moti';
import { Button, Tag, Text } from 'src/designs';
import * as Toast from 'src/components/Toast';
import { useAddAchieve } from 'src/features/quests/hooks';
import { navigate } from 'src/navigators/helpers';
import { t } from 'src/translations';

import type { Quest } from 'src/features/quests';
import type { basicColors } from 'src/themes/colors';

export interface UserQuestItemProps {
  data: Quest;
  index: number;
  animate: boolean;
  tagColor: keyof typeof basicColors;
}

const DELAY = 80;
const AlreadyCompletedToastContent = <Text>{t('message.already_completed')}</Text>;

export function UserQuestItem ({
  data,
  index,
  animate,
  tagColor,
}: UserQuestItemProps): JSX.Element {
  const { mutate } = useAddAchieve();
  const shouldShowBadge = data.current_streak > 0;

  const handlePress = useCallback(() => {
    navigate('Quest', 'QuestDetail', { id: data.id });
  }, [data.id]);

  const handleLongPress = useCallback(() => {
    const alreadyCompletedToday = data.updated_at !== 0
      && dayjs(data.updated_at).diff(dayjs(), 'days') === 0;

    if (alreadyCompletedToday) {
      Toast.show(AlreadyCompletedToastContent);
      return;
    }

    mutate({ questId: data.id });
  }, [mutate, data.id, data.updated_at]);

  const animatable = (component: JSX.Element): JSX.Element => {
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

  const renderBadge = (): JSX.Element => {
    return shouldShowBadge ? (
      <MotiView animate={{ scale: 1 }} from={{ scale: 0 }}>
        <Tag color={tagColor} label={`x${data.current_streak}`}/>
      </MotiView>
    ) : <View />;
  };

  return animatable(
    <Button
      color="$white"
      onLongPress={handleLongPress}
      onPress={handlePress}
      rightAdornment={renderBadge()}
    >
      {data.title}
    </Button>
  );
}
