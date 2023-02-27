import React from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled, View } from 'dripsy';
import { CommonLayout, Text } from 'src/designs';
import { ListItem } from 'src/components';
import { useMainTabBarInset } from 'src/hooks';
import { navigate } from 'src/navigators/helpers';
import { openMail } from 'src/utils';
import { t } from 'src/translations';
import { DEVELOPER_EMAIL, VERSION } from 'src/constants';

interface MenuProps {
  onPressReset: () => void;
}

const Main = styled(View)();

const DeleteTextButton = styled(TouchableOpacity)({
  justifyContent: 'center',
  alignItems: 'center',
  paddingY: '$04',
});

export function Menu ({ onPressReset }: MenuProps): JSX.Element {
  const { bottomInset } = useMainTabBarInset();

  const handlePressSendFeedback = (): void => {
    openMail(DEVELOPER_EMAIL, {
      subject: t('template.send_feedback.title'),
      body: t('template.send_feedback.body'),
    });
  };

  const handlePressRating = (): void => {
    // @todo
  };

  const handlePressOpenSource = (): void => {
    navigate('Common', 'OpenSourceProject');
  };
  
  return (
    <CommonLayout insetBottom={false}>
      <CommonLayout.Header title={t('title.menu')} />
      <CommonLayout.Body>
        <Main>
          <ListItem
            label={t('label.version')}
            subLabel={VERSION}
          />
          <ListItem
            label={t('label.send_feedback')}
            onPress={handlePressSendFeedback}
          />
          <ListItem
            label={t('label.rating')}
            onPress={handlePressRating}
          />
          <ListItem
            label={t('label.open_source')}
            onPress={handlePressOpenSource}
          />
          <DeleteTextButton onPress={onPressReset}>
            <Text sx={{ color: '$text_tertiary' }}>
              {t('label.reset_data')}
            </Text>
          </DeleteTextButton>
          <View sx={{ height: bottomInset }} />
        </Main>
      </CommonLayout.Body>
    </CommonLayout>
  );
}
