/* eslint-disable @typescript-eslint/no-explicit-any */
import BoxDB, { type Box } from 'bxd';
import { MissionSchema, AchieveSchema } from './schema';
import type {
  DatabaseModule,
  DatabaseRecord,
  WhereConditions,
  SelectOptions,
} from '../types';

export class WebDatabaseModule
  implements DatabaseModule<'mission' | 'achieve'>
{
  private static DATABASE_NAME = 'up';
  private static DATABASE_VERSION = 1;
  private static ERROR_MESSAGES = {
    not_initialized: 'database not initialized',
  };
  private database: BoxDB;
  private MissionModel: Box<typeof MissionSchema>;
  private AchieveModel: Box<typeof AchieveSchema>;

  constructor() {
    const database = new BoxDB(
      WebDatabaseModule.DATABASE_NAME,
      WebDatabaseModule.DATABASE_VERSION,
    );
    this.database = database;
    this.MissionModel = database.create('mission', MissionSchema);
    this.AchieveModel = database.create('achieve', AchieveSchema);
  }

  private toPredicateFunction(
    conditions: WhereConditions,
  ): ((data: any) => boolean)[] {
    return Object.entries(conditions).map(([column, { symbol, value }]) => {
      return (data: any): boolean => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
        const target = data[column];
        switch (symbol) {
          case '<':
            return Boolean(value && target < value);

          case '<=':
            return Boolean(value && target <= value);

          case '>':
            return Boolean(value && target > value);

          case '>=':
            return Boolean(value && target >= value);

          case '=':
            return target === value;
        }
      };
    });
  }

  async initialize(): Promise<void> {
    if (this.database.ready) return;
    await this.database.open();
  }

  async select<Data>(
    model: 'mission' | 'achieve',
    conditions?: WhereConditions,
    options?: SelectOptions,
  ): Promise<Data[]> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    let rows: Data[] = [];
    const predicates = conditions ? this.toPredicateFunction(conditions) : [];
    const range = options?.order
      ? { index: options.order.target, value: undefined }
      : null;
    const order =
      options?.order?.by === 'asc' ? BoxDB.Order.ASC : BoxDB.Order.DESC;

    switch (model) {
      case 'mission':
        rows = (await this.MissionModel.find(range, ...predicates).get(
          order,
          options?.limit,
        )) as Data[];
        break;

      case 'achieve':
        rows = (await this.AchieveModel.find(range, ...predicates).get(
          order,
          options?.limit,
        )) as Data[];
        break;
    }

    return rows;
  }

  async count(model: 'mission' | 'achieve'): Promise<number> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    let count = 0;

    switch (model) {
      case 'mission':
        count = await this.MissionModel.count();
        break;

      case 'achieve':
        count = await this.AchieveModel.count();
        break;
    }

    return count;
  }

  async insert<Data extends DatabaseRecord>(
    model: 'mission' | 'achieve',
    data: Data,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }

    switch (model) {
      case 'mission':
        await this.MissionModel.add(data);
        break;

      case 'achieve':
        await this.AchieveModel.add(data);
        break;
    }
  }

  async update<Data extends DatabaseRecord>(
    model: 'mission' | 'achieve',
    data: Partial<Data>,
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    const predicates = conditions ? this.toPredicateFunction(conditions) : [];

    switch (model) {
      case 'mission':
        await this.MissionModel.find(null, ...predicates).update(data);
        break;

      case 'achieve':
        await this.AchieveModel.find(null, ...predicates).update(data);
        break;
    }
  }

  async delete(
    model: 'mission' | 'achieve',
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    const predicates = conditions ? this.toPredicateFunction(conditions) : [];

    switch (model) {
      case 'mission':
        await this.MissionModel.find(null, ...predicates).delete();
        break;

      case 'achieve':
        await this.AchieveModel.find(null, ...predicates).delete();
        break;
    }
  }

  async clear(model: 'mission' | 'achieve'): Promise<void> {
    switch (model) {
      case 'mission':
        await this.MissionModel.clear();
        break;

      case 'achieve':
        await this.AchieveModel.clear();
        break;
    }
  }
}
