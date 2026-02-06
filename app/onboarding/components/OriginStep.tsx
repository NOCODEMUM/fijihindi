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

// Map Fiji regions to positions on the SVG map
// Coordinates match the detailed island paths below
const REGION_POSITIONS: Record<string, { x: number; y: number; island: "viti" | "vanua" | "other" }> = {
  ba: { x: 22, y: 52, island: "viti" },
  lautoka: { x: 18, y: 58, island: "viti" },
  nadi: { x: 14, y: 65, island: "viti" },
  suva: { x: 48, y: 68, island: "viti" },
  sigatoka: { x: 28, y: 72, island: "viti" },
  tavua: { x: 28, y: 48, island: "viti" },
  rakiraki: { x: 42, y: 45, island: "viti" },
  navua: { x: 40, y: 74, island: "viti" },
  labasa: { x: 72, y: 28, island: "vanua" },
  savusavu: { x: 82, y: 35, island: "vanua" },
  levuka: { x: 62, y: 58, island: "other" },
  other: { x: 88, y: 75, island: "other" },
};

// SVG paths for more realistic Fiji island shapes
const VITI_LEVU_PATH = "M8,58 C6,54 8,48 14,44 C20,40 28,38 36,40 C44,42 50,46 52,52 C54,58 52,66 48,72 C44,78 36,80 28,78 C20,76 12,72 10,66 C8,62 8,60 8,58 Z";
const VANUA_LEVU_PATH = "M62,32 C64,28 70,24 78,24 C86,24 92,28 94,32 C96,36 94,40 88,42 C82,44 74,44 68,42 C62,40 60,36 62,32 Z";
const TAVEUNI_PATH = "M92,38 C94,36 96,38 96,42 C96,46 94,48 92,46 C90,44 90,40 92,38 Z";
const OVALAU_PATH = "M58,56 C60,54 64,54 66,56 C68,58 68,62 66,64 C64,66 60,66 58,64 C56,62 56,58 58,56 Z";
const KADAVU_PATH = "M30,86 C34,84 40,84 44,86 C48,88 46,90 42,90 C38,90 32,90 30,88 C28,86 28,86 30,86 Z";

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
        className="relative w-full h-56 mb-6 rounded-2xl overflow-hidden border border-primary/20"
        style={{ background: 'linear-gradient(180deg, #E0F7F6 0%, #B8E8E6 50%, #20B2AA40 100%)' }}
      >
        {/* Ocean wave pattern */}
        <div className="absolute inset-0 opacity-30">
          <svg width="100%" height="100%">
            <defs>
              <pattern id="ocean-waves" x="0" y="0" width="60" height="12" patternUnits="userSpaceOnUse">
                <path d="M0 6 Q15 2 30 6 T60 6" stroke="#20B2AA" strokeWidth="0.8" fill="none" opacity="0.5" />
                <path d="M0 10 Q15 6 30 10 T60 10" stroke="#20B2AA" strokeWidth="0.5" fill="none" opacity="0.3" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#ocean-waves)" />
          </svg>
        </div>

        {/* SVG Map of Fiji */}
        <svg viewBox="0 0 100 100" className="absolute inset-0 w-full h-full p-1">
          <defs>
            {/* Island gradient fill */}
            <linearGradient id="island-fill" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#F8F3E3" />
              <stop offset="50%" stopColor="#E8DFC8" />
              <stop offset="100%" stopColor="#D4CDB8" />
            </linearGradient>
            {/* Subtle shadow for depth */}
            <filter id="island-shadow" x="-20%" y="-20%" width="140%" height="140%">
              <feDropShadow dx="0.5" dy="0.5" stdDeviation="1" floodColor="#2C3E50" floodOpacity="0.15"/>
            </filter>
          </defs>

          {/* Viti Levu - Main Island */}
          <path
            d={VITI_LEVU_PATH}
            fill="url(#island-fill)"
            stroke="#20B2AA"
            strokeWidth="0.8"
            filter="url(#island-shadow)"
          />

          {/* Vanua Levu - Second Island */}
          <path
            d={VANUA_LEVU_PATH}
            fill="url(#island-fill)"
            stroke="#20B2AA"
            strokeWidth="0.8"
            filter="url(#island-shadow)"
          />

          {/* Taveuni */}
          <path
            d={TAVEUNI_PATH}
            fill="url(#island-fill)"
            stroke="#20B2AA"
            strokeWidth="0.5"
            filter="url(#island-shadow)"
          />

          {/* Ovalau (Levuka) */}
          <path
            d={OVALAU_PATH}
            fill="url(#island-fill)"
            stroke="#20B2AA"
            strokeWidth="0.5"
            filter="url(#island-shadow)"
          />

          {/* Kadavu */}
          <path
            d={KADAVU_PATH}
            fill="url(#island-fill)"
            stroke="#20B2AA"
            strokeWidth="0.5"
            filter="url(#island-shadow)"
          />

          {/* Small islands */}
          <circle cx="56" cy="48" r="1.5" fill="#F8F3E3" stroke="#20B2AA" strokeWidth="0.3" />
          <circle cx="70" cy="48" r="1" fill="#F8F3E3" stroke="#20B2AA" strokeWidth="0.3" />
          <circle cx="52" cy="82" r="1.2" fill="#F8F3E3" stroke="#20B2AA" strokeWidth="0.3" />

          {/* Island labels */}
          <text x="30" y="60" textAnchor="middle" fontSize="3.5" fill="#2C3E50" fontWeight="500" opacity="0.6">
            Viti Levu
          </text>
          <text x="78" y="32" textAnchor="middle" fontSize="2.8" fill="#2C3E50" fontWeight="500" opacity="0.6">
            Vanua Levu
          </text>

          {/* Region markers */}
          {FIJI_REGIONS.filter(r => r.id !== "other").map((region) => {
            const pos = REGION_POSITIONS[region.id];
            if (!pos) return null;
            const isSelected = selectedOrigins.includes(region.id);

            return (
              <g key={region.id} style={{ cursor: 'pointer' }} onClick={() => toggleOrigin(region.id)}>
                {/* Pulse effect for selected */}
                {isSelected && (
                  <>
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="5"
                      fill="#FF6B6B"
                      opacity="0.3"
                      className="animate-ping"
                    />
                    <circle
                      cx={pos.x}
                      cy={pos.y}
                      r="3"
                      fill="#FF6B6B"
                      opacity="0.2"
                    />
                  </>
                )}
                {/* Main marker */}
                <circle
                  cx={pos.x}
                  cy={pos.y}
                  r={isSelected ? "2.5" : "2"}
                  fill={isSelected ? "#FF6B6B" : "#20B2AA"}
                  stroke="white"
                  strokeWidth={isSelected ? "0.8" : "0.5"}
                  style={{ transition: 'all 0.2s ease' }}
                />
                {/* Label for selected regions */}
                {isSelected && (
                  <text
                    x={pos.x}
                    y={pos.y - 5}
                    textAnchor="middle"
                    fontSize="3"
                    fill="#2C3E50"
                    fontWeight="600"
                  >
                    {region.name}
                  </text>
                )}
              </g>
            );
          })}
        </svg>

        {/* Legend */}
        <div className="absolute bottom-2 left-2 flex items-center gap-3 text-xs">
          <span className="flex items-center gap-1 text-gray-600 bg-white/60 px-2 py-1 rounded-full">
            <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#20B2AA' }}></span>
            Tap to select
          </span>
        </div>

        {/* Selected count badge */}
        {selectedOrigins.length > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute top-2 right-2 text-white text-xs px-3 py-1 rounded-full font-medium shadow-md"
            style={{ backgroundColor: '#FF6B6B' }}
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
