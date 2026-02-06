"use client";

import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface HookStepProps {
  onNext: () => void;
}

export default function HookStep({ onNext }: HookStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center min-h-[80vh] px-6 text-center"
    >
      {/* Phone icon with animation */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
          delay: 0.2
        }}
        className="relative mb-8"
      >
        {/* Ringing effect */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute inset-0 rounded-full bg-primary/30"
          style={{ transform: "scale(1.5)" }}
        />
        <motion.div
          animate={{
            scale: [1, 1.4, 1],
            opacity: [0.3, 0, 0.3],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.2,
          }}
          className="absolute inset-0 rounded-full bg-primary/20"
          style={{ transform: "scale(2)" }}
        />
        <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-primary to-primary/80 flex items-center justify-center shadow-xl shadow-primary/30">
          <motion.span
            className="text-6xl"
            animate={{ rotate: [0, -10, 10, -10, 10, 0] }}
            transition={{
              duration: 0.5,
              repeat: Infinity,
              repeatDelay: 1.5
            }}
          >
            📞
          </motion.span>
        </div>
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="text-3xl font-heading font-bold text-charcoal dark:text-white mb-4"
      >
        Your Nani is calling...
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
        className="text-lg text-gray-600 dark:text-gray-300 mb-2 max-w-sm"
      >
        She wants to teach you the language of your ancestors.
      </motion.p>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
        className="text-base text-gray-500 dark:text-gray-400 mb-12 max-w-sm"
      >
        Learn Fiji Hindi through conversations with your grandmother.
      </motion.p>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
        className="w-full max-w-xs"
      >
        <Button
          onClick={onNext}
          size="lg"
          fullWidth
          className="bg-green-500 hover:bg-green-600 shadow-lg shadow-green-500/30"
        >
          <span className="mr-2">📱</span>
          Answer the Call
        </Button>
      </motion.div>

      {/* Footer text */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="mt-8 text-sm text-gray-400"
      >
        Join 12,000+ people reconnecting with their roots
      </motion.p>
    </motion.div>
  );
}
