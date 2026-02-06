// Quick exchanges for "Aunty's Coming" mode
// Format: Fast, timed responses under pressure

export interface AuntyExchange {
  id: string;
  auntyText: {
    fijiHindi: string;
    english: string;
  };
  options: {
    fijiHindi: string;
    english: string;
    isCorrect?: boolean;
  }[];
  timeLimit: number;
}

export interface AuntyScenario {
  id: string;
  title: string;
  description: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  exchanges: AuntyExchange[];
  phrases: string[];
}

export const AUNTY_SCENARIOS: AuntyScenario[] = [
  {
    id: "doorbell-greeting",
    title: "Doorbell Surprise",
    description: "Aunty shows up unannounced - greet her properly!",
    difficulty: "beginner",
    exchanges: [
      {
        id: "1",
        auntyText: {
          fijiHindi: "Arre! Kaun hai?",
          english: "Hey! Who is it?",
        },
        options: [
          { fijiHindi: "Namaste Aunty!", english: "Hello Aunty!", isCorrect: true },
          { fijiHindi: "Kaun hai?", english: "Who is it?", isCorrect: false },
          { fijiHindi: "Ji Aunty, aao!", english: "Yes Aunty, come in!", isCorrect: true },
        ],
        timeLimit: 8,
      },
      {
        id: "2",
        auntyText: {
          fijiHindi: "Beta, kaise ho? Bahut din ho gaye!",
          english: "Dear, how are you? It's been so long!",
        },
        options: [
          { fijiHindi: "Theek hoon Aunty!", english: "I'm fine Aunty!", isCorrect: true },
          { fijiHindi: "Haan, bahut din ho gaye!", english: "Yes, it's been long!", isCorrect: true },
          { fijiHindi: "Aap kaise ho?", english: "How are you?", isCorrect: true },
        ],
        timeLimit: 7,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Chai pilaoge ki nahi?",
          english: "Will you offer me tea or not?",
        },
        options: [
          { fijiHindi: "Haan Aunty, abhi banata hoon!", english: "Yes Aunty, I'll make it now!", isCorrect: true },
          { fijiHindi: "Zaroor Aunty!", english: "Of course Aunty!", isCorrect: true },
          { fijiHindi: "Chai ya coffee?", english: "Tea or coffee?", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Tumhara Maa-Baap kahan hai?",
          english: "Where are your parents?",
        },
        options: [
          { fijiHindi: "Bahar gaye hai.", english: "They went out.", isCorrect: true },
          { fijiHindi: "Ghar mein hai.", english: "They're home.", isCorrect: true },
          { fijiHindi: "Abhi aate hai.", english: "They're coming.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "5",
        auntyText: {
          fijiHindi: "Achchha beta, mein jaati hoon. Phir aaungi!",
          english: "Okay dear, I'm going. I'll come again!",
        },
        options: [
          { fijiHindi: "Theek hai Aunty, phir milenge!", english: "Okay Aunty, see you later!", isCorrect: true },
          { fijiHindi: "Aana zaroor Aunty!", english: "Do come Aunty!", isCorrect: true },
          { fijiHindi: "Namaste Aunty!", english: "Goodbye Aunty!", isCorrect: true },
        ],
        timeLimit: 7,
      },
    ],
    phrases: [
      "Namaste - Hello/Greetings",
      "Kaise ho? - How are you?",
      "Theek hoon - I'm fine",
      "Chai - Tea",
      "Phir milenge - See you later",
    ],
  },
  {
    id: "marriage-dodge",
    title: "The Marriage Question",
    description: "Aunty asks THE question - dodge it gracefully!",
    difficulty: "intermediate",
    exchanges: [
      {
        id: "1",
        auntyText: {
          fijiHindi: "Beta, shaadi kab karoge?",
          english: "Dear, when will you get married?",
        },
        options: [
          { fijiHindi: "Aunty, abhi padhai kar raha hoon.", english: "Aunty, I'm still studying.", isCorrect: true },
          { fijiHindi: "Jab achchha ladka/ladki milega!", english: "When I find a good match!", isCorrect: true },
          { fijiHindi: "Aunty, aap chai lo pehle!", english: "Aunty, have tea first!", isCorrect: true },
        ],
        timeLimit: 7,
      },
      {
        id: "2",
        auntyText: {
          fijiHindi: "Mere bete/beti ko dekho, kitna achchha hai!",
          english: "Look at my son/daughter, how good they are!",
        },
        options: [
          { fijiHindi: "Haan Aunty, bahut achchha hai.", english: "Yes Aunty, very good.", isCorrect: true },
          { fijiHindi: "Mujhe Maa-Baap se poochna padega.", english: "I need to ask my parents.", isCorrect: true },
          { fijiHindi: "Aunty, woh kya kaam karta hai?", english: "Aunty, what work do they do?", isCorrect: false },
        ],
        timeLimit: 6,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Tum bahut choosy ho!",
          english: "You're too picky!",
        },
        options: [
          { fijiHindi: "Aunty, sahi waqt aayega.", english: "Aunty, the right time will come.", isCorrect: true },
          { fijiHindi: "Kya karein, aise hi hoon!", english: "What to do, I'm like this!", isCorrect: true },
          { fijiHindi: "Aap ki baat sahi hai.", english: "What you say is right.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Achchha, mein Maa ko phone karti hoon!",
          english: "Okay, I'll call your mother!",
        },
        options: [
          { fijiHindi: "Theek hai Aunty!", english: "Okay Aunty!", isCorrect: true },
          { fijiHindi: "Zaroor, baat kar lijiye.", english: "Sure, please talk.", isCorrect: true },
          { fijiHindi: "Aunty, chai toh lo!", english: "Aunty, at least have tea!", isCorrect: true },
        ],
        timeLimit: 5,
      },
    ],
    phrases: [
      "Shaadi - Marriage",
      "Padhai - Studies",
      "Ladka/Ladki - Boy/Girl",
      "Choosy - Picky",
      "Sahi waqt - Right time",
    ],
  },
  {
    id: "food-offering",
    title: "Feed the Aunty",
    description: "Aunty's hungry - offer food properly!",
    difficulty: "beginner",
    exchanges: [
      {
        id: "1",
        auntyText: {
          fijiHindi: "Kya bana hai ghar mein?",
          english: "What's been cooked at home?",
        },
        options: [
          { fijiHindi: "Aunty, roti sabzi hai.", english: "Aunty, there's roti and vegetables.", isCorrect: true },
          { fijiHindi: "Dal chawal bana hai.", english: "Dal rice is made.", isCorrect: true },
          { fijiHindi: "Kuch bhi nahi hai!", english: "There's nothing!", isCorrect: false },
        ],
        timeLimit: 7,
      },
      {
        id: "2",
        auntyText: {
          fijiHindi: "Khana khilao beta!",
          english: "Feed me dear!",
        },
        options: [
          { fijiHindi: "Zaroor Aunty, baithiye!", english: "Of course Aunty, sit!", isCorrect: true },
          { fijiHindi: "Abhi laati hoon Aunty!", english: "I'll bring it now Aunty!", isCorrect: true },
          { fijiHindi: "Kitna khaaoge Aunty?", english: "How much will you eat?", isCorrect: false },
        ],
        timeLimit: 6,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Bahut swadisht hai!",
          english: "It's very delicious!",
        },
        options: [
          { fijiHindi: "Dhanyavaad Aunty!", english: "Thank you Aunty!", isCorrect: true },
          { fijiHindi: "Aur lijiye!", english: "Have more!", isCorrect: true },
          { fijiHindi: "Maa ne banaya hai.", english: "Mom made it.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Aur do thoda!",
          english: "Give me a little more!",
        },
        options: [
          { fijiHindi: "Lijiye Aunty!", english: "Here you go Aunty!", isCorrect: true },
          { fijiHindi: "Bahut khush hui!", english: "Very happy!", isCorrect: true },
          { fijiHindi: "Aur bhi hai, lo!", english: "There's more, take!", isCorrect: true },
        ],
        timeLimit: 5,
      },
    ],
    phrases: [
      "Khana - Food",
      "Roti - Flatbread",
      "Sabzi - Vegetables",
      "Swadisht - Delicious",
      "Aur do - Give more",
    ],
  },
];

// Get scenario by ID
export function getAuntyScenarioById(id: string): AuntyScenario | undefined {
  return AUNTY_SCENARIOS.find((s) => s.id === id);
}

// Get random scenario for difficulty
export function getRandomAuntyScenario(
  difficulty?: "beginner" | "intermediate" | "advanced"
): AuntyScenario {
  const filtered = difficulty
    ? AUNTY_SCENARIOS.filter((s) => s.difficulty === difficulty)
    : AUNTY_SCENARIOS;
  return filtered[Math.floor(Math.random() * filtered.length)];
}
