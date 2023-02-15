import React, { useState } from 'react';
import { View } from 'react-native';
import { useActor } from '@xstate/react';
import { styled, Container } from 'dripsy';
import { SafeAreaView, KeyboardAvoidingView } from 'src/components';
import { Button, Input, H1, AppBar } from 'src/designs';
import { AppManager } from 'src/modules';
import * as AppHelpers from 'src/modules/app/helpers';
import { t } from 'src/translations';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type RegisterUserProps = RootStackProps<'RegisterUser'>;

const Content = styled(View)({
  flex: 1,
});

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

const ButtonArea = styled(View)({
  paddingY: '$04',
});

export function RegisterUser ({ navigation }: RegisterUserProps): JSX.Element {
  const placeholder = t('placeholder.enter_name');
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
    <SafeAreaView>
      <KeyboardAvoidingView>
        <Container>
          <AppBar onBackPress={handlePressBackButton} />
          <Content>
            <PageTitleArea>
              <H1 variant="primary">{t('message.enter_name')}</H1>
            </PageTitleArea>
            <Input onChangeText={handleChangeUserName} placeholder={placeholder} />
          </Content>
          <ButtonArea>
            <Button
              color="$brand"
              disableLongPress
              disabled={userName.length < 2}
              onPress={handlePressStartButton}
            >
              {t('label.go_level_up')}
            </Button>
          </ButtonArea>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
