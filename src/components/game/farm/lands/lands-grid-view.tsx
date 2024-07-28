import { Land } from './land';
import { DUMMY_LANDS } from '@/data/dummy-lands';

export const LandsGridView = () => {
  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-4">
      {DUMMY_LANDS.map((land) => (
        <Land key={land.id} land={land} />
      ))}
    </div>
  );
};
