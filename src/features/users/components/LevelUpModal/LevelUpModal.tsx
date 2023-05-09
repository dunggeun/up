import React, { memo, useState, useCallback, useEffect } from 'react';
import { styled, View } from 'dripsy';
import { MotiView } from 'moti';
import { Star } from 'src/assets/symbols';
import { AppEventChannel } from 'src/modules/event';
import { H2, Text } from 'src/designs';
import { AnimatedNumber, Modal } from 'src/components';
import { t } from 'src/translations';

const CONGRATS_MESSAGE_COUNT = 3;
const LEVEL_ANIMATE_DELAY = 250;

const Content = styled(View)({
  alignItems: 'center',
  gap: '$04',
});

const StarSymbolArea = styled(MotiView)();

const Message = styled(Text)({
  textAlign: 'center',
});

export const LevelUpModal = memo(function LevelUpModal(): JSX.Element {
  const [level, setLevel] = useState(1);
  const [visibility, setVisibility] = useState(false);

  useEffect(() => {
    const subscription = AppEventChannel.getInstance().addEventListener(
      'levelup',
      (event) => {
        setLevel(event.level);
        setVisibility(true);
      },
    );

    return () => subscription.remove();
  }, []);

  const handleClose = useCallback(() => {
    setVisibility(false);
  }, []);

  return (
    <Modal onClose={handleClose} visible={visibility}>
      <Content testID="level-up-modal">
        <StarSymbolArea
          animate={{ scale: 1.5 }}
          from={{ scale: 0 }}
          transition={{ type: 'spring', damping: 5 }}
        >
          <Star />
        </StarSymbolArea>
        <AnimatedNumber delay={LEVEL_ANIMATE_DELAY} size="lg" value={level} />
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
});
