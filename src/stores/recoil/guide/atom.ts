import { atom } from 'recoil';

interface GuideModalState {
  visibility: boolean;
}

const initialValue = {
  visibility: false,
} as const;

export const guideModalState = atom<GuideModalState>({
  key: 'guideModalState',
  default: initialValue,
});
