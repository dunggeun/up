import {
  createAchieveData,
  createMissionData,
  getAchieveExpByStreak,
  updateMissionForAddAchieve,
} from 'src/modules/app/helpers';
import { StorageManager } from 'src/modules/database';
import { AppEventChannel } from 'src/modules/event';
import { Logger } from 'src/modules/logger';
import type { Mission, MissionDetail, Achieve } from 'src/features/missions';

const TAG = 'data.mission';

export interface MissionIdParam {
  missionId: Mission['id'];
}

export const fetchMissions = (): Promise<Mission[]> => {
  Logger.debug(TAG, 'fetchMissions');
  return StorageManager.getInstance().getMissionList();
};

export const fetchMissionById = ({
  missionId,
}: MissionIdParam): Promise<Mission> => {
  Logger.debug(TAG, 'fetchMissionById', { missionId });
  return StorageManager.getInstance()
    .getMission(missionId)
    .then((mission) => {
      if (mission === null) {
        throw new Error('mission not found');
      }
      return mission;
    });
};

export const fetchAchieveCount = (): Promise<number> => {
  Logger.debug(TAG, 'fetchAchieveCount');
  return StorageManager.getInstance().getAchieveCount();
};

export const fetchAchievesByMissionId = ({
  missionId,
}: MissionIdParam): Promise<Achieve[]> => {
  Logger.debug(TAG, 'fetchAchievesByMissionId', { missionId });
  return StorageManager.getInstance().getAchieveListByMid({ mid: missionId });
};

export const fetchMissionDetailById = ({
  missionId,
}: MissionIdParam): Promise<MissionDetail> => {
  Logger.debug(TAG, 'fetchMissionDetailById', { missionId });
  return Promise.all([
    fetchMissionById({ missionId }),
    fetchAchievesByMissionId({ missionId }),
  ]).then(([mission, achieveList]) => ({ mission, achieveList }));
};

export interface AddMissionParams {
  title: string;
  description?: string;
}

export const addMission = ({
  title,
  description,
}: AddMissionParams): Promise<Mission> => {
  Logger.debug(TAG, 'addMission', { title, description });
  const newMission = createMissionData(title, description);
  return StorageManager.getInstance()
    .addMission(newMission)
    .then(() => {
      AppEventChannel.getInstance().dispatch('createMission', newMission);
      return newMission;
    });
};

export interface UpdateMissionParams extends MissionIdParam {
  data: Partial<Mission>;
}

export const updateMission = ({
  missionId,
  data,
}: UpdateMissionParams): Promise<UpdateMissionParams['data']> => {
  Logger.debug(TAG, 'updateMission', { missionId });
  return StorageManager.getInstance()
    .updateMission(missionId, data)
    .then(() => data);
};

export const deleteMission = async ({
  missionId,
}: MissionIdParam): Promise<void> => {
  Logger.debug(TAG, 'deleteMission', { missionId });
  const manager = StorageManager.getInstance();
  await manager.deleteAchieve({ mid: missionId });
  await manager.deleteMission(missionId);
  AppEventChannel.getInstance().dispatch('deleteMission', undefined);
};

export interface AddAchieveResult {
  mission: Mission;
  achieve: Achieve;
}

export const addAchieve = async ({
  missionId,
}: MissionIdParam): Promise<AddAchieveResult> => {
  Logger.debug(TAG, 'addAchieve', { missionId });
  const mission = await fetchMissionById({ missionId });
  const updatedMission = updateMissionForAddAchieve(mission);
  const earnedExp = getAchieveExpByStreak(updatedMission.current_streak);
  const achieve = createAchieveData({ missionId, exp: earnedExp });

  return Promise.all([
    StorageManager.getInstance().addAchieve(achieve),
    updateMission({ missionId: mission.id, data: updatedMission }),
  ]).then(() => {
    const result = { mission: updatedMission, achieve };
    AppEventChannel.getInstance().dispatch('createAchieve', result);
    return result;
  });
};
