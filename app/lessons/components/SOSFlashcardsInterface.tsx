"use client";

import { useState, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import {
  FlashcardCategory,
  Flashcard,
  getRandomFlashcards,
  getAllFlashcardCategories,
} from "@/data/conversations/sos-flashcards";
import { Faith } from "@/data/relationships";
import { speakFijiHindi } from "@/lib/audio";

interface SOSFlashcardsInterfaceProps {
  onComplete: (cardsReviewed: number) => void;
  onExit: () => void;
}

type ViewMode = "categories" | "cards" | "quick-practice";

export default function SOSFlashcardsInterface({
  onComplete,
  onExit,
}: SOSFlashcardsInterfaceProps) {
  const [viewMode, setViewMode] = useState<ViewMode>("categories");
  const [selectedCategory, setSelectedCategory] = useState<FlashcardCategory | null>(null);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [cardsReviewed, setCardsReviewed] = useState(0);
  const [quickPracticeCards, setQuickPracticeCards] = useState<Flashcard[]>([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [userFaith, setUserFaith] = useState<Faith>("hindu");
  const [categories, setCategories] = useState<FlashcardCategory[]>([]);

  // Load user's faith and generate categories
  useEffect(() => {
    let faith: Faith = "hindu";
    const storedUser = localStorage.getItem("fijihindi_user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      if (user.faith) {
        faith = user.faith as Faith;
      }
    }
    setUserFaith(faith);
    setCategories(getAllFlashcardCategories(faith));
  }, []);

  const currentCards = viewMode === "quick-practice"
    ? quickPracticeCards
    : selectedCategory?.cards || [];

  const currentCard = currentCards[currentCardIndex];

  const handleSelectCategory = (category: FlashcardCategory) => {
    // Get the category with populated cards (for dynamic categories like family)
    const populatedCategory = categories.find(c => c.id === category.id) || category;
    setSelectedCategory(populatedCategory);
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setViewMode("cards");
  };

  const handleQuickPractice = () => {
    setQuickPracticeCards(getRandomFlashcards(10, userFaith));
    setCurrentCardIndex(0);
    setIsFlipped(false);
    setViewMode("quick-practice");
  };

  const handleNextCard = useCallback(() => {
    if (currentCardIndex < currentCards.length - 1) {
      setCurrentCardIndex((prev) => prev + 1);
      setIsFlipped(false);
      setCardsReviewed((prev) => prev + 1);
    } else {
      // Completed this set
      setCardsReviewed((prev) => prev + 1);
      onComplete(cardsReviewed + 1);
    }
  }, [currentCardIndex, currentCards.length, cardsReviewed, onComplete]);

  const handlePrevCard = useCallback(() => {
    if (currentCardIndex > 0) {
      setCurrentCardIndex((prev) => prev - 1);
      setIsFlipped(false);
    }
  }, [currentCardIndex]);

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handlePlayAudio = () => {
    if (currentCard && !isPlaying) {
      setIsPlaying(true);
      speakFijiHindi(currentCard.fijiHindi, {
        onEnd: () => setIsPlaying(false),
        onError: () => setIsPlaying(false),
      });
    }
  };

  const handleBackToCategories = () => {
    setViewMode("categories");
    setSelectedCategory(null);
    setCurrentCardIndex(0);
    setIsFlipped(false);
  };

  // Category selection view
  if (viewMode === "categories") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
        {/* Header */}
        <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
          <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
            <button
              onClick={onExit}
              className="p-2 -ml-2 text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="text-center">
              <h1 className="text-lg font-bold text-charcoal dark:text-white flex items-center gap-2">
                <span>🆘</span> SOS Flashcards
              </h1>
            </div>
            <div className="w-10" /> {/* Spacer */}
          </div>
        </div>

        <div className="max-w-lg mx-auto px-4 py-6">
          {/* Quick Practice Button */}
          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={handleQuickPractice}
            className="w-full mb-6 p-4 bg-gradient-to-r from-primary to-orange-500 rounded-2xl text-white shadow-lg"
          >
            <div className="flex items-center justify-center gap-3">
              <span className="text-2xl">⚡</span>
              <div className="text-left">
                <p className="font-bold text-lg">Quick Practice</p>
                <p className="text-sm text-white/80">10 random cards</p>
              </div>
            </div>
          </motion.button>

          {/* Category Grid */}
          <h2 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-3">
            Browse by Category
          </h2>
          <div className="grid grid-cols-2 gap-3">
            {categories.map((category, index) => (
              <motion.button
                key={category.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => handleSelectCategory(category)}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-100 dark:border-gray-700 hover:shadow-md hover:border-primary transition-all text-left"
              >
                <span className="text-3xl mb-2 block">{category.emoji}</span>
                <p className="font-semibold text-charcoal dark:text-white">
                  {category.name}
                </p>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {category.cards.length} cards
                </p>
              </motion.button>
            ))}
          </div>

          {/* Stats */}
          {cardsReviewed > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-white dark:bg-gray-800 rounded-xl text-center"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Cards reviewed this session
              </p>
              <p className="text-2xl font-bold text-primary">{cardsReviewed}</p>
            </motion.div>
          )}
        </div>
      </div>
    );
  }

  // Flashcard view
  return (
    <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
      {/* Header */}
      <div className="sticky top-0 z-30 bg-white/90 dark:bg-gray-900/90 backdrop-blur-md border-b border-gray-100 dark:border-gray-800">
        <div className="max-w-lg mx-auto px-4 py-4 flex items-center justify-between">
          <button
            onClick={handleBackToCategories}
            className="p-2 -ml-2 text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            <span className="text-sm">Back</span>
          </button>
          <div className="text-center">
            <h1 className="text-lg font-bold text-charcoal dark:text-white flex items-center gap-2">
              <span>{viewMode === "quick-practice" ? "⚡" : selectedCategory?.emoji}</span>
              {viewMode === "quick-practice" ? "Quick Practice" : selectedCategory?.name}
            </h1>
          </div>
          <div className="text-sm text-gray-500">
            {currentCardIndex + 1}/{currentCards.length}
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1 bg-gray-200 dark:bg-gray-700">
          <motion.div
            className="h-full bg-primary"
            initial={{ width: "0%" }}
            animate={{ width: `${((currentCardIndex + 1) / currentCards.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="max-w-lg mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[70vh]">
        {/* Flashcard */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentCardIndex}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            className="w-full max-w-sm perspective-1000"
          >
            <motion.div
              onClick={handleFlip}
              animate={{ rotateY: isFlipped ? 180 : 0 }}
              transition={{ duration: 0.4 }}
              className="relative w-full aspect-[3/4] cursor-pointer preserve-3d"
              style={{ transformStyle: "preserve-3d" }}
            >
              {/* Front of card */}
              <div
                className="absolute inset-0 backface-hidden bg-white dark:bg-gray-800 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden" }}
              >
                <p className="text-xs text-gray-400 uppercase tracking-wide mb-4">
                  Fiji Hindi
                </p>
                <p className="text-4xl font-bold text-charcoal dark:text-white text-center mb-4">
                  {currentCard?.fijiHindi}
                </p>
                {currentCard?.pronunciation && (
                  <p className="text-lg text-gray-500 italic">
                    /{currentCard.pronunciation}/
                  </p>
                )}

                {/* Audio button */}
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePlayAudio();
                  }}
                  className={`mt-6 w-14 h-14 rounded-full flex items-center justify-center ${
                    isPlaying
                      ? "bg-primary text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300"
                  }`}
                >
                  {isPlaying ? (
                    <motion.span
                      animate={{ scale: [1, 1.2, 1] }}
                      transition={{ duration: 0.5, repeat: Infinity }}
                    >
                      🔊
                    </motion.span>
                  ) : (
                    <span>🔈</span>
                  )}
                </motion.button>

                <p className="absolute bottom-6 text-sm text-gray-400">
                  Tap to flip
                </p>
              </div>

              {/* Back of card */}
              <div
                className="absolute inset-0 backface-hidden bg-gradient-to-br from-primary to-orange-500 rounded-3xl shadow-xl p-8 flex flex-col items-center justify-center"
                style={{ backfaceVisibility: "hidden", transform: "rotateY(180deg)" }}
              >
                <p className="text-xs text-white/70 uppercase tracking-wide mb-4">
                  English
                </p>
                <p className="text-3xl font-bold text-white text-center mb-4">
                  {currentCard?.english}
                </p>

                {currentCard?.alternate && (
                  <p className="text-lg text-white/80 mb-2">
                    Also: <span className="font-medium">{currentCard.alternate}</span>
                  </p>
                )}

                {currentCard?.example && (
                  <div className="mt-4 p-4 bg-white/20 rounded-xl w-full">
                    <p className="text-xs text-white/70 uppercase mb-2">Example</p>
                    <p className="text-white font-medium">{currentCard.example.fijiHindi}</p>
                    <p className="text-white/80 text-sm mt-1">{currentCard.example.english}</p>
                  </div>
                )}

                <p className="absolute bottom-6 text-sm text-white/60">
                  Tap to flip back
                </p>
              </div>
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation buttons */}
        <div className="flex gap-4 mt-8 w-full max-w-sm">
          <Button
            variant="ghost"
            onClick={handlePrevCard}
            disabled={currentCardIndex === 0}
            className="flex-1"
          >
            ← Previous
          </Button>
          <Button
            onClick={handleNextCard}
            className="flex-1"
          >
            {currentCardIndex === currentCards.length - 1 ? "Done ✓" : "Next →"}
          </Button>
        </div>

        {/* Swipe hint */}
        <p className="mt-4 text-sm text-gray-400 text-center">
          Use buttons or swipe to navigate
        </p>
      </div>
    </div>
  );
}
