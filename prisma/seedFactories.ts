import { faker } from "@faker-js/faker";
import slugify from "slugify";

export interface ProductSeed {
  id: string;
  name: string;
  category: string;
  imageUrls: string[];
  description: string;
  price: number;
  weight: number;
  stock: number;
  sold: number;
  slug: string;
}

export interface ReviewSeed {
  id: string;
  productId: string;
  userId: string;
  rating: number;
  content: string;
  helpfulCount: number;
  imageUrls: string[];
}

export interface CategoryGenConfig {
  id: string;
  brands: string[];
  productNames: string[];
  minPrice: number;
  maxPrice: number;
  minWeight: number;
  maxWeight: number;
  imageUrls: string[];
  details: string;
}

export interface AttributeTemplateSeed {
  id: string;
  categoryId: string;
  name: string;
  pool: string[];
}

export interface UserSeed {
  id: string;
  name: string;
  email: string;
  emailVerified: boolean;
  image: string | null;
}

/**
 * Runs array of tasks in parallel batches of a specified size to ensure database connection stability.
 */
export async function runInBatches<T>(
  tasks: (() => Promise<T>)[],
  batchSize: number = 40
): Promise<T[]> {
  const results: T[] = [];
  for (let i = 0; i < tasks.length; i += batchSize) {
    const batch = tasks.slice(i, i + batchSize);
    const batchResults = await Promise.all(batch.map((task) => task()));
    results.push(...batchResults);
  }
  return results;
}

/**
 * Generates products dynamically based on category configurations
 */
export function generateProductsForCategories(
  configs: CategoryGenConfig[],
  countPerCategory: number = 10
): ProductSeed[] {
  const result: ProductSeed[] = [];

  for (const config of configs) {
    for (let i = 1; i <= countPerCategory; i++) {
      const brand = faker.helpers.arrayElement(config.brands);
      const baseName = config.productNames[i % config.productNames.length];
      
      // Determine variation based on category ID
      let variation = "";
      if (config.id.includes("fashion")) {
        variation = faker.helpers.arrayElement([" - S", " - M", " - L", " - XL", " - Black", " - Navy", " - White"]);
      } else if (config.id.includes("electronics-monitors")) {
        variation = faker.helpers.arrayElement([" IPS", " Curved", " UltraGear", " Essential"]);
      } else if (config.id.includes("electronics-keyboards")) {
        variation = faker.helpers.arrayElement([" Red Switch", " Brown Switch", " Blue Switch", " Wireless"]);
      } else if (config.id.includes("electronics-mice")) {
        variation = faker.helpers.arrayElement([" Wireless", " Wired", " Pro", " Superlight"]);
      } else if (config.id.includes("electronics-audio")) {
        variation = faker.helpers.arrayElement([" Bass+", " Waterproof", " Active", " Compact"]);
      } else if (config.id.includes("food-coffee") || config.id.includes("food-tea")) {
        variation = faker.helpers.arrayElement([" Premium", " Special Edition", " Organik", " Family Pack"]);
      } else if (config.id.includes("beauty-cleanser") || config.id.includes("beauty-shampoo") || config.id.includes("beauty-conditioner")) {
        variation = faker.helpers.arrayElement([" 100ml", " 250ml", " 400ml", " Pump Bottle"]);
      } else if (config.id.includes("beauty-serum") || config.id.includes("beauty-moisturizer")) {
        variation = faker.helpers.arrayElement([" 20ml", " 30g", " 50ml", " Travel Size"]);
      } else if (config.id.includes("beauty-lipstick")) {
        variation = faker.helpers.arrayElement([" - Matte Pink", " - Bold Red", " - Nude Classic", " - Peach Glow"]);
      } else if (config.id.includes("mobile-smartphones")) {
        variation = faker.helpers.arrayElement([" 8GB/256GB", " 12GB/512GB", " Resmi iBox/TAM"]);
      }

      const rawName = `${brand} ${baseName}${variation}`;
      const name = rawName.replace(/  +/g, " ");
      const id = `prod-${config.id.replace("cat-", "")}-${String(i).padStart(3, "0")}`;
      
      const price = Math.round(faker.number.int({ min: config.minPrice, max: config.maxPrice }) / 1000) * 1000;
      const weight = faker.number.int({ min: config.minWeight, max: config.maxWeight });
      const stock = faker.number.int({ min: 10, max: 350 });
      const sold = faker.number.int({ min: 5, max: 800 });

      // Clean, professional e-commerce product details card layout (Indonesian language context)
      const descMarkdown = `### Deskripsi Produk

${config.details}

### Keunggulan & Spesifikasi Utama
- **Brand Original**: Produk asli bergaransi dari ${brand}.
- **Material Premium**: Dibuat dari material pilihan berstandar mutu ekspor.
- **Efisiensi Pengiriman**: Berat produk ${weight} gram, dikemas aman dengan bubble wrap gratis.
- **Desain Ergonomis & Modern**: Disesuaikan dengan kebutuhan gaya hidup harian yang praktis dan estetik.

### Cara Penggunaan / Perawatan
1. Bersihkan dengan kain lap kering atau ikuti instruksi perawatan di kemasan.
2. Simpan di tempat yang sejuk dan terlindang dari air (terutama produk elektronik).
3. Gunakan secara wajar demi menjaga keawetan fungsional jangka panjang.

*GoodGoods berkomitmen menghadirkan produk original 100% langsung dari pabrikan resmi.*`;

      // Select 1 to 3 images from config image pool
      const imageUrls = faker.helpers.arrayElements(config.imageUrls, {
        min: 1,
        max: Math.min(3, config.imageUrls.length),
      });

      result.push({
        id,
        name,
        category: config.id,
        imageUrls,
        description: descMarkdown,
        price,
        weight,
        stock,
        sold,
        slug: slugify(name, { lower: true, strict: true, trim: true }) + `-${id}`
      });
    }
  }

  return result;
}

