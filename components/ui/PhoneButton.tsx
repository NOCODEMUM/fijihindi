"use client";

import { motion } from "framer-motion";

interface PhoneButtonProps {
  onClick: () => void;
  label?: string;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
}

export default function PhoneButton({
  onClick,
  label = "Call Nani",
  disabled = false,
  size = "lg"
}: PhoneButtonProps) {
  const sizes = {
    sm: "w-16 h-16 text-2xl",
    md: "w-20 h-20 text-3xl",
    lg: "w-24 h-24 text-4xl",
  };

  const labelSizes = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <motion.button
      onClick={onClick}
      disabled={disabled}
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      className="flex flex-col items-center gap-3"
    >
      <motion.div
        animate={!disabled ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="relative"
      >
        {/* Pulse rings */}
        {!disabled && (
          <>
            <motion.div
              animate={{
                scale: [1, 1.3, 1],
                opacity: [0.3, 0, 0.3],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className={`absolute inset-0 rounded-full bg-green-400 ${sizes[size]}`}
            />
            <motion.div
              animate={{
                scale: [1, 1.5, 1],
                opacity: [0.2, 0, 0.2],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.3,
              }}
              className={`absolute inset-0 rounded-full bg-green-300 ${sizes[size]}`}
            />
          </>
        )}

        {/* Main button */}
        <div
          className={`
            relative rounded-full flex items-center justify-center shadow-xl
            ${sizes[size]}
            ${disabled
              ? "bg-gray-300 text-gray-500"
              : "bg-gradient-to-br from-green-400 to-green-600 text-white shadow-green-500/40"
            }
          `}
        >
          📞
        </div>
      </motion.div>

      <span className={`font-semibold text-charcoal dark:text-white ${labelSizes[size]}`}>
        {label}
      </span>
    </motion.button>
  );
}
