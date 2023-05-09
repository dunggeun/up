import { noop } from 'src/utils';
import { Logger } from '../logger';
import { DatabaseModule } from './module';
import type { DumpData } from './types';
import type { Quest, Achieve } from 'src/features/quests';

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

  getQuestList(): Promise<Quest[]> {
    return this.database.select('quest', undefined, {
      order: {
        target: 'created_at',
        by: 'desc',
      },
    });
  }

  getQuest(id: number): Promise<Quest | null> {
    return this.database
      .select<Quest>('quest', {
        id: {
          symbol: '=',
          value: id,
        },
      })
      .then((rows) => rows[0] ?? null);
  }

  getQuestCount(): Promise<number> {
    return this.database.count('quest');
  }

  addQuest(data: Quest): Promise<void> {
    return this.database.insert('quest', data);
  }

  updateQuest(id: number, data: Partial<Quest>): Promise<void> {
    return this.database.update('quest', data, {
      id: {
        symbol: '=',
        value: id,
      },
    });
  }

  deleteQuest(id: number): Promise<void> {
    return this.database.delete('quest', {
      id: {
        symbol: '=',
        value: id,
      },
    });
  }

  getAchieveList(): Promise<Achieve[]> {
    return this.database.select('achieve');
  }

  getAchieveListByQid(params?: Pick<Achieve, 'qid'>): Promise<Achieve[]> {
    return this.database.select(
      'achieve',
      params
        ? {
            qid: {
              symbol: '=',
              value: params.qid,
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

  deleteAchieve({ qid }: Pick<Achieve, 'qid'>): Promise<void> {
    return this.database.delete('achieve', {
      qid: {
        symbol: '=',
        value: qid,
      },
    });
  }

  dump(): Promise<DumpData> {
    return Promise.all([this.getQuestList(), this.getAchieveList()]).then(
      ([quests, achieves]) => ({ quests, achieves }),
    );
  }

  load(data: DumpData): Promise<void> {
    return Promise.all([
      ...data.quests.map((quest) => this.database.insert('quest', quest)),
      ...data.achieves.map((achieve) =>
        this.database.insert('achieve', achieve),
      ),
    ]).then(noop);
  }

  async clear(): Promise<void> {
    await Promise.all([
      this.database.clear('quest'),
      this.database.clear('achieve'),
    ]);
  }
}
