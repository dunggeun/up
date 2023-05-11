import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Share } from 'react-native';
import { useUserThemeColor } from 'src/features/users';
import { AppManager } from 'src/modules/app';
import { replacePlaceholder } from 'src/utils';
import { CommonLayout } from 'src/designs';
import { TransitionGroup } from 'src/components';
import { t } from 'src/translations';
import { EnterMemo } from '../../components/EnterMemo';
import { EnterTitle } from '../../components/EnterTitle';
import { QuestAccepted } from '../../components/QuestAccepted';
import { useAddQuest, useQuestPhase, QuestFormPhase } from '../../hooks';
import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestCreateScreenProps = QuestStackProps<'QuestCreate'>;

export function QuestCreateScreen({
  navigation,
}: QuestCreateScreenProps): JSX.Element {
  const userColor = useUserThemeColor();
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const { phase, back, next, complete } = useQuestPhase();
  const { mutate, isSuccess } = useAddQuest();

  const backPressHandler =
    phase === QuestFormPhase.EnterMemo ? back : undefined;

  const handlePressAcceptButton = (): void => {
    mutate({ title: name, description: memo });
  };

  const handlePressCloseButton = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const handlePressShareButton = useCallback((): void => {
    Share.share({
      message: replacePlaceholder(t('template.share_new_mission.body'), name),
    }).catch(() => {
      AppManager.showToast(t('message.error.common'));
    });
  }, [name]);

  useLayoutEffect(() => {
    isSuccess && complete();
  }, [isSuccess, complete]);

  return (
    <CommonLayout keyboardAvoiding>
      <CommonLayout.Header
        onBackPress={backPressHandler}
        onClosePress={handlePressCloseButton}
      />
      <TransitionGroup renderIndex={phase}>
        <EnterTitle
          nextButtonDisabled={name.length < 2}
          onChangeTitle={setName}
          onPressNext={next}
          userColor={userColor}
        />
        <EnterMemo
          onChangeMemo={setMemo}
          onPressAccept={handlePressAcceptButton}
          questName={name}
          userColor={userColor}
        />
        <QuestAccepted
          onPressClose={handlePressCloseButton}
          onPressShare={handlePressShareButton}
          questMemo={memo}
          questName={name}
          userColor={userColor}
        />
      </TransitionGroup>
    </CommonLayout>
  );
}
