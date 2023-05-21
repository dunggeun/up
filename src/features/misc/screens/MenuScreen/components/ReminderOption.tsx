import React, { type PropsWithChildren } from 'react';
import { styled, View, Pressable } from 'dripsy';
import { match, P } from 'ts-pattern';
import { useUserThemeColor } from 'src/features/users';
import { presets } from 'src/themes';
import { replacePlaceholder } from 'src/utils';
import { H2, Toggle } from 'src/designs';
import { t } from 'src/translations';
import type { RemindTime } from 'src/features/users';

interface ReminderOptionProps {
  permissionGranted: boolean;
  remindTime: RemindTime | null;
  onPressTimePicker: () => void;
  onChangeToggle: (value: boolean) => void;
}

const PANEL_HEIGHT = 2;

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$02',
});

const Label = styled(H2, { defaultVariant: 'primary' })({
  borderColor: 'transparent',
});

const PanelContainer = styled(Pressable)(
  presets.buttonShadow({
    position: 'relative',
    width: 'auto',
    height: 'auto',
    marginTop: -10,
  }),
);

const Shadow = styled(View)(presets.buttonShadow({ bottom: 0 }));

const Cap = styled(View)({
  position: 'absolute',
  top: -PANEL_HEIGHT,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '$md',
  borderWidth: 2,
  borderColor: '$border',
  backgroundColor: '$white',
});

export function Panel({
  children,
  onPress,
}: PropsWithChildren<{ onPress: () => void }>): React.ReactElement {
  return (
    <PanelContainer onPress={onPress}>
      <Shadow />
      <Cap />
      {children}
    </PanelContainer>
  );
}

export function ReminderOption({
  onPressTimePicker,
  onChangeToggle,
  ...restProps
}: ReminderOptionProps): React.ReactElement {
  const userColor = useUserThemeColor();
  const disabled = !restProps.permissionGranted;

  return (
    <Container>
      {match(restProps)
        .with({ permissionGranted: false }, () => (
          <Label sx={{ borderWidth: 3, borderLeftWidth: 0 }}>
            {t('message.error.permission_required')}
          </Label>
        ))
        .with({ permissionGranted: true, remindTime: null }, () => (
          <Label sx={{ borderWidth: 3, borderLeftWidth: 0 }}>
            {t('label.notification')}
          </Label>
        ))
        .with({ permissionGranted: true, remindTime: P.select() }, (res) => (
          <Panel onPress={onPressTimePicker}>
            <Label sx={{ paddingX: '$02', paddingY: '$02' }}>
              {replacePlaceholder(t('label.reminder_time'), res ?? '')}
            </Label>
          </Panel>
        ))
        .exhaustive()}
      <Toggle
        color={userColor}
        disabled={disabled}
        initialValue={Boolean(restProps.remindTime)}
        onChange={onChangeToggle}
      />
    </Container>
  );
}
