import React, { useState, useCallback } from 'react';
import { useActor } from '@xstate/react';
import { ToastController } from 'src/components/Toast/ToastController';
import { globalMachineService } from 'src/stores/machines';
import { useDebounce } from 'src/hooks';
import { MINIMUM_USER_NAME_LENGTH } from 'src/constants';
import { CommonLayout, Input } from 'src/designs';
import { Section } from 'src/components';
import { t } from 'src/translations';
import { useUser } from '../../hooks';
import type { User } from '../../types';
import type { UserStackProps } from 'src/navigators/UserStack/types';

type UserEditScreenProps = UserStackProps<'UserEdit'>;

export function UserEditScreen({
  navigation,
}: UserEditScreenProps): React.ReactElement {
  const [_, send] = useActor(globalMachineService);
  const user = useUser();
  const [userName, setUserName] = useState(user.name);

  const handlePressBackButton = (): void => {
    navigation.goBack();
  };

  const handleEditUser = useCallback(
    (modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>) => {
      send({ type: 'EDIT_USER', user: modifyData });
    },
    [send],
  );

  const { trigger: lazyEditUser } = useDebounce(
    (value: Partial<Pick<User, 'theme' | 'name' | 'badge'>>) => {
      if (!value.name || value.name.length < MINIMUM_USER_NAME_LENGTH) {
        ToastController.show(t('message.error.name_too_short'));
        return;
      }
      handleEditUser(value);
      ToastController.show(t('message.user_edited'));
    },
    500,
  );

  const handleChangeUserName = (value: string): void => {
    lazyEditUser({ name: value });
    setUserName(value);
  };

  return (
    <CommonLayout keyboardAvoiding>
      <CommonLayout.Header
        onBackPress={handlePressBackButton}
        title={t('title.edit_profile')}
      />
      <CommonLayout.Body>
        <Section title={t('label.name')}>
          <Input
            onChangeText={handleChangeUserName}
            placeholder={t('placeholder.enter_name')}
            value={userName}
          />
        </Section>
      </CommonLayout.Body>
      <CommonLayout.Footer />
    </CommonLayout>
  );
}
