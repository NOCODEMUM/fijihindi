"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface RecipeStep {
  id: string;
  instruction: {
    fijiHindi: string;
    english: string;
  };
  vocabulary: {
    fijiHindi: string;
    english: string;
    emoji?: string;
  }[];
  mumSays?: {
    fijiHindi: string;
    english: string;
  };
  userResponse?: {
    options: { fijiHindi: string; english: string }[];
  };
}

interface Recipe {
  id: string;
  name: string;
  nameHindi: string;
  emoji: string;
  description: string;
  prepTime: string;
  steps: RecipeStep[];
  phrases: string[];
}

interface CookingMumInterfaceProps {
  recipe: Recipe;
  onComplete: (result: {
    stepsCompleted: number;
    vocabularyLearned: string[];
  }) => void;
}

export default function CookingMumInterface({
  recipe,
  onComplete,
}: CookingMumInterfaceProps) {
  const [phase, setPhase] = useState<"intro" | "cooking" | "result">("intro");
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [showVocab, setShowVocab] = useState(false);
  const [vocabLearned, setVocabLearned] = useState<string[]>([]);

  const currentStep = recipe.steps[currentStepIndex];
  const progress = ((currentStepIndex + 1) / recipe.steps.length) * 100;

  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => setPhase("cooking"), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleNextStep = () => {
    // Add vocab from current step
    const newVocab = currentStep.vocabulary.map(v => v.fijiHindi);
    setVocabLearned(prev => [...prev, ...newVocab]);

    if (currentStepIndex < recipe.steps.length - 1) {
      setCurrentStepIndex(prev => prev + 1);
      setShowVocab(false);
    } else {
      // Recipe complete!
      setPhase("result");
      onComplete({
        stepsCompleted: recipe.steps.length,
        vocabularyLearned: [...vocabLearned, ...newVocab],
      });
    }
  };

  const handleVocabTap = (word: string) => {
    if (!vocabLearned.includes(word)) {
      setVocabLearned(prev => [...prev, word]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-100 dark:from-gray-900 dark:to-amber-900/20">
      <AnimatePresence mode="wait">
        {/* Intro Phase */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
          >
            <motion.div
              animate={{ rotate: [0, 10, -10, 0] }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-7xl mb-6"
            >
              👩‍🍳
            </motion.div>
            <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-2">
              Cooking with Mum
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Today we&apos;re making...
            </p>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="bg-white dark:bg-gray-800 rounded-2xl p-6 shadow-lg"
            >
              <span className="text-5xl block mb-2">{recipe.emoji}</span>
              <p className="text-2xl font-bold text-primary">{recipe.nameHindi}</p>
              <p className="text-gray-500">{recipe.name}</p>
              <p className="text-sm text-gray-400 mt-2">{recipe.prepTime}</p>
            </motion.div>
          </motion.div>
        )}

        {/* Cooking Phase */}
        {phase === "cooking" && (
          <motion.div
            key="cooking"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-b border-gray-100 dark:border-gray-800">
              <div className="px-4 py-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{recipe.emoji}</span>
                    <div>
                      <p className="font-semibold text-charcoal dark:text-white">{recipe.nameHindi}</p>
                      <p className="text-xs text-gray-500">Step {currentStepIndex + 1} of {recipe.steps.length}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xl">👩‍🍳</span>
                    <span className="text-sm text-gray-500">Mum</span>
                  </div>
                </div>
                {/* Progress bar */}
                <div className="h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-primary"
                    initial={{ width: 0 }}
                    animate={{ width: `${progress}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 px-4 py-6">
              {/* Mum's instruction */}
              <motion.div
                key={currentStepIndex}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl p-5 shadow-lg mb-4"
              >
                <div className="flex items-start gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-amber-100 dark:bg-amber-900/30 flex items-center justify-center flex-shrink-0">
                    <span className="text-xl">👩‍🍳</span>
                  </div>
                  <div>
                    <p className="text-lg font-semibold text-charcoal dark:text-white">
                      {currentStep.instruction.fijiHindi}
                    </p>
                    <p className="text-gray-500 mt-1">
                      {currentStep.instruction.english}
                    </p>
                  </div>
                </div>

                {/* Vocabulary for this step */}
                <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                  <button
                    onClick={() => setShowVocab(!showVocab)}
                    className="flex items-center justify-between w-full text-left"
                  >
                    <span className="text-sm font-medium text-primary">
                      📚 Vocabulary ({currentStep.vocabulary.length} words)
                    </span>
                    <motion.span animate={{ rotate: showVocab ? 180 : 0 }}>
                      ▼
                    </motion.span>
                  </button>

                  <AnimatePresence>
                    {showVocab && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="grid grid-cols-2 gap-2 mt-3">
                          {currentStep.vocabulary.map((vocab, index) => (
                            <motion.button
                              key={index}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.05 }}
                              onClick={() => handleVocabTap(vocab.fijiHindi)}
                              className={`p-3 rounded-xl text-left transition-all ${
                                vocabLearned.includes(vocab.fijiHindi)
                                  ? "bg-green-100 dark:bg-green-900/30 border-2 border-green-500"
                                  : "bg-gray-50 dark:bg-gray-700 border-2 border-transparent"
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                {vocab.emoji && <span className="text-lg">{vocab.emoji}</span>}
                                <div>
                                  <p className="font-medium text-charcoal dark:text-white text-sm">
                                    {vocab.fijiHindi}
                                  </p>
                                  <p className="text-xs text-gray-500">{vocab.english}</p>
                                </div>
                              </div>
                            </motion.button>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>

              {/* Mum's extra comment */}
              {currentStep.mumSays && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-100 dark:bg-amber-900/20 rounded-xl p-4 mb-4"
                >
                  <div className="flex items-start gap-2">
                    <span className="text-lg">💬</span>
                    <div>
                      <p className="text-charcoal dark:text-white font-medium">
                        {currentStep.mumSays.fijiHindi}
                      </p>
                      <p className="text-sm text-gray-600 dark:text-gray-400">
                        {currentStep.mumSays.english}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </div>

            {/* Next Step Button */}
            <div className="px-4 pb-6">
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleNextStep}
                className="w-full py-4 bg-primary text-white font-semibold rounded-2xl shadow-lg shadow-primary/30"
              >
                {currentStepIndex < recipe.steps.length - 1 ? (
                  <>Next Step →</>
                ) : (
                  <>Finish Cooking! 🎉</>
                )}
              </motion.button>
            </div>
          </motion.div>
        )}

        {/* Result Phase */}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="text-7xl mb-4"
            >
              {recipe.emoji}
            </motion.div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl mb-4"
            >
              😋
            </motion.div>
            <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-2">
              Bahut Swadisht!
            </h1>
            <p className="text-gray-500 mb-2">Delicious!</p>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You made {recipe.nameHindi} with Mum!
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-lg">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Steps Completed</span>
                <span className="font-bold text-primary">{recipe.steps.length}/{recipe.steps.length}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Words Learned</span>
                <span className="font-bold text-secondary">{Array.from(new Set(vocabLearned)).length}</span>
              </div>
            </div>

            {vocabLearned.length > 0 && (
              <div className="mt-6 w-full max-w-sm">
                <p className="text-sm text-gray-500 mb-2">Kitchen vocabulary:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Array.from(new Set(vocabLearned)).slice(0, 8).map((word, i) => (
                    <span key={i} className="px-3 py-1 bg-amber-100 dark:bg-amber-900/30 text-amber-700 dark:text-amber-400 rounded-full text-sm">
                      {word}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
