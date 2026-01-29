export interface Product {
  id: string;
  name: string;
  price: number;
  category: string;
  image: string;
  description: string;
  sizes: string[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export const products: Product[] = [
  {
    id: "1",
    name: "Division Oversized Tee",
    price: 45,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?q=80&w=1000&auto=format&fit=crop",
    description: "Premium cotton oversized t-shirt with signature brand logo on the chest. Relaxed fit for ultimate comfort.",
    sizes: ["S", "M", "L", "XL"],
    isFeatured: true
  },
  {
    id: "2",
    name: "Momentum Hoodie",
    price: 85,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?q=80&w=1000&auto=format&fit=crop",
    description: "Heavyweight fleece hoodie with dropped shoulders and a minimalist aesthetic. Perfect for layering.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: "3",
    name: "Urban Cargo Pants",
    price: 120,
    category: "pants",
    image: "https://images.unsplash.com/photo-1517423738875-5ce310acd3da?q=80&w=1000&auto=format&fit=crop",
    description: "Functional cargo pants with multiple pockets and adjustable ankle straps. Crafted from durable nylon blend.",
    sizes: ["30", "32", "34", "36"]
  },
  {
    id: "4",
    name: "Memory Beanie",
    price: 30,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1576871333021-d5d2bc33679d?q=80&w=1000&auto=format&fit=crop",
    description: "Soft knit beanie with embroidered brand division patch. One size fits all.",
    sizes: ["OS"]
  },
  {
    id: "5",
    name: "Signature Box Logo Tee",
    price: 50,
    category: "t-shirts",
    image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?q=80&w=1000&auto=format&fit=crop",
    description: "Limited edition box logo t-shirt. High-quality screen print on 100% organic cotton.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "6",
    name: "Abstract Graphic Hoodie",
    price: 95,
    category: "hoodies",
    image: "https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?q=80&w=1000&auto=format&fit=crop",
    description: "Hoodie featuring abstract graphic art on the back. Premium brushed interior.",
    sizes: ["S", "M", "L", "XL"],
    isNew: true
  },
  {
    id: "7",
    name: "Division Runner V1",
    price: 180,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=1000&auto=format&fit=crop",
    description: "High-performance urban runner with reactive sole technology and premium mesh upper.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    isFeatured: true
  },
  {
    id: "8",
    name: "Eclipse Sneakers",
    price: 210,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=1000&auto=format&fit=crop",
    description: "Monochrome leather sneakers with minimalist paneling and custom division sole.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    isNew: true
  },
  {
    id: "9",
    name: "Tech Shell Jacket",
    price: 250,
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?q=80&w=1000&auto=format&fit=crop",
    description: "Waterproof tech shell with heat-sealed seams and utilitarian design.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "10",
    name: "Division Tote Bag",
    price: 65,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1544816155-12df9643f363?q=80&w=1000&auto=format&fit=crop",
    description: "Durable canvas tote bag with reinforced handles and interior zip pocket.",
    sizes: ["OS"]
  },
  {
    id: "11",
    name: "Phantom Low-Top",
    price: 195,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?q=80&w=1000&auto=format&fit=crop",
    description: "Sleek low-top silhouette crafted from Italian suede and recycled rubber.",
    sizes: ["7", "8", "9", "10", "11", "12"]
  },
  {
    id: "12",
    name: "Core Logo Socks",
    price: 15,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1582966239102-93cc63e030bc?q=80&w=1000&auto=format&fit=crop",
    description: "Comfortable rib-knit socks with embroidered division logo.",
    sizes: ["OS"],
    isNew: true
  },
  {
    id: "13",
    name: "Urban Explorer Backpack",
    price: 145,
    category: "accessories",
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?q=80&w=1000&auto=format&fit=crop",
    description: "High-capacity backpack with laptop compartment and waterproof zippers.",
    sizes: ["OS"],
    isFeatured: true
  },
  {
    id: "14",
    name: "Stealth Windbreaker",
    price: 130,
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1504191463004-3675df75a744?q=80&w=1000&auto=format&fit=crop",
    description: "Lightweight windbreaker with reflective details and adjustable hood.",
    sizes: ["S", "M", "L", "XL"]
  },
  {
    id: "15",
    name: "Division High-Top",
    price: 230,
    category: "shoes",
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?q=80&w=1000&auto=format&fit=crop",
    description: "Classic high-top silhouette with modern materials and custom division hardware.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    isNew: true
  },
  {
    id: "16",
    name: "Midnight Denim Jacket",
    price: 165,
    category: "outerwear",
    image: "https://images.unsplash.com/photo-1576905341939-402d242748d1?q=80&w=1000&auto=format&fit=crop",
    description: "Distressed black denim jacket with custom metal buttons and interior print.",
    sizes: ["S", "M", "L", "XL"]
  }
];

export const collections = [
  {
    id: "spring-2026",
    name: "Spring/Summer 26",
    image: "https://images.unsplash.com/photo-1483985988355-763728e1935b?q=80&w=1000&auto=format&fit=crop",
    description: "Exploring the boundaries of urban minimalism."
  },
  {
    id: "core-essentials",
    name: "Core Essentials",
    image: "https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop",
    description: "The foundation of your wardrobe."
  }
];
