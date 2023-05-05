import { createElement } from 'react';
import { useMutation, type UseMutationResult } from 'react-query';
import { Text } from 'src/designs';
import { AppManager } from 'src/modules/app';
import { queryClient } from 'src/stores/reactQuery';
import { addQuest } from 'src/data';
import { t } from 'src/translations';

import type { Quest } from '../types';

const ErrorToastContent = createElement(Text, null, t('message.error.common'));

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
    onError: (_error) => {
      AppManager.showToast(ErrorToastContent);
    },
  });
};
