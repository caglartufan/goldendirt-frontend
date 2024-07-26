import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { X } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "./button"

const alertVariants = cva(
  "w-full rounded-lg border p-4",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive",
        successive: "border-lime-500 bg-lime-100"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const iconVariants = cva(
  "text-foreground",
  {
    variants: {
      variant: {
        default: "",
        destructive:
          "text-destructive",
        successive: "text-lime-500"
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

type AlertProps = React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof alertVariants> & {
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description?: React.ReactNode;
  dismissable?: boolean;
  onDismiss?: () => void;
};

const Alert = React.forwardRef<
  HTMLDivElement,
  AlertProps
>(({ className, variant, icon, title, description, dismissable, onDismiss, children, ...props }, ref) => {
  if(children) {
    return (
      <div
        ref={ref}
        role="alert"
        className={cn(alertVariants({ variant }), className)}
        {...props}
      >
        {children}
      </div>
    );
  }

  return (
    <div
      ref={ref}
      role="alert"
      className={cn(alertVariants({ variant }), className)}
      {...props}
    >
      <div className="flex gap-x-3">
        {icon && (
          <div className={iconVariants({ variant })}>
            {icon}
          </div>
        )}
        <div className="flex-1">
          {title && <AlertTitle>{title}</AlertTitle>}
          {description && <AlertDescription>{description}</AlertDescription>}
        </div>
        {dismissable && (
          <Button variant="ghost" size="icon" className="hover:bg-transparent" onClick={onDismiss}>
            <X className="h-5 w-5" />
          </Button>
        )}
      </div>
    </div>
  )
})
Alert.displayName = "Alert"

const AlertTitle = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, ...props }, ref) => (
  <h5
    ref={ref}
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
))
AlertTitle.displayName = "AlertTitle"

const AlertDescription = React.forwardRef<
  HTMLParagraphElement,
  React.HTMLAttributes<HTMLParagraphElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
))
AlertDescription.displayName = "AlertDescription"

const AlertDismissButton = () => {
  return (
    <Button variant="link">
      <X />
    </Button>
  );
};

export { Alert, AlertTitle, AlertDescription, AlertDismissButton }
