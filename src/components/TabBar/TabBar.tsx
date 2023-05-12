import React, { createElement, type FunctionComponent } from 'react';
import {
  TouchableOpacity,
  type StyleProp,
  type ViewStyle,
  type TextStyle,
} from 'react-native';
import { styled, View } from 'dripsy';
import { triggerHaptic } from 'src/utils';
import { CONTAINER_MAX_WIDTH } from 'src/constants';
import type { BottomTabBarProps } from '@react-navigation/bottom-tabs';

export const TAB_BAR_HEIGHT = 70;
export const TAB_BAR_MIN_WIDTH = 250;
export const BORDER_WIDTH = 2;
const TAB_HIT_SLOP = {
  top: 10,
  bottom: 10,
  left: 16,
  right: 16,
};

const BottomFixedArea = styled(View)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  elevation: 1,
  zIndex: 1,
});

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignSelf: 'center',
  width: '50%',
  minWidth: TAB_BAR_MIN_WIDTH,
  maxWidth: CONTAINER_MAX_WIDTH / 2,
  height: TAB_BAR_HEIGHT,
  padding: '$04',
  borderRadius: '$full',
  borderWidth: BORDER_WIDTH,
  borderTopWidth: BORDER_WIDTH,
  borderColor: '$border',
  borderTopColor: '$border',
  backgroundColor: '$white',
});

const TabItem = styled(TouchableOpacity)({
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
});

export function TabBar({
  state,
  descriptors,
  navigation,
}: BottomTabBarProps): JSX.Element {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const tabDescriptor = descriptors[state.routes[0]?.key ?? '']!;
  const tabBarStyle = tabDescriptor.options.tabBarStyle as ViewStyle;

  return (
    <BottomFixedArea style={tabBarStyle}>
      <Container>
        {state.routes.map((route, index) => {
          // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          const { options } = descriptors[route.key]!;
          const isFocused = state.index === index;
          const iconTintColor = isFocused
            ? options.tabBarActiveTintColor
            : options.tabBarInactiveTintColor;

          const onPress = (): void => {
            triggerHaptic('press');

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({
                name: route.name,
                merge: true,
                params: undefined,
              });
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          const accessibilityLabel =
            options.tabBarAccessibilityLabel ?? options.title;

          return (
            <TabItem
              accessibilityHint={accessibilityLabel}
              accessibilityLabel={accessibilityLabel}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              hitSlop={TAB_HIT_SLOP}
              key={route.name}
              onLongPress={onLongPress}
              onPress={onPress}
              testID={options.tabBarTestID}
            >
              {options.tabBarIcon
                ? createElement(
                    options.tabBarIcon as FunctionComponent<{
                      focused: boolean;
                      color: string;
                      size: number;
                      style?: StyleProp<TextStyle>;
                    }>,
                    {
                      style: options.tabBarIconStyle,
                      focused: isFocused,
                      color: iconTintColor ?? '',
                      size: 0,
                    },
                    null,
                  )
                : null}
            </TabItem>
          );
        })}
      </Container>
    </BottomFixedArea>
  );
}
