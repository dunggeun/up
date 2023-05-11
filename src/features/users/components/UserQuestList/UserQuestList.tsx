import React, { useState, useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import { LinearGradient } from 'src/components/LinearGradient';
import { BUTTON_HEIGHT } from 'src/designs/atoms/Button/constants';
import { useQuests } from 'src/features/quests/hooks';
import { useMainTabBarInset } from 'src/hooks';
import { SHARED_CONFIG, WINDOW_HEIGHT } from 'src/constants';
import { Button, H3, Select, type ButtonProps } from 'src/designs';
import { t } from 'src/translations';
import { useUserThemeColor } from '../../hooks';
import { UserQuestItem } from '../UserQuestItem';
import type { Quest } from 'src/features/quests';

export interface UserQuestListProps {
  onCreate: () => void;
}

const ACCESSIBILITY = {
  addQuest: t('label.add_new_mission'),
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

const EmptyView = styled(H3, {
  defaultVariant: 'text.secondary',
})({
  width: '100%',
  marginTop: '20%',
  textAlign: 'center',
});

const ActivateListEmptyComponent = (
  <EmptyView>{t('message.empty_activate_mission')}</EmptyView>
);
const FinishedListEmptyComponent = (
  <EmptyView>{t('message.empty_finished_mission')}</EmptyView>
);

const FILTER_ITEM = [
  { value: 'activate', label: t('label.activate_missions') },
  { value: 'finished', label: t('label.finished_missions') },
] as const;

function CreateQuestButton({
  onPress,
}: Pick<ButtonProps, 'onPress'>): JSX.Element {
  return (
    <Button
      accessibilityHint={ACCESSIBILITY.addQuest}
      accessibilityLabel={ACCESSIBILITY.addQuest}
      color="$white"
      disableLongPress
      onPress={onPress}
    >
      {`+ ${t('label.add_new_mission')}`}
    </Button>
  );
}

export function UserQuestList({ onCreate }: UserQuestListProps): JSX.Element {
  const { data: quests } = useQuests({ suspense: true });
  const [filterValue, setFilterValue] = useState<string>(FILTER_ITEM[0].value);
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();
  const userColor = useUserThemeColor();
  const listStyle = useMemo(
    () => ({
      paddingTop: theme.space.$04,
      paddingHorizontal: theme.space.$04,
      marginHorizontal: -theme.space.$04,
    }),
    [theme],
  );

  const filteredQuests = useMemo(() => {
    if (!quests) return [];

    return quests.filter((quest) =>
      filterValue === 'activate'
        ? quest.finished_at === 0
        : quest.finished_at !== 0,
    );
  }, [quests, filterValue]);

  const renderItem = (data: ListRenderItemInfo<Quest>): JSX.Element => {
    return (
      <UserQuestItem
        animate={LAST_ANIMATABLE_ITEM_INDEX > data.index}
        data={data.item}
        index={data.index}
        tagColor={userColor}
      />
    );
  };

  const keyExtractor = (data: Quest): string => {
    return data.id.toString();
  };

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
          <>
            <CreateQuestButton onPress={onCreate} />
            <ItemSeparatorComponent />
          </>
        }
        data={filteredQuests}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={listStyle}
        {...SHARED_CONFIG.scrollableViewProps}
      />
    </ListContainer>
  );
}
