import React from 'react';
import { Button } from 'src/designs';
import { CommonLayout } from 'src/designs/layouts/CommonLayout';
import { usePromise, useUserThemeColor } from 'src/hooks';
import { fetchQuestInfoById } from 'src/data';
import { t } from 'src/translations';
import { QuestInformation } from './components';

interface QuestDetailProps {
  questId: number;
  onClosePress: () => void;
  onDonePress: () => void;
}

export function QuestDetail({
  questId,
  onClosePress,
  onDonePress,
}: QuestDetailProps): JSX.Element | null {
  const userColor = useUserThemeColor();
  const { value } = usePromise(
    `QUEST_DETAIL_${questId}`,
    () => fetchQuestInfoById({ questId })
  );
  const { quest, achieveList } = value;

  return (
    <CommonLayout>
      <CommonLayout.Header onClosePress={onClosePress} title={quest.title} />
      <CommonLayout.Body>
        <QuestInformation achieveList={achieveList} quest={quest} />
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
