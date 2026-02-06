// Cooking with Mum - AUTHENTIC FIJI HINDI
// Fiji recipes with vocabulary

export interface RecipeStep {
  id: string;
  instruction: {
    fijiHindi: string;
    english: string;
  };
  vocabulary: {
    fijiHindi: string;
    english: string;
    emoji?: string;
  }[];
  mumSays?: {
    fijiHindi: string;
    english: string;
  };
}

export interface Recipe {
  id: string;
  name: string;
  nameHindi: string;
  emoji: string;
  description: string;
  prepTime: string;
  steps: RecipeStep[];
  phrases: string[];
}

export const RECIPES: Recipe[] = [
  {
    id: "dhal-chawal",
    name: "Dal Rice",
    nameHindi: "Dhal Chawal",
    emoji: "🍛",
    description: "Classic Fiji Indian comfort food",
    prepTime: "30 mins",
    steps: [
      {
        id: "1",
        instruction: {
          fijiHindi: "Pehle, dhal-wa ke pani me dhona hai.",
          english: "First, wash the lentils in water.",
        },
        vocabulary: [
          { fijiHindi: "Dhal", english: "Lentils", emoji: "🫘" },
          { fijiHindi: "Pani", english: "Water", emoji: "💧" },
          { fijiHindi: "Dhona", english: "To wash", emoji: "🧼" },
        ],
        mumSays: {
          fijiHindi: "Tin baar dhona, saaf hona chahiye!",
          english: "Wash three times, must be clean!",
        },
      },
      {
        id: "2",
        instruction: {
          fijiHindi: "Ab pressure cooker me dhal daalo.",
          english: "Now put lentils in the pressure cooker.",
        },
        vocabulary: [
          { fijiHindi: "Pressure cooker", english: "Pressure cooker", emoji: "🍳" },
          { fijiHindi: "Daalna", english: "To put/add", emoji: "➕" },
        ],
        mumSays: {
          fijiHindi: "Pani dhal se thora zyaada hona chahiye.",
          english: "Water should be a bit more than lentils.",
        },
      },
      {
        id: "3",
        instruction: {
          fijiHindi: "Haldi, namak aur mirchi daalo.",
          english: "Add turmeric, salt and chili.",
        },
        vocabulary: [
          { fijiHindi: "Haldi", english: "Turmeric", emoji: "🟡" },
          { fijiHindi: "Namak", english: "Salt", emoji: "🧂" },
          { fijiHindi: "Mirchi", english: "Chili", emoji: "🌶️" },
        ],
        mumSays: {
          fijiHindi: "Mirchi kam daalo, nai to bahut teekha ho jaega!",
          english: "Add less chili, otherwise it'll be too spicy!",
        },
      },
      {
        id: "4",
        instruction: {
          fijiHindi: "Aag lagao aur tin seeti aane do.",
          english: "Put on fire and let three whistles come.",
        },
        vocabulary: [
          { fijiHindi: "Aag", english: "Fire/flame", emoji: "🔥" },
          { fijiHindi: "Seeti", english: "Whistle", emoji: "📢" },
          { fijiHindi: "Tin", english: "Three", emoji: "3️⃣" },
        ],
      },
      {
        id: "5",
        instruction: {
          fijiHindi: "Alag se tadka banao - ghee me jeera bhuno.",
          english: "Make tempering separately - roast cumin in ghee.",
        },
        vocabulary: [
          { fijiHindi: "Tadka", english: "Tempering", emoji: "✨" },
          { fijiHindi: "Ghee", english: "Clarified butter", emoji: "🧈" },
          { fijiHindi: "Jeera", english: "Cumin seeds", emoji: "🌰" },
          { fijiHindi: "Bhunna", english: "To roast", emoji: "🍳" },
        ],
        mumSays: {
          fijiHindi: "Jeera jab brown ho jaye, tabhi acha tadka hota!",
          english: "When cumin turns brown, that's good tempering!",
        },
      },
      {
        id: "6",
        instruction: {
          fijiHindi: "Tadka dhal me daalo. Bas, ready hai!",
          english: "Pour tempering in dal. Done, it's ready!",
        },
        vocabulary: [
          { fijiHindi: "Ready", english: "Ready", emoji: "✅" },
          { fijiHindi: "Bas", english: "That's it/enough", emoji: "👌" },
        ],
        mumSays: {
          fijiHindi: "Garam chawal ke saath khao, maza aega!",
          english: "Eat with hot rice, you'll enjoy it!",
        },
      },
    ],
    phrases: [
      "Dhona - To wash",
      "Daalna - To add",
      "Tadka - Tempering",
      "Bhunna - To roast",
      "Ready - Ready",
      "Garam - Hot",
    ],
  },
  {
    id: "roti",
    name: "Roti (Flatbread)",
    nameHindi: "Roti",
    emoji: "🫓",
    description: "Soft homemade flatbread",
    prepTime: "25 mins",
    steps: [
      {
        id: "1",
        instruction: {
          fijiHindi: "Bartan me aata daalo.",
          english: "Put flour in a bowl.",
        },
        vocabulary: [
          { fijiHindi: "Bartan", english: "Bowl/vessel", emoji: "🥣" },
          { fijiHindi: "Aata", english: "Flour (wheat)", emoji: "🌾" },
        ],
        mumSays: {
          fijiHindi: "Acha aata lena, Fiji wala best hai!",
          english: "Get good flour, Fiji one is best!",
        },
      },
      {
        id: "2",
        instruction: {
          fijiHindi: "Thora namak aur pani milao.",
          english: "Mix a little salt and water.",
        },
        vocabulary: [
          { fijiHindi: "Milana", english: "To mix", emoji: "🔄" },
          { fijiHindi: "Thora", english: "A little", emoji: "🤏" },
        ],
      },
      {
        id: "3",
        instruction: {
          fijiHindi: "Aata gundho, soft hona chahiye.",
          english: "Knead the dough, should be soft.",
        },
        vocabulary: [
          { fijiHindi: "Gundho", english: "Knead", emoji: "👐" },
          { fijiHindi: "Soft", english: "Soft", emoji: "☁️" },
        ],
        mumSays: {
          fijiHindi: "Zyaada gundho, soft roti banega!",
          english: "Knead more, soft roti will be made!",
        },
      },
      {
        id: "4",
        instruction: {
          fijiHindi: "Chhota gola banao aur belna se belo.",
          english: "Make small ball and roll with rolling pin.",
        },
        vocabulary: [
          { fijiHindi: "Gola", english: "Ball", emoji: "⚪" },
          { fijiHindi: "Belna", english: "Rolling pin", emoji: "🪵" },
          { fijiHindi: "Belna", english: "To roll", emoji: "🔃" },
        ],
      },
      {
        id: "5",
        instruction: {
          fijiHindi: "Tawa garam karo aur roti daalo.",
          english: "Heat the pan and put roti.",
        },
        vocabulary: [
          { fijiHindi: "Tawa", english: "Flat pan/griddle", emoji: "🍳" },
          { fijiHindi: "Garam", english: "Hot", emoji: "🔥" },
        ],
      },
      {
        id: "6",
        instruction: {
          fijiHindi: "Dono taraf sekho, phool jaye to ready!",
          english: "Cook both sides, when it puffs up it's ready!",
        },
        vocabulary: [
          { fijiHindi: "Sekna", english: "To cook/roast", emoji: "🔥" },
          { fijiHindi: "Dono taraf", english: "Both sides", emoji: "↔️" },
          { fijiHindi: "Phoolna", english: "To puff up", emoji: "🎈" },
        ],
        mumSays: {
          fijiHindi: "Ghee lagao, julum mita lagega!",
          english: "Apply ghee, it'll taste amazing!",
        },
      },
    ],
    phrases: [
      "Aata - Flour",
      "Gundho - Knead",
      "Belna - Rolling pin / To roll",
      "Tawa - Flat pan",
      "Sekna - To cook/roast",
      "Phoolna - To puff up",
      "Julum - Amazing",
    ],
  },
  {
    id: "chai",
    name: "Masala Chai",
    nameHindi: "Chai",
    emoji: "☕",
    description: "Perfect Fiji-style masala tea",
    prepTime: "10 mins",
    steps: [
      {
        id: "1",
        instruction: {
          fijiHindi: "Bartan me pani daalo, aag pe rakho.",
          english: "Put water in pot, keep on flame.",
        },
        vocabulary: [
          { fijiHindi: "Pani", english: "Water", emoji: "💧" },
          { fijiHindi: "Aag", english: "Fire/flame", emoji: "🔥" },
          { fijiHindi: "Rakhna", english: "To keep/place", emoji: "📍" },
        ],
      },
      {
        id: "2",
        instruction: {
          fijiHindi: "Adrak aur elaichi koot ke daalo.",
          english: "Crush and add ginger and cardamom.",
        },
        vocabulary: [
          { fijiHindi: "Adrak", english: "Ginger", emoji: "🫚" },
          { fijiHindi: "Elaichi", english: "Cardamom", emoji: "🌿" },
          { fijiHindi: "Kootna", english: "To crush", emoji: "🔨" },
        ],
        mumSays: {
          fijiHindi: "Adrak zyaada daalo, thanda me acha hai!",
          english: "Add more ginger, good in cold weather!",
        },
      },
      {
        id: "3",
        instruction: {
          fijiHindi: "Ubalne do, phir chai patti daalo.",
          english: "Let it boil, then add tea leaves.",
        },
        vocabulary: [
          { fijiHindi: "Ubalna", english: "To boil", emoji: "♨️" },
          { fijiHindi: "Chai patti", english: "Tea leaves", emoji: "🍃" },
        ],
      },
      {
        id: "4",
        instruction: {
          fijiHindi: "Doodh daalo aur phir se ubalne do.",
          english: "Add milk and let it boil again.",
        },
        vocabulary: [
          { fijiHindi: "Doodh", english: "Milk", emoji: "🥛" },
          { fijiHindi: "Phir se", english: "Again", emoji: "🔁" },
        ],
        mumSays: {
          fijiHindi: "Doodh zyaada ho to chai julum lagta!",
          english: "More milk makes the tea taste amazing!",
        },
      },
      {
        id: "5",
        instruction: {
          fijiHindi: "Cheeni daalo, swad ke hisaab se.",
          english: "Add sugar, according to taste.",
        },
        vocabulary: [
          { fijiHindi: "Cheeni", english: "Sugar", emoji: "🍬" },
          { fijiHindi: "Swad", english: "Taste", emoji: "👅" },
        ],
      },
      {
        id: "6",
        instruction: {
          fijiHindi: "Chaan ke cup me daalo. Chai ready!",
          english: "Strain into cup. Tea is ready!",
        },
        vocabulary: [
          { fijiHindi: "Chaanna", english: "To strain", emoji: "🥢" },
          { fijiHindi: "Cup", english: "Cup", emoji: "☕" },
        ],
        mumSays: {
          fijiHindi: "Garam garam piyo, mazaa aega!",
          english: "Drink it hot hot, you'll enjoy!",
        },
      },
    ],
    phrases: [
      "Adrak - Ginger",
      "Elaichi - Cardamom",
      "Ubalna - To boil",
      "Chai patti - Tea leaves",
      "Doodh - Milk",
      "Cheeni - Sugar",
      "Chaanna - To strain",
      "Julum - Amazing",
    ],
  },
];

export function getRecipeById(id: string): Recipe | undefined {
  return RECIPES.find(r => r.id === id);
}

export function getRandomRecipe(): Recipe {
  return RECIPES[Math.floor(Math.random() * RECIPES.length)];
}
