import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { styled } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { diffBeforeToday, replacePlaceholder } from 'src/utils';
import { H3, Text } from 'src/designs';
import { DetailSection } from 'src/components';
import { t } from 'src/translations';
import { MissionHistory } from '../MissionHistory';
import type { Mission, Achieve } from '../../types';

export interface MissionInformationProps {
  mission: Mission;
  achieveList: Achieve[];
}

const TotalExpText = styled(H3, {
  defaultVariant: 'text.primary',
})({
  textAlign: 'center',
});

export function MissionInformation({
  mission,
  achieveList,
}: MissionInformationProps): JSX.Element | null {
  const userColor = useUserThemeColor();
  const isFinishedMission = Boolean(mission.finished_at);

  const { history, totalExp } = useMemo(() => {
    let earnedExp = 0;
    const historyToDiffDays = achieveList.map((achieve) => {
      earnedExp += achieve.exp;
      return diffBeforeToday(achieve.created_at);
    });
    return { history: historyToDiffDays, totalExp: earnedExp };
  }, [achieveList]);

  const renderMissionDescription = (): JSX.Element | null => {
    return mission.description ? (
      <DetailSection title={t('title.memo')}>
        <Text variant="secondary">{mission.description}</Text>
      </DetailSection>
    ) : null;
  };

  const renderMissionInfo = (): JSX.Element => {
    return (
      <DetailSection delay={100} title={t('title.mission_info')}>
        {isFinishedMission ? (
          <Text variant="secondary">
            {replacePlaceholder(
              t('message.mission_finished_description'),
              dayjs(mission.finished_at).format(t('format.date')),
            )}
          </Text>
        ) : null}
        <Text variant="secondary">
          {replacePlaceholder(
            t('message.mission_description'),
            achieveList.length.toString(),
            mission.max_streak.toString(),
          )}
        </Text>
      </DetailSection>
    );
  };

  const renderMissionHistory = (): JSX.Element | null => {
    return isFinishedMission ? null : (
      <DetailSection delay={200} title={t('title.mission_history_in_4_week')}>
        <MissionHistory color={userColor} history={history} />
      </DetailSection>
    );
  };

  const renderEarnedExp = (): JSX.Element => {
    return (
      <DetailSection
        delay={isFinishedMission ? 200 : 600}
        title={t('title.mission_total_exp')}
      >
        <Text variant="secondary">
          {replacePlaceholder(
            t('message.mission_total_exp'),
            dayjs(mission.created_at).format(t('format.date')),
          )}
        </Text>
        <TotalExpText>{totalExp} EXP</TotalExpText>
      </DetailSection>
    );
  };

  return (
    <>
      {renderMissionDescription()}
      {renderMissionInfo()}
      {renderMissionHistory()}
      {renderEarnedExp()}
    </>
  );
}
