"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface StorySegment {
  id: string;
  dadSays: {
    fijiHindi: string;
    english: string;
  };
  userResponses?: {
    fijiHindi: string;
    english: string;
  }[];
  culturalNote?: {
    title: string;
    content: string;
  };
  proverb?: {
    fijiHindi: string;
    english: string;
    meaning: string;
  };
}

interface KavaStory {
  id: string;
  title: string;
  titleHindi: string;
  topic: string;
  segments: StorySegment[];
  phrases: string[];
}

interface KavaNightInterfaceProps {
  story: KavaStory;
  onComplete: (result: {
    segmentsHeard: number;
    proverbsLearned: string[];
    responsesGiven: string[];
  }) => void;
}

export default function KavaNightInterface({
  story,
  onComplete,
}: KavaNightInterfaceProps) {
  const [phase, setPhase] = useState<"intro" | "story" | "result">("intro");
  const [currentSegmentIndex, setCurrentSegmentIndex] = useState(0);
  const [responsesGiven, setResponsesGiven] = useState<string[]>([]);
  const [proverbsLearned, setProverbsLearned] = useState<string[]>([]);
  const [showCulturalNote, setShowCulturalNote] = useState(false);
  const [kavaRounds, setKavaRounds] = useState(1);

  const currentSegment = story.segments[currentSegmentIndex];
  const isLastSegment = currentSegmentIndex >= story.segments.length - 1;

  useEffect(() => {
    if (phase === "intro") {
      const timer = setTimeout(() => setPhase("story"), 3000);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleResponse = (response: { fijiHindi: string; english: string }) => {
    setResponsesGiven(prev => [...prev, response.fijiHindi]);

    // Track proverb if current segment has one
    if (currentSegment.proverb) {
      setProverbsLearned(prev => [...prev, currentSegment.proverb!.fijiHindi]);
    }

    // Small delay then move to next
    setTimeout(() => {
      if (isLastSegment) {
        setPhase("result");
        onComplete({
          segmentsHeard: story.segments.length,
          proverbsLearned,
          responsesGiven: [...responsesGiven, response.fijiHindi],
        });
      } else {
        setCurrentSegmentIndex(prev => prev + 1);
        setShowCulturalNote(false);
        setKavaRounds(prev => prev + 1);
      }
    }, 500);
  };

  const handleAnotherRound = () => {
    if (isLastSegment) {
      setPhase("result");
      onComplete({
        segmentsHeard: story.segments.length,
        proverbsLearned,
        responsesGiven,
      });
    } else {
      setCurrentSegmentIndex(prev => prev + 1);
      setShowCulturalNote(false);
      setKavaRounds(prev => prev + 1);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-800 to-slate-900">
      <AnimatePresence mode="wait">
        {/* Intro Phase - Evening Scene */}
        {phase === "intro" && (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
          >
            {/* Stars animation */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(20)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-1 h-1 bg-white rounded-full"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: [0, 1, 0] }}
                  transition={{ duration: 2, repeat: Infinity, delay: i * 0.1 }}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 50}%`,
                  }}
                />
              ))}
            </div>

            <motion.div
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="text-6xl mb-4"
            >
              🌙
            </motion.div>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.5 }}
              className="text-5xl mb-6"
            >
              🥥
            </motion.div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Kava Night with Dad
            </h1>
            <p className="text-gray-400 mb-4">
              Relax, listen, and learn...
            </p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-amber-400"
            >
              &quot;{story.titleHindi}&quot;
            </motion.p>
            <p className="text-gray-500 text-sm mt-1">{story.topic}</p>
          </motion.div>
        )}

        {/* Story Phase */}
        {phase === "story" && (
          <motion.div
            key="story"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-slate-800/90 backdrop-blur-sm border-b border-slate-700 px-4 py-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <span className="text-xl">👨</span>
                  </div>
                  <div>
                    <p className="font-semibold text-white">Dad</p>
                    <p className="text-xs text-gray-400">{story.topic}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 bg-amber-900/30 px-3 py-1 rounded-full">
                  <span className="text-lg">🥥</span>
                  <span className="text-amber-400 text-sm font-medium">Round {kavaRounds}</span>
                </div>
              </div>
            </div>

            {/* Tanoa (kava bowl) scene */}
            <div className="px-4 py-6 flex justify-center">
              <motion.div
                animate={{ scale: [1, 1.02, 1] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="relative"
              >
                <div className="w-32 h-32 rounded-full bg-gradient-to-b from-amber-800 to-amber-950 flex items-center justify-center shadow-2xl border-4 border-amber-700">
                  <div className="w-24 h-24 rounded-full bg-amber-900/50 flex items-center justify-center">
                    <motion.div
                      animate={{ opacity: [0.5, 0.8, 0.5] }}
                      transition={{ duration: 2, repeat: Infinity }}
                      className="text-3xl"
                    >
                      🥥
                    </motion.div>
                  </div>
                </div>
                <p className="text-center text-amber-500/60 text-xs mt-2">Tanoa</p>
              </motion.div>
            </div>

            {/* Dad's Story */}
            <div className="flex-1 px-4">
              <motion.div
                key={currentSegmentIndex}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-slate-700/50 rounded-2xl p-5 mb-4"
              >
                <p className="text-xl text-white font-medium leading-relaxed">
                  {currentSegment.dadSays.fijiHindi}
                </p>
                <p className="text-gray-400 mt-3">
                  {currentSegment.dadSays.english}
                </p>
              </motion.div>

              {/* Proverb highlight */}
              {currentSegment.proverb && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.3 }}
                  className="bg-amber-900/30 border border-amber-700/50 rounded-xl p-4 mb-4"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-lg">📜</span>
                    <span className="text-amber-400 text-sm font-medium">Fiji Proverb</span>
                  </div>
                  <p className="text-amber-200 font-medium italic">
                    &quot;{currentSegment.proverb.fijiHindi}&quot;
                  </p>
                  <p className="text-gray-400 text-sm mt-1">
                    {currentSegment.proverb.english}
                  </p>
                  <p className="text-gray-500 text-xs mt-2">
                    💡 {currentSegment.proverb.meaning}
                  </p>
                </motion.div>
              )}

              {/* Cultural note toggle */}
              {currentSegment.culturalNote && (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  onClick={() => setShowCulturalNote(!showCulturalNote)}
                  className="w-full bg-slate-700/30 rounded-xl p-3 flex items-center justify-between mb-4"
                >
                  <div className="flex items-center gap-2">
                    <span className="text-lg">🏝️</span>
                    <span className="text-gray-300 text-sm">{currentSegment.culturalNote.title}</span>
                  </div>
                  <motion.span
                    animate={{ rotate: showCulturalNote ? 180 : 0 }}
                    className="text-gray-400"
                  >
                    ▼
                  </motion.span>
                </motion.button>
              )}

              <AnimatePresence>
                {showCulturalNote && currentSegment.culturalNote && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="bg-slate-600/30 rounded-xl p-4">
                      <p className="text-gray-300 text-sm leading-relaxed">
                        {currentSegment.culturalNote.content}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Response Options or Continue */}
            <div className="px-4 pb-6">
              {currentSegment.userResponses ? (
                <div className="space-y-2">
                  <p className="text-gray-500 text-sm mb-2">Your response:</p>
                  {currentSegment.userResponses.map((resp, index) => (
                    <motion.button
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      onClick={() => handleResponse(resp)}
                      className="w-full p-4 bg-slate-700 hover:bg-slate-600 rounded-xl text-left transition-colors"
                    >
                      <p className="text-white font-medium">{resp.fijiHindi}</p>
                      <p className="text-gray-400 text-sm">{resp.english}</p>
                    </motion.button>
                  ))}
                </div>
              ) : (
                <motion.button
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  onClick={handleAnotherRound}
                  className="w-full py-4 bg-amber-700 hover:bg-amber-600 text-white font-semibold rounded-xl flex items-center justify-center gap-2 transition-colors"
                >
                  <span className="text-xl">🥥</span>
                  {isLastSegment ? "Finish" : "Another Round?"}
                </motion.button>
              )}
            </div>
          </motion.div>
        )}

        {/* Result Phase */}
        {phase === "result" && (
          <motion.div
            key="result"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center min-h-screen px-4 text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", bounce: 0.5 }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-5xl">🌙</span>
              <span className="text-5xl">🥥</span>
              <span className="text-5xl">👨</span>
            </motion.div>

            <h1 className="text-3xl font-bold text-white mb-2">
              Vinaka, Beta
            </h1>
            <p className="text-gray-400 mb-2">Thank you, son/daughter</p>
            <p className="text-gray-500 mb-8">
              A peaceful evening with Dad
            </p>

            <div className="bg-slate-700/50 rounded-2xl p-6 w-full max-w-sm">
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Stories Heard</span>
                <span className="font-bold text-amber-400">{story.segments.length}</span>
              </div>
              <div className="flex justify-between mb-4">
                <span className="text-gray-400">Kava Rounds</span>
                <span className="font-bold text-amber-400">{kavaRounds}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-400">Proverbs Learned</span>
                <span className="font-bold text-amber-400">{proverbsLearned.length}</span>
              </div>
            </div>

            {proverbsLearned.length > 0 && (
              <div className="mt-6 w-full max-w-sm">
                <p className="text-sm text-gray-500 mb-3">Wisdom from Dad:</p>
                {proverbsLearned.map((proverb, i) => (
                  <div key={i} className="bg-amber-900/20 rounded-xl p-3 mb-2">
                    <p className="text-amber-300 text-sm italic">&quot;{proverb}&quot;</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
