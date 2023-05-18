import dayjs from 'dayjs';
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

  getAchieveListByMid(params: Pick<Achieve, 'mid'>): Promise<Achieve[]> {
    return this.database.select(
      'achieve',
      {
        mid: {
          symbol: '=',
          value: params.mid,
        },
      },
      {
        order: {
          target: 'created_at',
          by: 'desc',
        },
        limit: 28,
      },
    );
  }

  getArchiveListByDate(params: { date: Date }): Promise<Achieve[]> {
    const targetDate = dayjs(params.date);
    const gte = targetDate.startOf('day').toDate().getTime();
    const lte = targetDate.endOf('day').toDate().getTime();

    return this.database.select('achieve', {
      // 키를 조건 필드명(SQLite) 혹은 프로퍼티(IndexedDB)명으로 사용하는데 trim 처리를 하고 있음
      // 동일한 이름에 대한 and 조건 처리를 위해 키 중복을 피하고자 빈 공백을 추가함.
      'created_at ': {
        symbol: '<=',
        value: lte,
      },
      ' created_at': {
        symbol: '>=',
        value: gte,
      },
    });
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
