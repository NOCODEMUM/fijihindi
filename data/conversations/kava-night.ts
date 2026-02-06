// Kava Night with Dad - Stories, proverbs, and life wisdom

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
    titleHindi: "Fiji Ki Yatra",
    topic: "Family History",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, jaanta hai humara parivar Fiji kaise aaya?",
          english: "Dear, do you know how our family came to Fiji?",
        },
        userResponses: [
          { fijiHindi: "Nahi Baap, batao na.", english: "No Dad, please tell." },
          { fijiHindi: "Haan, thoda suna hai.", english: "Yes, heard a little." },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Bahut saal pehle, India se jahaz aaya. Humara pardada us jahaz mein tha.",
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
          fijiHindi: "Unko 'Girmitiya' kehte the. Bahut mushkil zindagi thi, par unhone himmat nahi haari.",
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
          fijiHindi: "Isliye hamesha yaad rakhna - tum Girmitiya ke vanshaj ho. Garv ki baat hai.",
          english: "So always remember - you are descendants of Girmitiyas. It's a matter of pride.",
        },
        userResponses: [
          { fijiHindi: "Haan Baap, garv hai mujhe.", english: "Yes Dad, I'm proud." },
          { fijiHindi: "Dhanyavaad batane ke liye.", english: "Thank you for telling me." },
        ],
      },
    ],
    phrases: [
      "Parivar - Family",
      "Jahaz - Ship",
      "Pardada - Great-grandfather",
      "Himmat - Courage",
      "Vanshaj - Descendants",
      "Garv - Pride",
    ],
  },
  {
    id: "hard-work",
    title: "Value of Hard Work",
    titleHindi: "Mehnat Ka Matlab",
    topic: "Life Lessons",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, aaj kuch seekhne wali baat batata hoon.",
          english: "Dear, today I'll tell you something worth learning.",
        },
        userResponses: [
          { fijiHindi: "Ji Baap, suno raha hoon.", english: "Yes Dad, I'm listening." },
          { fijiHindi: "Kya baat hai?", english: "What is it?" },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Zindagi mein mehnat se bada koi shortcut nahi hai.",
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
          fijiHindi: "Dekho, humara dada subah 4 baje uthke khet mein jaata tha.",
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
          fijiHindi: "Unki mehnat ki wajah se aaj hum yahan hai. Kabhi bhoolna mat.",
          english: "Because of their hard work, we are here today. Never forget.",
        },
        userResponses: [
          { fijiHindi: "Samajh gaya Baap.", english: "I understand Dad." },
          { fijiHindi: "Mehnat karunga hamesha.", english: "I'll always work hard." },
        ],
      },
    ],
    phrases: [
      "Mehnat - Hard work",
      "Zindagi - Life",
      "Khet - Farm/field",
      "Subah - Morning",
      "Bhoolna - To forget",
      "Samajhna - To understand",
    ],
  },
  {
    id: "fiji-culture",
    title: "Fiji Traditions",
    titleHindi: "Fiji Ki Parampara",
    topic: "Culture",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, Fiji mein hum Indian aur Fijian dono culture follow karte hai.",
          english: "Dear, in Fiji we follow both Indian and Fijian culture.",
        },
        userResponses: [
          { fijiHindi: "Achchha? Kaise Baap?", english: "Really? How Dad?" },
          { fijiHindi: "Haan, dekha hai maine.", english: "Yes, I've seen it." },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Jaise kava - ye Fijian tradition hai jo humne adopt kiya.",
          english: "Like kava - this is a Fijian tradition we adopted.",
        },
        culturalNote: {
          title: "Kava (Yaqona)",
          content: "Kava is a traditional Fijian drink made from pepper plant roots. It's shared in a ceremony using a wooden bowl called 'tanoa'. Fiji Indians adopted this tradition and it's now part of their social gatherings.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Aur hum apna khana, bhasha aur tyohaar bhi sambhaal ke rakhe.",
          english: "And we also preserved our food, language and festivals.",
        },
        proverb: {
          fijiHindi: "Apni mitti se pyaar karo.",
          english: "Love your own soil.",
          meaning: "Stay connected to your roots and culture.",
        },
      },
      {
        id: "4",
        dadSays: {
          fijiHindi: "Ye sab tumhara heritage hai. Isse zinda rakhna tumhara kaam hai.",
          english: "All this is your heritage. Keeping it alive is your duty.",
        },
        userResponses: [
          { fijiHindi: "Zaroor Baap, rakhunga yaad.", english: "Sure Dad, I'll remember." },
          { fijiHindi: "Aapka heritage mera heritage.", english: "Your heritage is my heritage." },
        ],
      },
    ],
    phrases: [
      "Parampara - Tradition",
      "Adopt karna - To adopt",
      "Bhasha - Language",
      "Tyohaar - Festival",
      "Heritage - Heritage",
      "Zinda - Alive",
    ],
  },
  {
    id: "respect-elders",
    title: "Respecting Elders",
    titleHindi: "Bado Ka Sammaan",
    topic: "Values",
    segments: [
      {
        id: "1",
        dadSays: {
          fijiHindi: "Beta, hamari sanskriti mein bado ka sammaan bahut zaroori hai.",
          english: "Dear, in our culture respecting elders is very important.",
        },
        userResponses: [
          { fijiHindi: "Haan Baap, pata hai.", english: "Yes Dad, I know." },
          { fijiHindi: "Kyun itna zaroori hai?", english: "Why is it so important?" },
        ],
      },
      {
        id: "2",
        dadSays: {
          fijiHindi: "Bade log humse pehle duniya dekh chuke hai. Unka anubhav anmol hai.",
          english: "Elders have seen the world before us. Their experience is priceless.",
        },
        proverb: {
          fijiHindi: "Bado ke ashirvaad se ghar banta hai.",
          english: "With elders' blessings, a home is built.",
          meaning: "Elders' blessings bring prosperity and happiness.",
        },
      },
      {
        id: "3",
        dadSays: {
          fijiHindi: "Jab bade baat kare, dhyan se suno. Unke pair chhoona bhoolna mat.",
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
          fijiHindi: "Tum bhi ek din bade hoge. Tab samjhoge ye sab kitna mayne rakhta hai.",
          english: "You'll also become an elder one day. Then you'll understand how much this all matters.",
        },
        userResponses: [
          { fijiHindi: "Sahi baat hai Baap.", english: "You're right Dad." },
          { fijiHindi: "Hamesha yaad rakhunga.", english: "I'll always remember." },
        ],
      },
    ],
    phrases: [
      "Sammaan - Respect",
      "Bade/Bado - Elders",
      "Anubhav - Experience",
      "Anmol - Priceless",
      "Ashirvaad - Blessings",
      "Pair chhoona - Touch feet",
    ],
  },
];

export function getKavaStoryById(id: string): KavaStory | undefined {
  return KAVA_STORIES.find(s => s.id === id);
}

export function getRandomKavaStory(): KavaStory {
  return KAVA_STORIES[Math.floor(Math.random() * KAVA_STORIES.length)];
}
