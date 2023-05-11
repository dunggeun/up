import React, { useState } from 'react';
import { useUserThemeColor } from 'src/features/users';
import { AppEventChannel } from 'src/modules/event';
import { Button, CommonLayout } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { QuestDoneModal } from '../../components/QuestDoneModal';
import { QuestInformation } from '../../components/QuestInformation';
import { useUpdateQuest, useQuestDetail } from '../../hooks';
import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestDetailScreenProps = QuestStackProps<'QuestDetail'>;

const ACCESSIBILITY = {
  doneQuest: t('title.done_mission'),
};

export function QuestDetailScreen({
  navigation,
  route,
}: QuestDetailScreenProps): JSX.Element {
  const { id } = route.params;
  const [questDoneModalVisibility, setQuestDoneModalVisibility] =
    useState(false);
  const userColor = useUserThemeColor();
  const { data: questDetail, isLoading } = useQuestDetail({ id });
  const { mutate } = useUpdateQuest({
    onSuccess: () => {
      setQuestDoneModalVisibility(false);
      requestAnimationFrame(() => {
        navigation.goBack();
      });
    },
  });
  const shouldShowLoadingIndicator = isLoading || !questDetail;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = (): void => {
    setQuestDoneModalVisibility(true);
  };

  const handleQuestDoneModal = (): void => {
    setQuestDoneModalVisibility(false);
  };

  const handleDone = (): void => {
    if (!questDetail?.quest) return;

    const questId = questDetail.quest.id;
    mutate({ questId, data: { finished_at: Number(new Date()) } });
    AppEventChannel.getInstance().dispatch('doneQuest', { questId });
  };

  return shouldShowLoadingIndicator ? (
    <LoadingIndicator />
  ) : (
    <>
      <CommonLayout>
        <CommonLayout.Header
          onClosePress={handlePressCloseButton}
          title={questDetail.quest.title}
        />
        <CommonLayout.Body>
          <QuestInformation
            achieveList={questDetail.achieveList}
            quest={questDetail.quest}
          />
        </CommonLayout.Body>
        <CommonLayout.Footer>
          <Button
            accessibilityHint={ACCESSIBILITY.doneQuest}
            accessibilityLabel={ACCESSIBILITY.doneQuest}
            color={userColor}
            disableLongPress
            onPress={handlePressDoneButton}
          >
            {t('label.mission_done')}
          </Button>
        </CommonLayout.Footer>
      </CommonLayout>
      <QuestDoneModal
        onClose={handleQuestDoneModal}
        onDone={handleDone}
        visible={questDoneModalVisibility}
      />
    </>
  );
}
