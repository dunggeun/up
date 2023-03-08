import React from 'react';
import { useActor } from '@xstate/react';
import { AppManager } from 'src/modules';
import * as AppHelpers from 'src/modules/app/helpers';
import { RegisterUser } from './RegisterUser';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type RegisterUserScreenProps = RootStackProps<'RegisterUser'>;


export function RegisterUserScreen({
  navigation
}: RegisterUserScreenProps): JSX.Element {
  const [_, send] = useActor(AppManager.getInstance().getService());

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handlePressStartButton = (userName: string): void => {
    send({
      type: 'LOGIN',
      user: AppHelpers.createUserData(userName),
    });
  };

  return (
    <RegisterUser
      onPressBack={handlePressBackButton}
      onPressStart={handlePressStartButton}
    />
  );
}
