import React, { useState, useEffect } from 'react';
import { styled, View } from 'dripsy';
import { fetchAchievesWithTitleByDate } from 'src/data';
import { Text, Modal, type ModalProps } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { UserCoverWebView } from '../UserCoverWebView/UserCoverWebView';
import type { User } from '../../types';

export interface ShareModalProps extends Omit<ModalProps, 'title'> {
  user: User;
  onReady: (imageData: string) => void;
}

const Content = styled(View)({
  gap: '$04',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function ShareModal({
  user,
  visible,
  onClose,
  onReady,
}: ShareModalProps): React.ReactElement {
  const [isLoading, setIsLoading] = useState(true);
  const [missions, setMissions] = useState<string[]>([]);
  const [expEarned, setExpEarned] = useState(0);

  useEffect(() => {
    if (!visible) return;
    setIsLoading(true);
    fetchAchievesWithTitleByDate({ date: new Date() })
      .then((missions) => {
        let sum = 0;
        const missionTitleList: string[] = [];
        missions.forEach(({ title, exp }) => {
          missionTitleList.push(title);
          sum += exp;
        });
        setMissions(missionTitleList);
        setExpEarned(sum);
      })
      .finally(() => setIsLoading(false));
  }, [visible]);

  return (
    <Modal onClose={onClose} title={t('label.share')} visible={visible}>
      <Content testID="share-modal">
        <LoadingIndicator />
        <Message variant="text.primary">
          {t('message.image_generating')}
        </Message>
      </Content>
      {isLoading ? null : (
        <UserCoverWebView
          expEarned={expEarned}
          missions={missions}
          onGenerated={onReady}
          user={user}
        />
      )}
    </Modal>
  );
}
