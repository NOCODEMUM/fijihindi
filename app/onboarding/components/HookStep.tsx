"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Button from "@/components/ui/Button";

interface HookStepProps {
  onNext: () => void;
}

interface ChatMessage {
  id: number;
  type: "aunty" | "user";
  text: string;
  delay: number;
}

const CHAT_MESSAGES: ChatMessage[] = [
  {
    id: 1,
    type: "aunty",
    text: "Arre beta! You want to learn Fiji Hindi?",
    delay: 0.3,
  },
  {
    id: 2,
    type: "aunty",
    text: "Come, sit. I'll teach you how we talk back home. No pressure - just like chatting over chai. ☕",
    delay: 1.2,
  },
  {
    id: 3,
    type: "user",
    text: "Thik hai, Aunty! 🙏",
    delay: 2.4,
  },
  {
    id: 4,
    type: "aunty",
    text: "First, tell me where you're living now. We'll add you to the map of Fiji Indians around the world! 🌏",
    delay: 3.2,
  },
];

export default function HookStep({ onNext }: HookStepProps) {
  const [visibleMessages, setVisibleMessages] = useState<number[]>([]);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    // Show messages progressively
    CHAT_MESSAGES.forEach((msg) => {
      setTimeout(() => {
        setVisibleMessages((prev) => [...prev, msg.id]);
      }, msg.delay * 1000);
    });

    // Show button after last message
    setTimeout(() => {
      setShowButton(true);
    }, 4200);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col min-h-[85vh] px-4"
    >
      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-center pt-8 pb-6"
      >
        <Image
          src="/logo.webp"
          alt="FijiHindi"
          width={180}
          height={60}
          className="object-contain"
          priority
        />
      </motion.div>

      {/* Chat Messages */}
      <div className="flex-1 flex flex-col gap-4 pb-4">
        <AnimatePresence>
          {CHAT_MESSAGES.map((msg) => (
            visibleMessages.includes(msg.id) && (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`flex items-start gap-3 ${
                  msg.type === "user" ? "flex-row-reverse" : ""
                }`}
              >
                {/* Avatar */}
                {msg.type === "aunty" && (
                  <div className="w-10 h-10 rounded-full bg-peach/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">👵</span>
                  </div>
                )}

                {/* Message Bubble */}
                <div
                  className={`max-w-[80%] px-4 py-3 rounded-2xl ${
                    msg.type === "aunty"
                      ? "bg-white dark:bg-gray-800 rounded-tl-sm shadow-sm border border-gray-100 dark:border-gray-700"
                      : "bg-primary text-white rounded-tr-sm"
                  }`}
                >
                  <p className={`text-base leading-relaxed ${
                    msg.type === "aunty" ? "text-charcoal dark:text-white" : "text-white"
                  }`}>
                    {msg.text}
                  </p>
                </div>
              </motion.div>
            )
          ))}
        </AnimatePresence>
      </div>

      {/* CTA Button */}
      <AnimatePresence>
        {showButton && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="pb-4"
          >
            <Button
              onClick={onNext}
              size="lg"
              fullWidth
              className="py-4 text-lg rounded-2xl"
            >
              Let&apos;s Go!
            </Button>
            <p className="text-center text-sm text-gray-400 mt-3">
              No signup needed • Takes 2 minutes
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
