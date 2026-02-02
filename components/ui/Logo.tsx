"use client";

import { motion } from "framer-motion";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showTagline = false, className = "" }: LogoProps) {
  const sizes = {
    sm: "text-xl",
    md: "text-3xl",
    lg: "text-5xl",
  };

  const taglineSizes = {
    sm: "text-xs",
    md: "text-sm",
    lg: "text-base",
  };

  return (
    <div className={`flex flex-col items-center ${className}`}>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        className={`font-heading italic font-bold ${sizes[size]} text-charcoal dark:text-white`}
      >
        <span className="relative">
          <span className="absolute -top-2 -left-1 text-base">🥥</span>
          <span className="ml-4">fiji</span>
        </span>
        {" "}
        <span className="text-primary relative">
          hindi
          <span className="absolute -top-2 -right-3 text-base">🥥</span>
        </span>
      </motion.div>
      {showTagline && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className={`${taglineSizes[size]} text-gray-500 dark:text-gray-400 mt-1`}
        >
          Our Language, Our Stories
        </motion.p>
      )}
    </div>
  );
}
