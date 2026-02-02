"use client";

import { forwardRef } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = "", label, error, hint, id, ...props }, ref) => {
    const inputId = id || label?.toLowerCase().replace(/\s/g, "-");

    return (
      <div className="w-full">
        {label && (
          <label
            htmlFor={inputId}
            className="block text-sm font-medium text-charcoal dark:text-white mb-2"
          >
            {label}
          </label>
        )}
        <input
          ref={ref}
          id={inputId}
          className={`
            w-full px-4 py-3 rounded-xl border-2 transition-all duration-200
            bg-white dark:bg-gray-800
            text-charcoal dark:text-white
            placeholder-gray-400 dark:placeholder-gray-500
            border-gray-200 dark:border-gray-700
            focus:border-primary focus:ring-2 focus:ring-primary/20 focus:outline-none
            disabled:opacity-50 disabled:cursor-not-allowed
            ${error ? "border-red-500 focus:border-red-500 focus:ring-red-500/20" : ""}
            ${className}
          `}
          {...props}
        />
        {error && <p className="mt-2 text-sm text-red-500">{error}</p>}
        {hint && !error && (
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">{hint}</p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;
