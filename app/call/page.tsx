"use client";

import { Suspense, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import PhoneRinging from "./components/PhoneRinging";
import CallInterface from "./components/CallInterface";
import CallSummary from "./components/CallSummary";
import { CONVERSATIONS, Conversation } from "@/data/conversations/intro-greeting";
import { Faith } from "@/data/relationships";
import { getCallerName, applyFaithTerms } from "@/lib/faithTerms";

type CallPhase = "ringing" | "call" | "summary";

function CallPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const conversationId = searchParams.get("id") || "intro-greeting";

  const [phase, setPhase] = useState<CallPhase>("ringing");
  const [callDuration, setCallDuration] = useState(0);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [userResponses, setUserResponses] = useState<string[]>([]);
  const [conversation, setConversation] = useState<Conversation | null>(null);
  const [userName, setUserName] = useState("");
  const [userFaith, setUserFaith] = useState<Faith>("hindu");

  // Load conversation and user data
  useEffect(() => {
    // Load user name and faith
    const stored = localStorage.getItem("fijihindi_user");
    if (stored) {
      const user = JSON.parse(stored);
      setUserName(user.name || "");
      setUserFaith((user.faith as Faith) || "hindu");
    }

    // Load conversation
    const conv = CONVERSATIONS.find((c) => c.id === conversationId);
    if (conv) {
      setConversation(conv);
    } else {
      // Default to intro greeting if not found
      setConversation(CONVERSATIONS[0]);
    }
  }, [conversationId]);

  const handleAnswer = () => {
    setPhase("call");
  };

  const handleDecline = () => {
    router.back();
  };

  const handleCallEnd = (duration: number, responses: string[]) => {
    setCallDuration(duration);
    setUserResponses(responses);
    setPhase("summary");

    // Update progress in localStorage
    if (typeof window !== "undefined" && conversation) {
      const progressStr = localStorage.getItem("fijihindi_progress");
      const progress = progressStr ? JSON.parse(progressStr) : {
        conversationsCompleted: [],
        phrasesLearned: [],
        currentStreak: 0,
        lastActivityDate: null,
        totalCalls: 0,
      };

      // Add conversation to completed
      if (!progress.conversationsCompleted.includes(conversation.id)) {
        progress.conversationsCompleted.push(conversation.id);
      }

      // Add phrases learned
      const newPhrases = conversation.phrases.filter(
        (p: string) => !progress.phrasesLearned.includes(p)
      );
      progress.phrasesLearned.push(...newPhrases);

      // Update streak
      const today = new Date().toISOString().split("T")[0];
      if (progress.lastActivityDate !== today) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const yesterdayStr = yesterday.toISOString().split("T")[0];

        if (progress.lastActivityDate === yesterdayStr) {
          progress.currentStreak += 1;
        } else if (progress.lastActivityDate !== today) {
          progress.currentStreak = 1;
        }
        progress.lastActivityDate = today;
      }

      // Increment total calls
      progress.totalCalls += 1;

      localStorage.setItem("fijihindi_progress", JSON.stringify(progress));
    }
  };

  const handleContinue = () => {
    router.push("/dashboard");
  };

  const handleRepeat = () => {
    setPhase("ringing");
    setCallDuration(0);
    setUserResponses([]);
  };

  if (!conversation) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
        <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // Get faith-aware caller name
  const callerName = getCallerName("nani", userFaith);

  // Transform dialogue with faith-specific terms
  const faithDialogue = conversation.dialogue.map((exchange) => ({
    ...exchange,
    fijiHindi: applyFaithTerms(exchange.fijiHindi, userFaith),
    options: exchange.options?.map((opt) => ({
      ...opt,
      fijiHindi: applyFaithTerms(opt.fijiHindi, userFaith),
    })),
  }));

  if (phase === "ringing") {
    return (
      <PhoneRinging
        callerName={callerName}
        onAnswer={handleAnswer}
        onDecline={handleDecline}
      />
    );
  }

  if (phase === "call") {
    return (
      <CallInterface
        dialogue={faithDialogue}
        userName={userName}
        onCallEnd={handleCallEnd}
        callerName={callerName}
      />
    );
  }

  return (
    <CallSummary
      conversationTitle={conversation.title}
      duration={callDuration}
      phrasesLearned={conversation.phrases}
      onContinue={handleContinue}
      onRepeat={handleRepeat}
    />
  );
}

export default function CallPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-background-light dark:bg-background-dark">
          <div className="w-12 h-12 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      }
    >
      <CallPageContent />
    </Suspense>
  );
}
