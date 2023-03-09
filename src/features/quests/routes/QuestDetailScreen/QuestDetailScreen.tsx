import React, { Suspense } from 'react';
import { useRecoilState } from 'recoil';
import { StorageManager } from 'src/modules';
import { questList } from 'src/stores';
import { Button, CommonLayout } from 'src/designs';
import { t } from 'src/translations';
import { usePromise } from 'src/hooks';
import { useUserThemeColor } from 'src/features/users';
import { fetchQuestInfoById } from 'src/data';

import { QuestInformation } from '../../components/QuestInformation';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestDetailScreenProps = QuestStackProps<'QuestDetail'>;

export function QuestDetailScreen({
  navigation,
  route
}: QuestDetailScreenProps): JSX.Element {
  const { id } = route.params;
  const userColor = useUserThemeColor();
  const [quests, setQuests] = useRecoilState(questList);
  const { value } = usePromise(
    `QUEST_DETAIL_${id}`,
    () => fetchQuestInfoById({ questId: id })
  );
  const { quest, achieveList } = value;

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
      <CommonLayout>
        <CommonLayout.Header
          onClosePress={handlePressCloseButton}
          title={quest.title}
        />
        <CommonLayout.Body>
          <QuestInformation achieveList={achieveList} quest={quest} />
        </CommonLayout.Body>
        <CommonLayout.Footer>
          <Button
            color={userColor}
            disableLongPress
            onPress={handlePressDoneButton}
          >
            {t('label.quest_done')}
          </Button>
        </CommonLayout.Footer>
      </CommonLayout>
    </Suspense>
  );
}
