'use client';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { Switch } from '@/components/ui/switch';
import { useAuth } from '@/hooks/auth';
import { cn } from '@/lib/utils';
import { useState } from 'react';

enum LAND_STATUS {
  IDLE = 'idle',
  BARREN = 'barren',
  GROWING_UP = 'growing-up',
  GROWN_UP = 'grown-up',
}

type Crop = {
  id: number;
  name: string;
  timeToGrowUpInSeconds: number;
  levelRequired: number;
  xpReward: number;
  image?: string;
};

const Lettuce: Crop = {
  id: 0,
  name: 'Lettuce',
  timeToGrowUpInSeconds: 60,
  levelRequired: 1,
  xpReward: 5,
  image: '',
};

const Carrot: Crop = {
  id: 1,
  name: 'Carrot',
  timeToGrowUpInSeconds: 75,
  levelRequired: 2,
  xpReward: 10,
  image: '',
};

type Land = {
  id: number;
  status: LAND_STATUS;
  growProgress?: number;
  crop?: Crop;
};

const DUMMY_LANDS: Array<Land> = Array.from(new Array(18)).map(
  (land, index) => {
    const id = index + 1;
    let status: LAND_STATUS;
    let growProgress = undefined;
    let crop = undefined;

    if (index < 3) {
      status = LAND_STATUS.GROWING_UP;
      growProgress = Math.floor(Math.random() * 101);
      if (index === 2) {
        crop = Carrot;
      } else {
        crop = Lettuce;
      }
    } else if (index < 7) {
      status = LAND_STATUS.IDLE;
    } else {
      status = LAND_STATUS.BARREN;
    }

    return { id, status, growProgress, crop };
  }
);

function Land({ land }: Readonly<{ land: Land }>) {
  let formattedTimeRemainingForGrowUp = undefined;

  if(land.crop && land.growProgress) {
    formattedTimeRemainingForGrowUp = land.crop.timeToGrowUpInSeconds * land.growProgress / 100;
  }

  return (
    <Card className="flex flex-col justify-between aspect-square shadow-sm overflow-hidden">
      <div className="flex-1">LAND {land.id}</div>
      {(land.crop && land.growProgress && (land.status === LAND_STATUS.GROWING_UP ||
        land.status === LAND_STATUS.GROWN_UP))
          ? (
        <div className="relative h-1/6 bg-green-500 text-center">
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10">
            <span>{formattedTimeRemainingForGrowUp}s</span>
          </div>
          <Progress
            value={land.growProgress}
            className="h-full bg-green-200 rounded-none"
            indicatorClassName="bg-green-600"
          />
        </div>
      ) : (
        <div className={cn("h-1/6 flex justify-center items-center", land.status === LAND_STATUS.BARREN ? 'bg-red-200' : 'bg-muted')}>
          <span className='text-sm font-bold uppercase'>
            {land.status}
          </span>
        </div>
      )}
    </Card>
  );
}

function LandsGridView() {
  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-4">
      {DUMMY_LANDS.map((land) => (
        <Land key={land.id} land={land} />
      ))}
    </div>
  );
}

export default function Farm() {
  const { user } = useAuth({
    middleware: 'auth',
  });
  const [isTableView, setIsTableView] = useState<boolean>(false);

  return (
    <Card>
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle>Farm</CardTitle>
          <div className="flex items-center space-x-2">
            <Label htmlFor="airplane-mode">Table view</Label>
            <Switch id="airplane-mode" />
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <LandsGridView />
      </CardContent>
    </Card>
  );
}
