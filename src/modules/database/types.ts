import type { Mission, Achieve } from 'src/features/missions';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type Value = any;

export interface SelectOptions {
  limit?: number;
  order?: {
    target: string;
    by: 'desc' | 'asc';
  };
}

export type WhereConditions = Record<
  string,
  {
    symbol: '=' | '>' | '>=' | '<' | '<=';
    value: Value;
  }
>;

export interface DumpData {
  missions: Mission[];
  achieves: Achieve[];
}

export type DatabaseRecord = Record<string, Value>;

export interface DatabaseModule<Model = string> {
  initialize: () => Promise<void>;
  select: <Data extends DatabaseRecord>(
    model: Model,
    condition?: WhereConditions,
    options?: SelectOptions,
  ) => Promise<Data[]>;
  count: (model: Model) => Promise<number>;
  insert: <Data extends DatabaseRecord>(
    model: Model,
    data: Data,
  ) => Promise<void>;
  update: <Data extends DatabaseRecord>(
    model: Model,
    data: Data,
    condition?: WhereConditions,
  ) => Promise<void>;
  delete: (model: Model, condition?: WhereConditions) => Promise<void>;
  clear: (model: Model) => Promise<void>;
}
