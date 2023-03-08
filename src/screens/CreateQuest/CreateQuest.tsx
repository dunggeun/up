import React from 'react';
import { useRecoilState } from 'recoil';
import { CommonLayout } from 'src/designs';
import { TransitionGroup } from 'src/components';
import { useUserThemeColor } from 'src/hooks';
import { StorageManager } from 'src/modules';
import { createQuestData } from 'src/modules/app/helpers';
import { questList } from 'src/stores';
import { EnterTitle, EnterMemo, QuestAccepted } from './components';
import { useQuestForm, QuestFormPhase } from './hooks';

interface CreateQuestProps {
  onPressClose: () => void;
  onPressShare: () => void;
} 

export function CreateQuest ({
  onPressClose,
  onPressShare
}: CreateQuestProps): JSX.Element {
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

  const backPressHandler = phase === QuestFormPhase.EnterMemo
    ? back
    : undefined;

  return (
    <CommonLayout>
      <CommonLayout.Header
        onBackPress={backPressHandler}
        onClosePress={onPressClose}
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
          onPressClose={onPressClose}
          onPressShare={onPressShare}
          questMemo={memo}
          questName={name}
          userColor={userColor}
        />
      </TransitionGroup>
    </CommonLayout>
  );
}
