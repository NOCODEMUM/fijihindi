// SOS Flashcards - AUTHENTIC FIJI HINDI
// Quick reference phrases when you need them fast

import { Faith, RELATIONSHIPS, getTermForFaith, getAllTermsForFaith } from "@/data/relationships";

export interface Flashcard {
  id: string;
  fijiHindi: string;
  english: string;
  pronunciation?: string;
  example?: {
    fijiHindi: string;
    english: string;
  };
  alternate?: string;
}

export interface FlashcardCategory {
  id: string;
  name: string;
  emoji: string;
  description: string;
  cards: Flashcard[];
  isDynamic?: boolean; // If true, cards are generated based on faith
}

export const FLASHCARD_CATEGORIES: FlashcardCategory[] = [
  {
    id: "greetings",
    name: "Greetings",
    emoji: "👋",
    description: "Hello, goodbye, and basic greetings",
    cards: [
      {
        id: "g1",
        fijiHindi: "Namaste",
        english: "Hello / Greetings",
        pronunciation: "nuh-MUS-tay",
      },
      {
        id: "g2",
        fijiHindi: "Kaise hai?",
        english: "How are you?",
        pronunciation: "KAI-say hai",
      },
      {
        id: "g3",
        fijiHindi: "Ham tik hai",
        english: "I'm fine",
        pronunciation: "hum TEEK hai",
      },
      {
        id: "g4",
        fijiHindi: "Fir melega",
        english: "See you later",
        pronunciation: "fir MEH-lay-ga",
      },
      {
        id: "g5",
        fijiHindi: "Bahut din ho gaya",
        english: "It's been so long",
        pronunciation: "ba-HOOT din ho GUY-ya",
      },
      {
        id: "g6",
        fijiHindi: "Aao, andar aao",
        english: "Come, come inside",
        pronunciation: "AA-oh, UN-dar AA-oh",
      },
    ],
  },
  {
    id: "family",
    name: "Family Terms",
    emoji: "👨‍👩‍👧‍👦",
    description: "Parents, grandparents, relatives (based on your faith)",
    isDynamic: true,
    cards: [], // Will be populated dynamically based on user's faith
  },
  {
    id: "polite",
    name: "Polite Phrases",
    emoji: "🙏",
    description: "Thank you, please, sorry",
    cards: [
      {
        id: "p1",
        fijiHindi: "Dhanyabad",
        english: "Thank you",
        pronunciation: "dhun-ya-BAAD",
      },
      {
        id: "p2",
        fijiHindi: "Shukriya",
        english: "Thank you (Muslim)",
        pronunciation: "shook-REE-ya",
      },
      {
        id: "p3",
        fijiHindi: "Maaf karo",
        english: "Sorry / Forgive me",
        pronunciation: "maaf KA-ro",
      },
      {
        id: "p4",
        fijiHindi: "Please",
        english: "Please",
        pronunciation: "please",
        example: {
          fijiHindi: "Please, thora help karo",
          english: "Please, help a little",
        },
      },
      {
        id: "p5",
        fijiHindi: "Koi baat nai",
        english: "No problem / It's okay",
        pronunciation: "koi baat nai",
      },
      {
        id: "p6",
        fijiHindi: "Zaroor",
        english: "Of course / Definitely",
        pronunciation: "za-ROOR",
      },
    ],
  },
  {
    id: "questions",
    name: "Common Questions",
    emoji: "❓",
    description: "What, where, when, why",
    cards: [
      {
        id: "q1",
        fijiHindi: "Kaunchi?",
        english: "What?",
        pronunciation: "KAUN-chee",
        example: {
          fijiHindi: "Kaunchi karta?",
          english: "What are you doing?",
        },
      },
      {
        id: "q2",
        fijiHindi: "Kaha?",
        english: "Where?",
        pronunciation: "ka-HAA",
        example: {
          fijiHindi: "Tum kaha hai?",
          english: "Where are you?",
        },
      },
      {
        id: "q3",
        fijiHindi: "Kab?",
        english: "When?",
        pronunciation: "kub",
        example: {
          fijiHindi: "Kab aega?",
          english: "When will you come?",
        },
      },
      {
        id: "q4",
        fijiHindi: "Kaahe?",
        english: "Why?",
        pronunciation: "KAA-hay",
        example: {
          fijiHindi: "Kaahe nai aaya?",
          english: "Why didn't you come?",
        },
      },
      {
        id: "q5",
        fijiHindi: "Kaun?",
        english: "Who?",
        pronunciation: "kaun",
        example: {
          fijiHindi: "Kaun hai?",
          english: "Who is it?",
        },
      },
      {
        id: "q6",
        fijiHindi: "Kitna?",
        english: "How much / How many?",
        pronunciation: "KIT-na",
        example: {
          fijiHindi: "Kitna paisa?",
          english: "How much money?",
        },
      },
    ],
  },
  {
    id: "food",
    name: "Food & Eating",
    emoji: "🍛",
    description: "Hungry, delicious, common dishes",
    cards: [
      {
        id: "fd1",
        fijiHindi: "Khana khaya?",
        english: "Did you eat?",
        pronunciation: "KHA-na KHA-ya",
      },
      {
        id: "fd2",
        fijiHindi: "Bhook laga hai",
        english: "I'm hungry",
        pronunciation: "bhook LA-ga hai",
      },
      {
        id: "fd3",
        fijiHindi: "Julum mita hai!",
        english: "It's delicious!",
        pronunciation: "JOO-lum MEE-ta hai",
      },
      {
        id: "fd4",
        fijiHindi: "Aur do",
        english: "Give more",
        pronunciation: "aur doh",
      },
      {
        id: "fd5",
        fijiHindi: "Bas, pet bhar gaya",
        english: "Enough, I'm full",
        pronunciation: "bus, pet bhar GUY-ya",
      },
      {
        id: "fd6",
        fijiHindi: "Chai piyo",
        english: "Have some tea",
        pronunciation: "chai PEE-yo",
      },
      {
        id: "fd7",
        fijiHindi: "Roti",
        english: "Flatbread",
        pronunciation: "ROH-tee",
      },
      {
        id: "fd8",
        fijiHindi: "Dhal chawal",
        english: "Lentils and rice",
        pronunciation: "daal CHA-wal",
      },
    ],
  },
  {
    id: "responses",
    name: "Quick Responses",
    emoji: "💬",
    description: "Yes, no, maybe, I don't know",
    cards: [
      {
        id: "r1",
        fijiHindi: "Ha",
        english: "Yes",
        pronunciation: "haa",
      },
      {
        id: "r2",
        fijiHindi: "Nai",
        english: "No",
        pronunciation: "nai",
      },
      {
        id: "r3",
        fijiHindi: "Habrat",
        english: "Yeah / Agreed (slang)",
        pronunciation: "HUB-raat",
      },
      {
        id: "r4",
        fijiHindi: "Tik hai",
        english: "Okay / Alright",
        pronunciation: "teek hai",
      },
      {
        id: "r5",
        fijiHindi: "Nai pata",
        english: "I don't know",
        pronunciation: "nai PA-ta",
      },
      {
        id: "r6",
        fijiHindi: "Sachi?",
        english: "Really?",
        pronunciation: "SA-chee",
      },
      {
        id: "r7",
        fijiHindi: "Veitalia",
        english: "Never mind / Whatever",
        pronunciation: "vay-TAA-lee-ya",
      },
      {
        id: "r8",
        fijiHindi: "Set hai",
        english: "I'm good / All good (slang)",
        pronunciation: "set hai",
      },
    ],
  },
  {
    id: "emergencies",
    name: "Emergency Phrases",
    emoji: "🚨",
    description: "Help, urgent, important phrases",
    cards: [
      {
        id: "e1",
        fijiHindi: "Help karo!",
        english: "Help!",
        pronunciation: "help KA-ro",
      },
      {
        id: "e2",
        fijiHindi: "Doctor bulao",
        english: "Call a doctor",
        pronunciation: "doctor boo-LAA-oh",
      },
      {
        id: "e3",
        fijiHindi: "Tabiyat tik nai hai",
        english: "I'm not feeling well",
        pronunciation: "ta-bee-YAT teek nai hai",
      },
      {
        id: "e4",
        fijiHindi: "Kaha dard hai?",
        english: "Where does it hurt?",
        pronunciation: "ka-HAA dard hai",
      },
      {
        id: "e5",
        fijiHindi: "Jaldi karo",
        english: "Hurry up",
        pronunciation: "JUL-dee KA-ro",
      },
      {
        id: "e6",
        fijiHindi: "Ruko!",
        english: "Stop! / Wait!",
        pronunciation: "ROO-koh",
      },
    ],
  },
  {
    id: "slang",
    name: "Fiji Slang",
    emoji: "🤙",
    description: "Cool local expressions",
    cards: [
      {
        id: "s1",
        fijiHindi: "Julum!",
        english: "Amazing! / Awesome!",
        pronunciation: "JOO-lum",
        example: {
          fijiHindi: "Ye food julum hai!",
          english: "This food is amazing!",
        },
      },
      {
        id: "s2",
        fijiHindi: "Habrat yaar",
        english: "Yeah bro / For sure",
        pronunciation: "HUB-raat yaar",
      },
      {
        id: "s3",
        fijiHindi: "Set hai bhai",
        english: "All good bro",
        pronunciation: "set hai bhai",
      },
      {
        id: "s4",
        fijiHindi: "Veitalia",
        english: "Whatever / Never mind",
        pronunciation: "vay-TAA-lee-ya",
      },
      {
        id: "s5",
        fijiHindi: "Sachi machi?",
        english: "For real? / Seriously?",
        pronunciation: "SA-chee MA-chee",
      },
      {
        id: "s6",
        fijiHindi: "Aise hi",
        english: "Just like that / No reason",
        pronunciation: "AI-say hee",
      },
      {
        id: "s7",
        fijiHindi: "Kaunchi scene hai?",
        english: "What's the situation?",
        pronunciation: "KAUN-chee seen hai",
      },
      {
        id: "s8",
        fijiHindi: "Full on",
        english: "Totally / Completely",
        pronunciation: "full on",
        example: {
          fijiHindi: "Party full on tha!",
          english: "The party was totally on!",
        },
      },
    ],
  },
];

