import React, { memo, useRef, useState } from 'react';
import { InteractionManager } from 'react-native';
import { Pressable, View, styled, useDripsyTheme } from 'dripsy';
import { MotiView } from 'moti';
import { presets } from 'src/themes';
import { BORDER_WIDTH } from 'src/constants';
import { HapticFeedback } from 'src/components';
import type { basicColors, colors } from 'src/themes/colors';

export interface ToggleProps {
  color: keyof typeof basicColors;
  disabled?: boolean;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

const TOGGLE_HEIGHT = 36;
const TOGGLE_WIDTH = 76;
const SWITCH_WIDTH = 40;
const TOGGLE_FLOATING_HEIGHT = 2;
const SWITCH_FLOATING_HEIGHT = 3;

const ANIMATE_DURATION = 150;

const Container = styled(Pressable)(
  presets.buttonShadow({
    position: 'relative',
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    marginTop: -10,
  }),
);

const Shadow = styled(View)(({ disabled }: Pick<ToggleProps, 'disabled'>) =>
  presets.buttonShadow({
    bottom: -TOGGLE_FLOATING_HEIGHT,
    ...(disabled ? { backgroundColor: '$border_disabled' } : null),
  }),
);

const SwitchPanel = styled(View)(
  ({ disabled }: Pick<ToggleProps, 'disabled'>) => ({
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '$md',
    borderWidth: BORDER_WIDTH,
    borderColor: disabled ? '$border_disabled' : '$border',
    backgroundColor: '$white',
  }),
);

const SwitchWrapper = styled(MotiView)({
  position: 'absolute',
  bottom: SWITCH_FLOATING_HEIGHT,
  width: SWITCH_WIDTH,
  height: TOGGLE_HEIGHT,
});

const SwitchShadow = styled(View)(
  ({ disabled }: Pick<ToggleProps, 'disabled'>) =>
    presets.buttonShadow({
      width: '100%',
      height: '100%',
      bottom: -SWITCH_FLOATING_HEIGHT,
      ...(disabled ? { backgroundColor: '$border_disabled' } : null),
    }),
);

const SwitchCap = styled(MotiView)(
  ({ disabled }: Pick<ToggleProps, 'disabled'>) =>
    presets.buttonCap({
      width: '100%',
      ...(disabled ? { borderColor: '$border_disabled' } : null),
    }),
);

export const Toggle = memo(function Toggle({
  color,
  disabled,
  initialValue = false,
  onChange,
}: ToggleProps): React.ReactElement {
  const taskRef = useRef<{
    timerId: NodeJS.Timeout | undefined;
    interactionTask?: ReturnType<
      typeof InteractionManager.runAfterInteractions
    >;
  }>({ timerId: undefined, interactionTask: undefined });
  const [value, setValue] = useState(initialValue);
  const { theme } = useDripsyTheme();
  const switchCapColor =
    theme.colors[
      (disabled ? `${color}_disabled` : color) as keyof typeof colors
    ];

  return (
    <HapticFeedback>
      <Container
        disabled={disabled}
        onPress={(): void => {
          let newValue: boolean;
          setValue((v) => (newValue = !v));

          // 태스트 재등록 전 초기화
          clearTimeout(taskRef.current.timerId);
          taskRef.current.interactionTask?.cancel();

          // 태스크 등록
          // 애니메이션 동작 중 다른 액션이 실행될 경우 간헐적으로 앱 중지되기에, 인터렉션이 끝난 후 처리될 수 있도록 방지
          taskRef.current.timerId = setTimeout(() => {
            taskRef.current.interactionTask =
              InteractionManager.runAfterInteractions(() => {
                onChange?.(newValue);
              });
          }, ANIMATE_DURATION);
        }}
      >
        <Shadow disabled={disabled} />
        <SwitchPanel disabled={disabled} />
        <SwitchWrapper
          animate={{ left: value ? SWITCH_WIDTH - BORDER_WIDTH * 2 : 0 }}
          transition={{ type: 'timing', duration: ANIMATE_DURATION }}
        >
          <SwitchShadow disabled={disabled} />
          <SwitchCap
            animate={{ backgroundColor: value ? switchCapColor : 'white' }}
            disabled={disabled}
            transition={{ type: 'timing', duration: ANIMATE_DURATION }}
          />
        </SwitchWrapper>
      </Container>
    </HapticFeedback>
  );
});
