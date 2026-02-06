"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { speakFijiHindi } from "@/lib/audio";

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
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const handlePlayAudio = (e: React.MouseEvent, text: string, index: number) => {
    e.stopPropagation(); // Don't trigger selection
    if (playingIndex === index) return; // Already playing this one

    setPlayingIndex(index);
    speakFijiHindi(text, {
      onEnd: () => setPlayingIndex(null),
      onError: () => setPlayingIndex(null),
    });
  };

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
          <div className="flex items-start justify-between gap-3">
            <div className="flex-1">
              <p className="font-medium text-charcoal dark:text-white text-lg">
                {option.fijiHindi}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                {option.english}
              </p>
            </div>
            {/* Audio preview button */}
            <button
              onClick={(e) => handlePlayAudio(e, option.fijiHindi, index)}
              disabled={disabled}
              className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${
                playingIndex === index
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700 text-gray-500 hover:bg-gray-300 dark:hover:bg-gray-600"
              }`}
              aria-label="Preview pronunciation"
            >
              {playingIndex === index ? (
                <span className="animate-pulse">🔊</span>
              ) : (
                <span>🔈</span>
              )}
            </button>
          </div>
        </motion.button>
      ))}
    </motion.div>
  );
}
