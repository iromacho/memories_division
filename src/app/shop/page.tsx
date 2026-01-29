"use client";

import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data/products";
import { Filter, ChevronDown, Search } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

export default function Shop() {
  const searchParams = useSearchParams();
  const { t, formatPrice } = useSettings();
  
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [sortBy, setSortBy] = useState<SortOption>("featured");
  const [searchQuery, setSearchQuery] = useState("");
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    if (category) setSelectedCategory(category);
    if (search) setSearchQuery(search);
  }, [searchParams]);

  const categories = ["all", "t-shirts", "hoodies", "pants", "shoes", "accessories"];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category Filter
    if (selectedCategory !== "all") {
      result = result.filter(p => p.category === selectedCategory);
    }

    // Search Filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(p => 
        p.name.toLowerCase().includes(query) || 
        p.category.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      );
    }

    // Sorting
    switch (sortBy) {
      case "newest":
        result.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 min-h-screen">
      <div className="container mx-auto px-6">
        <header className="mb-16">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-zinc-400 mb-4"
          >
            {t("shop.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter"
          >
            {t("shop.subtitle")}
          </motion.h2>
        </header>

        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 mb-16 border-b pb-8">
          <div className="flex flex-wrap gap-3">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[10px] font-bold uppercase tracking-widest px-6 py-3 transition-all duration-300 ${
                  selectedCategory === cat
                    ? "bg-foreground text-background"
                    : "bg-accent hover:bg-zinc-200 dark:hover:bg-zinc-800"
                }`}
              >
                {t(`shop.${cat.replace("-", "")}`)}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6 w-full lg:w-auto">
            {/* Search Input (Local) */}
            <div className="relative flex-1 lg:w-64">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-zinc-400" />
              <input
                type="text"
                placeholder={t("shop.search")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-accent border-none pl-12 pr-6 py-3 text-[10px] font-bold uppercase tracking-widest outline-none focus:ring-1 focus:ring-zinc-300 transition-all"
              />
            </div>

            {/* Sort Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="flex items-center gap-4 text-[10px] font-bold uppercase tracking-widest bg-accent px-6 py-3 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
              >
                <Filter className="w-3.5 h-3.5" />
                <span>{t("shop.sort")}</span>
                <ChevronDown className={`w-3.5 h-3.5 transition-transform ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-56 bg-background border shadow-2xl z-40"
                  >
                    {[
                      { id: "featured", label: "Featured" },
                      { id: "newest", label: t("shop.newest") },
                      { id: "price-low", label: t("shop.lowToHigh") },
                      { id: "price-high", label: t("shop.highToLow") },
                    ].map((opt) => (
                      <button
                        key={opt.id}
                        onClick={() => {
                          setSortBy(opt.id as SortOption);
                          setIsSortOpen(false);
                        }}
                        className={`w-full text-left px-6 py-4 text-[10px] font-bold uppercase tracking-widest hover:bg-accent transition-colors ${
                          sortBy === opt.id ? "text-brand" : ""
                        }`}
                      >
                        {opt.label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </div>
        </div>

        {/* Product Grid */}
        {filteredAndSortedProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-8 gap-y-20">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProducts.map((product) => (
                <motion.div
                  key={product.id}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.5 }}
                  className="group"
                >
                  <Link href={`/shop/${product.id}`} className="block mb-6 relative aspect-[4/5] overflow-hidden bg-accent">
                    <Image
                      src={product.image}
                      alt={product.name}
                      fill
                      className="object-cover transition-transform duration-1000 group-hover:scale-110"
                    />
                    {product.isNew && (
                      <span className="absolute top-4 left-4 bg-brand text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 z-10">
                        New
                      </span>
                    )}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]">
                      <span className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                        {t("product.details")}
                      </span>
                    </div>
                  </Link>
                  <div className="space-y-3">
                    <div className="flex justify-between items-start gap-4">
                      <h3 className="font-bold uppercase tracking-[0.15em] text-[11px] leading-tight flex-1">{product.name}</h3>
                      <span className="font-black text-xs tracking-tighter">{formatPrice(product.price)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em]">{product.category}</p>
                      <div className="flex gap-1.5">
                        {product.sizes.slice(0, 3).map(s => (
                          <span key={s} className="text-[8px] text-zinc-400 font-bold border px-1">{s}</span>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <div className="py-24 text-center">
            <h3 className="text-xl font-bold uppercase tracking-widest mb-4">No products found</h3>
            <p className="text-zinc-500 text-sm uppercase tracking-widest mb-8">Try adjusting your search or filters</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-foreground text-background px-8 py-4 font-black uppercase text-[10px] tracking-[0.3em]"
            >
              Clear All
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
