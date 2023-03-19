import { StorageManager } from 'src/modules';
import { createAchieveData, createQuestData, getAchieveExpByStreak, updateQuestForAddAchieve } from 'src/modules/app/helpers';
import { RECENT_ACHIEVE_LIMIT } from 'src/constants';

import type {
  Quest,
  QuestDetail,
  Achieve,
  AchieveDetail,
} from 'src/features/quests';

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

export const fetchAchieves = async (): Promise<AchieveDetail[]> => {
  const uniqueQid = new Set<number>();
  const questNameRecord = new Map<number, string>();
  const achieves = (
    await StorageManager
      .getInstance()
      .getAchieveList()
  ).slice(0, RECENT_ACHIEVE_LIMIT);

  achieves.forEach(({ qid }) => uniqueQid.add(qid));

  await Promise.all(
    Array
      .from(uniqueQid)
      .map((id) =>
        fetchQuestById({ questId: id }).then(({ title }) => {
          questNameRecord.set(id, title);
        })
      )
  );

  return achieves.map((achieve) => ({
    ...achieve,
    quest_name: questNameRecord.get(achieve.qid) ?? '',
  } as AchieveDetail));
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

export const addQuest = ({ title, description }: AddQuestParams): Promise<Quest> => {
  const newQuest = createQuestData(title, description);
  return StorageManager
    .getInstance()
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
  return StorageManager
    .getInstance()
    .updateQuest(questId, data)
    .then(() => data);
};

export const deleteQuest = async ({ questId }: QuestIdParam): Promise<void> => {
  const manager = StorageManager.getInstance();
  await manager.deleteAchieve({ qid: questId });
  await manager.deleteQuest(questId);
};

export interface AddAchieveResult {
  quest: Quest;
  achieve: Achieve;
}

export const addAchieve = async ({ questId }: QuestIdParam): Promise<AddAchieveResult> => {
  const quest = await fetchQuestById({ questId });
  const updatedQuest = updateQuestForAddAchieve(quest);
  const earnedExp = getAchieveExpByStreak(updatedQuest.current_streak);
  const achieve = createAchieveData({ questId, exp: earnedExp });

  return Promise.all([
    StorageManager.getInstance().addAchieve(achieve),
    updateQuest({ questId: quest.id, data: updatedQuest })
  ]).then(() => ({ quest: updatedQuest, achieve }));
};
