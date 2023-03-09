import React from 'react';
import { useRecoilState } from 'recoil';
import { CommonLayout } from 'src/designs';
import { TransitionGroup } from 'src/components';
import { useUserThemeColor } from 'src/features/users';
import { StorageManager } from 'src/modules';
import { createQuestData } from 'src/modules/app/helpers';
import { questList } from 'src/stores';

import { EnterTitle } from '../../components/EnterTitle';
import { EnterMemo } from '../../components/EnterMemo';
import { QuestAccepted } from '../../components/QuestAccepted';
import { useQuestForm, QuestFormPhase } from '../../hooks';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestCreateScreenProps = QuestStackProps<'QuestCreate'>;

export function QuestCreateScreen({ navigation }: QuestCreateScreenProps): JSX.Element {
  const userColor = useUserThemeColor();
  const [quests, setQuests] = useRecoilState(questList);
  const { phase, name, memo, setName, setMemo, back, next } = useQuestForm({
    onConfirm: () => {
      const newQuest = createQuestData(name, memo);
      return StorageManager
        .getInstance()
        .addQuest(newQuest)
        .then(() => setQuests([newQuest, ...quests]));
    },
  });

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressShareButton = (): void => {
    // @todo
  };

  const backPressHandler = phase === QuestFormPhase.EnterMemo
    ? back
    : undefined;

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
          onPressNext={next}
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
