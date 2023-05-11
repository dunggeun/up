/* eslint-disable import/no-named-as-default-member */
import SQLite, { type SQLiteDatabase } from 'react-native-sqlite-storage';
import { SQLBuilder } from './utils';
import type {
  DatabaseModule,
  DatabaseRecord,
  WhereConditions,
  SelectOptions,
} from '../types';

export class NativeDatabaseModule
  implements DatabaseModule<'mission' | 'achieve'>
{
  private static DATABASE_NAME = 'up_v1.db';
  private static ERROR_MESSAGES = {
    not_initialized: 'database not initialized',
  };
  private database: SQLiteDatabase | null = null;

  async initialize(): Promise<void> {
    if (this.database) return;

    this.database = await SQLite.openDatabase({
      name: NativeDatabaseModule.DATABASE_NAME,
      location: 'default',
      createFromLocation: 1,
    });
  }

  async select<Data>(
    model: 'mission' | 'achieve',
    conditions?: WhereConditions,
    options?: SelectOptions,
  ): Promise<Data[]> {
    if (!this.database) {
      throw new Error(NativeDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    let rows: Data[] = [];
    const builder = new SQLBuilder().type('select').table(model);

    if (conditions) {
      builder.where(conditions);
    }

    if (options?.order) {
      builder.orderBy(options.order.target, options.order.by);
    }

    if (typeof options?.limit === 'number') {
      builder.limit(options.limit);
    }

    await this.database.transaction((tx) => {
      tx.executeSql(builder.build())
        .then(([_, result]) => {
          rows = result.rows.raw() as Data[];
        })
        .catch((error) => {
          throw error;
        });
    });

    return rows;
  }

  async count(model: 'mission' | 'achieve'): Promise<number> {
    if (!this.database) {
      throw new Error(NativeDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    let count = 0;
    const builder = new SQLBuilder().type('count').table(model);

    await this.database.transaction((tx) => {
      tx.executeSql(builder.build())
        .then(([_, result]) => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          count = result.rows.item(0).count as number;
        })
        .catch((error) => {
          throw error;
        });
    });

    return count;
  }

  async insert<Data extends DatabaseRecord>(
    model: 'mission' | 'achieve',
    data: Data,
  ): Promise<void> {
    if (!this.database) {
      throw new Error(NativeDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    const query = new SQLBuilder()
      .type('insert')
      .table(model)
      .values(data)
      .build();

    await this.database.transaction((tx) => {
      tx.executeSql(query).catch((error) => {
        throw error;
      });
    });
  }

  async update<Data extends DatabaseRecord>(
    model: 'mission' | 'achieve',
    data: Partial<Data>,
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database) {
      throw new Error(NativeDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    const builder = new SQLBuilder().type('update').table(model).values(data);

    if (conditions) {
      builder.where(conditions);
    }

    await this.database.transaction((tx) => {
      tx.executeSql(builder.build()).catch((error) => {
        throw error;
      });
    });
  }

  async delete(
    model: 'mission' | 'achieve',
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database) {
      throw new Error(NativeDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    const builder = new SQLBuilder().type('delete').table(model);

    if (conditions) {
      builder.where(conditions);
    }

    await this.database.transaction((tx) => {
      tx.executeSql(builder.build()).catch((error) => {
        throw error;
      });
    });
  }

  clear(model: 'mission' | 'achieve'): Promise<void> {
    return this.delete(model);
  }
}
