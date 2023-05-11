import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { styled } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { diffBeforeToday, replacePlaceholder } from 'src/utils';
import { H3, Text } from 'src/designs';
import { DetailSection } from 'src/components';
import { t } from 'src/translations';
import { QuestHistory } from '../QuestHistory';
import type { Quest, Achieve } from '../../types';

export interface QuestInformationProps {
  quest: Quest;
  achieveList: Achieve[];
}

const TotalExpText = styled(H3, {
  defaultVariant: 'text.primary',
})({
  textAlign: 'center',
});

export function QuestInformation({
  quest,
  achieveList,
}: QuestInformationProps): JSX.Element | null {
  const userColor = useUserThemeColor();
  const isFinishedQuest = Boolean(quest.finished_at);

  const { history, totalExp } = useMemo(() => {
    let earnedExp = 0;
    const historyToDiffDays = achieveList.map((achieve) => {
      earnedExp += achieve.exp;
      return diffBeforeToday(achieve.created_at);
    });
    return { history: historyToDiffDays, totalExp: earnedExp };
  }, [achieveList]);

  const renderQuestDescription = (): JSX.Element | null => {
    return quest.description ? (
      <DetailSection title={t('title.memo')}>
        <Text variant="secondary">{quest.description}</Text>
      </DetailSection>
    ) : null;
  };

  const renderQuestInfo = (): JSX.Element => {
    return (
      <DetailSection delay={100} title={t('title.mission_info')}>
        {isFinishedQuest ? (
          <Text variant="secondary">
            {replacePlaceholder(
              t('message.mission_finished_description'),
              dayjs(quest.finished_at).format(t('format.date')),
            )}
          </Text>
        ) : null}
        <Text variant="secondary">
          {replacePlaceholder(
            t('message.mission_description'),
            achieveList.length.toString(),
            quest.max_streak.toString(),
          )}
        </Text>
      </DetailSection>
    );
  };

  const renderQuestHistory = (): JSX.Element | null => {
    return isFinishedQuest ? null : (
      <DetailSection delay={200} title={t('title.mission_history_in_4_week')}>
        <QuestHistory color={userColor} history={history} />
      </DetailSection>
    );
  };

  const renderEarnedExp = (): JSX.Element => {
    return (
      <DetailSection
        delay={isFinishedQuest ? 200 : 800}
        title={t('title.mission_total_exp')}
      >
        <Text variant="secondary">
          {replacePlaceholder(
            t('message.mission_total_exp'),
            dayjs(quest.created_at).format(t('format.date')),
          )}
        </Text>
        <TotalExpText>{totalExp} EXP</TotalExpText>
      </DetailSection>
    );
  };

  return (
    <>
      {renderQuestDescription()}
      {renderQuestInfo()}
      {renderQuestHistory()}
      {renderEarnedExp()}
    </>
  );
}
