// Conversation data for Nani phone calls - AUTHENTIC FIJI HINDI

import { Faith, RELATIONSHIPS, getTermForFaith } from "@/data/relationships";

export interface DialogueExchange {
  id: string;
  speaker: "nani" | "user";
  fijiHindi: string;
  english: string;
  options?: {
    fijiHindi: string;
    english: string;
  }[];
}

export interface Conversation {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  duration: string;
  dialogue: DialogueExchange[];
  phrases: string[];
  orderIndex: number;
}

export const CONVERSATIONS: Conversation[] = [
  {
    id: "intro-greeting",
    title: "First Hello",
    description: "Learn basic greetings and introductions",
    difficulty: "beginner",
    duration: "2-3 min",
    orderIndex: 1,
    dialogue: [
      {
        id: "1",
        speaker: "nani",
        fijiHindi: "Namaste beta! Kaise hai tum?",
        english: "Hello dear! How are you?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Namaste Nani! Ham tik hai.", english: "Hello Nani! I am fine." },
          { fijiHindi: "Namaste! Ham bahut acha hai.", english: "Hello! I am very good." },
          { fijiHindi: "Nani! Ham khush hai tumka dekh ke.", english: "Nani! I am happy to see you." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Bahut acha! Tum Fiji Hindi sikhna chahta?",
        english: "Very good! You want to learn Fiji Hindi?",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Ha Nani, ham sikhna chahta.", english: "Yes Nani, I want to learn." },
          { fijiHindi: "Habrat! Sikhao hamka.", english: "Yes! Teach me." },
          { fijiHindi: "Ha, please sikhao.", english: "Yes, please teach." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Acha beta! Ham roz baat karega. Ab phone rakh do, fir melega!",
        english: "Good dear! We will talk every day. Hang up now, see you later!",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Tik hai Nani, fir melega!", english: "Okay Nani, see you later!" },
          { fijiHindi: "Dhanyabad Nani!", english: "Thank you Nani!" },
          { fijiHindi: "Bye Nani, kal baat karega!", english: "Bye Nani, we'll talk tomorrow!" },
        ],
      },
    ],
    phrases: [
      "Namaste - Hello/Greetings",
      "Kaise hai? - How are you?",
      "Ham tik hai - I am fine",
      "Bahut acha - Very good",
      "Fir melega - See you later",
      "Dhanyabad - Thank you",
    ],
  },
  {
    id: "morning-checkin",
    title: "Morning Check-in",
    description: "Practice daily morning greetings",
    difficulty: "beginner",
    duration: "2-3 min",
    orderIndex: 2,
    dialogue: [
      {
        id: "1",
        speaker: "nani",
        fijiHindi: "Good morning beta! Subah ho gaya, uth gaya?",
        english: "Good morning dear! Morning has come, did you wake up?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Ha Nani, just utha.", english: "Yes Nani, just woke up." },
          { fijiHindi: "Good morning Nani! Ha, uth gaya.", english: "Good morning Nani! Yes, I woke up." },
          { fijiHindi: "Nani, thora late ho gaya aaj.", english: "Nani, I was a bit late today." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Acha hai! Khana khaya?",
        english: "That's good! Did you eat?",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Ha, khana kha liya.", english: "Yes, I ate." },
          { fijiHindi: "Abhi nai, baad me karega.", english: "Not yet, I will later." },
          { fijiHindi: "Chai pi liya bas.", english: "Just had chai." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Tik hai beta. Khana zaroori hai! Aaj kaunchi karta?",
        english: "Okay dear. Food is important! What are you doing today?",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Kaam pe jana hai.", english: "I have to go to work." },
          { fijiHindi: "Ghar pe rahega aaj.", english: "I'll stay home today." },
          { fijiHindi: "Thora study karega.", english: "I'll study a bit." },
        ],
      },
      {
        id: "7",
        speaker: "nani",
        fijiHindi: "Acha beta, apna dhyan rakhna. Baad me phone karna!",
        english: "Okay dear, take care of yourself. Call later!",
      },
    ],
    phrases: [
      "Subah - Morning",
      "Uth gaya? - Did you wake up?",
      "Khana khaya? - Did you eat?",
      "Chai - Tea",
      "Kaam - Work",
      "Dhyan rakhna - Take care",
    ],
  },
  {
    id: "family-talk",
    title: "Family Talk",
    description: "Learn about family and relatives",
    difficulty: "beginner",
    duration: "3-4 min",
    orderIndex: 3,
    dialogue: [
      {
        id: "1",
        speaker: "nani",
        fijiHindi: "Beta, tumre family kaise hai?",
        english: "Dear, how is your family?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Sab tik hai Nani.", english: "Everyone is fine Nani." },
          { fijiHindi: "Family acha hai, shukriya.", english: "Family is good, thank you." },
          { fijiHindi: "Maa-Baap tik hai.", english: "Mom and Dad are fine." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Bahut acha! Tumre Maa kaunchi karta?",
        english: "Very good! What is your mother doing?",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Maa ghar pe hai.", english: "Mom is at home." },
          { fijiHindi: "Maa kaam pe gaya hai.", english: "Mom went to work." },
          { fijiHindi: "Maa khana banata.", english: "Mom is cooking food." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Aur Baap? Woke hamra namaste bolna!",
        english: "And Dad? Tell him my greetings!",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Zaroor Nani, bol dega.", english: "Sure Nani, I will tell him." },
          { fijiHindi: "Baap bhi tik hai, namaste pahuncha dega.", english: "Dad is also fine, I'll pass on the greeting." },
          { fijiHindi: "Ha Nani, bol deta.", english: "Yes Nani, I'll tell him." },
        ],
      },
      {
        id: "7",
        speaker: "nani",
        fijiHindi: "Acha beta! Family sabse zaroori hai. Yaad rakhna!",
        english: "Good dear! Family is most important. Remember that!",
      },
    ],
    phrases: [
      "Family - Family",
      "Maa - Mother",
      "Baap - Father",
      "Ghar - Home",
      "Khana - Food",
      "Namaste bolna - Say greetings",
    ],
  },
  {
    id: "weather-chat",
    title: "Weather Chat",
    description: "Talk about weather and seasons",
    difficulty: "beginner",
    duration: "2-3 min",
    orderIndex: 4,
    dialogue: [
      {
        id: "1",
        speaker: "nani",
        fijiHindi: "Beta, waha mausam kaisa hai aaj?",
        english: "Dear, how is the weather there today?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Bahut garmi hai Nani.", english: "It's very hot Nani." },
          { fijiHindi: "Thanda hai aaj.", english: "It's cold today." },
          { fijiHindi: "Acha mausam hai.", english: "The weather is nice." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Sachi? Yaha Fiji me to hamesha garmi hai!",
        english: "Really? Here in Fiji it's always hot!",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Ha Nani, Fiji me garmi acha hai.", english: "Yes Nani, the heat in Fiji is nice." },
          { fijiHindi: "Hamka Fiji ke garmi yaad aata.", english: "I miss Fiji's heat." },
          { fijiHindi: "Waha baarish bhi hota hai na?", english: "It rains there too right?" },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Ha beta, baarish bhi aata. Par dhoop zyaada hai!",
        english: "Yes dear, rain comes too. But sunshine is more!",
      },
    ],
    phrases: [
      "Mausam - Weather",
      "Garmi - Heat/Hot",
      "Thanda - Cold",
      "Baarish - Rain",
      "Dhoop - Sunshine",
      "Hamesha - Always",
    ],
  },
  {
    id: "food-talk",
    title: "Food & Cooking",
    description: "Discuss food and Fiji Indian dishes",
    difficulty: "intermediate",
    duration: "3-4 min",
    orderIndex: 5,
    dialogue: [
      {
        id: "1",
        speaker: "nani",
        fijiHindi: "Beta, kaunchi khaya aaj?",
        english: "Dear, what did you eat today?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Roti tarkari khaya Nani.", english: "I ate roti and curry Nani." },
          { fijiHindi: "Chawal dhal khaya.", english: "I ate rice and dal." },
          { fijiHindi: "Bahar se kuch khaya.", english: "I ate something from outside." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Acha! Tumka dhokla pasand hai na? Ham banata tha.",
        english: "Good! You like dhokla right? I used to make it.",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Ha Nani, bahut pasand hai!", english: "Yes Nani, I love it!" },
          { fijiHindi: "Tumre dhokla sabse acha tha.", english: "Your dhokla was the best." },
          { fijiHindi: "Hamka recipe sikhao Nani.", english: "Teach me the recipe Nani." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Zaroor sikhaega! Next phone pe recipe bataega.",
        english: "Definitely I'll teach! I'll tell the recipe on the next call.",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Dhanyabad Nani!", english: "Thank you Nani!" },
          { fijiHindi: "Ham wait karega.", english: "I will wait." },
          { fijiHindi: "Julum, Nani!", english: "Awesome, Nani!" },
        ],
      },
    ],
    phrases: [
      "Khana - Food/Eat",
      "Roti - Flatbread",
      "Tarkari - Curry/Vegetables",
      "Chawal - Rice",
      "Dhal - Lentils",
      "Pasand - Like/Favorite",
      "Julum - Amazing/Awesome",
    ],
  },
];

