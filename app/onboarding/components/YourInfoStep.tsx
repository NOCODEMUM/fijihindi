"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { DIASPORA_COUNTRIES } from "@/lib/constants";

interface YourInfoStepProps {
  onNext: (data: { name: string; city: string; country: string; lat: number; lng: number }) => void;
  onBack: () => void;
  initialName?: string;
  initialCity?: string;
  initialCountry?: string;
}

export default function YourInfoStep({
  onNext,
  onBack,
  initialName = "",
  initialCity = "",
  initialCountry = "",
}: YourInfoStepProps) {
  const [name, setName] = useState(initialName);
  const [city, setCity] = useState(initialCity);
  const [country, setCountry] = useState(initialCountry);
  const [isDetecting, setIsDetecting] = useState(false);
  const [detectedLocation, setDetectedLocation] = useState<{
    city: string;
    country: string;
    lat: number;
    lng: number;
  } | null>(null);

  // Auto-detect location on mount
  useEffect(() => {
    if (!initialCity && !initialCountry) {
      detectLocation();
    }
  }, [initialCity, initialCountry]);

  const detectLocation = async () => {
    setIsDetecting(true);
    try {
      // Try to get location from IP
      const response = await fetch("https://ipapi.co/json/");
      if (response.ok) {
        const data = await response.json();
        setDetectedLocation({
          city: data.city || "",
          country: data.country_name || "",
          lat: data.latitude || 0,
          lng: data.longitude || 0,
        });
        setCity(data.city || "");
        setCountry(data.country_name || "");
      }
    } catch {
      console.log("Could not detect location");
    }
    setIsDetecting(false);
  };

  const handleSubmit = () => {
    if (!name.trim()) return;

    // Find coordinates from diaspora countries if available
    const location = DIASPORA_COUNTRIES.find(
      (loc) => loc.city.toLowerCase() === city.toLowerCase()
    );

    onNext({
      name: name.trim(),
      city: city.trim(),
      country: country.trim(),
      lat: detectedLocation?.lat || location?.lat || 0,
      lng: detectedLocation?.lng || location?.lng || 0,
    });
  };

  const popularCities = [
    { city: "Sydney", country: "Australia" },
    { city: "Auckland", country: "New Zealand" },
    { city: "Melbourne", country: "Australia" },
    { city: "Vancouver", country: "Canada" },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col min-h-[70vh] px-4"
    >
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <span className="text-4xl mb-4 block">👋</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Tell us about yourself
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          So Nani knows who she&apos;s talking to!
        </p>
      </motion.div>

      {/* Name Input */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
          Your Name
        </label>
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="What should Nani call you?"
          autoFocus
        />
      </motion.div>

      {/* Location Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-6"
      >
        <div className="flex items-center justify-between mb-2">
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Where do you live?
          </label>
          {isDetecting && (
            <span className="text-xs text-primary animate-pulse">
              Detecting...
            </span>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 mb-3">
          <Input
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="City"
          />
          <Input
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            placeholder="Country"
          />
        </div>

        {/* Quick select buttons */}
        <div className="flex flex-wrap gap-2">
          {popularCities.map((loc) => (
            <motion.button
              key={`${loc.city}-${loc.country}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => {
                setCity(loc.city);
                setCountry(loc.country);
                const found = DIASPORA_COUNTRIES.find(
                  (d) => d.city === loc.city
                );
                if (found) {
                  setDetectedLocation({
                    city: found.city,
                    country: found.country,
                    lat: found.lat,
                    lng: found.lng,
                  });
                }
              }}
              className={`
                px-3 py-1.5 rounded-full text-sm transition-all
                ${
                  city === loc.city && country === loc.country
                    ? "bg-primary text-white"
                    : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                }
              `}
            >
              {loc.city}
            </motion.button>
          ))}
        </div>
      </motion.div>

      {/* Spacer */}
      <div className="flex-1" />

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4 mt-auto"
      >
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={!name.trim()}
          className="flex-1"
        >
          Continue
        </Button>
      </motion.div>
    </motion.div>
  );
}
