// Family Gathering scenarios - multi-character party scenes

export interface FamilyMemberChar {
  id: string;
  name: string;
  emoji: string;
  relationship: string;
  position: { x: number; y: number };
  talked: boolean;
}

export interface GatheringExchange {
  memberId: string;
  dialogue: {
    speaker: "relative" | "user";
    fijiHindi: string;
    english: string;
    options?: { fijiHindi: string; english: string }[];
  }[];
}

export interface GatheringScenario {
  id: string;
  title: string;
  description: string;
  members: FamilyMemberChar[];
  exchanges: GatheringExchange[];
  phrases: string[];
}

export const GATHERING_SCENARIOS: GatheringScenario[] = [
  {
    id: "birthday-party",
    title: "Birthday Party",
    description: "It's Nani's birthday! Greet everyone at the party.",
    members: [
      { id: "nani", name: "Nani", emoji: "👵", relationship: "Grandmother", position: { x: 50, y: 30 }, talked: false },
      { id: "chacha", name: "Chacha", emoji: "👨", relationship: "Uncle", position: { x: 25, y: 45 }, talked: false },
      { id: "chachi", name: "Chachi", emoji: "👩", relationship: "Aunt", position: { x: 75, y: 45 }, talked: false },
      { id: "bhai", name: "Rohit Bhai", emoji: "👦", relationship: "Cousin", position: { x: 30, y: 65 }, talked: false },
      { id: "bahin", name: "Priya", emoji: "👧", relationship: "Cousin", position: { x: 70, y: 65 }, talked: false },
      { id: "dada", name: "Dada", emoji: "👴", relationship: "Grandfather", position: { x: 50, y: 50 }, talked: false },
    ],
    exchanges: [
      {
        memberId: "nani",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre beta! Aaye tum! Khush hui mein!", english: "Oh dear! You came! I'm so happy!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Happy Birthday Nani! Bahut pyaar!", english: "Happy Birthday Nani! Much love!" },
              { fijiHindi: "Nani, janamdin mubarak ho!", english: "Nani, happy birthday!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Dhanyavaad beta! Khana khao, bahut banaya hai!", english: "Thank you dear! Eat food, made lots!" },
        ]
      },
      {
        memberId: "chacha",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Kaise ho? Bade ho gaye!", english: "Dear! How are you? You've grown!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Namaste Chacha! Theek hoon.", english: "Hello Uncle! I'm fine." },
              { fijiHindi: "Chacha! Aap kaise ho?", english: "Uncle! How are you?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Achchha hai! Padhai kaisa chal raha?", english: "Good! How are studies going?" },
        ]
      },
      {
        memberId: "chachi",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre! Kitna sundar lag rahe ho!", english: "Oh! You look so beautiful/handsome!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Shukriya Chachi!", english: "Thank you Aunty!" },
              { fijiHindi: "Aap bhi bahut sundar ho Chachi!", english: "You also look beautiful Aunty!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Chalo, mithai lo!", english: "Come, have sweets!" },
        ]
      },
      {
        memberId: "bhai",
        dialogue: [
          { speaker: "relative", fijiHindi: "Bhai! Kaisa hai? Long time!", english: "Bro! How are you? Long time!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Rohit! Mast hoon yaar!", english: "Rohit! I'm great bro!" },
              { fijiHindi: "Bhai! Bahut din ho gaye!", english: "Bro! It's been so long!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Haan yaar! Baad mein cricket khelenge?", english: "Yeah man! Play cricket later?" },
        ]
      },
      {
        memberId: "bahin",
        dialogue: [
          { speaker: "relative", fijiHindi: "Didi/Bhaiya! Finally aaye!", english: "Sis/Bro! Finally you came!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Priya! Miss kiya tumko!", english: "Priya! Missed you!" },
              { fijiHindi: "Haan! Traffic bahut tha!", english: "Yeah! There was lots of traffic!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Chalo selfie lete hai!", english: "Come let's take a selfie!" },
        ]
      },
      {
        memberId: "dada",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta, idhar aao. Baitho mere paas.", english: "Dear, come here. Sit next to me." },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ji Dada, kaise ho aap?", english: "Yes Grandpa, how are you?" },
              { fijiHindi: "Dada! Bahut yaad kiya aapko!", english: "Grandpa! Missed you so much!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Achchha hoon beta. Tum batao, sab theek?", english: "I'm good dear. You tell me, all well?" },
        ]
      },
    ],
    phrases: [
      "Janamdin mubarak - Happy birthday",
      "Khush hui - I'm happy",
      "Bade ho gaye - You've grown",
      "Sundar - Beautiful/handsome",
      "Mithai - Sweets",
      "Bahut din ho gaye - It's been so long",
    ],
  },
  {
    id: "diwali-gathering",
    title: "Diwali Celebration",
    description: "Diwali at home! Light diyas and greet family.",
    members: [
      { id: "maa", name: "Maa", emoji: "👩", relationship: "Mother", position: { x: 50, y: 25 }, talked: false },
      { id: "baap", name: "Baap", emoji: "👨", relationship: "Father", position: { x: 30, y: 40 }, talked: false },
      { id: "bua", name: "Bua", emoji: "👩", relationship: "Aunt", position: { x: 70, y: 40 }, talked: false },
      { id: "phupha", name: "Phupha", emoji: "👨", relationship: "Uncle", position: { x: 25, y: 60 }, talked: false },
      { id: "bahin", name: "Chhoti", emoji: "👧", relationship: "Sister", position: { x: 75, y: 60 }, talked: false },
    ],
    exchanges: [
      {
        memberId: "maa",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Diya jalao, puja shuru hogi!", english: "Dear! Light the lamp, prayer will start!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ji Maa, abhi karta hoon!", english: "Yes Mum, doing it now!" },
              { fijiHindi: "Maa, diya kahan hai?", english: "Mum, where is the lamp?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Bahut achchha! Diwali mubarak beta!", english: "Very good! Happy Diwali dear!" },
        ]
      },
      {
        memberId: "baap",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta, patakhe laye? Chalein bahar?", english: "Dear, got firecrackers? Shall we go outside?" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Haan Baap! Chaliye!", english: "Yes Dad! Let's go!" },
              { fijiHindi: "Baap, pehle prasad lete hai.", english: "Dad, let's have prasad first." },
            ]
          },
          { speaker: "relative", fijiHindi: "Theek hai, pehle Lakshmi puja, phir patakhe!", english: "Okay, first Lakshmi prayer, then firecrackers!" },
        ]
      },
      {
        memberId: "bua",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre mere ladoo! Diwali mubarak!", english: "Oh my sweetie! Happy Diwali!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Bua! Diwali mubarak! Kaise ho?", english: "Aunty! Happy Diwali! How are you?" },
              { fijiHindi: "Bua! Bahut maza aaya aapko dekh ke!", english: "Aunty! So happy to see you!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Ye lo, tumhare liye gift laayi!", english: "Here, brought a gift for you!" },
        ]
      },
      {
        memberId: "phupha",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Diwali ki badhaai! Kaisa hai sab?", english: "Dear! Diwali greetings! How's everything?" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Phupha ji! Sab theek hai, aap sunao!", english: "Uncle! All good, you tell!" },
              { fijiHindi: "Badhaai ho Phupha! Khushi ki baat hai!", english: "Congrats Uncle! It's a happy occasion!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Bahut achchha! Rangoli dekhi? Bua ne banaya!", english: "Very good! Saw the rangoli? Bua made it!" },
        ]
      },
      {
        memberId: "bahin",
        dialogue: [
          { speaker: "relative", fijiHindi: "Didi/Bhaiya! Mere saath aao, rangoli mein help karo!", english: "Sis/Bro! Come with me, help with rangoli!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Haan Chhoti, chalo!", english: "Yes little one, let's go!" },
              { fijiHindi: "Theek hai, kaunsa colour chahiye?", english: "Okay, which color do you need?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Yay! Tum sabse achchhe ho!", english: "Yay! You're the best!" },
        ]
      },
    ],
    phrases: [
      "Diwali mubarak - Happy Diwali",
      "Diya - Lamp",
      "Puja - Prayer/worship",
      "Patakhe - Firecrackers",
      "Prasad - Blessed food offering",
      "Rangoli - Decorative floor art",
      "Badhaai - Congratulations",
    ],
  },
];

export function getGatheringScenarioById(id: string): GatheringScenario | undefined {
  return GATHERING_SCENARIOS.find(s => s.id === id);
}

export function getRandomGatheringScenario(): GatheringScenario {
  return GATHERING_SCENARIOS[Math.floor(Math.random() * GATHERING_SCENARIOS.length)];
}
