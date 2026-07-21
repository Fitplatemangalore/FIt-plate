export interface VarietyData {
  id: string;
  slug: string;
  name: string;
  tag: string;
  tag_pill: string;
  highlight: string;
  description: string;
  best_in: string;
  image_url: string;
  benefits?: string[];
  growing_time?: string;
  flavor_profile?: string;
}

export const defaultVarieties: VarietyData[] = [
  {
    id: "broccoli",
    slug: "broccoli",
    name: "Broccoli Microgreens",
    tag: "Microgreen",
    tag_pill: "Sulforaphane-rich",
    highlight: "Peppery crunch, packed with glucosinolates & sulforaphane.",
    description:
      "Broccoli microgreens are exceptionally rich in vitamins C, K, and A precursors, glucosinolates, and sulforaphane precursors. Sulforaphane is a potent compound studied for its antioxidant defenses, cardiovascular benefits, cellular detoxification, and anti-inflammatory properties. These young shoots deliver up to 40 times the nutrient concentration of mature broccoli heads with a fresh, crisp, peppery flavor profile.",
    best_in: "Salads, grain bowls, sandwiches, wraps, smoothies, avocado toast.",
    image_url: "https://images.unsplash.com/photo-1535734668010-da0c7d3085f2?auto=format&fit=crop&w=800&q=80",
    flavor_profile: "Fresh, crisp, mildly peppery with a clean brassica finish.",
    growing_time: "7 – 10 days",
    benefits: [
      "High concentration of sulforaphane for cellular defense",
      "Rich in Vitamins A, C, K, and essential folate",
      "Supports cardiovascular and digestive health",
      "Potent antioxidant properties protecting against oxidative stress"
    ]
  },
  {
    id: "purple-kale",
    slug: "purple-kale",
    name: "Purple Kale Microgreens",
    tag: "Microgreen",
    tag_pill: "Eye & bone health",
    highlight: "Deep royal purple stems, mild earthy bite.",
    description:
      "Purple Kale microgreens are an excellent source of vitamins A, C, and K, lutein, zeaxanthin, and anthocyanins. These nutrient-dense seedlings support eye health, bone density, and immune defenses. Their striking purple hues add visual sophistication to culinary presentations, while their mild, earthy flavor makes them a versatile staple in both raw and warm dishes.",
    best_in: "Buddha bowls, gourmet garnishes, wraps, side salads, green juices.",
    image_url: "https://images.unsplash.com/photo-1622463214111-b192a53371d2?auto=format&fit=crop&w=800&q=80",
    flavor_profile: "Mild, earthy, slightly sweet with a tender crunch.",
    growing_time: "8 – 12 days",
    benefits: [
      "Abundant in lutein & zeaxanthin for vision support",
      "Packed with immune-boosting Vitamin C and K1",
      "High anthocyanin content giving natural anti-inflammatory benefits",
      "Enhances bone density and vascular integrity"
    ]
  },
  {
    id: "basil",
    slug: "basil",
    name: "Basil Microgreens",
    tag: "Microgreen",
    tag_pill: "Aromatic & antioxidant",
    highlight: "Fragrant, essential-oil rich aromatic leaves.",
    description:
      "Basil microgreens boast concentrated aromatic essential oils, including eugenol and rosmarinic acid, alongside vitamins A and K. Offering intense basil aroma and flavor in miniature form, they deliver potent antioxidant benefits that combat oxidative stress while elevating Italian and Mediterranean cooking with fresh herbal elegance.",
    best_in: "Pasta, pizza, caprese salads, Italian main courses, infused oils, pestos.",
    image_url: "https://images.unsplash.com/photo-1536630596251-b12ba0d9f7d4?auto=format&fit=crop&w=800&q=80",
    flavor_profile: "Intensely fragrant, sweet, slightly peppery anise notes.",
    growing_time: "12 – 16 days",
    benefits: [
      "Rich in essential oils (eugenol, rosmarinic acid)",
      "Protects against cellular oxidative damage",
      "Provides natural anti-bacterial & anti-inflammatory support",
      "High levels of Vitamin K and polyphenols"
    ]
  },
  {
    id: "fenugreek",
    slug: "fenugreek",
    name: "Fenugreek Microgreens",
    tag: "Microgreen",
    tag_pill: "Digestive support",
    highlight: "Slightly bitter, iron-rich micro shoots.",
    description:
      "Fenugreek microgreens (Methi shoots) provide iron, dietary fiber, vitamins A and C, and active phytochemicals including trigonelline. Long revered in traditional medicine, fenugreek microgreens support healthy digestion, blood-sugar regulation, and metabolic health while adding an authentic warm herbal touch to Indian and South Asian cuisine.",
    best_in: "Curries, parathas, dals, soups, savory garnishes.",
    image_url: "https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=800&q=80",
    flavor_profile: "Nutty, warm, pleasantly bitter with maple-herbal undertones.",
    growing_time: "7 – 9 days",
    benefits: [
      "High bioavailability of plant-based iron and folate",
      "Supports healthy digestion and blood sugar balance",
      "Contains trigonelline & saponins for metabolic vitality",
      "Rich in dietary fiber and essential minerals"
    ]
  },
  {
    id: "spinach",
    slug: "spinach",
    name: "Spinach Microgreens",
    tag: "Microgreen",
    tag_pill: "Nutrient powerhouse",
    highlight: "Tender green leaves, mild juicy taste.",
    description:
      "Spinach microgreens deliver a powerhouse of bioavailable iron, folate, lutein, and vitamins C and E in delicate seedling form. Easily digestible and remarkably versatile, spinach microgreens promote red blood cell formation, muscular health, and skin repair without the heavy oxalic acid astringency found in mature spinach.",
    best_in: "Omelettes, smoothies, cold-pressed juices, grain bowls, sandwiches.",
    image_url: "/assets/pot/pot-2.png",
    flavor_profile: "Clean, mild, succulent and delicately sweet.",
    growing_time: "10 – 14 days",
    benefits: [
      "Superior iron and folate content for blood health",
      "High in lutein and beta-carotene for eye wellness",
      "Lower oxalic acid content than mature leaves",
      "Promotes skin renewal and cellular regeneration"
    ]
  },
  {
    id: "beetroot",
    slug: "beetroot",
    name: "Beetroot Microgreens",
    tag: "Microgreen",
    tag_pill: "Nitrate & betalain rich",
    highlight: "Vibrant magenta stems, earthy sweet flavor.",
    description:
      "Beetroot microgreens stand out with their vibrant ruby-red stems and rich concentrations of betalains and dietary nitrates. Dietary nitrates improve nitric oxide levels in the bloodstream, boosting athletic endurance, stamina, and vascular health, while betalains provide deep cellular antioxidant protection.",
    best_in: "Fine dining garnishes, goat cheese salads, roasted vegetable bowls, carpaccio.",
    image_url: "/assets/pot/pot-4.png",
    flavor_profile: "Distinctly earthy, sweet, juicy with a crisp snap.",
    growing_time: "14 – 18 days",
    benefits: [
      "Rich in natural nitrates that promote blood flow & stamina",
      "High betalain antioxidant content for liver detoxification",
      "Contains Iron, Potassium, and Vitamin C",
      "Striking magenta color for elevated plate presentation"
    ]
  },
  {
    id: "radish",
    slug: "radish",
    name: "Radish Microgreens",
    tag: "Microgreen",
    tag_pill: "Bold & spicy",
    highlight: "Bold peppery kick, vibrant green and pink stems.",
    description:
      "Radish microgreens bring an irresistible zesty crunch and peppery punch to any dish. Rich in vitamin C, zinc, and glucosinolates, these quick-growing shoots stimulate digestion, clear respiratory passages, and add an instant burst of heat and crisp texture to savory plates.",
    best_in: "Tacos, burgers, sushi rolls, Asian noodle bowls, salad toppers.",
    image_url: "/assets/pot/pot-1.png",
    flavor_profile: "Zesty, sharp, peppery and refreshingly crisp.",
    growing_time: "6 – 8 days",
    benefits: [
      "High Vitamin C and Zinc content for immune defense",
      "Natural digestive stimulant and respiratory cleanser",
      "Concentrated glucosinolates for cellular protection",
      "Adds spicy bite without high calorie content"
    ]
  },
  {
    id: "turnip",
    slug: "turnip",
    name: "Turnip Microgreens",
    tag: "Microgreen",
    tag_pill: "Vitamin K champion",
    highlight: "Crisp white-green stems, sweet brassica finish.",
    description:
      "Turnip microgreens offer a clean, sweet turnip-cabbage flavor packed with exceptional levels of Vitamin K, Calcium, and Vitamin C. They support bone density, blood clotting regulation, and collagen synthesis, serving as a mild yet nutrient-dense green for everyday meals.",
    best_in: "Soups, stews, stir-fries, savory breakfast plates.",
    image_url: "/assets/pot/pot-3.png",
    flavor_profile: "Mildly sweet, cabbage-like with a gentle crisp bite.",
    growing_time: "7 – 10 days",
    benefits: [
      "Exceptional Vitamin K content for bone strength",
      "Rich in Calcium and Vitamin C for joint health",
      "Gentle on digestion with mild fiber profile",
      "Complements cooked and raw dishes alike"
    ]
  },
  {
    id: "green-amaranth",
    slug: "green-amaranth",
    name: "Green Amaranth Microgreens",
    tag: "Microgreen",
    tag_pill: "Protein & mineral rich",
    highlight: "Lush tender leaves, rich in plant protein.",
    description:
      "Green Amaranth microgreens are prized for their soft, delicate leaves and high concentration of complete plant proteins, lysine, calcium, and magnesium. Commonly cultivated in traditional South Asian agriculture, amaranth shoots nourish bone health, muscle recovery, and overall vitality.",
    best_in: "Stir-fried greens, warm grain bowls, South Asian curries, salads.",
    image_url: "/assets/pot/pot-2.png",
    flavor_profile: "Soft, earthy, delicate with a mild spinach-like note.",
    growing_time: "8 – 12 days",
    benefits: [
      "High plant protein & essential amino acid (lysine) content",
      "Abundant in Calcium, Magnesium, and Manganese",
      "Gluten-free nutrient booster for active lifestyles",
      "Soft texture ideal for cooked or raw integration"
    ]
  },
  {
    id: "sunflower",
    slug: "sunflower",
    name: "Sunflower Microgreens",
    tag: "Microgreen",
    tag_pill: "Nutty & crunchy",
    highlight: "Substantial succulent leaves, rich nutty taste.",
    description:
      "Sunflower microgreens are hearty, succulent, and deliciously nutty. Bursting with healthy essential fatty acids, plant protein, zinc, and vitamin E, these thick greens make a satisfying snack on their own or a substantial base for salads and sandwiches.",
    best_in: "Standalone salad base, wraps, avocado toasts, snacking mixes.",
    image_url: "/assets/pot/pot-4.png",
    flavor_profile: "Richly nutty, juicy, crisp, and robust.",
    growing_time: "10 – 12 days",
    benefits: [
      "Packed with Vitamin E for skin & cellular health",
      "Rich in healthy essential fatty acids & plant protein",
      "High Zinc and Iron content for stamina",
      "Hearty, satisfying crunch that elevates any meal"
    ]
  }
];
