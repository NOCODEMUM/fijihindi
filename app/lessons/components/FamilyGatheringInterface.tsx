"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface FamilyMemberChar {
  id: string;
  name: string;
  emoji: string;
  relationship: string;
  position: { x: number; y: number };
  talked: boolean;
}

interface GatheringExchange {
  memberId: string;
  dialogue: {
    speaker: "relative" | "user";
    fijiHindi: string;
    english: string;
    options?: { fijiHindi: string; english: string }[];
  }[];
}

interface GatheringScenario {
  id: string;
  title: string;
  description: string;
  members: FamilyMemberChar[];
  exchanges: GatheringExchange[];
  phrases: string[];
}

interface FamilyGatheringInterfaceProps {
  scenario: GatheringScenario;
  onComplete: (result: {
    membersGreeted: number;
    totalMembers: number;
    phrasesUsed: string[];
  }) => void;
}

export default function FamilyGatheringInterface({
  scenario,
  onComplete,
}: FamilyGatheringInterfaceProps) {
  const [phase, setPhase] = useState<"intro" | "gathering" | "conversation" | "result">("intro");
  const [members, setMembers] = useState<FamilyMemberChar[]>(scenario.members);
  const [activeMember, setActiveMember] = useState<FamilyMemberChar | null>(null);
  const [currentDialogueIndex, setCurrentDialogueIndex] = useState(0);
  const [chatHistory, setChatHistory] = useState<{ speaker: string; fijiHindi: string; english: string }[]>([]);
  const [phrasesUsed, setPhrasesUsed] = useState<string[]>([]);

  const talkedCount = members.filter(m => m.talked).length;
  const totalMembers = members.length;

  useEffect(() => {
    // Auto transition from intro
    if (phase === "intro") {
      const timer = setTimeout(() => setPhase("gathering"), 2500);
      return () => clearTimeout(timer);
    }
  }, [phase]);

  const handleMemberTap = (member: FamilyMemberChar) => {
    if (member.talked) return;
    setActiveMember(member);
    setCurrentDialogueIndex(0);
    setChatHistory([]);
    setPhase("conversation");

    // Add first dialogue from relative
    const exchange = scenario.exchanges.find(e => e.memberId === member.id);
    if (exchange && exchange.dialogue[0]) {
      setChatHistory([{
        speaker: member.name,
        fijiHindi: exchange.dialogue[0].fijiHindi,
        english: exchange.dialogue[0].english,
      }]);
      setCurrentDialogueIndex(1);
    }
  };

  const handleSelectResponse = (response: { fijiHindi: string; english: string }) => {
    if (!activeMember) return;

    // Add user response to chat
    setChatHistory(prev => [...prev, {
      speaker: "You",
      fijiHindi: response.fijiHindi,
      english: response.english,
    }]);
    setPhrasesUsed(prev => [...prev, response.fijiHindi]);

    const exchange = scenario.exchanges.find(e => e.memberId === activeMember.id);
    if (!exchange) return;

    const nextIndex = currentDialogueIndex + 1;

    if (nextIndex < exchange.dialogue.length) {
      // Show next relative dialogue
      setTimeout(() => {
        const nextDialogue = exchange.dialogue[nextIndex];
        setChatHistory(prev => [...prev, {
          speaker: activeMember.name,
          fijiHindi: nextDialogue.fijiHindi,
          english: nextDialogue.english,
        }]);
        setCurrentDialogueIndex(nextIndex + 1);
      }, 800);
    } else {
      // Conversation complete with this member
      setTimeout(() => {
        setMembers(prev => prev.map(m =>
          m.id === activeMember.id ? { ...m, talked: true } : m
        ));
        setActiveMember(null);
        setPhase("gathering");

        // Check if all members talked to
        const newTalkedCount = talkedCount + 1;
        if (newTalkedCount >= totalMembers) {
          setTimeout(() => {
            setPhase("result");
            onComplete({
              membersGreeted: newTalkedCount,
              totalMembers,
              phrasesUsed,
            });
          }, 500);
        }
      }, 1000);
    }
  };

  const currentExchange = activeMember
    ? scenario.exchanges.find(e => e.memberId === activeMember.id)
    : null;
  const currentDialogue = currentExchange?.dialogue[currentDialogueIndex];

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-orange-50 dark:from-gray-900 dark:to-gray-800">
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
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 1, repeat: 2 }}
              className="text-7xl mb-6"
            >
              🎉
            </motion.div>
            <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-2">
              {scenario.title}
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              {scenario.description}
            </p>
            <p className="text-sm text-primary mt-4">
              Tap on family members to greet them!
            </p>
          </motion.div>
        )}

        {/* Gathering Phase - Party Scene */}
        {phase === "gathering" && (
          <motion.div
            key="gathering"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="font-semibold text-charcoal dark:text-white">Family Gathering</h2>
                  <p className="text-sm text-gray-500">Tap relatives to chat</p>
                </div>
                <div className="bg-primary/10 px-3 py-1 rounded-full">
                  <span className="text-primary font-bold">{talkedCount}/{totalMembers}</span>
                  <span className="text-gray-500 text-sm ml-1">greeted</span>
                </div>
              </div>
            </div>

            {/* Party Scene */}
            <div className="relative h-[70vh] overflow-hidden">
              {/* Background decorations */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute top-10 left-10 text-4xl">🎈</div>
                <div className="absolute top-20 right-20 text-4xl">🎊</div>
                <div className="absolute bottom-40 left-20 text-3xl">🍛</div>
                <div className="absolute bottom-30 right-10 text-3xl">🍲</div>
              </div>

              {/* Family Members */}
              {members.map((member, index) => (
                <motion.button
                  key={member.id}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.1 }}
                  onClick={() => handleMemberTap(member)}
                  disabled={member.talked}
                  className={`absolute transform -translate-x-1/2 -translate-y-1/2 ${
                    member.talked ? "opacity-50" : "hover:scale-110"
                  } transition-transform`}
                  style={{
                    left: `${member.position.x}%`,
                    top: `${member.position.y}%`,
                  }}
                >
                  <div className={`flex flex-col items-center ${!member.talked && "animate-bounce"}`}
                    style={{ animationDelay: `${index * 0.2}s`, animationDuration: "2s" }}
                  >
                    <div className={`w-16 h-16 rounded-full flex items-center justify-center text-3xl ${
                      member.talked
                        ? "bg-green-100 dark:bg-green-900/30"
                        : "bg-white dark:bg-gray-800 shadow-lg border-2 border-primary"
                    }`}>
                      {member.talked ? "✓" : member.emoji}
                    </div>
                    <span className={`mt-1 text-xs font-medium px-2 py-0.5 rounded-full ${
                      member.talked
                        ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
                        : "bg-white dark:bg-gray-800 text-charcoal dark:text-white shadow"
                    }`}>
                      {member.name}
                    </span>
                    {!member.talked && (
                      <span className="text-xs text-gray-500 mt-0.5">{member.relationship}</span>
                    )}
                  </div>
                </motion.button>
              ))}
            </div>

            {/* Hint */}
            <div className="px-4 pb-6 text-center">
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {talkedCount === 0
                  ? "Tap on a family member to start chatting!"
                  : talkedCount < totalMembers
                    ? `${totalMembers - talkedCount} more to greet!`
                    : "Great job!"
                }
              </p>
            </div>
          </motion.div>
        )}

        {/* Conversation Phase */}
        {phase === "conversation" && activeMember && (
          <motion.div
            key="conversation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="min-h-screen flex flex-col"
          >
            {/* Header */}
            <div className="sticky top-0 z-10 bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm px-4 py-3 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-xl">
                  {activeMember.emoji}
                </div>
                <div>
                  <p className="font-semibold text-charcoal dark:text-white">{activeMember.name}</p>
                  <p className="text-xs text-gray-500">{activeMember.relationship}</p>
                </div>
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 px-4 py-4 space-y-3 overflow-y-auto">
              {chatHistory.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex ${msg.speaker === "You" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`max-w-[80%] p-3 rounded-2xl ${
                    msg.speaker === "You"
                      ? "bg-primary text-white rounded-tr-none"
                      : "bg-white dark:bg-gray-800 rounded-tl-none shadow"
                  }`}>
                    <p className={`font-medium ${msg.speaker === "You" ? "text-white" : "text-charcoal dark:text-white"}`}>
                      {msg.fijiHindi}
                    </p>
                    <p className={`text-sm mt-1 ${msg.speaker === "You" ? "text-white/80" : "text-gray-500"}`}>
                      {msg.english}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Response Options */}
            {currentDialogue?.options && (
              <div className="px-4 pb-6 space-y-2">
                {currentDialogue.options.map((opt, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => handleSelectResponse(opt)}
                    className="w-full p-3 rounded-xl bg-white dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 hover:border-primary text-left transition-all"
                  >
                    <p className="font-medium text-charcoal dark:text-white">{opt.fijiHindi}</p>
                    <p className="text-sm text-gray-500">{opt.english}</p>
                  </motion.button>
                ))}
              </div>
            )}
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
              className="text-7xl mb-6"
            >
              🎊
            </motion.div>
            <h1 className="text-3xl font-bold text-charcoal dark:text-white mb-2">
              Party Success!
            </h1>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              You greeted everyone at the gathering!
            </p>

            <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 w-full max-w-sm shadow-lg">
              <div className="flex justify-between mb-4">
                <span className="text-gray-500">Family Greeted</span>
                <span className="font-bold text-primary">{talkedCount}/{totalMembers}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">Phrases Used</span>
                <span className="font-bold">{phrasesUsed.length}</span>
              </div>
            </div>

            {phrasesUsed.length > 0 && (
              <div className="mt-6 w-full max-w-sm">
                <p className="text-sm text-gray-500 mb-2">Phrases you practiced:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {Array.from(new Set(phrasesUsed)).slice(0, 6).map((phrase, i) => (
                    <span key={i} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm">
                      {phrase}
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
