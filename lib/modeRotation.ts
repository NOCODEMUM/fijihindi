// Mode rotation algorithm for lesson selection
// Rules:
// 1. Never show 3 of the same mode in a row
// 2. Nani appears at least 30% of the time (after week 1)
// 3. New modes unlock based on week number

import { LessonModeId, getAvailableModes, LESSON_MODES } from "./constants";

interface LessonHistory {
  modeId: LessonModeId;
  timestamp: number;
}

// Get the user's current week (1-indexed, starting from first lesson)
export function getCurrentWeek(firstLessonDate: string | null): number {
  if (!firstLessonDate) return 1;

  const start = new Date(firstLessonDate);
  const now = new Date();
  const diffTime = now.getTime() - start.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;

  return Math.max(1, week);
}

// Check if a mode would violate the "no 3 in a row" rule
function wouldViolateConsecutiveRule(
  modeId: LessonModeId,
  history: LessonHistory[]
): boolean {
  if (history.length < 2) return false;

  const lastTwo = history.slice(-2);
  return lastTwo.every((h) => h.modeId === modeId);
}

// Calculate mode frequency from history
function calculateModeFrequency(
  modeId: LessonModeId,
  history: LessonHistory[],
  windowSize: number = 10
): number {
  if (history.length === 0) return 0;

  const recentHistory = history.slice(-windowSize);
  const modeCount = recentHistory.filter((h) => h.modeId === modeId).length;

  return modeCount / recentHistory.length;
}

// Select the next lesson mode
export function selectNextMode(
  history: LessonHistory[],
  weekNumber: number
): LessonModeId {
  const availableModes = getAvailableModes(weekNumber);

  // Filter out modes that would violate consecutive rule
  let candidateModes = availableModes.filter(
    (mode) => !wouldViolateConsecutiveRule(mode.id, history)
  );

  // If all modes are filtered out (shouldn't happen), allow any
  if (candidateModes.length === 0) {
    candidateModes = availableModes;
  }

  // Check if Nani is below minimum frequency
  const naniFrequency = calculateModeFrequency("nani-calling", history);
  const naniMode = LESSON_MODES["nani-calling"];

  if (
    naniFrequency < naniMode.minFrequency &&
    !wouldViolateConsecutiveRule("nani-calling", history)
  ) {
    // Boost Nani probability
    const naniWeight = 0.6; // 60% chance to pick Nani when below threshold
    if (Math.random() < naniWeight) {
      return "nani-calling";
    }
  }

  // Weighted random selection based on mode availability
  // Give slightly higher weight to modes that haven't been seen recently
  const weights = candidateModes.map((mode) => {
    const frequency = calculateModeFrequency(mode.id, history);
    // Lower frequency = higher weight (inverse relationship)
    return Math.max(0.1, 1 - frequency);
  });

  const totalWeight = weights.reduce((sum, w) => sum + w, 0);
  let random = Math.random() * totalWeight;

  for (let i = 0; i < candidateModes.length; i++) {
    random -= weights[i];
    if (random <= 0) {
      return candidateModes[i].id;
    }
  }

  // Fallback to first candidate
  return candidateModes[0].id;
}

// Get recommended mode for user (considers user preferences too)
export function getRecommendedMode(
  history: LessonHistory[],
  firstLessonDate: string | null,
  preferredModeId?: LessonModeId
): LessonModeId {
  const weekNumber = getCurrentWeek(firstLessonDate);

  // If user has a preference and it's available, use it sometimes
  if (preferredModeId) {
    const preferredMode = LESSON_MODES[preferredModeId];
    if (
      preferredMode &&
      preferredMode.unlockWeek <= weekNumber &&
      !wouldViolateConsecutiveRule(preferredModeId, history)
    ) {
      // 40% chance to honor user preference
      if (Math.random() < 0.4) {
        return preferredModeId;
      }
    }
  }

  return selectNextMode(history, weekNumber);
}

// Save lesson to history (localStorage)
export function recordLessonMode(modeId: LessonModeId): void {
  if (typeof window === "undefined") return;

  const historyJson = localStorage.getItem("fijihindi_mode_history");
  const history: LessonHistory[] = historyJson ? JSON.parse(historyJson) : [];

  history.push({
    modeId,
    timestamp: Date.now(),
  });

  // Keep only last 50 entries
  const trimmedHistory = history.slice(-50);
  localStorage.setItem("fijihindi_mode_history", JSON.stringify(trimmedHistory));
}

// Get lesson history from localStorage
export function getLessonHistory(): LessonHistory[] {
  if (typeof window === "undefined") return [];

  const historyJson = localStorage.getItem("fijihindi_mode_history");
  return historyJson ? JSON.parse(historyJson) : [];
}

// Get user's first lesson date
export function getFirstLessonDate(): string | null {
  if (typeof window === "undefined") return null;

  return localStorage.getItem("fijihindi_first_lesson_date");
}

// Set first lesson date (call on completing first lesson)
export function setFirstLessonDate(): void {
  if (typeof window === "undefined") return;

  if (!localStorage.getItem("fijihindi_first_lesson_date")) {
    localStorage.setItem(
      "fijihindi_first_lesson_date",
      new Date().toISOString()
    );
  }
}
