"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useSettings } from "@/context/SettingsContext";
import { MapPin, Clock, Phone } from "lucide-react";

const stores = [
  {
    id: "madrid",
    name: "Madrid Flagship",
    address: "Calle de Serrano, 45, 28001 Madrid, Spain",
    hours: "Mon - Sat: 10:00 - 21:00",
    phone: "+34 912 345 678",
    image: "https://images.unsplash.com/photo-1582037928769-181f2644ecb7?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "tokyo",
    name: "Tokyo Division",
    address: "3 Chome-28-1 Shinjuku, Tokyo 160-0022, Japan",
    hours: "Daily: 11:00 - 20:00",
    phone: "+81 3-1234-5678",
    image: "https://images.unsplash.com/photo-1540959733332-e94e270b4d82?q=80&w=1000&auto=format&fit=crop",
  },
  {
    id: "ny",
    name: "New York Loft",
    address: "123 Mercer St, New York, NY 10012, USA",
    hours: "Mon - Sat: 11:00 - 19:00",
    phone: "+1 212-555-0123",
    image: "https://images.unsplash.com/photo-1449034446853-66c86144b0ad?q=80&w=1000&auto=format&fit=crop",
  }
];

export default function Stores() {
  const { t } = useSettings();

  return (
    <div className="pt-32 pb-24 bg-background">
      <div className="container mx-auto px-6">
        <header className="mb-20">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-[9px] font-black uppercase tracking-[0.5em] text-brand mb-6"
          >
            {t("stores.title")}
          </motion.h1>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none"
          >
            {t("stores.subtitle")}
          </motion.h2>
        </header>

        <div className="grid grid-cols-1 gap-24">
          {stores.map((store, idx) => (
            <motion.section
              key={store.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: idx * 0.1 }}
              viewport={{ once: true }}
              className={`flex flex-col ${idx % 2 === 1 ? "lg:flex-row-reverse" : "lg:flex-row"} gap-12 lg:gap-24 items-center`}
            >
              <div className="w-full lg:w-1/2 aspect-[16/9] relative overflow-hidden bg-accent">
                <Image
                  src={store.image}
                  alt={store.name}
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-1000 scale-110 hover:scale-100"
                />
              </div>
              
              <div className="w-full lg:w-1/2 space-y-8 text-center lg:text-left">
                <h3 className="text-3xl md:text-5xl font-black uppercase tracking-tighter">
                  {t(`stores.${store.id}`)}
                </h3>
                
                <div className="space-y-6">
                  <div className="flex items-center gap-4 justify-center lg:justify-start group">
                    <MapPin className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium tracking-wide text-zinc-400 group-hover:text-foreground transition-colors">
                      {store.address}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-start group">
                    <Clock className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium tracking-wide text-zinc-400 group-hover:text-foreground transition-colors">
                      {store.hours}
                    </p>
                  </div>
                  <div className="flex items-center gap-4 justify-center lg:justify-start group">
                    <Phone className="w-5 h-5 text-brand group-hover:scale-110 transition-transform" />
                    <p className="text-sm font-medium tracking-wide text-zinc-400 group-hover:text-foreground transition-colors">
                      {store.phone}
                    </p>
                  </div>
                </div>

                <button className="bg-foreground text-background px-12 py-5 font-black uppercase text-[10px] tracking-[0.4em] hover:bg-brand transition-all duration-500 hover:tracking-[0.6em]">
                  Get Directions
                </button>
              </div>
            </motion.section>
          ))}
        </div>
      </div>
    </div>
  );
}
