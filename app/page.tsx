"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 globe-container">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative z-10 text-center max-w-md mx-auto"
      >
        {/* Logo/Icon placeholder */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="w-24 h-24 mx-auto mb-8 rounded-3xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center shadow-2xl shadow-primary/30"
        >
          <span className="text-4xl">🌴</span>
        </motion.div>

        {/* App name */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="text-4xl md:text-5xl font-heading font-bold mb-4"
        >
          <span className="gradient-text">FijiHindi</span>
        </motion.h1>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-xl md:text-2xl text-charcoal/80 dark:text-white/80 font-medium mb-2"
        >
          Hamaar Bhasha, Hamaar Kahani
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="text-sm text-gray-500 dark:text-gray-400 mb-8"
        >
          Our Language, Our Stories
        </motion.p>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="text-charcoal/70 dark:text-white/70 mb-10 leading-relaxed"
        >
          Connect with Fiji Indians worldwide. Preserve our language. Share our stories.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <Button
            size="lg"
            onClick={() => router.push("/onboarding")}
            className="w-full sm:w-auto min-w-[200px]"
          >
            Get Started
          </Button>
        </motion.div>

        {/* Stats preview */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="mt-12 flex justify-center gap-8 text-sm text-gray-500 dark:text-gray-400"
        >
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">195K+</div>
            <div>Fiji Indians</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-secondary">50+</div>
            <div>Countries</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">140+</div>
            <div>Years of History</div>
          </div>
        </motion.div>
      </motion.div>

      {/* Bottom wave decoration */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-secondary/5 to-transparent pointer-events-none" />
    </main>
  );
}
