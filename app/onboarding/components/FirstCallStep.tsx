"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Button from "@/components/ui/Button";
import { speakFijiHindi } from "@/lib/audio";

interface FirstCallStepProps {
  onComplete: (phrasesLearned: string[], userName?: string) => void;
  userName?: string;
  askForName?: boolean;
}

interface DialogueExchange {
  id: string;
  speaker: "nani" | "user";
  fijiHindi: string;
  english: string;
  options?: {
    fijiHindi: string;
    english: string;
  }[];
}

const FIRST_CALL_DIALOGUE: DialogueExchange[] = [
  {
    id: "1",
    speaker: "nani",
    fijiHindi: "Namaste beta! Kaise ho?",
    english: "Hello dear! How are you?",
  },
  {
    id: "2",
    speaker: "user",
    fijiHindi: "",
    english: "",
    options: [
      { fijiHindi: "Namaste Nani! Mein theek hoon.", english: "Hello Nani! I am fine." },
      { fijiHindi: "Namaste! Bahut achchha hoon.", english: "Hello! I am very good." },
      { fijiHindi: "Nani! Mein khush hoon.", english: "Nani! I am happy." },
    ],
  },
  {
    id: "3",
    speaker: "nani",
    fijiHindi: "Bahut achchha! Tum Fiji Hindi seekhna chahte ho?",
    english: "Very good! You want to learn Fiji Hindi?",
  },
  {
    id: "4",
    speaker: "user",
    fijiHindi: "",
    english: "",
    options: [
      { fijiHindi: "Haan Nani, mein seekhna chahta hoon.", english: "Yes Nani, I want to learn." },
      { fijiHindi: "Bilkul! Sikhaao mujhe.", english: "Absolutely! Teach me." },
      { fijiHindi: "Haan, please sikhaao.", english: "Yes, please teach." },
    ],
  },
  {
    id: "5",
    speaker: "nani",
    fijiHindi: "Achchha beta! Hum roz baat karenge. Ab phone rakh do, phir milenge!",
    english: "Good dear! We will talk every day. Hang up now, see you later!",
  },
  {
    id: "6",
    speaker: "user",
    fijiHindi: "",
    english: "",
    options: [
      { fijiHindi: "Theek hai Nani, phir milenge!", english: "Okay Nani, see you later!" },
      { fijiHindi: "Dhanyavaad Nani!", english: "Thank you Nani!" },
      { fijiHindi: "Bye Nani, kal baat karenge!", english: "Bye Nani, we'll talk tomorrow!" },
    ],
  },
];

type CallPhase = "intro" | "ringing" | "call" | "summary";

