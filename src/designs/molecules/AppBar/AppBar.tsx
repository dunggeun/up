import React from 'react';
import { styled, View, Pressable } from 'dripsy';
// Require cycle 이슈 방지를 위해 전체 경로로 참조
import { LinearGradient } from 'src/components/LinearGradient';
import { H2 } from 'src/designs/atoms';
import { Icons } from 'src/assets';
import { t } from 'src/translations';
import { APP_BAR_HEIGHT, HIT_SLOP } from 'src/constants';

export interface AppBarProps {
  title?: string;
  shadow?: boolean;
  onBackPress?: () => void;
  onClosePress?: () => void;
}

const SHADOW_HEIGHT = 16;
const ACCESSIBILITY = {
  title: t('label.title'),
  back: t('label.go_back'),
  close: t('label.close'),
  empty: t('label.empty'),
} as const;

const Container = styled(View)({
  position: 'relative',
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: APP_BAR_HEIGHT,
  paddingX: '$04',
  backgroundColor: '$white',
});

const AppBarShadow = styled(LinearGradient)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  height: SHADOW_HEIGHT,
  marginBottom: -SHADOW_HEIGHT,
  zIndex: 3,
  elevation: 3,
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
  shadow = false,
  onBackPress,
  onClosePress,
}: AppBarProps): JSX.Element {
  return (
    <Container>
      {shadow ? <AppBarShadow color="white" direction="to-down" /> : null}
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
