"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { FIJI_REGIONS, TOTAL_DIASPORA_COUNT } from "@/lib/constants";

// Dynamically import the globe to avoid SSR issues
const DiasporaGlobe = dynamic(() => import("./DiasporaGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-secondary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface CompleteStepProps {
  onComplete: () => void;
  userData: {
    city: string;
    country: string;
    origin: string;
  };
}

export default function CompleteStep({ onComplete, userData }: CompleteStepProps) {
  const [showGlobe, setShowGlobe] = useState(false);
  const originName = FIJI_REGIONS.find((r) => r.id === userData.origin)?.name || "Fiji";

  useEffect(() => {
    const timer = setTimeout(() => setShowGlobe(true), 500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[80vh]"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4 px-4"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 200, delay: 0.2 }}
          className="text-5xl mb-4"
        >
          🎉
        </motion.div>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Welcome to the family!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          You&apos;ve been added to the global Fiji Indian diaspora map
        </p>
      </motion.div>

      {/* User info card */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20"
      >
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-full bg-primary/20 flex items-center justify-center">
            <span className="text-2xl">📍</span>
          </div>
          <div>
            <div className="font-medium text-charcoal dark:text-white">
              {userData.city}, {userData.country}
            </div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              Family from {originName}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Globe visualization */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex-1 min-h-[400px] -mx-4"
      >
        {showGlobe && <DiasporaGlobe showStats={true} />}
      </motion.div>

      {/* Stats summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-4 py-4 text-center"
      >
        <p className="text-lg text-charcoal dark:text-white mb-1">
          Join{" "}
          <span className="font-bold text-primary">
            {(TOTAL_DIASPORA_COUNT + 1).toLocaleString()}
          </span>{" "}
          Fiji Indians worldwide
        </p>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Explore your family tree and learn Fiji Hindi
        </p>
      </motion.div>

      {/* CTA */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.2 }}
        className="px-4 pb-6"
      >
        <Button size="lg" onClick={onComplete} className="w-full">
          Start Building Your Family Tree
        </Button>
      </motion.div>
    </motion.div>
  );
}
