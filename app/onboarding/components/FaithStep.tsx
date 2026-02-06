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
    description: "Traditional Hindi terms",
  },
  {
    id: "muslim",
    label: "Muslim",
    emoji: "☪️",
    description: "Urdu-influenced terms",
  },
  {
    id: "christian",
    label: "Christian",
    emoji: "✝️",
    description: "Mix of Hindi & English terms",
  },
  {
    id: "sikh",
    label: "Sikh",
    emoji: "🙏",
    description: "Punjabi-influenced terms",
  },
  {
    id: "other",
    label: "Other / Prefer not to say",
    emoji: "🌍",
    description: "General Fiji Hindi terms",
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
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark px-4"
    >
      {/* Back button */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={onBack}
        className="flex items-center gap-1 text-gray-600 dark:text-gray-400 pt-6 pb-4 self-start"
      >
        <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
        </svg>
        <span>Back</span>
      </motion.button>

      {/* Aunty chat bubble */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex items-start gap-3 mb-6"
      >
        <div className="w-10 h-10 rounded-full bg-peach/30 flex items-center justify-center flex-shrink-0">
          <span className="text-xl">👵</span>
        </div>
        <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm border border-gray-100 dark:border-gray-700">
          <p className="text-charcoal dark:text-white">
            Acha, now tell me about your family&apos;s faith. Different families use different words, na? 🙏
          </p>
        </div>
      </motion.div>

      {/* Faith Options */}
      <div className="flex-1 space-y-3">
        {FAITH_OPTIONS.map((faith, index) => (
          <motion.button
            key={faith.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => setSelectedFaith(faith.id)}
            className={`w-full p-4 rounded-2xl text-left transition-all flex items-center gap-4 ${
              selectedFaith === faith.id
                ? "bg-primary/10 border-2 border-primary"
                : "bg-white dark:bg-gray-800 border-2 border-gray-100 dark:border-gray-700"
            }`}
          >
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
              selectedFaith === faith.id ? "bg-primary/20" : "bg-gray-50 dark:bg-gray-700"
            }`}>
              <span className="text-2xl">{faith.emoji}</span>
            </div>
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
          </motion.button>
        ))}
      </div>

      {/* Helper text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="text-sm text-gray-400 text-center mt-4 mb-4"
      >
        This helps us show the right family terms for your background
      </motion.p>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="pb-6"
      >
        <Button
          onClick={handleContinue}
          disabled={!selectedFaith}
          size="lg"
          fullWidth
          className="py-4 rounded-2xl"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
