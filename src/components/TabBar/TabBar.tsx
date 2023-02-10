import React, { createElement } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { styled, View } from 'dripsy';
import { triggerHaptic } from 'src/utils';
import { CONTAINER_MAX_WIDTH } from 'src/constants';

import type { FunctionComponent } from 'react';
import type { StyleProp, ViewStyle, TextStyle } from 'react-native';
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
});

const Container = styled(View)({
  flexDirection: 'row',
  justifyContent: 'space-around',
  alignSelf: 'center',
  width: '50%',
  minWidth: TAB_BAR_MIN_WIDTH,
  maxWidth: CONTAINER_MAX_WIDTH,
  height: TAB_BAR_HEIGHT,
  padding: '$04',
  borderRadius: '$full',
  borderWidth: BORDER_WIDTH,
  borderTopWidth: BORDER_WIDTH,
  borderColor: '$text_primary',
  borderTopColor: '$text_primary',
  backgroundColor: '$white',
});

const TabItem = styled(TouchableOpacity)({
  flex: 1,
  justifyContent: 'center',
});

export function TabBar ({ state, descriptors, navigation }: BottomTabBarProps): JSX.Element {
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
            triggerHaptic('selection');

            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true, params: undefined });
            }
          };

          const onLongPress = (): void => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };

          return (
            <TabItem
              accessibilityHint={options.tabBarAccessibilityLabel}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              hitSlop={TAB_HIT_SLOP}
              key={route.name}
              onLongPress={onLongPress}
              onPress={onPress}
              testID={options.tabBarTestID}
            >
              {options.tabBarIcon ? (
                createElement(
                  options.tabBarIcon as FunctionComponent<{
                    focused: boolean;
                    color: string;
                    size: number;
                    style?: StyleProp<TextStyle>
                  }>,
                  {
                    style: options.tabBarIconStyle,
                    focused: isFocused,
                    color: iconTintColor ?? '',
                    size: 0,
                  },
                  null,
                )
              ) : null}
            </TabItem>
          );
        })}
      </Container>
    </BottomFixedArea>
  );
};
