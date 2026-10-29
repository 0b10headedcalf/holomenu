export type EvidencePhoto = {
  url: string;
  source: string;
  daysAgo: number;
  angle: string;
};

export type Dish = {
  id: string;
  name: string;
  restaurant: string;
  price: number;
  description: string;
  model: string;
  poster: string;
  diameterCm: number;
  heightCm: number;
  weightG: number;
  serves: string;
  calories: number;
  ingredients: string[];
  allergens: string[];
  evidence: EvidencePhoto[];
  portionAgreement: number; // 0-100
  presentationAgreement: number;
  colorAgreement: number;
  uncertainty: string;
  spicy?: number; // 0-5
};

const img = (id: string) =>
  `https://images.unsplash.com/${id}?q=80&w=900&auto=format&fit=crop`;

export const DISHES: Dish[] = [
  {
    id: "ramen",
    name: "Tonkotsu Ramen",
    restaurant: "Menya Underground",
    price: 18,
    description:
      "18-hour pork broth, chashu, ajitama egg, wood-ear mushrooms, scallion. Real servings run broth-heavy with a smaller noodle portion than the menu photo suggests.",
    model: "/models/ramen.glb",
    poster: img("photo-1569718212165-3a8278d5f624"),
    diameterCm: 19,
    heightCm: 9,
    weightG: 620,
    serves: "1 hungry person",
    calories: 780,
    ingredients: ["pork broth", "wheat noodles", "chashu pork", "egg", "scallion", "wood-ear mushroom", "nori", "sesame"],
    allergens: ["wheat", "egg", "soy", "sesame"],
    evidence: [
      { url: img("photo-1569718212165-3a8278d5f624"), source: "customer photo", daysAgo: 2, angle: "top-down" },
      { url: img("photo-1591814468924-caf88d1232e1"), source: "customer photo", daysAgo: 5, angle: "45°" },
      { url: img("photo-1557872943-16a5ac26437e"), source: "customer photo", daysAgo: 9, angle: "side" },
      { url: img("photo-1585032226651-759b368d7246"), source: "customer photo", daysAgo: 13, angle: "top-down" },
    ],
    portionAgreement: 86,
    presentationAgreement: 78,
    colorAgreement: 91,
    uncertainty: "Egg yolk runniness varies. Broth level is consistent; noodle volume varies ±15% at lunch rush.",
    spicy: 1,
  },
  {
    id: "burger",
    name: "Smash Burger + Fries",
    restaurant: "Stack & Sons",
    price: 16,
    description:
      "Double smashed patty, American cheese, pickles, house sauce on a potato bun. Real height is ~30% shorter than promo shots once the bun settles.",
    model: "/models/burger.glb",
    poster: img("photo-1568901346375-23c9450c58cd"),
    diameterCm: 11,
    heightCm: 8,
    weightG: 410,
    serves: "1 person",
    calories: 920,
    ingredients: ["beef", "potato bun", "American cheese", "pickles", "onion", "house sauce", "fries"],
    allergens: ["wheat", "milk", "egg"],
    evidence: [
      { url: img("photo-1568901346375-23c9450c58cd"), source: "customer photo", daysAgo: 1, angle: "side" },
      { url: img("photo-1571091718767-18b5b1457add"), source: "customer photo", daysAgo: 4, angle: "45°" },
      { url: img("photo-1553979459-d2229ba7433b"), source: "customer photo", daysAgo: 7, angle: "top-down" },
    ],
    portionAgreement: 92,
    presentationAgreement: 84,
    colorAgreement: 88,
    uncertainty: "Fry portion is the biggest variable — late-night servings skew smaller.",
    spicy: 0,
  },
  {
    id: "salad",
    name: "Harvest Grain Bowl",
    restaurant: "Verde",
    price: 14,
    description:
      "Quinoa, roasted squash, kale, feta, tahini. The most honestly-portioned dish on this menu — photos agree closely across 9 servings.",
    model: "/models/salad.glb",
    poster: img("photo-1512621776951-a57141f2eefd"),
    diameterCm: 20,
    heightCm: 6,
    weightG: 480,
    serves: "1 person, light for 2",
    calories: 540,
    ingredients: ["quinoa", "kale", "roast squash", "feta", "chickpea", "tahini", "pumpkin seeds"],
    allergens: ["milk", "sesame"],
    evidence: [
      { url: img("photo-1512621776951-a57141f2eefd"), source: "customer photo", daysAgo: 3, angle: "top-down" },
      { url: img("photo-1546069901-ba9599a7e63c"), source: "customer photo", daysAgo: 6, angle: "45°" },
      { url: img("photo-1540189549336-e6e99c629fe0"), source: "customer photo", daysAgo: 11, angle: "top-down" },
    ],
    portionAgreement: 94,
    presentationAgreement: 89,
    colorAgreement: 93,
    uncertainty: "Low uncertainty. Squash swaps to sweet potato seasonally.",
  },
  {
    id: "pizza",
    name: "Margherita Pizza",
    restaurant: "Forno Vivo",
    price: 19,
    description:
      "Wood-fired, San Marzano tomato, fior di latte, basil. Char and cheese spread vary the most — expect leopard spotting, not an even melt.",
    model: "/models/pizza.glb",
    poster: img("photo-1513104890138-7c749659a591"),
    diameterCm: 30,
    heightCm: 2,
    weightG: 520,
    serves: "1-2 people",
    calories: 860,
    ingredients: ["wheat dough", "tomato", "mozzarella", "basil", "olive oil", "sea salt"],
    allergens: ["wheat", "milk"],
    evidence: [
      { url: img("photo-1513104890138-7c749659a591"), source: "customer photo", daysAgo: 2, angle: "top-down" },
      { url: img("photo-1574071318508-1cdbab80d002"), source: "customer photo", daysAgo: 8, angle: "45°" },
      { url: img("photo-1595854341625-f33ee10dbf94"), source: "customer photo", daysAgo: 15, angle: "side" },
    ],
    portionAgreement: 81,
    presentationAgreement: 67,
    colorAgreement: 74,
    uncertainty: "High presentation variance — char pattern and basil placement differ every bake. Size is reliable.",
    spicy: 0,
  },
  {
    id: "sushi",
    name: "Chef's Nigiri Set (8 pc)",
    restaurant: "Umi Counter",
    price: 28,
    description:
      "Eight pieces, chef's daily selection. Fish cuts run generous, but the exact species rotates — today's set may not match photos from last week.",
    model: "/models/sushi.glb",
    poster: img("photo-1579871494447-9811cf80d66c"),
    diameterCm: 26,
    heightCm: 4,
    weightG: 340,
    serves: "1 person",
    calories: 420,
    ingredients: ["sushi rice", "raw fish (rotating)", "wasabi", "pickled ginger", "soy"],
    allergens: ["fish", "soy"],
    evidence: [
      { url: img("photo-1579871494447-9811cf80d66c"), source: "customer photo", daysAgo: 4, angle: "top-down" },
      { url: img("photo-1553621042-f6e147245754"), source: "customer photo", daysAgo: 12, angle: "45°" },
    ],
    portionAgreement: 73,
    presentationAgreement: 71,
    colorAgreement: 69,
    uncertainty: "Low evidence: only 2 recent photos and fish selection rotates daily. Treat species as indicative, size as reliable.",
    spicy: 1,
  },
  {
    id: "pasta",
    name: "Cacio e Pepe",
    restaurant: "Trattoria Nona",
    price: 17,
    description:
      "Tonarelli, black pepper, pecorino romano. Sauce clings inconsistently in photos — glossy when fresh, clumpy if it sits. Order it for dine-in, not takeout.",
    model: "/models/pasta.glb",
    poster: img("photo-1621996346565-e3dbc646d9a9"),
    diameterCm: 22,
    heightCm: 5,
    weightG: 390,
    serves: "1 person",
    calories: 690,
    ingredients: ["wheat pasta", "pecorino romano", "black pepper"],
    allergens: ["wheat", "milk"],
    evidence: [
      { url: img("photo-1621996346565-e3dbc646d9a9"), source: "customer photo", daysAgo: 3, angle: "top-down" },
      { url: img("photo-1473093295043-cdd812d0e601"), source: "customer photo", daysAgo: 7, angle: "45°" },
      { url: img("photo-1563379926898-05f4575a45d8"), source: "customer photo", daysAgo: 10, angle: "side" },
    ],
    portionAgreement: 88,
    presentationAgreement: 76,
    colorAgreement: 85,
    uncertainty: "Sauce texture is timing-sensitive. Portion and pepper level are consistent.",
    spicy: 2,
  },
];

export const getDish = (id: string) => DISHES.find((d) => d.id === id);
