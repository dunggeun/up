import React, { useCallback, useState } from 'react';
import { useActor } from '@xstate/react';
import { AppManager } from 'src/modules/app';
import { globalMachineService } from 'src/stores/machines';
import { useDebounce } from 'src/hooks';
import { CommonLayout, Input } from 'src/designs';
import { Section } from 'src/components';
import { t } from 'src/translations';
import { useUser } from '../../hooks';
import type { User } from '../../types';
import type { UserStackProps } from 'src/navigators/UserStack/types';

type UserEditScreenProps = UserStackProps<'UserEdit'>;

export function UserEditScreen({
  navigation,
}: UserEditScreenProps): JSX.Element {
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
      handleEditUser(value);
      AppManager.showToast(t('message.user_edited'));
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
