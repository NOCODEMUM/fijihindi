"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

interface LocationStepProps {
  onNext: (data: { city: string; country: string; lat: number; lng: number }) => void;
  onBack: () => void;
  initialCity?: string;
  initialCountry?: string;
}

// Common cities with coordinates for quick selection
const POPULAR_CITIES = [
  { city: "Sydney", country: "Australia", lat: -33.8688, lng: 151.2093 },
  { city: "Melbourne", country: "Australia", lat: -37.8136, lng: 144.9631 },
  { city: "Auckland", country: "New Zealand", lat: -36.8485, lng: 174.7633 },
  { city: "San Francisco", country: "USA", lat: 37.7749, lng: -122.4194 },
  { city: "Vancouver", country: "Canada", lat: 49.2827, lng: -123.1207 },
  { city: "London", country: "UK", lat: 51.5074, lng: -0.1278 },
];

export default function LocationStep({
  onNext,
  onBack,
  initialCity = "",
  initialCountry = "",
}: LocationStepProps) {
  const [city, setCity] = useState(initialCity);
  const [country, setCountry] = useState(initialCountry);
  const [isLocating, setIsLocating] = useState(false);
  const [error, setError] = useState("");

  const handleQuickSelect = (location: typeof POPULAR_CITIES[0]) => {
    setCity(location.city);
    setCountry(location.country);
    setError("");
  };

  const handleGetLocation = async () => {
    if (!navigator.geolocation) {
      setError("Geolocation is not supported by your browser");
      return;
    }

    setIsLocating(true);
    setError("");

    try {
      const position = await new Promise<GeolocationPosition>((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject, {
          enableHighAccuracy: true,
          timeout: 10000,
        });
      });

      // Reverse geocode using a free API
      const { latitude, longitude } = position.coords;
      const response = await fetch(
        `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
      );
      const data = await response.json();

      setCity(data.city || data.locality || "");
      setCountry(data.countryName || "");
    } catch (err) {
      console.error("Location error:", err);
      setError("Could not get your location. Please enter it manually.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSubmit = () => {
    if (!city.trim() || !country.trim()) {
      setError("Please enter your city and country");
      return;
    }

    // Find coordinates if it's a popular city, otherwise use approximate
    const popularCity = POPULAR_CITIES.find(
      (c) => c.city.toLowerCase() === city.toLowerCase()
    );

    onNext({
      city: city.trim(),
      country: country.trim(),
      lat: popularCity?.lat || 0,
      lng: popularCity?.lng || 0,
    });
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
        <span className="text-4xl mb-4 block">📍</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Your Current Location
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Help us map the Fiji Indian diaspora
        </p>
      </motion.div>

      {/* Location detection button */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2 }}
        onClick={handleGetLocation}
        disabled={isLocating}
        className="w-full py-4 mb-6 rounded-xl border-2 border-dashed border-secondary/50 bg-secondary/5 hover:bg-secondary/10 transition-colors flex items-center justify-center gap-2 text-secondary disabled:opacity-50"
      >
        {isLocating ? (
          <>
            <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
                fill="none"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              />
            </svg>
            Detecting location...
          </>
        ) : (
          <>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
              />
            </svg>
            Use My Location
          </>
        )}
      </motion.button>

      <div className="text-center text-gray-400 text-sm mb-6">or enter manually</div>

      {/* Manual input */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="space-y-4 mb-6"
      >
        <Input
          label="City"
          placeholder="e.g., Sydney"
          value={city}
          onChange={(e) => {
            setCity(e.target.value);
            setError("");
          }}
        />
        <Input
          label="Country"
          placeholder="e.g., Australia"
          value={country}
          onChange={(e) => {
            setCountry(e.target.value);
            setError("");
          }}
        />
      </motion.div>

      {/* Quick select */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4 }}
        className="mb-8"
      >
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
          Popular locations:
        </p>
        <div className="flex flex-wrap gap-2">
          {POPULAR_CITIES.map((loc) => (
            <button
              key={`${loc.city}-${loc.country}`}
              onClick={() => handleQuickSelect(loc)}
              className={`px-3 py-1.5 rounded-full text-sm transition-colors ${
                city === loc.city && country === loc.country
                  ? "bg-primary text-white"
                  : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              {loc.city}
            </button>
          ))}
        </div>
      </motion.div>

      {error && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-red-500 text-sm mb-4 text-center"
        >
          {error}
        </motion.p>
      )}

      {/* Navigation */}
      <div className="mt-auto flex gap-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button onClick={handleSubmit} className="flex-1">
          Continue
        </Button>
      </div>
    </motion.div>
  );
}
