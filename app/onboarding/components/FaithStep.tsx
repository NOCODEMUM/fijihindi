"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronLeft } from "lucide-react";
import Button from "@/components/ui/Button";
import { FAITH_OPTIONS } from "@/lib/constants";

interface FaithStepProps {
  onNext: (faith: string) => void;
  onBack: () => void;
  initialFaith?: string;
}

export default function FaithStep({
  onNext,
  onBack,
  initialFaith = "",
}: FaithStepProps) {
  const [selectedFaith, setSelectedFaith] = useState(initialFaith);

  const handleSubmit = () => {
    if (selectedFaith) {
      onNext(selectedFaith);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-[85vh] px-4 pt-8"
    >
      {/* Back button */}
      <button
        onClick={onBack}
        className="flex items-center gap-1 text-charcoal/60 hover:text-charcoal mb-6 transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        <span className="text-sm">Back</span>
      </button>

      {/* Aunty message */}
      <div className="mb-6">
        <div className="flex items-end gap-2">
          <div className="w-8 h-8 rounded-full bg-papaya-100 flex items-center justify-center text-sm flex-shrink-0">
            👵
          </div>
          <div className="chat-bubble-received px-4 py-3 max-w-[85%]">
            <p className="text-charcoal text-[15px]">
              Acha, now tell me about your family&apos;s faith. Different families use different words, na? 🙏
            </p>
          </div>
        </div>
      </div>

      {/* Faith options */}
      <div className="flex-1">
        <div className="space-y-3">
          {FAITH_OPTIONS.map((faith, index) => (
            <motion.button
              key={faith.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + index * 0.05 }}
              onClick={() => setSelectedFaith(faith.id)}
              className={`w-full p-4 rounded-2xl text-left transition-all ${
                selectedFaith === faith.id
                  ? "bg-lagoon text-white shadow-lg shadow-lagoon/20"
                  : "bg-white hover:bg-sand-100 border border-sand-200"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{faith.emoji}</span>
                <div className="flex-1">
                  <div
                    className={`font-semibold ${
                      selectedFaith === faith.id
                        ? "text-white"
                        : "text-charcoal"
                    }`}
                  >
                    {faith.name}
                  </div>
                  <div
                    className={`text-sm ${
                      selectedFaith === faith.id
                        ? "text-white/80"
                        : "text-charcoal/60"
                    }`}
                  >
                    {faith.description}
                  </div>
                </div>
                {selectedFaith === faith.id && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center"
                  >
                    <svg
                      className="w-4 h-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 13l4 4L19 7"
                      />
                    </svg>
                  </motion.div>
                )}
              </div>
            </motion.button>
          ))}
        </div>

        {/* Note about terms */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="text-center text-xs text-charcoal/50 mt-4"
        >
          This helps us show the right family terms for your background
        </motion.p>
      </div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="py-6 safe-area-bottom"
      >
        <Button
          size="lg"
          fullWidth
          onClick={handleSubmit}
          disabled={!selectedFaith}
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
