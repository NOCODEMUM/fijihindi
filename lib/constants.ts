// Fiji regions for family origin selection
export const FIJI_REGIONS = [
  { id: "ba", name: "Ba", lat: -17.5333, lng: 177.6667 },
  { id: "lautoka", name: "Lautoka", lat: -17.6167, lng: 177.45 },
  { id: "nadi", name: "Nadi", lat: -17.8, lng: 177.4167 },
  { id: "suva", name: "Suva", lat: -18.1416, lng: 178.4419 },
  { id: "labasa", name: "Labasa", lat: -16.4333, lng: 179.3667 },
  { id: "sigatoka", name: "Sigatoka", lat: -18.1417, lng: 177.5083 },
  { id: "tavua", name: "Tavua", lat: -17.6333, lng: 177.9 },
  { id: "rakiraki", name: "Rakiraki", lat: -17.35, lng: 178.1167 },
  { id: "savusavu", name: "Savusavu", lat: -16.7833, lng: 179.3333 },
  { id: "levuka", name: "Levuka", lat: -17.6833, lng: 178.8333 },
  { id: "navua", name: "Navua", lat: -18.2167, lng: 178.1667 },
  { id: "other", name: "Other / Not Sure", lat: -17.7134, lng: 178.065 },
] as const;

// Fiji center coordinates for the globe
export const FIJI_CENTER = {
  lat: -17.7134,
  lng: 178.065,
};

// Major diaspora countries for demo data
export const DIASPORA_COUNTRIES = [
  { country: "Australia", city: "Sydney", lat: -33.8688, lng: 151.2093, count: 45000 },
  { country: "Australia", city: "Melbourne", lat: -37.8136, lng: 144.9631, count: 28000 },
  { country: "Australia", city: "Brisbane", lat: -27.4705, lng: 153.026, count: 15000 },
  { country: "New Zealand", city: "Auckland", lat: -36.8485, lng: 174.7633, count: 35000 },
  { country: "New Zealand", city: "Wellington", lat: -41.2866, lng: 174.7756, count: 8000 },
  { country: "United States", city: "San Francisco", lat: 37.7749, lng: -122.4194, count: 12000 },
  { country: "United States", city: "Los Angeles", lat: 34.0522, lng: -118.2437, count: 8500 },
  { country: "United States", city: "Sacramento", lat: 38.5816, lng: -121.4944, count: 6000 },
  { country: "Canada", city: "Vancouver", lat: 49.2827, lng: -123.1207, count: 18000 },
  { country: "Canada", city: "Toronto", lat: 43.6532, lng: -79.3832, count: 9000 },
  { country: "United Kingdom", city: "London", lat: 51.5074, lng: -0.1278, count: 5000 },
  { country: "India", city: "Mumbai", lat: 19.076, lng: 72.8777, count: 2000 },
  { country: "United Arab Emirates", city: "Dubai", lat: 25.2048, lng: 55.2708, count: 3500 },
] as const;

// Calculate total diaspora count
export const TOTAL_DIASPORA_COUNT = DIASPORA_COUNTRIES.reduce(
  (sum, loc) => sum + loc.count,
  0
);

// Faith/religion options for family term variations
export const FAITH_OPTIONS = [
  {
    id: "hindu",
    name: "Hindu",
    emoji: "🙏",
    description: "Traditional Hindi terms"
  },
  {
    id: "muslim",
    name: "Muslim",
    emoji: "☪️",
    description: "Urdu-influenced terms"
  },
  {
    id: "christian",
    name: "Christian",
    emoji: "✝️",
    description: "Mix of Hindi & English terms"
  },
  {
    id: "sikh",
    name: "Sikh",
    emoji: "🙏",
    description: "Punjabi-influenced terms"
  },
  {
    id: "other",
    name: "Other / Prefer not to say",
    emoji: "🌏",
    description: "General Fiji Hindi terms"
  },
] as const;

// Onboarding steps
export const ONBOARDING_STEPS = [
  { id: "welcome", title: "Welcome" },
  { id: "location", title: "Your Location" },
  { id: "origin", title: "Family Origin" },
  { id: "faith", title: "Family Faith" },
  { id: "complete", title: "Complete" },
] as const;

// App theme colors
export const COLORS = {
  primary: "#FF7722",
  secondary: "#0D98BA",
  accent: "#2E8B57",
  backgroundLight: "#FAFAFA",
  backgroundDark: "#1A1A2E",
  charcoal: "#2D2D2D",
} as const;
