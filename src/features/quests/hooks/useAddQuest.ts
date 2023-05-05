import { useMutation, type UseMutationResult } from 'react-query';
import { addQuest } from 'src/data';
import { queryClient } from 'src/stores/reactQuery';
import { AppManager } from 'src/modules/app';
import { Logger } from 'src/modules/logger';
import { t } from 'src/translations';

import type { Quest } from '../types';

const TAG = 'useAddQuest';

export const useAddQuest = (): UseMutationResult<
  Quest,
  Error,
  Parameters<typeof addQuest>[0]
> => {
  return useMutation(addQuest, {
    onSuccess: (quest) => {
      queryClient.setQueryData<Quest[]>(
        ['quests', 'list'],
        (previousQuests = []) => [quest, ...previousQuests],
      );

      void queryClient.invalidateQueries(['quests', 'list'], {
        refetchActive: false,
      });
    },
    onError: (error) => {
      Logger.error(TAG, error.message);
      AppManager.showToast(t('message.error.common'));
    },
  });
};
