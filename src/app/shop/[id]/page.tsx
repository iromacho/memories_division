"use client";

import { useState, use, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { getProductById, type Product } from "@/lib/data/products";
import { useCart } from "@/context/CartContext";
import { ChevronLeft, ChevronRight, ShoppingBag, Plus, Minus, Info, Truck, RotateCcw, Heart, X } from "lucide-react";
import { notFound } from "next/navigation";
import { useSettings } from "@/context/SettingsContext";
import { useWishlist } from "@/context/WishlistContext";

export default function ProductDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  const { addToCart } = useCart();
  const { t, formatPrice } = useSettings();
  const { toggleWishlist, isInWishlist } = useWishlist();
  
    const [selectedSize, setSelectedSize] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [activeImageIndex, setActiveImageIndex] = useState<number | null>(null);

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

    const selectedImage = activeImageIndex !== null ? allImages[activeImageIndex] : null;

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
            <div className="grid grid-cols-1 gap-8">
              {allImages.map((img, idx) => (
                <motion.div
                  key={`${img}-${idx}`}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.25 }}
                  transition={{ duration: 0.7, delay: idx * 0.08 }}
                  className="relative h-[72vh] min-h-[34rem] md:h-[82vh] md:min-h-[42rem] bg-accent overflow-hidden group border border-zinc-800/40 cursor-zoom-in"
                  onClick={() => setActiveImageIndex(idx)}
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


          {/* Product Info */}
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

            <p className="text-zinc-500 text-sm leading-relaxed mb-16 max-w-lg uppercase tracking-wide">
              {product.description}
            </p>

            {/* Size Selector */}
            <div className="mb-12">
              <div className="flex justify-between items-center mb-6">
                <span className="text-[9px] font-black uppercase tracking-[0.3em]">Select Size</span>
                <button className="text-[8px] uppercase tracking-[0.3em] text-zinc-400 border-b border-zinc-400 pb-0.5 hover:text-black hover:border-black transition-colors">
                  Size Guide
                </button>
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

            {/* Quantity and Add to Cart */}
            <div className="flex flex-col sm:flex-row gap-4 mb-16">
              <div className="flex items-center border-2 border-accent h-16 bg-accent/30">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="px-6 hover:text-brand transition-colors"
                >
                  <Minus className="w-3 h-3" />
                </button>
                <span className="w-12 text-center font-black text-xs">{quantity}</span>
                <button
                  onClick={() => setQuantity(quantity + 1)}
                  className="px-6 hover:text-brand transition-colors"
                >
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
                  isLiked 
                    ? "bg-brand border-brand text-white" 
                    : "border-accent hover:border-brand text-foreground"
                }`}
              >
                <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
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

        <AnimatePresence>
          {selectedImage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm"
            >
              <button
                onClick={() => setActiveImageIndex(null)}
                className="absolute top-6 right-6 z-20 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                aria-label="Close image"
              >
                <X className="w-5 h-5" />
              </button>

              {allImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === null ? 0 : (prev - 1 + allImages.length) % allImages.length))}
                    className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Previous image"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => setActiveImageIndex((prev) => (prev === null ? 0 : (prev + 1) % allImages.length))}
                    className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 w-12 h-12 border border-white/30 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors"
                    aria-label="Next image"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}

              <div
                className="absolute inset-0"
                onClick={() => setActiveImageIndex(null)}
              />

              <div className="relative z-10 h-full w-full p-6 md:p-16 flex items-center justify-center">
                <div className="relative w-full h-full max-w-6xl">
                  <Image
                    src={selectedImage}
                    alt={`${product.name} large view`}
                    fill
                    className="object-contain"
                    sizes="100vw"
                  />
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
