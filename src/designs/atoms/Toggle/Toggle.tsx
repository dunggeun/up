import React, { useState } from 'react';
import { Pressable, View, styled, useDripsyTheme } from 'dripsy';
import { MotiView } from 'moti';
import { presets } from 'src/themes';
import { BORDER_WIDTH } from 'src/constants';
import { HapticFeedback } from 'src/components';
import type { basicColors } from 'src/themes/colors';

export interface ToggleProps {
  color: keyof typeof basicColors;
  initialValue?: boolean;
  onChange?: (value: boolean) => void;
}

const TOGGLE_HEIGHT = 36;
const TOGGLE_WIDTH = 76;
const SWITCH_WIDTH = 40;
const TOGGLE_FLOATING_HEIGHT = 2;
const SWITCH_FLOATING_HEIGHT = 3;

const ANIMATE_DURATION = 200;

const Container = styled(Pressable)(
  presets.buttonShadow({
    position: 'relative',
    width: TOGGLE_WIDTH,
    height: TOGGLE_HEIGHT,
    marginTop: -10,
  }),
);

const Shadow = styled(View)(
  presets.buttonShadow({
    bottom: -TOGGLE_FLOATING_HEIGHT,
  }),
);

const SwitchPanel = styled(View)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: '100%',
  borderRadius: '$md',
  borderWidth: BORDER_WIDTH,
  backgroundColor: '$white',
});

const SwitchWrapper = styled(MotiView)({
  position: 'absolute',
  bottom: SWITCH_FLOATING_HEIGHT,
  width: SWITCH_WIDTH,
  height: TOGGLE_HEIGHT,
});

const SwitchShadow = styled(View)(
  presets.buttonShadow({
    width: '100%',
    height: '100%',
    bottom: -SWITCH_FLOATING_HEIGHT,
  }),
);

const Switch = styled(MotiView)(
  presets.buttonCap({
    width: '100%',
  }),
);

export function Toggle({
  color,
  initialValue = false,
  onChange,
}: ToggleProps): React.ReactElement {
  const [value, setValue] = useState(initialValue);
  const { theme } = useDripsyTheme();
  const switchColor = theme.colors[color];

  return (
    <HapticFeedback>
      <Container
        onPress={(): void =>
          setValue((v) => {
            const newValue = !v;
            onChange?.(newValue);
            return newValue;
          })
        }
      >
        <Shadow />
        <SwitchPanel />
        <SwitchWrapper
          animate={{ left: value ? SWITCH_WIDTH - BORDER_WIDTH * 2 : 0 }}
          transition={{ type: 'timing', duration: ANIMATE_DURATION }}
        >
          <SwitchShadow />
          <Switch
            animate={{ backgroundColor: value ? switchColor : 'white' }}
            transition={{ type: 'timing', duration: ANIMATE_DURATION }}
          />
        </SwitchWrapper>
      </Container>
    </HapticFeedback>
  );
}
