"use client";

import { motion } from "framer-motion";

interface StreakBadgeProps {
  streak: number;
  size?: "sm" | "md" | "lg";
  showLabel?: boolean;
}

export default function StreakBadge({
  streak,
  size = "md",
  showLabel = true
}: StreakBadgeProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-2xl",
    lg: "text-4xl",
  };

  const numberSizes = {
    sm: "text-sm",
    md: "text-lg",
    lg: "text-2xl",
  };

  // Different fire colors based on streak
  const getStreakEmoji = () => {
    if (streak >= 30) return "🌟"; // Gold star for 30+ days
    if (streak >= 14) return "💪"; // Strong for 2+ weeks
    if (streak >= 7) return "⚡"; // Lightning for 1+ week
    return "🔥"; // Fire for regular streak
  };

  const getStreakColor = () => {
    if (streak >= 30) return "from-yellow-400 to-amber-500";
    if (streak >= 14) return "from-purple-400 to-purple-600";
    if (streak >= 7) return "from-blue-400 to-blue-600";
    return "from-orange-400 to-red-500";
  };

  if (streak === 0) {
    return (
      <div className="flex items-center gap-2 text-gray-400">
        <span className={sizes[size]}>💤</span>
        {showLabel && (
          <div>
            <p className={`font-bold ${numberSizes[size]}`}>No streak</p>
            <p className="text-xs">Start today!</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.9, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      className="flex items-center gap-2"
    >
      <motion.div
        animate={streak >= 3 ? { scale: [1, 1.1, 1] } : {}}
        transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 2 }}
        className={`relative ${sizes[size]}`}
      >
        {getStreakEmoji()}
      </motion.div>

      {showLabel && (
        <div>
          <p className={`font-bold text-transparent bg-clip-text bg-gradient-to-r ${getStreakColor()} ${numberSizes[size]}`}>
            {streak} day{streak !== 1 ? "s" : ""}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            {streak >= 30
              ? "Legendary!"
              : streak >= 14
              ? "On fire!"
              : streak >= 7
              ? "Keep it up!"
              : "streak"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
