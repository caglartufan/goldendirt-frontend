import { LAND_STATUS } from '@/types';
import type { Land } from '@/types';
import { Carrot } from './crops/carrot';
import { Lettuce } from './crops/lettuce';

export const DUMMY_LANDS: Array<Land> = [
  {
    id: 1,
    status: LAND_STATUS.GROWN_UP,
    crop: Lettuce,
    growProgress: 100,
  },
  {
    id: 2,
    status: LAND_STATUS.GROWING_UP,
    crop: Lettuce,
    growProgress: 52,
  },
  {
    id: 3,
    status: LAND_STATUS.GROWING_UP,
    crop: Carrot,
    growProgress: 25,
  },
  {
    id: 4,
    status: LAND_STATUS.IDLE,
  },
  {
    id: 5,
    status: LAND_STATUS.IDLE,
  },
  {
    id: 6,
    status: LAND_STATUS.IDLE,
  },
  {
    id: 7,
    status: LAND_STATUS.BARREN,
  },
  {
    id: 8,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 9,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 10,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 11,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 12,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 13,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 14,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 15,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 16,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 17,
    status: LAND_STATUS.BARREN,
  },
  ,
  {
    id: 18,
    status: LAND_STATUS.BARREN,
  },
];
