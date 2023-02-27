import React, { useCallback } from 'react';
import { useActor } from '@xstate/react';
import { FadeInView } from 'src/components';
import { AppManager } from 'src/modules';

import { Profile } from './Profile';
import type { User } from 'src/types';
import type { MainTabProps } from 'src/navigators/MainTab/types';

type ProfileScreenProps = MainTabProps<'Profile'>;

export function ProfileScreen(_props: ProfileScreenProps): JSX.Element | null {
  const [state, send] = useActor(AppManager.getInstance().getService());
  const user = state.context.user;

  const handleEditUser = useCallback((
    modifyData: Partial<Pick<User, 'name' | 'badge' | 'theme'>>,
  ) => {
    send({ type: 'EDIT_USER', user: modifyData });
  }, [send]);

  if (!user) return null;

  return (
    <FadeInView>
      <Profile onEditUser={handleEditUser} user={user} />
    </FadeInView>
  );
}
