import React, { useState } from 'react';
import { useActor } from '@xstate/react';
import { FadeInView } from 'src/components';
import { delay } from 'src/utils';
import { AppManager } from 'src/modules';
import { APP_MINIMUM_LOADING_DURATION } from 'src/constants';
import { DeleteConfirmModal } from './components';
import { Menu } from './Menu';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type MenuProps = MainTabProps<'Menu'>;

const app = AppManager.getInstance();

export function MenuScreen(_props: MenuProps): JSX.Element {
  const [
    deleteConfirmModalVisibility,
    setDeleteConfirmModalVisibility
  ] = useState(false);
  const [loading, setLoading] = useState(false);
  const [_, send] = useActor(app.getService());

  const handlePressReset = (): void => {
    setDeleteConfirmModalVisibility(true);
  };

  const handleCloseDeleteConfirmModal = (): void => {
    setDeleteConfirmModalVisibility(false);
  };

  const handleDelete = async (): Promise<void> => {
    if (loading) return;

    setLoading(true);

    try {
      await Promise.all([
        app.reset(),
        delay(APP_MINIMUM_LOADING_DURATION),
      ]);
      setDeleteConfirmModalVisibility(false);
      send({ type: 'REFRESH' });
    } catch (error) {
      // @todo: error handing
    } finally {
      setLoading(false);
    }
  };

  return (
    <FadeInView>
      <Menu onPressReset={handlePressReset}/>
      <DeleteConfirmModal
        isLoading={loading}
        onClose={handleCloseDeleteConfirmModal}
        onDelete={(): void => void handleDelete()}
        visible={deleteConfirmModalVisibility}
      />
    </FadeInView>
  );
}
