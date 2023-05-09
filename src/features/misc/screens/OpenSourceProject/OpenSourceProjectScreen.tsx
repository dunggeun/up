import React from 'react';
import { Linking } from 'react-native';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { noop } from 'src/utils';
import { UP_REPOSITORY_URL, DEPENDENCIES } from 'src/constants';
import { Button, CommonLayout } from 'src/designs';
import { ListItem } from 'src/components';
import { t } from 'src/translations';
import type { CommonStackProps } from 'src/navigators/CommonStack/types';

export type OpenSourceProjectProps = CommonStackProps<'OpenSourceProject'>;

const UpRepositorySection = styled(View)({
  flex: 1,
  paddingY: '$04',
});

export function OpenSourceProjectScreen({
  navigation,
}: OpenSourceProjectProps): JSX.Element {
  const userColor = useUserThemeColor();

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handlePressUpRepository = (): void => {
    Linking.openURL(UP_REPOSITORY_URL).catch(noop);
  };

  const handlePressLibrary = (packageName: string): void => {
    Linking.openURL(`https://www.npmjs.com/package/${packageName}`).catch(noop);
  };

  return (
    <CommonLayout>
      <CommonLayout.Header
        onBackPress={handlePressBackButton}
        title={t('title.open_source')}
      />
      <CommonLayout.Body>
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
          <ListItem
            key={dependency}
            label={dependency}
            onPress={(): void => handlePressLibrary(dependency)}
          />
        ))}
      </CommonLayout.Body>
      <CommonLayout.Footer />
    </CommonLayout>
  );
}
