import type { Product } from "@/types";

const img = {
  flowers: { src: "/images/placeholder/p-marigold-garland.jpg", alt: "Fresh marigold garland" },
  roses: { src: "/images/placeholder/p-rose-petals.jpg", alt: "Rose petals" },
  diya: { src: "/images/placeholder/p-brass-diya.jpg", alt: "Brass diyas" },
  thali: { src: "/images/placeholder/p-puja-thali.jpg", alt: "Brass puja thali" },
  incense: { src: "/images/placeholder/p-incense.jpg", alt: "Incense and dhoop" },
  kits: { src: "/images/placeholder/cat-kits.jpg", alt: "A packed puja kit" },
  gifts: { src: "/images/placeholder/cat-gifts.jpg", alt: "A festive hamper" },
  festival: { src: "/images/placeholder/cat-festival.jpg", alt: "Festival diyas and rangoli" },
  havan: { src: "/images/placeholder/s-havan.jpg", alt: "Havan samagri and kund" },
  samagri: { src: "/images/placeholder/cat-samagri.jpg", alt: "Puja samagri" },
};

type Seed = {
  id: string;
  slug: string;
  name: string;
  short: string;
  collections: string[];
  price: number;
  image: { src: string; alt: string };
  occasions: string[];
  perishable?: boolean;
  featured?: boolean;
  badge?: Product["badge"];
  sale?: number;
  stock?: boolean;
  highlights?: string[];
};

function item(s: Seed, day: string): Product {
  return {
    id: s.id,
    slug: s.slug,
    name: s.name,
    shortDescription: s.short,
    description: `${s.short} Placeholder listing. Confirm contents, price and stock with Pushpank before launch.`,
    collections: s.collections,
    images: [s.image],
    secondaryImage: s.featured ? s.image : undefined,
    variants: [
      {
        id: `${s.id}_std`,
        label: "Standard",
        sku: s.id.replace("prd_", "").slice(0, 12).toUpperCase(),
        price: s.price,
        salePrice: s.sale,
        inStock: s.stock !== false,
      },
    ],
    inclusions: ["As described on the pack"],
    details: [{ label: "Note", value: "Placeholder product" }],
    perishable: Boolean(s.perishable),
    featured: Boolean(s.featured),
    createdAt: day,
    occasions: s.occasions,
    badge: s.badge,
    highlights: s.highlights,
  };
}

