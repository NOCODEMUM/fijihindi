"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface QuickExchange {
  id: string;
  auntyText: {
    fijiHindi: string;
    english: string;
  };
  options: {
    fijiHindi: string;
    english: string;
    isCorrect?: boolean; // For scoring
  }[];
  timeLimit: number; // Seconds for this exchange
}

interface AuntyComingInterfaceProps {
  exchanges: QuickExchange[];
  onComplete: (result: {
    survived: boolean;
    score: number;
    totalTime: number;
    responsesGiven: string[];
  }) => void;
}

export default function AuntyComingInterface({
  exchanges,
  onComplete,
}: AuntyComingInterfaceProps) {
  const [phase, setPhase] = useState<"doorbell" | "playing" | "result">("doorbell");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTimeUsed, setTotalTimeUsed] = useState(0);
  const [score, setScore] = useState(0);
  const [responsesGiven, setResponsesGiven] = useState<string[]>([]);
  const [survived, setSurvived] = useState(true);
  const [shakeScreen, setShakeScreen] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Doorbell animation
  useEffect(() => {
    if (phase === "doorbell") {
      setShakeScreen(true);
      // Play doorbell sound (if audio available)
      const audio = new Audio("/sounds/doorbell.mp3");
      audio.volume = 0.5;
      audio.play().catch(() => {
        // Audio autoplay blocked - continue anyway
      });

      setTimeout(() => setShakeScreen(false), 500);
      setTimeout(() => {
        setPhase("playing");
        setTimeLeft(exchanges[0]?.timeLimit || 10);
      }, 2000);
    }
  }, [phase, exchanges]);

  // Countdown timer
  useEffect(() => {
    if (phase !== "playing") return;

    timerRef.current = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          // Time's up for this exchange
          handleTimeOut();
          return 0;
        }
        return prev - 1;
      });
      setTotalTimeUsed((prev) => prev + 1);
    }, 1000);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [phase, currentIndex]);

  const handleTimeOut = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);

    // Aunty caught you!
    setSurvived(false);
    setPhase("result");
    onComplete({
      survived: false,
      score,
      totalTime: totalTimeUsed,
      responsesGiven,
    });
  }, [score, totalTimeUsed, responsesGiven, onComplete]);

  const handleSelectResponse = (response: { fijiHindi: string; english: string; isCorrect?: boolean }) => {
    if (timerRef.current) clearInterval(timerRef.current);

    const newResponses = [...responsesGiven, response.fijiHindi];
    setResponsesGiven(newResponses);

    // Add points for correct/good responses
    if (response.isCorrect !== false) {
      setScore((prev) => prev + 10);
    }

    // Move to next exchange
    const nextIndex = currentIndex + 1;
    if (nextIndex >= exchanges.length) {
      // Completed all exchanges - you survived!
      setSurvived(true);
      setPhase("result");
      onComplete({
        survived: true,
        score: score + 10,
        totalTime: totalTimeUsed,
        responsesGiven: newResponses,
      });
    } else {
      setCurrentIndex(nextIndex);
      setTimeLeft(exchanges[nextIndex].timeLimit);
    }
  };

  const currentExchange = exchanges[currentIndex];
  const urgencyLevel = timeLeft <= 3 ? "critical" : timeLeft <= 5 ? "warning" : "normal";

  return (
    <motion.div
      animate={shakeScreen ? { x: [0, -10, 10, -10, 10, 0] } : {}}
      transition={{ duration: 0.5 }}
      className="min-h-screen bg-gradient-to-b from-orange-50 to-white dark:from-gray-900 dark:to-gray-800"
    >
      <AnimatePresence mode="wait">
        {/* Doorbell Phase */}
        {phase === "doorbell" && (
          <motion.div
            key="doorbell"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <motion.div
              animate={{ scale: [1, 1.2, 1] }}
              transition={{ duration: 0.5, repeat: 3 }}
              className="text-8xl mb-6"
            >
              🔔
            </motion.div>
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-3xl font-bold text-charcoal dark:text-white text-center"
            >
              AUNTY&apos;S HERE!
            </motion.h1>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-gray-600 dark:text-gray-400 mt-2 text-center"
            >
              Quick! Greet her properly!
            </motion.p>
          </motion.div>
        )}

        {/* Playing Phase */}
        {phase === "playing" && currentExchange && (
          <motion.div
            key="playing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col min-h-screen"
          >
            {/* Timer Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">👩</span>
                  <span className="font-medium text-charcoal dark:text-white">Aunty</span>
                </div>

                {/* Countdown Timer */}
                <motion.div
                  animate={urgencyLevel === "critical" ? { scale: [1, 1.1, 1] } : {}}
                  transition={{ duration: 0.3, repeat: urgencyLevel === "critical" ? Infinity : 0 }}
                  className={`
                    px-4 py-2 rounded-full font-bold text-lg
                    ${urgencyLevel === "critical" ? "bg-red-500 text-white" :
                      urgencyLevel === "warning" ? "bg-orange-400 text-white" :
                      "bg-gray-200 dark:bg-gray-700 text-charcoal dark:text-white"}
                  `}
                >
                  {timeLeft}s
                </motion.div>

                <div className="text-right">
                  <p className="text-sm text-gray-500">Score</p>
                  <p className="font-bold text-primary">{score}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="mt-2 h-1 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                <motion.div
                  className={`h-full ${urgencyLevel === "critical" ? "bg-red-500" : "bg-primary"}`}
                  initial={{ width: "100%" }}
                  animate={{ width: `${(timeLeft / currentExchange.timeLimit) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>

            {/* Exchange Content */}
            <div className="flex-1 px-4 py-6">
              {/* Aunty's Message */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex gap-3 mb-6"
              >
                <div className="w-12 h-12 rounded-full bg-orange-100 dark:bg-orange-900/30 flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl">👩</span>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 dark:border-gray-700 max-w-[85%]">
                  <p className="text-xl font-semibold text-charcoal dark:text-white">
                    {currentExchange.auntyText.fijiHindi}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                    {currentExchange.auntyText.english}
                  </p>
                </div>
              </motion.div>

              {/* Quick Response Options */}
              <div className="space-y-3">
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-2">
                  Quick! Respond:
                </p>
                {currentExchange.options.map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleSelectResponse(option)}
                    className={`
                      w-full p-4 rounded-xl text-left transition-all
                      bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700
                      hover:border-primary hover:shadow-md
                      active:bg-primary active:text-white active:border-primary
                    `}
                  >
                    <p className="font-semibold text-charcoal dark:text-white">
                      {option.fijiHindi}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {option.english}
                    </p>
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Progress indicator */}
            <div className="px-4 pb-6">
              <div className="flex justify-center gap-2">
                {exchanges.map((_, index) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index < currentIndex
                        ? "bg-green-500"
                        : index === currentIndex
                        ? "bg-primary"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Result Phase */}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-8xl mb-6"
            >
              {survived ? "🎉" : "😅"}
            </motion.div>

            <h1 className={`text-3xl font-bold text-center ${
              survived ? "text-green-500" : "text-orange-500"
            }`}>
              {survived ? "You Survived!" : "Aunty Caught You!"}
            </h1>

            <p className="text-gray-600 dark:text-gray-400 mt-2 text-center max-w-sm">
              {survived
                ? "You handled Aunty like a pro! She's impressed with your Fiji Hindi."
                : "Don't worry, even the best get caught sometimes. Try again!"}
            </p>

            <div className="mt-8 bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg w-full max-w-sm">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Final Score</span>
                <span className="font-bold text-2xl text-primary">{score}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Time Used</span>
                <span className="font-medium">{totalTimeUsed}s</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Responses</span>
                <span className="font-medium">{responsesGiven.length}/{exchanges.length}</span>
              </div>
            </div>

            {/* Phrases learned */}
            {responsesGiven.length > 0 && (
              <div className="mt-6 w-full max-w-sm">
                <h3 className="text-sm font-medium text-gray-500 mb-2">Phrases you used:</h3>
                <div className="flex flex-wrap gap-2">
                  {responsesGiven.map((phrase, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                    >
                      {phrase}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
