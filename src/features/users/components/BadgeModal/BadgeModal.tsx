import React, { memo, useState, useEffect } from 'react';
import { styled, View, Image } from 'dripsy';
import { MotiView } from 'moti';
import * as AppHelpers from 'src/modules/app/helpers';
import { AppEventChannel } from 'src/modules/event';
import { BORDER_WIDTH } from 'src/constants';
import { H2, Text } from 'src/designs';
import { Modal } from 'src/components';
import type { ModalProps } from 'src/components';
import { t } from 'src/translations';
import type { Badge } from 'src/modules/app/types';

interface BadgeModalProps extends Pick<ModalProps, 'visible' | 'onClose'> {
  badge: Badge;
  showUnlockedTitle?: boolean;
}

const Content = styled(View)({
  alignItems: 'center',
  gap: '$04',
});

const BadgeImageArea = styled(MotiView)({
  width: 80,
  height: 80,
  borderRadius: '$md',
  borderWidth: BORDER_WIDTH,
  borderColor: '$border',
  backgroundColor: '$secondary_2',
});

const BadgeImage = styled(Image)({
  width: '100%',
  height: '100%',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function BadgeModal({
  badge,
  visible,
  showUnlockedTitle = false,
  onClose,
}: BadgeModalProps): JSX.Element {
  return (
    <Modal
      onClose={onClose}
      title={showUnlockedTitle ? t('title.badge_unlocked') : undefined}
      visible={visible}
    >
      <Content testID="badge-modal">
        <BadgeImageArea
          animate={{ scale: 1 }}
          from={{ scale: 0 }}
          transition={{ type: 'spring', damping: 5 }}
        >
          {badge.image ? <BadgeImage source={badge.image} /> : null}
        </BadgeImageArea>
        <H2>{badge.title}</H2>
        <Message variant="text.primary">{badge.description}</Message>
      </Content>
    </Modal>
  );
}

export const EventBasedBadgeModal = memo(function EventBasedBadgeModal() {
  const [badgeId, setBadgeId] = useState(0);
  const [visibility, setVisibility] = useState(false);
  const badge = AppHelpers.getBadge(badgeId);

  const handleClose = (): void => {
    setVisibility(false);
  };

  useEffect(() => {
    const subscription = AppEventChannel.getInstance().addEventListener(
      'unlockBadge',
      (event) => {
        setBadgeId(event.badgeId);
        setVisibility(true);
      },
    );

    return (): void => subscription.remove();
  }, []);

  return (
    <BadgeModal
      badge={badge}
      onClose={handleClose}
      showUnlockedTitle
      visible={visibility}
    />
  );
});
