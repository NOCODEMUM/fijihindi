"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Card from "@/components/ui/Card";
import BottomNav from "@/components/ui/BottomNav";
import { TOTAL_DIASPORA_COUNT, DIASPORA_COUNTRIES, FIJI_REGIONS } from "@/lib/constants";

const DiasporaGlobe = dynamic(
  () => import("../onboarding/components/DiasporaGlobe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[300px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

interface UserData {
  city: string;
  country: string;
  origins: string[];
}

export default function MapPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("fijihindi_user");
    if (stored) {
      setUserData(JSON.parse(stored));
    }
  }, []);

  const originNames = userData?.origins
    ?.map((id) => FIJI_REGIONS.find((r) => r.id === id)?.name)
    .filter(Boolean) || [];

  // Group diaspora by country
  const countryCounts = DIASPORA_COUNTRIES.reduce((acc, loc) => {
    if (!acc[loc.country]) {
      acc[loc.country] = 0;
    }
    acc[loc.country] += loc.count;
    return acc;
  }, {} as Record<string, number>);

  const sortedCountries = Object.entries(countryCounts)
    .sort((a, b) => b[1] - a[1]);

  return (
    <main className="min-h-screen bg-coconut dark:bg-background-dark pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center gap-4">
          <button
            onClick={() => router.back()}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
            <svg className="w-5 h-5 text-gray-600 dark:text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <h1 className="text-lg font-heading font-bold text-charcoal dark:text-white">
            Fiji Indian Diaspora
          </h1>
        </div>
      </motion.header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Globe */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="relative h-[300px]">
              <DiasporaGlobe showStats={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent pointer-events-none" />
            </div>
            <div className="p-4 border-t border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    Fiji Indians Worldwide
                  </p>
                  <p className="text-2xl font-bold text-primary">
                    {TOTAL_DIASPORA_COUNT.toLocaleString()}+
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    Your Location
                  </p>
                  <p className="font-medium text-charcoal dark:text-white">
                    📍 {userData?.city || "Unknown"}, {userData?.country || ""}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* User's Connection */}
        {originNames.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card variant="glass" className="p-4">
              <div className="flex items-center gap-3">
                <div className="text-3xl">🇫🇯</div>
                <div>
                  <p className="font-medium text-charcoal dark:text-white">
                    Your Family Origins
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {originNames.join(", ")}, Fiji
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Diaspora by Country */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            Diaspora by Country
          </h2>
          <Card variant="default" className="divide-y divide-gray-100 dark:divide-gray-800">
            {sortedCountries.map(([country, count], index) => {
              const countryFlag = getCountryFlag(country);
              const isUserCountry = userData?.country === country;

              return (
                <motion.div
                  key={country}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 + index * 0.05 }}
                  className={`px-4 py-3 flex items-center justify-between ${
                    isUserCountry ? "bg-primary/5" : ""
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{countryFlag}</span>
                    <div>
                      <p className="font-medium text-charcoal dark:text-white">
                        {country}
                        {isUserCountry && (
                          <span className="ml-2 text-xs text-primary">(You&apos;re here!)</span>
                        )}
                      </p>
                    </div>
                  </div>
                  <span className="text-gray-500 dark:text-gray-400">
                    {count.toLocaleString()}
                  </span>
                </motion.div>
              );
            })}
          </Card>
        </motion.div>

        {/* Major Cities */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            Major Cities
          </h2>
          <div className="flex flex-wrap gap-2">
            {DIASPORA_COUNTRIES.slice(0, 8).map((loc) => {
              const isUserCity = userData?.city === loc.city;
              return (
                <motion.div
                  key={`${loc.city}-${loc.country}`}
                  whileHover={{ scale: 1.05 }}
                  className={`
                    px-3 py-2 rounded-xl text-sm
                    ${isUserCity
                      ? "bg-primary text-white"
                      : "bg-white dark:bg-gray-800 text-charcoal dark:text-white border border-gray-100 dark:border-gray-700"
                    }
                  `}
                >
                  {loc.city}
                </motion.div>
              );
            })}
          </div>
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}

function getCountryFlag(country: string): string {
  const flags: Record<string, string> = {
    "Australia": "🇦🇺",
    "New Zealand": "🇳🇿",
    "United States": "🇺🇸",
    "Canada": "🇨🇦",
    "United Kingdom": "🇬🇧",
    "India": "🇮🇳",
    "United Arab Emirates": "🇦🇪",
  };
  return flags[country] || "🌍";
}
