// Faith types for Fiji Hindi community
export type Faith = "hindu" | "muslim" | "christian" | "sikh" | "other";

export interface RelationshipTerm {
  primary: string;      // Main term used
  alternate?: string;   // Alternative term
  formal?: string;      // Formal/respectful form
  informal?: string;    // Casual/informal form
}

export interface Relationship {
  id: string;
  english: string;
  description?: string; // More detailed description
  side: "paternal" | "maternal" | "self" | "spouse" | "child";
  gender: "male" | "female" | "neutral";
  generation: number; // 0 = self, positive = older, negative = younger
  canAddFrom: string[]; // relationship IDs this can be added from
  // Faith-specific terms
  terms: Record<Faith, RelationshipTerm>;
}

// Helper to get term for a specific faith
export function getTermForFaith(relationship: Relationship, faith: Faith): string {
  const terms = relationship.terms[faith] || relationship.terms.hindu || relationship.terms.other;
  return terms.primary;
}

// Helper to get all terms for a relationship and faith
export function getAllTermsForFaith(relationship: Relationship, faith: Faith): RelationshipTerm {
  return relationship.terms[faith] || relationship.terms.hindu || relationship.terms.other;
}

// =============================================================================
// MASTER RELATIONSHIP LIST - Comprehensive Fiji Hindi Family Terms
// =============================================================================

