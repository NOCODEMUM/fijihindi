"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FIJI_REGIONS } from "@/lib/constants";

interface OriginStepProps {
  onNext: (origin: string) => void;
  onBack: () => void;
  initialOrigin?: string;
}

export default function OriginStep({
  onNext,
  onBack,
  initialOrigin = "",
}: OriginStepProps) {
  const [selectedOrigin, setSelectedOrigin] = useState(initialOrigin);

  const handleSubmit = () => {
    if (!selectedOrigin) return;
    onNext(selectedOrigin);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-[60vh] px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-4xl mb-4 block">🇫🇯</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Family Origins
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Where in Fiji is your family from?
        </p>
      </motion.div>

      {/* Fiji map placeholder */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full h-40 mb-6 rounded-2xl bg-gradient-to-br from-secondary/10 to-accent/10 overflow-hidden"
      >
        {/* Simple Fiji islands representation */}
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 200 100"
            className="w-full h-full p-4 opacity-30"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            {/* Viti Levu (main island) */}
            <ellipse cx="70" cy="50" rx="35" ry="25" className="fill-secondary/30" />
            {/* Vanua Levu */}
            <ellipse cx="150" cy="35" rx="25" ry="15" className="fill-secondary/30" />
            {/* Smaller islands */}
            <circle cx="100" cy="70" r="5" className="fill-secondary/30" />
            <circle cx="115" cy="55" r="4" className="fill-secondary/30" />
            <circle cx="180" cy="50" r="4" className="fill-secondary/30" />
          </svg>
        </div>

        {/* Show selected region marker */}
        {selectedOrigin && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="relative">
              <div className="w-4 h-4 bg-primary rounded-full shadow-lg" />
              <div className="absolute inset-0 w-4 h-4 bg-primary rounded-full animate-ping opacity-50" />
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Region selection grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-2 gap-3 mb-8"
      >
        {FIJI_REGIONS.map((region, index) => (
          <motion.button
            key={region.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.05 }}
            onClick={() => setSelectedOrigin(region.id)}
            className={`
              p-4 rounded-xl border-2 transition-all duration-200 text-left
              ${
                selectedOrigin === region.id
                  ? "border-primary bg-primary/10 shadow-lg shadow-primary/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
              }
            `}
          >
            <div
              className={`font-medium ${
                selectedOrigin === region.id
                  ? "text-primary"
                  : "text-charcoal dark:text-white"
              }`}
            >
              {region.name}
            </div>
            {region.id !== "other" && (
              <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                Fiji
              </div>
            )}
          </motion.button>
        ))}
      </motion.div>

      {/* Skip option */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => onNext("other")}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-6 underline"
      >
        I&apos;m not sure / Skip this step
      </motion.button>

      {/* Navigation */}
      <div className="mt-auto flex gap-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!selectedOrigin}
          className="flex-1"
        >
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
