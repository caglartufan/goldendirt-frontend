export type User = {
  id: number;
  username: string;
  email: string;
  email_verified_at: Date | null;
  created_at: Date;
  updated_at: Date;
};

export type Crop = {
  id: number;
  name: string;
  timeToGrowUpInSeconds: number;
  levelRequired: number;
  xpReward: number;
  image?: string;
};

export enum LAND_STATUS {
  IDLE = 'idle',
  BARREN = 'barren',
  GROWING_UP = 'growing-up',
  GROWN_UP = 'grown-up',
}

export type Land = {
  id: number;
  status: LAND_STATUS;
  growProgress?: number;
  crop?: Crop;
};

export type ValidationErrors<Values> = {
  [field in keyof Values]: string | Array<string>;
};

export type FormikInvalidities<Values> = {
  [field in keyof Values]: boolean;
};
