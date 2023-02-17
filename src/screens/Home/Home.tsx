
import React from 'react';
import { useActor } from '@xstate/react';
import { useRecoilValue } from 'recoil';
import { useSx, useDripsyTheme, Container } from 'dripsy';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { FadeInView } from 'src/components';
import { navigate } from 'src/navigators/helpers';
import { AppManager } from 'src/modules';
import { activeQuestList } from 'src/stores';
import { Profile } from './Profile';
import { QuestList } from './QuestList';

import type { MainTabProps } from 'src/navigators/MainTab/types';

type HomeProps = MainTabProps<'Home'>;

export function Home (_props: HomeProps): JSX.Element | null {
  const [state] = useActor(AppManager.getInstance().getService());
  const { top } = useSafeAreaInsets();
  const { theme } = useDripsyTheme();
  const quests = useRecoilValue(activeQuestList);
  const sx = useSx();
  const user = state.context.user;

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const containerStyle = sx({
    paddingTop: top + theme.space.$04,
    gap: '$04',
  });

  const handlePressCreateQuestButton = (): void => {
    navigate('Quest', 'CreateQuest');
  };

  const handlePressQuestButton = (questId: number): void => {
    navigate('Quest', 'QuestDetail', { id: questId });
  };

  if (!user) {
    return null;
  }

  return (
    <FadeInView>
      {/* eslint-disable-next-line @typescript-eslint/no-unsafe-assignment */}
      <Container style={containerStyle}>
        <Profile user={user} />
        <QuestList
          onCreate={handlePressCreateQuestButton}
          onPress={handlePressQuestButton}
          quests={quests}
        />
      </Container>
    </FadeInView>
  );
}
