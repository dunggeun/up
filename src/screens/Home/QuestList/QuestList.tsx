import React, { useMemo } from 'react';
import { FlatList } from 'react-native';
import { styled, useDripsyTheme, View } from 'dripsy';
import { Button, H2, Tag } from 'src/designs';
import { LinearGradient } from 'src/components';
import { useMainTabBarInset } from 'src/hooks';
import { t } from 'src/translations';

import type { ListRenderItemInfo } from 'react-native';
import type { ButtonProps } from 'src/designs';
import type { Quest } from 'src/types';

export interface QuestListProps {
  quests: Quest[];
  onCreate: () => void;
}

const SHADOW_HEIGHT = 16;

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

export function QuestList ({ quests, onCreate }: QuestListProps): JSX.Element {
  const { bottomInset } = useMainTabBarInset();
  const { theme } = useDripsyTheme();
  const listStyle = useMemo(() => ({
    paddingTop: theme.space.$04,
    paddingHorizontal: theme.space.$04,
    marginHorizontal: -theme.space.$04,
  }), [theme]);

  const renderItem = (data: ListRenderItemInfo<Quest>): JSX.Element => {
    const shouldShowBadge = data.item.current_streak > 0;

    return (
      <Button
        color="$white"
        rightAdornment={
          shouldShowBadge
            ? <Tag color="$brand" label={`x${data.item.current_streak}`}/>
            : <View />
        }
      >
        {data.item.title}
      </Button>
    );
  };

  return (
    <ListContainer>
      <ListTitleArea>
        <H2 variant="primary">{t('title.quest_in_progress')}</H2>
        <ListShadow color={theme.colors.$white} rotate={90} toOpacity={0} />
      </ListTitleArea>
      <FlatList
        ItemSeparatorComponent={ItemSeparatorComponent}
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
        keyExtractor={(data): string => data.id.toString()}
        renderItem={renderItem}
        style={listStyle}
      />
    </ListContainer>
  );
};
