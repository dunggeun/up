import { setRecoil } from 'recoil-nexus';
import { questList } from 'src/stores';
import { DatabaseModule } from './module';

import type { Quest, Achieve } from 'src/features/quests';

export class StorageManager {
  private static instance: StorageManager | null = null;
  private database = new DatabaseModule();

  private constructor () {
    // empty constructor
  }

  public static getInstance (): StorageManager {
    if (StorageManager.instance === null) {
      StorageManager.instance = new StorageManager();
    }
    return StorageManager.instance;
  }

  initialize (): Promise<void> {
    return this.database.initialize();
  }  

  getQuestList (): Promise<Quest[]> {
    return this.database.select('quest', undefined, {
      order: {
        target: 'created_at',
        by: 'desc',
      },
    });
  }

  getQuest (id: number): Promise<Quest | null> {
    return this.database.select<Quest>('quest', {
      id: {
        symbol: '=',
        value: id,
      },
    }).then((rows) => rows[0] ?? null);
  }

  addQuest (data: Quest): Promise<void> {
    return this.database.insert('quest', data);
  }

  updateQuest (id: number, data: Partial<Quest>): Promise<void> {
    return this.database.update('quest', data, {
      id: {
        symbol: '=',
        value: id,
      },
    });
  }

  getAchieveList ({ qid }: Pick<Achieve, 'qid'>): Promise<Achieve[]> {
    return this.database.select(
      'achieve',
      {
        qid: {
          symbol: '=',
          value: qid,
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

  addAchieve (data: Achieve): Promise<void> {
    return this.database.insert('achieve', data);
  }

  async clear (): Promise<void> {
    await Promise.all([
      this.database.clear('quest'),
      this.database.clear('achieve'),
    ]);
    setRecoil(questList, []);
  }
}
