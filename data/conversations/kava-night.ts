// Kava Night with Dad - AUTHENTIC FIJI HINDI
// Stories, proverbs, and life wisdom

export interface StorySegment {
  id: string;
  dadSays: {
    fijiHindi: string;
    english: string;
  };
  userResponses?: {
    fijiHindi: string;
    english: string;
  }[];
  culturalNote?: {
    title: string;
    content: string;
  };
  proverb?: {
    fijiHindi: string;
    english: string;
    meaning: string;
  };
}

export interface KavaStory {
  id: string;
  title: string;
  titleHindi: string;
  topic: string;
  segments: StorySegment[];
  phrases: string[];
}

export const KAVA_STORIES: KavaStory[] = [
  {
    id: "fiji-journey",
    title: "The Journey to Fiji",
    titleHindi: "Fiji Ke Safar",
    topic: "Family History",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, tum jaane hai hamar family Fiji kaise aaya?",
          english: "Dear, do you know how our family came to Fiji?",
        },
        userResponses: [
          { fijiHindi: "Nai Baap, batao na.", english: "No Dad, please tell." },
          { fijiHindi: "Ha, thora suna hai.", english: "Yes, heard a little." },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Bahut saal pehle, India se jahaz aaya. Hamar pardada us jahaz me tha.",
          english: "Many years ago, a ship came from India. Our great-grandfather was on that ship.",
        },
        culturalNote: {
          title: "Girmitiya History",
          content: "Between 1879-1916, over 60,000 Indians came to Fiji as indentured laborers (Girmitiyas). They were brought to work on sugar cane plantations.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Woke 'Girmitiya' bolta tha. Bahut mushkil life tha, par woke himmat nai haara.",
          english: "They were called 'Girmitiya'. Life was very hard, but they didn't lose courage.",
        },
        proverb: {
          fijiHindi: "Himmat ke aage jeet hai.",
          english: "Victory lies beyond courage.",
          meaning: "With courage, you can overcome anything.",
        },
      },
      {
        id: "4",
        dadSays: {
          fijiHindi: "Isliye hamesha yaad rakhna - tum Girmitiya ke bachcha hai. Proud baat hai.",
          english: "So always remember - you are descendants of Girmitiyas. It's something to be proud of.",
        },
        userResponses: [
          { fijiHindi: "Ha Baap, proud hai ham.", english: "Yes Dad, I'm proud." },
          { fijiHindi: "Dhanyabad batane ke liye.", english: "Thank you for telling me." },
        ],
      },
    ],
    phrases: [
      "Family - Family",
      "Jahaz - Ship",
      "Pardada - Great-grandfather",
      "Himmat - Courage",
      "Bachcha - Children/Descendants",
      "Proud - Pride",
    ],
  },
  {
    id: "hard-work",
    title: "Value of Hard Work",
    titleHindi: "Mehnat Ke Baat",
    topic: "Life Lessons",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, aaj kuch sikhne wala baat batata.",
          english: "Dear, today I'll tell you something worth learning.",
        },
        userResponses: [
          { fijiHindi: "Ha Baap, ham sunta.", english: "Yes Dad, I'm listening." },
          { fijiHindi: "Kaunchi baat hai?", english: "What is it?" },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Life me mehnat se bada koi shortcut nai hai.",
          english: "In life, there's no shortcut bigger than hard work.",
        },
        proverb: {
          fijiHindi: "Kar bhala, ho bhala.",
          english: "Do good, receive good.",
          meaning: "Good deeds bring good results.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Dekho, hamar dada subah 4 baje uth ke khet me jata tha.",
          english: "See, our grandfather used to wake up at 4 AM and go to the farm.",
        },
        culturalNote: {
          title: "Sugar Cane Farming",
          content: "Fiji Indians traditionally worked in sugar cane fields. Many still farm today, though the industry has changed significantly.",
        },
      },
      {
        id: "4",
        dadSays: {
          fijiHindi: "Woke mehnat ke wajah se aaj ham yaha hai. Kabhi bhoolna mat.",
          english: "Because of their hard work, we are here today. Never forget.",
        },
        userResponses: [
          { fijiHindi: "Samajh gaya Baap.", english: "I understand Dad." },
          { fijiHindi: "Mehnat karega ham hamesha.", english: "I'll always work hard." },
        ],
      },
    ],
    phrases: [
      "Mehnat - Hard work",
      "Life - Life",
      "Khet - Farm/field",
      "Subah - Morning",
      "Bhoolna - To forget",
      "Samajhna - To understand",
    ],
  },
  {
    id: "fiji-culture",
    title: "Fiji Traditions",
    titleHindi: "Fiji Ke Riwaj",
    topic: "Culture",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, Fiji me ham Indian aur Fijian dono culture follow karta.",
          english: "Dear, in Fiji we follow both Indian and Fijian culture.",
        },
        userResponses: [
          { fijiHindi: "Sachi? Kaise Baap?", english: "Really? How Dad?" },
          { fijiHindi: "Ha, dekha hai ham.", english: "Yes, I've seen it." },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Jaise nangona - ye Fijian tradition hai jo ham adopt kiya.",
          english: "Like kava - this is a Fijian tradition we adopted.",
        },
        culturalNote: {
          title: "Kava (Yaqona/Nangona)",
          content: "Kava is a traditional Fijian drink made from pepper plant roots. It's shared in a ceremony using a wooden bowl called 'tanoa' and coconut cups called 'bilo'. Fiji Indians adopted this tradition and it's now part of their social gatherings.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Aur ham apna khana, boli aur tyohaar bhi sambhaal ke rakha.",
          english: "And we also preserved our food, language and festivals.",
        },
        proverb: {
          fijiHindi: "Apna mitti se pyaar karo.",
          english: "Love your own soil.",
          meaning: "Stay connected to your roots and culture.",
        },
      },
      {
        id: "4",
        dadSays: {
          fijiHindi: "Ye sab tumre heritage hai. Iske zinda rakhna tumre kaam hai.",
          english: "All this is your heritage. Keeping it alive is your duty.",
        },
        userResponses: [
          { fijiHindi: "Zaroor Baap, yaad rakhega.", english: "Sure Dad, I'll remember." },
          { fijiHindi: "Tumre heritage hamar heritage.", english: "Your heritage is my heritage." },
        ],
      },
    ],
    phrases: [
      "Riwaj - Tradition",
      "Adopt karna - To adopt",
      "Boli - Language",
      "Tyohaar - Festival",
      "Heritage - Heritage",
      "Zinda - Alive",
      "Nangona - Kava",
      "Bilo - Coconut cup",
    ],
  },
  {
    id: "respect-elders",
    title: "Respecting Elders",
    titleHindi: "Bada Log Ke Izzat",
    topic: "Values",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, hamar culture me bada log ke izzat bahut zaroori hai.",
          english: "Dear, in our culture respecting elders is very important.",
        },
        userResponses: [
          { fijiHindi: "Ha Baap, pata hai.", english: "Yes Dad, I know." },
          { fijiHindi: "Kaahe itna zaroori hai?", english: "Why is it so important?" },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Bada log hamse pehle duniya dekh chuka hai. Woke experience julum hai.",
          english: "Elders have seen the world before us. Their experience is amazing/priceless.",
        },
        proverb: {
          fijiHindi: "Bada log ke aashirwad se ghar banta hai.",
          english: "With elders' blessings, a home is built.",
          meaning: "Elders' blessings bring prosperity and happiness.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Jab bada log baat kare, dhyan se suno. Woke pair chhoona bhoolna mat.",
          english: "When elders speak, listen carefully. Don't forget to touch their feet.",
        },
        culturalNote: {
          title: "Touching Feet (Pranam)",
          content: "Touching elders' feet (Pranam/Charan Sparsh) is a traditional Indian gesture of respect. It's commonly practiced during greetings, festivals, and when seeking blessings.",
        },
      },
      {
        id: "4",
        dadSays: {
          fijiHindi: "Tum bhi ek din bada hoga. Tab samjhega ye sab kitna important hai.",
          english: "You'll also become an elder one day. Then you'll understand how important this all is.",
        },
        userResponses: [
          { fijiHindi: "Sahi baat hai Baap.", english: "You're right Dad." },
          { fijiHindi: "Hamesha yaad rakhega.", english: "I'll always remember." },
        ],
      },
    ],
    phrases: [
      "Izzat - Respect",
      "Bada log - Elders",
      "Experience - Experience",
      "Julum - Amazing/Priceless",
      "Aashirwad - Blessings",
      "Pair chhoona - Touch feet",
      "Kaahe - Why",
    ],
  },
];

export function getKavaStoryById(id: string): KavaStory | undefined {
  return KAVA_STORIES.find(s => s.id === id);
}

export function getRandomKavaStory(): KavaStory {
  return KAVA_STORIES[Math.floor(Math.random() * KAVA_STORIES.length)];
}
