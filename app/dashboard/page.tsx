"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Logo from "@/components/ui/Logo";
import PhoneButton from "@/components/ui/PhoneButton";
import StreakBadge from "@/components/ui/StreakBadge";
import BottomNav from "@/components/ui/BottomNav";
import { FIJI_REGIONS, TOTAL_DIASPORA_COUNT } from "@/lib/constants";
import { getAllConversations, Conversation } from "@/data/conversations/intro-greeting";

interface UserData {
  name: string;
  city: string;
  country: string;
  origins: string[];
}

interface Progress {
  conversationsCompleted: string[];
  phrasesLearned: string[];
  currentStreak: number;
  lastActivityDate: string | null;
  totalCalls: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData | null>(null);
  const [progress, setProgress] = useState<Progress>({
    conversationsCompleted: [],
    phrasesLearned: [],
    currentStreak: 0,
    lastActivityDate: null,
    totalCalls: 0,
  });
  const [greeting, setGreeting] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>([]);

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

    // Load progress
    const progressStr = localStorage.getItem("fijihindi_progress");
    if (progressStr) {
      setProgress(JSON.parse(progressStr));
    }

    // Load conversations
    setConversations(getAllConversations());

    // Set greeting based on time
    const hour = new Date().getHours();
    if (hour < 12) setGreeting("Good morning");
    else if (hour < 17) setGreeting("Good afternoon");
    else setGreeting("Good evening");
  }, [router]);

  const originNames = userData?.origins
    ?.map((id) => FIJI_REGIONS.find((r) => r.id === id)?.name)
    .filter(Boolean)
    .join(", ") || "Fiji";

  const handleCallNani = () => {
    // Find the next incomplete conversation
    const nextConversation = conversations.find(
      (c) => !progress.conversationsCompleted.includes(c.id)
    );

    if (nextConversation) {
      router.push(`/call?id=${nextConversation.id}`);
    } else {
      // All completed, start from beginning
      router.push(`/call?id=${conversations[0]?.id || "intro-greeting"}`);
    }
  };

  const completedConversations = conversations.filter((c) =>
    progress.conversationsCompleted.includes(c.id)
  );

  return (
    <main className="min-h-screen bg-coconut dark:bg-background-dark pb-24">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800"
      >
        <div className="max-w-lg mx-auto px-4 py-3 flex items-center justify-between">
          <Logo size="sm" />
          <button
            onClick={() => router.push("/settings")}
            className="w-9 h-9 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center"
          >
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
            {greeting}{userData?.name ? `, ${userData.name}` : ""}!
          </h1>
          {userData && (
            <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
              {userData.city}{userData.city && userData.country ? ", " : ""}{userData.country}
              {originNames ? ` • 🇫🇯 ${originNames}` : ""}
            </p>
          )}
        </motion.div>

        {/* Call Nani Button - Main CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1 }}
          className="mb-8"
        >
          <Card variant="elevated" className="p-8 text-center bg-gradient-to-br from-white to-green-50 dark:from-gray-800 dark:to-gray-900">
            <PhoneButton
              onClick={handleCallNani}
              label="Call Nani"
              size="lg"
            />
            <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Tap to start a conversation
            </p>
          </Card>
        </motion.div>

        {/* Progress Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-6"
        >
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            Your Progress
          </h2>
          <Card variant="glass" className="p-4">
            <div className="grid grid-cols-3 gap-4 text-center">
              <div>
                <p className="text-2xl font-bold text-primary">
                  ☕ {progress.totalCalls}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  conversations
                </p>
              </div>
              <div>
                <p className="text-2xl font-bold text-secondary">
                  💬 {progress.phrasesLearned.length}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  phrases learned
                </p>
              </div>
              <div>
                <StreakBadge streak={progress.currentStreak} size="sm" showLabel={false} />
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {progress.currentStreak} day streak
                </p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Past Conversations */}
        {completedConversations.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3 flex items-center gap-2">
              <span>📱</span> Past Conversations
            </h2>
            <Card variant="default" className="divide-y divide-gray-100 dark:divide-gray-800">
              {completedConversations.slice(0, 5).map((conv) => (
                <motion.button
                  key={conv.id}
                  onClick={() => router.push(`/call?id=${conv.id}`)}
                  className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                      <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div className="text-left">
                      <p className="font-medium text-charcoal dark:text-white">
                        {conv.title}
                      </p>
                      <p className="text-xs text-gray-500">
                        {conv.phrases.length} phrases
                      </p>
                    </div>
                  </div>
                  <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ))}
            </Card>
          </motion.div>
        )}

        {/* Available Conversations */}
        {conversations.filter((c) => !progress.conversationsCompleted.includes(c.id)).length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="mb-6"
          >
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
              Up Next
            </h2>
            <div className="space-y-2">
              {conversations
                .filter((c) => !progress.conversationsCompleted.includes(c.id))
                .slice(0, 3)
                .map((conv, index) => (
                  <motion.button
                    key={conv.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    onClick={() => router.push(`/call?id=${conv.id}`)}
                    className="w-full"
                  >
                    <Card variant="default" className="p-4 hover:shadow-md transition-shadow">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl">👵</span>
                        </div>
                        <div className="text-left flex-1">
                          <p className="font-medium text-charcoal dark:text-white">
                            {conv.title}
                          </p>
                          <p className="text-sm text-gray-500">
                            {conv.description}
                          </p>
                        </div>
                        <div className="text-right">
                          <span className="text-xs text-gray-400">
                            {conv.duration}
                          </span>
                        </div>
                      </div>
                    </Card>
                  </motion.button>
                ))}
            </div>
          </motion.div>
        )}

        {/* Community Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card variant="glass" className="p-4 text-center">
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <span className="text-primary font-bold">
                {TOTAL_DIASPORA_COUNT.toLocaleString()}
              </span>{" "}
              Fiji Indians learning worldwide 🌍
            </p>
          </Card>
        </motion.div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </main>
  );
}