export const RELATIONSHIPS: Record<string, Relationship> = {
  // ===========================================================================
  // SELF
  // ===========================================================================
  self: {
    id: "self",
    english: "You",
    description: "The person building the family tree",
    side: "self",
    gender: "neutral",
    generation: 0,
    canAddFrom: [],
    terms: {
      hindu: { primary: "Tum", formal: "Aap", informal: "Tu" },
      muslim: { primary: "Tum", formal: "Aap", informal: "Tu" },
      christian: { primary: "Tum", formal: "Aap", informal: "Tu" },
      sikh: { primary: "Tusi", formal: "Aap Ji", informal: "Tu" },
      other: { primary: "Tum", formal: "Aap", informal: "Tu" },
    },
  },

  // ===========================================================================
  // PARENTS (Generation +1)
  // ===========================================================================
  father: {
    id: "father",
    english: "Father",
    description: "Your dad",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Baap", formal: "Pitaji", informal: "Papa", alternate: "Daddy" },
      muslim: { primary: "Abbu", formal: "Abba Jaan", informal: "Papa", alternate: "Walid" },
      christian: { primary: "Papa", formal: "Daddy", informal: "Dad", alternate: "Baap" },
      sikh: { primary: "Pita Ji", formal: "Bapu Ji", informal: "Papa", alternate: "Daddy" },
      other: { primary: "Baap", formal: "Pitaji", informal: "Papa" },
    },
  },
  mother: {
    id: "mother",
    english: "Mother",
    description: "Your mum",
    side: "maternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Mai", formal: "Mataji", informal: "Mummy", alternate: "Amma" },
      muslim: { primary: "Ammi", formal: "Ammi Jaan", informal: "Mummy", alternate: "Walida" },
      christian: { primary: "Mummy", formal: "Mama", informal: "Mum", alternate: "Mai" },
      sikh: { primary: "Mata Ji", formal: "Bebe Ji", informal: "Mummy", alternate: "Maa" },
      other: { primary: "Mai", formal: "Mataji", informal: "Mummy" },
    },
  },

  // ===========================================================================
  // GRANDPARENTS - PATERNAL (Generation +2)
  // ===========================================================================
  dada: {
    id: "dada",
    english: "Paternal Grandfather",
    description: "Father's father",
    side: "paternal",
    gender: "male",
    generation: 2,
    canAddFrom: ["father"],
    terms: {
      hindu: { primary: "Dada", formal: "Dadaji", informal: "Dada" },
      muslim: { primary: "Dada", formal: "Dada Jaan", informal: "Dada", alternate: "Bade Abbu" },
      christian: { primary: "Grandpa", formal: "Grandfather", informal: "Dada", alternate: "Pa" },
      sikh: { primary: "Dada Ji", formal: "Baba Ji", informal: "Dada" },
      other: { primary: "Dada", formal: "Dadaji", informal: "Dada" },
    },
  },
  dadi: {
    id: "dadi",
    english: "Paternal Grandmother",
    description: "Father's mother",
    side: "paternal",
    gender: "female",
    generation: 2,
    canAddFrom: ["father"],
    terms: {
      hindu: { primary: "Dadi", formal: "Dadiji", informal: "Dadi" },
      muslim: { primary: "Dadi", formal: "Dadi Jaan", informal: "Dadi", alternate: "Badi Ammi" },
      christian: { primary: "Grandma", formal: "Grandmother", informal: "Dadi", alternate: "Nana" },
      sikh: { primary: "Dadi Ji", formal: "Bebe Ji", informal: "Dadi" },
      other: { primary: "Dadi", formal: "Dadiji", informal: "Dadi" },
    },
  },

  // ===========================================================================
  // GRANDPARENTS - MATERNAL (Generation +2)
  // ===========================================================================
  nana: {
    id: "nana",
    english: "Maternal Grandfather",
    description: "Mother's father",
    side: "maternal",
    gender: "male",
    generation: 2,
    canAddFrom: ["mother"],
    terms: {
      hindu: { primary: "Nana", formal: "Nanaji", informal: "Nana" },
      muslim: { primary: "Nana", formal: "Nana Jaan", informal: "Nana", alternate: "Nanika" },
      christian: { primary: "Grandpa", formal: "Grandfather", informal: "Nana", alternate: "Pop" },
      sikh: { primary: "Nana Ji", formal: "Nanke Baba Ji", informal: "Nana" },
      other: { primary: "Nana", formal: "Nanaji", informal: "Nana" },
    },
  },
  nani: {
    id: "nani",
    english: "Maternal Grandmother",
    description: "Mother's mother",
    side: "maternal",
    gender: "female",
    generation: 2,
    canAddFrom: ["mother"],
    terms: {
      hindu: { primary: "Nani", formal: "Naniji", informal: "Nani" },
      muslim: { primary: "Nani", formal: "Nani Jaan", informal: "Nani", alternate: "Naniki" },
      christian: { primary: "Grandma", formal: "Grandmother", informal: "Nani", alternate: "Gran" },
      sikh: { primary: "Nani Ji", formal: "Nanke Bebe Ji", informal: "Nani" },
      other: { primary: "Nani", formal: "Naniji", informal: "Nani" },
    },
  },

  // ===========================================================================
  // GREAT-GRANDPARENTS - PATERNAL (Generation +3)
  // ===========================================================================
  pardada: {
    id: "pardada",
    english: "Paternal Great-Grandfather",
    description: "Father's father's father",
    side: "paternal",
    gender: "male",
    generation: 3,
    canAddFrom: ["dada"],
    terms: {
      hindu: { primary: "Pardada", formal: "Pardadaji", informal: "Bade Dada" },
      muslim: { primary: "Pardada", formal: "Pardada Jaan", informal: "Bade Dada" },
      christian: { primary: "Great-Grandpa", formal: "Great-Grandfather", informal: "Pardada" },
      sikh: { primary: "Pardada Ji", formal: "Bade Baba Ji", informal: "Pardada" },
      other: { primary: "Pardada", formal: "Pardadaji", informal: "Bade Dada" },
    },
  },
  pardadi: {
    id: "pardadi",
    english: "Paternal Great-Grandmother",
    description: "Father's father's mother",
    side: "paternal",
    gender: "female",
    generation: 3,
    canAddFrom: ["dada"],
    terms: {
      hindu: { primary: "Pardadi", formal: "Pardadiji", informal: "Badi Dadi" },
      muslim: { primary: "Pardadi", formal: "Pardadi Jaan", informal: "Badi Dadi" },
      christian: { primary: "Great-Grandma", formal: "Great-Grandmother", informal: "Pardadi" },
      sikh: { primary: "Pardadi Ji", formal: "Badi Bebe Ji", informal: "Pardadi" },
      other: { primary: "Pardadi", formal: "Pardadiji", informal: "Badi Dadi" },
    },
  },

  // ===========================================================================
  // GREAT-GRANDPARENTS - MATERNAL (Generation +3)
  // ===========================================================================
  parnana: {
    id: "parnana",
    english: "Maternal Great-Grandfather",
    description: "Mother's father's father",
    side: "maternal",
    gender: "male",
    generation: 3,
    canAddFrom: ["nana"],
    terms: {
      hindu: { primary: "Parnana", formal: "Parnanaji", informal: "Bade Nana" },
      muslim: { primary: "Parnana", formal: "Parnana Jaan", informal: "Bade Nana" },
      christian: { primary: "Great-Grandpa", formal: "Great-Grandfather", informal: "Parnana" },
      sikh: { primary: "Parnana Ji", formal: "Bade Nanke Baba Ji", informal: "Parnana" },
      other: { primary: "Parnana", formal: "Parnanaji", informal: "Bade Nana" },
    },
  },
  parnani: {
    id: "parnani",
    english: "Maternal Great-Grandmother",
    description: "Mother's father's mother",
    side: "maternal",
    gender: "female",
    generation: 3,
    canAddFrom: ["nana"],
    terms: {
      hindu: { primary: "Parnani", formal: "Parnaniji", informal: "Badi Nani" },
      muslim: { primary: "Parnani", formal: "Parnani Jaan", informal: "Badi Nani" },
      christian: { primary: "Great-Grandma", formal: "Great-Grandmother", informal: "Parnani" },
      sikh: { primary: "Parnani Ji", formal: "Badi Nanke Bebe Ji", informal: "Parnani" },
      other: { primary: "Parnani", formal: "Parnaniji", informal: "Badi Nani" },
    },
  },

  // ===========================================================================
  // SIBLINGS (Generation 0)
  // ===========================================================================
  brother: {
    id: "brother",
    english: "Brother",
    description: "Your male sibling",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Bhai", formal: "Bhaiya", informal: "Bhai" },
      muslim: { primary: "Bhai", formal: "Bhai Jaan", informal: "Bhai", alternate: "Mian" },
      christian: { primary: "Brother", formal: "Bhai", informal: "Bro" },
      sikh: { primary: "Veer", formal: "Veer Ji", informal: "Bhai", alternate: "Paaji" },
      other: { primary: "Bhai", formal: "Bhaiya", informal: "Bhai" },
    },
  },
  sister: {
    id: "sister",
    english: "Sister",
    description: "Your female sibling",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Bahin", formal: "Behenji", informal: "Bahin", alternate: "Didi" },
      muslim: { primary: "Behen", formal: "Baji", informal: "Bahin", alternate: "Aapa" },
      christian: { primary: "Sister", formal: "Bahin", informal: "Sis" },
      sikh: { primary: "Bhain", formal: "Bhain Ji", informal: "Bhain", alternate: "Didi" },
      other: { primary: "Bahin", formal: "Behenji", informal: "Bahin" },
    },
  },
  elderBrother: {
    id: "elderBrother",
    english: "Elder Brother",
    description: "Older male sibling",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Bada Bhai", formal: "Bhaiya", informal: "Bhaiya", alternate: "Dada" },
      muslim: { primary: "Bade Bhai", formal: "Bhai Jaan", informal: "Bhaiya", alternate: "Mian Bhai" },
      christian: { primary: "Big Brother", formal: "Bhaiya", informal: "Bro" },
      sikh: { primary: "Vada Veer", formal: "Paaji", informal: "Veerji" },
      other: { primary: "Bada Bhai", formal: "Bhaiya", informal: "Bhaiya" },
    },
  },
  elderSister: {
    id: "elderSister",
    english: "Elder Sister",
    description: "Older female sibling",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Badi Bahin", formal: "Didi", informal: "Didi", alternate: "Jiji" },
      muslim: { primary: "Badi Behen", formal: "Aapa", informal: "Baji", alternate: "Bajiya" },
      christian: { primary: "Big Sister", formal: "Didi", informal: "Sis" },
      sikh: { primary: "Vadi Bhain", formal: "Didi Ji", informal: "Bhain Ji" },
      other: { primary: "Badi Bahin", formal: "Didi", informal: "Didi" },
    },
  },
  youngerBrother: {
    id: "youngerBrother",
    english: "Younger Brother",
    description: "Younger male sibling",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Chhota Bhai", informal: "Bhai", alternate: "Chhotu" },
      muslim: { primary: "Chhote Bhai", informal: "Bhai", alternate: "Mian" },
      christian: { primary: "Little Brother", informal: "Bro", alternate: "Bhai" },
      sikh: { primary: "Chhota Veer", informal: "Veer", alternate: "Veere" },
      other: { primary: "Chhota Bhai", informal: "Bhai" },
    },
  },
  youngerSister: {
    id: "youngerSister",
    english: "Younger Sister",
    description: "Younger female sibling",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["self", "father", "mother"],
    terms: {
      hindu: { primary: "Chhoti Bahin", informal: "Bahin", alternate: "Chhoti" },
      muslim: { primary: "Chhoti Behen", informal: "Bahin", alternate: "Chhoti" },
      christian: { primary: "Little Sister", informal: "Sis", alternate: "Bahin" },
      sikh: { primary: "Chhoti Bhain", informal: "Bhain", alternate: "Bhaine" },
      other: { primary: "Chhoti Bahin", informal: "Bahin" },
    },
  },

  // ===========================================================================
  // FATHER'S SIBLINGS (Generation +1)
  // ===========================================================================
  chacha: {
    id: "chacha",
    english: "Father's Younger Brother",
    description: "Dad's younger brother",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["dada", "dadi", "father"],
    terms: {
      hindu: { primary: "Chacha", formal: "Chachaji", informal: "Chacha" },
      muslim: { primary: "Chacha", formal: "Chacha Jaan", informal: "Chacha", alternate: "Chhote Abbu" },
      christian: { primary: "Uncle", formal: "Chacha", informal: "Uncle" },
      sikh: { primary: "Chacha Ji", formal: "Chacha Ji", informal: "Chacha" },
      other: { primary: "Chacha", formal: "Chachaji", informal: "Chacha" },
    },
  },
  chachi: {
    id: "chachi",
    english: "Father's Younger Brother's Wife",
    description: "Chacha's wife",
    side: "paternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["chacha"],
    terms: {
      hindu: { primary: "Chachi", formal: "Chachiji", informal: "Chachi" },
      muslim: { primary: "Chachi", formal: "Chachi Jaan", informal: "Chachi", alternate: "Chhoti Ammi" },
      christian: { primary: "Aunty", formal: "Chachi", informal: "Aunty" },
      sikh: { primary: "Chachi Ji", formal: "Chachi Ji", informal: "Chachi" },
      other: { primary: "Chachi", formal: "Chachiji", informal: "Chachi" },
    },
  },
  tau: {
    id: "tau",
    english: "Father's Elder Brother",
    description: "Dad's older brother",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["dada", "dadi", "father"],
    terms: {
      hindu: { primary: "Tau", formal: "Tauji", informal: "Tau", alternate: "Bade Baap" },
      muslim: { primary: "Tau", formal: "Tau Jaan", informal: "Tau", alternate: "Bade Abbu" },
      christian: { primary: "Uncle", formal: "Tau", informal: "Uncle" },
      sikh: { primary: "Taya Ji", formal: "Taya Ji", informal: "Taya" },
      other: { primary: "Tau", formal: "Tauji", informal: "Tau" },
    },
  },
  tai: {
    id: "tai",
    english: "Father's Elder Brother's Wife",
    description: "Tau's wife",
    side: "paternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["tau"],
    terms: {
      hindu: { primary: "Tai", formal: "Taiji", informal: "Tai", alternate: "Badi Mai" },
      muslim: { primary: "Tai", formal: "Tai Jaan", informal: "Tai", alternate: "Badi Ammi" },
      christian: { primary: "Aunty", formal: "Tai", informal: "Aunty" },
      sikh: { primary: "Tayi Ji", formal: "Tayi Ji", informal: "Tayi" },
      other: { primary: "Tai", formal: "Taiji", informal: "Tai" },
    },
  },
  bua: {
    id: "bua",
    english: "Father's Sister",
    description: "Dad's sister (paternal aunt)",
    side: "paternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["dada", "dadi", "father"],
    terms: {
      hindu: { primary: "Bua", formal: "Buaji", informal: "Bua", alternate: "Phuphi" },
      muslim: { primary: "Phuphi", formal: "Phuphi Jaan", informal: "Phuphi", alternate: "Bua" },
      christian: { primary: "Aunty", formal: "Bua", informal: "Aunty" },
      sikh: { primary: "Bhua Ji", formal: "Bhua Ji", informal: "Bhua" },
      other: { primary: "Bua", formal: "Buaji", informal: "Bua" },
    },
  },
  phupha: {
    id: "phupha",
    english: "Father's Sister's Husband",
    description: "Bua's husband",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["bua"],
    terms: {
      hindu: { primary: "Phupha", formal: "Phuphaji", informal: "Phupha" },
      muslim: { primary: "Phupha", formal: "Phupha Jaan", informal: "Phupha" },
      christian: { primary: "Uncle", formal: "Phupha", informal: "Uncle" },
      sikh: { primary: "Phuphar Ji", formal: "Phuphar Ji", informal: "Phuphar" },
      other: { primary: "Phupha", formal: "Phuphaji", informal: "Phupha" },
    },
  },

  // ===========================================================================
  // MOTHER'S SIBLINGS (Generation +1)
  // ===========================================================================
  mama: {
    id: "mama",
    english: "Mother's Brother",
    description: "Mum's brother (maternal uncle)",
    side: "maternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["nana", "nani", "mother"],
    terms: {
      hindu: { primary: "Mama", formal: "Mamaji", informal: "Mama" },
      muslim: { primary: "Mamun", formal: "Mamun Jaan", informal: "Mama", alternate: "Khalu" },
      christian: { primary: "Uncle", formal: "Mama", informal: "Uncle" },
      sikh: { primary: "Mama Ji", formal: "Mama Ji", informal: "Mama" },
      other: { primary: "Mama", formal: "Mamaji", informal: "Mama" },
    },
  },
  mami: {
    id: "mami",
    english: "Mother's Brother's Wife",
    description: "Mama's wife",
    side: "maternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["mama"],
    terms: {
      hindu: { primary: "Mami", formal: "Mamiji", informal: "Mami" },
      muslim: { primary: "Mumani", formal: "Mumani Jaan", informal: "Mami", alternate: "Khala" },
      christian: { primary: "Aunty", formal: "Mami", informal: "Aunty" },
      sikh: { primary: "Mami Ji", formal: "Mami Ji", informal: "Mami" },
      other: { primary: "Mami", formal: "Mamiji", informal: "Mami" },
    },
  },
  mausi: {
    id: "mausi",
    english: "Mother's Sister",
    description: "Mum's sister (maternal aunt)",
    side: "maternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["nana", "nani", "mother"],
    terms: {
      hindu: { primary: "Mausi", formal: "Mausiji", informal: "Mausi", alternate: "Maasi" },
      muslim: { primary: "Khala", formal: "Khala Jaan", informal: "Khala", alternate: "Mausi" },
      christian: { primary: "Aunty", formal: "Mausi", informal: "Aunty" },
      sikh: { primary: "Masi Ji", formal: "Masi Ji", informal: "Masi" },
      other: { primary: "Mausi", formal: "Mausiji", informal: "Mausi" },
    },
  },
  mausa: {
    id: "mausa",
    english: "Mother's Sister's Husband",
    description: "Mausi's husband",
    side: "maternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["mausi"],
    terms: {
      hindu: { primary: "Mausa", formal: "Mausaji", informal: "Mausa", alternate: "Maasad" },
      muslim: { primary: "Khalu", formal: "Khalu Jaan", informal: "Khalu", alternate: "Mausa" },
      christian: { primary: "Uncle", formal: "Mausa", informal: "Uncle" },
      sikh: { primary: "Masar Ji", formal: "Masar Ji", informal: "Masar" },
      other: { primary: "Mausa", formal: "Mausaji", informal: "Mausa" },
    },
  },

  // ===========================================================================
  // SPOUSE (Generation 0)
  // ===========================================================================
  husband: {
    id: "husband",
    english: "Husband",
    description: "Your male spouse",
    side: "spouse",
    gender: "male",
    generation: 0,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Pati", formal: "Pati Dev", informal: "Gharwala", alternate: "Swaami" },
      muslim: { primary: "Shohar", formal: "Mian", informal: "Gharwala", alternate: "Khawand" },
      christian: { primary: "Husband", formal: "Pati", informal: "Hubby" },
      sikh: { primary: "Pati", formal: "Pati Dev Ji", informal: "Gharwala" },
      other: { primary: "Pati", formal: "Pati", informal: "Gharwala" },
    },
  },
  wife: {
    id: "wife",
    english: "Wife",
    description: "Your female spouse",
    side: "spouse",
    gender: "female",
    generation: 0,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Patni", formal: "Dharampatni", informal: "Gharwali", alternate: "Biwi" },
      muslim: { primary: "Biwi", formal: "Begum", informal: "Gharwali", alternate: "Zauja" },
      christian: { primary: "Wife", formal: "Patni", informal: "Wifey" },
      sikh: { primary: "Patni", formal: "Dharampatni Ji", informal: "Gharwali" },
      other: { primary: "Patni", formal: "Patni", informal: "Gharwali" },
    },
  },

  // ===========================================================================
  // CHILDREN (Generation -1)
  // ===========================================================================
  son: {
    id: "son",
    english: "Son",
    description: "Your male child",
    side: "child",
    gender: "male",
    generation: -1,
    canAddFrom: ["self", "husband", "wife"],
    terms: {
      hindu: { primary: "Beta", formal: "Putra", informal: "Beta", alternate: "Launda" },
      muslim: { primary: "Beta", formal: "Farzand", informal: "Mian", alternate: "Bacha" },
      christian: { primary: "Son", formal: "Beta", informal: "Son" },
      sikh: { primary: "Putar", formal: "Putar Ji", informal: "Beta" },
      other: { primary: "Beta", formal: "Putra", informal: "Beta" },
    },
  },
  daughter: {
    id: "daughter",
    english: "Daughter",
    description: "Your female child",
    side: "child",
    gender: "female",
    generation: -1,
    canAddFrom: ["self", "husband", "wife"],
    terms: {
      hindu: { primary: "Beti", formal: "Putri", informal: "Beti", alternate: "Ladki" },
      muslim: { primary: "Beti", formal: "Farzandi", informal: "Beti", alternate: "Bachi" },
      christian: { primary: "Daughter", formal: "Beti", informal: "Daughter" },
      sikh: { primary: "Dhee", formal: "Dhee Ji", informal: "Beti" },
      other: { primary: "Beti", formal: "Putri", informal: "Beti" },
    },
  },

  // ===========================================================================
  // GRANDCHILDREN (Generation -2)
  // ===========================================================================
  grandson: {
    id: "grandson",
    english: "Grandson",
    description: "Son's or daughter's son",
    side: "child",
    gender: "male",
    generation: -2,
    canAddFrom: ["son", "daughter"],
    terms: {
      hindu: { primary: "Pota", formal: "Pota", informal: "Pota", alternate: "Naati (daughter's son)" },
      muslim: { primary: "Pota", formal: "Pota", informal: "Pota", alternate: "Nawasa (daughter's son)" },
      christian: { primary: "Grandson", formal: "Pota", informal: "Grandson" },
      sikh: { primary: "Potra", formal: "Potra Ji", informal: "Pota" },
      other: { primary: "Pota", formal: "Pota", informal: "Pota" },
    },
  },
  granddaughter: {
    id: "granddaughter",
    english: "Granddaughter",
    description: "Son's or daughter's daughter",
    side: "child",
    gender: "female",
    generation: -2,
    canAddFrom: ["son", "daughter"],
    terms: {
      hindu: { primary: "Poti", formal: "Poti", informal: "Poti", alternate: "Naatin (daughter's daughter)" },
      muslim: { primary: "Poti", formal: "Poti", informal: "Poti", alternate: "Nawasi (daughter's daughter)" },
      christian: { primary: "Granddaughter", formal: "Poti", informal: "Granddaughter" },
      sikh: { primary: "Potri", formal: "Potri Ji", informal: "Poti" },
      other: { primary: "Poti", formal: "Poti", informal: "Poti" },
    },
  },
  // Specific grandchildren terms
  potaSons: {
    id: "potaSons",
    english: "Son's Son",
    description: "Your son's male child",
    side: "child",
    gender: "male",
    generation: -2,
    canAddFrom: ["son"],
    terms: {
      hindu: { primary: "Pota", formal: "Pota", informal: "Pota" },
      muslim: { primary: "Pota", formal: "Pota", informal: "Pota" },
      christian: { primary: "Grandson", formal: "Pota", informal: "Grandson" },
      sikh: { primary: "Potra", formal: "Potra", informal: "Pota" },
      other: { primary: "Pota", formal: "Pota", informal: "Pota" },
    },
  },
  naati: {
    id: "naati",
    english: "Daughter's Son",
    description: "Your daughter's male child",
    side: "child",
    gender: "male",
    generation: -2,
    canAddFrom: ["daughter"],
    terms: {
      hindu: { primary: "Naati", formal: "Naati", informal: "Naati" },
      muslim: { primary: "Nawasa", formal: "Nawasa", informal: "Nawasa" },
      christian: { primary: "Grandson", formal: "Naati", informal: "Grandson" },
      sikh: { primary: "Dohta", formal: "Dohta", informal: "Naati" },
      other: { primary: "Naati", formal: "Naati", informal: "Naati" },
    },
  },
  naatin: {
    id: "naatin",
    english: "Daughter's Daughter",
    description: "Your daughter's female child",
    side: "child",
    gender: "female",
    generation: -2,
    canAddFrom: ["daughter"],
    terms: {
      hindu: { primary: "Naatin", formal: "Naatin", informal: "Naatin" },
      muslim: { primary: "Nawasi", formal: "Nawasi", informal: "Nawasi" },
      christian: { primary: "Granddaughter", formal: "Naatin", informal: "Granddaughter" },
      sikh: { primary: "Dohti", formal: "Dohti", informal: "Naatin" },
      other: { primary: "Naatin", formal: "Naatin", informal: "Naatin" },
    },
  },

  // ===========================================================================
  // IN-LAWS - SPOUSE'S PARENTS (Generation +1)
  // ===========================================================================
  sasur: {
    id: "sasur",
    english: "Father-in-law",
    description: "Spouse's father",
    side: "spouse",
    gender: "male",
    generation: 1,
    canAddFrom: ["husband", "wife"],
    terms: {
      hindu: { primary: "Sasur", formal: "Sasurji", informal: "Sasur", alternate: "Papa" },
      muslim: { primary: "Susra", formal: "Susra Jaan", informal: "Abbu", alternate: "Khusur" },
      christian: { primary: "Father-in-law", formal: "Sasur", informal: "Dad" },
      sikh: { primary: "Suhra Ji", formal: "Suhra Ji", informal: "Papa Ji" },
      other: { primary: "Sasur", formal: "Sasurji", informal: "Sasur" },
    },
  },
  saas: {
    id: "saas",
    english: "Mother-in-law",
    description: "Spouse's mother",
    side: "spouse",
    gender: "female",
    generation: 1,
    canAddFrom: ["husband", "wife"],
    terms: {
      hindu: { primary: "Saas", formal: "Saasji", informal: "Saas", alternate: "Mummy" },
      muslim: { primary: "Saas", formal: "Saas Jaan", informal: "Ammi", alternate: "Khusru" },
      christian: { primary: "Mother-in-law", formal: "Saas", informal: "Mum" },
      sikh: { primary: "Sass Ji", formal: "Sass Ji", informal: "Mummy Ji" },
      other: { primary: "Saas", formal: "Saasji", informal: "Saas" },
    },
  },

  // ===========================================================================
  // IN-LAWS - CHILDREN'S SPOUSES (Generation -1)
  // ===========================================================================
  damad: {
    id: "damad",
    english: "Son-in-law",
    description: "Daughter's husband",
    side: "child",
    gender: "male",
    generation: -1,
    canAddFrom: ["daughter"],
    terms: {
      hindu: { primary: "Damad", formal: "Damadji", informal: "Jamai", alternate: "Beta" },
      muslim: { primary: "Damad", formal: "Damad Sahab", informal: "Beta", alternate: "Jamai" },
      christian: { primary: "Son-in-law", formal: "Damad", informal: "Son" },
      sikh: { primary: "Jawaai Ji", formal: "Jawaai Ji", informal: "Beta" },
      other: { primary: "Damad", formal: "Damadji", informal: "Jamai" },
    },
  },
  bahu: {
    id: "bahu",
    english: "Daughter-in-law",
    description: "Son's wife",
    side: "child",
    gender: "female",
    generation: -1,
    canAddFrom: ["son"],
    terms: {
      hindu: { primary: "Bahu", formal: "Bahurani", informal: "Bahu", alternate: "Beti" },
      muslim: { primary: "Bahu", formal: "Bahu Begum", informal: "Beti", alternate: "Dulhan" },
      christian: { primary: "Daughter-in-law", formal: "Bahu", informal: "Daughter" },
      sikh: { primary: "Nuh Ji", formal: "Nuh Ji", informal: "Beti" },
      other: { primary: "Bahu", formal: "Bahurani", informal: "Bahu" },
    },
  },

  // ===========================================================================
  // SIBLING IN-LAWS (Generation 0)
  // ===========================================================================
  jija: {
    id: "jija",
    english: "Sister's Husband",
    description: "Your sister's husband (brother-in-law)",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["sister", "elderSister", "youngerSister"],
    terms: {
      hindu: { primary: "Jija", formal: "Jijaji", informal: "Jija", alternate: "Bhai Sahab" },
      muslim: { primary: "Jija", formal: "Jija Jaan", informal: "Bhai", alternate: "Bahnoi" },
      christian: { primary: "Brother-in-law", formal: "Jija", informal: "Bro" },
      sikh: { primary: "Jija Ji", formal: "Jija Ji", informal: "Jija" },
      other: { primary: "Jija", formal: "Jijaji", informal: "Jija" },
    },
  },
  bhabhi: {
    id: "bhabhi",
    english: "Brother's Wife",
    description: "Your brother's wife (sister-in-law)",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["brother", "elderBrother", "youngerBrother"],
    terms: {
      hindu: { primary: "Bhabhi", formal: "Bhabhiji", informal: "Bhabhi", alternate: "Vahini" },
      muslim: { primary: "Bhabi", formal: "Bhabi Jaan", informal: "Bhabi", alternate: "Bhai Ki Dulhan" },
      christian: { primary: "Sister-in-law", formal: "Bhabhi", informal: "Sis" },
      sikh: { primary: "Bhabhi Ji", formal: "Bhabhi Ji", informal: "Bhabhi" },
      other: { primary: "Bhabhi", formal: "Bhabhiji", informal: "Bhabhi" },
    },
  },

  // ===========================================================================
  // SPOUSE'S SIBLINGS (Generation 0)
  // ===========================================================================
  sala: {
    id: "sala",
    english: "Wife's Brother",
    description: "Your wife's brother",
    side: "spouse",
    gender: "male",
    generation: 0,
    canAddFrom: ["wife", "saas", "sasur"],
    terms: {
      hindu: { primary: "Sala", formal: "Salaji", informal: "Sala", alternate: "Bhai Sahab" },
      muslim: { primary: "Sala", formal: "Sala Sahab", informal: "Bhai", alternate: "Hum Zulf" },
      christian: { primary: "Brother-in-law", formal: "Sala", informal: "Bro" },
      sikh: { primary: "Sala Ji", formal: "Sala Ji", informal: "Sala" },
      other: { primary: "Sala", formal: "Salaji", informal: "Sala" },
    },
  },
  sali: {
    id: "sali",
    english: "Wife's Sister",
    description: "Your wife's sister",
    side: "spouse",
    gender: "female",
    generation: 0,
    canAddFrom: ["wife", "saas", "sasur"],
    terms: {
      hindu: { primary: "Sali", formal: "Saliji", informal: "Sali" },
      muslim: { primary: "Sali", formal: "Sali Sahiba", informal: "Bahin" },
      christian: { primary: "Sister-in-law", formal: "Sali", informal: "Sis" },
      sikh: { primary: "Sali Ji", formal: "Sali Ji", informal: "Sali" },
      other: { primary: "Sali", formal: "Saliji", informal: "Sali" },
    },
  },
  samdhi: {
    id: "samdhi",
    english: "Child's Father-in-law",
    description: "Your son or daughter's father-in-law (co-in-law)",
    side: "child",
    gender: "male",
    generation: 0,
    canAddFrom: ["damad", "bahu"],
    terms: {
      hindu: { primary: "Samdhi", formal: "Samdhiji", informal: "Samdhi" },
      muslim: { primary: "Samdhi", formal: "Samdhi Sahab", informal: "Samdhi" },
      christian: { primary: "Co-father-in-law", formal: "Samdhi", informal: "Samdhi" },
      sikh: { primary: "Samdhi Ji", formal: "Samdhi Ji", informal: "Samdhi" },
      other: { primary: "Samdhi", formal: "Samdhiji", informal: "Samdhi" },
    },
  },
  samdhan: {
    id: "samdhan",
    english: "Child's Mother-in-law",
    description: "Your son or daughter's mother-in-law (co-in-law)",
    side: "child",
    gender: "female",
    generation: 0,
    canAddFrom: ["damad", "bahu"],
    terms: {
      hindu: { primary: "Samdhan", formal: "Samdhanji", informal: "Samdhan" },
      muslim: { primary: "Samdhan", formal: "Samdhan Sahiba", informal: "Samdhan" },
      christian: { primary: "Co-mother-in-law", formal: "Samdhan", informal: "Samdhan" },
      sikh: { primary: "Samdhan Ji", formal: "Samdhan Ji", informal: "Samdhan" },
      other: { primary: "Samdhan", formal: "Samdhanji", informal: "Samdhan" },
    },
  },
  devar: {
    id: "devar",
    english: "Husband's Younger Brother",
    description: "Your husband's younger brother",
    side: "spouse",
    gender: "male",
    generation: 0,
    canAddFrom: ["husband", "saas", "sasur"],
    terms: {
      hindu: { primary: "Devar", formal: "Devarji", informal: "Devar" },
      muslim: { primary: "Devar", formal: "Devar Sahab", informal: "Devar" },
      christian: { primary: "Brother-in-law", formal: "Devar", informal: "Bro" },
      sikh: { primary: "Devar Ji", formal: "Devar Ji", informal: "Devar" },
      other: { primary: "Devar", formal: "Devarji", informal: "Devar" },
    },
  },
  jeth: {
    id: "jeth",
    english: "Husband's Elder Brother",
    description: "Your husband's older brother",
    side: "spouse",
    gender: "male",
    generation: 0,
    canAddFrom: ["husband", "saas", "sasur"],
    terms: {
      hindu: { primary: "Jeth", formal: "Jethji", informal: "Jeth", alternate: "Bhaiya" },
      muslim: { primary: "Jeth", formal: "Jeth Sahab", informal: "Bhai" },
      christian: { primary: "Brother-in-law", formal: "Jeth", informal: "Bro" },
      sikh: { primary: "Jeth Ji", formal: "Jeth Ji", informal: "Jeth" },
      other: { primary: "Jeth", formal: "Jethji", informal: "Jeth" },
    },
  },
  jethani: {
    id: "jethani",
    english: "Husband's Elder Brother's Wife",
    description: "Your jeth's wife",
    side: "spouse",
    gender: "female",
    generation: 0,
    canAddFrom: ["jeth"],
    terms: {
      hindu: { primary: "Jethani", formal: "Jethaniji", informal: "Jethani", alternate: "Bhabhi" },
      muslim: { primary: "Jethani", formal: "Jethani Begum", informal: "Bhabi" },
      christian: { primary: "Sister-in-law", formal: "Jethani", informal: "Sis" },
      sikh: { primary: "Jethani Ji", formal: "Jethani Ji", informal: "Jethani" },
      other: { primary: "Jethani", formal: "Jethaniji", informal: "Jethani" },
    },
  },
  devrani: {
    id: "devrani",
    english: "Husband's Younger Brother's Wife",
    description: "Your devar's wife",
    side: "spouse",
    gender: "female",
    generation: 0,
    canAddFrom: ["devar"],
    terms: {
      hindu: { primary: "Devrani", formal: "Devraniji", informal: "Devrani" },
      muslim: { primary: "Devrani", formal: "Devrani Begum", informal: "Bahin" },
      christian: { primary: "Sister-in-law", formal: "Devrani", informal: "Sis" },
      sikh: { primary: "Devrani Ji", formal: "Devrani Ji", informal: "Devrani" },
      other: { primary: "Devrani", formal: "Devraniji", informal: "Devrani" },
    },
  },
  nanad: {
    id: "nanad",
    english: "Husband's Sister",
    description: "Your husband's sister",
    side: "spouse",
    gender: "female",
    generation: 0,
    canAddFrom: ["husband", "saas", "sasur"],
    terms: {
      hindu: { primary: "Nanad", formal: "Nanandji", informal: "Nanad" },
      muslim: { primary: "Nanad", formal: "Nanad Begum", informal: "Bahin" },
      christian: { primary: "Sister-in-law", formal: "Nanad", informal: "Sis" },
      sikh: { primary: "Nand Ji", formal: "Nand Ji", informal: "Nanad" },
      other: { primary: "Nanad", formal: "Nanandji", informal: "Nanad" },
    },
  },
  nandoi: {
    id: "nandoi",
    english: "Husband's Sister's Husband",
    description: "Your nanad's husband",
    side: "spouse",
    gender: "male",
    generation: 0,
    canAddFrom: ["nanad"],
    terms: {
      hindu: { primary: "Nandoi", formal: "Nandoiji", informal: "Nandoi", alternate: "Jija" },
      muslim: { primary: "Nandoi", formal: "Nandoi Sahab", informal: "Bhai" },
      christian: { primary: "Brother-in-law", formal: "Nandoi", informal: "Bro" },
      sikh: { primary: "Nandoi Ji", formal: "Nandoi Ji", informal: "Nandoi" },
      other: { primary: "Nandoi", formal: "Nandoiji", informal: "Nandoi" },
    },
  },

  // ===========================================================================
  // COUSINS (Generation 0)
  // ===========================================================================
  cousinBrotherPaternal: {
    id: "cousinBrotherPaternal",
    english: "Paternal Cousin (Male)",
    description: "Father's sibling's son",
    side: "paternal",
    gender: "male",
    generation: 0,
    canAddFrom: ["chacha", "chachi", "tau", "tai", "bua", "phupha"],
    terms: {
      hindu: { primary: "Chachera Bhai", formal: "Bhaiya", informal: "Bhai", alternate: "Tauera Bhai" },
      muslim: { primary: "Chachera Bhai", formal: "Bhai Jaan", informal: "Bhai" },
      christian: { primary: "Cousin", formal: "Cousin Brother", informal: "Bro" },
      sikh: { primary: "Chachera Veer", formal: "Paaji", informal: "Veer" },
      other: { primary: "Chachera Bhai", formal: "Bhaiya", informal: "Bhai" },
    },
  },
  cousinSisterPaternal: {
    id: "cousinSisterPaternal",
    english: "Paternal Cousin (Female)",
    description: "Father's sibling's daughter",
    side: "paternal",
    gender: "female",
    generation: 0,
    canAddFrom: ["chacha", "chachi", "tau", "tai", "bua", "phupha"],
    terms: {
      hindu: { primary: "Chacheri Bahin", formal: "Didi", informal: "Bahin", alternate: "Taueri Bahin" },
      muslim: { primary: "Chacheri Behen", formal: "Baji", informal: "Bahin" },
      christian: { primary: "Cousin", formal: "Cousin Sister", informal: "Sis" },
      sikh: { primary: "Chacheri Bhain", formal: "Bhain Ji", informal: "Bhain" },
      other: { primary: "Chacheri Bahin", formal: "Didi", informal: "Bahin" },
    },
  },
  cousinBrotherMaternal: {
    id: "cousinBrotherMaternal",
    english: "Maternal Cousin (Male)",
    description: "Mother's sibling's son",
    side: "maternal",
    gender: "male",
    generation: 0,
    canAddFrom: ["mama", "mami", "mausi", "mausa"],
    terms: {
      hindu: { primary: "Mamera Bhai", formal: "Bhaiya", informal: "Bhai", alternate: "Mausera Bhai" },
      muslim: { primary: "Khalazad Bhai", formal: "Bhai Jaan", informal: "Bhai" },
      christian: { primary: "Cousin", formal: "Cousin Brother", informal: "Bro" },
      sikh: { primary: "Mamera Veer", formal: "Paaji", informal: "Veer" },
      other: { primary: "Mamera Bhai", formal: "Bhaiya", informal: "Bhai" },
    },
  },
  cousinSisterMaternal: {
    id: "cousinSisterMaternal",
    english: "Maternal Cousin (Female)",
    description: "Mother's sibling's daughter",
    side: "maternal",
    gender: "female",
    generation: 0,
    canAddFrom: ["mama", "mami", "mausi", "mausa"],
    terms: {
      hindu: { primary: "Mameri Bahin", formal: "Didi", informal: "Bahin", alternate: "Mauseri Bahin" },
      muslim: { primary: "Khalazad Behen", formal: "Baji", informal: "Bahin" },
      christian: { primary: "Cousin", formal: "Cousin Sister", informal: "Sis" },
      sikh: { primary: "Mameri Bhain", formal: "Bhain Ji", informal: "Bhain" },
      other: { primary: "Mameri Bahin", formal: "Didi", informal: "Bahin" },
    },
  },

  // ===========================================================================
  // NIECES & NEPHEWS (Generation -1)
  // ===========================================================================
  nephew: {
    id: "nephew",
    english: "Nephew",
    description: "Sibling's son",
    side: "self",
    gender: "male",
    generation: -1,
    canAddFrom: ["brother", "elderBrother", "youngerBrother", "sister", "elderSister", "youngerSister"],
    terms: {
      hindu: { primary: "Bhatija", formal: "Bhatija", informal: "Beta", alternate: "Bhanja (sister's son)" },
      muslim: { primary: "Bhatija", formal: "Bhatija", informal: "Beta", alternate: "Bhanja" },
      christian: { primary: "Nephew", formal: "Bhatija", informal: "Nephew" },
      sikh: { primary: "Bhatija Ji", formal: "Bhatija Ji", informal: "Beta" },
      other: { primary: "Bhatija", formal: "Bhatija", informal: "Beta" },
    },
  },
  niece: {
    id: "niece",
    english: "Niece",
    description: "Sibling's daughter",
    side: "self",
    gender: "female",
    generation: -1,
    canAddFrom: ["brother", "elderBrother", "youngerBrother", "sister", "elderSister", "youngerSister"],
    terms: {
      hindu: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti", alternate: "Bhanji (sister's daughter)" },
      muslim: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti", alternate: "Bhanji" },
      christian: { primary: "Niece", formal: "Bhatiji", informal: "Niece" },
      sikh: { primary: "Bhatiji Ji", formal: "Bhatiji Ji", informal: "Beti" },
      other: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti" },
    },
  },
  bhanja: {
    id: "bhanja",
    english: "Sister's Son",
    description: "Your sister's male child",
    side: "self",
    gender: "male",
    generation: -1,
    canAddFrom: ["sister", "elderSister", "youngerSister"],
    terms: {
      hindu: { primary: "Bhanja", formal: "Bhanja", informal: "Beta" },
      muslim: { primary: "Bhanja", formal: "Bhanja", informal: "Beta" },
      christian: { primary: "Nephew", formal: "Bhanja", informal: "Nephew" },
      sikh: { primary: "Bhanja Ji", formal: "Bhanja Ji", informal: "Beta" },
      other: { primary: "Bhanja", formal: "Bhanja", informal: "Beta" },
    },
  },
  bhanji: {
    id: "bhanji",
    english: "Sister's Daughter",
    description: "Your sister's female child",
    side: "self",
    gender: "female",
    generation: -1,
    canAddFrom: ["sister", "elderSister", "youngerSister"],
    terms: {
      hindu: { primary: "Bhanji", formal: "Bhanji", informal: "Beti" },
      muslim: { primary: "Bhanji", formal: "Bhanji", informal: "Beti" },
      christian: { primary: "Niece", formal: "Bhanji", informal: "Niece" },
      sikh: { primary: "Bhanji Ji", formal: "Bhanji Ji", informal: "Beti" },
      other: { primary: "Bhanji", formal: "Bhanji", informal: "Beti" },
    },
  },
  bhatija: {
    id: "bhatija",
    english: "Brother's Son",
    description: "Your brother's male child",
    side: "self",
    gender: "male",
    generation: -1,
    canAddFrom: ["brother", "elderBrother", "youngerBrother"],
    terms: {
      hindu: { primary: "Bhatija", formal: "Bhatija", informal: "Beta" },
      muslim: { primary: "Bhatija", formal: "Bhatija", informal: "Beta" },
      christian: { primary: "Nephew", formal: "Bhatija", informal: "Nephew" },
      sikh: { primary: "Bhatija Ji", formal: "Bhatija Ji", informal: "Beta" },
      other: { primary: "Bhatija", formal: "Bhatija", informal: "Beta" },
    },
  },
  bhatiji: {
    id: "bhatiji",
    english: "Brother's Daughter",
    description: "Your brother's female child",
    side: "self",
    gender: "female",
    generation: -1,
    canAddFrom: ["brother", "elderBrother", "youngerBrother"],
    terms: {
      hindu: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti" },
      muslim: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti" },
      christian: { primary: "Niece", formal: "Bhatiji", informal: "Niece" },
      sikh: { primary: "Bhatiji Ji", formal: "Bhatiji Ji", informal: "Beti" },
      other: { primary: "Bhatiji", formal: "Bhatiji", informal: "Beti" },
    },
  },

  // ===========================================================================
  // STEP RELATIONS
  // ===========================================================================
  stepfather: {
    id: "stepfather",
    english: "Stepfather",
    description: "Mother's husband who is not your biological father",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["mother"],
    terms: {
      hindu: { primary: "Sautela Baap", formal: "Sautele Pitaji", informal: "Papa" },
      muslim: { primary: "Sautela Abbu", formal: "Sautele Abba", informal: "Papa" },
      christian: { primary: "Stepfather", formal: "Stepdad", informal: "Dad" },
      sikh: { primary: "Sautela Pita Ji", formal: "Sautele Bapu Ji", informal: "Papa" },
      other: { primary: "Sautela Baap", formal: "Sautele Pitaji", informal: "Papa" },
    },
  },
  stepmother: {
    id: "stepmother",
    english: "Stepmother",
    description: "Father's wife who is not your biological mother",
    side: "maternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["father"],
    terms: {
      hindu: { primary: "Sauteli Mai", formal: "Sauteli Mataji", informal: "Mummy" },
      muslim: { primary: "Sauteli Ammi", formal: "Sauteli Ammi Jaan", informal: "Mummy" },
      christian: { primary: "Stepmother", formal: "Stepmom", informal: "Mum" },
      sikh: { primary: "Sauteli Mata Ji", formal: "Sauteli Bebe Ji", informal: "Mummy" },
      other: { primary: "Sauteli Mai", formal: "Sauteli Mataji", informal: "Mummy" },
    },
  },
  stepbrother: {
    id: "stepbrother",
    english: "Stepbrother",
    description: "Step-parent's son",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["stepfather", "stepmother"],
    terms: {
      hindu: { primary: "Sautela Bhai", formal: "Sautele Bhaiya", informal: "Bhai" },
      muslim: { primary: "Sautela Bhai", formal: "Sautele Bhai Jaan", informal: "Bhai" },
      christian: { primary: "Stepbrother", formal: "Stepbro", informal: "Bro" },
      sikh: { primary: "Sautela Veer", formal: "Sautele Veer Ji", informal: "Veer" },
      other: { primary: "Sautela Bhai", formal: "Sautele Bhaiya", informal: "Bhai" },
    },
  },
  stepsister: {
    id: "stepsister",
    english: "Stepsister",
    description: "Step-parent's daughter",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["stepfather", "stepmother"],
    terms: {
      hindu: { primary: "Sauteli Bahin", formal: "Sauteli Didi", informal: "Bahin" },
      muslim: { primary: "Sauteli Behen", formal: "Sauteli Baji", informal: "Bahin" },
      christian: { primary: "Stepsister", formal: "Stepsis", informal: "Sis" },
      sikh: { primary: "Sauteli Bhain", formal: "Sauteli Bhain Ji", informal: "Bhain" },
      other: { primary: "Sauteli Bahin", formal: "Sauteli Didi", informal: "Bahin" },
    },
  },

  // ===========================================================================
  // HALF SIBLINGS
  // ===========================================================================
  halfBrother: {
    id: "halfBrother",
    english: "Half Brother",
    description: "Shares one parent with you",
    side: "self",
    gender: "male",
    generation: 0,
    canAddFrom: ["father", "mother", "stepfather", "stepmother"],
    terms: {
      hindu: { primary: "Sautela Bhai", formal: "Bhaiya", informal: "Bhai" },
      muslim: { primary: "Sautela Bhai", formal: "Bhai Jaan", informal: "Bhai" },
      christian: { primary: "Half Brother", formal: "Brother", informal: "Bro" },
      sikh: { primary: "Sautela Veer", formal: "Veer Ji", informal: "Veer" },
      other: { primary: "Sautela Bhai", formal: "Bhaiya", informal: "Bhai" },
    },
  },
  halfSister: {
    id: "halfSister",
    english: "Half Sister",
    description: "Shares one parent with you",
    side: "self",
    gender: "female",
    generation: 0,
    canAddFrom: ["father", "mother", "stepfather", "stepmother"],
    terms: {
      hindu: { primary: "Sauteli Bahin", formal: "Didi", informal: "Bahin" },
      muslim: { primary: "Sauteli Behen", formal: "Baji", informal: "Bahin" },
      christian: { primary: "Half Sister", formal: "Sister", informal: "Sis" },
      sikh: { primary: "Sauteli Bhain", formal: "Bhain Ji", informal: "Bhain" },
      other: { primary: "Sauteli Bahin", formal: "Didi", informal: "Bahin" },
    },
  },

  // ===========================================================================
  // ADOPTIVE RELATIONS
  // ===========================================================================
  adoptiveFather: {
    id: "adoptiveFather",
    english: "Adoptive Father",
    description: "Father by adoption",
    side: "paternal",
    gender: "male",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Palak Pita", formal: "Palak Pitaji", informal: "Papa" },
      muslim: { primary: "Palak Abbu", formal: "Palak Abba Jaan", informal: "Papa" },
      christian: { primary: "Adoptive Father", formal: "Dad", informal: "Dad" },
      sikh: { primary: "Palak Pita Ji", formal: "Palak Bapu Ji", informal: "Papa" },
      other: { primary: "Palak Pita", formal: "Palak Pitaji", informal: "Papa" },
    },
  },
  adoptiveMother: {
    id: "adoptiveMother",
    english: "Adoptive Mother",
    description: "Mother by adoption",
    side: "maternal",
    gender: "female",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Palak Mata", formal: "Palak Mataji", informal: "Mummy" },
      muslim: { primary: "Palak Ammi", formal: "Palak Ammi Jaan", informal: "Mummy" },
      christian: { primary: "Adoptive Mother", formal: "Mum", informal: "Mum" },
      sikh: { primary: "Palak Mata Ji", formal: "Palak Bebe Ji", informal: "Mummy" },
      other: { primary: "Palak Mata", formal: "Palak Mataji", informal: "Mummy" },
    },
  },

  // ===========================================================================
  // GODPARENTS (Christian specific but used across)
  // ===========================================================================
  godfather: {
    id: "godfather",
    english: "Godfather",
    description: "Spiritual father figure",
    side: "self",
    gender: "male",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Dharma Pita", formal: "Dharma Pitaji", informal: "Uncle" },
      muslim: { primary: "Dharam Abbu", formal: "Dharam Abba", informal: "Uncle" },
      christian: { primary: "Godfather", formal: "Godfather", informal: "Uncle" },
      sikh: { primary: "Dharma Pita Ji", formal: "Dharma Bapu Ji", informal: "Uncle" },
      other: { primary: "Dharma Pita", formal: "Dharma Pitaji", informal: "Uncle" },
    },
  },
  godmother: {
    id: "godmother",
    english: "Godmother",
    description: "Spiritual mother figure",
    side: "self",
    gender: "female",
    generation: 1,
    canAddFrom: ["self"],
    terms: {
      hindu: { primary: "Dharma Mata", formal: "Dharma Mataji", informal: "Aunty" },
      muslim: { primary: "Dharam Ammi", formal: "Dharam Ammi Jaan", informal: "Aunty" },
      christian: { primary: "Godmother", formal: "Godmother", informal: "Aunty" },
      sikh: { primary: "Dharma Mata Ji", formal: "Dharma Bebe Ji", informal: "Aunty" },
      other: { primary: "Dharma Mata", formal: "Dharma Mataji", informal: "Aunty" },
    },
  },
};

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

