export interface BlogData {
  id: string;
  slug: string;
  title: string;
  image_url: string;
  category: string;
  read_time: string;
  published_date: string;
  excerpt: string;
  content: string;
  sort_order?: number;
}

export const defaultBlogs: BlogData[] = [
  {
    id: "history-of-microgreens",
    slug: "history-of-microgreens",
    title: "From Chef's Garnish to Kitchen Staple: A Short History of Microgreens",
    category: "Origins",
    read_time: "4 min read",
    published_date: "2026-07-10",
    image_url: "https://images.unsplash.com/photo-1640671510956-8c8e1deb0dd9?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Microgreens originated in Southern California during the 1980s, where chefs first used them as premium garnishes prized for intense flavor, vibrant color, and delicate texture. Over four decades, they evolved from fine dining flourishes into everyday nutritional powerhouses loved by home cooks and health enthusiasts worldwide.",
    content: `Microgreens originated in Southern California during the 1980s, where pioneering chefs first used them as premium garnishes — prized for their intense flavour, vibrant color, and delicate texture. Through the 1990s, their popularity expanded rapidly across high-end fine dining establishments as culinary teams leaned into bold, fresh presentations.

What began as a plating flourish soon revealed something far more significant. As global consumer interest in nutrition, farm-to-table dining, and sustainable urban agriculture grew through the 2000s, microgreens moved out of exclusive restaurant kitchens and into home kitchens, supermarkets, and local indoor farms.

Their short growing cycle — typically 7 to 21 days from seed to harvest — made them commercially attractive to small-scale urban farmers, while their concentrated nutrients and punchy flavors kept them deeply popular with health-conscious consumers.

Today, microgreens sit at the exact intersection of culinary craft and everyday health — as much at home in a hotel breakfast buffet as in a morning green smoothie. At Fit Plate, we grow ours locally in Mangalore, bringing that same chef-driven attention to freshness and purity into every single tray we deliver.`
  },
  {
    id: "science-behind-microgreen-density",
    slug: "science-behind-microgreen-density",
    title: "Why 40x the Nutrients? The Science Behind Microgreen Density",
    category: "Nutrition",
    read_time: "5 min read",
    published_date: "2026-07-05",
    image_url: "https://images.unsplash.com/photo-1593629718347-283811841101?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Microgreens are harvested just days after germination when young plants are at their peak metabolic activity. Landmark studies from the USDA show that these tiny seedlings contain up to 40 times higher concentrations of vital vitamins, minerals, and antioxidants compared to their mature plant counterparts.",
    content: `Microgreens are harvested just days after seed germination — usually right as the cotyledons (seed leaves) and first true leaves emerge. At this precise early growth stage, plants are at peak metabolic activity, packing an incredible density of vitamins, minerals, and protective plant compounds into a tiny tender shoot.

Peer-reviewed studies by the United States Department of Agriculture (USDA) and the Journal of Agricultural and Food Chemistry have confirmed that microgreens often contain 4 to 40 times higher nutrient concentrations than their fully grown adult counterparts.

Many varieties are exceptionally rich in vitamins A, C, E, and K, bioavailable iron, potassium, calcium, magnesium, and essential folate. Beyond vitamins, they contain complex phytonutrients — such as sulforaphane in broccoli shoots, betalains in beetroot microgreens, and polyphenols in purple kale.

This concentrated profile is why nutritionists and chefs call microgreens a culinary bio-hack: just a small handful added to your daily meals delivers a substantial nutrient boost without adding bulk or altering the character of your favorite dishes.`
  },
  {
    id: "10-ways-hotels-and-restaurants-use-microgreens",
    slug: "10-ways-hotels-and-restaurants-use-microgreens",
    title: "10 Ways Hotels & Restaurants Are Using Microgreens on the Menu",
    category: "For Business",
    read_time: "6 min read",
    published_date: "2026-06-28",
    image_url: "https://images.unsplash.com/photo-1647613233056-fc9918256a8d?auto=format&fit=crop&w=900&q=80",
    excerpt:
      "Modern commercial kitchens are shifting microgreens from secondary garnishes to primary culinary components. From signature salad bases and cold-pressed juice blends to artisanal pizza toppings and gourmet cocktail infusions, discover how top hospitality brands leverage microgreens.",
    content: `Modern commercial kitchens, boutique hotels, and catering teams across Mangalore and beyond are shifting microgreens from simple secondary garnishes to central culinary ingredients.

Here are 10 key ways top culinary professionals incorporate microgreens into their daily menus:

1. **Signature Salad Bases**: Combining crunchy sunflower and sweet pea shoots for nutrient-dense salad bowls.
2. **Cold-Pressed Juices & Smoothies**: Blending purple kale and broccoli shoots into morning wellness shots.
3. **Artisanal Pizza & Pasta Toppings**: Finishing hot pizzas and pastastopped with aromatic basil microgreens.
4. **Gourmet Sandwich & Wrap Fillings**: Replacing watery lettuce with peppery radish microgreens for extra crunch.
5. **Seafood & Grilled Meat Finishing**: Adding crisp beetroot shoots to balance rich umami flavors.
6. **Soup & Stew Presentation**: Scattering fresh turnip greens over hot purees right before serving.
7. **Craft Cocktails & Mocktails**: Infusing herbal microgreens into botanical drinks and gin cocktails.
8. **Egg & Breakfast Stations**: Elevating classic omelettes and avocado toasts at hotel breakfast buffets.
9. **Curry & Dal Garnishing**: Using fenugreek (methi) microgreens for authentic warm Indian flavor.
10. **Platter & Buffet Styling**: Keeping live trays at action stations for instant, farm-fresh visual appeal.

Partnering with a local grower like Fit Plate ensures commercial kitchens get hyper-fresh, zero-waste microgreens delivered right when needed.`
  }
];
