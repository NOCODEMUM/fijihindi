"use client";

import { motion } from "framer-motion";

interface LessonCardProps {
  icon: React.ReactNode;
  title: string;
  subtitle?: string;
  badge?: string;
  badgeColor?: "primary" | "accent" | "secondary";
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

export default function LessonCard({
  icon,
  title,
  subtitle,
  badge,
  badgeColor = "accent",
  selected = false,
  disabled = false,
  onClick,
  className = ""
}: LessonCardProps) {
  const badgeColors = {
    primary: "bg-primary/10 text-primary",
    accent: "bg-accent/10 text-accent",
    secondary: "bg-secondary/10 text-secondary",
  };

  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.02 }}
      whileTap={{ scale: disabled ? 1 : 0.98 }}
      onClick={onClick}
      disabled={disabled}
      className={`
        w-full p-4 rounded-2xl text-left transition-all duration-200
        ${selected
          ? "bg-primary/5 border-2 border-primary shadow-lg shadow-primary/10"
          : "bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-gray-200"
        }
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}
      `}
    >
      <div className="flex items-center gap-4">
        <div className={`
          w-12 h-12 rounded-xl flex items-center justify-center text-2xl
          ${selected ? "bg-primary/10" : "bg-gray-100 dark:bg-gray-700"}
        `}>
          {icon}
        </div>
        <div className="flex-1 min-w-0">
          {badge && (
            <span className={`inline-block text-xs font-semibold px-2 py-0.5 rounded-full mb-1 ${badgeColors[badgeColor]}`}>
              {badge}
            </span>
          )}
          <h3 className="font-semibold text-charcoal dark:text-white truncate">
            {title}
          </h3>
          {subtitle && (
            <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
              {subtitle}
            </p>
          )}
        </div>
        {selected && (
          <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center">
            <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          </div>
        )}
      </div>
    </motion.button>
  );
}