// Get relationships that can be added from a given relationship
export function getAddableRelationships(fromRelationshipId: string, faith: Faith = "hindu"): Relationship[] {
  return Object.values(RELATIONSHIPS).filter((rel) =>
    rel.canAddFrom.includes(fromRelationshipId)
  );
}

// Get relationship by ID
export function getRelationship(id: string): Relationship | undefined {
  return RELATIONSHIPS[id];
}

// Get all relationships as array
export function getAllRelationships(): Relationship[] {
  return Object.values(RELATIONSHIPS);
}

// Get relationship count
export function getRelationshipCount(): number {
  return Object.keys(RELATIONSHIPS).length;
}

// Group relationships by category for display
export function getRelationshipsByCategory(faith: Faith = "hindu") {
  const categories = {
    parents: ["father", "mother"],
    grandparentsPaternal: ["dada", "dadi"],
    grandparentsMaternal: ["nana", "nani"],
    greatGrandparents: ["pardada", "pardadi", "parnana", "parnani"],
    siblings: ["brother", "sister", "elderBrother", "elderSister", "youngerBrother", "youngerSister"],
    paternalUnclesAunts: ["chacha", "chachi", "tau", "tai", "bua", "phupha"],
    maternalUnclesAunts: ["mama", "mami", "mausi", "mausa"],
    spouse: ["husband", "wife"],
    children: ["son", "daughter"],
    grandchildren: ["grandson", "granddaughter", "potaSons", "naati", "naatin"],
    inLawsParents: ["sasur", "saas"],
    inLawsChildren: ["damad", "bahu"],
    siblingInLaws: ["jija", "bhabhi", "sala", "sali", "devar", "jeth", "jethani", "devrani", "nanad", "nandoi"],
    coInLaws: ["samdhi", "samdhan"],
    cousins: ["cousinBrotherPaternal", "cousinSisterPaternal", "cousinBrotherMaternal", "cousinSisterMaternal"],
    niecesNephews: ["nephew", "niece", "bhanja", "bhanji", "bhatija", "bhatiji"],
    stepRelations: ["stepfather", "stepmother", "stepbrother", "stepsister"],
    halfSiblings: ["halfBrother", "halfSister"],
    adoptive: ["adoptiveFather", "adoptiveMother"],
    spiritual: ["godfather", "godmother"],
  };

  return Object.entries(categories).map(([key, ids]) => ({
    category: key,
    relationships: ids
      .map((id) => RELATIONSHIPS[id])
      .filter(Boolean)
      .map((rel) => ({
        ...rel,
        displayTerm: getTermForFaith(rel, faith),
      })),
  }));
}

