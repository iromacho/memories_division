"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getProductById, type Product } from "@/lib/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ShoppingBag, Plus, Minus, Info, Truck, RotateCcw, Heart } from "lucide-react";
import { notFound } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { useWishlist } from "@/context/WishlistContext";
import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

const sizeGuideRows = [
  { size: "XS", chest: "84-88", waist: "68-72", hip: "84-88" },
  { size: "S", chest: "88-94", waist: "72-78", hip: "88-94" },
  { size: "M", chest: "94-100", waist: "78-84", hip: "94-100" },
  { size: "L", chest: "100-106", waist: "84-90", hip: "100-106" },
  { size: "XL", chest: "106-114", waist: "90-98", hip: "106-114" },
];

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const { addToCart } = useCart();
  const { t, formatPrice } = useSettings();
  const { toggleWishlist, isInWishlist } = useWishlist();

  const [selectedSize, setSelectedSize] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    async function loadProduct() {
      setIsLoading(true);
      const data = await getProductById(id);
      setProduct(data);
      if (data?.sizes?.[0]) setSelectedSize(data.sizes[0]);
      setIsLoading(false);
    }
    loadProduct();
  }, [id]);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!product) {
    notFound();
  }

  const allImages = [product.image, ...(product.images || [])];

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart(product, selectedSize);
    }
  };

  const isLiked = isInWishlist(product.id);

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <Link
          href="/shop"
          className="inline-flex items-center gap-4 text-[9px] font-black uppercase tracking-[0.3em] hover:text-brand transition-colors mb-16 group"
        >
          <ChevronLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          {t("nav.shop")}
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-32">
          <div className="space-y-6">
            {allImages.map((img, idx) => (
              <motion.div
                key={`${img}-${idx}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.7, delay: idx * 0.08 }}
                className="relative aspect-[3/4] bg-accent overflow-hidden group border border-zinc-800/40"
              >
                <Image
                  src={img}
                  alt={`${product.name} image ${idx + 1}`}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                  priority={idx === 0}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-80" />
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col lg:sticky lg:top-32 self-start h-fit"
          >
            <div className="mb-12">
              <p className="text-zinc-500 text-[9px] font-black uppercase tracking-[0.4em] mb-4">{product.category}</p>
              <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter leading-none mb-6">{product.name}</h1>
              <span className="text-3xl font-black text-brand tracking-tighter">{formatPrice(product.price)}</span>
            </div>

            <p className="text-zinc-500 text-sm leading-relaxed mb-16 max-w-lg uppercase tracking-wide">{product.description}</p>

            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Select Size</span>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      type="button"
                      className="text-[8px] uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-400 pb-0.5 hover:text-black hover:border-black transition-colors"
                    >
                      Size Guide
                    </button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl bg-black border-zinc-800 text-white">
                    <DialogTitle className="text-sm font-black uppercase tracking-[0.2em]">Size Guide (cm)</DialogTitle>
                    <div className="border border-zinc-800 overflow-hidden">
                      <table className="w-full text-left">
                        <thead className="bg-zinc-900">
                          <tr>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em]">Size</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em]">Chest</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em]">Waist</th>
                            <th className="px-4 py-3 text-[10px] uppercase tracking-[0.2em]">Hip</th>
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuideRows.map((row) => (
                            <tr key={row.size} className="border-t border-zinc-800">
                              <td className="px-4 py-3 text-xs font-bold uppercase tracking-wider">{row.size}</td>
                              <td className="px-4 py-3 text-xs text-zinc-300">{row.chest}</td>
                              <td className="px-4 py-3 text-xs text-zinc-300">{row.waist}</td>
                              <td className="px-4 py-3 text-xs text-zinc-300">{row.hip}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
              <div className="flex flex-wrap gap-3">
                {product.sizes?.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`w-16 h-16 flex items-center justify-center text-[10px] font-black transition-all border-2 ${
                      selectedSize === size
                        ? "bg-foreground text-background border-foreground"
                        : "bg-background text-foreground border-accent hover:border-zinc-400"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <div className="flex items-center border-2 border-accent h-16 bg-accent/30">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-6 hover:text-brand transition-colors">
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-12 text-center font-black text-xs">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-6 hover:text-brand transition-colors">
                  <Plus className="w-3 h-3" />
                </button>
              </div>
              <button
                onClick={handleAddToCart}
                className="flex-[2] bg-foreground text-background font-black uppercase tracking-[0.3em] text-[10px] h-16 flex items-center justify-center gap-4 hover:bg-brand transition-all shadow-2xl"
              >
                <ShoppingBag className="w-4 h-4" />
                Add to Cart
              </button>
              <button
                onClick={() => toggleWishlist(product)}
                className={`h-16 w-16 flex items-center justify-center border-2 transition-all duration-300 ${
                  isLiked ? "bg-brand border-brand text-white" : "border-accent hover:border-brand text-foreground"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
              </button>
            </div>

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
