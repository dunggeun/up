import React from 'react';
import { Linking, ScrollView } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppBar, Button } from 'src/designs';
import { SafeAreaView, ListItem } from 'src/components';
import { useUserThemeColor } from 'src/hooks';
import { noop } from 'src/utils';
import { UP_REPOSITORY_URL, DEPENDENCIES } from 'src/constants';
import { t } from 'src/translations';

import type { CommonStackProps } from 'src/navigators/CommonStack/types';

export type OpenSourceProjectProps = CommonStackProps<'OpenSourceProject'>;

const Container = styled(ScrollView)();

const UpRepositorySection = styled(View)({
  flex: 1,
  paddingY: '$04',
});

export function OpenSourceProject ({
  navigation
}: OpenSourceProjectProps): JSX.Element {
  const { theme } = useDripsyTheme();
  const { bottom } = useSafeAreaInsets();
  const userColor = useUserThemeColor();

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handlePressUpRepository = (): void => {
    Linking.openURL(UP_REPOSITORY_URL).catch(noop);
  };

  return (
    <SafeAreaView insetBottom={false}>
      <AppBar onBackPress={handlePressBackButton} shadow title={t('title.open_source')} />
      <Container
        contentContainerStyle={{ paddingBottom: bottom }}
        sx={theme.layout.container}
      >
        <UpRepositorySection>
          <Button
            color={userColor}
            disableLongPress
            onPress={handlePressUpRepository}
          >
            {t('label.up_repository')}
          </Button>
        </UpRepositorySection>
        {Object.keys(DEPENDENCIES).map((dependency) => (
          <ListItem key={dependency} label={dependency}/>
        ))}
      </Container>
    </SafeAreaView>
  );
}
