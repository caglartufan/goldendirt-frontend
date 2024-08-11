import { type ClassValue, clsx } from 'clsx';
import { FormikErrors, FormikTouched } from 'formik';
import { twMerge } from 'tailwind-merge';
import { FormikInvalidities, ValidationErrors } from '@/types';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function setFormikErrors<Values>(
  setErrors: (errors: FormikErrors<Values>) => void,
  errors: ValidationErrors<Values>
) {
  const errorEntries = Object.entries(errors);

  if (!errorEntries.length) {
    return;
  }

  errorEntries.forEach(([field, fieldErrors]) => {
    const fieldError = (fieldErrors as Array<string>)[0];
    errors[field as keyof Values] = fieldError;
  });

  setErrors(errors as FormikErrors<Values>);
}

export function getFormikInvalidities<Values>(
  touched: FormikTouched<Values>,
  errors: FormikErrors<Values>
) {
  const invalidities: Partial<FormikInvalidities<Values>> = {};

  Object.keys(touched).forEach((key) => {
    const field = key as keyof Values;
    const fieldTouched = touched[field] as boolean;
    const fieldError = errors[field];
    invalidities[field] = (fieldTouched && fieldError) as boolean;
  });

  return invalidities;
}