// Family relationship IDs to include in flashcards (most common)
const FAMILY_FLASHCARD_IDS = [
  "mother", "father",
  "nani", "nana", "dadi", "dada",
  "brother", "sister",
  "chacha", "chachi", "mama", "mami",
  "bua", "mausi",
  "son", "daughter",
  "husband", "wife",
  "sasur", "saas",
  "bhabhi", "jija",
];

// Generate family flashcards based on user's faith
export function getFamilyFlashcards(faith: Faith): Flashcard[] {
  const cards: Flashcard[] = [];

  FAMILY_FLASHCARD_IDS.forEach((id, index) => {
    const rel = RELATIONSHIPS[id];
    if (!rel) return;

    const terms = getAllTermsForFaith(rel, faith);
    const primaryTerm = getTermForFaith(rel, faith);

    const card: Flashcard = {
      id: `family-${index + 1}`,
      fijiHindi: primaryTerm,
      english: rel.english,
    };

    if (terms.alternate || terms.informal) {
      card.alternate = terms.alternate || terms.informal;
    }

    if (terms.formal) {
      card.example = {
        fijiHindi: `${terms.formal} aaya hai`,
        english: `${rel.english} has arrived`,
      };
    }

    cards.push(card);
  });

  return cards;
}

// Get category by ID (with faith-based dynamic cards)
export function getFlashcardCategory(id: string, faith: Faith = "hindu"): FlashcardCategory | undefined {
  const category = FLASHCARD_CATEGORIES.find((c) => c.id === id);
  if (!category) return undefined;

  // If it's the family category, populate with faith-based terms
  if (category.isDynamic && category.id === "family") {
    return {
      ...category,
      cards: getFamilyFlashcards(faith),
    };
  }

  return category;
}

// Get all categories with faith-based dynamic cards populated
export function getAllFlashcardCategories(faith: Faith = "hindu"): FlashcardCategory[] {
  return FLASHCARD_CATEGORIES.map((category) => {
    if (category.isDynamic && category.id === "family") {
      return {
        ...category,
        cards: getFamilyFlashcards(faith),
      };
    }
    return category;
  });
}

// Get all cards across all categories (with faith)
export function getAllFlashcards(faith: Faith = "hindu"): Flashcard[] {
  return getAllFlashcardCategories(faith).flatMap((c) => c.cards);
}

// Get random cards for quick practice (with faith)
export function getRandomFlashcards(count: number = 10, faith: Faith = "hindu"): Flashcard[] {
  const all = getAllFlashcards(faith);
  const shuffled = [...all].sort(() => Math.random() - 0.5);
  return shuffled.slice(0, count);
}
