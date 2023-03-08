
import React from 'react';
import { CommonLayout } from 'src/designs';
import { Profile, QuestList } from './components';
import type { User, Quest } from 'src/types';

interface HomeProps {
  user: User;
  questList: Quest[];
  onPressCreateQuest: () => void;
  onPressQuest: (questId: number) => void;
  onLongPressQuest: (questId: number) => void;
}

export function Home ({
  user,
  questList,
  onPressQuest,
  onPressCreateQuest,
  onLongPressQuest,
}: HomeProps): JSX.Element | null {
  return (
    <CommonLayout insetBottom={false}>
      <CommonLayout.Body scrollEnabled={false}>
        <Profile user={user} />
        <QuestList
          onCreate={onPressCreateQuest}
          onLongPress={onLongPressQuest}
          onPress={onPressQuest}
          quests={questList}
        />
      </CommonLayout.Body>
    </CommonLayout>
  );
}
