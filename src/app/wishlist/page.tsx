"use client";

import React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ShoppingBag, ArrowRight, Heart } from "lucide-react";
import { useWishlist } from "@/context/WishlistContext";
import { useSettings } from "@/context/SettingsContext";
import { ProductCard } from "@/components/ui/ProductCard";

export default function WishlistPage() {
  const { wishlist } = useWishlist();
  const { t } = useSettings();

  return (
    <div className="pt-32 pb-24 min-h-screen bg-background">
      <div className="container mx-auto px-6">
        <header className="mb-20 text-center lg:text-left">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col lg:flex-row lg:items-end justify-between gap-8"
          >
            <div>
              <h1 className="text-[10px] font-black uppercase tracking-[0.5em] text-brand mb-6">
                {t("wishlist.title")}
              </h1>
              <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none">
                Saved<br />Pieces
              </h2>
            </div>
            {wishlist.length > 0 && (
              <p className="text-zinc-500 text-[10px] font-black uppercase tracking-[0.2em] mb-2">
                {wishlist.length} {wishlist.length === 1 ? "Item" : "Items"} in your list
              </p>
            )}
          </motion.div>
        </header>

        {wishlist.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-10 gap-y-24">
            <AnimatePresence mode="popLayout">
              {wishlist.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </AnimatePresence>
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-32 flex flex-col items-center justify-center text-center border-2 border-dashed border-accent"
          >
            <div className="w-20 h-20 bg-accent rounded-full flex items-center justify-center mb-8">
              <Heart className="w-8 h-8 text-zinc-400" />
            </div>
            <h3 className="text-2xl font-black uppercase tracking-[0.3em] mb-4">
              {t("wishlist.empty")}
            </h3>
            <p className="text-zinc-500 text-[10px] uppercase tracking-[0.2em] mb-12 max-w-xs">
              Save your favorite pieces here to keep track of what you love.
            </p>
            <Link
              href="/shop"
              className="group flex items-center gap-6 bg-foreground text-background px-12 py-5 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-brand transition-all shadow-2xl"
            >
              {t("wishlist.back")}
              <ArrowRight className="w-4 h-4 group-hover:translate-x-2 transition-transform" />
            </Link>
          </motion.div>
        )}

        {/* Suggested Section */}
        {wishlist.length > 0 && (
          <section className="mt-40">
            <div className="flex justify-between items-end mb-16 border-b pb-8">
              <h3 className="text-2xl font-black uppercase tracking-tighter">You might also like</h3>
              <Link href="/shop" className="text-[10px] font-black uppercase tracking-widest hover:text-brand transition-colors">
                Explore More
              </Link>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {/* This could be randomized or based on category, for now just placeholder logic */}
              <p className="text-zinc-500 text-[10px] uppercase tracking-widest italic col-span-full">
                Personalized recommendations based on your style...
              </p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
