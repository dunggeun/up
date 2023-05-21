import React, { useMemo } from 'react';
import dayjs from 'dayjs';
import { styled } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { diffBeforeToday, replacePlaceholder } from 'src/utils';
import { Text } from 'src/designs';
import { DetailSection } from 'src/components';
import { t } from 'src/translations';
import { MissionHistory } from '../MissionHistory';
import type { Mission, Achieve } from '../../types';

export interface MissionInformationProps {
  mission: Mission;
  achieveList: Achieve[];
}

const TotalExpText = styled(Text, {
  defaultVariant: 'text.h3',
})({ textAlign: 'center' });

const TotalExpValueText = styled(Text, {
  defaultVariant: 'text.h3',
})();

export function MissionInformation({
  mission,
  achieveList,
}: MissionInformationProps): React.ReactElement | null {
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

  const renderMissionDescription = (): React.ReactElement | null => {
    return mission.description ? (
      <DetailSection title={t('title.memo')}>
        <Text variant="secondary">{mission.description}</Text>
      </DetailSection>
    ) : null;
  };

  const renderMissionInfo = (): React.ReactElement => {
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

  const renderMissionHistory = (): React.ReactElement | null => {
    return isFinishedMission ? null : (
      <DetailSection delay={200} title={t('title.mission_history_in_4_week')}>
        <MissionHistory color={userColor} history={history} />
      </DetailSection>
    );
  };

  const renderEarnedExp = (): React.ReactElement => {
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
        <TotalExpText variant="text.primary">
          <TotalExpValueText sx={{ color: userColor }}>
            {totalExp}
          </TotalExpValueText>
          {' EXP'}
        </TotalExpText>
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
