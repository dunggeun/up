
import React from 'react';
import { useActor } from '@xstate/react';
import { useRecoilValue, useRecoilState } from 'recoil';
import dayjs from 'dayjs';
import { Text } from 'dripsy';
import { activeQuestList, questList } from 'src/stores';
import { CommonLayout } from 'src/designs';
import { FadeInView } from 'src/components';
import * as Toast from 'src/components/Toast';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';
import { getAchieveExpByStreak , createAchieveData } from 'src/modules/app/helpers';
import { addAchieve } from 'src/data';
import { t } from 'src/translations';

import { UserProfile } from '../../components/UserProfile';
import { UserQuestList } from '../../components/UserQuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeScreenProps = MainTabProps<'Home'>;

const AlreadyCompletedToastContent = <Text>{t('message.already_completed')}</Text>;

export function HomeScreen(_props: HomeScreenProps): JSX.Element | null {
  const [state, send] = useActor(AppManager.getInstance().getService());
  const [quests, setQuests] = useRecoilState(questList);
  const activeQuests = useRecoilValue(activeQuestList);

  const user = state.context.user;

  const handlePressCreateQuest = (): void => {
    navigate('Quest', 'QuestCreate');
  };

  const handlePressQuest = (questId: number): void => {
    navigate('Quest', 'QuestDetail', { id: questId });
  };

  const handleLongPressQuest = (questId: number): void => {
    const targetQuest = quests.find(({ id }) => id === questId);
    if (!targetQuest) return;

    const alreadyCompleted = targetQuest.updated_at !== 0
      && dayjs(targetQuest.updated_at).diff(dayjs(), 'days') === 0;

    if (alreadyCompleted) {
      Toast.show(AlreadyCompletedToastContent);
      return;
    }

    const earnedExp = getAchieveExpByStreak(targetQuest.current_streak);
    addAchieve(targetQuest, createAchieveData({ questId, exp: earnedExp }))
      .then((updatedQuest) => {
        setQuests([...quests].map((quest) => (
          quest.id === questId
            ? { ...quest, ...updatedQuest }
            : quest
        )));
        send({
          type: 'REWARD',
          exp: earnedExp,
        });
      })
      .catch((_error) => {
        // TODO
      });
  };

  if (!user) {
    return null;
  }

  return (
    <FadeInView>
      <CommonLayout insetBottom={false}>
        <CommonLayout.Body scrollEnabled={false}>
          <UserProfile user={user} />
          <UserQuestList
            onCreate={handlePressCreateQuest}
            onLongPress={handleLongPressQuest}
            onPress={handlePressQuest}
            quests={activeQuests}
          />
        </CommonLayout.Body>
      </CommonLayout>
    </FadeInView>
  );
}
