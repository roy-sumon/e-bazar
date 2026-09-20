export const VENDORS = [
  {
    id: "sony-official",
    name: "Sony Official Flagship Store",
    slug: "sony-official",
    badge: "Official Flagship",
    verified: true,
    rating: 4.9,
    reviewsCount: 3820,
    salesCount: "24.5k+",
    joinedDate: "Jan 2022",
    responseTime: "< 15 mins",
    shipOnTime: "99.4%",
    location: "Tokyo / Global Hub",
    avatar: "https://images.unsplash.com/photo-1550009158-9ebf69173e03?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=1200&auto=format&fit=crop&q=80",
    description: "Welcome to the Sony Official Flagship on E-Bazar. Discover class-leading audio technology, wireless active noise-canceling headphones, cameras, and gaming gear with manufacturer warranty."
  },
  {
    id: "aetheria-apparel",
    name: "Aetheria Luxury Apparel",
    slug: "aetheria-apparel",
    badge: "Top Fashion Brand",
    verified: true,
    rating: 4.8,
    reviewsCount: 2150,
    salesCount: "18.2k+",
    joinedDate: "Mar 2022",
    responseTime: "< 1 hour",
    shipOnTime: "98.7%",
    location: "Milan, Italy",
    avatar: "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1200&auto=format&fit=crop&q=80",
    description: "Modern minimalist fashion, tailored artisan garments, and contemporary streetwear designed with premium sustainable fabrics on E-Bazar."
  },
  {
    id: "anker-tech",
    name: "Anker Innovations Hub",
    slug: "anker-tech",
    badge: "Power & Tech Leader",
    verified: true,
    rating: 4.9,
    reviewsCount: 5410,
    salesCount: "35.8k+",
    joinedDate: "Nov 2021",
    responseTime: "< 30 mins",
    shipOnTime: "99.8%",
    location: "California, USA",
    avatar: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=1200&auto=format&fit=crop&q=80",
    description: "The global pioneer in charging technology, GaN fast chargers, magnetic power banks, and workplace gear on E-Bazar."
  },
  {
    id: "nordic-living",
    name: "Nordic Minimalist Living",
    slug: "nordic-living",
    badge: "Design Studio",
    verified: true,
    rating: 4.7,
    reviewsCount: 1640,
    salesCount: "12.4k+",
    joinedDate: "Aug 2022",
    responseTime: "< 2 hours",
    shipOnTime: "98.2%",
    location: "Copenhagen, Denmark",
    avatar: "https://images.unsplash.com/photo-1538688525198-9b88f6f53126?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?w=1200&auto=format&fit=crop&q=80",
    description: "Elevating home spaces with Scandinavian craftsmanship, ceramic stoneware, ambient smart lighting, and ergonomic furniture on E-Bazar."
  },
  {
    id: "glowup-beauty",
    name: "GlowUp Organics",
    slug: "glowup-beauty",
    badge: "Clean Beauty Verified",
    verified: true,
    rating: 4.9,
    reviewsCount: 3120,
    salesCount: "19.6k+",
    joinedDate: "May 2022",
    responseTime: "< 45 mins",
    shipOnTime: "99.1%",
    location: "Seoul, South Korea",
    avatar: "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&auto=format&fit=crop&q=80",
    description: "Botanical extracts, cruelty-free formulas, dermatologist-approved skincare serums, and luxury organic self-care on E-Bazar."
  },
  {
    id: "apex-chronos",
    name: "Apex Chronos Timepieces",
    slug: "apex-chronos",
    badge: "Horology Master",
    verified: true,
    rating: 4.8,
    reviewsCount: 980,
    salesCount: "8.9k+",
    joinedDate: "Feb 2023",
    responseTime: "< 1 hour",
    shipOnTime: "99.0%",
    location: "Geneva, Switzerland",
    avatar: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=200&auto=format&fit=crop&q=80",
    banner: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=1200&auto=format&fit=crop&q=80",
    description: "Precision engineered automatic horology, sapphire crystal timepieces, and aviation chronographs on E-Bazar."
  }
];

export const CATEGORIES = [
  { id: "all", name: "All Categories", icon: "Sparkles", count: 24 },
  { id: "electronics", name: "Electronics & Tech", icon: "Cpu", count: 6 },
  { id: "audio", name: "Audio & Headphones", icon: "Headphones", count: 4 },
  { id: "fashion", name: "Fashion & Apparel", icon: "Shirt", count: 5 },
  { id: "home-living", name: "Home & Decor", icon: "Home", count: 4 },
  { id: "watches", name: "Watches & Horology", icon: "Watch", count: 3 },
  { id: "beauty", name: "Beauty & Wellness", icon: "Sparkle", count: 4 },
];

