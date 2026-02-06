"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import { DIASPORA_COUNTRIES, TOTAL_DIASPORA_COUNT } from "@/lib/constants";

const DiasporaGlobe = dynamic(() => import("./DiasporaGlobe"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-[400px] flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
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
  const [showGlobe, setShowGlobe] = useState(false);
  const [showStats, setShowStats] = useState(false);
  const [showLocation, setShowLocation] = useState(false);

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
        // Default to Sydney if detection fails
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

  // Staggered animation sequence
  useEffect(() => {
    const timer1 = setTimeout(() => setShowGlobe(true), 500);
    const timer2 = setTimeout(() => setShowStats(true), 1500);
    const timer3 = setTimeout(() => setShowLocation(true), 2500);

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  }, []);

  // Find closest diaspora city
  const closestCity = userLocation
    ? DIASPORA_COUNTRIES.reduce((closest, city) => {
        const dist = Math.sqrt(
          Math.pow(city.lat - userLocation.lat, 2) +
            Math.pow(city.lng - userLocation.lng, 2)
        );
        const closestDist = Math.sqrt(
          Math.pow(closest.lat - userLocation.lat, 2) +
            Math.pow(closest.lng - userLocation.lng, 2)
        );
        return dist < closestDist ? city : closest;
      }, DIASPORA_COUNTRIES[0])
    : null;

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
      className="flex flex-col min-h-[85vh] px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-4"
      >
        <span className="text-3xl mb-2 block">🌏</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white">
          You&apos;re Not Alone
        </h2>
        <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
          Fiji Indians are everywhere
        </p>
      </motion.div>

      {/* Globe Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: showGlobe ? 1 : 0, scale: showGlobe ? 1 : 0.9 }}
        transition={{ duration: 0.8 }}
        className="relative flex-1 min-h-[350px] -mx-4"
      >
        <DiasporaGlobe showStats={false} className="h-full" />

        {/* Stats Overlay */}
        {showStats && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute top-4 left-4 right-4 flex justify-between"
          >
            <div className="glass-card rounded-xl px-4 py-2">
              <p className="text-xs text-charcoal/60">Fiji Indians worldwide</p>
              <p className="text-xl font-bold text-primary">
                {TOTAL_DIASPORA_COUNT.toLocaleString()}+
              </p>
            </div>
            <div className="glass-card rounded-xl px-4 py-2">
              <p className="text-xs text-charcoal/60">Countries</p>
              <p className="text-xl font-bold text-lagoon">50+</p>
            </div>
          </motion.div>
        )}

        {/* User Location Badge */}
        {showLocation && userLocation && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bottom-4 left-4 right-4"
          >
            <div className="glass-card rounded-xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
                  <span className="text-xl">📍</span>
                </div>
                <div className="flex-1">
                  <p className="text-sm text-charcoal/60">You&apos;re in</p>
                  <p className="font-bold text-charcoal">
                    {userLocation.city}, {userLocation.country}
                  </p>
                </div>
                {closestCity && (
                  <div className="text-right">
                    <p className="text-xs text-charcoal/60">Nearby community</p>
                    <p className="text-sm font-medium text-primary">
                      {closestCity.count.toLocaleString()} people
                    </p>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </motion.div>

      {/* Message */}
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: showLocation ? 1 : 0 }}
        transition={{ delay: 0.3 }}
        className="text-center text-sm text-charcoal/70 my-4"
      >
        Now let&apos;s trace your roots back to Fiji...
      </motion.p>

      {/* Navigation */}
      <div className="flex gap-4 mt-auto pb-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleContinue}
          disabled={!userLocation}
          className="flex-1"
        >
          Continue to Fiji
        </Button>
      </div>
    </motion.div>
  );
}
