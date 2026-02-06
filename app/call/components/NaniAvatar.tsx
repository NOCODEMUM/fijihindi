"use client";

import { motion } from "framer-motion";

interface NaniAvatarProps {
  isSpeaking?: boolean;
  size?: "sm" | "md" | "lg";
  showName?: boolean;
}

export default function NaniAvatar({
  isSpeaking = false,
  size = "md",
  showName = true
}: NaniAvatarProps) {
  const sizes = {
    sm: "w-12 h-12",
    md: "w-20 h-20",
    lg: "w-32 h-32",
  };

  const emojiSizes = {
    sm: "text-2xl",
    md: "text-4xl",
    lg: "text-6xl",
  };

  return (
    <div className="flex flex-col items-center">
      <motion.div
        animate={isSpeaking ? {
          scale: [1, 1.05, 1],
        } : {}}
        transition={{
          duration: 0.5,
          repeat: isSpeaking ? Infinity : 0,
        }}
        className={`
          ${sizes[size]} rounded-full
          bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700
          flex items-center justify-center shadow-lg relative
        `}
      >
        {/* Speaking indicator ring */}
        {isSpeaking && (
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.5, 0, 0.5],
            }}
            transition={{
              duration: 1,
              repeat: Infinity,
            }}
            className="absolute inset-0 rounded-full border-2 border-primary"
          />
        )}

        <span className={emojiSizes[size]}>👵</span>
      </motion.div>

      {showName && (
        <div className="mt-2 text-center">
          <h3 className="font-heading font-bold text-charcoal dark:text-white">
            Nani
          </h3>
          {isSpeaking && (
            <motion.p
              animate={{ opacity: [0.5, 1, 0.5] }}
              transition={{ duration: 1, repeat: Infinity }}
              className="text-xs text-primary"
            >
              Speaking...
            </motion.p>
          )}
        </div>
      )}
    </div>
  );
}
