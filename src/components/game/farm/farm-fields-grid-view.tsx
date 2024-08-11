import { FarmField } from './farm-field';
import { useFarmFields } from '@/hooks/farm-fields';

export const FarmFieldsGridView = () => {
  const { farmFields } = useFarmFields();

  if(!farmFields) {
    return;
  }

  return (
    <div className="grid grid-cols-6 grid-rows-3 gap-4">
      {farmFields.map((farmField) => (
        <FarmField key={farmField.id} farmField={farmField} />
      ))}
    </div>
  );
};
