import React, { useState } from 'react';
import { Share } from 'react-native';
import { ToastController } from 'src/components/Toast/ToastController';
import { useUserThemeColor } from 'src/features/users';
import { replacePlaceholder } from 'src/utils';
import { CommonLayout } from 'src/designs';
import { TransitionGroup } from 'src/components';
import { t } from 'src/translations';
import { EnterMemo } from '../../components/EnterMemo';
import { EnterTitle } from '../../components/EnterTitle';
import { MissionAccepted } from '../../components/MissionAccepted';
import { useAddMission, useMissionPhase, MissionFormPhase } from '../../hooks';
import type { MissionStackProps } from 'src/navigators/MissionStack/types';

type MissionCreateScreenProps = MissionStackProps<'MissionCreate'>;

export function MissionCreateScreen({
  navigation,
}: MissionCreateScreenProps): React.ReactElement {
  const userColor = useUserThemeColor();
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const { phase, back, next, complete } = useMissionPhase();
  const { mutate } = useAddMission({
    onSuccess: () => complete(),
  });

  const backPressHandler =
    phase === MissionFormPhase.EnterMemo ? back : undefined;

  const handlePressAcceptButton = (): void => {
    mutate({ title: name.trim(), description: memo.trim() });
  };

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressShareButton = (): void => {
    Share.share({
      message: replacePlaceholder(t('template.share_new_mission.body'), name),
    }).catch(() => {
      ToastController.show(t('message.error.common'));
    });
  };

  return (
    <CommonLayout keyboardAvoiding>
      <CommonLayout.Header
        onBackPress={backPressHandler}
        onClosePress={handlePressCloseButton}
      />
      <TransitionGroup renderIndex={phase}>
        <EnterTitle
          onConfirm={setName}
          onPressNext={next}
          userColor={userColor}
        />
        <EnterMemo
          missionName={name}
          onChangeMemo={setMemo}
          onPressAccept={handlePressAcceptButton}
          userColor={userColor}
        />
        <MissionAccepted
          missionMemo={memo}
          missionName={name}
          onPressClose={handlePressCloseButton}
          onPressShare={handlePressShareButton}
          userColor={userColor}
        />
      </TransitionGroup>
    </CommonLayout>
  );
}
