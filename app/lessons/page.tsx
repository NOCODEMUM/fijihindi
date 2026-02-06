"use client";

import { useState, useEffect, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";
import { LessonModeId, getModeById, getAvailableModes } from "@/lib/constants";
import {
  getRecommendedMode,
  getLessonHistory,
  getFirstLessonDate,
  recordLessonMode,
  setFirstLessonDate,
  getCurrentWeek,
} from "@/lib/modeRotation";

// Dynamic imports for lesson interfaces
const AuntyComingInterface = dynamic(
  () => import("./components/AuntyComingInterface"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

const FamilyGatheringInterface = dynamic(
  () => import("./components/FamilyGatheringInterface"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

const CookingMumInterface = dynamic(
  () => import("./components/CookingMumInterface"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

const KavaNightInterface = dynamic(
  () => import("./components/KavaNightInterface"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

const SOSFlashcardsInterface = dynamic(
  () => import("./components/SOSFlashcardsInterface"),
  {
    loading: () => <LoadingScreen />,
    ssr: false,
  }
);

function LoadingScreen() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin" />
    </div>
  );
}

// Import scenario data for all modes
import { getRandomAuntyScenario } from "@/data/conversations/aunty-coming";
import { getRandomGatheringScenario } from "@/data/conversations/family-gathering";
import { getRandomRecipe } from "@/data/conversations/cooking-mum";
import { getRandomKavaStory } from "@/data/conversations/kava-night";

function LessonsPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const modeParam = searchParams.get("mode") as LessonModeId | null;

  const [selectedMode, setSelectedMode] = useState<LessonModeId | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Determine which mode to show
    if (modeParam) {
      // User specified a mode in URL
      setSelectedMode(modeParam);
    } else {
      // Auto-select mode using rotation algorithm
      const history = getLessonHistory();
      const firstDate = getFirstLessonDate();
      const recommended = getRecommendedMode(history, firstDate);
      setSelectedMode(recommended);
    }
    setIsLoading(false);
  }, [modeParam]);

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const handleLessonComplete = (result: {
    survived?: boolean;
    score?: number;
    totalTime?: number;
    responsesGiven?: string[];
    duration?: number;
    responses?: string[];
  }) => {
    if (selectedMode) {
      // Record this lesson
      recordLessonMode(selectedMode);

      // Set first lesson date if not set
      setFirstLessonDate();
    }

    // TODO: Store result for lesson summary
    // Navigate to summary or dashboard
    router.push("/dashboard");
  };

  if (isLoading) {
    return <LoadingScreen />;
  }

  // Render the appropriate mode interface
  switch (selectedMode) {
    case "nani-calling":
      // Redirect to existing call page
      router.push("/call");
      return <LoadingScreen />;

    case "aunty-coming":
      const scenario = getRandomAuntyScenario("beginner");
      return (
        <AuntyComingInterface
          exchanges={scenario.exchanges}
          onComplete={handleLessonComplete}
        />
      );

    case "family-gathering":
      const gatheringScenario = getRandomGatheringScenario();
      return (
        <FamilyGatheringInterface
          scenario={gatheringScenario}
          onComplete={(result) => handleLessonComplete({
            score: result.membersGreeted,
            responsesGiven: result.phrasesUsed,
          })}
        />
      );

    case "cooking-mum":
      const recipe = getRandomRecipe();
      return (
        <CookingMumInterface
          recipe={recipe}
          onComplete={(result) => handleLessonComplete({
            score: result.stepsCompleted,
            responsesGiven: result.vocabularyLearned,
          })}
        />
      );

    case "kava-night":
      const kavaStory = getRandomKavaStory();
      return (
        <KavaNightInterface
          story={kavaStory}
          onComplete={(result) => handleLessonComplete({
            score: result.segmentsHeard,
            responsesGiven: [...result.proverbsLearned, ...result.responsesGiven],
          })}
        />
      );

    case "sos-flashcards":
      return (
        <SOSFlashcardsInterface
          onComplete={(cardsReviewed) => handleLessonComplete({
            score: cardsReviewed,
          })}
          onExit={() => router.push("/dashboard")}
        />
      );

    default:
      return <ModeSelector onSelect={setSelectedMode} />;
  }
}

// Wrap in Suspense for useSearchParams
export default function LessonsPage() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <LessonsPageContent />
    </Suspense>
  );
}

// Mode selector component (shown when no mode selected)
function ModeSelector({ onSelect }: { onSelect: (mode: LessonModeId) => void }) {
  const firstDate = getFirstLessonDate();
  const weekNumber = getCurrentWeek(firstDate);
  const availableModes = getAvailableModes(weekNumber);

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center mb-8"
      >
        <h1 className="text-2xl font-bold text-charcoal dark:text-white mb-2">
          Choose Your Lesson
        </h1>
        <p className="text-gray-500 dark:text-gray-400">
          Week {weekNumber} - {availableModes.length} modes available
        </p>
      </motion.div>

      <div className="space-y-4 max-w-md mx-auto">
        {availableModes.map((mode, index) => (
          <motion.button
            key={mode.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            onClick={() => onSelect(mode.id)}
            className="w-full p-4 bg-white dark:bg-gray-800 rounded-2xl border-2 border-gray-100 dark:border-gray-700 hover:border-primary transition-all text-left shadow-sm"
          >
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                <span className="text-3xl">{mode.characterEmoji}</span>
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-charcoal dark:text-white">
                  {mode.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  {mode.description}
                </p>
                <span className={`
                  text-xs px-2 py-0.5 rounded-full mt-1 inline-block
                  ${mode.format === "phone-call" ? "bg-green-100 text-green-700" :
                    mode.format === "timed-urgency" ? "bg-orange-100 text-orange-700" :
                    mode.format === "multi-character" ? "bg-blue-100 text-blue-700" :
                    mode.format === "step-by-step" ? "bg-purple-100 text-purple-700" :
                    mode.format === "flashcards" ? "bg-red-100 text-red-700" :
                    "bg-gray-100 text-gray-700"}
                `}>
                  {mode.format.replace("-", " ")}
                </span>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </motion.button>
        ))}
      </div>

      {/* Locked modes preview */}
      {weekNumber < 3 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-center"
        >
          <p className="text-sm text-gray-400 mb-3">More modes unlock over time</p>
          <div className="flex justify-center gap-3">
            {["family-gathering", "cooking-mum", "kava-night"]
              .filter((id) => !availableModes.find((m) => m.id === id))
              .map((id) => {
                const mode = getModeById(id as LessonModeId);
                return (
                  <div
                    key={id}
                    className="w-12 h-12 rounded-xl bg-gray-200 dark:bg-gray-700 flex items-center justify-center opacity-50"
                    title={`${mode.name} - Week ${mode.unlockWeek}`}
                  >
                    <span className="text-2xl grayscale">{mode.characterEmoji}</span>
                  </div>
                );
              })}
          </div>
        </motion.div>
      )}
    </div>
  );
}
