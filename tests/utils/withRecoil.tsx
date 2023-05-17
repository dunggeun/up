import React from 'react';
import { RecoilRoot } from 'recoil';

export const withRecoil = (
  component: React.ReactElement,
): React.ReactElement => <RecoilRoot>{component}</RecoilRoot>;
