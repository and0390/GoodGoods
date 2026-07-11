export const categories = [
  // =========================
  // ROOT CATEGORIES
  // =========================
  {
    id: "cat-fashion",
    name: "Fashion",
    slug: "fashion",
    parentId: null,
    sortOrder: 1,
  },
  {
    id: "cat-electronics",
    name: "Electronics",
    slug: "electronics",
    parentId: null,
    sortOrder: 2,
  },
  {
    id: "cat-food-beverage",
    name: "Food & Beverage",
    slug: "food-beverage",
    parentId: null,
    sortOrder: 3,
  },
  {
    id: "cat-mobile",
    name: "Mobile Phones & Accessories",
    slug: "mobile-phones-accessories",
    parentId: null,
    sortOrder: 4,
  },
  {
    id: "cat-beauty",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    parentId: null,
    sortOrder: 5,
  },

  // =====================================================
  // FASHION
  // =====================================================

  {
    id: "cat-fashion-men",
    parentId: "cat-fashion",
    name: "Men",
    slug: "fashion-men",
    sortOrder: 1,
  },
  {
    id: "cat-fashion-women",
    parentId: "cat-fashion",
    name: "Women",
    slug: "fashion-women",
    sortOrder: 2,
  },
  {
    id: "cat-fashion-accessories",
    parentId: "cat-fashion",
    name: "Accessories",
    slug: "fashion-accessories",
    sortOrder: 3,
  },

  {
    id: "cat-fashion-men-tshirts",
    parentId: "cat-fashion-men",
    name: "T-Shirts",
    slug: "fashion-men-tshirts",
    sortOrder: 1,
  },
  {
    id: "cat-fashion-men-shirts",
    parentId: "cat-fashion-men",
    name: "Shirts",
    slug: "fashion-men-shirts",
    sortOrder: 2,
  },
  {
    id: "cat-fashion-men-pants",
    parentId: "cat-fashion-men",
    name: "Pants",
    slug: "fashion-men-pants",
    sortOrder: 3,
  },

  {
    id: "cat-fashion-women-dresses",
    parentId: "cat-fashion-women",
    name: "Dresses",
    slug: "fashion-women-dresses",
    sortOrder: 1,
  },
  {
    id: "cat-fashion-women-blouses",
    parentId: "cat-fashion-women",
    name: "Blouses",
    slug: "fashion-women-blouses",
    sortOrder: 2,
  },
  {
    id: "cat-fashion-women-skirts",
    parentId: "cat-fashion-women",
    name: "Skirts",
    slug: "fashion-women-skirts",
    sortOrder: 3,
  },

  {
    id: "cat-fashion-acc-belts",
    parentId: "cat-fashion-accessories",
    name: "Belts",
    slug: "fashion-accessories-belts",
    sortOrder: 1,
  },
  {
    id: "cat-fashion-acc-caps",
    parentId: "cat-fashion-accessories",
    name: "Caps",
    slug: "fashion-accessories-caps",
    sortOrder: 2,
  },
  {
    id: "cat-fashion-acc-wallets",
    parentId: "cat-fashion-accessories",
    name: "Wallets",
    slug: "fashion-accessories-wallets",
    sortOrder: 3,
  },

  // =====================================================
  // ELECTRONICS
  // =====================================================

  {
    id: "cat-electronics-computer",
    parentId: "cat-electronics",
    name: "Computer",
    slug: "electronics-computer",
    sortOrder: 1,
  },
  {
    id: "cat-electronics-audio",
    parentId: "cat-electronics",
    name: "Audio",
    slug: "electronics-audio",
    sortOrder: 2,
  },
  {
    id: "cat-electronics-power",
    parentId: "cat-electronics",
    name: "Power",
    slug: "electronics-power",
    sortOrder: 3,
  },

  {
    id: "cat-electronics-keyboards",
    parentId: "cat-electronics-computer",
    name: "Keyboards",
    slug: "electronics-computer-keyboards",
    sortOrder: 1,
  },
  {
    id: "cat-electronics-mice",
    parentId: "cat-electronics-computer",
    name: "Mice",
    slug: "electronics-computer-mice",
    sortOrder: 2,
  },
  {
    id: "cat-electronics-monitors",
    parentId: "cat-electronics-computer",
    name: "Monitors",
    slug: "electronics-computer-monitors",
    sortOrder: 3,
  },

  {
    id: "cat-electronics-speakers",
    parentId: "cat-electronics-audio",
    name: "Bluetooth Speakers",
    slug: "electronics-audio-speakers",
    sortOrder: 1,
  },
  {
    id: "cat-electronics-headphones",
    parentId: "cat-electronics-audio",
    name: "Headphones",
    slug: "electronics-audio-headphones",
    sortOrder: 2,
  },
  {
    id: "cat-electronics-earbuds",
    parentId: "cat-electronics-audio",
    name: "Earbuds",
    slug: "electronics-audio-earbuds",
    sortOrder: 3,
  },

  {
    id: "cat-electronics-chargers",
    parentId: "cat-electronics-power",
    name: "Chargers",
    slug: "electronics-power-chargers",
    sortOrder: 1,
  },
  {
    id: "cat-electronics-powerbanks",
    parentId: "cat-electronics-power",
    name: "Power Banks",
    slug: "electronics-powerbanks",
    sortOrder: 2,
  },
  {
    id: "cat-electronics-cables",
    parentId: "cat-electronics-power",
    name: "Cables",
    slug: "electronics-power-cables",
    sortOrder: 3,
  },

  // =====================================================
  // FOOD & BEVERAGE
  // =====================================================

  {
    id: "cat-food-drinks",
    parentId: "cat-food-beverage",
    name: "Beverages",
    slug: "food-beverages",
    sortOrder: 1,
  },
  {
    id: "cat-food-snacks",
    parentId: "cat-food-beverage",
    name: "Snacks",
    slug: "food-snacks",
    sortOrder: 2,
  },
  {
    id: "cat-food-grocery",
    parentId: "cat-food-beverage",
    name: "Groceries",
    slug: "food-groceries",
    sortOrder: 3,
  },

  {
    id: "cat-food-coffee",
    parentId: "cat-food-drinks",
    name: "Coffee",
    slug: "food-beverages-coffee",
    sortOrder: 1,
  },
  {
    id: "cat-food-tea",
    parentId: "cat-food-drinks",
    name: "Tea",
    slug: "food-beverages-tea",
    sortOrder: 2,
  },
  {
    id: "cat-food-water",
    parentId: "cat-food-drinks",
    name: "Mineral Water",
    slug: "food-beverages-water",
    sortOrder: 3,
  },

  {
    id: "cat-food-cookies",
    parentId: "cat-food-snacks",
    name: "Cookies",
    slug: "food-snacks-cookies",
    sortOrder: 1,
  },
  {
    id: "cat-food-chips",
    parentId: "cat-food-snacks",
    name: "Chips",
    slug: "food-snacks-chips",
    sortOrder: 2,
  },
  {
    id: "cat-food-chocolate",
    parentId: "cat-food-snacks",
    name: "Chocolate",
    slug: "food-snacks-chocolate",
    sortOrder: 3,
  },

  {
    id: "cat-food-rice",
    parentId: "cat-food-grocery",
    name: "Rice",
    slug: "food-groceries-rice",
    sortOrder: 1,
  },
  {
    id: "cat-food-sugar",
    parentId: "cat-food-grocery",
    name: "Sugar",
    slug: "food-groceries-sugar",
    sortOrder: 2,
  },
  {
    id: "cat-food-oil",
    parentId: "cat-food-grocery",
    name: "Cooking Oil",
    slug: "food-groceries-cooking-oil",
    sortOrder: 3,
  },

  // =====================================================
  // MOBILE
  // =====================================================

  {
    id: "cat-mobile-smartphones",
    parentId: "cat-mobile",
    name: "Smartphones",
    slug: "mobile-smartphones",
    sortOrder: 1,
  },
  {
    id: "cat-mobile-cases",
    parentId: "cat-mobile",
    name: "Cases",
    slug: "mobile-cases",
    sortOrder: 2,
  },
  {
    id: "cat-mobile-chargers",
    parentId: "cat-mobile",
    name: "Chargers",
    slug: "mobile-chargers",
    sortOrder: 3,
  },

  {
    id: "cat-mobile-android",
    parentId: "cat-mobile-smartphones",
    name: "Android",
    slug: "mobile-smartphones-android",
    sortOrder: 1,
  },
  {
    id: "cat-mobile-iphone",
    parentId: "cat-mobile-smartphones",
    name: "iPhone",
    slug: "mobile-smartphones-iphone",
    sortOrder: 2,
  },
  {
    id: "cat-mobile-featurephone",
    parentId: "cat-mobile-smartphones",
    name: "Feature Phones",
    slug: "mobile-smartphones-feature-phone",
    sortOrder: 3,
  },

  {
    id: "cat-mobile-silicone-case",
    parentId: "cat-mobile-cases",
    name: "Silicone Cases",
    slug: "mobile-cases-silicone",
    sortOrder: 1,
  },
  {
    id: "cat-mobile-rugged-case",
    parentId: "cat-mobile-cases",
    name: "Rugged Cases",
    slug: "mobile-cases-rugged",
    sortOrder: 2,
  },
  {
    id: "cat-mobile-leather-case",
    parentId: "cat-mobile-cases",
    name: "Leather Cases",
    slug: "mobile-cases-leather",
    sortOrder: 3,
  },

  {
    id: "cat-mobile-wall-charger",
    parentId: "cat-mobile-chargers",
    name: "Wall Chargers",
    slug: "mobile-chargers-wall",
    sortOrder: 1,
  },
  {
    id: "cat-mobile-wireless-charger",
    parentId: "cat-mobile-chargers",
    name: "Wireless Chargers",
    slug: "mobile-chargers-wireless",
    sortOrder: 2,
  },
  {
    id: "cat-mobile-car-charger",
    parentId: "cat-mobile-chargers",
    name: "Car Chargers",
    slug: "mobile-chargers-car",
    sortOrder: 3,
  },

  // =====================================================
  // BEAUTY
  // =====================================================

  {
    id: "cat-beauty-skincare",
    parentId: "cat-beauty",
    name: "Skincare",
    slug: "beauty-skincare",
    sortOrder: 1,
  },
  {
    id: "cat-beauty-makeup",
    parentId: "cat-beauty",
    name: "Makeup",
    slug: "beauty-makeup",
    sortOrder: 2,
  },
  {
    id: "cat-beauty-haircare",
    parentId: "cat-beauty",
    name: "Hair Care",
    slug: "beauty-hair-care",
    sortOrder: 3,
  },

  {
    id: "cat-beauty-cleanser",
    parentId: "cat-beauty-skincare",
    name: "Cleanser",
    slug: "beauty-skincare-cleanser",
    sortOrder: 1,
  },
  {
    id: "cat-beauty-serum",
    parentId: "cat-beauty-skincare",
    name: "Serum",
    slug: "beauty-skincare-serum",
    sortOrder: 2,
  },
  {
    id: "cat-beauty-moisturizer",
    parentId: "cat-beauty-skincare",
    name: "Moisturizer",
    slug: "beauty-skincare-moisturizer",
    sortOrder: 3,
  },

  {
    id: "cat-beauty-foundation",
    parentId: "cat-beauty-makeup",
    name: "Foundation",
    slug: "beauty-makeup-foundation",
    sortOrder: 1,
  },
  {
    id: "cat-beauty-lipstick",
    parentId: "cat-beauty-makeup",
    name: "Lipstick",
    slug: "beauty-makeup-lipstick",
    sortOrder: 2,
  },
  {
    id: "cat-beauty-mascara",
    parentId: "cat-beauty-makeup",
    name: "Mascara",
    slug: "beauty-makeup-mascara",
    sortOrder: 3,
  },

  {
    id: "cat-beauty-shampoo",
    parentId: "cat-beauty-haircare",
    name: "Shampoo",
    slug: "beauty-haircare-shampoo",
    sortOrder: 1,
  },
  {
    id: "cat-beauty-conditioner",
    parentId: "cat-beauty-haircare",
    name: "Conditioner",
    slug: "beauty-haircare-conditioner",
    sortOrder: 2,
  },
  {
    id: "cat-beauty-hairmask",
    parentId: "cat-beauty-haircare",
    name: "Hair Mask",
    slug: "beauty-haircare-hair-mask",
    sortOrder: 3,
  },
];
