'use client';
import Link from 'next/link';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormikInput, Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  FormikHelpers,
  useFormik,
} from 'formik';
import { useAuth } from '@/hooks/auth';
import { getFormikInvalidities, setFormikErrors } from '@/lib/utils';

interface ISignUpFormValues {
  username: string;
  email: string;
  password: string;
  password_confirmation: string;
}

const initialValues: ISignUpFormValues = {
  username: '',
  email: '',
  password: '',
  password_confirmation: '',
};

export default function SignUp() {
  const { signup } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const submitHandler = (values: ISignUpFormValues, formikHelpers: FormikHelpers<ISignUpFormValues>) => {
    signup({
      ...values,
      setErrors: (errors: ValidationErrors<ISignUpFormValues>) => {
        setFormikErrors(formikHelpers.setErrors, errors);
      }
    });
  };

  const validationSchema = Yup.object({
    username: Yup.string().min(4).max(30).matches(/^[a-zA-Z0-9]+$/).required(),
    email: Yup.string().email().lowercase().max(255).required(),
    password: Yup.string().min(8).required(),
    password_confirmation: Yup.string().min(8).oneOf([Yup.ref('password')]).required()
  });

  const formik = useFormik<ISignUpFormValues>({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  const invalidity = getFormikInvalidities<ISignUpFormValues>(formik.touched, formik.errors);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign Up</CardTitle>
        <CardDescription>
          Enter your information to join the exciting world of Golden Dirt!
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormikInput
                id="username"
                type="username"
                fieldProps={formik.getFieldProps('username')}
                isInvalid={invalidity.username as boolean}
                error={formik.errors.username}
                label="Username"
                placeholder="Username"
                required
              />
            </div>
            <div className="grid gap-2">
              <FormikInput
                id="email"
                type="email"
                fieldProps={formik.getFieldProps('email')}
                isInvalid={invalidity.email as boolean}
                error={formik.errors.email}
                label="Email address"
                placeholder="email@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <FormikInput
                id="password"
                type="password"
                fieldProps={formik.getFieldProps('password')}
                isInvalid={invalidity.password as boolean}
                error={formik.errors.password}
                label="Password"
                placeholder="••••••••••"
                required
              />
            </div>
            <div className="grid gap-2">
              <FormikInput
                id="password_confirmation"
                type="password"
                fieldProps={formik.getFieldProps('password_confirmation')}
                isInvalid={invalidity.password_confirmation as boolean}
                error={formik.errors.password_confirmation}
                label="Password confirmation"
                placeholder="••••••••••"
                required
              />
            </div>
            <Button type="submit" className="w-full">
              Create an account
            </Button>
            {/* <Button variant="outline" className="w-full">
              Sign up with GitHub
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Already have an account?{' '}
          <Link href="/sign-in" className="underline">
            Sign in
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
