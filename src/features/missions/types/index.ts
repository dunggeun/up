export interface Mission {
  id: number;
  title: string;
  description: string;
  max_streak: number;
  current_streak: number;
  created_at: number;
  updated_at: number;
  finished_at: number;
}

export interface MissionDetail {
  mission: Mission;
  achieveList: Achieve[];
}

export interface Achieve {
  id: number;
  mid: number;
  exp: number;
  created_at: number;
}
