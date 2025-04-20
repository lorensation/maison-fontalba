/**
 * Input
 * Description: A reusable input component with label and error handling
 */
import React, { forwardRef } from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-neutral">
            {label}
          </label>
        )}
        <input
          ref={ref}
          className={`
            bg-white border rounded-md py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:ring-2 focus:ring-neutral/50
            ${error ? 'border-red-500' : 'border-gray-300'}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Input.displayName = 'Input';

export default Input;