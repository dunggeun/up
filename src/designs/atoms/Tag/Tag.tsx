import React from 'react';
import { styled, View, Text } from 'dripsy';
import { isLight } from 'src/themes/utils';

import type { ComponentPropsWithoutRef } from 'react';
import type { colors } from 'src/themes/colors';

type ViewProps = ComponentPropsWithoutRef<typeof View>;
 
export interface TagProps extends ViewProps {
  label: string;
  color: keyof typeof colors;
}

const BORDER_WIDTH = 2;

const Container = styled(View)(({ color }: Pick<TagProps, 'color'>) => ({
  alignSelf: 'baseline',
  paddingX: '$02',
  paddingY: '$01',
  borderRadius: '$full',
  borderWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  backgroundColor: color,
}));

export function Tag ({ label, color, ...restProps }: TagProps): JSX.Element {
  const labelVariant = isLight(color) ? 'primary' : 'white';

  return (
    <Container {...restProps} color={color} >
      <Text variant={labelVariant}>{label}</Text>
    </Container>
  );
}
