"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import { FIJI_REGIONS } from "@/lib/constants";

interface OriginStepProps {
  onNext: (origins: string[]) => void;
  onBack: () => void;
  initialOrigins?: string[];
}

// Map Fiji regions to approximate positions on the SVG map
// Based on actual lat/lng relative positions
const REGION_POSITIONS: Record<string, { x: number; y: number; island: "viti" | "vanua" | "other" }> = {
  ba: { x: 28, y: 45, island: "viti" },
  lautoka: { x: 25, y: 52, island: "viti" },
  nadi: { x: 22, y: 58, island: "viti" },
  suva: { x: 55, y: 62, island: "viti" },
  sigatoka: { x: 35, y: 68, island: "viti" },
  tavua: { x: 35, y: 42, island: "viti" },
  rakiraki: { x: 48, y: 38, island: "viti" },
  navua: { x: 48, y: 70, island: "viti" },
  labasa: { x: 75, y: 25, island: "vanua" },
  savusavu: { x: 82, y: 35, island: "vanua" },
  levuka: { x: 68, y: 55, island: "other" },
  other: { x: 90, y: 70, island: "other" },
};

export default function OriginStep({
  onNext,
  onBack,
  initialOrigins = [],
}: OriginStepProps) {
  const [selectedOrigins, setSelectedOrigins] = useState<string[]>(initialOrigins);

  const toggleOrigin = (regionId: string) => {
    setSelectedOrigins((prev) => {
      if (prev.includes(regionId)) {
        return prev.filter((id) => id !== regionId);
      } else {
        // If selecting "other", just add it
        // If selecting a specific region, remove "other" if selected
        if (regionId === "other") {
          return [...prev, regionId];
        } else {
          return [...prev.filter((id) => id !== "other"), regionId];
        }
      }
    });
  };

  const handleSubmit = () => {
    if (selectedOrigins.length === 0) return;
    onNext(selectedOrigins);
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
        className="text-center mb-6"
      >
        <span className="text-4xl mb-4 block">🇫🇯</span>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          Family Origins
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          Where in Fiji is your family from?
        </p>
        <p className="text-sm text-primary mt-1">
          Select all that apply
        </p>
      </motion.div>

      {/* Interactive Fiji Map */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.2 }}
        className="relative w-full h-48 mb-6 rounded-2xl bg-gradient-to-br from-lagoon/10 via-secondary/5 to-accent/10 overflow-hidden border border-lagoon/20"
      >
        {/* Ocean background pattern */}
        <div className="absolute inset-0 opacity-20">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="waves" x="0" y="0" width="40" height="20" patternUnits="userSpaceOnUse">
                <path d="M0 10 Q10 5 20 10 T40 10" stroke="currentColor" strokeWidth="0.5" fill="none" className="text-lagoon" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#waves)" />
          </svg>
        </div>

        {/* SVG Map of Fiji */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-2">
          {/* Viti Levu (main island) */}
          <ellipse
            cx="38"
            cy="55"
            rx="22"
            ry="18"
            className="fill-sand/60 stroke-lagoon/40"
            strokeWidth="0.5"
          />

          {/* Vanua Levu (second island) */}
          <ellipse
            cx="78"
            cy="28"
            rx="16"
            ry="10"
            className="fill-sand/60 stroke-lagoon/40"
            strokeWidth="0.5"
          />

          {/* Ovalau (Levuka) */}
          <circle
            cx="65"
            cy="55"
            r="4"
            className="fill-sand/60 stroke-lagoon/40"
            strokeWidth="0.5"
          />

          {/* Small islands */}
          <circle cx="50" cy="75" r="2" className="fill-sand/40" />
          <circle cx="88" cy="45" r="2" className="fill-sand/40" />
          <circle cx="55" cy="42" r="1.5" className="fill-sand/40" />

          {/* Region markers */}
          {FIJI_REGIONS.filter(r => r.id !== "other").map((region) => {
            const pos = REGION_POSITIONS[region.id];
            if (!pos) return null;
            const isSelected = selectedOrigins.includes(region.id);

            return (
              <g key={region.id}>
                {/* Pulse effect for selected */}
                {isSelected && (
                  <circle
                    cx={pos.x}
                    cy={pos.y}
                    r="5"
                    className="fill-primary/30 animate-ping"
                  />
                )}
                {/* Main marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? "3.5" : "2.5"}
                  className={`cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? "fill-primary stroke-white stroke-1"
                      : "fill-lagoon/60 hover:fill-lagoon stroke-white/50 stroke-[0.5]"
                  }`}
                  onClick={() => toggleOrigin(region.id)}
                />
                {/* Label for selected regions */}
                {isSelected && (
                  <text
                    x={pos.x}
                    y={pos.y - 6}
                    textAnchor="middle"
                    className="fill-charcoal dark:fill-white text-[4px] font-medium"
                  >
                    {region.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-lagoon/60"></span>
            Tap to select
          </span>
        </div>

        {/* Selected count */}
        {selectedOrigins.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 bg-primary text-white text-xs px-2 py-1 rounded-full font-medium"
          >
            {selectedOrigins.length} selected
          </motion.div>
        )}
      </motion.div>

      {/* Region selection grid */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="grid grid-cols-3 gap-2 mb-6"
      >
        {FIJI_REGIONS.map((region, index) => {
          const isSelected = selectedOrigins.includes(region.id);
          return (
            <motion.button
              key={region.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + index * 0.03 }}
              onClick={() => toggleOrigin(region.id)}
              className={`
                p-3 rounded-xl border-2 transition-all duration-200 text-center relative
                ${
                  isSelected
                    ? "border-primary bg-primary/10 shadow-md shadow-primary/20"
                    : "border-gray-200 dark:border-gray-700 hover:border-primary/50"
                }
              `}
            >
              {/* Checkmark for selected */}
              {isSelected && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="white"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </motion.div>
              )}
              <div
                className={`text-sm font-medium ${
                  isSelected
                    ? "text-primary"
                    : "text-charcoal dark:text-white"
                }`}
              >
                {region.name}
              </div>
            </motion.button>
          );
        })}
      </motion.div>

      {/* Skip option */}
      <motion.button
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        onClick={() => onNext(["other"])}
        className="text-sm text-gray-500 dark:text-gray-400 hover:text-primary mb-6 underline"
      >
        I&apos;m not sure / Skip this step
      </motion.button>

      {/* Navigation */}
      <div className="mt-auto flex gap-4">
        <Button variant="ghost" onClick={onBack} className="flex-1">
          Back
        </Button>
        <Button
          onClick={handleSubmit}
          disabled={selectedOrigins.length === 0}
          className="flex-1"
        >
          Continue {selectedOrigins.length > 0 && `(${selectedOrigins.length})`}
        </Button>
      </div>
    </motion.div>
  );
}