export default function FirstCallStep({ onComplete, userName: initialUserName, askForName }: FirstCallStepProps) {
  const [phase, setPhase] = useState<CallPhase>(askForName ? "intro" : "ringing");
  const [userName, setUserName] = useState(initialUserName || "");
  const [currentExchangeIndex, setCurrentExchangeIndex] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [isNaniSpeaking, setIsNaniSpeaking] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [callDuration, setCallDuration] = useState(0);

  // Call timer
  useEffect(() => {
    if (phase === "call") {
      const timer = setInterval(() => {
        setCallDuration((prev) => prev + 1);
      }, 1000);
      return () => clearInterval(timer);
    }
  }, [phase]);

  // Handle Nani speaking
  useEffect(() => {
    if (phase === "call") {
      const exchange = FIRST_CALL_DIALOGUE[currentExchangeIndex];
      if (exchange?.speaker === "nani") {
        setIsNaniSpeaking(true);
        setShowOptions(false);

        // Personalize the greeting
        let text = exchange.fijiHindi;
        if (currentExchangeIndex === 0 && userName) {
          text = `Namaste ${userName}! Kaise ho?`;
        }

        speakFijiHindi(text, {
          onEnd: () => {
            setIsNaniSpeaking(false);
            // If next is user response, show options
            const nextExchange = FIRST_CALL_DIALOGUE[currentExchangeIndex + 1];
            if (nextExchange?.speaker === "user") {
              setCurrentExchangeIndex((prev) => prev + 1);
              setShowOptions(true);
            } else if (currentExchangeIndex === FIRST_CALL_DIALOGUE.length - 1) {
              // End of conversation
              setTimeout(() => setPhase("summary"), 1500);
            }
          },
          onError: () => {
            setIsNaniSpeaking(false);
            const nextExchange = FIRST_CALL_DIALOGUE[currentExchangeIndex + 1];
            if (nextExchange?.speaker === "user") {
              setCurrentExchangeIndex((prev) => prev + 1);
              setShowOptions(true);
            }
          },
        });
      }
    }
  }, [phase, currentExchangeIndex, userName]);

  const handleAnswerCall = () => {
    setPhase("call");
  };

  const handleSelectResponse = (response: { fijiHindi: string; english: string }) => {
    setSelectedResponses((prev) => [...prev, response.fijiHindi]);
    setShowOptions(false);

    // Speak the user's response
    speakFijiHindi(response.fijiHindi, {
      onEnd: () => {
        // Move to next exchange
        const nextIndex = currentExchangeIndex + 1;
        if (nextIndex < FIRST_CALL_DIALOGUE.length) {
          setCurrentExchangeIndex(nextIndex);
        } else {
          setTimeout(() => setPhase("summary"), 1000);
        }
      },
      onError: () => {
        const nextIndex = currentExchangeIndex + 1;
        if (nextIndex < FIRST_CALL_DIALOGUE.length) {
          setCurrentExchangeIndex(nextIndex);
        } else {
          setTimeout(() => setPhase("summary"), 1000);
        }
      },
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const phrasesLearned = [
    "Namaste - Hello",
    "Kaise ho? - How are you?",
    "Mein theek hoon - I am fine",
    "Bahut achchha - Very good",
    "Phir milenge - See you later",
  ];

  const handleStartCall = () => {
    if (userName.trim()) {
      setPhase("ringing");
    }
  };

  // Intro Phase - Ask for name
  if (phase === "intro") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <span className="text-6xl mb-4 block">👵</span>
          <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
            Before Nani Calls...
          </h2>
          <p className="text-gray-500 dark:text-gray-400">
            What should Nani call you?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-xs"
        >
          <input
            type="text"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder="Your name"
            className="w-full px-4 py-3 text-lg text-center border-2 border-gray-200 dark:border-gray-700 rounded-xl focus:border-primary focus:outline-none bg-white dark:bg-gray-800 text-charcoal dark:text-white"
            autoFocus
            onKeyDown={(e) => {
              if (e.key === "Enter" && userName.trim()) {
                handleStartCall();
              }
            }}
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mt-8 w-full max-w-xs"
        >
          <Button
            onClick={handleStartCall}
            disabled={!userName.trim()}
            size="lg"
            fullWidth
          >
            Ready for Nani&apos;s Call
          </Button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-6 text-sm text-gray-400"
        >
          Nani loves knowing your name!
        </motion.p>
      </motion.div>
    );
  }

  // Ringing Phase
  if (phase === "ringing") {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col items-center justify-center min-h-[80vh] px-4 text-center bg-gradient-to-b from-green-50 to-white dark:from-gray-900 dark:to-gray-800"
      >
        {/* Incoming call UI */}
        <motion.div
          animate={{
            scale: [1, 1.05, 1],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
          }}
          className="mb-8"
        >
          <div className="w-32 h-32 rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center shadow-xl">
            <span className="text-6xl">👵</span>
          </div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2"
        >
          Nani
        </motion.h2>

        <motion.p
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="text-gray-500 dark:text-gray-400 mb-12"
        >
          Incoming call...
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex gap-6"
        >
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={handleAnswerCall}
            className="w-16 h-16 rounded-full bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/30"
          >
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
          </motion.button>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="mt-8 text-sm text-gray-400"
        >
          Your first conversation awaits!
        </motion.p>
      </motion.div>
    );
  }

  // Call Phase
  if (phase === "call") {
    const currentExchange = FIRST_CALL_DIALOGUE[currentExchangeIndex];

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="flex flex-col min-h-[80vh] px-4"
      >
        {/* Call header */}
        <div className="text-center py-6 border-b border-gray-100 dark:border-gray-800">
          <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-600 dark:to-gray-700 flex items-center justify-center mb-3">
            <span className="text-4xl">👵</span>
          </div>
          <h3 className="font-heading font-bold text-charcoal dark:text-white">
            Nani
          </h3>
          <p className="text-sm text-green-500">{formatTime(callDuration)}</p>
        </div>

        {/* Chat area */}
        <div className="flex-1 py-6 overflow-y-auto">
          <AnimatePresence mode="wait">
            {currentExchange?.speaker === "nani" && (
              <motion.div
                key={currentExchange.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="flex gap-3 mb-4"
              >
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👵</span>
                </div>
                <div className="flex-1">
                  <div className="bg-white dark:bg-gray-800 rounded-2xl rounded-tl-none p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <p className="text-lg font-medium text-charcoal dark:text-white mb-1">
                      {currentExchangeIndex === 0 && userName
                        ? `Namaste ${userName}! Kaise ho?`
                        : currentExchange.fijiHindi}
                    </p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {currentExchangeIndex === 0 && userName
                        ? `Hello ${userName}! How are you?`
                        : currentExchange.english}
                    </p>
                  </div>
                  {isNaniSpeaking && (
                    <motion.div
                      animate={{ opacity: [0.5, 1, 0.5] }}
                      transition={{ duration: 1, repeat: Infinity }}
                      className="mt-2 text-xs text-primary"
                    >
                      Speaking...
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Response options */}
        <AnimatePresence>
          {showOptions && currentExchange?.options && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              className="pb-6 space-y-3"
            >
              <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-3">
                Tap to respond:
              </p>
              {currentExchange.options.map((option, index) => (
                <motion.button
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleSelectResponse(option)}
                  className="w-full p-4 bg-primary/10 hover:bg-primary/20 rounded-2xl text-left transition-colors border border-primary/20"
                >
                  <p className="font-medium text-charcoal dark:text-white">
                    {option.fijiHindi}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {option.english}
                  </p>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    );
  }

  // Summary Phase
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-[80vh] px-4 py-8"
    >
      {/* Success header */}
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 15 }}
        className="text-center mb-8"
      >
        <div className="w-20 h-20 mx-auto rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mb-4">
          <span className="text-4xl">🎉</span>
        </div>
        <h2 className="text-2xl font-heading font-bold text-charcoal dark:text-white mb-2">
          First Call Complete!
        </h2>
        <p className="text-gray-500 dark:text-gray-400">
          You just had your first conversation with Nani
        </p>
      </motion.div>

      {/* Call stats */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="flex justify-center gap-8 mb-8"
      >
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{formatTime(callDuration)}</p>
          <p className="text-sm text-gray-500">Call duration</p>
        </div>
        <div className="text-center">
          <p className="text-2xl font-bold text-primary">{phrasesLearned.length}</p>
          <p className="text-sm text-gray-500">Phrases learned</p>
        </div>
      </motion.div>

      {/* Phrases learned */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="flex-1"
      >
        <h3 className="text-sm font-semibold text-gray-600 dark:text-gray-400 uppercase tracking-wide mb-4">
          Phrases You Learned
        </h3>
        <div className="space-y-3">
          {phrasesLearned.map((phrase, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 + index * 0.1 }}
              className="flex items-center gap-3 p-3 bg-white dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
            >
              <div className="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center">
                <svg className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <p className="text-charcoal dark:text-white">{phrase}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Continue button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="mt-8"
      >
        <Button
          onClick={() => onComplete(phrasesLearned, userName)}
          size="lg"
          fullWidth
        >
          Start Learning
        </Button>
      </motion.div>
    </motion.div>
  );
}
