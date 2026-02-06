// Quick exchanges for "Aunty's Coming" mode - AUTHENTIC FIJI HINDI
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
          { fijiHindi: "Aunty, andar aao!", english: "Aunty, come inside!", isCorrect: true },
        ],
        timeLimit: 8,
      },
      {
        id: "2",
        auntyText: {
          fijiHindi: "Beta, kaise hai? Long time nai dekha!",
          english: "Dear, how are you? Haven't seen you in a long time!",
        },
        options: [
          { fijiHindi: "Ham tik hai Aunty!", english: "I'm fine Aunty!", isCorrect: true },
          { fijiHindi: "Ha, bahut din ho gaya!", english: "Yes, it's been so long!", isCorrect: true },
          { fijiHindi: "Tum kaise hai?", english: "How are you?", isCorrect: true },
        ],
        timeLimit: 7,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Chai pilaega ki nai?",
          english: "Will you offer me tea or not?",
        },
        options: [
          { fijiHindi: "Ha Aunty, abhi banata!", english: "Yes Aunty, making it now!", isCorrect: true },
          { fijiHindi: "Zaroor Aunty!", english: "Of course Aunty!", isCorrect: true },
          { fijiHindi: "Chai ya coffee?", english: "Tea or coffee?", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Tumre Maa-Baap kaha hai?",
          english: "Where are your parents?",
        },
        options: [
          { fijiHindi: "Bahar gaya hai.", english: "They went out.", isCorrect: true },
          { fijiHindi: "Ghar me hai.", english: "They're home.", isCorrect: true },
          { fijiHindi: "Abhi aata hai.", english: "They're coming.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "5",
        auntyText: {
          fijiHindi: "Acha beta, ham jata. Fir aega!",
          english: "Okay dear, I'm going. I'll come again!",
        },
        options: [
          { fijiHindi: "Tik hai Aunty, fir melega!", english: "Okay Aunty, see you later!", isCorrect: true },
          { fijiHindi: "Aana zaroor Aunty!", english: "Do come Aunty!", isCorrect: true },
          { fijiHindi: "Namaste Aunty!", english: "Goodbye Aunty!", isCorrect: true },
        ],
        timeLimit: 7,
      },
    ],
    phrases: [
      "Namaste - Hello/Greetings",
      "Kaise hai? - How are you?",
      "Ham tik hai - I'm fine",
      "Chai - Tea",
      "Fir melega - See you later",
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
          fijiHindi: "Beta, shaadi kab karega?",
          english: "Dear, when will you get married?",
        },
        options: [
          { fijiHindi: "Aunty, abhi study karta.", english: "Aunty, I'm still studying.", isCorrect: true },
          { fijiHindi: "Jab acha match milega!", english: "When I find a good match!", isCorrect: true },
          { fijiHindi: "Aunty, pehle chai lo!", english: "Aunty, have tea first!", isCorrect: true },
        ],
        timeLimit: 7,
      },
      {
        id: "2",
        auntyText: {
          fijiHindi: "Hamar beta dekho, kitna acha hai!",
          english: "Look at my son/daughter, how good they are!",
        },
        options: [
          { fijiHindi: "Ha Aunty, bahut acha hai.", english: "Yes Aunty, very good.", isCorrect: true },
          { fijiHindi: "Hamka Maa-Baap se poochna padega.", english: "I need to ask my parents.", isCorrect: true },
          { fijiHindi: "Aunty, wo kaunchi kaam karta?", english: "Aunty, what work do they do?", isCorrect: false },
        ],
        timeLimit: 6,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Tum bahut choosy hai!",
          english: "You're too picky!",
        },
        options: [
          { fijiHindi: "Aunty, sahi time aega.", english: "Aunty, the right time will come.", isCorrect: true },
          { fijiHindi: "Kaunchi kare, aise hi hai ham!", english: "What to do, I'm like this!", isCorrect: true },
          { fijiHindi: "Tumre baat sahi hai.", english: "What you say is right.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Acha, ham Maa ke phone karta!",
          english: "Okay, I'll call your mother!",
        },
        options: [
          { fijiHindi: "Tik hai Aunty!", english: "Okay Aunty!", isCorrect: true },
          { fijiHindi: "Zaroor, baat kar lo.", english: "Sure, please talk.", isCorrect: true },
          { fijiHindi: "Aunty, chai to lo!", english: "Aunty, at least have tea!", isCorrect: true },
        ],
        timeLimit: 5,
      },
    ],
    phrases: [
      "Shaadi - Marriage",
      "Study - Studies",
      "Larka/Larki - Boy/Girl",
      "Choosy - Picky",
      "Sahi time - Right time",
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
          fijiHindi: "Kaunchi bana hai ghar me?",
          english: "What's been cooked at home?",
        },
        options: [
          { fijiHindi: "Aunty, roti tarkari hai.", english: "Aunty, there's roti and curry.", isCorrect: true },
          { fijiHindi: "Dhal chawal bana hai.", english: "Dal rice is made.", isCorrect: true },
          { fijiHindi: "Kuch nai hai!", english: "There's nothing!", isCorrect: false },
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
          { fijiHindi: "Zaroor Aunty, baitho!", english: "Of course Aunty, sit!", isCorrect: true },
          { fijiHindi: "Abhi laata Aunty!", english: "I'll bring it now Aunty!", isCorrect: true },
          { fijiHindi: "Kitna khaega Aunty?", english: "How much will you eat?", isCorrect: false },
        ],
        timeLimit: 6,
      },
      {
        id: "3",
        auntyText: {
          fijiHindi: "Julum! Bahut mita hai!",
          english: "Amazing! It's very tasty!",
        },
        options: [
          { fijiHindi: "Dhanyabad Aunty!", english: "Thank you Aunty!", isCorrect: true },
          { fijiHindi: "Aur lo!", english: "Have more!", isCorrect: true },
          { fijiHindi: "Maa bana hai.", english: "Mom made it.", isCorrect: true },
        ],
        timeLimit: 6,
      },
      {
        id: "4",
        auntyText: {
          fijiHindi: "Thora aur do!",
          english: "Give me a little more!",
        },
        options: [
          { fijiHindi: "Lo Aunty!", english: "Here you go Aunty!", isCorrect: true },
          { fijiHindi: "Bahut khush hai ham!", english: "I'm very happy!", isCorrect: true },
          { fijiHindi: "Aur bhi hai, lo!", english: "There's more, take!", isCorrect: true },
        ],
        timeLimit: 5,
      },
    ],
    phrases: [
      "Khana - Food",
      "Roti - Flatbread",
      "Tarkari - Curry/Vegetables",
      "Julum - Amazing/Delicious",
      "Mita - Tasty/Sweet",
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
