/**
 * Button
 * Description: A reusable button component with different variants and polymorphic behavior
 */
import React, { ElementType, ComponentPropsWithoutRef, PropsWithChildren } from 'react';

// Define polymorphic component types
type AsProp<E extends ElementType> = {
  as?: E;
};

type ButtonOwnProps = {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  fullWidth?: boolean;
  className?: string;
};

export type ButtonProps<E extends ElementType = 'button'> = AsProp<E> &
  ButtonOwnProps &
  Omit<ComponentPropsWithoutRef<E>, keyof AsProp<E> | keyof ButtonOwnProps>;

const Button = <E extends ElementType = 'button'>({
  as,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  children,
  className = '',
  ...props
}: PropsWithChildren<ButtonProps<E>>) => {
  const Component = as || 'button';

  // Tailwind classes based on variant
  const variantClasses = {
    primary: 'bg-neutral text-white hover:bg-neutral/90',
    secondary: 'bg-accent text-neutral hover:bg-accent/90',
    outline: 'border border-neutral text-neutral hover:bg-neutral hover:text-white',
    ghost: 'text-neutral hover:bg-accent/20',
  };

  // Tailwind classes based on size
  const sizeClasses = {
    sm: 'py-1 px-3 text-sm',
    md: 'py-2 px-4',
    lg: 'py-3 px-6 text-lg',
  };

  return (
    <Component
      className={`
        ${variantClasses[variant]}
        ${sizeClasses[size]}
        ${fullWidth ? 'w-full' : ''}
        rounded transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-neutral/50 inline-flex items-center justify-center
        ${className}
      `}
      {...props}
    >
      {children}
    </Component>
  );
};

export default Button;