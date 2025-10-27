import React, { useState } from 'react';
import './3DButton.css';

// Define variant types
type ThreeDButtonVariant =
  | 'ai'
  | 'default'
  | 'destructive'
  | 'outline'
  | 'outline_destructive'
  | 'secondary'
  | 'ghost'
  | 'ghost_destructive'
  | 'link'
  | 'solid';

type ThreeDButtonSize = 'default' | 'sm' | 'lg' | 'xs' | 'icon';

interface ThreeDButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ThreeDButtonVariant;
  size?: ThreeDButtonSize;
  children?: React.ReactNode;
  stretch?: boolean;
  isLoading?: boolean;
  asChild?: boolean;
}

export const ThreeDButton = React.forwardRef<HTMLButtonElement, ThreeDButtonProps>(
  (
    {
      variant = 'default',
      size = 'default',
      children,
      stretch = false,
      isLoading = false,
      disabled = false,
      className = '',
      type = 'button',
      ...props
    },
    ref,
  ) => {
    const [isPressed, setIsPressed] = useState(false);

    const buttonClasses = [
      'threed-button',
      `threed-button--${variant}`,
      `threed-button--${size}`,
      stretch && 'threed-button--stretch',
      (disabled || isLoading) && 'threed-button--disabled',
      isPressed && 'threed-button--pressed',
      className,
    ]
      .filter(Boolean)
      .join(' ');

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
          <span className="threed-button__spinner" />
        ) : (
          <span className="threed-button__content">{children}</span>
        )}
      </button>
    );
  },
);

ThreeDButton.displayName = 'ThreeDButton';

// ThreeDButtonGroup Component
interface ThreeDButtonGroupProps {
  children: React.ReactNode;
  className?: string;
}

export const ThreeDButtonGroup: React.FC<ThreeDButtonGroupProps> = ({ children, className = '' }) => {
  return <div className={`threed-button-group ${className}`}>{children}</div>;
};

// Helper function to get button styles programmatically
export const threeDButtonVariants = (config?: { variant?: ThreeDButtonVariant; size?: ThreeDButtonSize }) => {
  const variant = config?.variant || 'default';
  const size = config?.size || 'default';

  return {
    variant,
    size,
  };
};

// Export types
export type { ThreeDButtonProps, ThreeDButtonVariant, ThreeDButtonSize, ThreeDButtonGroupProps };