export const PRODUCTS = [
  {
    id: "prod-1",
    title: "Sony WH-1000XM5 Wireless Noise-Canceling Headphones",
    category: "audio",
    vendorId: "sony-official",
    price: 348.00,
    originalPrice: 399.99,
    discountPercentage: 13,
    rating: 4.9,
    reviewsCount: 1420,
    stock: 28,
    isFlashSale: true,
    claimedPercent: 78,
    tags: ["Bestseller", "Official Warranty", "Free 2-Day Air"],
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Silver Platinum", "Midnight Black", "Midnight Blue"],
      specs: ["30h Battery Life", "Dual Processor V1", "Ultra Clear Voice"]
    },
    description: "The Sony WH-1000XM5 redefines distraction-free listening. Two processors control 8 microphones for unprecedented noise cancellation and exceptional call quality.",
    specifications: {
      "Brand": "Sony",
      "Model": "WH-1000XM5",
      "Driver Unit": "30mm, Carbon Fiber",
      "Battery Life": "Up to 30 Hours with ANC",
      "Charging": "USB-PD Quick Charge (3 min for 3 hrs)",
      "Weight": "250 grams"
    }
  },
  {
    id: "prod-2",
    title: "Apex Chronos Automatic Tourbillon Heritage Watch",
    category: "watches",
    vendorId: "apex-chronos",
    price: 689.00,
    originalPrice: 850.00,
    discountPercentage: 19,
    rating: 4.9,
    reviewsCount: 312,
    stock: 12,
    isFlashSale: true,
    claimedPercent: 88,
    tags: ["Luxury", "Swiss Movement", "Sapphire Glass"],
    image: "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1524805444758-089113d48a6d?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Obsidian Black & Rose Gold", "Silver Starling & Navy Blue"],
      sizes: ["42mm Case"]
    },
    description: "An exceptional masterpiece of mechanical horology. Features self-winding movement visible through open caseback, genuine Italian calfskin leather, and water resistance to 100m.",
    specifications: {
      "Movement": "Automatic Calibre 8800",
      "Glass": "Anti-reflective Sapphire",
      "Case": "316L Stainless Steel",
      "Strap": "Genuine Alligator Leather",
      "Warranty": "5 Years International"
    }
  },
  {
    id: "prod-3",
    title: "Anker Prime 20,000mAh 200W High-Speed Power Bank",
    category: "electronics",
    vendorId: "anker-tech",
    price: 119.99,
    originalPrice: 139.99,
    discountPercentage: 14,
    rating: 4.9,
    reviewsCount: 890,
    stock: 45,
    isFlashSale: false,
    tags: ["Anker GaNPrime", "Smart Digital Display"],
    image: "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Space Gray"],
      specs: ["200W Total Output", "Charges MacBook Pro + iPhone simultaneously"]
    },
    description: "Charge two laptops and a phone simultaneously at top speeds. Features real-time smart digital display showing remaining capacity, power draw, and recharge speed.",
    specifications: {
      "Capacity": "20,000mAh (72Wh)",
      "Total Output": "200W Max",
      "Ports": "2x USB-C + 1x USB-A",
      "Display": "TFT Smart Color Display"
    }
  },
  {
    id: "prod-4",
    title: "Aetheria Oversized Italian Wool-Cashmere Trench Coat",
    category: "fashion",
    vendorId: "aetheria-apparel",
    price: 295.00,
    originalPrice: 380.00,
    discountPercentage: 22,
    rating: 4.8,
    reviewsCount: 460,
    stock: 18,
    isFlashSale: true,
    claimedPercent: 62,
    tags: ["Handcrafted", "Winter Collection", "Sustainable"],
    image: "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1539533018447-63fcce2678e3?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Camel Beige", "Charcoal Gray", "Deep Forest Green"],
      sizes: ["S", "M", "L", "XL"]
    },
    description: "Timeless silhouette tailored from 90% virgin wool and 10% pure Mongolian cashmere. Breathable, structured drape that elevates both formal and streetwear ensembles.",
    specifications: {
      "Material": "90% Virgin Wool, 10% Cashmere",
      "Lining": "100% Cupro Silk Touch",
      "Origin": "Milan, Italy",
      "Care": "Specialist Dry Clean"
    }
  },
  {
    id: "prod-5",
    title: "Nordic Minimalist Oak Wood & Ceramic Table Lamp",
    category: "home-living",
    vendorId: "nordic-living",
    price: 145.00,
    originalPrice: 189.00,
    discountPercentage: 23,
    rating: 4.7,
    reviewsCount: 280,
    stock: 22,
    isFlashSale: false,
    tags: ["FSC Certified Oak", "Touch Dimmable", "Warm Glow"],
    image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1513506003901-1e6a229e2d15?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Matte Terracotta & White Oak", "Chalk White & Smoked Walnut"],
      sizes: ["Standard (38cm height)"]
    },
    description: "Create an inviting ambient glow in your living space. Handcrafted ceramic base with solid natural FSC-certified oak neck and smooth stepless touch dimmer.",
    specifications: {
      "Bulb": "Integrated Warm LED (2700K)",
      "Lifespan": "50,000 Hours",
      "Cable": "2.0m Braided Textile Cord",
      "Voltage": "110-240V Universal"
    }
  },
  {
    id: "prod-6",
    title: "GlowUp Peptide & Botanical Radiance Facial Serum (50ml)",
    category: "beauty",
    vendorId: "glowup-beauty",
    price: 64.00,
    originalPrice: 78.00,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 1890,
    stock: 60,
    isFlashSale: true,
    claimedPercent: 91,
    tags: ["Clean Beauty", "Vegan & Cruelty Free", "Clinical Strength"],
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=700&auto=format&fit=crop&q=80",
      "https://images.unsplash.com/photo-1608248597358-00a84594c7b8?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      sizes: ["50ml Standard", "100ml Value Size"]
    },
    description: "Clinically proven multi-peptide and hyaluronic acid elixir that visibly plumps, brightens, and restores skin barrier resilience within 7 days of daily use.",
    specifications: {
      "Key Actives": "Multi-Peptide Complex, Niacinamide 5%, Triple Hyaluronic Acid",
      "Formulation": "Lightweight, Fragrance-Free, Non-Comedogenic",
      "Skin Types": "All skin types including sensitive"
    }
  },
  {
    id: "prod-7",
    title: "Sony Alpha a7 IV Full-Frame Mirrorless Camera Body",
    category: "electronics",
    vendorId: "sony-official",
    price: 2298.00,
    originalPrice: 2499.00,
    discountPercentage: 8,
    rating: 4.9,
    reviewsCount: 780,
    stock: 9,
    isFlashSale: false,
    tags: ["Pro Video", "33MP Sensor", "Real-Time Eye AF"],
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Body Only", "With 28-70mm Kit Lens"]
    },
    description: "The ideal hybrid for both photography and cinematic video creation. Featuring a 33MP Exmor R back-illuminated CMOS sensor with lightning-fast BIONZ XR processing.",
    specifications: {
      "Sensor": "33MP Full-Frame Exmor R",
      "Video": "4K 60p 10-Bit 4:2:2",
      "Stabilization": "5-Axis In-Body 5.5 Stops",
      "Autofocus": "759 Phase Detection Points"
    }
  },
  {
    id: "prod-8",
    title: "Aetheria Minimalist Italian Nappa Leather Chelsea Boots",
    category: "fashion",
    vendorId: "aetheria-apparel",
    price: 210.00,
    originalPrice: 260.00,
    discountPercentage: 19,
    rating: 4.8,
    reviewsCount: 340,
    stock: 15,
    isFlashSale: false,
    tags: ["Full Grain Leather", "Hand-stitched", "Waterproof"],
    image: "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1638247025967-b4e38f787b76?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Matte Espresso Brown", "Onyx Black", "Sand Suede"],
      sizes: ["40", "41", "42", "43", "44", "45"]
    },
    description: "Constructed using supple Italian Nappa leather that molds naturally to your foot. Features Goodyear welted soles for lifelong durability and waterproof protection.",
    specifications: {
      "Upper": "100% Italian Nappa Calf Leather",
      "Sole": "Vibram Rubber Outsole",
      "Construction": "Goodyear Welted",
      "Origin": "Tuscany, Italy"
    }
  },
  {
    id: "prod-9",
    title: "Anker Soundcore Space One Pro Active ANC Headphones",
    category: "audio",
    vendorId: "anker-tech",
    price: 149.99,
    originalPrice: 179.99,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 920,
    stock: 35,
    isFlashSale: true,
    claimedPercent: 74,
    tags: ["LDAC Hi-Res", "Foldable FlexiCurve", "60h Playtime"],
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Jet Black", "Cream White"]
    },
    description: "Hear every frequency nuance with custom drivers and Hi-Res Wireless audio certification. Adaptive 4-stage noise cancellation suppresses voices and engine roar effortlessly.",
    specifications: {
      "Battery": "60 Hours (ANC Off) / 40 Hours (ANC On)",
      "Audio Codec": "LDAC, AAC, SBC",
      "Microphones": "6 Mics with AI Noise Reduction"
    }
  },
  {
    id: "prod-10",
    title: "Nordic Ceramic Stoneware 16-Piece Dining Set",
    category: "home-living",
    vendorId: "nordic-living",
    price: 180.00,
    originalPrice: 220.00,
    discountPercentage: 18,
    rating: 4.9,
    reviewsCount: 410,
    stock: 20,
    isFlashSale: false,
    tags: ["Dishwasher Safe", "Microwave Safe", "Hand-glazed"],
    image: "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1615865417491-9941019fbc00?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Earthy Sage", "Nordic Slate Gray", "Sand Dune Beige"]
    },
    description: "Handcrafted stoneware finished with a tactile reactive glaze. Includes 4 dinner plates, 4 salad plates, 4 cereal bowls, and 4 artisanal mugs.",
    specifications: {
      "Material": "High-fired Stoneware",
      "Included": "16 Pieces (Service for 4)",
      "Safety": "Lead & Cadmium Free, Dishwasher & Oven Safe"
    }
  },
  {
    id: "prod-11",
    title: "Apex Chronos Pilot GMT Dual-Time Titanium Watch",
    category: "watches",
    vendorId: "apex-chronos",
    price: 520.00,
    originalPrice: 650.00,
    discountPercentage: 20,
    rating: 4.9,
    reviewsCount: 190,
    stock: 14,
    isFlashSale: false,
    tags: ["Grade 5 Titanium", "GMT 2nd Timezone", "Swiss SuperLuminova"],
    image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      colors: ["Titanium Grey with Pepsi Bezel", "Matte Black with Batman Bezel"]
    },
    description: "Built for world travelers and aviation enthusiasts. Featherlight Grade 5 titanium case with bi-directional 24-hour ceramic bezel to track two time zones at once.",
    specifications: {
      "Case Diameter": "40.5mm",
      "Case Material": "Grade 5 Titanium",
      "Movement": "Automatic GMT High-Beat",
      "Water Resistance": "200M / 20 Bar"
    }
  },
  {
    id: "prod-12",
    title: "GlowUp Pure Botanical Barrier Recovery Night Cream (60ml)",
    category: "beauty",
    vendorId: "glowup-beauty",
    price: 48.00,
    originalPrice: 58.00,
    discountPercentage: 17,
    rating: 4.8,
    reviewsCount: 780,
    stock: 40,
    isFlashSale: false,
    tags: ["Ceramide 3", "Centella Asiatica", "Organic Rosehip"],
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&auto=format&fit=crop&q=80",
    gallery: [
      "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=700&auto=format&fit=crop&q=80"
    ],
    variants: {
      sizes: ["60ml Jar"]
    },
    description: "Deeply restorative night treatment powered by 5 essential ceramides and Korean fermented green tea extract to seal moisture and soothe redness overnight.",
    specifications: {
      "Target": "Redness, Dryness, Compromised Skin Barrier",
      "Key Ingredients": "Ceramides NP/AP/EOP, Centella Asiatica, Squalane",
      "Formulation": "Rich cushion balm texture"
    }
  }
];

export const COUPONS = {
  "EBAZAR20": { discount: 0.20, type: "percent", desc: "20% off entire E-Bazar order" },
  "EBAZAR10": { discount: 0.10, type: "percent", desc: "10% off for E-Bazar shoppers" },
  "ZENITH20": { discount: 0.20, type: "percent", desc: "20% off promotional discount" },
  "WELCOME10": { discount: 0.10, type: "percent", desc: "10% Welcome discount" },
  "SAVE50": { discount: 50.00, type: "fixed", minSpend: 200, desc: "$50 off on orders over $200" },
  "FREESHIP": { discount: 15.00, type: "shipping", desc: "Free Express Shipping" }
};
