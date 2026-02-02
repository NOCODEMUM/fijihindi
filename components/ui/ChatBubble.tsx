"use client";

import { motion } from "framer-motion";

interface ChatBubbleProps {
  message: string;
  avatar?: React.ReactNode;
  delay?: number;
  className?: string;
}

export default function ChatBubble({
  message,
  avatar,
  delay = 0,
  className = ""
}: ChatBubbleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, type: "spring", stiffness: 200 }}
      className={`flex items-start gap-3 ${className}`}
    >
      {avatar && (
        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
          {avatar}
        </div>
      )}
      <div className="bg-gray-100 dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 max-w-[280px]">
        <p className="text-sm text-charcoal dark:text-white leading-relaxed">
          {message}
        </p>
      </div>
    </motion.div>
  );
}
