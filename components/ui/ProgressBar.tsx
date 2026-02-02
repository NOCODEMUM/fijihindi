"use client";

import { motion } from "framer-motion";

interface ProgressBarProps {
  progress: number; // 0-100
  showLabel?: boolean;
  size?: "sm" | "md" | "lg";
  color?: "primary" | "accent" | "secondary";
  className?: string;
}

export default function ProgressBar({
  progress,
  showLabel = false,
  size = "md",
  color = "primary",
  className = ""
}: ProgressBarProps) {
  const sizes = {
    sm: "h-1.5",
    md: "h-2",
    lg: "h-3",
  };

  const colors = {
    primary: "bg-primary",
    accent: "bg-accent",
    secondary: "bg-secondary",
  };

  return (
    <div className={`w-full ${className}`}>
      {showLabel && (
        <div className="flex justify-between mb-1">
          <span className="text-xs text-gray-500 dark:text-gray-400">Progress</span>
          <span className="text-xs font-medium text-charcoal dark:text-white">{Math.round(progress)}%</span>
        </div>
      )}
      <div className={`w-full bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden ${sizes[size]}`}>
        <motion.div
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className={`${sizes[size]} ${colors[color]} rounded-full`}
        />
      </div>
    </div>
  );
}
