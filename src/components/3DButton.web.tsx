import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { clsx } from "clsx";

// Utility function to merge class names
function cn(
  ...inputs: (string | undefined | null | false | Record<string, boolean>)[]
): string {
  return clsx(inputs);
}

const buttonVariants = cva(
  "inline-flex items-center justify-center whitespace-nowrap rounded-xl text-sm font-semibold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 gap-2 border active:scale-95",
  {
    variants: {
      variant: {
        ai: "bg-indigo-500 text-white hover:bg-indigo-600 border-indigo-700 border-b-4 border-b-indigo-600 shadow-md",
        default:
          "bg-blue-500 text-white hover:bg-blue-600 border-blue-700 border-b-4 border-b-blue-600 shadow-md",
        destructive:
          "bg-red-500 text-white hover:bg-red-600 border-red-700 border-b-4 border-red-600 shadow-md",
        outline:
          "border bg-white hover:bg-neutral-100 border-neutral-300 border-b-4 border-b-neutral-200 text-neutral-900",
        outline_destructive:
          "border text-red-500 bg-white hover:bg-red-50 border-red-600 border-b-4 border-b-red-500",
        secondary:
          "bg-neutral-100 text-neutral-900 hover:bg-neutral-200 border-transparent",
        ghost:
          "bg-transparent text-neutral-900 hover:bg-neutral-100 border-transparent",
        ghost_destructive:
          "bg-transparent text-red-500 hover:bg-red-50 border-transparent",
        link: "text-blue-500 underline-offset-4 hover:underline border-transparent",
        solid: "bg-zinc-800 text-white hover:bg-zinc-700 border-transparent",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-lg px-3",
        lg: "h-11 rounded-xl px-8",
        xs: "h-8 rounded-md px-4 text-xs",
        icon: "h-10 w-10 p-0",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ThreeDButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  isLoading?: boolean;
  stretch?: boolean;
}

export const ThreeDButton = React.forwardRef<
  HTMLButtonElement,
  ThreeDButtonProps
>(
  (
    {
      className,
      variant,
      size,
      children,
      stretch = false,
      isLoading = false,
      disabled = false,
      type = "button",
      ...props
    },
    ref
  ) => {
    return (
      <>
        <style>{`
          @keyframes spin {
            to {
              transform: rotate(360deg);
            }
          }
        `}</style>
        <button
          className={cn(
            buttonVariants({ variant, size, className }),
            stretch && "w-full"
          )}
          ref={ref}
          type={type}
          disabled={disabled || isLoading}
          {...props}
        >
          {isLoading ? (
            <span
              className="inline-block h-4 w-4 border-2 border-current border-t-transparent rounded-full"
              style={{ animation: "spin 0.6s linear infinite" }}
            />
          ) : (
            children
          )}
        </button>
      </>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";

// ThreeDButtonGroup Component
export interface ThreeDButtonGroupProps
  extends React.HTMLAttributes<HTMLDivElement> {}

export const ThreeDButtonGroup = React.forwardRef<
  HTMLDivElement,
  ThreeDButtonGroupProps
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "flex flex-row overflow-hidden rounded-lg border border-neutral-300 w-fit divide-x divide-neutral-300",
        "[&>button]:rounded-none [&>button]:border-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
});

ThreeDButtonGroup.displayName = "ThreeDButtonGroup";

// Helper function to get button class names programmatically
export const threeDButtonVariants = buttonVariants;

// Export types
export type ThreeDButtonVariant = NonNullable<
  VariantProps<typeof buttonVariants>["variant"]
>;
export type ThreeDButtonSize = NonNullable<
  VariantProps<typeof buttonVariants>["size"]
>;
