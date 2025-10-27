import React, { useState } from "react";

// Define variant types
type ThreeDButtonVariant =
  | "ai"
  | "default"
  | "destructive"
  | "outline"
  | "outline_destructive"
  | "secondary"
  | "ghost"
  | "ghost_destructive"
  | "link"
  | "solid";

type ThreeDButtonSize = "default" | "sm" | "lg" | "xs" | "icon";

interface ThreeDButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ThreeDButtonVariant;
  size?: ThreeDButtonSize;
  children?: React.ReactNode;
  stretch?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

// Variant styles using Tailwind classes
const variantClasses: Record<ThreeDButtonVariant, string> = {
  ai: "bg-indigo-500 text-white border border-indigo-600 border-b-4 shadow-md hover:bg-indigo-600",
  default:
    "bg-blue-500 text-white border border-blue-600 border-b-4 shadow-md hover:bg-blue-600",
  destructive:
    "bg-red-500 text-white border border-red-600 border-b-4 shadow-md hover:bg-red-600",
  outline:
    "bg-white text-zinc-900 border border-zinc-300 border-b-4 border-b-zinc-200 hover:bg-zinc-50",
  outline_destructive:
    "bg-white text-red-500 border border-red-600 border-b-4 border-b-red-500 hover:bg-red-50",
  secondary: "bg-zinc-100 text-zinc-900 hover:bg-zinc-200",
  ghost: "bg-transparent text-zinc-900 hover:bg-zinc-100",
  ghost_destructive: "bg-transparent text-red-500 hover:bg-red-50",
  link: "bg-transparent text-blue-500 underline hover:text-blue-600",
  solid: "bg-zinc-800 text-white hover:bg-zinc-900",
};

// Size styles using Tailwind classes
const sizeClasses: Record<ThreeDButtonSize, string> = {
  xs: "h-8 px-4 text-xs rounded-md",
  sm: "h-9 px-3 text-sm rounded-lg",
  default: "h-10 px-4 py-2 text-sm rounded-xl",
  lg: "h-11 px-8 text-base rounded-xl",
  icon: "h-10 w-10 p-0",
};

export const ThreeDButton = React.forwardRef<
  HTMLButtonElement,
  ThreeDButtonProps
>(
  (
    {
      variant = "default",
      size = "default",
      children,
      stretch = false,
      isLoading = false,
      disabled = false,
      className = "",
      type = "button",
      ...props
    },
    ref
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const buttonClasses = [
      "inline-flex items-center justify-center font-semibold transition-all duration-150 select-none",
      variantClasses[variant],
      sizeClasses[size],
      stretch && "w-full",
      (disabled || isLoading) && "opacity-50 cursor-not-allowed",
      isPressed && !disabled && !isLoading && "scale-95",
      "active:scale-95",
      className,
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        type={type}
        disabled={disabled || isLoading}
        className={buttonClasses}
        onMouseDown={() => setIsPressed(true)}
        onMouseUp={() => setIsPressed(false)}
        onMouseLeave={() => setIsPressed(false)}
        {...props}
      >
        {isLoading ? (
          <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : (
          <span className="flex items-center justify-center gap-2">
            {children}
          </span>
        )}
      </button>
    );
  }
);

ThreeDButton.displayName = "ThreeDButton";

// ThreeDButtonGroup Component
interface ThreeDButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ThreeDButtonGroup: React.FC<ThreeDButtonGroupProps> = ({
  children,
  className = "",
}) => {
  return (
    <div
      className={`flex flex-row rounded-lg overflow-hidden border border-zinc-300 ${className}`}
    >
      {React.Children.map(children, (child, index) => {
        if (React.isValidElement(child)) {
          return (
            <div
              className={`flex-1 ${
                index > 0 ? "border-l border-zinc-300" : ""
              }`}
            >
              {React.cloneElement(child as React.ReactElement<any>, {
                className: `rounded-none border-none ${
                  (child.props as any).className || ""
                }`,
              })}
            </div>
          );
        }
        return child;
      })}
    </div>
  );
};

// Helper function to get button styles programmatically
export const threeDButtonVariants = (config?: {
  variant?: ThreeDButtonVariant;
  size?: ThreeDButtonSize;
}) => {
  const variant = config?.variant || "default";
  const size = config?.size || "default";

  return {
    variant,
    size,
  };
};

// Export types
export type {
  ThreeDButtonProps,
  ThreeDButtonVariant,
  ThreeDButtonSize,
  ThreeDButtonGroupProps,
};
