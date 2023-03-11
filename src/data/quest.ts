import { StorageManager } from 'src/modules';
import { createAchieveData, createQuestData, getAchieveExpByStreak, updateQuestForAddAchieve } from 'src/modules/app/helpers';

import type { Quest, Achieve, QuestDetail } from 'src/features/quests';

export interface QuestIdParam {
  questId: Quest['id'];
}

export const fetchQuests = (): Promise<Quest[]> => {
  return StorageManager
    .getInstance()
    .getQuestList();
};

export const fetchQuestById = ({ questId }: QuestIdParam): Promise<Quest> => {
  return StorageManager
    .getInstance()
    .getQuest(questId)
    .then((quest) => {
      if (quest === null) {
        throw new Error('quest not found');
      }
      return quest;
    });
};

export const fetchAchievesByQuestId = ({ questId }: QuestIdParam): Promise<Achieve[]> => {
  return StorageManager
    .getInstance()
    .getAchieveList({ qid: questId });
};

export const fetchQuestDetailById = ({ questId }: QuestIdParam): Promise<QuestDetail> => {
  return Promise.all([
    fetchQuestById({ questId }),
    fetchAchievesByQuestId({ questId }),
  ]).then(([quest, achieveList]) => ({ quest, achieveList }));
};

export interface AddQuestParams {
  title: string;
  description?: string;
}

export const addQuest = ({ title, description }: AddQuestParams): Promise<void> => {
  return StorageManager
    .getInstance()
    .addQuest(createQuestData(title, description));
};

export interface UpdateQuestParams extends QuestIdParam {
  data: Partial<Quest>;
}

export const updateQuest = ({ questId, data }: UpdateQuestParams): Promise<void> => {
  return StorageManager
    .getInstance()
    .updateQuest(questId, data);
};

export interface AddAchieveResult {
  quest: Quest;
  achieve: Achieve;
}

export const addAchieve = async ({ questId }: QuestIdParam): Promise<AddAchieveResult> => {
  const quest = await fetchQuestById({ questId });
  const updatedQuest = updateQuestForAddAchieve(quest);
  const earnedExp = getAchieveExpByStreak(quest.current_streak);
  const achieve = createAchieveData({ questId, exp: earnedExp });

  return Promise.all([
    StorageManager.getInstance().addAchieve(achieve),
    updateQuest({ questId: quest.id, data: updatedQuest })
  ]).then(() => ({ quest: updatedQuest, achieve }));
};
