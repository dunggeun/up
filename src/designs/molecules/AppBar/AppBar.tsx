import React from 'react';
import { styled, View, Pressable } from 'dripsy';
import { H2 } from 'src/designs/atoms';
import { t } from 'src/translations';
import { Icons } from 'src/assets';

export interface AppBarProps {
  title?: string;
  onBackPress?: () => void;
  onClosePress?: () => void;
}

const HIT_SLOP = 5;

const ACCESSIBILITY = {
  title: t('label.title'),
  back: t('label.go_back'),
  close: t('label.close'),
  empty: t('label.empty'),
} as const;

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 56,
  paddingX: '$04',
  backgroundColor: '$white',
});

const SideButtonArea = styled(View)({
  width: 30,
  height: 30,
});

const SideButton = styled(Pressable)({
  width: '100%',
  height: '100%',
  justifyContent: 'center',
  alignItems: 'center',
});

export function AppBar ({
  title = '',
  onBackPress,
  onClosePress,
}: AppBarProps): JSX.Element {
  return (
    <Container>
      <SideButtonArea>
        {onBackPress ? (
          <SideButton
            accessibilityHint={ACCESSIBILITY.back}
            accessibilityLabel={ACCESSIBILITY.back}
            hitSlop={HIT_SLOP}
            onPress={onBackPress}
          >
            <Icons.ArrowLeft />
          </SideButton>
        ) : null}
      </SideButtonArea>
      <H2
        accessibilityHint={ACCESSIBILITY.title}
        accessibilityLabel={title || ACCESSIBILITY.empty}
        sx={{ color: '$text_primary' }}
      >
        {title}
      </H2>
      <SideButtonArea>
        {onClosePress ? (
          <SideButton
            accessibilityHint={ACCESSIBILITY.close}
            accessibilityLabel={ACCESSIBILITY.close}
            hitSlop={HIT_SLOP}
            onPress={onClosePress}
          >
            <Icons.Close />
          </SideButton>
        ) : null}
      </SideButtonArea>
    </Container>
  );
}
