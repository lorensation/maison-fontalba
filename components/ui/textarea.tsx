/**
 * Textarea
 * Description: A reusable textarea component with label and error handling
 */
import React, { forwardRef } from 'react';

interface TextareaProps extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ label, error, fullWidth = true, className = '', ...props }, ref) => {
    return (
      <div className={`mb-4 ${fullWidth ? 'w-full' : ''}`}>
        {label && (
          <label htmlFor={props.id} className="block mb-2 text-sm font-medium text-neutral">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          className={`
            bg-white border rounded-md py-2 px-3 text-gray-700 leading-tight
            focus:outline-none focus:ring-2 focus:ring-neutral/50
            ${error ? 'border-red-500' : 'border-gray-300'}
            min-h-[120px] w-full resize-y
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-1 text-red-500 text-xs">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';

export default Textarea;