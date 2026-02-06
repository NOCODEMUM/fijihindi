"use client";

import { motion } from "framer-motion";

interface ResponseOption {
  fijiHindi: string;
  english: string;
}

interface ResponseOptionsProps {
  options: ResponseOption[];
  onSelect: (option: ResponseOption) => void;
  disabled?: boolean;
}

export default function ResponseOptions({
  options,
  onSelect,
  disabled = false
}: ResponseOptionsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="space-y-3"
    >
      <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-4">
        Tap to respond:
      </p>

      {options.map((option, index) => (
        <motion.button
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: index * 0.1 }}
          onClick={() => !disabled && onSelect(option)}
          disabled={disabled}
          className={`
            w-full p-4 rounded-2xl text-left transition-all border
            ${disabled
              ? "opacity-50 cursor-not-allowed bg-gray-100 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
              : "bg-primary/10 hover:bg-primary/20 border-primary/20 hover:border-primary/40 active:scale-[0.98]"
            }
          `}
        >
          <p className="font-medium text-charcoal dark:text-white text-lg">
            {option.fijiHindi}
          </p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            {option.english}
          </p>
        </motion.button>
      ))}
    </motion.div>
  );
}
