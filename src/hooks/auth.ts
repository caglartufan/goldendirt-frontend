import { useEffect } from 'react';
import { useParams, usePathname, useRouter } from 'next/navigation';
import useSWR from 'swr';
import axios from '@/lib/axios';

type ErrorObj = {
  response: {
    status: number;
    data: {
      errors: any;
    };
  };
};

export const useAuth = ({
  middleware,
  redirectIfAuthenticated,
}: Readonly<{
  middleware?: 'guest' | 'auth';
  redirectIfAuthenticated?: string;
}> = {}) => {
  const router = useRouter();
  const params = useParams();
  const pathname = usePathname();

  const {
    data: user,
    error,
    mutate,
  } = useSWR<User, ErrorObj, '/api/user'>(
    '/api/user',
    async (arg: '/api/user') => {
      const response = await axios.get<User>(arg);
      return response.data;
    }
  );

  const csrf = () => axios.get('/sanctum/csrf-cookie');

  const signup = async ({
    setErrors,
    ...props
  }: Readonly<{
    setErrors: (prevErrors: any) => void;
    username: string;
    email: string;
    password: string;
    password_confirmation: string;
  }>) => {
    await csrf();

    axios
      .post('/sign-up', props)
      .then(() => mutate())
      .catch((error: ErrorObj) => {
        if (error.response.status !== 422) throw error;

        setErrors(error.response.data.errors);
      });
  };

  const logout = async () => {
    if (!error) {
      await axios.post('/logout').then(() => mutate());
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
    logout,
  };
};
