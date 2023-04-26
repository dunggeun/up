import React, { useState } from 'react';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import { CommonLayout, Button, Input, H1 } from 'src/designs';
import { AppManager } from 'src/modules';
import * as AppHelpers from 'src/modules/app/helpers';
import { t } from 'src/translations';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type UserRegisterScreenProps = RootStackProps<'UserRegister'>;

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

export function UserRegisterScreen({
  navigation,
}: UserRegisterScreenProps): JSX.Element {
  const [_, send] = useActor(AppManager.getInstance().getService());
  const [userName, setUserName] = useState('');

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handlePressStartButton = (): void => {
    send({
      type: 'LOGIN',
      user: AppHelpers.createUserData(userName),
    });
  };

  const handleChangeUserName = (name: string): void => {
    setUserName(name);
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
