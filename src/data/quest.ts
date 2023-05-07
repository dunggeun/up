import { StorageManager } from 'src/modules/database';
import {
  createAchieveData,
  createQuestData,
  getAchieveExpByStreak,
  updateQuestForAddAchieve,
} from 'src/modules/app/helpers';

import { Logger } from 'src/modules/logger';
import type { Quest, QuestDetail, Achieve } from 'src/features/quests';

export interface QuestIdParam {
  questId: Quest['id'];
}

export const fetchQuests = (): Promise<Quest[]> => {
  Logger.debug('fetchQuests');
  return StorageManager.getInstance().getQuestList();
};

export const fetchQuestById = ({ questId }: QuestIdParam): Promise<Quest> => {
  Logger.debug('fetchQuestById', { questId });
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
  Logger.debug('fetchAchieveCount');
  return StorageManager.getInstance().getAchieveCount();
};

export const fetchAchievesByQuestId = ({
  questId,
}: QuestIdParam): Promise<Achieve[]> => {
  Logger.debug('fetchAchievesByQuestId', { questId });
  return StorageManager.getInstance().getAchieveListByQid({ qid: questId });
};

export const fetchQuestDetailById = ({
  questId,
}: QuestIdParam): Promise<QuestDetail> => {
  Logger.debug('fetchQuestDetailById', { questId });
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
  Logger.debug('addQuest', { title, description });
  const newQuest = createQuestData(title, description);
  return StorageManager.getInstance()
    .addQuest(newQuest)
    .then(() => newQuest);
};

export interface UpdateQuestParams extends QuestIdParam {
  data: Partial<Quest>;
}

export const updateQuest = ({
  questId,
  data,
}: UpdateQuestParams): Promise<UpdateQuestParams['data']> => {
  Logger.debug('updateQuest', { questId });
  return StorageManager.getInstance()
    .updateQuest(questId, data)
    .then(() => data);
};

export const deleteQuest = async ({ questId }: QuestIdParam): Promise<void> => {
  Logger.debug('deleteQuest', { questId });
  const manager = StorageManager.getInstance();
  await manager.deleteAchieve({ qid: questId });
  await manager.deleteQuest(questId);
};

export interface AddAchieveResult {
  quest: Quest;
  achieve: Achieve;
}

export const addAchieve = async ({
  questId,
}: QuestIdParam): Promise<AddAchieveResult> => {
  Logger.debug('addAchieve', { questId });
  const quest = await fetchQuestById({ questId });
  const updatedQuest = updateQuestForAddAchieve(quest);
  const earnedExp = getAchieveExpByStreak(updatedQuest.current_streak);
  const achieve = createAchieveData({ questId, exp: earnedExp });

  return Promise.all([
    StorageManager.getInstance().addAchieve(achieve),
    updateQuest({ questId: quest.id, data: updatedQuest }),
  ]).then(() => ({ quest: updatedQuest, achieve }));
};
