import { noop } from 'src/utils';
import { Logger } from '../logger';
import { DatabaseModule } from './module';
import type { DumpData } from './types';
import type { Mission, Achieve } from 'src/features/missions';

const TAG = 'StorageManager';

export class StorageManager {
  private static instance: StorageManager | null = null;
  private database = new DatabaseModule();

  private constructor() {
    Logger.info(TAG, 'instance created');
  }

  public static getInstance(): StorageManager {
    if (StorageManager.instance === null) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  initialize(): Promise<void> {
    Logger.info(TAG, 'initializing...');
    return this.database.initialize().then(() => {
      Logger.success(TAG, 'successfully initialized');
    });
  }

  getMissionList(): Promise<Mission[]> {
    return this.database.select('mission', undefined, {
      order: {
        target: 'created_at',
        by: 'desc',
      },
    });
  }

  getMission(id: number): Promise<Mission | null> {
    return this.database
      .select<Mission>('mission', {
        id: {
          symbol: '=',
          value: id,
        },
      })
      .then((rows) => rows[0] ?? null);
  }

  getMissionCount(): Promise<number> {
    return this.database.count('mission');
  }

  addMission(data: Mission): Promise<void> {
    return this.database.insert('mission', data);
  }

  updateMission(id: number, data: Partial<Mission>): Promise<void> {
    return this.database.update('mission', data, {
      id: {
        symbol: '=',
        value: id,
      },
    });
  }

  deleteMission(id: number): Promise<void> {
    return this.database.delete('mission', {
      id: {
        symbol: '=',
        value: id,
      },
    });
  }

  getAchieveList(): Promise<Achieve[]> {
    return this.database.select('achieve');
  }

  getAchieveListByMid(params?: Pick<Achieve, 'mid'>): Promise<Achieve[]> {
    return this.database.select(
      'achieve',
      params
        ? {
            mid: {
              symbol: '=',
              value: params.mid,
            },
          }
        : undefined,
      {
        order: {
          target: 'created_at',
          by: 'desc',
        },
        limit: 28,
      },
    );
  }

  getAchieveCount(): Promise<number> {
    return this.database.count('achieve');
  }

  addAchieve(data: Achieve): Promise<void> {
    return this.database.insert('achieve', data);
  }

  deleteAchieve({ mid }: Pick<Achieve, 'mid'>): Promise<void> {
    return this.database.delete('achieve', {
      mid: {
        symbol: '=',
        value: mid,
      },
    });
  }

  dump(): Promise<DumpData> {
    return Promise.all([this.getMissionList(), this.getAchieveList()]).then(
      ([missions, achieves]) => ({ missions, achieves }),
    );
  }

  load(data: DumpData): Promise<void> {
    return Promise.all([
      ...data.missions.map((mission) =>
        this.database.insert('mission', mission),
      ),
      ...data.achieves.map((achieve) =>
        this.database.insert('achieve', achieve),
      ),
    ]).then(noop);
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.database.clear('mission'),
      this.database.clear('achieve'),
    ]);
  }
}
