import React, { useState } from 'react';
import { View } from 'react-native';
import { useActor } from '@xstate/react';
import { styled } from 'dripsy';
import { CommonLayout, Button, Input, H1 } from 'src/designs';
import { AppManager } from 'src/modules';
import * as AppHelpers from 'src/modules/app/helpers';
import { t } from 'src/translations';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type RegisterUserScreenProps = RootStackProps<'RegisterUser'>;

const PageTitleArea = styled(View)({
  paddingY: '$04',
});


export function RegisterUserScreen({
  navigation
}: RegisterUserScreenProps): JSX.Element {
  const [userName, setUserName] = useState('');
  const [_, send] = useActor(AppManager.getInstance().getService());

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handleChangeUserName = (name: string): void => {
    setUserName(name);
  };

  const handlePressStartButton = (): void => {
    send({
      type: 'LOGIN',
      user: AppHelpers.createUserData(userName),
    });
  };

  return (
    <CommonLayout keyboardAvoiding>
      <CommonLayout.Header onBackPress={handlePressBackButton} />
      <CommonLayout.Body scrollEnabled={false}>
        <PageTitleArea>
          <H1 variant="primary">{t('message.enter_name')}</H1>
        </PageTitleArea>
        <Input
          onChangeText={handleChangeUserName}
          placeholder={t('placeholder.enter_name')}
        />
      </CommonLayout.Body>
      <CommonLayout.Footer>
        <Button
          color="$brand"
          disableLongPress
          disabled={userName.length < 2}
          onPress={handlePressStartButton}
        >
          {t('label.go_level_up')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
