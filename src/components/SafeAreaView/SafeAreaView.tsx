import React, { useMemo, type PropsWithChildren } from 'react';
import type { ViewProps } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { styled, View } from 'dripsy';

export interface SafeAreaViewProps extends ViewProps {
  insetTop?: boolean;
  insetBottom?: boolean;
  insetLeft?: boolean;
  insetRight?: boolean;
}

const StyledView = styled(View)({ flex: 1 });

export function SafeAreaView({
  children,
  insetTop = true,
  insetBottom = true,
  insetLeft = true,
  insetRight = true,
  ...props
}: PropsWithChildren<SafeAreaViewProps>): JSX.Element {
  const insets = useSafeAreaInsets();
  const safeAreaStyle = useMemo(
    () => ({
      ...(insetTop ? { paddingTop: insets.top } : null),
      ...(insetBottom ? { paddingBottom: insets.bottom } : null),
      ...(insetLeft ? { paddingLeft: insets.left } : null),
      ...(insetRight ? { paddingRight: insets.right } : null),
    }),
    [insets, insetTop, insetBottom, insetLeft, insetRight],
  );

  return (
    <StyledView {...props} style={[props.style, safeAreaStyle]}>
      {children}
    </StyledView>
  );
}
