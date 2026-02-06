// Utility to apply faith-based terms to conversations
// This transforms generic terms to faith-specific ones

import { Faith, RELATIONSHIPS, getTermForFaith } from "@/data/relationships";
import { GREETINGS, getGreetingForFaith } from "@/data/greetings";

// Map of generic terms to relationship IDs
const TERM_MAPPINGS: Record<string, string> = {
  // Grandparents
  "Nani": "nani",
  "Nana": "nana",
  "Dadi": "dadi",
  "Dada": "dada",
  // Parents
  "Maa": "mother",
  "Mai": "mother",
  "Baap": "father",
  "Papa": "father",
  // Aunts/Uncles
  "Aunty": "mausi", // Default to mausi, context would determine
  "Uncle": "mama",
  "Chacha": "chacha",
  "Chachi": "chachi",
  "Mama": "mama",
  "Mami": "mami",
  "Mausi": "mausi",
  "Bua": "bua",
  // Siblings
  "Bhai": "brother",
  "Bahin": "sister",
  "Didi": "elderSister",
  "Bhaiya": "elderBrother",
};

// Map of generic greeting terms to greeting IDs
const GREETING_MAPPINGS: Record<string, string> = {
  "Namaste": "hello",
  "Namaskar": "hello",
  "Dhanyabad": "thankYou",
  "Shukriya": "thankYou",
  "Maaf karo": "sorry",
  "Fir melega": "goodbye",
  "Khuda Hafiz": "goodbye",
};

// Get faith-specific term for a generic term
export function getFaithTerm(genericTerm: string, faith: Faith): string {
  const relationshipId = TERM_MAPPINGS[genericTerm];
  if (!relationshipId) return genericTerm;

  const relationship = RELATIONSHIPS[relationshipId];
  if (!relationship) return genericTerm;

  return getTermForFaith(relationship, faith);
}

// Get faith-specific greeting for a generic greeting term
export function getFaithGreeting(genericTerm: string, faith: Faith): string {
  const greetingId = GREETING_MAPPINGS[genericTerm];
  if (!greetingId) return genericTerm;

  const greeting = GREETINGS[greetingId];
  if (!greeting) return genericTerm;

  return getGreetingForFaith(greeting, faith);
}

// Transform text by replacing generic terms with faith-specific ones
export function applyFaithTerms(text: string, faith: Faith): string {
  let result = text;

  // Replace each mapped relationship term
  Object.keys(TERM_MAPPINGS).forEach((term) => {
    const faithTerm = getFaithTerm(term, faith);
    if (faithTerm !== term) {
      // Replace whole word only (case-insensitive, preserve case)
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      result = result.replace(regex, (match) => {
        // Preserve original case
        if (match === match.toUpperCase()) return faithTerm.toUpperCase();
        if (match[0] === match[0].toUpperCase()) {
          return faithTerm.charAt(0).toUpperCase() + faithTerm.slice(1);
        }
        return faithTerm;
      });
    }
  });

  // Replace each mapped greeting term
  Object.keys(GREETING_MAPPINGS).forEach((term) => {
    const faithGreeting = getFaithGreeting(term, faith);
    if (faithGreeting !== term) {
      // Replace whole word only
      const regex = new RegExp(`\\b${term}\\b`, "gi");
      result = result.replace(regex, (match) => {
        // Preserve original case
        if (match === match.toUpperCase()) return faithGreeting.toUpperCase();
        if (match[0] === match[0].toUpperCase()) {
          return faithGreeting.charAt(0).toUpperCase() + faithGreeting.slice(1);
        }
        return faithGreeting;
      });
    }
  });

  return result;
}

// Get caller name based on character and faith
export function getCallerName(character: string, faith: Faith): string {
  const characterMap: Record<string, string> = {
    "nani": "nani",
    "nana": "nana",
    "dadi": "dadi",
    "dada": "dada",
    "mum": "mother",
    "dad": "father",
    "aunty": "mausi",
  };

  const relationshipId = characterMap[character.toLowerCase()];
  if (!relationshipId) return character;

  const relationship = RELATIONSHIPS[relationshipId];
  if (!relationship) return character;

  return getTermForFaith(relationship, faith);
}

// Transform entire dialogue exchange with faith terms
export function transformDialogue(
  dialogue: { fijiHindi: string; english: string }[],
  faith: Faith
): { fijiHindi: string; english: string }[] {
  return dialogue.map((exchange) => ({
    fijiHindi: applyFaithTerms(exchange.fijiHindi, faith),
    english: exchange.english, // Keep English as-is
  }));
}

// Get user's faith from localStorage
export function getUserFaith(): Faith {
  if (typeof window === "undefined") return "hindu";

  const stored = localStorage.getItem("fijihindi_user");
  if (!stored) return "hindu";

  try {
    const user = JSON.parse(stored);
    return (user.faith as Faith) || "hindu";
  } catch {
    return "hindu";
  }
}
