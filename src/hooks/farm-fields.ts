import { useEffect } from 'react';
import useSWR from 'swr';
import { DateTime } from 'luxon';
import axios from '@/lib/axios';
import { ErrorObj, SetErrorsFn, FarmField, FarmFieldStatus } from '@/types';
import { useAuth } from './auth';

export const useFarmFields = () => {
  const {
    data: farmFields,
    error,
    mutate,
  } = useSWR<Array<FarmField>, ErrorObj, '/api/game/farm-fields'>(
    '/api/game/farm-fields',
    async (arg: '/api/game/farm-fields') => {
      const response = await axios.get<Array<FarmField>>(arg);
      const farmFields = response.data;

      // Transform farmFields that have crop planted on them
      farmFields.forEach(farmField => {
        // Check if the farmField has crop planted on it
        const isPlanted = (
          farmField.status === FarmFieldStatus.Planted
          && typeof farmField.planted_at === 'string'
          && typeof farmField.harvestable_at === 'string'
          && farmField.crop_id !== null
          && farmField.crop !== null
        );
        if(!isPlanted) {
          return;
        }

        // Transform planted_at and harvestable_at ISO strings to DateTime objects in local timezone.
        farmField.planted_at = DateTime.fromISO(farmField.planted_at as string).toLocal();
        farmField.harvestable_at = DateTime.fromISO(farmField.harvestable_at as string).toLocal();
        // Calculate seconds remaining to harvest
        farmField.seconds_remaining_to_harvest = farmField.harvestable_at.diffNow(['days', 'hours', 'minutes', 'seconds']);
        // Calculate progress percentage
        farmField.progress = farmField.seconds_remaining_to_harvest.seconds <= 0
          ? 100
          : Math.floor(
              (farmField.crop!.seconds_to_grow_up - farmField.seconds_remaining_to_harvest.seconds)
              / farmField.crop!.seconds_to_grow_up
              * 100
            );
      });

      return response.data;
    }
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const signup = async ({
    setErrors,
    ...props
  }: Readonly<{
    setErrors: SetErrorsFn;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>) => {
    await csrf();

    setErrors({});

    try {
      await axios.post('/sign-up', props);
      await mutate();
    } catch (error) {
      if (!error || typeof error !== 'object' || !('response' in error)) {
        return;
      }

      const errorObj = error as ErrorObj;

      if (errorObj.response.status !== 422) {
        throw error;
      }

      setErrors(errorObj.response.data.errors);
    }
  };

  useEffect(() => {
    // console.log(error);
    // if (error && error.response.status === 401) logout();
  }, []);

  return {
    farmFields
  };
};
