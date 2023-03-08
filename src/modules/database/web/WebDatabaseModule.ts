 
 
import BoxDB, { type Box } from 'bxd';
import { QuestSchema, AchieveSchema } from './schema';

import type {
  DatabaseModule,
  DatabaseRecord,
  WhereConditions,
  SelectOptions,
} from '../types';

export class WebDatabaseModule implements DatabaseModule<'quest' | 'achieve'> {
  private static DATABASE_NAME = 'up';
  private static DATABASE_VERSION = 1;
  private static ERROR_MESSAGES = {
    not_initialized: 'database not initialized' 
  };
  private database: BoxDB;
  private QuestModel: Box<typeof QuestSchema>;
  private AchieveModel: Box<typeof AchieveSchema>;
  
  constructor () {
    const database = new BoxDB(
      WebDatabaseModule.DATABASE_NAME,
      WebDatabaseModule.DATABASE_VERSION
    );
    this.database = database;
    this.QuestModel = database.create('quest', QuestSchema);
    this.AchieveModel = database.create('achieve', AchieveSchema);
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private toPredicateFunction (conditions: WhereConditions): ((data: any) => boolean)[] {
    return Object.entries(conditions)
      .map(([column, { symbol, value }]) => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        return (data: any): boolean => {
          // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
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

  async initialize (): Promise<void> {
    if (this.database.ready) return;
    await this.database.open();
  }

  async select<Data>(
    model: 'quest' | 'achieve',
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
    const order = options?.order?.by === 'asc'
      ? BoxDB.Order.ASC
      : BoxDB.Order.DESC;

    switch (model) {
      case 'quest':
        rows = await this.QuestModel
          .find(range, ...predicates)
          .get(order, options?.limit) as Data[];
        break;

      case 'achieve':
        rows = await this.AchieveModel
          .find(range, ...predicates)
          .get(order, options?.limit) as Data[];
        break;
    }

    return rows;
  }

  async insert<Data extends DatabaseRecord>(
    model: 'quest' | 'achieve',
    data: Data,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    
    switch (model) {
      case 'quest':
        await this.QuestModel.add(data);
        break;

      case 'achieve':
        await this.AchieveModel.add(data);
        break;
    }
  }

  async update<Data extends DatabaseRecord>(
    model: 'quest' | 'achieve',
    data: Partial<Data>,
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    const predicates = conditions ? this.toPredicateFunction(conditions) : [];

    switch (model) {
      case 'quest':
        await this.QuestModel
          .find(null, ...predicates)
          .update(data);
        break;

      case 'achieve':
        await this.AchieveModel
          .find(null, ...predicates)
          .update(data);
        break;
    }
  }

  async delete(
    model: 'quest' | 'achieve',
    conditions?: WhereConditions,
  ): Promise<void> {
    if (!this.database.ready) {
      throw new Error(WebDatabaseModule.ERROR_MESSAGES.not_initialized);
    }
    const predicates = conditions ? this.toPredicateFunction(conditions) : [];

    switch (model) {
      case 'quest':
        await this.QuestModel
          .find(null, ...predicates)
          .delete();
        break;

      case 'achieve':
        await this.AchieveModel
          .find(null, ...predicates)
          .delete();
        break;
    }
  }

  async clear (model: 'quest' | 'achieve'): Promise<void> {
    switch (model) {
      case 'quest':
        await this.QuestModel.clear();
        break;

      case 'achieve':
        await this.AchieveModel.clear();
        break;
    }
  }
}
