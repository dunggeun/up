import React from 'react';
import { View } from 'react-native';
import { styled, Container } from 'dripsy';
import { SafeAreaView } from 'react-native-safe-area-context';
import { t } from 'src/translations';
import { presets } from 'src/themes';
import { Button, H1, AppBar } from 'src/designs';

import type { RootStackProps } from 'src/navigators/RootStack/types';

type LandingProps = RootStackProps<'Landing'>;

const Content = styled(View)({
  flex: 1,
});

const PageTitleArea = styled(View)({
  paddingY: '$04',
});

const ButtonArea = styled(View)({
  paddingY: '$04',
});

export function Landing ({ navigation }: LandingProps): JSX.Element {
  const handlePressNextButton = (): void => {
    navigation.navigate('RegisterUser');
  };

  return (
    <SafeAreaView style={presets.flexWhite}>
      <Container>
        <AppBar />
        <Content>
          <PageTitleArea>
            <H1>{t('message.greeting')}</H1>
          </PageTitleArea>
        </Content>
        <ButtonArea>
          <Button
            color="$brand"
            disableLongPress
            label={t('label.start')}
            onPress={handlePressNextButton}
          />
        </ButtonArea>
      </Container>
    </SafeAreaView>
  );
}
