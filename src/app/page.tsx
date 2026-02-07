"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getProducts, getHeroImages, type Product } from "@/lib/data/products";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?q=80&w=2000&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?q=80&w=2000&auto=format&fit=crop",
];

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const [heroImages, setHeroImages] = useState<string[]>(FALLBACK_IMAGES);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    async function loadData() {
      const [productsData, heroData] = await Promise.all([
        getProducts(),
        getHeroImages(),
      ]);

      const featured = productsData.filter(p => p.isFeatured);
      setProducts(featured.length > 0 ? featured : productsData.slice(0, 8));

      if (heroData.length > 0) {
        setHeroImages(heroData.map(h => h.url));
      }
    }
    loadData();
  }, []);

  const nextImage = useCallback(() => {
    setCurrentImageIndex(prev => (prev + 1) % heroImages.length);
  }, [heroImages.length]);

  useEffect(() => {
    if (heroImages.length <= 1) return;
    const interval = setInterval(nextImage, 4000);
    return () => clearInterval(interval);
  }, [nextImage, heroImages.length]);

  return (
    <div className="flex flex-col bg-black min-h-screen">
      {/* Hero */}
      <section className="relative h-[60vh] md:h-[70vh] w-full overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentImageIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <Image
              src={heroImages[currentImageIndex]}
              alt=""
              fill
              className="object-cover"
              priority
            />
            <div className="absolute inset-0 bg-black/50" />
          </motion.div>
        </AnimatePresence>

        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center text-center px-6">
          <span className="text-[10px] uppercase tracking-[0.6em] text-zinc-500 mb-4">Est. 2025</span>
          <h1 className="font-display text-4xl md:text-6xl text-white font-bold italic tracking-tight">
            Memories Division
          </h1>
          <div className="w-16 h-[2px] bg-red-700 mt-6 mb-4" />
          <span className="text-[10px] uppercase tracking-[0.5em] text-zinc-500 font-medium">
            Premium Streetwear
          </span>
        </div>

        {heroImages.length > 1 && (
          <div className="absolute bottom-6 right-6 z-10 flex gap-2">
            {heroImages.map((_, i) => (
              <button
                key={i}
                onClick={() => setCurrentImageIndex(i)}
                className={`w-8 h-[2px] transition-all duration-500 ${
                  i === currentImageIndex ? "bg-red-700" : "bg-white/20"
                }`}
              />
            ))}
          </div>
        )}
      </section>

      {/* Featured / New Products */}
      <section className="py-16 md:py-24 bg-black">
        <div className="container mx-auto px-4 md:px-6 max-w-6xl">
          <div className="mb-12 md:mb-16">
            <span className="text-[10px] uppercase tracking-[0.4em] text-red-700 block mb-3">New Arrivals</span>
            <div className="flex items-end justify-between">
              <h2 className="font-display text-3xl md:text-5xl font-bold tracking-tight italic text-white">Featured</h2>
              <Link
                href="/shop"
                className="text-[10px] uppercase tracking-[0.3em] text-zinc-500 hover:text-red-600 transition-colors border-b border-zinc-800 pb-1"
              >
                View All
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-5">
            {products.slice(0, 8).map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: idx * 0.05 }}
                viewport={{ once: true }}
              >
                <Link href={`/shop/${product.id}`} className="group block">
                  <div className="relative aspect-[3/4] overflow-hidden bg-zinc-950 mb-3">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />
                    {product.isNew && (
                      <span className="absolute top-2 left-2 bg-red-700 text-white text-[9px] font-bold uppercase tracking-wider px-2 py-1">
                        New
                      </span>
                    )}
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-xs font-semibold uppercase tracking-wider text-white truncate">
                      {product.name}
                    </h3>
                    <p className="text-xs text-zinc-600">${product.price}</p>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Brand strip */}
      <section className="border-t border-zinc-900 py-16 bg-black">
        <div className="container mx-auto px-6 text-center">
          <p className="text-[10px] uppercase tracking-[0.6em] text-red-900/60 mb-6">Est. 2025</p>
          <h2 className="font-display text-5xl md:text-8xl font-bold italic text-white/[0.03] tracking-tight">
            Memories Division
          </h2>
        </div>
      </section>
    </div>
  );
}
