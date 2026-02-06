"use client";

import { motion } from "framer-motion";
import Image from "next/image";

interface LogoProps {
  size?: "sm" | "md" | "lg";
  showTagline?: boolean;
  className?: string;
}

export default function Logo({ size = "md", showTagline = false, className = "" }: LogoProps) {
  const imageSizes = {
    sm: { width: 100, height: 40 },
    md: { width: 150, height: 60 },
    lg: { width: 250, height: 100 },
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
      >
        <Image
          src="/logo.webp"
          alt="Fiji Hindi"
          width={imageSizes[size].width}
          height={imageSizes[size].height}
          className="object-contain"
          priority
        />
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
