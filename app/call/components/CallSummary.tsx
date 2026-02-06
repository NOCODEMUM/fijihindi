"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface CallSummaryProps {
  conversationTitle: string;
  duration: number;
  phrasesLearned: string[];
  onContinue: () => void;
  onRepeat?: () => void;
}

export default function CallSummary({
  conversationTitle,
  duration,
  phrasesLearned,
  onContinue,
  onRepeat,
}: CallSummaryProps) {
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen px-4 py-8"
    >
      {/* Success header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Call Complete!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          {conversationTitle}
        </p>
      </motion.div>

      {/* Call stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-8 mb-8"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{formatTime(duration)}</p>
          <p className="text-sm text-gray-500">Duration</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{phrasesLearned.length}</p>
          <p className="text-sm text-gray-500">Phrases</p>
        </div>
      </motion.div>

      {/* Phrases learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
          Phrases You Practiced
        </h3>
        <div className="space-y-3">
          {phrasesLearned.map((phrase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-charcoal dark:text-white">{phrase}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Action buttons */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="mt-8 space-y-3"
      >
        <Button onClick={onContinue} size="lg" fullWidth>
          Continue
        </Button>
        {onRepeat && (
          <Button onClick={onRepeat} variant="ghost" size="md" fullWidth>
            Practice Again
          </Button>
        )}
      </motion.div>
    </motion.div>
  );
}
