"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";

interface WelcomeStepProps {
  onNext: () => void;
}

export default function WelcomeStep({ onNext }: WelcomeStepProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[85vh] px-4 bg-coconut"
    >
      {/* Logo area */}
      <div className="pt-8 pb-4 text-center">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex justify-center mb-2"
        >
          <Image
            src="/logo.webp"
            alt="Fiji Hindi"
            width={180}
            height={60}
            className="h-12 w-auto"
            priority
          />
        </motion.div>
      </div>

      {/* WhatsApp-style chat conversation */}
      <div className="flex-1 py-6 space-y-4 max-w-sm mx-auto w-full">
        {/* Aunty's message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.5 }}
          className="flex items-end gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-papaya-100 flex items-center justify-center text-sm flex-shrink-0">
            👵
          </div>
          <div className="chat-bubble-received px-4 py-3 max-w-[80%]">
            <p className="text-charcoal text-[15px]">
              Arre beta! You want to learn Fiji Hindi?
            </p>
          </div>
        </motion.div>

        {/* Aunty's second message */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.9 }}
          className="flex items-end gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-papaya-100 flex items-center justify-center text-sm flex-shrink-0">
            👵
          </div>
          <div className="chat-bubble-received px-4 py-3 max-w-[80%]">
            <p className="text-charcoal text-[15px]">
              Come, sit. I&apos;ll teach you how we talk back home. No pressure - just like chatting over chai. ☕
            </p>
          </div>
        </motion.div>

        {/* User's response */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.3 }}
          className="flex justify-end"
        >
          <div className="chat-bubble-sent px-4 py-3 max-w-[80%]">
            <p className="text-charcoal text-[15px]">
              Thik hai, Aunty! 🙏
            </p>
          </div>
        </motion.div>

        {/* Aunty's response */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 1.7 }}
          className="flex items-end gap-2"
        >
          <div className="w-8 h-8 rounded-full bg-papaya-100 flex items-center justify-center text-sm flex-shrink-0">
            👵
          </div>
          <div className="chat-bubble-received px-4 py-3 max-w-[80%]">
            <p className="text-charcoal text-[15px]">
              First, tell me where you&apos;re living now. We&apos;ll add you to the map of Fiji Indians around the world! 🌏
            </p>
          </div>
        </motion.div>
      </div>

      {/* Decorative elements */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1 }}
        className="absolute top-20 right-4 text-3xl animate-float"
      >
        🌴
      </motion.div>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
        className="absolute top-40 left-4 text-2xl animate-float"
        style={{ animationDelay: "1s" }}
      >
        🥭
      </motion.div>

      {/* CTA Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2 }}
        className="py-6 safe-area-bottom"
      >
        <Button size="lg" fullWidth onClick={onNext}>
          Let&apos;s Go!
        </Button>
        <p className="text-center text-xs text-charcoal/50 mt-3">
          No signup needed • Takes 2 minutes
        </p>
      </motion.div>
    </motion.div>
  );
}
