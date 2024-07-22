'use client';
import Link from 'next/link';
import { Formik, FormikHelpers, useFormik } from 'formik';
import * as Yup from 'yup';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FormikInput } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useAuth } from '@/hooks/auth';
import { getFormikInvalidities, setFormikErrors } from '@/lib/utils';
import { Checkbox } from '@/components/ui/checkbox';
import { useEffect } from 'react';

interface ISignInFormValues {
  login: string;
  password: string;
  remember: boolean;
}

const initialValues: ISignInFormValues = {
  login: '',
  password: '',
  remember: false,
};

function PasswordLabel({ id, label }: Readonly<{ id: string; label: string }>) {
  return (
    <div className="flex items-center">
      <Label htmlFor={id}>{label}</Label>
      <Link
        href="/forgot-password"
        className="ml-auto inline-block text-sm underline"
      >
        Forgot your password?
      </Link>
    </div>
  );
}

export default function SignIn() {
  const { signin } = useAuth({
    middleware: 'guest',
    redirectIfAuthenticated: '/',
  });

  const submitHandler = (
    values: ISignInFormValues,
    formikHelpers: FormikHelpers<ISignInFormValues>
  ) => {
    console.log(values);
    signin({
      ...values,
      setErrors: (errors: ValidationErrors<ISignInFormValues>) => {
        setFormikErrors<ISignInFormValues>(formikHelpers.setErrors, errors);
      },
    });
  };

  const validationSchema = Yup.object({
    login: Yup.string().required(),
    password: Yup.string().min(8).required(),
  });

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: submitHandler,
  });

  const invalidity = getFormikInvalidities<ISignInFormValues>(
    formik.touched,
    formik.errors
  );

  useEffect(() => {
    console.log(formik.values);
  }, [formik.values]);

  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-2xl">Sign In</CardTitle>
        <CardDescription>
          Enter your username or email below to sign in to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={formik.handleSubmit}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <FormikInput
                id="login"
                type="text"
                fieldProps={formik.getFieldProps('login')}
                isInvalid={invalidity.login as boolean}
                error={formik.errors.login}
                label="Username or email address"
                placeholder="Username or email@example.com"
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
                labelRender={PasswordLabel}
                placeholder="••••••••••"
                required
              />
            </div>
            <div className="flex items-center gap-x-2">
              <Checkbox
                id="remember"
                {...formik.getFieldProps('remember')}
                onCheckedChange={(checked) => {
                  formik.setFieldValue('remember', checked);
                }}
              />
              <Label htmlFor="remember">Remember me</Label>
            </div>
            <Button type="submit" className="w-full">
              Sign In
            </Button>
            {/* <Button variant="outline" className="w-full">
              Login with Google
            </Button> */}
          </div>
        </form>
        <div className="mt-4 text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/sign-up" className="underline">
            Sign up
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
