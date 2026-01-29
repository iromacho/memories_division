"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart } from "lucide-react";
import { Product } from "@/lib/data/products";
import { useSettings } from "@/context/SettingsContext";
import { useWishlist } from "@/context/WishlistContext";

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { t, formatPrice } = useSettings();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const active = isInWishlist(product.id);

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.5 }}
      className="group relative"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-accent">
        <Link href={`/shop/${product.id}`} className="block h-full w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover transition-transform duration-1000 group-hover:scale-110"
          />
        </Link>
        
        {product.isNew && (
          <span className="absolute top-4 left-4 bg-brand text-white text-[8px] font-black uppercase tracking-[0.2em] px-3 py-1.5 z-10">
            {t("shop.newest")}
          </span>
        )}

        {/* Wishlist Button on Hover */}
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleWishlist(product);
          }}
          className={`absolute top-4 right-4 z-20 p-2 rounded-full transition-all duration-300 transform ${
            active 
              ? "bg-brand text-white translate-y-0 opacity-100" 
              : "bg-white/80 text-black translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 backdrop-blur-md"
          } hover:scale-110`}
        >
          <Heart className={`w-3.5 h-3.5 ${active ? "fill-current" : ""}`} />
        </button>

        <Link 
          href={`/shop/${product.id}`}
          className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-center justify-center backdrop-blur-[2px]"
        >
          <span className="bg-white text-black px-8 py-4 font-black uppercase text-[10px] tracking-[0.3em] shadow-2xl transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
            {t("product.details")}
          </span>
        </Link>
      </div>

      <div className="mt-6 space-y-3">
        <div className="flex justify-between items-start gap-4">
          <h3 className="font-bold uppercase tracking-[0.15em] text-[11px] leading-tight flex-1">
            <Link href={`/shop/${product.id}`} className="hover:text-brand transition-colors">
              {product.name}
            </Link>
          </h3>
          <span className="font-black text-xs tracking-tighter">{formatPrice(product.price)}</span>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-zinc-500 text-[9px] uppercase tracking-[0.2em]">{product.category}</p>
          <div className="flex gap-1.5">
            {product.sizes.slice(0, 3).map(s => (
              <span key={s} className="text-[8px] text-zinc-400 font-bold border px-1 uppercase">{s}</span>
            ))}
            {product.sizes.length > 3 && <span className="text-[8px] text-zinc-400 font-bold border px-1">...</span>}
          </div>
        </div>
      </div>
    </motion.div>
  );
};