const seeds: Seed[] = [
  { id: "prd_rose_varmala", slug: "rose-varmala", name: "Rose Varmala", short: "A full red-rose varmala for weddings and varmala ceremonies.", collections: ["fresh-flowers"], price: 1499, image: img.roses, occasions: ["weddings"], perishable: true, badge: "Same-day", featured: true, highlights: ["Strung the same morning", "Lucknow delivery"] },
  { id: "prd_lotus_bunch", slug: "lotus-bunch", name: "Lotus Bunch", short: "Fresh lotus flowers for archana and temple offering.", collections: ["fresh-flowers"], price: 280, image: img.flowers, occasions: ["daily-puja"], perishable: true, badge: "Same-day" },
  { id: "prd_mogra_gajra", slug: "mogra-gajra", name: "Mogra Gajra", short: "Fragrant mogra gajras, strung for evening puja and hair.", collections: ["fresh-flowers"], price: 80, image: img.flowers, occasions: ["daily-puja"], perishable: true, badge: "New" },
  { id: "prd_bel_patra", slug: "bel-patra-bundle", name: "Bel Patra Bundle", short: "Fresh bel leaves bundled for Shiva abhishek.", collections: ["fresh-flowers"], price: 60, image: img.flowers, occasions: ["daily-puja"], perishable: true },
  { id: "prd_tulsi_mala", slug: "tulsi-mala", name: "Tulsi Mala", short: "A hand-strung tulsi bead mala for japa.", collections: ["fresh-flowers", "puja-samagri"], price: 180, image: img.samagri, occasions: ["daily-puja"], badge: "Bestseller" },
  { id: "prd_car_garland", slug: "car-garland", name: "Car Garland", short: "A compact marigold and rose garland for a new vehicle.", collections: ["fresh-flowers"], price: 450, image: img.flowers, occasions: ["griha-pravesh"], perishable: true, badge: "Same-day" },
  { id: "prd_temple_toran", slug: "temple-toran", name: "Temple Toran", short: "A marigold and mango-leaf toran for the home mandir.", collections: ["fresh-flowers", "festival-collections"], price: 360, image: img.flowers, occasions: ["diwali", "navratri"], perishable: true, featured: true, badge: "Festive" },
  { id: "prd_havan_samagri", slug: "havan-samagri", name: "Havan Samagri", short: "A measured pack of havan herbs for a home fire ritual.", collections: ["puja-samagri"], price: 220, image: img.havan, occasions: ["griha-pravesh"], badge: "Bestseller" },
  { id: "prd_ghee_wicks", slug: "cow-ghee-diya-wicks", name: "Cow-Ghee Diya Wicks", short: "Cotton wicks rolled for ghee diyas, in a pack of 50.", collections: ["puja-samagri"], price: 90, image: img.diya, occasions: ["daily-puja", "diwali"] },
  { id: "prd_kapoor", slug: "camphor-tablets", name: "Kapoor Tablets", short: "Pure camphor tablets for aarti.", collections: ["puja-samagri"], price: 70, image: img.samagri, occasions: ["daily-puja"] },
  { id: "prd_roli", slug: "roli-chawal", name: "Roli and Chawal", short: "Kumkum roli with akshat rice for tilak.", collections: ["puja-samagri"], price: 55, image: img.samagri, occasions: ["daily-puja"] },
  { id: "prd_kalava", slug: "kalava-thread", name: "Kalava", short: "Sacred mauli thread in a small reel.", collections: ["puja-samagri"], price: 30, image: img.samagri, occasions: ["daily-puja"] },
  { id: "prd_gangajal", slug: "gangajal-bottle", name: "Gangajal", short: "Sealed gangajal for abhishek and kalash.", collections: ["puja-samagri"], price: 120, image: img.samagri, occasions: ["griha-pravesh"] },
  { id: "prd_chandan", slug: "sandalwood-paste", name: "Sandalwood Paste", short: "Ready chandan paste for tilak and deity adornment.", collections: ["puja-samagri"], price: 160, image: img.samagri, occasions: ["daily-puja"], badge: "New" },
  { id: "prd_dhoop", slug: "dhoop-cones", name: "Dhoop Cones", short: "Temple-style dhoop cones with a slow, even burn.", collections: ["puja-samagri"], price: 140, image: img.incense, occasions: ["daily-puja"], featured: true, badge: "Bestseller" },
  { id: "prd_mango_havan", slug: "mango-wood-havan-kit", name: "Mango-Wood Havan Kit", short: "Samidha, samagri and a small copper kund for a home havan.", collections: ["puja-samagri", "puja-kits"], price: 1890, image: img.havan, occasions: ["griha-pravesh"], featured: true, highlights: ["Mango-wood samidha", "Small copper kund"] },
  { id: "prd_gp_kit", slug: "griha-pravesh-kit", name: "Griha Pravesh Kit", short: "Dry samagri for a housewarming puja, with a contents list.", collections: ["puja-kits"], price: 1299, image: img.kits, occasions: ["griha-pravesh"], badge: "Bestseller", featured: true, highlights: ["Kalash items", "Printed checklist"] },
  { id: "prd_lakshmi_kit", slug: "lakshmi-puja-kit", name: "Lakshmi Puja Kit", short: "Samagri gathered for a home Lakshmi puja.", collections: ["puja-kits", "festival-collections"], price: 999, image: img.kits, occasions: ["diwali"], badge: "Festive" },
  { id: "prd_navratri_kit", slug: "navratri-puja-kit", name: "Navratri Puja Kit", short: "A nine-night set of dry samagri, roli and incense.", collections: ["puja-kits", "festival-collections"], price: 1490, image: img.kits, occasions: ["navratri"], badge: "Festive", featured: true },
  { id: "prd_rudra_kit", slug: "rudrabhishek-kit", name: "Rudrabhishek Kit", short: "Bel, gangajal, bhasma and the dry items for a home abhishek.", collections: ["puja-kits"], price: 799, image: img.kits, occasions: ["daily-puja"] },
  { id: "prd_daily_kit", slug: "daily-puja-kit", name: "Daily Puja Kit", short: "A week's incense, wicks, roli and camphor in one box.", collections: ["puja-kits"], price: 449, image: img.kits, occasions: ["daily-puja"], badge: "Bestseller" },
  { id: "prd_thali_gift", slug: "brass-thali-gift-set", name: "Brass Pooja Thali Gift Set", short: "An engraved thali boxed for a wedding or griha pravesh gift.", collections: ["gifts-hampers", "puja-samagri"], price: 2199, image: img.thali, occasions: ["weddings", "griha-pravesh"], badge: "Bestseller", featured: true, highlights: ["Gift box", "Engraved rim"] },
  { id: "prd_diya_pair", slug: "silver-plated-diya-pair", name: "Silver-Plated Diya Pair", short: "A matched pair of plated diyas for a festive table.", collections: ["gifts-hampers"], price: 890, image: img.diya, occasions: ["diwali"], badge: "New" },
  { id: "prd_dryfruit_hamper", slug: "diwali-dryfruit-diya-hamper", name: "Diwali Dry-Fruit and Diya Hamper", short: "Dry fruit, two brass diyas and a silk wrap.", collections: ["gifts-hampers", "festival-collections"], price: 1899, image: img.gifts, occasions: ["diwali"], badge: "Festive", featured: true },
  { id: "prd_ganesh_box", slug: "ganesh-idol-gift-box", name: "Ganesh Idol Gift Box", short: "A small brass Ganesh with roli and a diya, boxed.", collections: ["gifts-hampers"], price: 1290, image: img.gifts, occasions: ["weddings", "griha-pravesh"] },
  { id: "prd_diwali_edit", slug: "diwali-light-edit", name: "Diwali Light Edit", short: "Clay diyas, a brass pair and marigold petals for the evening.", collections: ["festival-collections"], price: 699, image: img.festival, occasions: ["diwali"], badge: "Festive", featured: true },
  { id: "prd_navratri_edit", slug: "navratri-colour-edit", name: "Navratri Colour Edit", short: "Flowers, dhoop and a small thali chosen for the nine nights.", collections: ["festival-collections"], price: 1190, image: img.festival, occasions: ["navratri"], badge: "Festive" },
  { id: "prd_karwa", slug: "karwa-chauth-thali", name: "Karwa Chauth Thali", short: "A decorated thali set for the evening vrat.", collections: ["festival-collections", "gifts-hampers"], price: 1590, image: img.thali, occasions: ["karwa-chauth"], badge: "Festive" },
  { id: "prd_chhath", slug: "chhath-offering-set", name: "Chhath Offering Set", short: "Soop-ready fruits list card, diyas and marigold strands.", collections: ["festival-collections", "fresh-flowers"], price: 540, image: img.flowers, occasions: ["chhath"], perishable: true, badge: "Same-day" },
];

export const extraProducts: Product[] = seeds.map((s, i) =>
  item(s, `2026-10-${String((i % 27) + 1).padStart(2, "0")}`),
);
