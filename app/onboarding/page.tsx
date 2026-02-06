"use client";

import { useState, useCallback } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import HookStep from "./components/HookStep";
import DiasporaStep from "./components/DiasporaStep";
import OriginStep from "./components/OriginStep";
import FaithStep from "./components/FaithStep";
import FirstCallStep from "./components/FirstCallStep";

type OnboardingStep = "hook" | "diaspora" | "origin" | "faith" | "firstCall";

interface UserData {
  name: string;
  city: string;
  country: string;
  lat: number;
  lng: number;
  origins: string[];
  faith: string;
}

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState<OnboardingStep>("hook");
  const [userData, setUserData] = useState<UserData>({
    name: "",
    city: "",
    country: "",
    lat: 0,
    lng: 0,
    origins: [],
    faith: "",
  });

  const handleDiasporaSubmit = useCallback(
    (data: { city: string; country: string; lat: number; lng: number }) => {
      setUserData((prev) => ({ ...prev, ...data }));
      setStep("origin");
    },
    []
  );

  const handleOriginSubmit = useCallback((origins: string[]) => {
    setUserData((prev) => ({ ...prev, origins }));
    setStep("faith");
  }, []);

  const handleFaithSubmit = useCallback((faith: string) => {
    setUserData((prev) => ({ ...prev, faith }));
    setStep("firstCall");
  }, []);

  const handleComplete = useCallback((phrasesLearned: string[], userName?: string) => {
    // Store user data in localStorage
    if (typeof window !== "undefined") {
      // Save user profile (name comes from first call step)
      localStorage.setItem("fijihindi_user", JSON.stringify({
        name: userName || userData.name,
        city: userData.city,
        country: userData.country,
        lat: userData.lat,
        lng: userData.lng,
        origins: userData.origins,
        faith: userData.faith || "hindu",
      }));

      // Save progress
      localStorage.setItem("fijihindi_progress", JSON.stringify({
        conversationsCompleted: ["onboarding-first-call"],
        phrasesLearned: phrasesLearned,
        currentStreak: 1,
        lastActivityDate: new Date().toISOString().split("T")[0],
        totalCalls: 1,
      }));

      // Mark onboarding complete
      localStorage.setItem("fijihindi_onboarded", "true");
    }
    router.push("/dashboard");
  }, [userData, router]);

  const steps: Record<OnboardingStep, number> = {
    hook: 0,
    diaspora: 1,
    origin: 2,
    faith: 3,
    firstCall: 4,
  };

  const progressSteps = ["diaspora", "origin", "faith"];

  return (
    <main className="min-h-screen bg-background-light dark:bg-background-dark">
      {/* Progress indicator - only show for middle steps */}
      {step !== "hook" && step !== "firstCall" && (
        <div className="fixed top-0 left-0 right-0 z-50 px-4 pt-4">
          <div className="max-w-md mx-auto">
            <div className="flex gap-2">
              {progressSteps.map((s, index) => (
                <motion.div
                  key={s}
                  className="flex-1 h-1 rounded-full overflow-hidden bg-gray-200 dark:bg-gray-700"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: "0%" }}
                    animate={{
                      width: steps[step] > index ? "100%" : "0%",
                    }}
                    transition={{ duration: 0.3 }}
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="max-w-md mx-auto pt-12 pb-8 min-h-screen">
        <AnimatePresence mode="wait">
          {step === "hook" && (
            <motion.div
              key="hook"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <HookStep onNext={() => setStep("diaspora")} />
            </motion.div>
          )}

          {step === "diaspora" && (
            <motion.div
              key="diaspora"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <DiasporaStep
                onNext={handleDiasporaSubmit}
                onBack={() => setStep("hook")}
              />
            </motion.div>
          )}

          {step === "origin" && (
            <motion.div
              key="origin"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <OriginStep
                onNext={handleOriginSubmit}
                onBack={() => setStep("diaspora")}
                initialOrigins={userData.origins}
              />
            </motion.div>
          )}

          {step === "faith" && (
            <motion.div
              key="faith"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FaithStep
                onNext={handleFaithSubmit}
                onBack={() => setStep("origin")}
                initialFaith={userData.faith}
              />
            </motion.div>
          )}

          {step === "firstCall" && (
            <motion.div
              key="firstCall"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <FirstCallStep
                onComplete={handleComplete}
                userName={userData.name}
                askForName={true}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
}
