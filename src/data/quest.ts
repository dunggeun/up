import { StorageManager } from 'src/modules/database';
import {
  createAchieveData,
  createQuestData,
  getAchieveExpByStreak,
  updateQuestForAddAchieve,
} from 'src/modules/app/helpers';

import { Logger } from 'src/modules/logger';
import { AppEventChannel } from 'src/modules/event';
import type { Quest, QuestDetail, Achieve } from 'src/features/quests';

const TAG = 'data.quest';

export interface QuestIdParam {
  questId: Quest['id'];
}

export const fetchQuests = (): Promise<Quest[]> => {
  Logger.debug(TAG, 'fetchQuests');
  return StorageManager.getInstance().getQuestList();
};

export const fetchQuestById = ({ questId }: QuestIdParam): Promise<Quest> => {
  Logger.debug(TAG, 'fetchQuestById', { questId });
  return StorageManager.getInstance()
    .getQuest(questId)
    .then((quest) => {
      if (quest === null) {
        throw new Error('quest not found');
      }
      return quest;
    });
};

export const fetchAchieveCount = (): Promise<number> => {
  Logger.debug(TAG, 'fetchAchieveCount');
  return StorageManager.getInstance().getAchieveCount();
};

export const fetchAchievesByQuestId = ({
  questId,
}: QuestIdParam): Promise<Achieve[]> => {
  Logger.debug(TAG, 'fetchAchievesByQuestId', { questId });
  return StorageManager.getInstance().getAchieveListByQid({ qid: questId });
};

export const fetchQuestDetailById = ({
  questId,
}: QuestIdParam): Promise<QuestDetail> => {
  Logger.debug(TAG, 'fetchQuestDetailById', { questId });
  return Promise.all([
    fetchQuestById({ questId }),
    fetchAchievesByQuestId({ questId }),
  ]).then(([quest, achieveList]) => ({ quest, achieveList }));
};

export interface AddQuestParams {
  title: string;
  description?: string;
}

export const addQuest = ({
  title,
  description,
}: AddQuestParams): Promise<Quest> => {
  Logger.debug(TAG, 'addQuest', { title, description });
  const newQuest = createQuestData(title, description);
  return StorageManager.getInstance()
    .addQuest(newQuest)
    .then(() => {
      AppEventChannel.getInstance().dispatch('createQuest', newQuest);
      return newQuest;
    });
};

export interface UpdateQuestParams extends QuestIdParam {
  data: Partial<Quest>;
}

export const updateQuest = ({
  questId,
  data,
}: UpdateQuestParams): Promise<UpdateQuestParams['data']> => {
  Logger.debug(TAG, 'updateQuest', { questId });
  return StorageManager.getInstance()
    .updateQuest(questId, data)
    .then(() => data);
};

export const deleteQuest = async ({ questId }: QuestIdParam): Promise<void> => {
  Logger.debug(TAG, 'deleteQuest', { questId });
  const manager = StorageManager.getInstance();
  await manager.deleteAchieve({ qid: questId });
  await manager.deleteQuest(questId);
  AppEventChannel.getInstance().dispatch('deleteQuest', undefined);
};

export interface AddAchieveResult {
  quest: Quest;
  achieve: Achieve;
}

export const addAchieve = async ({
  questId,
}: QuestIdParam): Promise<AddAchieveResult> => {
  Logger.debug(TAG, 'addAchieve', { questId });
  const quest = await fetchQuestById({ questId });
  const updatedQuest = updateQuestForAddAchieve(quest);
  const earnedExp = getAchieveExpByStreak(updatedQuest.current_streak);
  const achieve = createAchieveData({ questId, exp: earnedExp });

  return Promise.all([
    StorageManager.getInstance().addAchieve(achieve),
    updateQuest({ questId: quest.id, data: updatedQuest }),
  ]).then(() => {
    const result = { quest: updatedQuest, achieve };
    AppEventChannel.getInstance().dispatch('createAchieve', result);
    return result;
  });
};
