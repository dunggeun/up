import React from 'react';
import { CreateQuest } from './CreateQuest';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type CreateQuestScreenProps = QuestStackProps<'CreateQuest'>;

export function CreateQuestScreen({
  navigation
}: CreateQuestScreenProps): JSX.Element {
  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressShareButton = (): void => {
    // @todo
  };

  return (
    <CreateQuest
      onPressClose={handlePressCloseButton}
      onPressShare={handlePressShareButton}
    />
  );
}
