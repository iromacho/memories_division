"use client";

import { useState, use } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { products } from "@/lib/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ShoppingBag, Plus, Minus, Info, Truck, RotateCcw } from "lucide-react";
import { notFound } from "next/navigation";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const product = products.find((p) => p.id === id);
  const { addToCart } = useCart();
  const [selectedSize, setSelectedSize] = useState(product?.sizes?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) {
    notFound();
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
  };

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-brand transition-colors mb-12"
        >
          <ChevronLeft className="w-4 h-4" />
          Back to Shop
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          {/* Image Gallery */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="relative aspect-[3/4] bg-accent overflow-hidden"
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              priority
            />
          </motion.div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col"
          >
            <div className="mb-8">
              <p className="text-zinc-500 text-xs font-bold uppercase tracking-[0.3em] mb-2">{product.category}</p>
              <h1 className="text-4xl md:text-5xl font-black uppercase tracking-tighter mb-4">{product.name}</h1>
              <span className="text-2xl font-bold text-brand">${product.price}</span>
            </div>

            <p className="text-zinc-500 leading-relaxed mb-12 max-w-lg">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-10">
              <div className="flex justify-between items-center mb-4">
                <span className="text-xs font-bold uppercase tracking-widest">Select Size</span>
                <button className="text-[10px] uppercase tracking-widest text-zinc-400 border-b border-zinc-400 pb-0.5 hover:text-black hover:border-black transition-colors">
                  Size Guide
                </button>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-14 h-14 flex items-center justify-center text-xs font-bold transition-all border ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-border hover:border-zinc-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <div className="flex items-center border border-border h-14">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-4 hover:text-brand transition-colors"
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span className="w-12 text-center font-bold">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-4 hover:text-brand transition-colors"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-foreground text-background font-bold uppercase tracking-[0.2em] text-sm h-14 flex items-center justify-center gap-3 hover:bg-brand transition-all"
              >
                <ShoppingBag className="w-5 h-5" />
                Add to Cart
              </button>
            </div>

            {/* Additional Info */}
            <div className="space-y-6 pt-12 border-t border-border">
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Truck className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Fast Shipping</h4>
                  <p className="text-xs text-zinc-500">Free express delivery on all orders over $200.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <RotateCcw className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Easy Returns</h4>
                  <p className="text-xs text-zinc-500">30-day return policy for any reason.</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1">
                  <Info className="w-5 h-5 text-zinc-400" />
                </div>
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-widest mb-1">Ethical Sourcing</h4>
                  <p className="text-xs text-zinc-500">100% organic cotton and fair trade certified.</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