// Search relationships by term
export function searchRelationships(query: string, faith: Faith = "hindu"): Relationship[] {
  const lowerQuery = query.toLowerCase();
  return Object.values(RELATIONSHIPS).filter((rel) => {
    const terms = rel.terms[faith] || rel.terms.hindu;
    return (
      rel.english.toLowerCase().includes(lowerQuery) ||
      rel.description?.toLowerCase().includes(lowerQuery) ||
      terms.primary.toLowerCase().includes(lowerQuery) ||
      terms.alternate?.toLowerCase().includes(lowerQuery) ||
      terms.formal?.toLowerCase().includes(lowerQuery) ||
      terms.informal?.toLowerCase().includes(lowerQuery)
    );
  });
}

// Export for Supabase sync
export function getRelationshipsForSupabase() {
  return Object.values(RELATIONSHIPS).map((rel) => ({
    id: rel.id,
    english: rel.english,
    description: rel.description || null,
    side: rel.side,
    gender: rel.gender,
    generation: rel.generation,
    can_add_from: rel.canAddFrom,
    terms_hindu: rel.terms.hindu,
    terms_muslim: rel.terms.muslim,
    terms_christian: rel.terms.christian,
    terms_sikh: rel.terms.sikh,
    terms_other: rel.terms.other,
  }));
}
