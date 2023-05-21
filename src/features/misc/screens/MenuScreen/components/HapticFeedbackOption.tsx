import React from 'react';
import { styled, View } from 'dripsy';
import { useUserThemeColor } from 'src/features/users';
import { H2, Toggle } from 'src/designs';
import { t } from 'src/translations';

interface HapticFeedbackOptionProps {
  hapticEnabled: boolean;
  onChangeToggle: (value: boolean) => void;
}

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$04',
});

export function HapticFeedbackOption({
  hapticEnabled,
  onChangeToggle,
}: HapticFeedbackOptionProps): React.ReactElement {
  const userColor = useUserThemeColor();
  return (
    <Container>
      <H2 variant="primary">{t('label.haptic_feedback')}</H2>
      <Toggle
        color={userColor}
        initialValue={hapticEnabled}
        onChange={onChangeToggle}
      />
    </Container>
  );
}
