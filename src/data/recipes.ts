export interface RecipeData {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  category: string;
  prep_time: string;
  cook_time: string;
  servings: string;
  excerpt: string;
  ingredients: string[];
  instructions: string[];
  health_benefits: string[];
  microgreens_used: string[];
  sort_order?: number;
}

export const defaultRecipes: RecipeData[] = [
  {
    id: "broccoli-microgreen-avocado-toast",
    slug: "broccoli-microgreen-avocado-toast",
    title: "Sourdough Avocado Toast with Crisp Broccoli Microgreens",
    category: "Breakfast & Brunch",
    prep_time: "10 mins",
    cook_time: "5 mins",
    servings: "2 servings",
    image_url: "https://images.unsplash.com/photo-1525351484163-7529414344d8?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Thick slices of toasted sourdough topped with creamy mashed avocado, a pinch of chili flakes, poached eggs, and a generous heap of raw sulforaphane-rich broccoli microgreens.",
    ingredients: [
      "2 thick slices artisanal sourdough bread",
      "1 ripe Hass avocado",
      "1 tbsp extra virgin olive oil",
      "1 tsp lemon juice",
      "1/2 cup fresh Fit Plate Broccoli Microgreens",
      "2 eggs (poached or fried to preference)",
      "Pinch of sea salt and freshly cracked black pepper",
      "1/4 tsp red chili flakes"
    ],
    instructions: [
      "Lightly toast the sourdough bread slices until golden brown and crisp around the edges.",
      "In a small bowl, mash the ripe avocado with lemon juice, a drizzle of olive oil, salt, and black pepper using a fork.",
      "Spread the seasoned mashed avocado evenly over each warm slice of toasted sourdough.",
      "Top each toast slice with a freshly cooked poached egg.",
      "Finish by topping with a dense handful of fresh Fit Plate Broccoli Microgreens and sprinkling red chili flakes over top. Serve immediately."
    ],
    health_benefits: [
      "Broccoli microgreens are exceptionally rich in Sulforaphane, a potent cellular antioxidant that supports liver detoxification and immune health.",
      "Healthy monounsaturated fats from avocado enhance the bioavailability and absorption of fat-soluble vitamins (A, E, K) present in the microgreens.",
      "Provides sustained morning energy with high dietary fiber, high-quality protein, and essential B vitamins."
    ],
    microgreens_used: ["Broccoli Microgreens"]
  },
  {
    id: "purple-kale-berry-power-smoothie",
    slug: "purple-kale-berry-power-smoothie",
    title: "Purple Kale & Antioxidant Berry Power Smoothie",
    category: "Smoothies & Juices",
    prep_time: "5 mins",
    cook_time: "0 mins",
    servings: "1 serving",
    image_url: "https://images.unsplash.com/photo-1553530666-ba11a7da3888?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "A nutrient-dense morning smoothie blending antioxidant-rich blueberries, frozen banana, Greek yogurt, chia seeds, and fresh Purple Kale microgreens.",
    ingredients: [
      "1/2 cup fresh Fit Plate Purple Kale Microgreens",
      "1/2 cup frozen blueberries or mixed berries",
      "1 ripe frozen banana",
      "1/2 cup plain Greek yogurt or unsweetened almond milk",
      "1 tbsp chia seeds or flaxseed meal",
      "1 tbsp raw honey or maple syrup (optional)",
      "1/2 cup coconut water or chilled water"
    ],
    instructions: [
      "Add the chilled coconut water, Greek yogurt, and frozen banana to a high-speed blender.",
      "Add the blueberries, chia seeds, and a generous handful of fresh Fit Plate Purple Kale Microgreens.",
      "Blend on high speed for 45–60 seconds until completely smooth and velvety in texture.",
      "Taste and adjust sweetness with honey if desired.",
      "Pour into a chilled glass, garnish with a tiny sprig of fresh microgreens, and enjoy immediately."
    ],
    health_benefits: [
      "Purple kale microgreens contain concentrated anthocyanins and Vitamin C, helping reduce inflammation and combat oxidative stress.",
      "Chia seeds and microgreens combined provide a strong boost of plant-based Omega-3 fatty acids and gut-friendly fiber.",
      "Electrolytes from coconut water and potassium from banana support rapid hydration and cellular recovery."
    ],
    microgreens_used: ["Purple Kale Microgreens"]
  },
  {
    id: "peppery-radish-microgreen-quinoa-salad",
    slug: "peppery-radish-microgreen-quinoa-salad",
    title: "Peppery Radish Microgreen & Roasted Chickpea Quinoa Salad",
    category: "Salads & Bowls",
    prep_time: "15 mins",
    cook_time: "15 mins",
    servings: "3 servings",
    image_url: "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Crisp, refreshing salad featuring fluffy quinoa, crispy spiced chickpeas, cherry tomatoes, cucumbers, and zesty Red Radish microgreens tossed in lemon tahini dressing.",
    ingredients: [
      "1 cup cooked fluff quinoa (cooled)",
      "1 cup canned chickpeas (drained, rinsed, and patted dry)",
      "1/2 cup fresh Fit Plate Radish Microgreens",
      "1 cup cherry tomatoes, halved",
      "1 cup diced English cucumber",
      "1/4 cup crumbled feta cheese or vegan feta (optional)",
      "2 tbsp extra virgin olive oil",
      "1 tsp ground cumin & smoked paprika",
      "Dressing: 2 tbsp tahini, 2 tbsp fresh lemon juice, 1 tbsp olive oil, 1 clove minced garlic, warm water as needed"
    ],
    instructions: [
      "Preheat oven to 200°C (400°F). Toss chickpeas with 1 tbsp olive oil, cumin, paprika, and a pinch of salt. Roast for 15–20 minutes until crunchy.",
      "In a small bowl or jar, whisk together tahini, lemon juice, olive oil, minced garlic, salt, and 1-2 tbsp warm water until smooth and creamy.",
      "In a large salad bowl, combine cooked quinoa, roasted chickpeas, cherry tomatoes, and diced cucumber.",
      "Drizzle the lemon tahini dressing over the salad and gently toss to combine.",
      "Fold in fresh Fit Plate Radish Microgreens and sprinkle crumbled feta over top just before serving for maximum crunch and peppery zest."
    ],
    health_benefits: [
      "Radish microgreens pack a peppery kick from natural glucosinolates, which stimulate digestive enzymes and support gut metabolism.",
      "Quinoa and chickpeas deliver complete plant-based protein and slow-digesting complex carbohydrates.",
      "High in Vitamin C, potassium, and magnesium for immune system resilience."
    ],
    microgreens_used: ["Radish Microgreens", "Sunflower Microgreens"]
  }
];
