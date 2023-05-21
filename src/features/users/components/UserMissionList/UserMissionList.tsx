import React, { useState, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import Animated, {
  FadeInUp,
  FadeOutDown,
  ZoomIn,
  ZoomOutEasyDown,
} from 'react-native-reanimated';
import { styled, useDripsyTheme, View } from 'dripsy';
import { LinearGradient } from 'src/components/LinearGradient';
import { BUTTON_HEIGHT } from 'src/designs/atoms/Button/constants';
import { useMissions } from 'src/features/missions/hooks';
import { navigate } from 'src/navigators/helpers';
import { useMainTabBarInset } from 'src/hooks';
import { SHARED_CONFIG, WINDOW_HEIGHT } from 'src/constants';
import { Button, Text, Select } from 'src/designs';
import { t } from 'src/translations';
import { UserMissionItem } from '../UserMissionItem';
import type { Mission } from 'src/features/missions';

const ACCESSIBILITY = {
  addMission: t('label.add_new_mission'),
};

const SHADOW_HEIGHT = 16;
const LAST_ANIMATABLE_ITEM_INDEX =
  Math.floor((WINDOW_HEIGHT - 110) / BUTTON_HEIGHT) - 1;

const ListContainer = styled(View)({
  flex: 1,
});

const ListTitleArea = styled(View)({
  position: 'relative',
  zIndex: 3,
  elevation: 3,
});

const ListShadow = styled(LinearGradient)({
  position: 'absolute',
  bottom: 0,
  left: 0,
  width: '100%',
  height: SHADOW_HEIGHT,
  marginBottom: -SHADOW_HEIGHT,
});

const ItemSeparatorComponent = styled(View)({
  marginBottom: '$04',
});

const EmptyView = styled(Text, {
  defaultVariant: 'text.secondary',
})({
  width: '100%',
  marginTop: '20%',
  textAlign: 'center',
});

const ActivateListEmptyComponent = (
  <Animated.View
    entering={FadeInUp}
    exiting={FadeOutDown}
    key="activated-empty"
  >
    <EmptyView>{t('message.empty_activate_mission')}</EmptyView>
  </Animated.View>
);

const FinishedListEmptyComponent = (
  <Animated.View entering={FadeInUp} exiting={FadeOutDown} key="finished-empty">
    <EmptyView>{t('message.empty_finished_mission')}</EmptyView>
  </Animated.View>
);

const FILTER_ITEM = [
  { value: 'activate', label: t('label.activate_missions') },
  { value: 'finished', label: t('label.finished_missions') },
] as const;

function CreateMissionButton(): React.ReactElement {
  const handlePressCreateMission = (): void => {
    navigate('Mission', 'MissionCreate');
  };

  return (
    <Button
      accessibilityHint={ACCESSIBILITY.addMission}
      accessibilityLabel={ACCESSIBILITY.addMission}
      color="$white"
      disableLongPress
      onPress={handlePressCreateMission}
    >
      {`+ ${t('label.add_new_mission')}`}
    </Button>
  );
}

export function UserMissionList(): React.ReactElement {
  const { data: missions } = useMissions({ suspense: true });
  const [filterValue, setFilterValue] = useState<string>(FILTER_ITEM[0].value);
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();
  const listStyle = useMemo(
    () => ({
      paddingTop: theme.space.$04,
      paddingHorizontal: theme.space.$04,
      marginHorizontal: -theme.space.$04,
    }),
    [theme],
  );

  const filteredMissions = useMemo(() => {
    if (!missions) return [];

    return missions.filter((mission) =>
      filterValue === 'activate'
        ? mission.finished_at === 0
        : mission.finished_at !== 0,
    );
  }, [missions, filterValue]);

  const renderItem = (
    data: ListRenderItemInfo<Mission>,
  ): React.ReactElement => (
    <UserMissionItem
      animateEnabled={LAST_ANIMATABLE_ITEM_INDEX > data.index}
      data={data.item}
      index={data.index + 1}
    />
  );

  const keyExtractor = (data: Mission): string => data.id.toString();

  return (
    <ListContainer>
      <ListTitleArea>
        <ListShadow color={theme.colors.$white} direction="to-down" />
        <Select.Root initialValue={FILTER_ITEM[0]} onChange={setFilterValue}>
          <Select.Trigger />
          <Select.Content>
            {FILTER_ITEM.map((item) => (
              <Select.Item
                key={item.value}
                label={item.label}
                value={item.value}
              />
            ))}
          </Select.Content>
        </Select.Root>
      </ListTitleArea>
      <FlatList
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={
          filterValue === 'activate'
            ? ActivateListEmptyComponent
            : FinishedListEmptyComponent
        }
        ListFooterComponent={View}
        ListFooterComponentStyle={{ height: bottomInset }}
        ListHeaderComponent={
          filterValue === 'activate' ? (
            <Animated.View
              entering={ZoomIn.duration(200)}
              exiting={ZoomOutEasyDown.duration(200)}
            >
              <CreateMissionButton />
              <ItemSeparatorComponent />
            </Animated.View>
          ) : null
        }
        data={filteredMissions}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={listStyle}
        {...SHARED_CONFIG.scrollableViewProps}
      />
    </ListContainer>
  );
}
