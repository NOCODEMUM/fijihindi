// Conversation data for Nani phone calls

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
  duration: string; // estimated duration
  dialogue: DialogueExchange[];
  phrases: string[]; // Key phrases taught in this conversation
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
          { fijiHindi: "Nani! Mein khush hoon aapko dekh ke.", english: "Nani! I am happy to see you." },
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
    ],
    phrases: [
      "Namaste - Hello/Greetings",
      "Kaise ho? - How are you?",
      "Mein theek hoon - I am fine",
      "Bahut achchha - Very good",
      "Phir milenge - See you later",
      "Dhanyavaad - Thank you",
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
        fijiHindi: "Good morning beta! Subah ho gayi, uth gaye?",
        english: "Good morning dear! Morning has come, did you wake up?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Haan Nani, abhi utha.", english: "Yes Nani, just woke up." },
          { fijiHindi: "Good morning Nani! Haan, uth gaya.", english: "Good morning Nani! Yes, I woke up." },
          { fijiHindi: "Nani, thoda late ho gaya aaj.", english: "Nani, I was a bit late today." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Achchha hai! Naashta kiya?",
        english: "That's good! Did you have breakfast?",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Haan, naashta kar liya.", english: "Yes, I had breakfast." },
          { fijiHindi: "Abhi nahi, baad mein karunga.", english: "Not yet, I will later." },
          { fijiHindi: "Chai pi liya bas.", english: "Just had chai." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Theek hai beta. Khaana zaroori hai! Aaj kya karne wale ho?",
        english: "Okay dear. Food is important! What are you going to do today?",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Kaam pe jaana hai.", english: "I have to go to work." },
          { fijiHindi: "Ghar pe rahunga aaj.", english: "I'll stay home today." },
          { fijiHindi: "Thoda padhai karunga.", english: "I'll study a bit." },
        ],
      },
      {
        id: "7",
        speaker: "nani",
        fijiHindi: "Achchha beta, dhyan rakhna apna. Baad mein phone karna!",
        english: "Okay dear, take care of yourself. Call later!",
      },
    ],
    phrases: [
      "Subah - Morning",
      "Uth gaye? - Did you wake up?",
      "Naashta - Breakfast",
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
        fijiHindi: "Beta, tumhara parivar kaise hai?",
        english: "Dear, how is your family?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Sab theek hai Nani.", english: "Everyone is fine Nani." },
          { fijiHindi: "Parivar achchha hai, shukriya.", english: "Family is good, thank you." },
          { fijiHindi: "Maa-Baap theek hai.", english: "Mom and Dad are fine." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Bahut achchha! Tumhara Maa kya kar rahi hai?",
        english: "Very good! What is your mother doing?",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Maa ghar pe hai.", english: "Mom is at home." },
          { fijiHindi: "Maa kaam pe gayi hai.", english: "Mom went to work." },
          { fijiHindi: "Maa khana bana rahi hai.", english: "Mom is cooking food." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Aur Baap? Unko mera namaste bolna!",
        english: "And Dad? Tell him my greetings!",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Zaroor Nani, bol dunga.", english: "Sure Nani, I will tell him." },
          { fijiHindi: "Baap bhi theek hai, namaste pahuncha dunga.", english: "Dad is also fine, I'll pass on the greeting." },
          { fijiHindi: "Haan Nani, bol deta hoon.", english: "Yes Nani, I'll tell him." },
        ],
      },
      {
        id: "7",
        speaker: "nani",
        fijiHindi: "Achchha beta! Parivar sabse zaroori hai. Yaad rakhna!",
        english: "Good dear! Family is most important. Remember that!",
      },
    ],
    phrases: [
      "Parivar - Family",
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
        fijiHindi: "Beta, wahaan mausam kaisa hai aaj?",
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
          { fijiHindi: "Achchha mausam hai.", english: "The weather is nice." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Achchha? Yahan Fiji mein to hamesha garmi hai!",
        english: "Really? Here in Fiji it's always hot!",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Haan Nani, Fiji mein garmi achchhi hai.", english: "Yes Nani, the heat in Fiji is nice." },
          { fijiHindi: "Mujhe Fiji ki garmi yaad aati hai.", english: "I miss Fiji's heat." },
          { fijiHindi: "Wahaan baarish bhi hoti hai na?", english: "It rains there too right?" },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Haan beta, baarish bhi aati hai. Par dhoop zyaada hai!",
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
        fijiHindi: "Beta, kya khaya aaj?",
        english: "Dear, what did you eat today?",
      },
      {
        id: "2",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Roti sabzi khaya Nani.", english: "I ate roti and vegetables Nani." },
          { fijiHindi: "Chawal dal khaya.", english: "I ate rice and dal." },
          { fijiHindi: "Bahar se kuch khaya.", english: "I ate something from outside." },
        ],
      },
      {
        id: "3",
        speaker: "nani",
        fijiHindi: "Achchha! Tumko dhokla pasand hai na? Mein banati thi.",
        english: "Good! You like dhokla right? I used to make it.",
      },
      {
        id: "4",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Haan Nani, bahut pasand hai!", english: "Yes Nani, I love it!" },
          { fijiHindi: "Aapka dhokla sabse achchha tha.", english: "Your dhokla was the best." },
          { fijiHindi: "Mujhe recipe sikhaao Nani.", english: "Teach me the recipe Nani." },
        ],
      },
      {
        id: "5",
        speaker: "nani",
        fijiHindi: "Zaroor sikhaungi! Agla phone pe recipe bataungi.",
        english: "Definitely I'll teach! I'll tell the recipe on the next call.",
      },
      {
        id: "6",
        speaker: "user",
        fijiHindi: "",
        english: "",
        options: [
          { fijiHindi: "Dhanyavaad Nani!", english: "Thank you Nani!" },
          { fijiHindi: "Mein wait karunga.", english: "I will wait." },
          { fijiHindi: "Bahut achchha, Nani!", english: "Very good, Nani!" },
        ],
      },
    ],
    phrases: [
      "Khana - Food/Eat",
      "Roti - Flatbread",
      "Sabzi - Vegetables",
      "Chawal - Rice",
      "Dal - Lentils",
      "Pasand - Like/Favorite",
      "Recipe - Recipe",
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
