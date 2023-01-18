import BoxDB, { type BoxSchema } from 'bxd';

export const QuestSchema: BoxSchema = {
  id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  title: BoxDB.Types.STRING,
  description: BoxDB.Types.STRING,
  max_streak: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
  current_streak: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
  created_at: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
  finished_at: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
} as const;

export const AchieveSchema: BoxSchema = {
  id: {
    type: BoxDB.Types.NUMBER,
    key: true,
  },
  qid: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
  exp: BoxDB.Types.NUMBER,
  created_at: {
    type: BoxDB.Types.NUMBER,
    index: true,
  },
} as const;
