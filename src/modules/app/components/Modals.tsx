import React, { useState, useLayoutEffect } from 'react';
import { BadgeModal } from 'src/features/users/components/BadgeModal';
import { LevelUpModal } from 'src/features/users/components/LevelUpModal';
import { ModalController } from 'src/modules/app';

const controller = new ModalController([
  { id: 'levelup', on: 'levelup', component: LevelUpModal },
  { id: 'badge', on: 'unlockBadge', component: BadgeModal },
] as const);

export function Modals(): React.ReactElement {
  const [activeModalId, setActiveModalId] = useState<string | null>(null);

  useLayoutEffect(() => {
    controller.on((id) => setActiveModalId(id));
  }, []);

  return (
    <>
      {controller.getModals().map(({ id, component: ModalComponent }) => (
        <ModalComponent
          key={id}
          onClose={controller.close.bind(controller)}
          visible={id === activeModalId}
        />
      ))}
    </>
  );
}