// Get conversation by ID
export function getConversationById(id: string): Conversation | undefined {
  return CONVERSATIONS.find((c) => c.id === id);
}

// Get next conversation
export function getNextConversation(currentId: string): Conversation | undefined {
  const current = CONVERSATIONS.find((c) => c.id === currentId);
  if (!current) return CONVERSATIONS[0];

  return CONVERSATIONS.find((c) => c.orderIndex === current.orderIndex + 1);
}

// Get all conversations sorted by order
export function getAllConversations(): Conversation[] {
  return [...CONVERSATIONS].sort((a, b) => a.orderIndex - b.orderIndex);
}

// Helper function to get the term for a relationship ID and faith
function getRelationshipTermForFaith(relationshipId: string, faith: Faith): string {
  const relationship = RELATIONSHIPS[relationshipId];
  if (!relationship) return relationshipId;
  return getTermForFaith(relationship, faith);
}

// Replace "Nani" with the correct faith-based term in a string
function replaceNaniTerm(text: string, naniTerm: string): string {
  // Replace "Nani" as a standalone word (case-sensitive to preserve other uses)
  return text.replace(/\bNani\b/g, naniTerm);
}

// Get conversations with faith-based relationship terms
export function getConversationsForFaith(faith: Faith): Conversation[] {
  const naniTerm = getRelationshipTermForFaith("nani", faith);

  return CONVERSATIONS.map((conversation) => ({
    ...conversation,
    dialogue: conversation.dialogue.map((exchange) => ({
      ...exchange,
      fijiHindi: replaceNaniTerm(exchange.fijiHindi, naniTerm),
      english: replaceNaniTerm(exchange.english, naniTerm),
      options: exchange.options?.map((option) => ({
        fijiHindi: replaceNaniTerm(option.fijiHindi, naniTerm),
        english: replaceNaniTerm(option.english, naniTerm),
      })),
    })),
  }));
}
