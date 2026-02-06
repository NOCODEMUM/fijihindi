"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Image from "next/image";
import Button from "@/components/ui/Button";

export default function Home() {
  const router = useRouter();

  const handleStart = () => {
    router.push("/onboarding");
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center relative overflow-hidden bg-gradient-to-br from-coconut via-peach-50 to-lagoon-50">
      {/* Decorative blur circles */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-lagoon/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute top-1/4 right-0 w-96 h-96 bg-peach/20 rounded-full blur-3xl translate-x-1/2" />
      <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-primary/10 rounded-full blur-3xl translate-y-1/2" />

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center px-6 py-12 text-center max-w-lg">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-4"
        >
          <Image
            src="/logo.webp"
            alt="FijiHindi"
            width={240}
            height={80}
            className="object-contain"
            priority
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-lg md:text-xl text-charcoal/70 font-merriweather italic mb-8"
        >
          Hamaar Bhasha, Hamaar Kahani
        </motion.p>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-charcoal/80 mb-10 text-base md:text-lg leading-relaxed"
        >
          Learn Fiji Hindi through conversations with your Nani.
          No pressure—just chai and stories.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="w-full max-w-xs mb-12"
        >
          <Button
            onClick={handleStart}
            size="lg"
            fullWidth
            className="bg-primary hover:bg-primary-600 text-white py-4 text-lg rounded-2xl shadow-lg shadow-primary/30 transition-all hover:shadow-xl hover:scale-[1.02]"
          >
            Get Started
          </Button>
          <p className="text-center text-sm text-charcoal/50 mt-3">
            No signup needed
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="flex flex-wrap justify-center gap-6 md:gap-10 text-charcoal/60"
        >
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-primary">195K+</p>
            <p className="text-xs md:text-sm">Fiji Indians</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-lagoon">50+</p>
            <p className="text-xs md:text-sm">Countries</p>
          </div>
          <div className="text-center">
            <p className="text-2xl md:text-3xl font-bold text-accent">140+</p>
            <p className="text-xs md:text-sm">Years of History</p>
          </div>
        </motion.div>
      </div>

      {/* Bottom decorative element */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
        className="absolute bottom-6 text-center text-charcoal/40 text-sm"
      >
        🌴 Connecting the Fiji Indian diaspora worldwide
      </motion.div>
    </main>
  );
}
