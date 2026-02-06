// Faith-based Greetings - AUTHENTIC FIJI HINDI
// Greetings and common phrases that vary by religion

import { Faith } from "./relationships";

export interface GreetingTerm {
  primary: string;
  alternate?: string;
  response?: string; // Expected response to this greeting
}

export interface Greeting {
  id: string;
  english: string;
  context: string;
  category: "hello" | "goodbye" | "blessing" | "thanks" | "sorry" | "religious";
  terms: Record<Faith, GreetingTerm>;
}

// =============================================================================
// MASTER GREETINGS LIST
// =============================================================================

export const GREETINGS: Record<string, Greeting> = {
  // ===========================================================================
  // HELLO / GREETINGS
  // ===========================================================================
  hello: {
    id: "hello",
    english: "Hello",
    context: "General greeting",
    category: "hello",
    terms: {
      hindu: { primary: "Namaste", alternate: "Namaskar", response: "Namaste" },
      muslim: { primary: "Assalamu Alaikum", alternate: "Salaam", response: "Wa Alaikum Assalam" },
      christian: { primary: "Hello", alternate: "Hi", response: "Hello" },
      sikh: { primary: "Sat Sri Akal", alternate: "Waheguru Ji Ka Khalsa", response: "Waheguru Ji Ki Fateh" },
      other: { primary: "Namaste", alternate: "Hello", response: "Namaste" },
    },
  },
  goodMorning: {
    id: "goodMorning",
    english: "Good morning",
    context: "Morning greeting",
    category: "hello",
    terms: {
      hindu: { primary: "Suprabhat", alternate: "Good morning" },
      muslim: { primary: "Subah Bakhair", alternate: "Good morning" },
      christian: { primary: "Good morning", alternate: "Morning" },
      sikh: { primary: "Sat Sri Akal", alternate: "Good morning" },
      other: { primary: "Good morning", alternate: "Suprabhat" },
    },
  },
  goodEvening: {
    id: "goodEvening",
    english: "Good evening",
    context: "Evening greeting",
    category: "hello",
    terms: {
      hindu: { primary: "Shubh Sandhya", alternate: "Good evening" },
      muslim: { primary: "Shaam Bakhair", alternate: "Good evening" },
      christian: { primary: "Good evening", alternate: "Evening" },
      sikh: { primary: "Sat Sri Akal", alternate: "Good evening" },
      other: { primary: "Good evening", alternate: "Shubh Sandhya" },
    },
  },
  howAreYou: {
    id: "howAreYou",
    english: "How are you?",
    context: "Asking about wellbeing",
    category: "hello",
    terms: {
      hindu: { primary: "Kaise hai?", alternate: "Tum kaise ho?", response: "Ham tik hai" },
      muslim: { primary: "Kaise hai?", alternate: "Aap kaise hain?", response: "Alhamdulillah, tik hai" },
      christian: { primary: "Kaise hai?", alternate: "How are you?", response: "Ham tik hai" },
      sikh: { primary: "Kaise hai?", alternate: "Tusi kiven ho?", response: "Waheguru di kirpa, tik hai" },
      other: { primary: "Kaise hai?", alternate: "How are you?", response: "Ham tik hai" },
    },
  },

  // ===========================================================================
  // GOODBYE / FAREWELL
  // ===========================================================================
  goodbye: {
    id: "goodbye",
    english: "Goodbye",
    context: "Parting greeting",
    category: "goodbye",
    terms: {
      hindu: { primary: "Fir melega", alternate: "Namaste", response: "Fir melega" },
      muslim: { primary: "Khuda Hafiz", alternate: "Allah Hafiz", response: "Khuda Hafiz" },
      christian: { primary: "Bye", alternate: "God bless", response: "Bye" },
      sikh: { primary: "Sat Sri Akal", alternate: "Rabb Rakha", response: "Sat Sri Akal" },
      other: { primary: "Fir melega", alternate: "Bye", response: "Fir melega" },
    },
  },
  seeYouLater: {
    id: "seeYouLater",
    english: "See you later",
    context: "Informal farewell",
    category: "goodbye",
    terms: {
      hindu: { primary: "Fir melega", alternate: "Baad me melega" },
      muslim: { primary: "Phir milenge", alternate: "Khuda Hafiz" },
      christian: { primary: "See you later", alternate: "Fir melega" },
      sikh: { primary: "Fir milange", alternate: "Sat Sri Akal" },
      other: { primary: "Fir melega", alternate: "See you" },
    },
  },
  takecare: {
    id: "takecare",
    english: "Take care",
    context: "Caring farewell",
    category: "goodbye",
    terms: {
      hindu: { primary: "Apna dhyan rakhna", alternate: "Dhyan rakhna" },
      muslim: { primary: "Apna khayal rakhna", alternate: "Allah Hafiz" },
      christian: { primary: "Take care", alternate: "God bless you" },
      sikh: { primary: "Apna dhyan rakhna", alternate: "Rabb Rakha" },
      other: { primary: "Apna dhyan rakhna", alternate: "Take care" },
    },
  },

  // ===========================================================================
  // BLESSINGS
  // ===========================================================================
  blessYou: {
    id: "blessYou",
    english: "Bless you",
    context: "Giving blessings",
    category: "blessing",
    terms: {
      hindu: { primary: "Bhagwan tumka ashirwad de", alternate: "Ishwar tumka rakhe" },
      muslim: { primary: "Allah tumka barkat de", alternate: "Khuda tumka salamat rakhe" },
      christian: { primary: "God bless you", alternate: "May God be with you" },
      sikh: { primary: "Waheguru tumka rakhe", alternate: "Rabb mehar kare" },
      other: { primary: "Bhagwan tumka ashirwad de", alternate: "Bless you" },
    },
  },
  touchFeet: {
    id: "touchFeet",
    english: "Touching feet (respect)",
    context: "Seeking blessings from elders",
    category: "blessing",
    terms: {
      hindu: { primary: "Pair chhoota", alternate: "Pranam", response: "Khush raho beta" },
      muslim: { primary: "Salaam", alternate: "Aadab", response: "Jeete raho" },
      christian: { primary: "Blessings please", alternate: "Pair chhoota", response: "God bless you" },
      sikh: { primary: "Pair chhoota", alternate: "Sat Sri Akal", response: "Jeevey raho" },
      other: { primary: "Pair chhoota", alternate: "Pranam", response: "Khush raho" },
    },
  },
  elderBlessing: {
    id: "elderBlessing",
    english: "Elder's blessing response",
    context: "Response when blessed by elder",
    category: "blessing",
    terms: {
      hindu: { primary: "Khush raho beta", alternate: "Jug jug jiyo" },
      muslim: { primary: "Jeete raho", alternate: "Allah tumka salamat rakhe" },
      christian: { primary: "God bless you child", alternate: "Stay blessed" },
      sikh: { primary: "Jeevey raho", alternate: "Waheguru mehar kare" },
      other: { primary: "Khush raho beta", alternate: "Jeete raho" },
    },
  },

  // ===========================================================================
  // THANKS
  // ===========================================================================
  thankYou: {
    id: "thankYou",
    english: "Thank you",
    context: "Expressing gratitude",
    category: "thanks",
    terms: {
      hindu: { primary: "Dhanyabad", alternate: "Shukriya", response: "Koi baat nai" },
      muslim: { primary: "Shukriya", alternate: "Jazakallah", response: "Koi baat nai" },
      christian: { primary: "Thank you", alternate: "Dhanyabad", response: "You're welcome" },
      sikh: { primary: "Dhanyabad", alternate: "Bahut meherbani", response: "Koi gall nai" },
      other: { primary: "Dhanyabad", alternate: "Thank you", response: "Koi baat nai" },
    },
  },
  youreWelcome: {
    id: "youreWelcome",
    english: "You're welcome",
    context: "Response to thanks",
    category: "thanks",
    terms: {
      hindu: { primary: "Koi baat nai", alternate: "Isme kaunchi hai" },
      muslim: { primary: "Koi baat nai", alternate: "Kuch nahi" },
      christian: { primary: "You're welcome", alternate: "No problem" },
      sikh: { primary: "Koi gall nai", alternate: "Koi baat nai" },
      other: { primary: "Koi baat nai", alternate: "You're welcome" },
    },
  },

  // ===========================================================================
  // SORRY / APOLOGY
  // ===========================================================================
  sorry: {
    id: "sorry",
    english: "Sorry",
    context: "Apologizing",
    category: "sorry",
    terms: {
      hindu: { primary: "Maaf karo", alternate: "Sorry", response: "Koi baat nai" },
      muslim: { primary: "Maaf karo", alternate: "Muafi", response: "Koi baat nai" },
      christian: { primary: "Sorry", alternate: "Maaf karo", response: "It's okay" },
      sikh: { primary: "Maafi", alternate: "Maaf karo", response: "Koi gall nai" },
      other: { primary: "Maaf karo", alternate: "Sorry", response: "Koi baat nai" },
    },
  },
  excuse: {
    id: "excuse",
    english: "Excuse me",
    context: "Getting attention politely",
    category: "sorry",
    terms: {
      hindu: { primary: "Suniye", alternate: "Excuse me" },
      muslim: { primary: "Suniye", alternate: "Excuse me" },
      christian: { primary: "Excuse me", alternate: "Suniye" },
      sikh: { primary: "Suniye ji", alternate: "Excuse me" },
      other: { primary: "Suniye", alternate: "Excuse me" },
    },
  },

  // ===========================================================================
  // RELIGIOUS SPECIFIC
  // ===========================================================================
  beforeEating: {
    id: "beforeEating",
    english: "Before eating",
    context: "Prayer/blessing before food",
    category: "religious",
    terms: {
      hindu: { primary: "Bhagwan ka naam leke khao", alternate: "Om" },
      muslim: { primary: "Bismillah", alternate: "Allah ke naam se" },
      christian: { primary: "Let's say grace", alternate: "Thank you Lord" },
      sikh: { primary: "Waheguru", alternate: "Bole So Nihal" },
      other: { primary: "Khana khao", alternate: "Let's eat" },
    },
  },
  afterEating: {
    id: "afterEating",
    english: "After eating",
    context: "Thanks after food",
    category: "religious",
    terms: {
      hindu: { primary: "Bhagwan ka shukar", alternate: "Dhanyabad" },
      muslim: { primary: "Alhamdulillah", alternate: "Shukar hai" },
      christian: { primary: "Thank you Lord", alternate: "Amen" },
      sikh: { primary: "Waheguru da shukar", alternate: "Dhanvaad" },
      other: { primary: "Dhanyabad", alternate: "Thanks" },
    },
  },
  congratulations: {
    id: "congratulations",
    english: "Congratulations",
    context: "Celebrating good news",
    category: "blessing",
    terms: {
      hindu: { primary: "Badhai ho!", alternate: "Mubarak!" },
      muslim: { primary: "Mubarak ho!", alternate: "Mubarakbad!" },
      christian: { primary: "Congratulations!", alternate: "Badhai!" },
      sikh: { primary: "Vadhaiyaan!", alternate: "Mubarak!" },
      other: { primary: "Badhai ho!", alternate: "Congratulations!" },
    },
  },
  happyBirthday: {
    id: "happyBirthday",
    english: "Happy Birthday",
    context: "Birthday wishes",
    category: "blessing",
    terms: {
      hindu: { primary: "Janamdin mubarak!", alternate: "Happy Birthday!" },
      muslim: { primary: "Janamdin mubarak!", alternate: "Salgirah mubarak!" },
      christian: { primary: "Happy Birthday!", alternate: "God bless you!" },
      sikh: { primary: "Janamdin diyan vadhaiyan!", alternate: "Happy Birthday!" },
      other: { primary: "Janamdin mubarak!", alternate: "Happy Birthday!" },
    },
  },
  happyDiwali: {
    id: "happyDiwali",
    english: "Happy Diwali",
    context: "Diwali greeting",
    category: "religious",
    terms: {
      hindu: { primary: "Diwali mubarak!", alternate: "Shubh Deepavali!" },
      muslim: { primary: "Diwali mubarak!", alternate: "Happy Diwali!" },
      christian: { primary: "Happy Diwali!", alternate: "Diwali mubarak!" },
      sikh: { primary: "Bandi Chhor Divas diyan vadhaiyan!", alternate: "Happy Diwali!" },
      other: { primary: "Diwali mubarak!", alternate: "Happy Diwali!" },
    },
  },
  happyEid: {
    id: "happyEid",
    english: "Happy Eid",
    context: "Eid greeting",
    category: "religious",
    terms: {
      hindu: { primary: "Eid mubarak!", alternate: "Happy Eid!" },
      muslim: { primary: "Eid Mubarak!", alternate: "Eid ul Fitr mubarak!" },
      christian: { primary: "Happy Eid!", alternate: "Eid mubarak!" },
      sikh: { primary: "Eid mubarak!", alternate: "Happy Eid!" },
      other: { primary: "Eid mubarak!", alternate: "Happy Eid!" },
    },
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Get greeting term for a specific faith
export function getGreetingForFaith(greeting: Greeting, faith: Faith): string {
  const terms = greeting.terms[faith] || greeting.terms.other;
  return terms.primary;
}

// Get all greeting terms for a faith
export function getAllGreetingTerms(greeting: Greeting, faith: Faith): GreetingTerm {
  return greeting.terms[faith] || greeting.terms.other;
}

// Get greeting by ID
export function getGreeting(id: string): Greeting | undefined {
  return GREETINGS[id];
}

// Get all greetings
export function getAllGreetings(): Greeting[] {
  return Object.values(GREETINGS);
}

// Get greetings by category
export function getGreetingsByCategory(category: Greeting["category"]): Greeting[] {
  return Object.values(GREETINGS).filter((g) => g.category === category);
}

// Export for Supabase sync (same table structure as relationships)
export function getGreetingsForSupabase() {
  return Object.values(GREETINGS).map((g) => ({
    id: g.id,
    english: g.english,
    description: g.context,
    category: g.category,
    terms_hindu: g.terms.hindu,
    terms_muslim: g.terms.muslim,
    terms_christian: g.terms.christian,
    terms_sikh: g.terms.sikh,
    terms_other: g.terms.other,
  }));
}
