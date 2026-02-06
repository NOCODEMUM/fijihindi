"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import Button from "@/components/ui/Button";
import Card from "@/components/ui/Card";
import Input from "@/components/ui/Input";
import BottomNav from "@/components/ui/BottomNav";
import { FAITH_OPTIONS, FIJI_REGIONS } from "@/lib/constants";

interface UserData {
  name: string;
  city: string;
  country: string;
  origins: string[];
  faith: string;
}

interface Progress {
  conversationsCompleted: string[];
  phrasesLearned: string[];
  currentStreak: number;
  lastActivityDate: string | null;
  totalCalls: number;
}

export default function SettingsPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    name: "",
    city: "",
    country: "",
    origins: [],
    faith: "hindu",
  });
  const [progress, setProgress] = useState<Progress>({
    conversationsCompleted: [],
    phrasesLearned: [],
    currentStreak: 0,
    lastActivityDate: null,
    totalCalls: 0,
  });
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState<UserData>(userData);

  useEffect(() => {
    // Load user data
    const stored = localStorage.getItem("fijihindi_user");
    if (stored) {
      const data = JSON.parse(stored);
      setUserData(data);
      setEditedData(data);
    }

    // Load progress
    const progressStr = localStorage.getItem("fijihindi_progress");
    if (progressStr) {
      setProgress(JSON.parse(progressStr));
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem("fijihindi_user", JSON.stringify(editedData));
    setUserData(editedData);
    setIsEditing(false);
  };

  const handleResetProgress = () => {
    if (confirm("Are you sure you want to reset all your progress? This cannot be undone.")) {
      localStorage.removeItem("fijihindi_progress");
      setProgress({
        conversationsCompleted: [],
        phrasesLearned: [],
        currentStreak: 0,
        lastActivityDate: null,
        totalCalls: 0,
      });
    }
  };

  const handleLogout = () => {
    if (confirm("Are you sure you want to start over? This will clear all your data.")) {
      localStorage.removeItem("fijihindi_user");
      localStorage.removeItem("fijihindi_progress");
      localStorage.removeItem("fijihindi_onboarded");
      localStorage.removeItem("fijihindi_family_tree");
      router.push("/");
    }
  };

  const originNames = userData.origins
    ?.map((id) => FIJI_REGIONS.find((r) => r.id === id)?.name)
    .filter(Boolean)
    .join(", ") || "Not set";

  const faithOption = FAITH_OPTIONS.find((f) => f.id === userData.faith);

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
            Settings
          </h1>
        </div>
      </motion.header>

      <div className="max-w-lg mx-auto px-4 py-6 space-y-6">
        {/* Profile Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide">
              Profile
            </h2>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="text-sm text-primary hover:text-primary/80"
            >
              {isEditing ? "Cancel" : "Edit"}
            </button>
          </div>

          <Card variant="default" className="divide-y divide-gray-100 dark:divide-gray-800">
            {isEditing ? (
              <div className="p-4 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Name
                  </label>
                  <Input
                    value={editedData.name}
                    onChange={(e) => setEditedData({ ...editedData, name: e.target.value })}
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      City
                    </label>
                    <Input
                      value={editedData.city}
                      onChange={(e) => setEditedData({ ...editedData, city: e.target.value })}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                      Country
                    </label>
                    <Input
                      value={editedData.country}
                      onChange={(e) => setEditedData({ ...editedData, country: e.target.value })}
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Faith
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {FAITH_OPTIONS.map((faith) => (
                      <button
                        key={faith.id}
                        onClick={() => setEditedData({ ...editedData, faith: faith.id })}
                        className={`
                          p-2 rounded-xl border-2 text-sm transition-all
                          ${editedData.faith === faith.id
                            ? "border-primary bg-primary/10"
                            : "border-gray-200 dark:border-gray-700"
                          }
                        `}
                      >
                        {faith.emoji} {faith.name}
                      </button>
                    ))}
                  </div>
                </div>
                <Button onClick={handleSave} fullWidth>
                  Save Changes
                </Button>
              </div>
            ) : (
              <>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Name</span>
                  <span className="font-medium text-charcoal dark:text-white">
                    {userData.name || "Not set"}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Location</span>
                  <span className="font-medium text-charcoal dark:text-white">
                    {userData.city && userData.country
                      ? `${userData.city}, ${userData.country}`
                      : "Not set"}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Fiji Origins</span>
                  <span className="font-medium text-charcoal dark:text-white">
                    🇫🇯 {originNames}
                  </span>
                </div>
                <div className="px-4 py-3 flex items-center justify-between">
                  <span className="text-gray-500 dark:text-gray-400">Faith</span>
                  <span className="font-medium text-charcoal dark:text-white">
                    {faithOption?.emoji} {faithOption?.name || "Not set"}
                  </span>
                </div>
              </>
            )}
          </Card>
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            Statistics
          </h2>
          <Card variant="default" className="divide-y divide-gray-100 dark:divide-gray-800">
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Total Conversations</span>
              <span className="font-bold text-primary">
                {progress.totalCalls}
              </span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Phrases Learned</span>
              <span className="font-bold text-secondary">
                {progress.phrasesLearned.length}
              </span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Current Streak</span>
              <span className="font-bold text-accent">
                🔥 {progress.currentStreak} days
              </span>
            </div>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Last Activity</span>
              <span className="font-medium text-charcoal dark:text-white">
                {progress.lastActivityDate || "Never"}
              </span>
            </div>
          </Card>
        </motion.div>

        {/* App Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            App
          </h2>
          <Card variant="default" className="divide-y divide-gray-100 dark:divide-gray-800">
            <button
              onClick={() => window.open("mailto:hello@fijihindi.com", "_blank")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-charcoal dark:text-white">Send Feedback</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <button
              onClick={() => window.open("https://fijihindi.com/help", "_blank")}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <span className="text-charcoal dark:text-white">Help & Support</span>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <div className="px-4 py-3 flex items-center justify-between">
              <span className="text-gray-500 dark:text-gray-400">Version</span>
              <span className="text-gray-400">1.0.0</span>
            </div>
          </Card>
        </motion.div>

        {/* Danger Zone */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-sm font-semibold text-red-500 uppercase tracking-wide mb-3">
            Danger Zone
          </h2>
          <Card variant="default" className="border-red-200 dark:border-red-900">
            <button
              onClick={handleResetProgress}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
            >
              <span className="text-red-500">Reset Progress</span>
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            <button
              onClick={handleLogout}
              className="w-full px-4 py-3 flex items-center justify-between hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors border-t border-gray-100 dark:border-gray-800"
            >
              <span className="text-red-500">Start Over</span>
              <svg className="w-5 h-5 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
              </svg>
            </button>
          </Card>
        </motion.div>
      </div>

      <BottomNav />
    </main>
  );
}
