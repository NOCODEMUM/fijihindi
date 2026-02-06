"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";

const DiasporaGlobe = dynamic(() => import("./DiasporaGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  ),
});

interface DiasporaStepProps {
  onNext: (data: { city: string; country: string; lat: number; lng: number }) => void;
  onBack: () => void;
}

export default function DiasporaStep({ onNext, onBack }: DiasporaStepProps) {
  const [userLocation, setUserLocation] = useState<{
    city: string;
    country: string;
    lat: number;
    lng: number;
  } | null>(null);

  // Auto-detect user location
  useEffect(() => {
    const detectLocation = async () => {
      try {
        const res = await fetch("https://ipapi.co/json/");
        const data = await res.json();
        setUserLocation({
          city: data.city || "Unknown",
          country: data.country_name || "Unknown",
          lat: data.latitude || 0,
          lng: data.longitude || 0,
        });
      } catch {
        setUserLocation({
          city: "Sydney",
          country: "Australia",
          lat: -33.8688,
          lng: 151.2093,
        });
      }
    };
    detectLocation();
  }, []);

  const handleContinue = () => {
    if (userLocation) {
      onNext(userLocation);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="flex flex-col h-screen bg-background-light dark:bg-background-dark overflow-hidden"
    >
      {/* Header - Compact */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="text-center pt-4 pb-2 px-4 flex-shrink-0"
      >
        <span className="text-3xl mb-1 block">🎉</span>
        <h2 className="text-xl font-heading font-bold text-charcoal dark:text-white">
          Welcome to the family!
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-xs mt-0.5">
          You&apos;ve been added to the global Fiji Indian diaspora map
        </p>
      </motion.div>

      {/* User Location Card - Compact */}
      {userLocation && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mx-4 mb-2 flex-shrink-0"
        >
          <div className="bg-gray-50 dark:bg-gray-800/50 rounded-xl p-3 flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center">
              <span className="text-primary text-sm">📍</span>
            </div>
            <div>
              <p className="font-semibold text-charcoal dark:text-white text-sm">
                {userLocation.city}, {userLocation.country}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                Family from Other / Not Sure
              </p>
            </div>
          </div>
        </motion.div>
      )}

      {/* MASSIVE Globe - Takes most of screen */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.5, duration: 0.6 }}
        className="flex-1 relative overflow-hidden"
        style={{ minHeight: '45vh' }}
      >
        <DiasporaGlobe showStats={true} className="absolute inset-0" />
      </motion.div>

      {/* Bottom Section - Compact */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1 }}
        className="px-4 pb-4 pt-2 flex-shrink-0"
      >
        <p className="text-center text-sm text-gray-500 dark:text-gray-400 mb-3">
          Explore your family tree and learn Fiji Hindi
        </p>

        {/* Navigation */}
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onBack} className="flex-1 py-3">
            Back
          </Button>
          <Button
            onClick={handleContinue}
            disabled={!userLocation}
            className="flex-1 py-3"
          >
            Continue
          </Button>
        </div>
      </motion.div>
    </motion.div>
  );
}
