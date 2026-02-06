"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import NaniAvatar from "./NaniAvatar";
import ResponseOptions from "./ResponseOptions";
import { speakFijiHindi } from "@/lib/audio";

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

interface CallInterfaceProps {
  dialogue: DialogueExchange[];
  userName?: string;
  onCallEnd: (duration: number, responses: string[]) => void;
  callerName?: string;
}

export default function CallInterface({
  dialogue,
  userName,
  onCallEnd,
  callerName = "Nani",
}: CallInterfaceProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isNaniSpeaking, setIsNaniSpeaking] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [selectedResponses, setSelectedResponses] = useState<string[]>([]);
  const [callDuration, setCallDuration] = useState(0);
  const [chatHistory, setChatHistory] = useState<{
    speaker: "nani" | "user";
    fijiHindi: string;
    english: string;
  }[]>([]);

  // Call timer
  useEffect(() => {
    const timer = setInterval(() => {
      setCallDuration((prev) => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Handle dialogue progression
  const processCurrentExchange = useCallback(() => {
    const exchange = dialogue[currentIndex];
    if (!exchange) {
      // End of conversation
      onCallEnd(callDuration, selectedResponses);
      return;
    }

    if (exchange.speaker === "nani") {
      setIsNaniSpeaking(true);
      setShowOptions(false);

      // Add to chat history
      setChatHistory((prev) => [...prev, {
        speaker: "nani",
        fijiHindi: exchange.fijiHindi,
        english: exchange.english,
      }]);

      // Personalize with username if first exchange
      let text = exchange.fijiHindi;
      if (currentIndex === 0 && userName && text.includes("beta")) {
        text = text.replace("beta", userName);
      }

      speakFijiHindi(text, {
        onEnd: () => {
          setIsNaniSpeaking(false);
          // Check if next is user turn
          const nextExchange = dialogue[currentIndex + 1];
          if (nextExchange?.speaker === "user" && nextExchange.options) {
            setCurrentIndex((prev) => prev + 1);
            setShowOptions(true);
          } else if (!nextExchange) {
            // End call after last nani message
            setTimeout(() => {
              onCallEnd(callDuration, selectedResponses);
            }, 1500);
          } else {
            setCurrentIndex((prev) => prev + 1);
          }
        },
        onError: () => {
          setIsNaniSpeaking(false);
          const nextExchange = dialogue[currentIndex + 1];
          if (nextExchange?.speaker === "user" && nextExchange.options) {
            setCurrentIndex((prev) => prev + 1);
            setShowOptions(true);
          } else {
            setCurrentIndex((prev) => prev + 1);
          }
        },
      });
    } else if (exchange.speaker === "user" && exchange.options) {
      setShowOptions(true);
    }
  }, [currentIndex, dialogue, userName, callDuration, selectedResponses, onCallEnd]);

  useEffect(() => {
    processCurrentExchange();
  }, [currentIndex]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleSelectResponse = (response: { fijiHindi: string; english: string }) => {
    setSelectedResponses((prev) => [...prev, response.fijiHindi]);
    setShowOptions(false);

    // Add user response to chat history
    setChatHistory((prev) => [...prev, {
      speaker: "user",
      fijiHindi: response.fijiHindi,
      english: response.english,
    }]);

    // Speak the user's response
    speakFijiHindi(response.fijiHindi, {
      onEnd: () => {
        // Move to next exchange
        setCurrentIndex((prev) => prev + 1);
      },
      onError: () => {
        setCurrentIndex((prev) => prev + 1);
      },
    });
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const currentExchange = dialogue[currentIndex];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen"
    >
      {/* Call header */}
      <div className="text-center py-4 border-b border-gray-100 dark:border-gray-800 bg-white/80 dark:bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <NaniAvatar size="sm" isSpeaking={isNaniSpeaking} showName={false} />
        <p className="text-sm font-medium text-charcoal dark:text-white mt-1">{callerName}</p>
        <p className="text-xs text-green-500">{formatTime(callDuration)}</p>
      </div>

      {/* Chat area */}
      <div className="flex-1 px-4 py-6 overflow-y-auto space-y-4">
        <AnimatePresence>
          {chatHistory.map((message, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`flex gap-3 ${message.speaker === "user" ? "flex-row-reverse" : ""}`}
            >
              {message.speaker === "nani" && (
                <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👵</span>
                </div>
              )}
              <div
                className={`
                  max-w-[80%] rounded-2xl p-4 shadow-sm border
                  ${message.speaker === "nani"
                    ? "bg-white dark:bg-gray-800 border-gray-100 dark:border-gray-700 rounded-tl-none"
                    : "bg-primary text-white border-primary rounded-tr-none"
                  }
                `}
              >
                <p className={`text-lg font-medium ${message.speaker === "user" ? "text-white" : "text-charcoal dark:text-white"}`}>
                  {message.fijiHindi}
                </p>
                <p className={`text-sm mt-1 ${message.speaker === "user" ? "text-white/80" : "text-gray-500 dark:text-gray-400"}`}>
                  {message.english}
                </p>
              </div>
              {message.speaker === "user" && (
                <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl">👤</span>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Speaking indicator */}
        {isNaniSpeaking && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-3"
          >
            <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center flex-shrink-0">
              <span className="text-xl">👵</span>
            </div>
            <div className="bg-white dark:bg-gray-800 border border-gray-100 dark:border-gray-700 rounded-2xl rounded-tl-none p-4 shadow-sm">
              <motion.div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    animate={{ y: [0, -5, 0] }}
                    transition={{
                      duration: 0.5,
                      repeat: Infinity,
                      delay: i * 0.1,
                    }}
                    className="w-2 h-2 rounded-full bg-gray-400"
                  />
                ))}
              </motion.div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Response options */}
      <AnimatePresence>
        {showOptions && currentExchange?.options && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="px-4 pb-8 bg-gradient-to-t from-white dark:from-gray-900 pt-4"
          >
            <ResponseOptions
              options={currentExchange.options}
              onSelect={handleSelectResponse}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* End call button */}
      <div className="px-4 pb-8 flex justify-center">
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          onClick={() => onCallEnd(callDuration, selectedResponses)}
          className="w-14 h-14 rounded-full bg-red-500 flex items-center justify-center text-white shadow-lg shadow-red-500/30"
        >
          <svg className="w-6 h-6 rotate-[135deg]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
          </svg>
        </motion.button>
      </div>
    </motion.div>
  );
}
