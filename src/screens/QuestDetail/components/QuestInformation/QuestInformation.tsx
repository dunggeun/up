import React from 'react';
import dayjs from 'dayjs';
import { styled } from 'dripsy';
import { H3, Text } from 'src/designs';
import { useUserThemeColor } from 'src/hooks';
import { replacePlaceholder } from 'src/utils';
import { t } from 'src/translations';
import { DATE_FORMAT } from 'src/constants';
import { DetailSection } from '../DetailSection';
import { WeeklyHistory } from '../WeeklyHistory';

import type { Quest } from 'src/types';

export interface QuestInformationProps {
  quest: Quest;
}

const DUMMY_HISTORY = [
  1, 1, 1, 1, 1, 0, 1,
  0, 1, 1, 1, 1, 0, 1,
  0, 0, 0, 0, 1, 0, 1,
  1, 0, 1, 1, 1, 0, 0,
];

const TotalExpText = styled(H3, {
  defaultVariant: 'text.primary',
})({
  textAlign: 'center',
});

export function QuestInformation ({ quest }: QuestInformationProps): JSX.Element | null {
  const userColor = useUserThemeColor();

  return (
    <>
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
    </>
  );
}
