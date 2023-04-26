// eslint-disable-next-line eslint-comments/disable-enable-pair
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
  implements DatabaseModule<'quest' | 'achieve'>
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
    model: 'quest' | 'achieve',
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

  async insert<Data extends DatabaseRecord>(
    model: 'quest' | 'achieve',
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
    model: 'quest' | 'achieve',
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
    model: 'quest' | 'achieve',
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

  clear(model: 'quest' | 'achieve'): Promise<void> {
    return this.delete(model);
  }
}
