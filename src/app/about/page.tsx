"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export default function AboutPage() {
  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-24">
          <h1 className="text-sm font-bold uppercase tracking-[0.3em] text-brand mb-4">Philosophy</h1>
          <h2 className="text-4xl md:text-7xl lg:text-8xl font-black uppercase tracking-tighter max-w-4xl">
            More than just a <span className="text-brand italic">division</span>.
          </h2>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center mb-32">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="relative aspect-square bg-accent overflow-hidden"
          >
            <Image
              src="https://images.unsplash.com/photo-1558769132-cb1aea458c5e?q=80&w=1000&auto=format&fit=crop"
              alt="About Us"
              fill
              className="object-cover"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="text-2xl font-bold uppercase tracking-widest mb-8">Our Story</h3>
            <div className="space-y-6 text-zinc-500 text-lg leading-relaxed">
              <p>
                Founded in 2026, Memories Division was born from a desire to create clothing that transcends trends. We believe that streetwear is a canvas for individual expression and a keeper of memories.
              </p>
              <p>
                Every stitch, every fabric choice, and every silhouette is carefully considered to provide the highest quality experience. Our designs are inspired by urban landscapes, cinematic moments, and the raw energy of contemporary culture.
              </p>
              <p>
                We don't just sell clothes; we build a community. A division of like-minded individuals who appreciate minimalist aesthetics and uncompromising quality.
              </p>
            </div>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center py-24 border-t border-b border-border">
          <div>
            <span className="text-5xl font-black text-brand block mb-4">100%</span>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Organic Cotton</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Sustainability at our core</p>
          </div>
          <div>
            <span className="text-5xl font-black text-brand block mb-4">24/7</span>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Community Support</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Always here for the division</p>
          </div>
          <div>
            <span className="text-5xl font-black text-brand block mb-4">50+</span>
            <h4 className="font-bold uppercase tracking-widest text-sm mb-2">Global Drops</h4>
            <p className="text-xs text-zinc-500 uppercase tracking-widest">Available worldwide</p>
          </div>
        </div>

        <div className="mt-32 text-center">
          <h3 className="text-4xl md:text-6xl font-black uppercase tracking-tighter mb-8">Join the Division</h3>
          <p className="text-zinc-500 max-w-2xl mx-auto mb-12 text-lg">
            Stay updated with our latest collections and exclusive drops. Be part of the evolution of streetwear.
          </p>
          <form className="max-w-md mx-auto flex gap-4">
            <input
              type="email"
              placeholder="Email address"
              className="flex-1 bg-accent border-none px-6 py-4 focus:ring-1 focus:ring-brand outline-none transition-all"
            />
            <button className="bg-foreground text-background px-8 py-4 font-bold uppercase tracking-widest hover:bg-brand transition-all">
              Join
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
