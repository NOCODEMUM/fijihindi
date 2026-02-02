"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import LessonCard from "@/components/ui/LessonCard";
import ProgressBar from "@/components/ui/ProgressBar";
import { FIJI_REGIONS, TOTAL_DIASPORA_COUNT } from "@/lib/constants";
import { speakFijiHindi } from "@/lib/audio";

const DiasporaGlobe = dynamic(
  () => import("../onboarding/components/DiasporaGlobe"),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-[250px] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    ),
  }
);

interface UserData {
  city: string;
  country: string;
  origin: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [familyCount, setFamilyCount] = useState(0);
  const [greeting, setGreeting] = useState("");
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Check if user completed onboarding
    const onboarded = localStorage.getItem("fijihindi_onboarded");
    if (!onboarded) {
      router.push("/onboarding");
      return;
    }

    // Load user data
    const stored = localStorage.getItem("fijihindi_user");
    if (stored) {
      setUserData(JSON.parse(stored));
    }

    // Load family tree count
    const familyTree = localStorage.getItem("fijihindi_family_tree");
    if (familyTree) {
      const members = JSON.parse(familyTree);
      setFamilyCount(members.length - 1); // Exclude self
    }

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning!");
    else if (hour < 17) setGreeting("Good afternoon!");
    else setGreeting("Good evening!");
  }, [router]);

  const originName =
    FIJI_REGIONS.find((r) => r.id === userData?.origin)?.name || "Fiji";

  const features = [
    {
      id: "family-tree",
      title: "Family Tree",
      subtitle: "Learn relationship terms",
      icon: "👨‍👩‍👧‍👦",
      badge: `${familyCount} member${familyCount !== 1 ? "s" : ""}`,
      badgeColor: "primary" as const,
      href: "/family-tree",
      disabled: false,
    },
    {
      id: "lessons",
      title: "Daily Lessons",
      subtitle: "Situational phrases",
      icon: "📚",
      badge: "Coming Soon",
      badgeColor: "secondary" as const,
      href: "/lessons",
      disabled: true,
    },
    {
      id: "stories",
      title: "Elder Stories",
      subtitle: "Preserve family stories",
      icon: "🎙️",
      badge: "Coming Soon",
      badgeColor: "secondary" as const,
      href: "/stories",
      disabled: true,
    },
  ];

  const handlePlayPhrase = () => {
    setIsPlaying(true);
    speakFijiHindi("Kaise ho", {
      onEnd: () => setIsPlaying(false),
      onError: () => setIsPlaying(false),
    });
  };

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <button className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center">
            <span className="text-lg">👤</span>
          </button>
        </div>
      </motion.header>

      <div className="max-w-lg mx-auto px-4 py-6">
        {/* Greeting */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-6"
        >
          <h1 className="text-2xl font-heading font-bold text-charcoal dark:text-white">
            {greeting}
          </h1>
          {userData && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              📍 {userData.city}, {userData.country} • 🇫🇯 {originName}
            </p>
          )}
        </motion.div>

        {/* Phrase of the Day Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-6"
        >
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="bg-gradient-to-r from-primary/10 to-secondary/10 p-5">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold text-primary uppercase tracking-wide">
                  Phrase of the Day
                </span>
                <span className="text-xs text-gray-500">Day 1</span>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex-1">
                  <p className="text-2xl font-bold text-charcoal dark:text-white">
                    &quot;Kaise ho?&quot;
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 mt-1">
                    How are you?
                  </p>
                </div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={handlePlayPhrase}
                  disabled={isPlaying}
                  className="w-14 h-14 rounded-full bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/30"
                >
                  {isPlaying ? (
                    <svg className="w-6 h-6 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15.414a5 5 0 001.414 1.414m0 0l-2.828 2.828m2.828-2.828l2.828 2.828M9 9h.01M15 9h.01M12 12h.01M12 15h.01M12 18h.01" />
                    </svg>
                  )}
                </motion.button>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Mini Globe */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <Card variant="elevated" padding="none" className="overflow-hidden">
            <div className="relative h-[200px]">
              <DiasporaGlobe showStats={false} />
              <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-gray-900 via-transparent to-transparent" />
              <div className="absolute bottom-4 left-4 right-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Fiji Indians worldwide
                    </p>
                    <p className="text-xl font-bold text-charcoal dark:text-white">
                      {TOTAL_DIASPORA_COUNT.toLocaleString()}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => router.push("/onboarding")}
                  >
                    View Map
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-lg font-heading font-semibold text-charcoal dark:text-white mb-4">
            Learn Fiji Hindi
          </h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <motion.div
                key={feature.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <LessonCard
                  icon={feature.icon}
                  title={feature.title}
                  subtitle={feature.subtitle}
                  badge={feature.badge}
                  badgeColor={feature.badgeColor}
                  disabled={feature.disabled}
                  onClick={() => !feature.disabled && router.push(feature.href)}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Progress Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-8"
        >
          <Card variant="glass">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-10 h-10 rounded-full bg-accent/10 flex items-center justify-center">
                <span className="text-xl">🏆</span>
              </div>
              <div>
                <p className="font-semibold text-charcoal dark:text-white">Your Progress</p>
                <p className="text-xs text-gray-500">Keep learning!</p>
              </div>
            </div>
            <ProgressBar progress={familyCount > 0 ? Math.min(familyCount * 10, 100) : 5} color="accent" showLabel />
          </Card>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <motion.nav
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="fixed bottom-0 left-0 right-0 bg-white/95 dark:bg-gray-900/95 backdrop-blur-md border-t border-gray-100 dark:border-gray-800 safe-area-bottom"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex justify-around">
          <button className="flex flex-col items-center gap-1 text-primary">
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z"/>
            </svg>
            <span className="text-xs font-medium">Home</span>
          </button>
          <button
            onClick={() => router.push("/family-tree")}
            className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
            <span className="text-xs font-medium">Family</span>
          </button>
          <button className="flex flex-col items-center gap-1 text-gray-400 hover:text-primary transition-colors">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-xs font-medium">Map</span>
          </button>
        </div>
      </motion.nav>
    </main>
  );
}
