import React, { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { StorageManager } from 'src/modules';
import { questList } from 'src/stores';
import { QuestDetail } from './QuestDetail';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestDetailScreenProps = QuestStackProps<'QuestDetail'>;

export function QuestDetailScreen ({
  navigation,
  route
}: QuestDetailScreenProps): JSX.Element {
  const { id } = route.params;
  const [quests, setQuests] = useRecoilState(questList);

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = (): void => {
    const targetQuestIndex = quests.findIndex((data) => data.id === id);
    const targetQuest = quests[targetQuestIndex];
    const currentTimestamp = Number(new Date());
  
    if (!targetQuest) return;

    StorageManager
      .getInstance()
      .updateQuest(id, {
        ...targetQuest,
        finished_at: currentTimestamp
      })
      .then(() => {
        const updatedQuest = quests[targetQuestIndex];
        if (updatedQuest) {
          updatedQuest.finished_at = currentTimestamp;
        }
        setQuests([...quests]);

        // @todo 안내 모달 노출 후 뒤로가기 처리
        navigation.goBack();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('updateQuest', error);
      });
  };

  return (
    <Suspense fallback={null}>
      <QuestDetail
        onClosePress={handlePressCloseButton}
        onDonePress={handlePressDoneButton}
        questId={id}
      />
    </Suspense>
  );
}