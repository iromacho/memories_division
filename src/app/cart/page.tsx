"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { useCart } from "@/context/CartContext";
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const { cart, removeFromCart, updateQuantity, totalPrice, totalItems } = useCart();

  if (cart.length === 0) {
    return (
      <div className="pt-48 pb-24 text-center">
        <div className="container mx-auto px-6">
          <ShoppingBag className="w-16 h-16 mx-auto mb-6 text-zinc-300" />
          <h1 className="text-4xl font-black uppercase tracking-tighter mb-4">Your cart is empty</h1>
          <p className="text-zinc-500 mb-12">Looks like you haven't added anything to your cart yet.</p>
          <Link
            href="/shop"
            className="inline-block bg-foreground text-background px-12 py-4 font-bold uppercase tracking-widest hover:bg-brand transition-all"
          >
            Start Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-16">Shopping Bag</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-16">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-8">
            <AnimatePresence mode="popLayout">
              {cart.map((item) => (
                <motion.div
                  key={`${item.id}-${item.selectedSize}`}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  className="flex gap-6 pb-8 border-b border-border"
                >
                  <div className="relative w-24 h-32 sm:w-32 sm:h-40 bg-accent shrink-0">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  <div className="flex flex-col justify-between flex-1">
                    <div>
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-bold uppercase tracking-widest text-sm sm:text-base">{item.name}</h3>
                        <span className="font-bold">${item.price * item.quantity}</span>
                      </div>
                      <p className="text-zinc-500 text-xs uppercase tracking-widest mb-4">
                        Size: {item.selectedSize}
                      </p>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center border border-border">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1, item.selectedSize)}
                          className="px-3 py-1 hover:text-brand transition-colors"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-8 text-center text-xs font-bold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1, item.selectedSize)}
                          className="px-3 py-1 hover:text-brand transition-colors"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                      <button
                        onClick={() => removeFromCart(item.id, item.selectedSize)}
                        className="text-zinc-400 hover:text-red-500 transition-colors"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/* Summary */}
          <div className="lg:col-span-1">
            <div className="bg-accent p-8 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-widest border-b border-zinc-200 pb-4">Summary</h2>
              
              <div className="space-y-4 text-sm font-medium">
                <div className="flex justify-between">
                  <span className="text-zinc-500">Subtotal ({totalItems} items)</span>
                  <span>${totalPrice}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Shipping</span>
                  <span className="text-green-600 uppercase font-bold text-xs tracking-widest">Free</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-zinc-500">Tax</span>
                  <span>$0.00</span>
                </div>
              </div>

              <div className="flex justify-between items-center pt-6 border-t border-zinc-200">
                <span className="font-bold uppercase tracking-widest">Total</span>
                <span className="text-2xl font-black">${totalPrice}</span>
              </div>

              <button className="w-full bg-foreground text-background py-4 font-bold uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-brand transition-all">
                Checkout
                <ArrowRight className="w-4 h-4" />
              </button>

              <div className="pt-4 text-[10px] text-zinc-400 uppercase tracking-widest text-center">
                Secure SSL Checkout • Worldwide Shipping
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
