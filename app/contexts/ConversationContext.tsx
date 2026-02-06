"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { getAllConversations, Conversation } from "@/data/conversations/intro-greeting";

interface Progress {
  conversationsCompleted: string[];
  phrasesLearned: string[];
  currentStreak: number;
  longestStreak: number;
  lastActivityDate: string | null;
  totalCalls: number;
}

interface ConversationContextType {
  conversations: Conversation[];
  progress: Progress;
  updateProgress: (updates: Partial<Progress>) => void;
  completeConversation: (conversationId: string, phrasesLearned: string[]) => void;
  getNextConversation: () => Conversation | null;
  isConversationCompleted: (conversationId: string) => boolean;
  resetProgress: () => void;
}

const defaultProgress: Progress = {
  conversationsCompleted: [],
  phrasesLearned: [],
  currentStreak: 0,
  longestStreak: 0,
  lastActivityDate: null,
  totalCalls: 0,
};

const ConversationContext = createContext<ConversationContextType | undefined>(undefined);

export function ConversationProvider({ children }: { children: ReactNode }) {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [progress, setProgress] = useState<Progress>(defaultProgress);

  // Load data on mount
  useEffect(() => {
    // Load conversations
    setConversations(getAllConversations());

    // Load progress from localStorage
    const storedProgress = localStorage.getItem("fijihindi_progress");
    if (storedProgress) {
      setProgress(JSON.parse(storedProgress));
    }
  }, []);

  // Persist progress to localStorage
  useEffect(() => {
    if (progress !== defaultProgress) {
      localStorage.setItem("fijihindi_progress", JSON.stringify(progress));
    }
  }, [progress]);

  const updateProgress = (updates: Partial<Progress>) => {
    setProgress((prev) => ({ ...prev, ...updates }));
  };

  const completeConversation = (conversationId: string, phrasesLearned: string[]) => {
    const today = new Date().toISOString().split("T")[0];

    setProgress((prev) => {
      // Check if already completed
      const alreadyCompleted = prev.conversationsCompleted.includes(conversationId);

      // Calculate streak
      let newStreak = prev.currentStreak;
      if (prev.lastActivityDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (prev.lastActivityDate === yesterdayStr) {
          newStreak = prev.currentStreak + 1;
        } else if (prev.lastActivityDate !== today) {
          newStreak = 1;
        }
      }

      // Update longest streak
      const newLongestStreak = Math.max(newStreak, prev.longestStreak);

      // Add new phrases (avoiding duplicates)
      const existingPhrases = new Set(prev.phrasesLearned);
      const newPhrases = phrasesLearned.filter((p) => !existingPhrases.has(p));

      return {
        ...prev,
        conversationsCompleted: alreadyCompleted
          ? prev.conversationsCompleted
          : [...prev.conversationsCompleted, conversationId],
        phrasesLearned: [...prev.phrasesLearned, ...newPhrases],
        currentStreak: newStreak,
        longestStreak: newLongestStreak,
        lastActivityDate: today,
        totalCalls: prev.totalCalls + 1,
      };
    });
  };

  const getNextConversation = (): Conversation | null => {
    const incomplete = conversations.find(
      (c) => !progress.conversationsCompleted.includes(c.id)
    );
    return incomplete || null;
  };

  const isConversationCompleted = (conversationId: string): boolean => {
    return progress.conversationsCompleted.includes(conversationId);
  };

  const resetProgress = () => {
    setProgress(defaultProgress);
    localStorage.removeItem("fijihindi_progress");
  };

  return (
    <ConversationContext.Provider
      value={{
        conversations,
        progress,
        updateProgress,
        completeConversation,
        getNextConversation,
        isConversationCompleted,
        resetProgress,
      }}
    >
      {children}
    </ConversationContext.Provider>
  );
}

export function useConversation() {
  const context = useContext(ConversationContext);
  if (context === undefined) {
    throw new Error("useConversation must be used within a ConversationProvider");
  }
  return context;
}
