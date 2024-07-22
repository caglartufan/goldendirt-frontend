import * as React from "react"

import { cn } from "@/lib/utils"
import { FieldInputProps } from "formik";
import { Label } from "./label";
import FormError from "../typography/form-error";

export interface InputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
    isInvalid?: boolean;
  }

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, isInvalid, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-10 w-full rounded-md border border-stone-200 bg-white px-3 py-2 text-sm ring-offset-white file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-stone-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-950 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 dark:border-stone-800 dark:bg-stone-950 dark:ring-offset-stone-950 dark:placeholder:text-stone-400 dark:focus-visible:ring-stone-300",
          isInvalid ? 'border-destructive' : '',
          className,
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Input.displayName = "Input"

const FormikInput = function<Value extends string>({
  id,
  type,
  isInvalid,
  fieldProps,
  label,
  labelRender,
  error,
  ...props
}: Readonly<
  InputProps & {
    isInvalid: boolean;
    fieldProps: FieldInputProps<Value>;
    label: string;
    labelRender?: (props: { id: string; label: string; }) => React.ReactNode;
    error?: string;
  }
>) {
  return (
    <>
      {
        id && labelRender
          ? labelRender({ id, label })
          : (
              <Label
                htmlFor={id}
                variant={
                  isInvalid
                    ? 'invalid'
                    : 'default'
                }
              >
                {label}
              </Label>
            )
        }
      <Input
        id={id}
        type={type}
        {...fieldProps}
        isInvalid={isInvalid}
        {...props}
      />
      {isInvalid && <FormError>{error}</FormError>}
    </>
  );
}

export { Input, FormikInput }
