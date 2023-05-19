import React, { memo, useState, useMemo, useEffect } from 'react';
import { styled, View, Image } from 'dripsy';
import { MotiView } from 'moti';
import * as AppHelpers from 'src/modules/app/helpers';
import { AppEventChannel } from 'src/modules/event';
import { BORDER_WIDTH } from 'src/constants';
import { H2, Text } from 'src/designs';
import { Modal, type ModalProps } from 'src/components';
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

export const PlainBadgeModal = memo(function BadgeModal({
  badge,
  visible,
  showUnlockedTitle = false,
  onClose,
}: BadgeModalProps): React.ReactElement {
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
});

export function BadgeModal({
  visible,
  onClose,
}: Pick<ModalProps, 'visible' | 'onClose'>): React.ReactElement {
  const [badgeId, setBadgeId] = useState(0);
  const badge = useMemo(() => AppHelpers.getBadge(badgeId), [badgeId]);

  useEffect(() => {
    const channel = AppEventChannel.getInstance();
    const subscription = channel.addEventListener('unlockBadge', (event) => {
      setBadgeId(event.badgeId);
    });

    return (): void => subscription.remove();
  }, []);

  return (
    <PlainBadgeModal
      badge={badge}
      onClose={onClose}
      showUnlockedTitle
      visible={visible}
    />
  );
}
