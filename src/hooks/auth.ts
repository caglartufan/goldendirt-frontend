import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import axios from '@/lib/axios';
import { User, ErrorObj, SetErrorsFn } from '@/types';

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: Readonly<{
  middleware?: 'guest' | 'auth';
  redirectIfAuthenticated?: string;
}> = {}) => {
  const router = useRouter();
  const pathname = usePathname();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User, ErrorObj, '/api/profile'>(
    '/api/profile',
    async (arg: '/api/profile') => {
      const response = await axios.get<User>(arg);
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

  const signin = async ({
    setErrors,
    ...props
  }: Readonly<{
    login: string;
    password: string;
    setErrors: SetErrorsFn;
  }>) => {
    await csrf();

    setErrors({});

    try {
      await axios.post('/sign-in', props);
      await mutate();
      router.replace('/farm');
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

  const logout = async () => {
    if (!error) {
      await axios.post('/logout');
      await mutate(undefined);
    }

    router.replace('/sign-in');
  };

  useEffect(() => {
    if (
      redirectIfAuthenticated &&
      ((middleware === 'guest' && user) ||
        (pathname === 'verify-email' && user?.email_verified_at))
    ) {
      router.push(redirectIfAuthenticated);
    }
    if (middleware === 'auth' && error) logout();
  }, [user, error]);

  return {
    user,
    signup,
    signin,
    logout,
  };
};
