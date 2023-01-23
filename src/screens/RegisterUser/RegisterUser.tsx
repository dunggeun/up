import React, { useState } from 'react';
import { View } from 'react-native';
import { styled, Container } from 'dripsy';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'src/translations';
import { presets } from 'src/themes';
import { KeyboardAvoidingView } from 'src/components';
import { Button, Input, H1, AppBar } from 'src/designs';

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

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handleChangeUserName = (name: string): void => {
    setUserName(name);
  };

  const handlePressStartButton = () => {
    // @todo: store user name and navigate to main screen
    // eslint-disable-next-line no-console
    console.log({ userName });
  };

  return (
    <SafeAreaView style={presets.flexWhite}>
      <KeyboardAvoidingView style={{ flex: 1 }}>
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
                label={t('label.go_level_up')}
                onPress={handlePressStartButton}
              />
            </ButtonArea>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
