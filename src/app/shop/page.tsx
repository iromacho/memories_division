"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data/products";
import { Filter, ChevronDown } from "lucide-react";

export default function Shop() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const categories = ["all", "t-shirts", "hoodies", "pants", "accessories"];

  const filteredProducts = selectedCategory === "all"
    ? products
    : products.filter(p => p.category === selectedCategory);

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-16">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Store</h1>
          <h2 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Collections</h2>
        </header>

        {/* Filters */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-12 border-b pb-8">
          <div className="flex flex-wrap gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-xs font-bold uppercase tracking-widest px-6 py-2 transition-all ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-accent hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-4 text-xs font-bold uppercase tracking-widest cursor-pointer group">
            <Filter className="w-4 h-4 group-hover:text-brand transition-colors" />
            <span>Sort By</span>
            <ChevronDown className="w-4 h-4 group-hover:text-brand transition-colors" />
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-16">
          <AnimatePresence mode="popLayout">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4 }}
                className="group"
              >
                <Link href={`/shop/${product.id}`} className="block mb-6 relative aspect-[3/4] overflow-hidden bg-accent">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-black/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <span className="bg-white text-black px-8 py-3 font-bold uppercase text-[10px] tracking-[0.2em] shadow-xl">
                      View Details
                    </span>
                  </div>
                </Link>
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold uppercase tracking-widest text-xs">{product.name}</h3>
                    <span className="font-bold text-sm">${product.price}</span>
                  </div>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em]">{product.category}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
