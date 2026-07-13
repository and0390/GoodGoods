export interface AttributeTemplateSeed {
  id: string;
  categoryId: string;
  name: string;
  pool: string[];
}

export const attributeTemplates: AttributeTemplateSeed[] = [
  // =====================================================
  // FASHION (MEN, WOMEN, ACCESSORIES)
  // =====================================================
  {
    id: "attr-m-tshirt-brand",
    categoryId: "cat-fashion-men-tshirts",
    name: "Brand",
    pool: ["Erigo", "Roughneck", "Uniqlo", "H&M"],
  },
  {
    id: "attr-m-tshirt-material",
    categoryId: "cat-fashion-men-tshirts",
    name: "Material",
    pool: ["30s Combed Cotton", "Premium Heavyweight Cotton", "Spandex Blend"],
  },
  {
    id: "attr-m-tshirt-fit",
    categoryId: "cat-fashion-men-tshirts",
    name: "Fit",
    pool: ["Oversized", "Regular Fit", "Slim Fit"],
  },
  {
    id: "attr-m-shirt-brand",
    categoryId: "cat-fashion-men-shirts",
    name: "Brand",
    pool: ["The Executive", "Alisan", "Zara", "Brooks Brothers"],
  },
  {
    id: "attr-m-shirt-material",
    categoryId: "cat-fashion-men-shirts",
    name: "Material",
    pool: ["Rayon Cotton", "Premium Flannel", "Linen", "Poplin"],
  },
  {
    id: "attr-m-shirt-sleeves",
    categoryId: "cat-fashion-men-shirts",
    name: "Sleeve Style",
    pool: ["Long Sleeve", "Short Sleeve"],
  },
  {
    id: "attr-m-pants-brand",
    categoryId: "cat-fashion-men-pants",
    name: "Brand",
    pool: ["Levi's", "Dockers", "Dickies", "Uniqlo"],
  },
  {
    id: "attr-m-pants-material",
    categoryId: "cat-fashion-men-pants",
    name: "Material",
    pool: ["Selvedge Denim", "Chino Twill", "Corduroy", "Polyester Blend"],
  },
  {
    id: "attr-m-pants-fit",
    categoryId: "cat-fashion-men-pants",
    name: "Fit Type",
    pool: ["Ankle Pants", "Straight Fit", "Skinny Fit", "Loose Fit"],
  },
  {
    id: "attr-w-dress-brand",
    categoryId: "cat-fashion-women-dresses",
    name: "Brand",
    pool: ["Love Bonito", "Cotton Ink", "ZARA", "Mango"],
  },
  {
    id: "attr-w-dress-material",
    categoryId: "cat-fashion-women-dresses",
    name: "Material",
    pool: ["Chiffon", "Pure Silk", "Premium Lace", "Japanese Cotton"],
  },
  {
    id: "attr-w-dress-length",
    categoryId: "cat-fashion-women-dresses",
    name: "Dress Length",
    pool: ["Maxi / Long", "Midi / Medium", "Mini / Short"],
  },
  {
    id: "attr-w-blouse-brand",
    categoryId: "cat-fashion-women-blouses",
    name: "Brand",
    pool: ["ShopAtVelvet", "H&M", "Berrybenka", "ASOS"],
  },
  {
    id: "attr-w-blouse-material",
    categoryId: "cat-fashion-women-blouses",
    name: "Material",
    pool: ["Premium Rayon", "Satin Silk", "Lightweight Voile"],
  },
  {
    id: "attr-w-blouse-neckline",
    categoryId: "cat-fashion-women-blouses",
    name: "Neckline",
    pool: ["V-Neck", "Shirt Collar", "Sabrina / Off-Shoulder"],
  },
  {
    id: "attr-w-skirt-brand",
    categoryId: "cat-fashion-women-skirts",
    name: "Brand",
    pool: ["Uniqlo Women", "Pull&Bear", "Zara", "Stradivarius"],
  },
  {
    id: "attr-w-skirt-style",
    categoryId: "cat-fashion-women-skirts",
    name: "Skirt Style",
    pool: ["Pleated Skirt", "A-Line Skirt", "Pencil Skirt"],
  },
  {
    id: "attr-w-skirt-material",
    categoryId: "cat-fashion-women-skirts",
    name: "Material",
    pool: ["Premium Knit", "Jeans / Denim", "Tulle"],
  },
  {
    id: "attr-acc-belt-brand",
    categoryId: "cat-fashion-acc-belts",
    name: "Brand",
    pool: ["LeatherCo", "Gucci Premium", "Bally", "Levis Acc"],
  },
  {
    id: "attr-acc-belt-material",
    categoryId: "cat-fashion-acc-belts",
    name: "Material",
    pool: [
      "Genuine Cowhide Leather",
      "PU Synthetic Leather",
      "Tactical Canvas",
    ],
  },
  {
    id: "attr-acc-belt-buckle",
    categoryId: "cat-fashion-acc-belts",
    name: "Buckle Type",
    pool: ["Pin Buckle", "Automatic Rail", "D-Ring Design"],
  },
  {
    id: "attr-acc-cap-brand",
    categoryId: "cat-fashion-acc-caps",
    name: "Brand",
    pool: ["New Era", "Adidas Originals", "Nike SB", "Eiger"],
  },
  {
    id: "attr-acc-cap-style",
    categoryId: "cat-fashion-acc-caps",
    name: "Cap Style",
    pool: ["Baseball Cap", "Snapback", "Bucket Hat", "Beanie / Knit Cap"],
  },
  {
    id: "attr-acc-cap-material",
    categoryId: "cat-fashion-acc-caps",
    name: "Material",
    pool: ["Heavy Ripstop", "Cotton Twill", "Denim"],
  },
  {
    id: "attr-acc-wallet-brand",
    categoryId: "cat-fashion-acc-wallets",
    name: "Brand",
    pool: ["Wallts", "Jims Honey", "Fossil", "Braun Buffel"],
  },
  {
    id: "attr-acc-wallet-material",
    categoryId: "cat-fashion-acc-wallets",
    name: "Material",
    pool: ["Genuine Leather", "Vegan Suede Leather", "Waterproof Canvas"],
  },
  {
    id: "attr-acc-wallet-type",
    categoryId: "cat-fashion-acc-wallets",
    name: "Wallet Type",
    pool: ["Bifold Wallet", "Card Holder", "Zipper Long Wallet"],
  },

  // =====================================================
  // ELECTRONICS (COMPUTER, AUDIO, POWER)
  // =====================================================
  {
    id: "attr-elec-kb-brand",
    categoryId: "cat-electronics-keyboards",
    name: "Brand",
    pool: ["Keychron", "Logitech G", "Razer", "VortexSeries", "Rexus"],
  },
  {
    id: "attr-elec-kb-conn",
    categoryId: "cat-electronics-keyboards",
    name: "Connectivity",
    pool: ["Wireless 2.4Ghz + Bluetooth 5.1", "Wired Detachable Type-C Cable"],
  },
  {
    id: "attr-elec-kb-switch",
    categoryId: "cat-electronics-keyboards",
    name: "Switch Type",
    pool: [
      "Linear Red Switch (Silent)",
      "Tactile Brown Switch",
      "Clicky Blue Switch",
    ],
  },
  {
    id: "attr-elec-mouse-brand",
    categoryId: "cat-electronics-mice",
    name: "Brand",
    pool: ["Logitech G", "Razer", "SteelSeries", "Fantech", "Digital Alliance"],
  },
  {
    id: "attr-elec-mouse-dpi",
    categoryId: "cat-electronics-mice",
    name: "Sensor / DPI",
    pool: ["HERO Sensor 25K DPI", "Optical 10K DPI", "Pixart 3395"],
  },
  {
    id: "attr-elec-mouse-conn",
    categoryId: "cat-electronics-mice",
    name: "Connection Type",
    pool: [
      "Wireless Rechargeable",
      "Wired Braided Cable",
      "AA / AAA Battery Powered",
    ],
  },
  {
    id: "attr-elec-monitor-brand",
    categoryId: "cat-electronics-monitors",
    name: "Brand",
    pool: ["ASUS ROG", "LG Electronics", "Samsung Odyssey", "Xiaomi Gaming"],
  },
  {
    id: "attr-elec-monitor-size",
    categoryId: "cat-electronics-monitors",
    name: "Screen Size",
    pool: ["24 Inch", "27 Inch UltraWide", "32 Inch Curved"],
  },
  {
    id: "attr-elec-monitor-refresh",
    categoryId: "cat-electronics-monitors",
    name: "Refresh Rate",
    pool: ["75Hz Office", "144Hz Gaming", "165Hz Pro Gaming", "240Hz E-Sports"],
  },
  {
    id: "attr-elec-speaker-brand",
    categoryId: "cat-electronics-speakers",
    name: "Brand",
    pool: ["JBL Go", "Eggel Aura", "Sony Audio", "Marshall", "Anker Soundcore"],
  },
  {
    id: "attr-elec-speaker-battery",
    categoryId: "cat-electronics-speakers",
    name: "Battery Capacity",
    pool: [
      "1200mAh (5 Hours Playtime)",
      "2500mAh (12 Hours Playtime)",
      "5000mAh High Capacity",
    ],
  },
  {
    id: "attr-elec-speaker-ip",
    categoryId: "cat-electronics-speakers",
    name: "Protection Rating",
    pool: ["IPX7 Waterproof", "IPX5 Splashproof", "Dustproof Only"],
  },
  {
    id: "attr-elec-hp-brand",
    categoryId: "cat-electronics-headphones",
    name: "Brand",
    pool: ["Sony WH", "Audio Technica M50x", "Sennheiser", "Razer Kraken"],
  },
  {
    id: "attr-elec-hp-sound",
    categoryId: "cat-electronics-headphones",
    name: "Sound Profile Type",
    pool: [
      "Active Noise Cancelling (ANC)",
      "Studio Monitor Flat Sound",
      "Stereo Bass-Boosted",
    ],
  },
  {
    id: "attr-elec-hp-material",
    categoryId: "cat-electronics-headphones",
    name: "Earpad Material",
    pool: ["Memory Foam Leather", "Breathable Fabric Cloth", "Soft Velour"],
  },
  {
    id: "attr-elec-earbuds-brand",
    categoryId: "cat-electronics-earbuds",
    name: "Brand",
    pool: [
      "Apple AirPods",
      "Samsung Galaxy Buds",
      "Baseus Bowie",
      "Moondrop Space",
    ],
  },
  {
    id: "attr-elec-earbuds-bt",
    categoryId: "cat-electronics-earbuds",
    name: "Bluetooth Version",
    pool: ["Bluetooth 5.3", "Bluetooth 5.4 Ultra Low Latency"],
  },
  {
    id: "attr-elec-earbuds-features",
    categoryId: "cat-electronics-earbuds",
    name: "Additional Features",
    pool: ["TWS Dual Mic ENC", "Gaming Mode 40ms", "Wireless Charging Case"],
  },
  {
    id: "attr-elec-charger-brand",
    categoryId: "cat-electronics-chargers",
    name: "Brand",
    pool: ["Anker GaN Prime", "Baseus GaN5", "Ugreen Nexode", "Aukan"],
  },
  {
    id: "attr-elec-charger-output",
    categoryId: "cat-electronics-chargers",
    name: "Max Power Output",
    pool: [
      "20W Fast Charging",
      "30W Power Delivery",
      "65W Triple Port GaN",
      "100W Laptop Support",
    ],
  },
  {
    id: "attr-elec-charger-ports",
    categoryId: "cat-electronics-chargers",
    name: "Port Count",
    pool: ["1x USB-C", "2x USB-C + 1x USB-A", "4-Port Multi-Output"],
  },
  {
    id: "attr-elec-pb-brand",
    categoryId: "cat-electronics-powerbanks",
    name: "Brand",
    pool: [
      "Anker Core",
      "Baseus Magnetic",
      "Ugreen Power Delivery",
      "Xiaomi Power",
    ],
  },
  {
    id: "attr-elec-pb-capacity",
    categoryId: "cat-electronics-powerbanks",
    name: "Power Capacity",
    pool: [
      "10,000 mAh Slim",
      "20,000 mAh Heavy Duty",
      "30,000 mAh High Capacity",
    ],
  },
  {
    id: "attr-elec-pb-safety",
    categoryId: "cat-electronics-powerbanks",
    name: "Safety Features",
    pool: [
      "Magsafe Wireless 15W",
      "Flight Safe Approved",
      "Multi-Protect Short Circuit Protection",
    ],
  },
  {
    id: "attr-elec-cable-brand",
    categoryId: "cat-electronics-cables",
    name: "Brand",
    pool: ["Ugreen Braided", "Baseus Tungsten", "Anker PowerLine"],
  },
  {
    id: "attr-elec-cable-type",
    categoryId: "cat-electronics-cables",
    name: "Connector Type",
    pool: ["USB-C to USB-C", "USB-A to USB-C", "USB-C to Lightning MFI"],
  },
  {
    id: "attr-elec-cable-length",
    categoryId: "cat-electronics-cables",
    name: "Cable Length",
    pool: ["0.5 Meter (Short)", "1.0 Meter (Standard)", "2.0 Meter (Long)"],
  },

  // =====================================================
  // FOOD & BEVERAGE (DRINKS, SNACKS, GROCERY)
  // =====================================================
  {
    id: "attr-food-coffee-brand",
    categoryId: "cat-food-coffee",
    name: "Brand",
    pool: ["BeanStreet", "Anomali Coffee", "Excelso", "Starbucks"],
  },
  {
    id: "attr-food-coffee-type",
    categoryId: "cat-food-coffee",
    name: "Bean Type",
    pool: [
      "100% Arabica Specialty",
      "Robusta Premium Blend",
      "House Blend (Arabica + Robusta)",
    ],
  },
  {
    id: "attr-food-coffee-roast",
    categoryId: "cat-food-coffee",
    name: "Roast Level",
    pool: [
      "Light Roast (High Acidity)",
      "Medium Roast (Balanced)",
      "Dark Roast (Bold & Intense)",
    ],
  },
  {
    id: "attr-food-tea-brand",
    categoryId: "cat-food-tea",
    name: "Brand",
    pool: ["JasmineMeadow", "PureBrew Premium", "Dilmah Premium", "Twinings"],
  },
  {
    id: "attr-food-tea-flavor",
    categoryId: "cat-food-tea",
    name: "Flavor Variant",
    pool: [
      "Jasmine Green Tea",
      "Matcha Green Tea",
      "Earl Grey Citrus",
      "Chamomile Herbal Infusion",
    ],
  },
  {
    id: "attr-food-tea-pack",
    categoryId: "cat-food-tea",
    name: "Packaging",
    pool: ["Tea Bags (Individual)", "Loose Leaf Pack"],
  },
  {
    id: "attr-food-water-brand",
    categoryId: "cat-food-water",
    name: "Brand",
    pool: ["Aqua", "Le Minerale", "Evian Premium", "Nestle PureLife"],
  },
  {
    id: "attr-food-water-volume",
    categoryId: "cat-food-water",
    name: "Volume",
    pool: ["330ml Mini", "600ml Standard", "1500ml Jumbo"],
  },
  {
    id: "attr-food-water-type",
    categoryId: "cat-food-water",
    name: "Water Type",
    pool: ["Natural Mineral Water", "Purified Water", "High pH Alkaline Water"],
  },
  {
    id: "attr-food-cookie-brand",
    categoryId: "cat-food-cookies",
    name: "Brand",
    pool: [
      "Good Time",
      "Oreo Double Stuf",
      "Monde Butter Cookies",
      "Lotus Biscoff",
    ],
  },
  {
    id: "attr-food-cookie-flavor",
    categoryId: "cat-food-cookies",
    name: "Main Flavor",
    pool: [
      "Premium Choco Chips",
      "Classic Butter Sugar",
      "Spiced Caramel Speculoos",
    ],
  },
  {
    id: "attr-food-cookie-shelf",
    categoryId: "cat-food-cookies",
    name: "Shelf Life",
    pool: ["6 Months", "12 Months"],
  },
  {
    id: "attr-food-chip-brand",
    categoryId: "cat-food-chips",
    name: "Brand",
    pool: ["Crunchos", "Lay's", "Pringles", "CassavaKing"],
  },
  {
    id: "attr-food-chip-ingr",
    categoryId: "cat-food-chips",
    name: "Main Ingredient",
    pool: ["Selected Potatoes", "Natural Cassava Roots", "Corn Tortilla"],
  },
  {
    id: "attr-food-chip-flavor",
    categoryId: "cat-food-chips",
    name: "Flavor",
    pool: [
      "Roasted Beef / BBQ",
      "Sour Cream & Onion",
      "Honey Butter Cheese",
      "Spicy Chili Balado",
    ],
  },
  {
    id: "attr-food-choc-brand",
    categoryId: "cat-food-chocolate",
    name: "Brand",
    pool: [
      "ChocoRoyal",
      "Cadbury Dairy Milk",
      "Toblerone Honey",
      "KitKat Wafer",
    ],
  },
  {
    id: "attr-food-choc-cocoa",
    categoryId: "cat-food-chocolate",
    name: "Cocoa Content",
    pool: [
      "Milk Chocolate (Sweet)",
      "70% Dark Chocolate (Bold)",
      "Sweet White Chocolate",
    ],
  },
  {
    id: "attr-food-choc-mix",
    categoryId: "cat-food-chocolate",
    name: "Additional Mix-ins",
    pool: [
      "Cashew Nuts",
      "Roasted Almonds",
      "Sweet Raisins",
      "Plain / Original",
    ],
  },
  {
    id: "attr-food-rice-brand",
    categoryId: "cat-food-rice",
    name: "Brand",
    pool: ["GrainMaster", "RoyalJasmine", "Anak Raja", "Pandan Queen"],
  },
  {
    id: "attr-food-rice-variety",
    categoryId: "cat-food-rice",
    name: "Rice Variety",
    pool: [
      "Premium Jasmine Rice",
      "Long Grain White Rice",
      "Organic Brown Rice",
      "Basmati Long Grain",
    ],
  },
  {
    id: "attr-food-rice-weight",
    categoryId: "cat-food-rice",
    name: "Net Weight",
    pool: ["1 Kg Trial Pack", "5 Kg Standard Bag", "10 Kg Family Size"],
  },
  {
    id: "attr-food-sugar-brand",
    categoryId: "cat-food-sugar",
    name: "Brand",
    pool: ["SugarSweet", "Rose Brand", "PureCane"],
  },
  {
    id: "attr-food-sugar-type",
    categoryId: "cat-food-sugar",
    name: "Sugar Type",
    pool: [
      "White Refined Granulated",
      "Natural Cane Sugar (Brown)",
      "Powdered / Confectioners Sugar",
    ],
  },
  {
    id: "attr-food-oil-brand",
    categoryId: "cat-food-oil",
    name: "Brand",
    pool: ["GoldenFry", "Filma Premium", "PurePalm", "SunCo"],
  },
  {
    id: "attr-food-oil-ingr",
    categoryId: "cat-food-oil",
    name: "Base Ingredient",
    pool: ["Refined Palm Oil", "Virgin Coconut Oil", "Pure Corn Oil"],
  },
  {
    id: "attr-food-oil-pack",
    categoryId: "cat-food-oil",
    name: "Packaging",
    pool: ["1 Liter Refill Pouch", "2 Liter Refill Pouch", "5 Liter Jerrican"],
  },

  // =====================================================
  // MOBILE PHONES & ACCESSORIES
  // =====================================================
  {
    id: "attr-mob-android-brand",
    categoryId: "cat-mobile-android",
    name: "Brand",
    pool: [
      "Samsung Galaxy",
      "Xiaomi POCO",
      "Oppo Reno",
      "Vivo V-Series",
      "Infinix Pro",
    ],
  },
  {
    id: "attr-mob-android-ram",
    categoryId: "cat-mobile-android",
    name: "RAM Capacity",
    pool: ["6GB LPDDR4X", "8GB LPDDR5", "12GB Dual Channel", "16GB Ultra RAM"],
  },
  {
    id: "attr-mob-android-rom",
    categoryId: "cat-mobile-android",
    name: "Internal Storage",
    pool: ["128GB UFS 3.1", "256GB UFS 4.0", "512GB Ultra Storage"],
  },
  {
    id: "attr-mob-iphone-brand",
    categoryId: "cat-mobile-iphone",
    name: "Brand",
    pool: ["Apple iPhone Official"],
  },
  {
    id: "attr-mob-iphone-series",
    categoryId: "cat-mobile-iphone",
    name: "Model Series",
    pool: [
      "iPhone Base Model",
      "iPhone Plus Large Screen",
      "iPhone Pro Edition",
      "iPhone Pro Max Flagship",
    ],
  },
  {
    id: "attr-mob-iphone-rom",
    categoryId: "cat-mobile-iphone",
    name: "Storage Capacity",
    pool: ["128GB", "256GB", "512GB", "1TB Extreme ROM"],
  },
  {
    id: "attr-mob-feature-brand",
    categoryId: "cat-mobile-featurephone",
    name: "Brand",
    pool: ["Nokia Classic", "Evercoss Keypad", "Advan Mobile"],
  },
  {
    id: "attr-mob-feature-net",
    categoryId: "cat-mobile-featurephone",
    name: "Network Connectivity",
    pool: ["2G GSM Voice Only", "4G LTE VoLTE Modern"],
  },
  {
    id: "attr-mob-feature-leg",
    categoryId: "cat-mobile-featurephone",
    name: "Classic Features",
    pool: [
      "Built-in Snake Game + Flashlight",
      "Dual SIM Standby",
      "7-Day Standby Battery",
    ],
  },
  {
    id: "attr-mob-silicone-brand",
    categoryId: "cat-mobile-cases",
    name: "Brand",
    pool: ["Spigen Liquid", "Ringke Onyx", "Caseology", "Baseus Thin"],
  },
  {
    id: "attr-mob-silicone-thick",
    categoryId: "cat-mobile-cases",
    name: "Thickness",
    pool: ["0.3mm Ultra Thin Slim", "1.5mm Shockproof Soft Silicone"],
  },
  {
    id: "attr-mob-silicone-finish",
    categoryId: "cat-mobile-cases",
    name: "Finish Texture",
    pool: ["Matte Anti-Fingerprint", "Glossy Crystal Clear"],
  },
  {
    id: "attr-mob-wall-brand",
    categoryId: "cat-mobile-chargers",
    name: "Brand",
    pool: ["Anker Atom", "Baseus Super Si", "Ugreen Nexode GaN"],
  },
  {
    id: "attr-mob-wall-proto",
    categoryId: "cat-mobile-chargers",
    name: "Protocol Support",
    pool: [
      "Samsung PPS Super Fast Charging",
      "Power Delivery 3.0 (iPhone)",
      "Quick Charge 4.0 Pro",
    ],
  },

  // =====================================================
  // BEAUTY & PERSONAL CARE
  // =====================================================
  {
    id: "attr-beau-clean-brand",
    categoryId: "cat-beauty-cleanser",
    name: "Brand",
    pool: [
      "Cetaphil Gentle",
      "Cosrx Low pH",
      "Senka Perfect Whip",
      "Wardah Hydro",
    ],
  },
  {
    id: "attr-beau-clean-form",
    categoryId: "cat-beauty-cleanser",
    name: "Formulation",
    pool: [
      "Lightweight Cleansing Gel",
      "Rich Foaming Whipped Cream",
      "Gentle Liquid Micellar Water",
    ],
  },
  {
    id: "attr-beau-clean-skin",
    categoryId: "cat-beauty-cleanser",
    name: "Target Skin Condition",
    pool: [
      "Acne Prone / Blemish Skin",
      "Dry Sensitive Skin",
      "Normal / Oily Combination",
    ],
  },
  {
    id: "attr-beau-serum-brand",
    categoryId: "cat-beauty-serum",
    name: "Brand",
    pool: [
      "Somethinc Glow",
      "Skintific Barrier",
      "Avoskin Alpha",
      "The Ordinary",
    ],
  },
  {
    id: "attr-beau-serum-ingr",
    categoryId: "cat-beauty-serum",
    name: "Main Ingredient",
    pool: [
      "Niacinamide 10% + Zinc",
      "1% Encapsulated Retinol",
      "Hyaluronic Acid 2%",
      "Salicylic Acid 2% (BHA)",
    ],
  },
  {
    id: "attr-beau-serum-ben",
    categoryId: "cat-beauty-serum",
    name: "Primary Benefit",
    pool: [
      "Dark Spot Whitening & Brightening",
      "Skin Barrier Repair",
      "Exfoliating & Pore Minimizing",
    ],
  },
  {
    id: "attr-beau-moist-brand",
    categoryId: "cat-beauty-moisturizer",
    name: "Brand",
    pool: [
      "Skintific 5x Ceramide",
      "The Originote Gel",
      "Somethinc Ceramic",
      "Bioaqua Balm",
    ],
  },
  {
    id: "attr-beau-moist-text",
    categoryId: "cat-beauty-moisturizer",
    name: "Texture",
    pool: [
      "Lightweight Water-Gel",
      "Rich Hydrating Cream",
      "Fluid Emulsion Lotion",
    ],
  },
  {
    id: "attr-beau-moist-vol",
    categoryId: "cat-beauty-moisturizer",
    name: "Volume",
    pool: ["30g Travel Size Tub", "50g Standard Pot", "80g Value Tube"],
  },
  {
    id: "attr-beau-found-brand",
    categoryId: "cat-beauty-foundation",
    name: "Brand",
    pool: [
      "Maybelline Fit Me",
      "Make Over Ultra Cover",
      "L'Oreal Infallible",
      "Fenty Beauty",
    ],
  },
  {
    id: "attr-beau-found-cov",
    categoryId: "cat-beauty-foundation",
    name: "Coverage Level",
    pool: [
      "Medium Buildable Coverage",
      "Full Flawless Coverage",
      "Lightweight Sheer Skin Tint",
    ],
  },
  {
    id: "attr-beau-found-fin",
    categoryId: "cat-beauty-foundation",
    name: "Finish",
    pool: ["Oil-Control Matte", "Dewy Luminous Glow", "Natural Velvet Satin"],
  },
  {
    id: "attr-beau-lip-brand",
    categoryId: "cat-beauty-lipstick",
    name: "Brand",
    pool: [
      "Wardah Glasting",
      "Maybelline Superstay Ink",
      "Make Over Lip Crayon",
      "Huda Beauty",
    ],
  },
  {
    id: "attr-beau-lip-type",
    categoryId: "cat-beauty-lipstick",
    name: "Product Type",
    pool: [
      "Liquid Matte Lip Cream",
      "Classic Bullet Velvet Stick",
      "Hydrating Glossy Lip Tint",
    ],
  },
  {
    id: "attr-beau-lip-long",
    categoryId: "cat-beauty-lipstick",
    name: "Longevity",
    pool: [
      "16-Hour Transferproof & Kissproof",
      "Standard Daily Wear (Requires Re-apply)",
    ],
  },
  {
    id: "attr-beau-masc-brand",
    categoryId: "cat-beauty-mascara",
    name: "Brand",
    pool: ["Maybelline Hypercurl", "Wardah Volume Expert", "Romand Han All"],
  },
  {
    id: "attr-beau-masc-effect",
    categoryId: "cat-beauty-mascara",
    name: "Lash Effect",
    pool: [
      "Volumizing & Thickening",
      "Lengthening & Defining",
      "Max Curling & Lifting",
    ],
  },
  {
    id: "attr-beau-masc-form",
    categoryId: "cat-beauty-mascara",
    name: "Formula Type",
    pool: ["100% Smudgeproof Waterproof", "Easy Washable Warm Water Formula"],
  },
  {
    id: "attr-beau-shamp-brand",
    categoryId: "cat-beauty-shampoo",
    name: "Brand",
    pool: [
      "Head & Shoulders",
      "Pantene Anti-Dandruff",
      "Tresemme Keratin",
      "Selsun Blue",
    ],
  },
  {
    id: "attr-beau-shamp-con",
    categoryId: "cat-beauty-shampoo",
    name: "Hair Concern",
    pool: [
      "Anti-Dandruff & Itch Relief",
      "Hairfall Control & Strengthening",
      "Volumizing for Oily & Flat Hair",
    ],
  },
  {
    id: "attr-beau-shamp-spec",
    categoryId: "cat-beauty-shampoo",
    name: "Special Ingredient",
    pool: [
      "Keratin Smooth Complex",
      "Biotin & Aloe Vera Infusion",
      "1% Zinc Pyrithione",
    ],
  },
  {
    id: "attr-beau-cond-brand",
    categoryId: "cat-beauty-conditioner",
    name: "Brand",
    pool: ["Pantene Miracle3", "Tresemme Smooth", "Loreal Elseve Serum"],
  },
  {
    id: "attr-beau-cond-vol",
    categoryId: "cat-beauty-conditioner",
    name: "Volume",
    pool: ["150ml Tube", "290ml Pump Bottle", "400ml Family Value Pack"],
  },
  {
    id: "attr-beau-cond-inst",
    categoryId: "cat-beauty-conditioner",
    name: "Usage Instructions",
    pool: ["Rinse Thoroughly After 3 Minutes", "Leave-on (No Rinse Required)"],
  },
  {
    id: "attr-beau-mask-brand",
    categoryId: "cat-beauty-hairmask",
    name: "Brand",
    pool: ["Makarizo Hair Energy", "L'Oreal Hair Spa", "Fino Premium Touch"],
  },
  {
    id: "attr-beau-mask-scent",
    categoryId: "cat-beauty-hairmask",
    name: "Scent Profile",
    pool: [
      "Sweet Royal Jelly Extract",
      "Fresh Aloe & Melon Scent",
      "Deep Earthy Ginseng Extract",
    ],
  },
  {
    id: "attr-beau-mask-freq",
    categoryId: "cat-beauty-hairmask",
    name: "Usage Frequency",
    pool: ["1-2 Times a Week as a Conditioner Replacement"],
  },
];
