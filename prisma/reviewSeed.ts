export type ReviewSeed = {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  content: string;
  helpfulCount: number;
  imageUrls: string[];
};

export const mockReviews: ReviewSeed[] = [
  // ---------------------------------------------------
  // T-SHIRTS (prod-tshirt-001)
  // ---------------------------------------------------
  {
    id: "rev-ts-001",
    productId: "prod-tshirt-001",
    userId: "usr-cln001",
    rating: 5,
    content:
      "Absolutely incredible quality! The Cotton Combed fabric feels premium, heavy but perfectly breathable. The fit is clean and drapes beautifully.",
    helpfulCount: 14,
    imageUrls: [
      "https://images.unsplash.com/photo-1521572267360-ee0c2909d518?auto=format&fit=crop&w=300&h=300&q=80",
    ],
  },
  {
    id: "rev-ts-002",
    productId: "prod-tshirt-001",
    userId: "usr-cln002",
    rating: 4,
    content:
      "Very comfortable for daily wear. Dropped one star only because the delivery took a bit longer than expected, but the tee itself is flawless.",
    helpfulCount: 3,
    imageUrls: [],
  },

  // T-SHIRTS (prod-tshirt-002 - Oversized)
  {
    id: "rev-ts-003",
    productId: "prod-tshirt-002",
    userId: "usr-cln003",
    rating: 5,
    content:
      "This streetwear cut is perfect! It gives that intentional loose structure without making you look swallowed. Premium thick collar stitching too.",
    helpfulCount: 22,
    imageUrls: [],
  },
  {
    id: "rev-ts-004",
    productId: "prod-tshirt-002",
    userId: "usr-cln004",
    rating: 2,
    content:
      "The material quality is fantastic, but the oversized layout runs way too big for smaller frames. Make sure to size down if you like a normal fit.",
    helpfulCount: 8,
    imageUrls: [],
  },

  // ---------------------------------------------------
  // KEYBOARDS (prod-keyboard-001)
  // ---------------------------------------------------
  {
    id: "rev-kb-001",
    productId: "prod-keyboard-001",
    userId: "usr-cln001",
    rating: 5,
    content:
      "Insanely satisfying mechanical key typing experience! The RGB backlighting is bright, crisp, and easily customizable. Completely changed my desk setup aesthetics.",
    helpfulCount: 45,
    imageUrls: [
      "https://images.unsplash.com/photo-1618384887929-16ec33fab9ef?auto=format&fit=crop&w=300&h=300&q=80",
      "https://images.unsplash.com/photo-1595225476474-87563907a212?auto=format&fit=crop&w=300&h=300&q=80",
    ],
  },
  {
    id: "rev-kb-002",
    productId: "prod-keyboard-001",
    userId: "usr-cln005",
    rating: 4,
    content:
      "Solid build quality with a hefty weighted base plate. Switches are buttery smooth. Minor complaint: the companion layout management software is slightly clunky.",
    helpfulCount: 12,
    imageUrls: [],
  },

  // KEYBOARDS (prod-keyboard-002)
  {
    id: "rev-kb-003",
    productId: "prod-keyboard-002",
    userId: "usr-cln002",
    rating: 5,
    content:
      "The wireless performance is flawless! Zero input latency dropouts while gaming, and the battery life easily stretches over weeks on a single charge cycle.",
    helpfulCount: 19,
    imageUrls: [],
  },

  // ---------------------------------------------------
  // COFFEES (prod-coffee-001)
  // ---------------------------------------------------
  {
    id: "rev-cf-001",
    productId: "prod-coffee-001",
    userId: "usr-cln003",
    rating: 5,
    content:
      "Beautiful medium-light specialty roast balance! Features clean citrus notes and an incredibly aromatic floral finish. Perfect for morning V60 pourovers.",
    helpfulCount: 7,
    imageUrls: [
      "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?auto=format&fit=crop&w=300&h=300&q=80",
    ],
  },
  {
    id: "rev-cf-002",
    productId: "prod-coffee-001",
    userId: "usr-cln006",
    rating: 4,
    content:
      "Very fresh whole beans, the degassing valve was still puffy when it arrived. Makes a beautifully bright and complex espresso pull.",
    helpfulCount: 2,
    imageUrls: [],
  },

  // ---------------------------------------------------
  // SMARTPHONES (prod-android-003)
  // ---------------------------------------------------
  {
    id: "rev-ph-001",
    productId: "prod-android-003",
    userId: "usr-cln005",
    rating: 5,
    content:
      "An absolute powerhouse flagship engine! The OLED display is stunningly fluid at 120Hz, camera low-light sharpness is pristine, and 512GB of space means zero limits.",
    helpfulCount: 31,
    imageUrls: [],
  },
  {
    id: "rev-ph-002",
    productId: "prod-android-003",
    userId: "usr-cln001",
    rating: 4,
    content:
      "Blazing fast computing performance and premium matte chassis texture. The fast charger fills it up in under an hour, though battery drain is slightly high when gaming.",
    helpfulCount: 5,
    imageUrls: [],
  },

  // ---------------------------------------------------
  // SERUMS (prod-serum-001)
  // ---------------------------------------------------
  {
    id: "rev-sr-001",
    productId: "prod-serum-001",
    userId: "usr-cln002",
    rating: 5,
    content:
      "My ultimate holy grail skincare product! It absorbs instantly without leaving any greasy film layer. My dark spots faded noticeably within two weeks.",
    helpfulCount: 28,
    imageUrls: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?auto=format&fit=crop&w=300&h=300&q=80",
    ],
  },
  {
    id: "rev-sr-002",
    productId: "prod-serum-001",
    userId: "usr-cln006",
    rating: 3,
    content:
      "Very gentle hydrating formula that didn't trigger any acne breakouts, but the active brightening effect seems to require longer persistent use to show results.",
    helpfulCount: 0,
    imageUrls: [],
  },
];
