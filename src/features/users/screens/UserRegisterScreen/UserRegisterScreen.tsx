import React, { useState } from 'react';
import { useActor } from '@xstate/react';
import { styled, View } from 'dripsy';
import * as AppHelpers from 'src/modules/app/helpers';
import { globalMachineService } from 'src/stores/machines';
import { MINIMUM_USER_NAME_LENGTH } from 'src/constants';
import { CommonLayout, Button, Input, H1 } from 'src/designs';
import { t } from 'src/translations';
import type { RootStackProps } from 'src/navigators/RootStack/types';

type UserRegisterScreenProps = RootStackProps<'UserRegister'>;

const ACCESSIBILITY = {
  start: t('label.start'),
};

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

export function UserRegisterScreen({
  navigation,
}: UserRegisterScreenProps): React.ReactElement {
  const [_, send] = useActor(globalMachineService);
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
          accessibilityHint={ACCESSIBILITY.start}
          accessibilityLabel={ACCESSIBILITY.start}
          color="$brand"
          disableLongPress
          disabled={userName.length < MINIMUM_USER_NAME_LENGTH}
          onPress={handlePressStartButton}
        >
          {t('label.go_level_up')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
