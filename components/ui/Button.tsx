"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface ButtonProps
  extends Omit<HTMLMotionProps<"button">, "disabled"> {
  variant?: "primary" | "secondary" | "mango" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
  fullWidth?: boolean;
  isLoading?: boolean;
  disabled?: boolean;
  icon?: React.ReactNode;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className = "",
      variant = "primary",
      size = "md",
      fullWidth = false,
      isLoading = false,
      disabled,
      icon,
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles =
      "inline-flex items-center justify-center font-semibold rounded-2xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed";

    const variants = {
      // 🌊 Lagoon teal - main CTA
      primary:
        "bg-lagoon text-white hover:bg-lagoon-500 focus:ring-lagoon-400 shadow-lg shadow-lagoon/20 hover:shadow-xl hover:shadow-lagoon/30",
      // 🥭 Papaya orange - secondary actions
      secondary:
        "bg-papaya text-white hover:bg-papaya-600 focus:ring-papaya-400 shadow-lg shadow-papaya/20",
      // 🥭 Mango yellow - highlights
      mango:
        "bg-mango text-charcoal hover:bg-mango-600 focus:ring-mango-400 shadow-lg shadow-mango/30",
      // Outline style
      outline:
        "border-2 border-lagoon text-lagoon hover:bg-lagoon hover:text-white focus:ring-lagoon-400 bg-white/80",
      // Ghost - minimal
      ghost:
        "text-charcoal hover:bg-sand-100 focus:ring-sand-300",
    };

    const sizes = {
      sm: "px-4 py-2.5 text-sm gap-2",
      md: "px-6 py-3.5 text-base gap-2",
      lg: "px-8 py-4 text-lg gap-3",
    };

    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: disabled || isLoading ? 1 : 1.02 }}
        whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
        className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${fullWidth ? "w-full" : ""} ${className}`}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg
              className="animate-spin h-5 w-5"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
            <span>Loading...</span>
          </>
        ) : (
          <>
            {icon && <span className="flex-shrink-0">{icon}</span>}
            {children}
          </>
        )}
      </motion.button>
    );
  }
);

Button.displayName = "Button";

export default Button;
