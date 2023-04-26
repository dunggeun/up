import React, { useMemo, useCallback, useRef } from 'react';
import { useSetRecoilState } from 'recoil';
import { View } from 'dripsy';
import { MotiView } from 'moti';
import { Button, Tag, Text } from 'src/designs';
import { AppManager } from 'src/modules';
import { useAddAchieve } from 'src/features/quests/hooks';
import { questItemPosition } from 'src/features/quests/recoil/atoms';
import { navigate } from 'src/navigators/helpers';
import { t } from 'src/translations';

import { diffBeforeToday } from 'src/utils';
import type { View as RNView } from 'react-native';
import type { Quest } from 'src/features/quests';
import type { basicColors } from 'src/themes/colors';

export interface UserQuestItemProps {
  data: Quest;
  index: number;
  animate: boolean;
  tagColor: keyof typeof basicColors;
}

const DELAY = 80;
const FinishedQuestToastContent = (
  <Text variant="primary">{t('message.finished_quest')}</Text>
);
const AlreadyCompletedToastContent = (
  <Text variant="primary">{t('message.already_completed')}</Text>
);

export function UserQuestItem({
  data,
  index,
  animate,
  tagColor,
}: UserQuestItemProps): JSX.Element {
  const buttonRef = useRef<RNView>(null);
  const setItemPosition = useSetRecoilState(questItemPosition);
  const { mutate } = useAddAchieve({
    onSuccess: () => {
      buttonRef.current?.measureInWindow((x, y) => {
        setItemPosition({ x, y });
      });
    },
  });

  const shouldShowBadge = useMemo(() => {
    if (data.finished_at) return false;
    return data.current_streak > 0 && diffBeforeToday(data.updated_at) <= 1;
  }, [data.current_streak, data.updated_at, data.finished_at]);

  const handlePress = useCallback(() => {
    const isFinished = data.finished_at;
    navigate('Quest', isFinished ? 'QuestFinished' : 'QuestDetail', {
      id: data.id,
    });
  }, [data.id, data.finished_at]);

  const handleLongPress = useCallback(() => {
    const isFinishedQuest = Boolean(data.finished_at);
    const alreadyCompletedToday = diffBeforeToday(data.updated_at) === 0;

    switch (true) {
      case isFinishedQuest:
        AppManager.showToast(FinishedQuestToastContent);
        return;

      case alreadyCompletedToday:
        AppManager.showToast(AlreadyCompletedToastContent);
        return;

      default:
        break;
    }

    mutate({ questId: data.id });
  }, [mutate, data.id, data.updated_at, data.finished_at]);

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
        <Tag color={tagColor} label={`x${data.current_streak}`} />
      </MotiView>
    ) : (
      <View />
    );
  };

  return animatable(
    <Button
      color="$white"
      onLongPress={handleLongPress}
      onPress={handlePress}
      ref={buttonRef}
      rightAdornment={renderBadge()}
    >
      {data.title}
    </Button>,
  );
}
