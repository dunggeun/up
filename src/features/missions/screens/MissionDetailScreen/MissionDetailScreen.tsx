import React, { useState } from 'react';
import { useUserThemeColor } from 'src/features/users';
import { AppEventChannel } from 'src/modules/event';
import { runAfterModalDismissed } from 'src/utils';
import { Button, CommonLayout } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { MissionEndModal } from '../../components/MissionEndModal';
import { MissionInformation } from '../../components/MissionInformation';
import { useUpdateMission, useMissionDetail } from '../../hooks';
import type { MissionStackProps } from 'src/navigators/MissionStack/types';

type MissionDetailScreenProps = MissionStackProps<'MissionDetail'>;

const ACCESSIBILITY = {
  endMission: t('title.end_mission'),
};

export function MissionDetailScreen({
  navigation,
  route,
}: MissionDetailScreenProps): React.ReactElement {
  const { id } = route.params;
  const [missionEndModalVisibility, setMissionEndModalVisibility] =
    useState(false);
  const userColor = useUserThemeColor();
  const { data: missionDetail, isLoading } = useMissionDetail({ id });
  const { mutate } = useUpdateMission({
    invalidateMode: 'listOnly',
    onSuccess: ({ id }) => {
      setMissionEndModalVisibility(false);
      runAfterModalDismissed(() => {
        if (id !== undefined) {
          AppEventChannel.getInstance().dispatch('endMission', {
            missionId: id,
          });
        }
        navigation.goBack();
      });
    },
  });
  const shouldShowLoadingIndicator = isLoading || !missionDetail;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = (): void => {
    setMissionEndModalVisibility(true);
  };

  const handleMissionEndModal = (): void => {
    setMissionEndModalVisibility(false);
  };

  const handleDone = (): void => {
    if (!missionDetail?.mission) return;

    const missionId = missionDetail.mission.id;
    mutate({
      missionId,
      data: { id: missionId, finished_at: Number(new Date()) },
    });
  };

  return shouldShowLoadingIndicator ? (
    <LoadingIndicator />
  ) : (
    <>
      <CommonLayout>
        <CommonLayout.Header
          onClosePress={handlePressCloseButton}
          title={missionDetail.mission.title}
        />
        <CommonLayout.Body>
          <MissionInformation
            achieveList={missionDetail.achieveList}
            mission={missionDetail.mission}
          />
        </CommonLayout.Body>
        <CommonLayout.Footer>
          <Button
            accessibilityHint={ACCESSIBILITY.endMission}
            accessibilityLabel={ACCESSIBILITY.endMission}
            color={userColor}
            disableLongPress
            onPress={handlePressDoneButton}
          >
            {t('label.mission_done')}
          </Button>
        </CommonLayout.Footer>
      </CommonLayout>
      <MissionEndModal
        onClose={handleMissionEndModal}
        onDone={handleDone}
        visible={missionEndModalVisibility}
      />
    </>
  );
}
