import { type FarmField as FarmFieldT, FarmFieldStatus } from '@/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';

export const FarmField = ({ farmField }: Readonly<{ farmField: FarmFieldT }>) => {
  return (
    <Card className="flex flex-col justify-between aspect-square shadow-sm overflow-hidden">
      <div className="flex-1">LAND {farmField.id}</div>
      {farmField.status === FarmFieldStatus.Planted ? (
        <div className="relative h-1/6 bg-green-500 text-center">
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10">
            <span>{farmField.progress}%</span>
          </div>
          <Progress
            value={farmField.progress}
            className="h-full bg-green-200 rounded-none"
            indicatorClassName="bg-green-600"
          />
        </div>
      ) : (
        <div
          className={cn(
            'h-1/6 flex justify-center items-center',
            farmField.status === FarmFieldStatus.Barren ? 'bg-red-200' : 'bg-muted'
          )}
        >
          <span className="text-sm font-bold uppercase">{farmField.status}</span>
        </div>
      )}
    </Card>
  );
};
