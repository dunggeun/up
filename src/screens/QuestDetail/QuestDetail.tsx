import React from 'react';
import { Button } from 'src/designs';
import { CommonLayout } from 'src/designs/layouts/CommonLayout';
import { usePromise, useUserThemeColor } from 'src/hooks';
import { StorageManager } from 'src/modules';
import { t } from 'src/translations';
import { QuestInformation } from './components';

import type { Quest } from 'src/types';

interface QuestDetailProps {
  questId: number;
  onClosePress: () => void;
  onDonePress: () => void;
}

const fetchQuestById = ({ questId }: { questId: number }): Promise<Quest> => {
  return StorageManager
    .getInstance()
    .getQuest(questId)
    .then((quest) => {
      if (quest === null) {
        throw new Error('quest not found');
      }
      return quest;
    });
};

export function QuestDetail({
  questId,
  onClosePress,
  onDonePress,
}: QuestDetailProps): JSX.Element | null {
  const userColor = useUserThemeColor();
  const { value: quest } = usePromise(
    `QUEST_DETAIL_${questId}`,
    () => fetchQuestById({ questId })
  );

  return (
    <CommonLayout>
      <CommonLayout.Header onClosePress={onClosePress} title={quest.title} />
      <CommonLayout.Body>
        <QuestInformation quest={quest} />
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color={userColor}
          disableLongPress
          onPress={onDonePress}
        >
          {t('label.quest_done')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
