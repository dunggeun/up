import React, { useMemo } from 'react';
import { styled, useDripsyTheme, View, Text } from 'dripsy';

import Color from 'color';
import type { ComponentPropsWithoutRef } from 'react';
import type { colors } from 'src/themes/colors';

type ViewProps = ComponentPropsWithoutRef<typeof View>;

export interface TagProps extends ViewProps {
  label: string;
  color: keyof typeof colors;
  disabled?: boolean;
}

const BORDER_WIDTH = 2;

const Container = styled(View)(
  ({ color, disabled }: Pick<TagProps, 'color' | 'disabled'>) => ({
    paddingX: '$02',
    paddingY: '$01',
    borderRadius: '$full',
    backgroundColor: disabled ? `${color}_disabled` : color,
    borderWidth: BORDER_WIDTH,
    borderColor: disabled ? '$border_disabled' : '$border',
  }),
);

const TagLabel = styled(Text)(
  ({
    isLight,
    disabled,
  }: { isLight: boolean } & Pick<TagProps, 'disabled'>) => {
    const labelColor = isLight ? '$text_primary' : '$white';
    return { color: disabled ? `${labelColor}_disabled` : labelColor };
  },
);

export function Tag({
  label,
  color,
  disabled = false,
  ...restProps
}: TagProps): JSX.Element {
  const dripsyTheme = useDripsyTheme();

  const isLight = useMemo(
    () => Color(dripsyTheme.theme.colors[color]).isLight(),
    [dripsyTheme, color],
  );

  return (
    <Container {...restProps} color={color} disabled={disabled}>
      <TagLabel disabled={disabled} isLight={isLight}>
        {label}
      </TagLabel>
    </Container>
  );
}
