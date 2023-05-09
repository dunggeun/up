import React, { useState } from 'react';
import { Button, CommonLayout } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { t } from 'src/translations';
import { QuestDeleteModal } from '../../components/QuestDeleteModal';
import { QuestInformation } from '../../components/QuestInformation';
import { useDeleteQuest, useQuestDetail } from '../../hooks';
import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestFinishedScreenProps = QuestStackProps<'QuestFinished'>;

export function QuestFinishedScreen({
  navigation,
  route,
}: QuestFinishedScreenProps): JSX.Element {
  const { id } = route.params;
  const [questDeleteModalVisibility, setQuestDeleteModalVisibility] =
    useState(false);
  const { data: questDetail, isLoading } = useQuestDetail({ id });
  const { mutate } = useDeleteQuest({
    onSuccess: () => {
      setQuestDeleteModalVisibility(false);
      requestAnimationFrame(() => {
        navigation.goBack();
      });
    },
  });
  const shouldShowLoadingIndicator = isLoading || !questDetail;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handleDelete = (): void => {
    if (!questDetail?.quest) return;

    mutate({ questId: questDetail.quest.id });
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
            color="$red"
            disableLongPress
            onPress={(): void => setQuestDeleteModalVisibility(true)}
          >
            {t('label.quest_delete')}
          </Button>
        </CommonLayout.Footer>
      </CommonLayout>
      <QuestDeleteModal
        onClose={(): void => setQuestDeleteModalVisibility(false)}
        onDelete={handleDelete}
        visible={questDeleteModalVisibility}
      />
    </>
  );
}