/**
 * Generates reviews for products by mapping selected mock users
 */
export function generateReviewsForProducts(
  products: ProductSeed[],
  mockUsers: UserSeed[],
  positivePool: string[],
  neutralPool: string[],
  negativePool: string[]
): ReviewSeed[] {
  const reviews: ReviewSeed[] = [];

  for (const product of products) {
    // Generate reviews by a random subset of 1 to 4 mock users to prevent unique constraint failures
    const reviewerCount = faker.number.int({ min: 1, max: 4 });
    const selectedUsers = faker.helpers.arrayElements(mockUsers, reviewerCount);

    for (const user of selectedUsers) {
      const id = `rev-${product.id.replace("prod-", "")}-${user.id.replace("usr-", "")}`;

      // Rating distribution: 70% 5-star, 20% 4-star, 7% 3-star, 3% 1-2 star
      const rand = faker.number.int({ min: 1, max: 100 });
      let rating = 5;
      let content = "";

      if (rand <= 70) {
        rating = 5;
        content = faker.helpers.arrayElement(positivePool);
      } else if (rand <= 90) {
        rating = 4;
        content = faker.helpers.arrayElement([...positivePool, ...neutralPool]);
      } else if (rand <= 97) {
        rating = 3;
        content = faker.helpers.arrayElement(neutralPool);
      } else {
        rating = faker.helpers.arrayElement([1, 2]);
        content = faker.helpers.arrayElement(negativePool);
      }

      const helpfulCount = faker.number.int({ min: 0, max: 20 });
      const imageUrls: string[] = [];

      // 10% chance to attach one of the product's image URLs to the review for realistic feedback
      if (faker.number.int({ min: 1, max: 10 }) === 1 && product.imageUrls.length > 0) {
        imageUrls.push(faker.helpers.arrayElement(product.imageUrls));
      }

      reviews.push({
        id,
        productId: product.id,
        userId: user.id,
        rating,
        content,
        helpfulCount,
        imageUrls
      });
    }
  }

  return reviews;
}
