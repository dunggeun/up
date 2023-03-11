import React from 'react';
import { useQueryClient } from 'react-query';
import { Button, CommonLayout } from 'src/designs';
import { LoadingIndicator } from 'src/components';
import { StorageManager } from 'src/modules';
import { t } from 'src/translations';
import { useUserThemeColor } from 'src/features/users';

import { useQuestDetail } from '../../hooks';
import { QuestInformation } from '../../components/QuestInformation';

import type { QuestStackProps } from 'src/navigators/QuestStack/types';

type QuestDetailScreenProps = QuestStackProps<'QuestDetail'>;

export function QuestDetailScreen({
  navigation,
  route
}: QuestDetailScreenProps): JSX.Element {
  const { id } = route.params;
  const client = useQueryClient();
  const userColor = useUserThemeColor();
  const { data: questDetail, isLoading } = useQuestDetail({ id });
  const shouldShowLoadingIndicator = isLoading || !questDetail;

  const handlePressCloseButton = (): void => {
    navigation.goBack();
  };

  const handlePressDoneButton = (): void => {
    // @todo 안내 모달 노출 후 데이터 변경

    if (!questDetail?.quest) return;

    const currentTimestamp = Number(new Date());
    questDetail.quest;

    StorageManager
      .getInstance()
      .updateQuest(id, {
        ...questDetail.quest,
        finished_at: currentTimestamp
      })
      .then(() => client.invalidateQueries('quest'))
      .then(() => navigation.goBack())
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error('updateQuest', error);
      });
  };

  return shouldShowLoadingIndicator ? <LoadingIndicator /> : (
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
          color={userColor}
          disableLongPress
          onPress={handlePressDoneButton}
        >
          {t('label.quest_done')}
        </Button>
      </CommonLayout.Footer>
    </CommonLayout>
  );
}
