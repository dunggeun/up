import React, { useRef, useEffect, type PropsWithChildren } from 'react';
import { styled, View, Pressable } from 'dripsy';
import { AnimatePresence, MotiView } from 'moti';
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
const ANIMATE_DURATION = 200;

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  paddingY: '$02',
});

const Label = styled(H2, { defaultVariant: 'text.primary' })({
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

const withAnimate = (
  element: React.ReactElement,
  { key, disabled }: { key: string; disabled: boolean },
): React.ReactElement => (
  <MotiView
    animate={{ scale: 1 }}
    exit={{ scale: 0 }}
    exitTransition={{
      type: 'timing',
      duration: ANIMATE_DURATION,
    }}
    from={{ scale: 0.5 }}
    key={key}
    transition={{
      type: 'timing',
      duration: disabled ? 0 : ANIMATE_DURATION,
    }}
  >
    {element}
  </MotiView>
);

export function ReminderOption({
  onPressTimePicker,
  onChangeToggle,
  ...restProps
}: ReminderOptionProps): React.ReactElement {
  const isFirstRenderRef = useRef(true);
  const userColor = useUserThemeColor();
  const disabled = !restProps.permissionGranted;

  useEffect(() => {
    // 첫 메뉴화면 진입 시 애니메이션이 동작되는 것을 방지하기 위한 flag
    isFirstRenderRef.current = false;
  }, []);

  return (
    <Container>
      <AnimatePresence exitBeforeEnter>
        {match(restProps)
          .with({ permissionGranted: false }, () =>
            withAnimate(
              <Label sx={{ borderWidth: 3, borderLeftWidth: 0 }}>
                {t('message.error.permission_required')}
              </Label>,
              { key: 'no_permission', disabled: isFirstRenderRef.current },
            ),
          )
          .with({ permissionGranted: true, remindTime: null }, () =>
            withAnimate(
              <Label sx={{ borderWidth: 3, borderLeftWidth: 0 }}>
                {t('label.notification')}
              </Label>,
              { key: 'reminder_disabled', disabled: isFirstRenderRef.current },
            ),
          )
          .with(
            { permissionGranted: true, remindTime: P.select(P.string) },
            (res) =>
              withAnimate(
                <Panel onPress={onPressTimePicker}>
                  <Label sx={{ paddingX: '$02', paddingY: '$02' }}>
                    {replacePlaceholder(t('label.reminder_time'), res)}
                  </Label>
                </Panel>,
                { key: 'reminder_enabled', disabled: isFirstRenderRef.current },
              ),
          )
          .exhaustive()}
      </AnimatePresence>
      <Toggle
        color={userColor}
        disabled={disabled}
        initialValue={Boolean(restProps.remindTime)}
        onChange={onChangeToggle}
      />
    </Container>
  );
}
