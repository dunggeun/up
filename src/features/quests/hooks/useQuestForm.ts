import { useState } from 'react';

interface QuestFormConfig {
  onConfirm: () => Promise<void>;
}

export enum QuestFormPhase {
  EnterTitle = 0,
  EnterMemo = 1,
  Accepted = 2,
}

export const useQuestForm = ({ onConfirm }: QuestFormConfig): {
  phase: QuestFormPhase;
  name: string;
  memo: string;
  setName: (text: string) => void;
  setMemo: (text: string) => void;
  back: () => void;
  next: () => void;
} => {
  const [phase, setPhase] = useState(QuestFormPhase.EnterTitle);
  const [name, setName] = useState('');
  const [memo, setMemo] = useState('');

  const back = (): void => {
    if (phase !== QuestFormPhase.EnterMemo) return;
    setPhase(QuestFormPhase.EnterTitle);
  };

  const next = (): void => {
    switch (phase) {
      case QuestFormPhase.EnterTitle:
        setPhase(QuestFormPhase.EnterMemo);
        break;

      case QuestFormPhase.EnterMemo:
        // eslint-disable-next-line @typescript-eslint/no-floating-promises
        onConfirm().then(() => setPhase(QuestFormPhase.Accepted));
        break;

      default:
        break;
    }
  };

  return { phase, name, memo, setName, setMemo, back, next };
};
