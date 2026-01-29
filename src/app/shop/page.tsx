"use client";

import { useState, useEffect, useMemo, Suspense } from "react";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { products } from "@/lib/data/products";
import { Filter, ChevronDown, Search } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";
import { ProductCard } from "@/components/ui/ProductCard";

type SortOption = "featured" | "newest" | "price-low" | "price-high";

function ShopPageContent() {
  const searchParams = useSearchParams();
  const { t } = useSettings();
  
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

  const categories = ["all", "t-shirts", "hoodies", "pants", "shoes", "outerwear", "accessories"];

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
        result.sort((a, b) => (b.isNew ? -1 : 0) - (a.isNew ? -1 : 0));
        break;
      case "price-low":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        result.sort((a, b) => b.price - a.price);
        break;
      case "featured":
        result.sort((a, b) => (b.isFeatured ? -1 : 0) - (a.isFeatured ? -1 : 0));
        break;
    }

    return result;
  }, [selectedCategory, sortBy, searchQuery]);

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-black uppercase tracking-[0.5em] text-brand mb-6"
          >
            {t("shop.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {t("shop.subtitle")}
          </motion.h2>
        </header>

        {/* Filters & Sorting */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-10 mb-20">
          <div className="flex flex-wrap gap-2 md:gap-4">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`text-[9px] font-black uppercase tracking-[0.2em] px-8 py-4 transition-all duration-500 ${
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
            {/* Sort Dropdown */}
            <div className="relative flex-1 lg:flex-none">
              <button
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between lg:justify-start gap-8 text-[9px] font-black uppercase tracking-[0.2em] bg-accent px-8 py-4 hover:bg-zinc-200 dark:hover:bg-zinc-800 transition-all"
              >
                <div className="flex items-center gap-4">
                  <Filter className="w-3 h-3" />
                  <span>{t("shop.sort")}</span>
                </div>
                <ChevronDown className={`w-3 h-3 transition-transform duration-500 ${isSortOpen ? "rotate-180" : ""}`} />
              </button>
              
              <AnimatePresence>
                {isSortOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    className="absolute right-0 mt-2 w-full lg:w-64 bg-background border shadow-[0_30px_60px_-12px_rgba(0,0,0,0.3)] z-40 p-2"
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
                        className={`w-full text-left px-6 py-4 text-[9px] font-black uppercase tracking-widest hover:bg-accent transition-colors ${
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
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-24">
            <AnimatePresence mode="popLayout">
              {filteredAndSortedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 text-center"
          >
            <h3 className="text-2xl font-black uppercase tracking-[0.3em] mb-6">No matches found</h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-12">Adjust your filters or search query.</p>
            <button 
              onClick={() => {
                setSearchQuery("");
                setSelectedCategory("all");
              }}
              className="bg-foreground text-background px-12 py-5 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-brand transition-colors"
            >
              Reset All Filters
            </button>
          </motion.div>
        )}
      </div>
    </div>
  );
}

export default function Shop() {
  return (
    <Suspense fallback={
      <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ShopPageContent />
    </Suspense>
  );
}
