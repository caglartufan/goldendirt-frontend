import { FarmField as FarmFieldT, FarmFieldStatus } from '@/types';
import { Card } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import Image from 'next/image';

export const FarmField = ({ farmField }: Readonly<{ farmField: FarmFieldT }>) => {
  return (
    <Card className="aspect-square shadow-sm overflow-hidden">
      <div className="flex flex-col justify-center items-center h-[calc(100%-2rem)]">
        {farmField.crop && (
          <Image
            src={farmField.crop.image}
            alt={farmField.crop.name}
            width={0}
            height={0}
            sizes="100vw"
            className="w-auto h-1/2"
          />
        )}
      </div>
      {farmField.status === FarmFieldStatus.Planted ? (
        <div className="relative h-8 bg-green-500 text-center border-t">
          <div className="absolute top-0 left-0 flex justify-center items-center w-full h-full z-10">
            <span className="text-sm font-bold">{farmField.progress}%</span>
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
            'h-8 flex justify-center items-center border-t',
            farmField.status === FarmFieldStatus.Barren ? 'bg-red-200' : 'bg-muted'
          )}
        >
          <span className="text-sm font-bold uppercase">{farmField.status}</span>
        </div>
      )}
    </Card>
  );
};
