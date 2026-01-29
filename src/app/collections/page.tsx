"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { getCollections, type Collection } from "@/lib/data/products";
import { ArrowRight } from "lucide-react";

export default function CollectionsPage() {
  const [allCollections, setAllCollections] = useState<Collection[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function loadCollections() {
      setIsLoading(true);
      const data = await getCollections();
      setAllCollections(data);
      setIsLoading(false);
    }
    loadCollections();
  }, []);

  if (isLoading) {
    return (
      <div className="pt-32 pb-24 min-h-screen bg-background flex items-center justify-center">
        <div className="w-10 h-10 border-2 border-brand border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Anthology</h1>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter">Collections</h2>
        </header>

        <div className="space-y-32">
          {allCollections.map((collection, idx) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 0 ? "lg:flex-row" : "lg:flex-row-reverse"} gap-16 items-center`}
            >
              <div className="flex-1 relative aspect-[16/9] lg:aspect-[4/5] w-full bg-accent overflow-hidden">
                <Image
                  src={collection.image}
                  alt={collection.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 space-y-8">
                <span className="text-xs font-bold uppercase tracking-[0.4em] text-zinc-400">0{idx + 1} / Collection</span>
                <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">{collection.name}</h3>
                <p className="text-zinc-500 text-lg leading-relaxed max-w-lg">
                  {collection.description} This collection explores the intersection of classic streetwear silhouettes and futuristic materials. Designed for the urban explorer who values both form and function.
                </p>
                <Link
                  href="/shop"
                  className="group flex items-center gap-4 text-sm font-bold uppercase tracking-[0.2em] hover:text-brand transition-all"
                >
                  Shop Collection
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
