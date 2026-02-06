"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface FaithStepProps {
  onNext: (faith: string) => void;
  onBack: () => void;
  initialFaith?: string;
}

const FAITH_OPTIONS = [
  {
    id: "hindu",
    label: "Hindu",
    emoji: "🙏",
    description: "Sanatan Dharma traditions",
  },
  {
    id: "christian",
    label: "Christian",
    emoji: "✝️",
    description: "Christian faith traditions",
  },
  {
    id: "muslim",
    label: "Muslim",
    emoji: "☪️",
    description: "Islamic faith traditions",
  },
  {
    id: "sikh",
    label: "Sikh",
    emoji: "🙏",
    description: "Sikh faith traditions",
  },
  {
    id: "other",
    label: "Other / Prefer not to say",
    emoji: "🌟",
    description: "All are welcome",
  },
];

export default function FaithStep({ onNext, onBack, initialFaith }: FaithStepProps) {
  const [selectedFaith, setSelectedFaith] = useState<string>(initialFaith || "");

  const handleContinue = () => {
    if (selectedFaith) {
      onNext(selectedFaith);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-[85vh] px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-6 pt-8"
      >
        <span className="text-4xl mb-2 block">🙏</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Your Faith Background
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm">
          This helps us personalize greetings and cultural content
        </p>
      </motion.div>

      {/* Faith Options */}
      <div className="flex-1 space-y-3">
        {FAITH_OPTIONS.map((faith, index) => (
          <motion.button
            key={faith.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => setSelectedFaith(faith.id)}
            className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 ${
              selectedFaith === faith.id
                ? "bg-primary/10 border-2 border-primary"
                : "bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700 hover:border-primary/50"
            }`}
          >
            <span className="text-3xl">{faith.emoji}</span>
            <div className="flex-1">
              <p className={`font-semibold ${
                selectedFaith === faith.id ? "text-primary" : "text-charcoal dark:text-white"
              }`}>
                {faith.label}
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {faith.description}
              </p>
            </div>
            {selectedFaith === faith.id && (
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="w-6 h-6 rounded-full bg-primary flex items-center justify-center"
              >
                <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            )}
          </motion.button>
        ))}
      </div>

      {/* Info message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="text-xs text-gray-400 text-center mt-4 mb-4"
      >
        You can change this anytime in settings
      </motion.p>

      {/* Navigation */}
      <div className="flex gap-4 pb-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!selectedFaith}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
