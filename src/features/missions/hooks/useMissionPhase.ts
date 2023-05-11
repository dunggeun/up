import { useState, useCallback } from 'react';

export enum MissionFormPhase {
  EnterTitle = 0,
  EnterMemo = 1,
  Accepted = 2,
}

export const useMissionPhase = (): {
  phase: MissionFormPhase;
  back: () => void;
  next: () => void;
  complete: () => void;
} => {
  const [phase, setPhase] = useState(MissionFormPhase.EnterTitle);

  const back = (): void => {
    if (phase !== MissionFormPhase.EnterMemo) return;
    setPhase(MissionFormPhase.EnterTitle);
  };

  const next = (): void => {
    switch (phase) {
      case MissionFormPhase.EnterTitle:
        setPhase(MissionFormPhase.EnterMemo);
        break;

      default:
        break;
    }
  };

  const complete = useCallback((): void => {
    setPhase(MissionFormPhase.Accepted);
  }, []);

  return { phase, back, next, complete };
};
