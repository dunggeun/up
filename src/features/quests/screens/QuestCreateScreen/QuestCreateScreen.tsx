import React, { useState, useCallback, useLayoutEffect } from 'react';
import { Share } from 'react-native';
import { CommonLayout, Text } from 'src/designs';
import { TransitionGroup } from 'src/components';
import { AppManager } from 'src/modules';
import { useUserThemeColor } from 'src/features/users';
import { replacePlaceholder } from 'src/utils';
import { t } from 'src/translations';

import { useAddQuest, useQuestPhase, QuestFormPhase } from '../../hooks';
import { EnterTitle } from '../../components/EnterTitle';
import { EnterMemo } from '../../components/EnterMemo';
import { QuestAccepted } from '../../components/QuestAccepted';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestCreateScreenProps = QuestStackProps<'QuestCreate'>;

const ErrorToastContent = <Text variant="primary">{t('message.error.common')}</Text>;

export function QuestCreateScreen({ navigation }: QuestCreateScreenProps): JSX.Element {
  const userColor = useUserThemeColor();
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');
  const { phase, back, next, complete } = useQuestPhase();
  const { mutate, isSuccess } = useAddQuest();

  const backPressHandler = phase === QuestFormPhase.EnterMemo
    ? back
    : undefined;

  const handlePressAcceptButton = (): void => {
    mutate({ title: name, description: memo });
  };

  const handlePressCloseButton = useCallback((): void => {
    navigation.goBack();
  }, [navigation]);

  const handlePressShareButton = useCallback((): void => {
    Share.share({
      message: replacePlaceholder(t('template.share_new_quest.body'), name),
    }).catch(() => {
      AppManager.showToast(ErrorToastContent);
    });
  }, [name]);

  useLayoutEffect(() => {
    isSuccess && complete();
  }, [isSuccess, complete]);

  return (
    <CommonLayout>
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
