import React, { useState, useCallback, useEffect } from 'react';
import { getRecoil, setRecoil } from 'recoil-nexus';
import { styled } from 'dripsy';
import dayjs from 'dayjs';
import { Button, H3, Text } from 'src/designs';
import { CommonLayout } from 'src/designs/layouts/CommonLayout';
import { useUserThemeColor } from 'src/hooks';
import { replacePlaceholder } from 'src/utils';
import { StorageManager } from 'src/modules';
import { questList } from 'src/stores';
import { DATE_FORMAT } from 'src/constants';
import { t } from 'src/translations';
import { DetailSection, WeeklyHistory } from './components';

import type { Quest } from 'src/types';
import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestDetailProps = QuestStackProps<'QuestDetail'>;

const TotalExpText = styled(H3, {
  defaultVariant: 'text.primary',
})({
  textAlign: 'center',
});

const DUMMY_HISTORY = [
  1, 1, 1, 1, 1, 0, 1,
  0, 1, 1, 1, 1, 0, 1,
  0, 0, 0, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 0,
];

export function QuestDetail ({ navigation, route }: QuestDetailProps): JSX.Element | null {
  const { id } = route.params;
  const [quest, setQuest] = useState<Quest | null>(null);
  const userColor = useUserThemeColor();

  useEffect(() => {
    StorageManager
      .getInstance()
      .getQuest(id)
      .then(setQuest)
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('getQuest', error);
      });
  }, [id]);

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = useCallback((): void => {
    const currentQuestList = getRecoil(questList);
    const targetQuestIndex = currentQuestList.findIndex((data) => data.id === id);
    const targetQuest = currentQuestList[targetQuestIndex];
    const currentTimestamp = Number(new Date());
  
    if (!targetQuest) return;

    StorageManager
      .getInstance()
      .updateQuest(id, {
        ...targetQuest,
        finished_at: currentTimestamp
      })
      .then(() => {
        const updatedQuest = currentQuestList[targetQuestIndex];
        if (updatedQuest) {
          updatedQuest.finished_at = currentTimestamp;
        }
        setRecoil(questList, [...currentQuestList]);

        // @todo 안내 모달 노출 후 뒤로가기 처리
        navigation.goBack();
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('updateQuest', error);
      });
  }, [id, navigation]);

  if (quest === null) {
    return null;
  }

  return (
    <CommonLayout>
      <CommonLayout.Header onClosePress={handlePressCloseButton} title={quest.title}/>
      <CommonLayout.Body>
        {quest.description ? (
          <DetailSection title={t('title.memo')}>
            <Text variant="secondary">{quest.description}</Text>
          </DetailSection>
        ) : null}
        <DetailSection delay={100} title={t('title.quest_info')}>
          <Text variant="secondary">
            {replacePlaceholder(t('message.quest_description'), '1', quest.max_streak.toString())}
          </Text>
        </DetailSection>
        <DetailSection delay={200} title={t('title.quest_history_in_4_week')}>
          <WeeklyHistory color={userColor} history={DUMMY_HISTORY} />
        </DetailSection>
        <DetailSection delay={800} title={t('title.quest_total_exp')}>
          <Text variant="secondary">
            {replacePlaceholder(t('message.quest_total_exp'), dayjs(quest.created_at).format(DATE_FORMAT))}
          </Text>
          <TotalExpText>{100} EXP</TotalExpText>
        </DetailSection>
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
  );
}