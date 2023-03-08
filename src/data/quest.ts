import { StorageManager } from 'src/modules';
import type { Quest, Achieve } from 'src/types';

export const fetchQuestById = ({ questId }: { questId: Quest['id'] }): Promise<Quest> => {
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

export const fetchAchievesByQuestId = ({ questId }: { questId: Quest['id'] }): Promise<Achieve[]> => {
  return StorageManager
    .getInstance()
    .getAchieveList({ qid: questId });
};

interface QuestInfo {
  quest: Quest,
  achieveList: Achieve[];
}

export const fetchQuestInfoById = ({ questId }: { questId: Quest['id'] }): Promise<QuestInfo> => {
  return Promise.all([
    fetchQuestById({ questId }),
    fetchAchievesByQuestId({ questId }),
  ]).then(([quest, achieveList]) => ({ quest, achieveList }));
};

export const addAchieve = async (quest: Quest, data: Achieve): Promise<Quest> => {
  const currentStreak = quest.current_streak + 1;
  const updatedQuest = {
    ...quest,
    current_streak: currentStreak,
    max_streak: Math.max(currentStreak, quest.max_streak),
    updated_at: Number(new Date()),
  };
  const manager = StorageManager.getInstance();

  return Promise.all([
    manager.addAchieve(data),
    manager.updateQuest(quest.id, updatedQuest)
  ]).then(() => updatedQuest);
};
