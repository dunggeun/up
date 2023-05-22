import { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useRecoilState } from 'recoil';
import { guideModalState as guideModalStateAtom } from 'src/stores/recoil/guide';
import { noop, runAfterModalDismissed } from 'src/utils';

interface UseGuideModalResult {
  visibility: boolean;
  setVisibility: (visibility: boolean) => void;
}

export const useGuideModal = (): UseGuideModalResult => {
  const [guideModalState, setGuideModalState] =
    useRecoilState(guideModalStateAtom);

  const setVisibility = (visibility: boolean): void => {
    setGuideModalState({ visibility });
  };

  useEffect(() => {
    runAfterModalDismissed(() => {
      AsyncStorage.getItem('guide')
        .then((data) => {
          setGuideModalState({ visibility: !data });
          return AsyncStorage.setItem('guide', '1');
        })
        .catch(noop);
    });
  }, [setGuideModalState]);

  return { visibility: guideModalState.visibility, setVisibility };
};
