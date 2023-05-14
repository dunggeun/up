import React, { useState } from 'react';
import { runAfterModalDismissed } from 'src/utils';
import { Button, CommonLayout } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { MissionDeleteModal } from '../../components/MissionDeleteModal';
import { MissionInformation } from '../../components/MissionInformation';
import { useDeleteMission, useMissionDetail } from '../../hooks';
import type { MissionStackProps } from 'src/navigators/MissionStack/types';

type MissionFinishedScreenProps = MissionStackProps<'MissionFinished'>;

const ACCESSIBILITY = {
  delete: t('label.delete'),
};

export function MissionFinishedScreen({
  navigation,
  route,
}: MissionFinishedScreenProps): JSX.Element {
  const { id } = route.params;
  const [missionDeleteModalVisibility, setMissionDeleteModalVisibility] =
    useState(false);
  const { data: missionDetail, isLoading } = useMissionDetail({ id });
  const { mutate } = useDeleteMission({
    onSuccess: () => {
      setMissionDeleteModalVisibility(false);
      runAfterModalDismissed(() => navigation.goBack());
    },
  });
  const shouldShowLoadingIndicator = isLoading || !missionDetail;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handleDelete = (): void => {
    if (!missionDetail?.mission) return;

    mutate({ missionId: missionDetail.mission.id });
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
            accessibilityHint={ACCESSIBILITY.delete}
            accessibilityLabel={ACCESSIBILITY.delete}
            color="$red"
            disableLongPress
            onPress={(): void => setMissionDeleteModalVisibility(true)}
          >
            {t('label.mission_delete')}
          </Button>
        </CommonLayout.Footer>
      </CommonLayout>
      <MissionDeleteModal
        onClose={(): void => setMissionDeleteModalVisibility(false)}
        onDelete={handleDelete}
        visible={missionDeleteModalVisibility}
      />
    </>
  );
}
