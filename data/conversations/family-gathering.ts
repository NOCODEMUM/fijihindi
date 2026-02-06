// Family Gathering scenarios - AUTHENTIC FIJI HINDI
// Multi-character party scenes

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
      { id: "bhaini", name: "Priya", emoji: "👧", relationship: "Cousin", position: { x: 70, y: 65 }, talked: false },
      { id: "dada", name: "Dada", emoji: "👴", relationship: "Grandfather", position: { x: 50, y: 50 }, talked: false },
    ],
    exchanges: [
      {
        memberId: "nani",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre beta! Aaya tum! Bahut khush hai ham!", english: "Oh dear! You came! I'm so happy!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Happy Birthday Nani! Bahut pyaar!", english: "Happy Birthday Nani! Much love!" },
              { fijiHindi: "Nani, janamdin mubarak!", english: "Nani, happy birthday!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Dhanyabad beta! Khana khao, bahut bana hai!", english: "Thank you dear! Eat food, made lots!" },
        ]
      },
      {
        memberId: "chacha",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Kaise hai? Bada ho gaya!", english: "Dear! How are you? You've grown!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Namaste Chacha! Ham tik hai.", english: "Hello Uncle! I'm fine." },
              { fijiHindi: "Chacha! Tum kaise hai?", english: "Uncle! How are you?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Acha hai! Study kaisa chal raha?", english: "Good! How are studies going?" },
        ]
      },
      {
        memberId: "chachi",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre! Kitna sundar lag raha!", english: "Oh! You look so beautiful/handsome!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Shukriya Chachi!", english: "Thank you Aunty!" },
              { fijiHindi: "Tum bhi bahut sundar hai Chachi!", english: "You also look beautiful Aunty!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Chalo, mita lo!", english: "Come, have sweets!" },
        ]
      },
      {
        memberId: "bhai",
        dialogue: [
          { speaker: "relative", fijiHindi: "Bhai! Kaisa hai? Long time!", english: "Bro! How are you? Long time!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Rohit! Set hai yaar!", english: "Rohit! I'm great bro!" },
              { fijiHindi: "Bhai! Bahut din ho gaya!", english: "Bro! It's been so long!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Habrat yaar! Baad me cricket khelega?", english: "Yeah man! Play cricket later?" },
        ]
      },
      {
        memberId: "bhaini",
        dialogue: [
          { speaker: "relative", fijiHindi: "Didi/Bhaiya! Finally aaya!", english: "Sis/Bro! Finally you came!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Priya! Miss kiya tumka!", english: "Priya! Missed you!" },
              { fijiHindi: "Ha! Traffic bahut tha!", english: "Yeah! There was lots of traffic!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Chalo selfie lete!", english: "Come let's take a selfie!" },
        ]
      },
      {
        memberId: "dada",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta, idhar aa. Baitho hamar paas.", english: "Dear, come here. Sit next to me." },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ha Dada, kaise hai tum?", english: "Yes Grandpa, how are you?" },
              { fijiHindi: "Dada! Bahut yaad kiya tumka!", english: "Grandpa! Missed you so much!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Acha hai ham beta. Tum batao, sab tik?", english: "I'm good dear. You tell me, all well?" },
        ]
      },
    ],
    phrases: [
      "Janamdin mubarak - Happy birthday",
      "Bahut khush hai - I'm very happy",
      "Bada ho gaya - You've grown",
      "Sundar - Beautiful/handsome",
      "Mita - Sweets",
      "Bahut din ho gaya - It's been so long",
      "Set hai - I'm good (slang)",
      "Habrat - Yeah/Agreed (slang)",
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
      { id: "bhaini", name: "Chhoti", emoji: "👧", relationship: "Sister", position: { x: 75, y: 60 }, talked: false },
    ],
    exchanges: [
      {
        memberId: "maa",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Diya jalao, puja shuru hoga!", english: "Dear! Light the lamp, prayer will start!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ha Maa, abhi karta!", english: "Yes Mum, doing it now!" },
              { fijiHindi: "Maa, diya kaha hai?", english: "Mum, where is the lamp?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Bahut acha! Diwali mubarak beta!", english: "Very good! Happy Diwali dear!" },
        ]
      },
      {
        memberId: "baap",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta, patakha laya? Chalo bahar?", english: "Dear, got firecrackers? Shall we go outside?" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ha Baap! Chalo!", english: "Yes Dad! Let's go!" },
              { fijiHindi: "Baap, pehle prasad lete.", english: "Dad, let's have prasad first." },
            ]
          },
          { speaker: "relative", fijiHindi: "Tik hai, pehle Lakshmi puja, phir patakha!", english: "Okay, first Lakshmi prayer, then firecrackers!" },
        ]
      },
      {
        memberId: "bua",
        dialogue: [
          { speaker: "relative", fijiHindi: "Arre hamar ladoo! Diwali mubarak!", english: "Oh my sweetie! Happy Diwali!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Bua! Diwali mubarak! Kaise hai?", english: "Aunty! Happy Diwali! How are you?" },
              { fijiHindi: "Bua! Bahut maza aaya tumka dekh ke!", english: "Aunty! So happy to see you!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Ye lo, tumre liye gift laya!", english: "Here, brought a gift for you!" },
        ]
      },
      {
        memberId: "phupha",
        dialogue: [
          { speaker: "relative", fijiHindi: "Beta! Diwali ki badhai! Kaisa hai sab?", english: "Dear! Diwali greetings! How's everything?" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Phupha! Sab tik hai, tum sunao!", english: "Uncle! All good, you tell!" },
              { fijiHindi: "Badhai Phupha! Khushi ke baat hai!", english: "Congrats Uncle! It's a happy occasion!" },
            ]
          },
          { speaker: "relative", fijiHindi: "Bahut acha! Rangoli dekha? Bua bana hai!", english: "Very good! Saw the rangoli? Bua made it!" },
        ]
      },
      {
        memberId: "bhaini",
        dialogue: [
          { speaker: "relative", fijiHindi: "Didi/Bhaiya! Hamar saath aao, rangoli me help karo!", english: "Sis/Bro! Come with me, help with rangoli!" },
          {
            speaker: "user", fijiHindi: "", english: "",
            options: [
              { fijiHindi: "Ha Chhoti, chalo!", english: "Yes little one, let's go!" },
              { fijiHindi: "Tik hai, kaunchi colour chahiye?", english: "Okay, which color do you need?" },
            ]
          },
          { speaker: "relative", fijiHindi: "Yay! Tum sabse acha hai!", english: "Yay! You're the best!" },
        ]
      },
    ],
    phrases: [
      "Diwali mubarak - Happy Diwali",
      "Diya - Lamp",
      "Puja - Prayer/worship",
      "Patakha - Firecrackers",
      "Prasad - Blessed food offering",
      "Rangoli - Decorative floor art",
      "Badhai - Congratulations",
    ],
  },
];

export function getGatheringScenarioById(id: string): GatheringScenario | undefined {
  return GATHERING_SCENARIOS.find(s => s.id === id);
}

export function getRandomGatheringScenario(): GatheringScenario {
  return GATHERING_SCENARIOS[Math.floor(Math.random() * GATHERING_SCENARIOS.length)];
}
