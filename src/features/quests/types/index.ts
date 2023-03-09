export interface Quest {
  id: number;
  title: string;
  description: string;
  max_streak: number;
  current_streak: number;
  created_at: number;
  updated_at: number;
  finished_at: number;
}

export interface Achieve {
  id: number;
  qid: number;
  exp: number;
  created_at: number;
}
