import React, { useState, useEffect } from 'react';
import { styled, View } from 'dripsy';
import { MotiView } from 'moti';
import { Star } from 'src/assets/symbols';
import { AppEventChannel } from 'src/modules/event';
import { H2, Text, Modal, type ModalProps } from 'src/designs';
import { AnimatedNumber } from 'src/components';
import { t } from 'src/translations';

const CONGRATS_MESSAGE_COUNT = 3;
const LEVEL_ANIMATE_DELAY = 250;

const Content = styled(View)({
  alignItems: 'center',
  gap: '$04',
});

const StarSymbolArea = styled(MotiView)();

const LevelArea = styled(View)({
  alignItems: 'center',
  justifyContent: 'center',
});

const Message = styled(Text)({
  textAlign: 'center',
});

export function LevelUpModal({
  onClose,
  visible,
}: Pick<ModalProps, 'visible' | 'onClose'>): React.ReactElement {
  const [level, setLevel] = useState(1);

  useEffect(() => {
    const channel = AppEventChannel.getInstance();
    const subscription = channel.addEventListener('levelup', (event) => {
      setLevel(event.level);
    });

    return () => subscription.remove();
  }, []);

  return (
    <Modal onClose={onClose} visible={visible}>
      <Content testID="level-up-modal">
        <StarSymbolArea
          animate={{ scale: 1.5 }}
          from={{ scale: 0 }}
          transition={{ type: 'spring', damping: 5 }}
        >
          <Star />
        </StarSymbolArea>
        <LevelArea>
          <AnimatedNumber delay={LEVEL_ANIMATE_DELAY} size="lg" value={level} />
        </LevelArea>
        <H2>{t('label.level_up')}</H2>
        <Message variant="text.primary">
          {t(
            `message.congrats.${Math.floor(
              Math.random() * CONGRATS_MESSAGE_COUNT,
            )}`,
          )}
        </Message>
      </Content>
    </Modal>
  );
}
