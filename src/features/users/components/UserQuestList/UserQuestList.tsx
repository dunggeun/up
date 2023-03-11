import React, { useMemo } from 'react';
import { FlatList, type ListRenderItemInfo } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import { Button, H2, H3, type ButtonProps } from 'src/designs';
import { LinearGradient } from 'src/components/LinearGradient';
import { useQuests } from 'src/features/quests/hooks';
import { useMainTabBarInset } from 'src/hooks';
import { SHARED_CONFIG, WINDOW_HEIGHT } from 'src/constants';
import { t } from 'src/translations';
import { BUTTON_HEIGHT } from 'src/designs/atoms/Button/constants';

import { UserQuestItem } from '../UserQuestItem';
import { useUserThemeColor } from '../../hooks';

import type { Quest } from 'src/features/quests';

export interface UserQuestListProps {
  onCreate: () => void;
}

const SHADOW_HEIGHT = 16;
const LAST_ANIMATABLE_ITEM_INDEX = Math.floor((WINDOW_HEIGHT - 110) / BUTTON_HEIGHT) - 1;

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

const ListEmptyComponent = <EmptyView>{t('message.empty_quest')}</EmptyView>;

function CreateQuestButton({ onPress }: Pick<ButtonProps, 'onPress'>): JSX.Element {
  return (
    <Button
      color="$white"
      disableLongPress
      onPress={onPress}
    >
      {`+ ${t('label.add_new_quest')}`}
    </Button>
  );
}

export function UserQuestList({ onCreate }: UserQuestListProps): JSX.Element {
  const { data: quests } = useQuests({ suspense: true });
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();
  const userColor = useUserThemeColor();
  const listStyle = useMemo(() => ({
    paddingTop: theme.space.$04,
    paddingHorizontal: theme.space.$04,
    marginHorizontal: -theme.space.$04,
  }), [theme]);

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
    return data.id.toString() + userColor;
  };

  return (
    <ListContainer>
      <ListTitleArea>
        <H2 variant="primary">{t('title.quest_in_progress')}</H2>
        <ListShadow color={theme.colors.$white} direction="to-down" />
      </ListTitleArea>
      <FlatList
        ItemSeparatorComponent={ItemSeparatorComponent}
        ListEmptyComponent={ListEmptyComponent}
        ListFooterComponent={View}
        ListFooterComponentStyle={{ height: bottomInset }}
        ListHeaderComponent={
          <>
            <CreateQuestButton onPress={onCreate} />
            <ItemSeparatorComponent />
          </>
        }
        data={quests}
        extraData={quests}
        keyExtractor={keyExtractor}
        renderItem={renderItem}
        style={listStyle}
        {...SHARED_CONFIG.scrollableViewProps}
      />
    </ListContainer>
  );
};
