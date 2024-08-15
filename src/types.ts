import { DateTime, Duration } from 'luxon';

// Enums
export enum FarmFieldStatus {
  Idle = 'IDLE',
  Planted = 'PLANTED',
  Barren = 'BARREN',
}

// Models
export interface User {
  id: number;
  username: string;
  email: string;
  level: number;
  total_xp: number;
  current_xp: number;
  xp_required_for_next_level: number;
  golds: number;
  email_verified_at: string | null;
  created_at: DateTime | string;
  updated_at: DateTime | string;
}

export interface FarmField {
  id: number;
  user_id: number;
  status: FarmFieldStatus;
  crop_id: number | null;
  crop: Crop | null;
  planted_at: DateTime | string | null;
  harvestable_at: DateTime | string | null;
  created_at: DateTime | string;
  updated_at: DateTime | string;
  seconds_remaining_to_harvest?: Duration;
  progress?: number;
}

export interface Crop {
  id: number;
  name: string;
  image: string;
  seconds_to_grow_up: number;
  seed_cost_at_market: number;
  xp_reward: number;
  level_required_to_plant: number;
}

// Misc
export type ValidationErrors<Values> = {
  [field in keyof Values]: string | Array<string>;
};

export type FormikInvalidities<Values> = {
  [field in keyof Values]: boolean;
};

export interface ErrorObj {
  response: {
    status: number;
    data: {
      errors: { [key: string]: Array<string> };
    };
  };
}

export type SetErrorsFn = (errors: ValidationErrors<any>) => void;
