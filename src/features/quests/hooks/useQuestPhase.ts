import { useState, useCallback } from 'react';

export enum QuestFormPhase {
  EnterTitle = 0,
  EnterMemo = 1,
  Accepted = 2,
}

export const useQuestPhase = (): {
  phase: QuestFormPhase;
  back: () => void;
  next: () => void;
  complete: () => void;
} => {
  const [phase, setPhase] = useState(QuestFormPhase.EnterTitle);

  const back = (): void => {
    if (phase !== QuestFormPhase.EnterMemo) return;
    setPhase(QuestFormPhase.EnterTitle);
  };

  const next = (): void => {
    switch (phase) {
      case QuestFormPhase.EnterTitle:
        setPhase(QuestFormPhase.EnterMemo);
        break;

      default:
        break;
    }
  };

  const complete = useCallback((): void => {
    setPhase(QuestFormPhase.Accepted);
  }, []);

  return { phase, back, next, complete };
};
