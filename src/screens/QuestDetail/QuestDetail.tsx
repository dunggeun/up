import React, { useState, useCallback, useEffect } from 'react';
import { styled } from 'dripsy';
import dayjs from 'dayjs';
import { Button, H3, Text } from 'src/designs';
import { CommonLayout } from 'src/designs/layouts/CommonLayout';
import { useUserThemeColor } from 'src/hooks';
import { replacePlaceholder } from 'src/utils';
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
    // @todo
    setTimeout(() => {
      setQuest({
        id,
        title: '테스트 퀘스트',
        description: '메모에요',
        created_at: new Date().valueOf(),
        finished_at: 0,
        current_streak: 0,
        max_streak: 0,
      });
    }, 500);
  }, [id]);

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = useCallback((): void => {
    // @todo
  }, []);

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