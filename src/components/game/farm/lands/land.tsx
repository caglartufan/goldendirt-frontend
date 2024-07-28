import { LAND_STATUS } from '@/types';
import type { Land as LandT } from '@/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export const Land = ({ land }: Readonly<{ land: LandT }>) => {
  return (
    <Card className="flex flex-col justify-between aspect-square shadow-sm overflow-hidden">
      <div className="flex-1">LAND {land.id}</div>
      {land.crop &&
      land.growProgress &&
      (land.status === LAND_STATUS.GROWING_UP ||
        land.status === LAND_STATUS.GROWN_UP) ? (
        <div className="relative h-1/6 bg-green-500 text-center">
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10">
            <span>{land.growProgress}</span>
          </div>
          <Progress
            value={land.growProgress}
            className="h-full bg-green-200 rounded-none"
            indicatorClassName="bg-green-600"
          />
        </div>
      ) : (
        <div
          className={cn(
            'h-1/6 flex justify-center items-center',
            land.status === LAND_STATUS.BARREN ? 'bg-red-200' : 'bg-muted'
          )}
        >
          <span className="text-sm font-bold uppercase">{land.status}</span>
        </div>
      )}
    </Card>
  );
};
