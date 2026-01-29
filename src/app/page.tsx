"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getProducts, getCollections, type Product, type Collection } from "@/lib/data/products";

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [allCollections, setAllCollections] = useState<Collection[]>([]);

  useEffect(() => {
    async function loadData() {
      const [productsData, collectionsData] = await Promise.all([
        getProducts(),
        getCollections()
      ]);
      
      const featured = productsData.filter(p => p.isFeatured);
      // Fallback to latest products if no featured products found
      setFeaturedProducts(featured.length > 0 ? featured.slice(0, 3) : productsData.slice(0, 3));
      setAllCollections(collectionsData);
    }
    loadData();
  }, []);

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover brightness-[0.4]"
            priority
          />
        </div>
        
        <div className="relative z-10 container mx-auto px-6 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black uppercase tracking-tighter text-white leading-none mb-6">
              Memories<br />
              <span className="text-brand">Division</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 max-w-2xl mb-12 font-medium tracking-wide">
              Streetwear inspired by moments, curated for the modern individual. Minimalist aesthetics, premium quality.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start">
              <Link
                href="/shop"
                className="bg-brand text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center"
              >
                Shop Now
              </Link>
              <Link
                href="/collections"
                className="border border-white text-white px-10 py-4 font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 text-center"
              >
                Discover
              </Link>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 1 }}
          className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-[10px] uppercase tracking-[0.3em] text-zinc-500">Scroll Down</span>
          <div className="w-[1px] h-12 bg-zinc-800 relative overflow-hidden">
            <motion.div
              animate={{ y: ["-100%", "100%"] }}
              transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
              className="absolute top-0 left-0 w-full h-1/2 bg-brand"
            />
          </div>
        </motion.div>
      </section>

      {/* Featured Collections */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-6">
          <div className="flex justify-between items-end mb-16">
            <div>
              <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Latest Drops</h2>
              <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Seasonal Collections</h3>
            </div>
            <Link href="/collections" className="group flex items-center gap-2 text-sm font-bold uppercase tracking-widest hover:text-brand transition-colors">
              View All <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
          </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {allCollections.map((collection, idx) => (
                <motion.div
                  key={collection.id}

                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
                className="relative h-[600px] group overflow-hidden bg-zinc-900"
              >
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 opacity-70 group-hover:opacity-100"
                />
                <div className="absolute inset-0 flex flex-col justify-end p-12 bg-gradient-to-t from-black/80 to-transparent">
                  <h4 className="text-3xl font-bold text-white uppercase tracking-tighter mb-2">{collection.name}</h4>
                  <p className="text-zinc-300 mb-6 max-w-xs">{collection.description}</p>
                  <Link
                    href={`/collections/${collection.id}`}
                    className="inline-block text-white font-bold uppercase tracking-widest border-b border-white pb-2 hover:text-brand hover:border-brand transition-colors w-fit"
                  >
                    Explore Collection
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories Quick Links */}
      <section className="py-12 bg-background border-y border-accent">
        <div className="container mx-auto px-6">
          <div className="flex flex-wrap justify-center gap-4 md:gap-8">
            {["t-shirts", "hoodies", "pants", "accessories"].map((cat) => (
              <Link
                key={cat}
                href={`/shop?category=${cat}`}
                className="text-[10px] font-black uppercase tracking-[0.3em] hover:text-brand transition-colors px-4 py-2"
              >
                {cat}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}

      <section className="py-24 bg-accent/50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Top Rated</h2>
            <h3 className="text-4xl md:text-6xl font-bold tracking-tighter uppercase">Featured Products</h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-12">
            {featuredProducts.map((product, idx) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Link href={`/shop/${product.id}`} className="block mb-6 relative aspect-[3/4] overflow-hidden bg-zinc-100 dark:bg-zinc-900">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-6 py-2 font-bold uppercase text-xs tracking-widest">Quick View</span>
                  </div>
                </Link>
                <div className="flex justify-between items-start">
                  <div>
                    <h4 className="font-bold uppercase tracking-widest text-sm mb-1">{product.name}</h4>
                    <p className="text-zinc-500 text-xs uppercase tracking-widest">{product.category}</p>
                  </div>
                  <span className="font-bold">${product.price}</span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="mt-16 text-center">
            <Link
              href="/shop"
              className="inline-block border border-black dark:border-white px-12 py-4 font-bold uppercase tracking-widest hover:bg-black hover:text-white dark:hover:bg-white dark:hover:text-black transition-all"
            >
              Shop All Products
            </Link>
          </div>
        </div>
      </section>

      {/* Brand Ethos */}
      <section className="py-32 bg-black text-white overflow-hidden">
        <div className="container mx-auto px-6 flex flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true }}
            className="mb-12"
          >
            <div className="w-24 h-24 border-2 border-brand flex items-center justify-center rotate-45 mb-12 mx-auto">
              <span className="-rotate-45 font-black text-4xl">MD</span>
            </div>
          </motion.div>
          <h2 className="text-4xl md:text-7xl font-bold tracking-tighter uppercase mb-8 max-w-4xl">
            Streetwear is more than just clothing. It's a <span className="text-brand italic">division</span> of your memories.
          </h2>
          <p className="text-zinc-400 max-w-2xl text-lg mb-12">
            We believe every piece of clothing carries a story. Our mission is to provide the canvas for your journey, through premium materials and uncompromising design.
          </p>
          <Link href="/about" className="font-bold uppercase tracking-widest text-sm border-b-2 border-brand pb-2 hover:tracking-[0.2em] transition-all">
            Read Our Philosophy
          </Link>
        </div>
      </section>
    </div>
  );
}
