"use client";

import { forwardRef } from "react";
import { motion, HTMLMotionProps } from "framer-motion";

interface CardProps extends HTMLMotionProps<"div"> {
  variant?: "default" | "glass" | "elevated";
  padding?: "none" | "sm" | "md" | "lg";
}

const Card = forwardRef<HTMLDivElement, CardProps>(
  (
    {
      className = "",
      variant = "default",
      padding = "md",
      children,
      ...props
    },
    ref
  ) => {
    const baseStyles = "rounded-2xl overflow-hidden";

    const variants = {
      default: "bg-white dark:bg-gray-900 border border-gray-100 dark:border-gray-800",
      glass: "glass-card",
      elevated: "bg-white dark:bg-gray-900 shadow-xl",
    };

    const paddings = {
      none: "",
      sm: "p-4",
      md: "p-6",
      lg: "p-8",
    };

    return (
      <motion.div
        ref={ref}
        className={`${baseStyles} ${variants[variant]} ${paddings[padding]} ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    );
  }
);

Card.displayName = "Card";

export default Card;
