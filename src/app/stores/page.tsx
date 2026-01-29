"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { MapPin, Clock, Phone, ArrowRight } from "lucide-react";
import { useSettings } from "@/context/SettingsContext";

export default function Stores() {
  const { t } = useSettings();

  const stores = [
    {
      id: "madrid",
      name: t("stores.madrid"),
      address: "Calle de Serrano, 45, 28001 Madrid, Spain",
      hours: "Mon - Sat: 10:00 - 21:00",
      phone: "+34 912 345 678",
      image: "https://images.unsplash.com/photo-1582037928869-177fc826417a?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "tokyo",
      name: t("stores.tokyo"),
      address: "3 Chome-27-11 Jingumae, Shibuya City, Tokyo 150-0001, Japan",
      hours: "Daily: 11:00 - 20:00",
      phone: "+81 3-1234-5678",
      image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1000&auto=format&fit=crop",
    },
    {
      id: "ny",
      name: t("stores.ny"),
      address: "123 Mercer St, New York, NY 10012, United States",
      hours: "Mon - Sun: 11:00 - 19:00",
      phone: "+1 212-345-6789",
      image: "https://images.unsplash.com/photo-1449156001446-33139597befa?q=80&w=1000&auto=format&fit=crop",
    },
  ];

  return (
    <div className="pt-32 pb-24">
      <div className="container mx-auto px-6">
        <header className="mb-24 max-w-4xl">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[10px] font-bold uppercase tracking-[0.4em] text-brand mb-4"
          >
            {t("stores.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-8"
          >
            {t("stores.subtitle")}
          </motion.h2>
        </header>

        <div className="space-y-32">
          {stores.map((store, index) => (
            <motion.div 
              key={store.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`flex flex-col ${index % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
            >
              <div className="flex-1 w-full aspect-[16/9] relative overflow-hidden bg-accent group">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover transition-transform duration-1000 group-hover:scale-105"
                />
              </div>
              <div className="flex-1 space-y-8">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">{store.name}</h3>
                
                <div className="space-y-6">
                  <div className="flex gap-4 items-start">
                    <MapPin className="w-5 h-5 text-brand shrink-0 mt-1" />
                    <p className="text-xs uppercase font-bold tracking-widest text-zinc-500 leading-relaxed">
                      {store.address}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Clock className="w-5 h-5 text-brand shrink-0 mt-1" />
                    <p className="text-xs uppercase font-bold tracking-widest text-zinc-500 leading-relaxed">
                      {store.hours}
                    </p>
                  </div>
                  <div className="flex gap-4 items-start">
                    <Phone className="w-5 h-5 text-brand shrink-0 mt-1" />
                    <p className="text-xs uppercase font-bold tracking-widest text-zinc-500 leading-relaxed">
                      {store.phone}
                    </p>
                  </div>
                </div>

                <button className="flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.3em] group">
                  Get Directions
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-2" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Info Section */}
        <section className="mt-48 py-24 border-t">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-16">
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6">World Wide Shipping</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                We deliver our pieces to over 150 countries. Every order is tracked and insured for your peace of mind.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Sustainable Ethics</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                Our materials are sourced from eco-conscious suppliers. We prioritize organic cotton and recycled fabrics in every collection.
              </p>
            </div>
            <div>
              <h4 className="text-[10px] font-bold uppercase tracking-[0.3em] mb-6">Exclusive Drops</h4>
              <p className="text-xs text-zinc-500 uppercase tracking-widest leading-relaxed">
                Join our division to get early access to limited releases and special events in our flagship stores.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
